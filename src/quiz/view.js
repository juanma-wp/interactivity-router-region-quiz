import {
  store,
  withSyncEvent,
  getElement,
  getServerState,
  getServerContext,
  getContext,
} from "@wordpress/interactivity";

const { state, actions } = store("interactivity-router-region-quiz", {
  state: {
    visitedQuestionSlugs: [],
    intervalId: null,
    timer: 0,
    timedQuestions: [],  // Track questions that have had timers
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
    stopTimer: () => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
    },

    navigate: withSyncEvent(function* (event) {
      const { ref } = getElement();
      event.preventDefault();

      const { actions } = yield import("@wordpress/interactivity-router");
      yield actions.navigate(ref.href);
    }),
  },
  callbacks: {
    log: () => {
      const stateServer = getServerState();
      if (stateServer.extraData) {
        console.log("👀 We have extraData!", stateServer.extraData);
      }
    },
    startTimer: () => {
      const ctx = getContext();
      const contextServer = getServerContext();
      const currentSlug = contextServer.currentSlug;

      // Only start timer if timeLimit exists and is greater than 0
      if (!ctx.timeLimit || ctx.timeLimit <= 0) {
        // Clear timer if timeLimit is 0
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
          state.timer = 0;
        }
        return;
      }

      // Only start a new timer if we haven't already timed this question
      if (!state.timedQuestions.includes(currentSlug)) {
        // Clear any existing timer first
        if (state.intervalId) {
          clearInterval(state.intervalId);
          state.intervalId = null;
        }

        // Mark this question as timed
        state.timedQuestions.push(currentSlug);
        state.timer = ctx.timeLimit;
        console.log("🟢 Starting timer for", currentSlug, "with", state.timer, "seconds");

        state.intervalId = setInterval(() => {
          state.timer--;
          console.log("🔴 state.timer", state.timer);
          if (state.timer <= 0) {
            clearInterval(state.intervalId);
            state.intervalId = null;
          }
        }, 1000);
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

      // if (ctx.timeLimit > 0) {
      //   if (state.intervalId) {
      //     clearInterval(state.intervalId);
      //     state.intervalId = null;
      //   }
      //   state.intervalId = setInterval(() => {
      //     ctx.timeLimit--;
      //     console.log("🔴 ctx.timeLimit", ctx.timeLimit);
      //     if (ctx.timeLimit <= 0) {
      //       actions.stopTimer();
      //     }
      //   }, 1000);
      // }
    },
  },
});
