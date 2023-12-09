import { DialogueDef } from '../dialogue';

// Dungeon Master dialogues

export default {
	intro: {
		text: [
			'Player in party chilling in town',
			'Something odd seems to be happening',
		],
		bg: 'intro.png',
		portraitName: 'DM',
	},
	sheepAppears: {
		text: ['A sheep appears', "There's a scroll in its mouth"],
		bg: 'sheep_appears.png',
		portraitName: 'DM',
	},
	sheepWavesScroll: {
		text: [
			'The sheep waves the scroll at the party',
			'It seems to want them to <strong>take</strong> it',
		],
		bg: '',
		portraitName: 'DM',
	},
	playerTakesScroll: {
		text: ['<em>You take the scroll</em>'],
		bg: '',
		portrait: 'player.png',
		portraitName: 'Player',
	},
	playerExaminesScroll: {
		text: [
			'A wax seal purports that it is a Scroll of Speak with Animals. It seems you might be able to <strong>use</strong> it.',
		],
		bg: '',
		portraitName: 'DM',
	},
	playerExplainsScroll: {
		text: [''],
		bg: '',
		portrait: 'player.png',
		portraitName: 'Player',
	},
	_explainScroll: {
		text: ['<em>You explain the scroll to the party</em>'],
		bg: '',
		portrait: 'player.png',
		portraitName: 'Player',
	},
	_cantExplainScroll: {
		text: [
			"Just some scroll or something, I don't know",
			'Perhaps we should try <strong>examining</strong> it?',
		],
		bg: '',
		portrait: 'player.png',
		portraitName: 'Player',
	},
	playerUsesScroll: {
		text: [
			"The sheep's baaing instantly morphs into cultured, elven-accented Common, albeit with a slight hint of a beat",
		],
		bg: '',
		portraitName: 'DM',
	},
	gruzAppears: {
		text: [
			'A loud howling fills the air, accompanied by the sound of angry yells and the occasional scream that seem to be drawing closer and closer.',
			'The cause quickly becomes apparent as a huge Half-Orc swaggers towards you, pushing his way through the crowd without a care for anybody standing in his way. Walking in front of him appear to be large wolves wearing iron collars, while a hulking figure in a dirty brown cloak travels in his wake with footfalls loud enough to be heard over the ruckus.',
			'The Half-Orc sets his small eyes on you and strides forward with one hand resting on the hilt of a greatsword.',
		],
		bg: '',
		portraitName: 'DM',
	},
} satisfies Record<string, DialogueDef>;
