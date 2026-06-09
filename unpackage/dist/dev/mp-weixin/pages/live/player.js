"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "player",
  setup(__props) {
    const pageTitle = common_vendor.ref("直播播放");
    const playUrl = common_vendor.ref("");
    const mode = common_vendor.ref("live");
    const errorText = common_vendor.ref("");
    const autoPlay = common_vendor.ref(true);
    const useVideoPlayer = common_vendor.computed(() => {
      const url = playUrl.value.toLowerCase();
      return url.startsWith("http://") || url.startsWith("https://") ? url.indexOf(".m3u8") > -1 || url.indexOf(".mp4") > -1 : false;
    });
    const useWebView = common_vendor.computed(() => {
      if (useVideoPlayer.value) {
        return false;
      }
      const url = playUrl.value.toLowerCase();
      return url.startsWith("http://") || url.startsWith("https://");
    });
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    }
    function copyLink() {
      if (playUrl.value.length == 0) {
        return null;
      }
      common_vendor.index.setClipboardData({
        data: playUrl.value,
        success: () => {
          common_vendor.index.showToast({
            title: "播放地址已复制",
            icon: "none"
          });
        }
      });
    }
    common_vendor.onLoad((options = null) => {
      const routeOptions = options;
      const titleValue = routeOptions["title"];
      const urlValue = routeOptions["url"];
      const modeValue = routeOptions["mode"];
      if (typeof titleValue == "string" && titleValue.length > 0) {
        pageTitle.value = decodeURIComponent(titleValue);
      }
      if (typeof modeValue == "string" && modeValue.length > 0) {
        mode.value = modeValue;
      }
      if (typeof urlValue == "string" && urlValue.length > 0) {
        playUrl.value = utils_auth.normalizeAppUrl(decodeURIComponent(urlValue));
      }
      if (playUrl.value.length == 0) {
        errorText.value = "缺少播放地址";
        return null;
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(pageTitle.value),
        d: errorText.value.length > 0
      }, errorText.value.length > 0 ? {
        e: common_vendor.t(errorText.value)
      } : useVideoPlayer.value ? {
        g: playUrl.value,
        h: pageTitle.value,
        i: autoPlay.value
      } : useWebView.value ? {
        k: playUrl.value
      } : {
        l: common_vendor.o(copyLink)
      }, {
        f: useVideoPlayer.value,
        j: useWebView.value,
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/player.js.map
