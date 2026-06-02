"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class LiveItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          coverTitle: { type: String, optional: false },
          coverSubtitle: { type: String, optional: false },
          title: { type: String, optional: false },
          teacher: { type: String, optional: false },
          views: { type: String, optional: false },
          comments: { type: String, optional: false }
        };
      },
      name: "LiveItem"
    };
  }
  constructor(options, metadata = LiveItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
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
  __name: "index",
  setup(__props) {
    const placeholderItems = [
      new UTSJSONObject({
        id: "1",
        coverTitle: "直播封面占位",
        coverSubtitle: "第一场直播",
        title: "直播标题占位一，点击进入直播详情页面",
        teacher: "讲师名称占位",
        views: "1800",
        comments: "240"
      }),
      new UTSJSONObject({
        id: "2",
        coverTitle: "直播封面占位",
        coverSubtitle: "第二场直播",
        title: "直播标题占位二，点击进入直播详情页面",
        teacher: "讲师名称占位",
        views: "1800",
        comments: "240"
      })
    ];
    const liveItems = common_vendor.ref([]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatStartText = (value = null, index) => {
      const text = safeText(value);
      if (text.length == 0) {
        return "第" + String(index + 1) + "场直播";
      }
      if (text.length >= 16) {
        return text.slice(5, 16).replace("T", " ");
      }
      return text;
    };
    const mapLiveToCard = (item, index) => {
      const titleText = safeText(item.title);
      const anchorText = safeText(item.anchorName);
      const liveStatusText = item.liveStatus == "1" ? "直播中" : item.liveStatus == "2" ? "直播预告" : item.liveStatus == "3" ? "直播回放" : "直播内容";
      return new LiveItem({
        id: String(item.id),
        coverTitle: titleText.length > 0 ? titleText : "直播封面占位",
        coverSubtitle: formatStartText(item.startAt, index),
        title: titleText.length > 0 ? titleText : "直播标题占位",
        teacher: anchorText.length > 0 ? anchorText : liveStatusText,
        views: item.startAt != null && item.startAt.length > 0 ? "已排期" : "未排期",
        comments: item.playbackUrl != null && item.playbackUrl.length > 0 ? "有回放" : "无回放"
      });
    };
    const loadLiveItems = () => {
      utils_auth.fetchLiveSessions((pageData) => {
        if (pageData.records != null && pageData.records.length > 0) {
          liveItems.value = pageData.records.map((item, index) => {
            return mapLiveToCard(item, index);
          });
          return null;
        }
        liveItems.value = placeholderItems;
      }, () => {
        liveItems.value = placeholderItems;
      });
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goAudioPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
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
    const goLiveDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + id });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    loadLiveItems();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goAudioPage),
        d: common_vendor.o(goCoursePage),
        e: common_vendor.o(goNewsPage),
        f: common_vendor.f(liveItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.coverTitle),
            b: common_vendor.t(item.coverSubtitle),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.teacher),
            e: common_vendor.t(item.views),
            f: common_vendor.t(item.comments),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goLiveDetail(item.id);
            }, item.id)
          };
        }),
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/index.js.map
