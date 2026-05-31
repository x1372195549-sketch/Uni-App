"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const goAudioPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
    };
    const goNewsPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/news/index" });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goAudioPage),
        c: common_vendor.o(goLivePage),
        d: common_vendor.o(goCoursePage),
        e: common_vendor.o(goNewsPage),
        f: common_assets._imports_1$3,
        g: common_assets._imports_1$4,
        h: common_assets._imports_2,
        i: common_vendor.o(goExamPage),
        j: common_assets._imports_3,
        k: common_vendor.o(goConsultPage),
        l: common_assets._imports_4,
        m: common_vendor.o(goKnowledgePage),
        n: common_assets._imports_5,
        o: common_vendor.o(goMinePage),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
