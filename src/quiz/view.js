import {
  store,
  withSyncEvent,
  getElement,
  getServerState,
  getServerContext,
  getContext,
} from "@wordpress/interactivity";

const { state } = store( 'interactivity-router-region-quiz', {
	actions: {
		navigate: withSyncEvent( function* ( event ) {
			const { ref } = getElement();
			event.preventDefault();

			const { actions } = yield import(
				'@wordpress/interactivity-router'
			);
			console.log( ref );
			console.log( ref.href );

			yield actions.navigate( ref.href );
		} ),
	},
	callbacks: {
		initQuestion: () => {
			const ctxServer = getServerContext();
			const ctx = getContext();

			ctx.remainingTime = ctxServer.remainingTime; 
		},
		log: () => {
			const serverState = getServerState();
			console.log( 'serverState', serverState );
			console.log( 'state', state );
			state.timeLimit = serverState.timeLimit;
			console.log("state", state);
		},
	},
} );
