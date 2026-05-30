"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "result",
  setup(__props) {
    const currentPages = getCurrentPages();
    let totalValue = "10";
    let correctValue = "1";
    if (currentPages.length > 0) {
      const currentPage = currentPages[currentPages.length - 1];
      const options = currentPage.options;
      if (options != null) {
        if (options["total"] != null) {
          totalValue = options["total"];
        }
        if (options["correct"] != null) {
          correctValue = options["correct"];
        }
      }
    }
    const totalCount = common_vendor.ref(totalValue);
    const correctCount = common_vendor.ref(correctValue);
    const goHome = () => {
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(common_vendor.unref(totalCount)),
        d: common_vendor.t(common_vendor.unref(correctCount)),
        e: common_vendor.o(goHome),
        f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/result.js.map
