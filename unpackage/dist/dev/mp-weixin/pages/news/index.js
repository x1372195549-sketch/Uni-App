"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
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
    const newsItems = common_vendor.ref([
      new NewsItem({
        id: "1",
        coverTitle: "资讯封面占位",
        coverSubtitle: "第一条资讯",
        title: "资讯标题占位一，点击进入资讯详情页面",
        source: "来源占位",
        views: "3200",
        comments: "530"
      }),
      new NewsItem({
        id: "2",
        coverTitle: "资讯封面占位",
        coverSubtitle: "第二条资讯",
        title: "资讯标题占位二，点击进入资讯详情页面",
        source: "来源占位",
        views: "3200",
        comments: "530"
      })
    ]);
    const goLearningPage = () => {
      common_vendor.index.reLaunch({ url: "/pages/index/index" });
    };
    const goAudioPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/course/index" });
    };
    const goMinePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/mine/index" });
    };
    const goNewsDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + id });
    };
    const goKnowledgePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/knowledge/index" });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$2,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goAudioPage),
        d: common_vendor.o(goLivePage),
        e: common_vendor.o(goCoursePage),
        f: common_vendor.f(common_vendor.unref(newsItems), (item, k0, i0) => {
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
        i: common_assets._imports_3,
        j: common_assets._imports_4,
        k: common_vendor.o(goKnowledgePage),
        l: common_assets._imports_5,
        m: common_vendor.o(goMinePage),
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
