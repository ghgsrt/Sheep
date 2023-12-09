import DMDialogues from './dialogues/DM';
import miscPartyDialogues from './dialogues/MP';
import shinebrightDialogues from './dialogues/SB';
import gruzDialogues from './dialogues/GZ';
import { State } from './stores/state';

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

export const setupDialogues = (controller: any) => {
	const DM = toDialogues(DMDialogues);
	const MP = toDialogues(miscPartyDialogues);
	const SB = toDialogues(shinebrightDialogues);
	const GZ = toDialogues(gruzDialogues);

	const state = Alpine.store('state') as State;

	DM.intro.next = DM.sheepAppears;
	DM.sheepAppears.next = DM.sheepWavesScroll;

	SB.sheepSpeaksFirstTime.next = SB.sheepIntroducesSelf;
	SB.sheepIntroducesSelf.next = SB.sheepExplainsQuest;

	DM.gruzAppears.next = GZ.intro;

	controller.watch(
		'$store.state.SBExplainedQuest',
		(SBExplainedQuest: boolean) => {
			if (SBExplainedQuest) state.runDialogue(DM.gruzAppears);
		}
	);

	DM.sheepWavesScroll.onEnd(() => {
		state.toggleFlag('canGetSwA');
		state.setOptions({
			take: {
				scroll: () => {
					state.runDialogue(DM.playerTakesScroll);
				},
			},
		});
	});

	DM.playerTakesScroll.onEnd(() => {
		state.toggleFlag('hasSwA', true);

		state.runDialogue(MP.playerTakesScroll); // have random party member say it

		state.setOptions({
			examine: {
				scroll: () => {
					state.runDialogue(DM.playerExaminesScroll);
				},
			},
			explain: {
				scroll: () => {
					state.runDialogue(DM.playerExplainsScroll);
				},
			},
			use: {
				scroll: () => {
					state.runDialogue(DM.playerUsesScroll);
				},
			},
		});
	});

	DM.playerExaminesScroll.onEnd(() => {
		state.toggleFlag('hasExaminedScroll');
		state.setOptions({
			explain: {
				scroll: () => {
					state.runDialogue(DM.playerExplainsScroll);
				},
			},
			use: {
				scroll: () => {
					state.runDialogue(DM.playerUsesScroll);
				},
			},
		});
	});

	DM.playerExplainsScroll.onEnd(() => {
		if (state.flag('hasExaminedScroll')) {
			state.toggleFlag('hasSaidScrollName');
			state.runDialogue(DM._explainScroll);
			state.runDialogue(SB.playerExplainsScroll);
			state.setOptions({
				use: {
					scroll: () => {
						state.runDialogue(DM.playerUsesScroll);
					},
				},
			});
		} else {
			state.runDialogue(DM._cantExplainScroll);
			state.setOptions({
				examine: {
					scroll: () => {
						state.runDialogue(DM.playerExaminesScroll);
					},
				},
				use: {
					scroll: () => {
						state.runDialogue(DM.playerUsesScroll);
					},
				},
			});
		}
	});

	DM.playerUsesScroll.onEnd(() => {
		state.toggleFlag('hasUsedScroll');
		state.toggleFlag('SwAIsActive');
		state.runDialogue(SB.sheepSpeaksFirstTime);
	});

	SB.sheepExplainsQuest.onEnd(() => {
		state.toggleFlag('SBExplainedQuest');
		state.runDialogue(DM.gruzAppears);
	});

	return DM.intro; // starting point
};
