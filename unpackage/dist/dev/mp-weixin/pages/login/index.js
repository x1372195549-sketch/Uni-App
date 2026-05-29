"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const isSubmitting = common_vendor.ref(false);
    const redirectAfterLogin = (hasMobile) => {
      if (hasMobile) {
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
        return null;
      }
      common_vendor.index.navigateTo({
        url: "/pages/auth/bind-phone"
      });
    };
    const handleAuthorize = () => {
      if (isSubmitting.value) {
        return null;
      }
      isSubmitting.value = true;
      utils_auth.loginByWechat("微信用户", "", (user = null) => {
        isSubmitting.value = false;
        if (user == null) {
          common_vendor.index.navigateTo({
            url: "/pages/auth/bind-phone"
          });
          return null;
        }
        redirectAfterLogin(utils_auth.hasBoundMobile(user));
      }, (message) => {
        isSubmitting.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_assets._imports_1,
        c: common_vendor.t(common_vendor.unref(isSubmitting) ? "授权中..." : "确认授权"),
        d: common_vendor.unref(isSubmitting),
        e: common_vendor.o(handleAuthorize),
        f: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/index.js.map
