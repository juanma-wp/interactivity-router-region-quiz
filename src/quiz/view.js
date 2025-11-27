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
      yield actions.navigate(ref.href);
    }),
  },
  callbacks: {
    log: () => {
      const contextServer = getServerContext();
      const stateServer = getServerState();
      const { timeLimit } = contextServer;
      console.log("⏱️ timeLimit", timeLimit);
      if (stateServer.extraData) {
        console.log("👀 We have extraData!", stateServer.extraData);
      }
    },
    initQuestion: () => {
      const contextServer = getServerContext();
      const stateServer = getServerState();
      const { currentSlug, timeLimit } = contextServer;
      const ctx = getContext();
      ctx.timeLimit = timeLimit;
      state.visitedQuestionSlugs.push(currentSlug);
      console.log("--------------------------------");
      console.log("🔴 stateServer", stateServer);
      console.log("🔴 contextServer", contextServer);
      console.log("🔵 state", state);
      console.log("🔵 ctx", ctx);
    },
  },
});
