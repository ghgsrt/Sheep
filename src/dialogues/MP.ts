import { DialogueDef } from '../dialogue';

// Miscellaneous party diaglogues
// i.e., spoken by a random party member

export default {
	playerTakesScroll: {
		text: ['What is that? Can you <strong>explain</strong> it to us?'],
		bg: '',
		portrait: 'mage_party.png',
		portraitName: 'Party Member',
	},
} satisfies Record<string, DialogueDef>;
