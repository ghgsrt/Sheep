import { Bindings } from 'alpinejs';
import { Item } from '../items';

export default (item?: Item): Bindings => ({
	['@mouseover']() {
		// show tooltip
	},
	['@mouseover.away']() {
		// hide tooltip
	},
	['@click']() {
		item?.onUse?.();
	},

	[':style']() {
		return {
			'backgroundImage': `url('/icons/${item?.img}')`,
			'backgroundSize': 'cover',
		};
	},
});
