"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "bind-phone",
  setup(__props) {
    const phone = common_vendor.ref("");
    const code = common_vendor.ref("");
    const isSendingCode = common_vendor.ref(false);
    const isSubmitting = common_vendor.ref(false);
    const countdown = common_vendor.ref(0);
    let timerId = 0;
    const bindToken = utils_auth.getBindToken();
    const isValidPhone = (value) => {
      return /^1\d{10}$/.test(value);
    };
    const isValidCode = (value) => {
      return /^\d{4,8}$/.test(value);
    };
    const startCountdown = () => {
      countdown.value = 60;
      timerId = setInterval(() => {
        if (countdown.value <= 1) {
          clearInterval(timerId);
          timerId = 0;
          countdown.value = 0;
          return null;
        }
        countdown.value = countdown.value - 1;
      }, 1e3);
    };
    const handleBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/login/index" });
    };
    const handleSendCode = () => {
      if (isSendingCode.value || countdown.value > 0) {
        return null;
      }
      if (!isValidPhone(phone.value)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return null;
      }
      isSendingCode.value = true;
      utils_auth.sendSmsCode(phone.value, () => {
        isSendingCode.value = false;
        startCountdown();
        common_vendor.index.showToast({
          title: "验证码已发送",
          icon: "none"
        });
      }, (message) => {
        isSendingCode.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    const handleSubmit = () => {
      if (isSubmitting.value) {
        return null;
      }
      if (!isValidPhone(phone.value)) {
        common_vendor.index.showToast({
          title: "请输入正确的手机号",
          icon: "none"
        });
        return null;
      }
      if (!isValidCode(code.value)) {
        common_vendor.index.showToast({
          title: "请输入正确的验证码",
          icon: "none"
        });
        return null;
      }
      isSubmitting.value = true;
      const onLoginSuccess = () => {
        isSubmitting.value = false;
        common_vendor.index.reLaunch({
          url: "/pages/index/index"
        });
      };
      const onLoginFail = (message) => {
        isSubmitting.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      };
      if (bindToken != "") {
        utils_auth.wechatBindMobile(bindToken, phone.value, code.value, (loginData) => {
          utils_auth.saveLogin(loginData);
          utils_auth.clearBindToken();
          onLoginSuccess();
        }, (message) => {
          onLoginFail(message);
        });
      } else {
        utils_auth.loginBySms(phone.value, code.value, onLoginSuccess, (message) => {
          onLoginFail(message);
        });
      }
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0,
        b: common_assets._imports_0$1,
        c: common_vendor.o(handleBack),
        d: common_vendor.unref(phone),
        e: common_vendor.o(($event) => {
          return common_vendor.isRef(phone) ? phone.value = $event.detail.value : null;
        }),
        f: common_vendor.unref(code),
        g: common_vendor.o(($event) => {
          return common_vendor.isRef(code) ? code.value = $event.detail.value : null;
        }),
        h: common_vendor.t(common_vendor.unref(countdown) > 0 ? common_vendor.unref(countdown) + "s后重发" : common_vendor.unref(isSendingCode) ? "发送中..." : "获取验证码"),
        i: common_vendor.o(handleSendCode),
        j: common_vendor.t(common_vendor.unref(isSubmitting) ? "认证中..." : "认证"),
        k: common_vendor.unref(isSubmitting),
        l: common_vendor.o(handleSubmit),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/auth/bind-phone.js.map
