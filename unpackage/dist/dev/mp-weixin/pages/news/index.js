"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class TopicItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          topicId: { type: Number, optional: false },
          itemType: { type: String, optional: false },
          itemId: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          resource: { type: "Unknown", optional: true }
        };
      },
      name: "TopicItem"
    };
  }
  constructor(options, metadata = TopicItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.topicId = this.__props__.topicId;
    this.itemType = this.__props__.itemType;
    this.itemId = this.__props__.itemId;
    this.sortOrder = this.__props__.sortOrder;
    this.resource = this.__props__.resource;
    delete this.__props__;
  }
}
class Topic extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          items: { type: UTS.UTSType.withGenerics(Array, [TopicItem]), optional: false }
        };
      },
      name: "Topic"
    };
  }
  constructor(options, metadata = Topic.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.items = this.__props__.items;
    delete this.__props__;
  }
}
class NewsItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          coverTitle: { type: String, optional: false },
          coverSubtitle: { type: String, optional: false },
          title: { type: String, optional: false },
          source: { type: String, optional: false },
          views: { type: String, optional: false },
          comments: { type: String, optional: false }
        };
      },
      name: "NewsItem"
    };
  }
  constructor(options, metadata = NewsItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.source = this.__props__.source;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const placeholderItems = [
      new NewsItem({
        id: "1",
        coverTitle: "资讯封面占位",
        coverSubtitle: "第一条资讯",
        title: "资讯标题占位一，点击进入资讯详情页面",
        source: "来源占位",
        views: "3200",
        comments: "3"
      }),
      new NewsItem({
        id: "2",
        coverTitle: "资讯封面占位",
        coverSubtitle: "第二条资讯",
        title: "资讯标题占位二，点击进入资讯详情页面",
        source: "来源占位",
        views: "3200",
        comments: "3"
      })
    ];
    const newsItems = common_vendor.ref([]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const mapTopicToNews = (item, index) => {
      const title = safeText(item.title);
      const summary = safeText(item.summary);
      return new NewsItem({
        id: String(item.id),
        coverTitle: title.length > 0 ? title : "资讯封面占位",
        coverSubtitle: summary.length > 0 ? summary : "第" + String(index + 1) + "条资讯",
        title: title.length > 0 ? title : "资讯标题占位",
        source: safeText(item.publishedAt).length > 0 ? item.publishedAt : "专题来源",
        views: String(item.viewCount != null ? item.viewCount : 0),
        comments: String(item.items != null ? item.items.length : 0)
      });
    };
    const loadNewsItems = () => {
      utils_auth.fetchTopics((pageData) => {
        if (pageData.records != null && pageData.records.length > 0) {
          newsItems.value = pageData.records.map((item, index) => {
            return mapTopicToNews(item, index);
          });
          return null;
        }
        newsItems.value = placeholderItems;
      }, () => {
        newsItems.value = placeholderItems;
      });
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goAudioPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const goNewsDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + id });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    loadNewsItems();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goAudioPage),
        d: common_vendor.o(goLivePage),
        e: common_vendor.o(goCoursePage),
        f: common_vendor.f(newsItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.coverTitle),
            b: common_vendor.t(item.coverSubtitle),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.source),
            e: common_vendor.t(item.views),
            f: common_vendor.t(item.comments),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goNewsDetail(item.id);
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
