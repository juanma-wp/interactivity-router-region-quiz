import {
  store,
  withSyncEvent,
  getElement,
  getServerState,
  getServerContext,
  getContext,
} from "@wordpress/interactivity";

const { state } = store( 'interactivity-router-region-quiz', {
	state: {
		visitedQuestionSlugs: [],
	},
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
		// log: () => {
		// 	console.log("log");
		// 	const ctxServer = getServerContext();
		// 	const ctx = getContext();
		// 	console.log("serverContext", ctxServer);
		// 	console.log("context", ctx);
		// },
	},
	callbacks: {
		initQuestion: () => {
			const ctxServer = getServerContext();
			const ctx = getContext();
			console.log("serverContext", ctxServer);
			console.log("context", ctx);
			ctx.timeLimit = ctxServer.timeLimit;
			console.log("context", ctx);

			const { ref } = getElement();
			console.log("ref", ref);
			state.visitedQuestionSlugs.push( ref.href );
			console.log("state", state);
		},
	},
} );
