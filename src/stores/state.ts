import { DialogueItem, setupDialogues } from '../dialogue';

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

	story: '',
	storyIdx: -1,
	currDialogue: {} as DialogueItem,

	options: undefined as StoryOptions | undefined,

	history: [] as string[],

	flag(flag: Flag) {
		return this[flag];
	},
	toggleFlag(flag: Flag, set?: boolean) {
		this[flag] = set ?? !this[flag];
	},
	runDialogue(item: DialogueItem) {
		this.currDialogue = item;
		this.storyIdx = 0;
		this.setOptions();
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
};
export default state;
export type State = typeof state;
