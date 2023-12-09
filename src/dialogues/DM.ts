import { DialogueDef } from '../dialogue';

// Dungeon Master dialogues

export default {
	intro: {
		text: [
			'Player in party chilling in town',
			'Something odd seems to be happening',
		],
		bg: 'todo',
	},
	sheepAppears: {
		text: ['A sheep appears', "There's a scroll in its mouth"],
		bg: 'todo',
	},
	sheepWavesScroll: {
		text: [
			'The sheep waves the scroll at the party',
			'It seems to want them to <strong>take</strong> it',
		],
		bg: 'todo',
	},
	playerTakesScroll: { text: ['You take the scroll'], bg: 'todo' },
	playerExaminesScroll: {
		text: ['A wax seal purports that it is a Scroll of Speak with Animals'],
		bg: 'todo',
	},
	playerExplainsScroll: {
		text: [],
		bg: 'todo',
	},
	_explainScroll: {
		text: ['You explain the scroll to the party'],
	},
	_cantExplainScroll: {
		text: ["Just some scroll or something, I don't know"],
	},
	playerUsesScroll: {
		text: [
			'You use the scroll',
			"The sheep's baaing instantly morphs into cultured, elven-accented Common, albeit with a slight hint of a beat",
		],
		bg: 'todo',
	},
	gruzAppears: {
		text: [
			'A loud howling fills the air, accompanied by the sound of angry yells and the occasional scream that seem to be drawing closer and closer.',
			'The cause quickly becomes apparent as a huge Half-Orc swaggers towards you, pushing his way through the crowd without a care for anybody standing in his way. Walking in front of him appear to be large wolves wearing iron collars, while a hulking figure in a dirty brown cloak travels in his wake with footfalls loud enough to be heard over the ruckus.',
			'The Half-Orc sets his small eyes on you and strides forward with one hand resting on the hilt of a greatsword.',
		],
		bg: 'todo',
	},
} satisfies Record<string, DialogueDef>;
