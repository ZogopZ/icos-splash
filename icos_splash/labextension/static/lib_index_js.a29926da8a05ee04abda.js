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


        // icos splash animation
        const SPLASH_RECOVER_TIMEOUT = 12000;

        var CommandIDs;
        (function (CommandIDs) {
            CommandIDs.loadState = 'apputils:load-statedb';
            CommandIDs.print = 'apputils:print';
            CommandIDs.reset = 'apputils:reset';
            CommandIDs.resetOnLoad = 'apputils:reset-on-load';
            CommandIDs.runFirstEnabled = 'apputils:run-first-enabled';
        })(CommandIDs || (CommandIDs = {}));

        const splash = {
            id: '@icos-splash',
            autoStart: true,
            provides: _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ISplashScreen,
            activate: (app) => {
                const { commands, restored } = app;

                const splash = document.createElement('div');
                splash.id = 'icos-splash';
                splash.innerHTML = 'ICOS';

                const verticalLine = document.createElement('div');
                verticalLine.classList.add('vertical-line');
                splash.appendChild(verticalLine);

                const leftSide = document.createElement('div');
                splash.appendChild(leftSide);

                const circleContainer = document.createElement('div');
                circleContainer.id = 'circle-container';
                leftSide.appendChild(circleContainer);

                const leftSideText = document.createElement('div');
                leftSideText.id = 'left-side-text';
                leftSideText.innerHTML = 'CARBON<br>PORTAL';
                leftSide.appendChild(leftSideText);

                ['circle-1','circle-2','circle-3'].forEach(id => {
                    const c = document.createElement('div'); c.id = id; circleContainer.appendChild(c);
                });

                let dialog;
                const recovery = new _lumino_polling__WEBPACK_IMPORTED_MODULE_1__.Throttler(async () => {
                    if (dialog) return;
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
                        dialog.dispose(); dialog = null;
                        if (result.button.accept && commands.hasCommand(CommandIDs.reset)) {
                            return commands.execute(CommandIDs.reset);
                        }
                        requestAnimationFrame(() => void recovery.invoke().catch(() => {}));
                    } catch {}
                }, { limit: SPLASH_RECOVER_TIMEOUT, edge: 'trailing' });

                let splashCount = 0;

                return {
                    show: () => {
                        splash.classList.remove('splash-fade');
                        splashCount++;
                        document.body.appendChild(splash);
                        void recovery.invoke().catch(() => {});
                        return new _lumino_disposable__WEBPACK_IMPORTED_MODULE_2__.DisposableDelegate(async () => {
                            await restored;
                            if (--splashCount === 0) {
                                void recovery.stop();
                                if (dialog) { dialog.dispose(); dialog = null; }
                                splash.classList.add('splash-fade');
                                setTimeout(() => document.body.removeChild(splash), 200);
                            }
                        });
                    }
                };
            }
        };


        // icos sidebar button
        const sidebar = {
            id: '@icos-sidebar',
            autoStart: true,
            activate: () => {
                const cleanTabs = () => {
                    document.querySelectorAll("ul.lm-TabBar-content.p-TabBar-content li.lm-TabBar-tab").forEach(tab => {
                        const title = tab.getAttribute("title") || "";
                        if (title.toLowerCase().includes("commands")) {
                            tab.style.display = "none";
                        }
                    });
                };

                const tryInject = () => {
                    const tabBar = document.querySelector("ul.lm-TabBar-content.p-TabBar-content");
                    if (!tabBar) return;

                    tabBar.querySelectorAll("#icos-tab").forEach(el => el.remove());

                    const tab = document.createElement("li");
                    tab.className = "lm-TabBar-tab p-TabBar-tab";
                    tab.id = "icos-tab";
                    tab.setAttribute("role", "tab");
                    tab.style.cursor = "pointer";
                    tab.style.userSelect = "none";
                    const label = document.createElement("div");
                    label.className = "p-TabBar-tabLabel";
                    label.textContent = "ICOS HUB";
                    label.style.display = "flex";
                    label.style.alignItems = "center";
                    label.style.justifyContent = "center";
                    label.style.width = "100%";
                    label.style.textAlign = "center";
                    label.style.fontSize = "11px";
                    label.style.fontWeight = "bold";
                    label.style.userSelect = "none";
                    label.style.padding = "0 4px";

                    tab.appendChild(label);
                    tabBar.appendChild(tab);

                    // Pinned popup
                    (function () {

                        const popup = document.createElement("div");
                        popup.id = "icos-pinned-popup";
                        popup.innerHTML = `
      <div style="font-weight:600; margin-bottom:3px;">
        Click here to return to environment selection:
      </div>
      <div style="font-size:10px; opacity:0.85;">
        ⏹ <strong>Stop My Server</strong> → ▶ <strong>Start My Server</strong>
      </div>
    `;
                        popup.style.position = "fixed";
                        popup.style.fontSize = "11px";
                        popup.style.padding = "8px 10px";
                        popup.style.background = "var(--jp-layout-color1)";
                        popup.style.color = "var(--jp-ui-font-color1)";
                        popup.style.border = "1px solid var(--jp-border-color2)";
                        popup.style.borderRadius = "6px";
                        popup.style.boxShadow = "0 1px 4px rgba(0,0,0,.2)";
                        popup.style.zIndex = "99999";
                        popup.style.whiteSpace = "normal";
                        popup.style.maxWidth = "210px";
                        popup.style.cursor = "default";

                        // Arrow indicator (points to the tab)
                        const arrow = document.createElement("div");
                        arrow.style.position = "absolute";
                        arrow.style.width = "0";
                        arrow.style.height = "0";
                        arrow.style.borderTop = "6px solid transparent";
                        arrow.style.borderBottom = "6px solid transparent";
                        arrow.style.borderRight = "6px solid var(--jp-layout-color1)";
                        arrow.style.left = "-6px";
                        arrow.style.filter = "drop-shadow(0px 0px 2px rgba(0,0,0,.2))";

                        popup.appendChild(arrow);
                        document.body.appendChild(popup);

                        const positionPopup = () => {
                            const r = tab.getBoundingClientRect();
                            const popupRect = popup.getBoundingClientRect();
                            const centerY = r.top + (r.height / 2) - (popupRect.height / 2);
                            popup.style.top = Math.max(centerY, 0) + "px";
                            popup.style.left = (r.right + 12) + "px";
                            arrow.style.top = ((popupRect.height / 2) - 6) + "px";
                        };

                        setTimeout(positionPopup, 0);

                        window.addEventListener("resize", positionPopup);
                        window.addEventListener("scroll", positionPopup);

                        popup.addEventListener("click", () => {
                            popup.style.display = "none";
                        });

                        // Auto-dismiss after a delay, unless hovered
                        let popupTimeout = setTimeout(() => {
                            popup.style.display = "none";
                        }, 1500);  // 3000ms = 3 seconds

                        popup.addEventListener("mouseenter", () => {
                            clearTimeout(popupTimeout);  // prevent dismiss while reading
                        });

                        popup.addEventListener("mouseleave", () => {
                            // only schedule another hide if it's still visible
                            if (popup.style.display !== "none") {
                                popupTimeout = setTimeout(() => {
                                    popup.style.display = "none";
                                }, 1800);  // delay a little after leaving
                            }
                        });

                    })();

                    // Tooltip
                    (function () {
                        const tooltip = document.createElement("div");
                        tooltip.id = "icos-tooltip";
                        tooltip.innerHTML = `
      <div style="font-weight:600; margin-bottom:3px;">
        Click here to return to environment selection:
      </div>
      <div style="font-size:10px; opacity:0.85;">
        ⏹ <strong>Stop My Server</strong> → ▶ <strong>Start My Server</strong>
      </div>
    `;
                        tooltip.style.position = "fixed";
                        tooltip.style.fontSize = "11px";
                        tooltip.style.padding = "8px 10px";
                        tooltip.style.background = "var(--jp-layout-color1)";
                        tooltip.style.color = "var(--jp-ui-font-color1)";
                        tooltip.style.border = "1px solid var(--jp-border-color2)";
                        tooltip.style.borderRadius = "6px";
                        tooltip.style.boxShadow = "0 1px 4px rgba(0,0,0,.2)";
                        tooltip.style.zIndex = "99999";
                        tooltip.style.whiteSpace = "normal";
                        tooltip.style.maxWidth = "210px";
                        tooltip.style.cursor = "default";
                        tooltip.style.display = "none";
                        const tipArrow = document.createElement("div");
                        tipArrow.style.position = "absolute";
                        tipArrow.style.width = "0";
                        tipArrow.style.height = "0";
                        tipArrow.style.borderTop = "6px solid transparent";
                        tipArrow.style.borderBottom = "6px solid transparent";
                        tipArrow.style.borderRight = "6px solid var(--jp-layout-color1)";
                        tipArrow.style.filter = "drop-shadow(0px 0px 2px rgba(0,0,0,.2))";

                        tooltip.appendChild(tipArrow);
                        document.body.appendChild(tooltip);

                        // Track and center tooltip like popup
                        const positionTooltip = () => {
                            const r = tab.getBoundingClientRect();
                            const t = tooltip.getBoundingClientRect();
                            const centerY = r.top + (r.height / 2) - (t.height / 2);
                            tooltip.style.top = Math.max(centerY, 0) + "px";
                            tooltip.style.left = (r.right + 12) + "px";
                            tipArrow.style.top = ((t.height / 2) - 6) + "px";
                            tipArrow.style.left = "-6px";
                        };

                        // Add hover listeners to tab
                        tab.addEventListener("mouseenter", () => {
                            tooltip.style.display = "block";
                            positionTooltip();
                        });

                        tab.addEventListener("mouseleave", () => {
                            tooltip.style.display = "none";
                        });

                        window.addEventListener("resize", () => {
                            if (tooltip.style.display !== "none") positionTooltip();
                        });

                        window.addEventListener("scroll", () => {
                            if (tooltip.style.display !== "none") positionTooltip();
                        });

                    })();



                    tab.addEventListener("click", () => {
                        window.open("https://exploredata.icos-cp.eu/hub/home");
                    });

                    cleanTabs();
                };

                let t = setInterval(() => {
                    tryInject();
                    cleanTabs();
                    if (document.getElementById("icos-tab")) clearInterval(t);
                }, 400);
            }
        };

        const plugins = [splash, sidebar];
        /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (plugins);
        /***/ })

}]);
