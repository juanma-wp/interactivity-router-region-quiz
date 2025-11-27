import {
  store,
  withSyncEvent,
  getElement,
  getServerState,
  getServerContext,
  getContext,
} from "@wordpress/interactivity";

const { state } = store("interactivity-router-region-quiz", {
  state: {
    visitedQuestionSlugs: [],
    get itemSlug() {
      const ctx = getContext();
      return ctx.item.split("/").pop();
    },
    get questionHref() {
		const ctx = getContext();
      return !state.questionIsVisited ? ctx.item : null;
    },
    get questionIsVisited() {
      return state.visitedQuestionSlugs.includes(state.itemSlug);
    },
  },
  actions: {
    navigate: withSyncEvent(function* (event) {
      const { ref } = getElement();
      event.preventDefault();

      const { actions } = yield import("@wordpress/interactivity-router");
      console.log(ref);
      console.log(ref.href);

      yield actions.navigate(ref.href);
    }),
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
      const { currentSlug, timeLimit } = getServerContext();
      const ctx = getContext();
      ctx.timeLimit = timeLimit;
      state.visitedQuestionSlugs.push(currentSlug);
    },
  },
});
