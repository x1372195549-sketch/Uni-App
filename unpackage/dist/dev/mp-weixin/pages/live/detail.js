"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const RESOURCE_TYPE = "LIVE";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const liveId = common_vendor.ref("");
    const liveTitle = common_vendor.ref("直播详情");
    const liveMetaLeft = common_vendor.ref("未安排");
    const liveFavoriteCount = common_vendor.ref("0");
    const liveIntro = common_vendor.ref("这里展示直播基础信息。");
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function formatDateTime(value) {
      if (value.length == 0) {
        return "未安排";
      }
      if (value.length >= 16) {
        return value.slice(0, 16).replace("T", " ");
      }
      return value.replace("T", " ");
    }
    function mapLiveStatus(status) {
      if (status == "1") {
        return "直播中";
      }
      if (status == "2") {
        return "已结束";
      }
      if (status == "3") {
        return "回放";
      }
      return "未开始";
    }
    function loadFavoriteStatus() {
      if (liveId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(liveId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    }
    function toggleFavorite() {
      if (liveId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(liveId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavorited.value = result.favorited;
        liveFavoriteCount.value = String(result.favoriteCount != null ? result.favoriteCount : 0);
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: result.favorited ? "收藏成功" : "已取消收藏",
          icon: "success"
        });
      }, (message) => {
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    function applyLiveDetail(detail) {
      const titleText = safeText(detail.title);
      if (titleText.length > 0) {
        liveTitle.value = titleText;
      }
      const anchorText = safeText(detail.anchorName);
      const timeText = safeText(detail.startAt);
      const endText = safeText(detail.endAt);
      const playbackText = safeText(detail.playbackUrl);
      const liveUrlText = safeText(detail.liveUrl);
      const statusText = safeText(detail.liveStatus);
      liveMetaLeft.value = formatDateTime(timeText);
      const introParts = new Array();
      if (anchorText.length > 0) {
        introParts.push("主讲人：" + anchorText);
      }
      if (timeText.length > 0) {
        introParts.push("开始时间：" + formatDateTime(timeText));
      }
      if (endText.length > 0) {
        introParts.push("结束时间：" + formatDateTime(endText));
      }
      if (statusText.length > 0) {
        introParts.push("直播状态：" + mapLiveStatus(statusText));
      }
      if (playbackText.length > 0) {
        introParts.push("回放地址：" + playbackText);
      } else if (liveUrlText.length > 0) {
        introParts.push("直播地址：" + liveUrlText);
      }
      if (introParts.length > 0) {
        liveIntro.value = introParts.join("；");
      }
    }
    function loadParams() {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const current = pages[pages.length - 1];
      if (current != null && current.options != null && current.options["id"] != null) {
        liveId.value = current.options["id"];
      }
    }
    function loadLiveDetail() {
      if (liveId.value.length == 0) {
        return null;
      }
      utils_auth.fetchLiveSessionDetail(liveId.value, (detail) => {
        applyLiveDetail(detail);
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    common_vendor.onMounted(() => {
      loadParams();
      loadLiveDetail();
      loadFavoriteStatus();
    });
    common_vendor.onShow(() => {
      loadFavoriteStatus();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(liveTitle.value),
        d: common_vendor.t(isFavorited.value ? "已收藏" : "收藏"),
        e: common_vendor.n(isFavorited.value ? "favorite-text-active" : ""),
        f: common_vendor.o(toggleFavorite),
        g: common_vendor.t(liveMetaLeft.value),
        h: common_vendor.t(liveFavoriteCount.value),
        i: common_vendor.t(liveIntro.value),
        j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/detail.js.map
