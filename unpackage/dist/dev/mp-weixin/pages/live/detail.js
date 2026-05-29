"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const liveId = common_vendor.ref("");
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const current = pages[pages.length - 1];
        if (current != null && current.options != null && current.options["id"] != null) {
          liveId.value = current.options["id"];
        }
      }
    };
    loadParams();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_vendor.o(goBack),
        b: common_vendor.t(common_vendor.unref(liveId)),
        c: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/detail.js.map
