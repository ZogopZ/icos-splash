"use strict";
(self["webpackChunkicosSplash"] = self["webpackChunkicosSplash"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/polling */ "webpack/sharing/consume/default/@lumino/polling");
/* harmony import */ var _lumino_polling__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_polling__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lumino/disposable */ "webpack/sharing/consume/default/@lumino/disposable");
/* harmony import */ var _lumino_disposable__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_lumino_disposable__WEBPACK_IMPORTED_MODULE_2__);



/**
 * The interval in milliseconds before recover options appear during splash.
 */
const SPLASH_RECOVER_TIMEOUT = 12000;
/**
 * The command IDs used by the apputils plugin.
 */
var CommandIDs;
(function (CommandIDs) {
    CommandIDs.loadState = 'apputils:load-statedb';
    CommandIDs.print = 'apputils:print';
    CommandIDs.reset = 'apputils:reset';
    CommandIDs.resetOnLoad = 'apputils:reset-on-load';
    CommandIDs.runFirstEnabled = 'apputils:run-first-enabled';
})(CommandIDs || (CommandIDs = {}));
/**
 * ICOS carbon portal splash screen.
 */
const splash = {
    id: '@icos-splash',
    autoStart: true,
    // requires: [ITranslator],
    provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ISplashScreen,
    activate: (app
    // translator: ITranslator
    ) => {
        // const trans = translator.load('jupyterlab');
        const { commands, restored } = app;
        // Right hand-side text element.
        const splash = document.createElement('div');
        splash.id = 'icos-splash';
        splash.innerHTML = 'ICOS';
        // Vertical line between right and left side.
        const verticalLine = document.createElement('div');
        verticalLine.classList.add('vertical-line');
        splash.appendChild(verticalLine);
        // Left side container.
        const leftSide = document.createElement('div');
        splash.appendChild(leftSide);
        // Loading circles container.
        const circleContainer = document.createElement('div');
        circleContainer.id = 'circle-container';
        leftSide.appendChild(circleContainer);
        // Left hand-side text element.
        const leftSideText = document.createElement('div');
        leftSideText.id = 'left-side-text';
        leftSideText.innerHTML = 'CARBON<br>PORTAL';
        leftSide.appendChild(leftSideText);
        // Circles
        const circle1 = document.createElement('div');
        circle1.id = 'circle-1';
        circleContainer.appendChild(circle1);
        const circle2 = document.createElement('div');
        circle2.id = 'circle-2';
        circleContainer.appendChild(circle2);
        const circle3 = document.createElement('div');
        circle3.id = 'circle-3';
        circleContainer.appendChild(circle3);
        // const icosLogo = new Image()
        // icosLogo.src = require('../src/assets/image.png').default
        // Create debounced recovery dialog function.
        let dialog;
        const recovery = new _lumino_polling__WEBPACK_IMPORTED_MODULE_1__.Throttler(async () => {
            if (dialog) {
                return;
            }
            dialog = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog({
                title: 'Loading...',
                body: `The loading screen is taking a long time. 
Would you like to clear the workspace or keep waiting?`,
                buttons: [
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.cancelButton({ label: 'Keep Waiting' }),
                    _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.warnButton({ label: 'Clear Workspace' })
                ]
            });
            try {
                const result = await dialog.launch();
                dialog.dispose();
                dialog = null;
                if (result.button.accept && commands.hasCommand(CommandIDs.reset)) {
                    return commands.execute(CommandIDs.reset);
                }
                // Re-invoke the recovery timer in the next frame.
                requestAnimationFrame(() => {
                    // Because recovery can be stopped, handle invocation rejection.
                    void recovery.invoke().catch(_ => undefined);
                });
            }
            catch (error) {
                /* no-op */
            }
        }, { limit: SPLASH_RECOVER_TIMEOUT, edge: 'trailing' });
        // Return ISplashScreen.
        let splashCount = 0;
        return {
            show: () => {
                splash.classList.remove('splash-fade');
                splashCount++;
                console.log('adding');
                document.body.appendChild(splash);
                // Because recovery can be stopped, handle invocation rejection.
                void recovery.invoke().catch(_ => undefined);
                return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__.DisposableDelegate(async () => {
                    await restored;
                    if (--splashCount === 0) {
                        void recovery.stop();
                        if (dialog) {
                            dialog.dispose();
                            dialog = null;
                        }
                        splash.classList.add('splash-fade');
                        window.setTimeout(() => {
                            document.body.removeChild(splash);
                        }, 200);
                    }
                });
            }
        };
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (splash);


/***/ })

}]);
//# sourceMappingURL=lib_index_js.a29926da8a05ee04abda.js.map