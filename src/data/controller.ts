import { AlpineComponent } from 'alpinejs';
import { setupDialogues } from '../dialogue';
import prompt from '../parser';
import { type State } from '../stores/state';

export default (): AlpineComponent<any> => ({
	prompt() {
		const input = this.$refs.input;
		if (!input) return;

		const state = Alpine.store('state') as State;

		const err = prompt(input.value);

		state.history.push(`> ${input.value}`);
		if (err) state.history.push(err);

		input.value = '';

		this.$nextTick(() =>
			this.$refs.tabs?.scrollTo({
				top: this.$refs.tabs.scrollHeight,
				behavior: 'smooth',
			})
		);
	},

	init() {
		const updateInvSizing = () => {
			const inventory = document.querySelectorAll('.inventory > div');
			for (const item of inventory) {
				const width = item.clientWidth;
				//@ts-ignore - this is fine
				item.style.height = `${width}px`;
			}
		};
		const updateTabSizing = () => {
			const tabs = document.querySelectorAll('.tab');
			let max = 0;
			for (const tab of tabs) {
				const width = tab.clientWidth;
				if (width > max) max = width;
			}
			for (const tab of tabs) {
				//@ts-ignore - this is fine
				tab.style.width = `${max}px`;
			}
		};

		updateInvSizing();
		updateTabSizing();
		window.addEventListener('resize', updateInvSizing);
		window.addEventListener('resize', updateTabSizing);

		const state = Alpine.store('state') as State;

		//! TOO HACKY, REPLACE
		let storyBlinkInterval: number | undefined = undefined;
		let storyBlinkTimeout: number | undefined = undefined;
		this.$watch('$store.state.storyIdx', () => {
			const story = document.querySelector('.story-text');

			if (storyBlinkInterval) {
				clearInterval(storyBlinkInterval);
				storyBlinkInterval = undefined;
				story?.classList.remove('blink');
			}
			if (storyBlinkTimeout) {
				clearTimeout(storyBlinkTimeout);
				storyBlinkTimeout = undefined;
			}

			storyBlinkTimeout = setTimeout(() => {
				storyBlinkInterval = setInterval(() => {
					story?.classList.toggle('blink');
				}, 500);
			}, 3000);
		});
		this.$watch('$store.state.options', () => {
			if (!state.options) return;

			clearInterval(storyBlinkInterval);
			storyBlinkInterval = undefined;
			clearTimeout(storyBlinkTimeout);
			storyBlinkTimeout = undefined;
			document.querySelector('.story-text')?.classList.remove('blink');
		});

		state.runDialogue(
			setupDialogues({
				watch: this.$watch.bind(this),
				dispatch: this.$dispatch.bind(this),
				nextTick: this.$nextTick.bind(this),
				id: this.$id.bind(this),
			})
		);

		// alert('ALL TEXT AND IMAGES ARE PLACEHOLDERS AND WILL BE REPLACED');
	},
});
// export type StoryOption = () => void;
// export type StoryOptions = Record<string, StoryOption>;

// export type ControllerFns = {
// 	flag: (flag: Flag) => boolean;
// 	watch: (flag: Flag, callback: (value: boolean) => void) => void;
// 	runDialogue: (dialogue: DialogueItem) => void;
// 	toggleFlag: (flag: Flag, set?: boolean) => void;
// 	addJournalEntry: (entry: string) => void;
// 	setBGImage: (url: string) => void;
// 	setOptions: (options: StoryOptions) => void;
// };

// export default (): AlpineComponent<any> => ({
// 	canGetSwA: false,
// 	hasSwA: false,
// 	hasUsedScroll: false,
// 	hasExaminedScroll: false,
// 	hasSaidScrollName: false,
// 	SwAIsActive: false,
// 	SBExplainedQuest: false,
// 	SBCaptured: false,
// 	gruzAtCompound: false,
// 	gruzIsDefeated: false,
// 	pathExamined: false,
// 	apesAreAsleep: false,
// 	apesAreDefeated: false,
// 	bearInOuthouse: false,
// 	bearIsDefeated: false,
// 	partyWantsComp: false,
// 	partyIsHostile: false,
// 	nokeIsAlerted: false,
// 	nokeRetreated: false,
// 	wyrmDead: false,
// 	nokeDefeated: false,
// 	nokeDead: false,

// 	bgImage: '',

// 	story: '',
// 	storyIdx: 0,
// 	currDialogue: {} as DialogueItem,

// 	options: undefined as StoryOptions | undefined,

// 	history: ['yo', 'momma'] as string[],

// 	flag(flag: Flag) {
// 		return this[flag];
// 	},
// 	toggleFlag(flag: Flag, set?: boolean) {
// 		this[flag] = set ?? !this[flag];
// 	},
// 	runDialogue(item: DialogueItem) {
// 		this.currDialogue = item;
// 		this.storyIdx = 0;
// 		this.setOptions();
// 		this.updateDialogue();
// 	},
// 	continueDialogue() {
// 		if (this.storyIdx === this.currDialogue.dialogue.text.length) return;

// 		this.storyIdx++;

// 		console.log(this.storyIdx, this.currDialogue.dialogue.text.length);
// 		if (this.storyIdx === this.currDialogue.dialogue.text.length) {
// 			const temp = this.currDialogue;
// 			this.currDialogue.callOnEnd();

// 			console.log(this.options, this.canGetSwA);
// 			if (temp.next && this.currDialogue === temp) {
// 				console.log('ymmu');
// 				this.runDialogue(temp.next);
// 			} else {
// 				console.log('ymmu2');
// 				// this.currDialogue = {} as DialogueItem;
// 			}
// 		} else this.updateDialogue();
// 	},
// 	updateDialogue() {
// 		this.story = this.currDialogue.dialogue.text[this.storyIdx];
// 		this.setBGImage(this.currDialogue.dialogue.bg || '');
// 	},
// 	addJournalEntry(entry: string) {
// 		return entry;
// 	},
// 	setBGImage(url: string) {
// 		this.bgImage = url || this.bgImage;
// 	},
// 	setOptions(options?: StoryOptions) {
// 		this.options = options;
// 	},

// 	init() {
// 		this.runDialogue(
// 			setupDialogues({
// 				flag: this.flag.bind(this),
// 				watch: this.$watch.bind(this),
// 				runDialogue: this.runDialogue.bind(this),
// 				toggleFlag: this.toggleFlag.bind(this),
// 				addJournalEntry: this.addJournalEntry.bind(this),
// 				setBGImage: this.setBGImage.bind(this),
// 				setOptions: this.setOptions.bind(this),
// 			})
// 		);
// 	},
// });
