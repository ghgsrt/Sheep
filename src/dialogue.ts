import DMDialogues from './dialogues/DM';
import miscPartyDialogues from './dialogues/MP';
import shinebrightDialogues from './dialogues/SB';
import gruzDialogues from './dialogues/GZ';

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

export type DialogueDef = {
	text: string[];
	bg?: string;
};

export type DialogueItem = {
	next?: DialogueItem;
	dialogue: DialogueDef;
	onStart: (callback: () => void) => void;
	onEnd: (callback: () => void) => void;
	callOnStart: () => void;
	callOnEnd: () => void;
};

export type ControllerFns = {
	flag: (flag: Flag) => boolean;
	watch: (flag: Flag, callback: (value: boolean) => void) => void;
	runDialogue: (dialogue: DialogueItem) => void;
	toggleFlag: (flag: Flag, set?: boolean) => void;
	addJournalEntry: (entry: string) => void;
	setBGImage: (url: string) => void;
	setOptions: (options: Record<string, () => void>) => void;
};

const toDialogue = (dialogue: DialogueDef): DialogueItem => {
	let next: DialogueItem | undefined = undefined;

	const _onStart: Array<() => void> = [];
	const _onEnd: Array<() => void> = [];
	const onStart = (callback: () => void) => _onStart.push(callback);
	const onEnd = (callback: () => void) => _onEnd.push(callback);

	const callOnStart = () => _onStart.forEach((callback) => callback());
	const callOnEnd = () => _onEnd.forEach((callback) => callback());

	return {
		next,
		dialogue,
		onStart,
		onEnd,
		callOnStart,
		callOnEnd,
	};
};

const toDialogues = (dialogues: Record<string, DialogueDef>) => {
	const d: Record<string, DialogueItem> = {};
	const _ = Object.entries(dialogues);
	for (const [key, dialogue] of _) d[key] = toDialogue(dialogue);
	return d;
};

export const setupDialogues = (controller: ControllerFns) => {
	const DM = toDialogues(DMDialogues);
	const MP = toDialogues(miscPartyDialogues);
	const SB = toDialogues(shinebrightDialogues);
	const GZ = toDialogues(gruzDialogues);

	DM.intro.next = DM.sheepAppears;
	DM.sheepAppears.next = DM.sheepWavesScroll;

	SB.sheepSpeaksFirstTime.next = SB.sheepIntroducesSelf;
	SB.sheepIntroducesSelf.next = SB.sheepExplainsQuest;

	DM.gruzAppears.next = GZ.intro;

	controller.watch('SBExplainedQuest', (SBExplainedQuest) => {
		if (SBExplainedQuest) controller.runDialogue(DM.gruzAppears);
	});

	DM.sheepWavesScroll.onEnd(() => {
		controller.toggleFlag('canGetSwA');
		controller.setOptions({
			'Take the scroll': () => {
				controller.runDialogue(DM.playerTakesScroll);
			},
		});
	});

	DM.playerTakesScroll.onEnd(() => {
		controller.toggleFlag('hasSwA', true);

		controller.runDialogue(MP.playerTakesScroll); // have random party member say it

		controller.setOptions({
			'Examine the scroll': () => {
				controller.runDialogue(DM.playerExaminesScroll);
			},
			'Explain the scroll': () => {
				controller.runDialogue(DM.playerExplainsScroll);
			},
			'Use the scroll': () => {
				controller.runDialogue(DM.playerUsesScroll);
			},
		});
	});

	DM.playerExaminesScroll.onEnd(() => {
		controller.toggleFlag('hasExaminedScroll');
		controller.setOptions({
			'Explain the scroll': () => {
				controller.runDialogue(DM.playerExplainsScroll);
			},
			'Use the scroll': () => {
				controller.runDialogue(DM.playerUsesScroll);
			},
		});
	});

	DM.playerExplainsScroll.onEnd(() => {
		if (controller.flag('hasExaminedScroll')) {
			controller.toggleFlag('hasSaidScrollName');
			controller.runDialogue(DM._explainScroll);
			controller.runDialogue(SB.playerExplainsScroll);
			controller.setOptions({
				'Use the scroll': () => {
					controller.runDialogue(DM.playerUsesScroll);
				},
			});
		} else {
			controller.runDialogue(DM._cantExplainScroll);
			controller.setOptions({
				'Examine the scroll': () => {
					controller.runDialogue(DM.playerExaminesScroll);
				},
				'Use the scroll': () => {
					controller.runDialogue(DM.playerUsesScroll);
				},
			});
		}
	});

	DM.playerUsesScroll.onEnd(() => {
		controller.toggleFlag('hasUsedScroll');
		controller.toggleFlag('SwAIsActive');
		controller.runDialogue(SB.sheepSpeaksFirstTime);
	});

	SB.sheepExplainsQuest.onEnd(() => {
		controller.toggleFlag('SBExplainedQuest');
		controller.runDialogue(DM.gruzAppears);
	});

	return DM.intro; // starting point
};

// Alpine.data('controller', () => ({
// 	isLoading: true,
// 	flags: {
// 		canGetSwA: false,
// 		hasSwA: false,
// 		hasUsedScroll: false,
// 		hasExaminedScroll: false,
// 		hasSaidScrollName: false,
// 		SwAIsActive: false,
// 		SBExplainedQuest: false,
// 		SBCaptured: false,
// 		gruzAtCompound: false,
// 		gruzIsDefeated: false,
// 		pathExamined: false,
// 		apesAreAsleep: false,
// 		apesAreDefeated: false,
// 		bearInOuthouse: false,
// 		bearIsDefeated: false,
// 		partyWantsComp: false,
// 		partyIsHostile: false,
// 		nokeIsAlerted: false,
// 		nokeRetreated: false,
// 		wyrmDead: false,
// 		nokeDefeated: false,
// 		nokeDead: false,
// 	},

// 	flag(flag: Flag) {
// 		return this.flags[flag];
// 	},
// 	toggleFlag(flag: Flag, set?: boolean) {
// 		this.flags[flag] = set ?? !this.flags[flag];
// 	},
// 	watch(flag: Flag, callback: (value: boolean) => void) {
// 		this.$watch(`flags.${flag}`, callback);
// 	},
// 	runDialogue(dialogue: DialogueItem) {
// 		dialogue.callOnStart();
// 		// print the text
// 		//set the bg
// 		// do whatever
// 		dialogue.callOnEnd();
// 	},
// 	addJournalEntry(entry: string) {
// 		// add entry to journal
// 	},
// 	setBGImage(url: string) {
// 		// set the bg
// 	},
// 	setOptions(options: Record<string, () => void>) {
// 		// set the options
// 	},

// 	init() {
// 		this.runDialogue(
// 			setupDialogues({
// 				flag: this.flag,
// 				watch: this.watch,
// 				runDialogue: this.runDialogue,
// 				toggleFlag: this.toggleFlag,
// 				addJournalEntry: this.addJournalEntry,
// 				setBGImage: this.setBGImage,
// 				setOptions: this.setOptions,
// 			})
// 		);

// 		setTimeout(() => (this.isLoading = false), 1000);
// 	},
// }));
