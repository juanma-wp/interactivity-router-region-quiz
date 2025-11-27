import * as __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__ from "@wordpress/interactivity";
/******/ var __webpack_modules__ = ({

/***/ "@wordpress/interactivity":
/*!*******************************************!*\
  !*** external "@wordpress/interactivity" ***!
  \*******************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE__wordpress_interactivity_8e89b257__;

/***/ }),

/***/ "@wordpress/interactivity-router":
/*!**************************************************!*\
  !*** external "@wordpress/interactivity-router" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = import("@wordpress/interactivity-router");;

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./src/quiz/view.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/interactivity */ "@wordpress/interactivity");

const {
  state
} = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.store)("interactivity-router-region-quiz", {
  state: {
    visitedQuestionSlugs: [],
    timer: 0,
    currentTimerPage: null,
    get itemSlug() {
      const ctx = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return ctx.item.split("/").pop();
    },
    get questionHref() {
      const ctx = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      return !state.questionIsVisited ? ctx.item : null;
    },
    get questionIsVisited() {
      return state.visitedQuestionSlugs.includes(state.itemSlug);
    },
    get timerText() {
      if (state.timer < 0) {
        return "";
      }
      return state.timer > 0 ? `🟢 Time remaining: ${state.timer} seconds` : stateNull;
    }
  },
  actions: {
    stopTimer: () => {
      if (state.intervalId) {
        clearInterval(state.intervalId);
        state.intervalId = null;
      }
    },
    navigate: (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.withSyncEvent)(function* (event) {
      const {
        ref
      } = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getElement)();
      event.preventDefault();
      const {
        actions
      } = yield Promise.resolve(/*! import() */).then(__webpack_require__.bind(__webpack_require__, /*! @wordpress/interactivity-router */ "@wordpress/interactivity-router"));
      yield actions.navigate(ref.href);
    })
  },
  callbacks: {
    log: () => {
      const stateServer = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getServerState)();
      if (stateServer.extraData) {
        console.log("👀 We have extraData!", stateServer.extraData);
      }
    },
    startTimer: () => {
      const ctx = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
      const contextServer = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getServerContext)();
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
        console.log("🟢 Starting timer for", currentSlug, "with", state.timer, "seconds");
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
      const contextServer = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getServerContext)();
      const stateServer = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getServerState)();
      const {
        currentSlug,
        timeLimit
      } = contextServer;
      const ctx = (0,_wordpress_interactivity__WEBPACK_IMPORTED_MODULE_0__.getContext)();
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
    }
  }
});
})();


//# sourceMappingURL=view.js.map