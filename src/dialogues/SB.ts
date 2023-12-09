import { DialogueDef } from '../dialogue';

// Finethir Shinebright dialogues

export default {
	playerExplainsScroll: {
		text: ['*Nods and bleats enthusiastically*'],
		bg: '',
		portrait: 'sheep.png',
		portraitName: 'Mysterious Sheep',
	},
	sheepSpeaksFirstTime: {
		text: ['Now that you can understand me...'],
		bg: '',
		portrait: 'sheep.png',
		portraitName: 'Mysterious Sheep',
	},
	sheepIntroducesSelf: {
		text: ['I am Finethir Shinebright, a wizard in dire need of aid'],
		bg: '',
		portrait: 'sheep.png',
		portraitName: 'Finethir Shinebright',
	},
	sheepExplainsQuest: {
		text: ['The sheep explains the quest', 'blah blah evil wizard...'],
		bg: '',
		portrait: 'sheep.png',
		portraitName: 'Finethir Shinebright',
	},
} satisfies Record<string, DialogueDef>;
