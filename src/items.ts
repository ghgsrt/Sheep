import { State } from './stores/state';

export interface Item {
	[key: string]: any; // screw typescript
	name: string;
	description: string;
	img: string;
	quantity: number;
	onUse?: () => void;
}

// interface Weapon extends Item {
// 	damage: number;
// 	range: number;
// 	durability: number;
// }

// interface Armor extends Item {
// 	defense: number;
// 	durability: number;
// }

export const items: Record<string, Item> = {
	scrollOfSPA: {
		name: 'Scroll of Speak with Animals',
		description: 'A scroll with a spell that allows you to speak with animals.',
		img: 'scroll.jpg',
		quantity: 1,
		onUse() {
			(Alpine.store('state') as State).removeInventoryItem(this.name);
		},
	},
};
