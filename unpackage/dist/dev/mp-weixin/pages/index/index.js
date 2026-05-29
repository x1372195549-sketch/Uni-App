"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goAudioPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/course/index" });
    };
    const goNewsPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/news/index" });
    };
    const goMinePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/mine/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/knowledge/index" });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$2,
        b: common_vendor.o(goAudioPage),
        c: common_vendor.o(goLivePage),
        d: common_vendor.o(goCoursePage),
        e: common_vendor.o(goNewsPage),
        f: common_assets._imports_1$3,
        g: common_assets._imports_1$4,
        h: common_assets._imports_2,
        i: common_assets._imports_3,
        j: common_assets._imports_4,
        k: common_vendor.o(goKnowledgePage),
        l: common_assets._imports_5,
        m: common_vendor.o(goMinePage),
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
