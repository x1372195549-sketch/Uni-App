"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/index.js";
  "./pages/auth/bind-phone.js";
  "./pages/mine/index.js";
  "./pages/profile/edit.js";
  "./pages/index/index.js";
  "./pages/audio/index.js";
  "./pages/audio/detail.js";
  "./pages/live/index.js";
  "./pages/live/detail.js";
  "./pages/course/index.js";
  "./pages/course/detail.js";
  "./pages/news/index.js";
  "./pages/news/detail.js";
  "./pages/knowledge/index.js";
  "./pages/knowledge/book-detail.js";
  "./pages/consult/index.js";
  "./pages/consult/detail.js";
}
const _sfc_main = common_vendor.defineComponent({
  onLaunch() {
    common_vendor.index.__f__("log", "at App.uvue:7", "App Launch");
  },
  onShow() {
    common_vendor.index.__f__("log", "at App.uvue:10", "App Show");
    const pages = getCurrentPages();
    const needAuth = pages.length == 0 || pages[pages.length - 1].route == "pages/login/index";
    if (!needAuth) {
      const token = common_vendor.index.getStorageSync("app_auth_access_token");
      if (token == null || token == "") {
        common_vendor.index.reLaunch({
          url: "/pages/login/index"
        });
      }
    }
  },
  onHide() {
    common_vendor.index.__f__("log", "at App.uvue:25", "App Hide");
  },
  onExit() {
    common_vendor.index.__f__("log", "at App.uvue:46", "App Exit");
  }
});
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
