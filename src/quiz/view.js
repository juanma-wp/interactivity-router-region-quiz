import {
  store,
  withSyncEvent,
  getElement,
  getServerState,
} from "@wordpress/interactivity";

const questionSlugs = [
	'https://streams.wp.local/question-1',
	'https://streams.wp.local/question-2',
	'https://streams.wp.local/question-3',
	'https://streams.wp.local/question-4',
	// 'question-5',
	// 'question-6',
	// 'question-7',
	// 'question-8',
	// 'question-9',
	// 'question-10',
];

const getRandomItems = ( array, count ) =>
	array
		.slice() // Copy array
		.sort( () => Math.random() - 0.5 ) // Shuffle
		.slice( 0, Math.min( count, array.length ) ); // Get first 'count' items

const randomQuestionSlugs = getRandomItems( questionSlugs, 2 );

const { state } = store( 'interactivity-router-region-quiz', {
	state: {
		randomQuestionSlugs,
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
