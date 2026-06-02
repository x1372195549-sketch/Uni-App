"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class LiveSession extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          anchorName: { type: String, optional: false },
          liveUrl: { type: String, optional: false },
          playbackUrl: { type: String, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          reviewStatus: { type: String, optional: false },
          liveStatus: { type: String, optional: false }
        };
      },
      name: "LiveSession"
    };
  }
  constructor(options, metadata = LiveSession.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.anchorName = this.__props__.anchorName;
    this.liveUrl = this.__props__.liveUrl;
    this.playbackUrl = this.__props__.playbackUrl;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.reviewStatus = this.__props__.reviewStatus;
    this.liveStatus = this.__props__.liveStatus;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const liveId = common_vendor.ref("");
    const liveTitle = common_vendor.ref("直播详情");
    const liveMetaLeft = common_vendor.ref("未排期");
    const liveMetaRight = common_vendor.ref("未开始");
    const liveIntro = common_vendor.ref("这里展示直播基础信息。接口返回直播主讲人、时间、状态或回放地址时，将直接显示后端数据。");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const formatDateTime = (value) => {
      if (value.length == 0) {
        return "未排期";
      }
      if (value.length >= 16) {
        return value.slice(0, 16).replace("T", " ");
      }
      return value.replace("T", " ");
    };
    const mapLiveStatus = (status) => {
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
    };
    const applyLiveDetail = (detail) => {
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
      liveMetaRight.value = mapLiveStatus(statusText);
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
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const current = pages[pages.length - 1];
        if (current != null && current.options != null && current.options["id"] != null) {
          liveId.value = current.options["id"];
        }
      }
      if (liveId.value.length > 0) {
        utils_auth.fetchLiveSessionDetail(liveId.value, (detail) => {
          applyLiveDetail(detail);
        }, () => {
        });
      }
    };
    common_vendor.onMounted(() => {
      loadParams();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(liveTitle.value),
        d: common_vendor.t(liveMetaLeft.value),
        e: common_vendor.t(liveMetaRight.value),
        f: common_vendor.t(liveIntro.value),
        g: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/detail.js.map
