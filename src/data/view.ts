import { AlpineComponent } from 'alpinejs';

export default (): AlpineComponent<any> => ({
	isLoaded: false,
	tabIdx: 0,

	init() {
		setTimeout(() => (this.isLoaded = true), 1000);

		this.$watch('tabIdx', () => {
			this.$nextTick(() =>
				this.$refs.tabs?.scrollTo({
					top: this.$refs.tabs.scrollHeight,
					behavior: 'smooth',
				})
			);
		});
	},
});
