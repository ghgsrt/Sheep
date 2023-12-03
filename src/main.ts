import './reset.css';
import './style.css';

import Alpine from 'alpinejs';
import { DialogueItem, Flag, setupDialogues } from './dialogue';

// suggested in the Alpine docs:
// make Alpine on window available for better DX
window.Alpine = Alpine;

Alpine.data('controller', () => ({
	isLoaded: false,

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

	history: ['yo', 'momma'] as string[],

	flag(flag: Flag) {
		return this[flag];
	},
	toggleFlag(flag: Flag, set?: boolean) {
		this[flag] = set ?? !this[flag];
	},
	// watch(flag: Flag, callback: (value: boolean) => void) {
	// 	this.$watch(`flags.${flag}`, callback);
	// },
	runDialogue(dialogue: DialogueItem) {
		dialogue.callOnStart();
		// print the text
		//set the bg
		// do whatever
		dialogue.callOnEnd();
	},
	addJournalEntry(entry: string) {
		// add entry to journal
	},
	setBGImage(url: string) {
		// set the bg
	},
	setOptions(options: Record<string, () => void>) {
		// set the options
	},

	init() {
		this.runDialogue(
			setupDialogues({
				flag: this.flag,
				watch: this.$watch,
				runDialogue: this.runDialogue,
				toggleFlag: this.toggleFlag,
				addJournalEntry: this.addJournalEntry,
				setBGImage: this.setBGImage,
				setOptions: this.setOptions,
			})
		);

		setTimeout(() => (this.isLoaded = true), 1000);
	},
}));

Alpine.start();
