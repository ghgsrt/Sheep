import { DialogueDef, DialogueItem } from '../dialogue';
import { Item } from '../items';
import { deepCopy } from '../utils/utils';

export type StoryOption = () => void;
export type StoryOptions = Record<string, Record<string, StoryOption>>;

export type Flag =
	| 'canGetSwA'
	| 'hasSwA'
	| 'hasUsedScroll'
	| 'hasExaminedScroll'
	| 'hasSaidScrollName'
	| 'SwAIsActive'
	| 'SBExplainedQuest'
	| 'SBCaptured'
	| 'gruzAtCompound'
	| 'gruzIsDefeated'
	| 'pathExamined'
	| 'apesAreAsleep'
	| 'apesAreDefeated'
	| 'bearInOuthouse'
	| 'bearIsDefeated'
	| 'partyWantsComp'
	| 'partyIsHostile'
	| 'nokeIsAlerted'
	| 'nokeRetreated'
	| 'wyrmDead'
	| 'nokeDefeated'
	| 'nokeDead';

const state = {
	canGetSwA: false,
	hasSwA: false,
	hasUsedScroll: false,
	hasExaminedScroll: false,
	hasSaidScrollName: false,
	SwAIsActive: false,
	SBExplainedQuest: false,
	SBCaptured: false,
	gruzAtCompound: false,
	gruzIsDefeated: false,
	pathExamined: false,
	apesAreAsleep: false,
	apesAreDefeated: false,
	bearInOuthouse: false,
	bearIsDefeated: false,
	partyWantsComp: false,
	partyIsHostile: false,
	nokeIsAlerted: false,
	nokeRetreated: false,
	wyrmDead: false,
	nokeDefeated: false,
	nokeDead: false,

	bgImage: '',
	portraitImage1: '',
	portraitName1: '',
	portraitImage2: '',
	portraitName2: '',

	activeSpeaker: '',

	story: '',
	storyIdx: -1,
	currDialogue: {} as DialogueItem,
	options: undefined as StoryOptions | undefined,

	history: [] as string[],
	journal: [] as string[],
	note: '',
	inventory: [] as (Item | undefined)[],

	flag(flag: Flag) {
		return this[flag];
	},
	toggleFlag(flag: Flag, set?: boolean) {
		this[flag] = set ?? !this[flag];
	},
	runDialogue(item: DialogueItem) {
		this.currDialogue.callBeforeNext?.();

		this.currDialogue = item;

		this.storyIdx = 0;
		this.setOptions(); // clear options
		this.activeSpeaker = item.dialogue.portraitName ?? '';
		item.callOnStart();
		this.updateDialogue();
	},
	continueDialogue() {
		if (this.storyIdx === this.currDialogue.dialogue.text.length) return;

		this.storyIdx++;

		console.log(this.storyIdx, this.currDialogue.dialogue.text.length);
		if (this.storyIdx === this.currDialogue.dialogue.text.length) {
			const temp = this.currDialogue;
			this.currDialogue.callOnEnd();

			console.log(this.options, this.canGetSwA);
			if (temp.next && this.currDialogue === temp) {
				console.log('ymmu');
				this.runDialogue(temp.next);
			} else {
				console.log('ymmu2');
				// this.currDialogue = {} as DialogueItem;
			}
		} else this.updateDialogue();
	},
	updateDialogue() {
		this.story = this.currDialogue.dialogue.text[this.storyIdx];
		this.setBGImage(this.currDialogue.dialogue.bg || '');
		this.setPortrait(this.currDialogue.dialogue);
	},
	addJournalEntry(entry: string) {
		return entry;
	},
	setBGImage(url: string) {
		this.bgImage = url || this.bgImage;
	},
	setOptions(options?: StoryOptions) {
		this.options = options;
	},
	setPortrait(dialogue: DialogueDef) {
		if (
			dialogue.portrait === this.portraitImage1 ||
			dialogue.portrait === this.portraitImage2 ||
			dialogue.portraitName === 'DM'
		)
			return;

		if (this.portraitImage1) {
			this.portraitImage2 = dialogue.portrait ?? '';
			this.portraitName2 = dialogue.portraitName ?? '';
		} else {
			this.portraitImage1 = dialogue.portrait ?? '';
			this.portraitName1 = dialogue.portraitName ?? '';
		}
	},
	clearPortrait(portrait?: string) {
		if (this.portraitImage1 === portrait) {
			this.portraitImage1 = '';
			this.portraitName1 = '';
		} else if (this.portraitImage2 === portrait) {
			this.portraitImage2 = '';
			this.portraitName2 = '';
		}
	},
	clearPortraits() {
		this.portraitImage1 = '';
		this.portraitName1 = '';
		this.portraitImage2 = '';
		this.portraitName2 = '';
	},
	pushInventoryItem(item: Item) {
		let idx;
		if ((idx = this.inventory.findIndex((i) => i?.name === item.name)) > -1) {
			this.inventory[idx]!.quantity++;
			return;
		}

		for (let i = 0; i < this.inventory.length + 1; i++) {
			if (!this.inventory[i]) {
				const fns: Record<string, any> = {};
				for (const key in item)
					if (typeof item[key] === 'function') fns[key] = item[key];

				this.inventory[i] = {
					...deepCopy(item),
					...fns,
				};
				this.inventory = [...this.inventory];
				return;
			}
		}
	},
	removeInventoryItem(item: string) {
		const idx = this.inventory.findIndex((i) => item === i?.name);
		if (idx === -1) return;

		this.inventory[idx]!.quantity--;
		if (this.inventory[idx]!.quantity === 0) this.inventory[idx] = undefined;
	},
};
export default state;
export type State = typeof state;
