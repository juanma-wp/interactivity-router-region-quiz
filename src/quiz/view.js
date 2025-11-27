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
    timer: 0,
    currentTimerPage: null,
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
    get timerText() {
      if (state.timer < 0) {
        return ""
      }
      return state.timer > 0 ? `🟢 Time remaining: ${state.timer} seconds` : stateNull;
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

      // Get all keys from both objects
      const serverKeys = Object.keys(stateServer);
      const clientKeys = Object.keys(state);

      // Find properties that exist in stateServer but not in state
      const serverOnlyProps = serverKeys.filter(key => !clientKeys.includes(key));

      if (serverOnlyProps.length > 0) {
        console.log("🆕 Server state has additional properties not in client state:");
        serverOnlyProps.forEach(prop => {
          console.log(`  - ${prop}:`, stateServer[prop]);
        });
      }
      else {
        console.log("→ No additional properties from server state.");
      }

      // Log comparison summary
      console.log("📊 State comparison:", {
        serverPropsCount: serverKeys.length,
        clientPropsCount: clientKeys.length,
        serverOnlyProps: serverOnlyProps,
        serverKeys: serverKeys,
        clientKeys: clientKeys
      });
    },

    startTimer: () => {
      const ctx = getContext();
      const contextServer = getServerContext();
      const currentSlug = contextServer.currentSlug;

      // Only run if we're on a different page
      if (state.currentTimerPage === currentSlug) {
        return;
      }

      // Update the current page
      state.currentTimerPage = currentSlug;

      // Stop any existing timer
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }

      // Start new timer if timeLimit > 0
      if (contextServer.timeLimit > 0) {
        state.timer = contextServer.timeLimit;
        console.log("⏱️ Starting timer for", currentSlug, "with", state.timer, "seconds");

        state.intervalId = setInterval(() => {
          state.timer--;
          // console.log("🔴 state.timer", state.timer);
          if (state.timer <= 0) {
            clearInterval(state.intervalId);
            state.intervalId = null;
          }
        }, 1000);
      } else {
        state.timer = 0;
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
