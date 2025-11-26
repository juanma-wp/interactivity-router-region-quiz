import { store } from '@wordpress/interactivity';

const { state } = store( 'interactivity-router-region-question', {
	state: {
		urlRegionDisplay: window.location.href,
	},
	actions: {
		*navigate( e ) {
			e.preventDefault();
			const { actions } = yield import(
				'@wordpress/interactivity-router'
			);
			state.urlRegionDisplay = e.target.href;
			yield actions.navigate( e.target.href );
		},
	},
} );
