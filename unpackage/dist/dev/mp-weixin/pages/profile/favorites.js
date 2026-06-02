"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class BookItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          timeText: { type: String, optional: false },
          typeLabel: { type: String, optional: false },
          cover: { type: String, optional: false }
        };
      },
      name: "BookItem"
    };
  }
  constructor(options, metadata = BookItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.timeText = this.__props__.timeText;
    this.typeLabel = this.__props__.typeLabel;
    this.cover = this.__props__.cover;
    delete this.__props__;
  }
}
class PosterItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          posterTitle: { type: String, optional: false },
          posterSubTitle: { type: String, optional: false },
          sideText: { type: String, optional: false },
          typeLabel: { type: String, optional: false },
          cover: { type: String, optional: false },
          coverColor: { type: String, optional: false }
        };
      },
      name: "PosterItem"
    };
  }
  constructor(options, metadata = PosterItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.posterTitle = this.__props__.posterTitle;
    this.posterSubTitle = this.__props__.posterSubTitle;
    this.sideText = this.__props__.sideText;
    this.typeLabel = this.__props__.typeLabel;
    this.cover = this.__props__.cover;
    this.coverColor = this.__props__.coverColor;
    delete this.__props__;
  }
}
const TAB_BOOK = "书籍";
const TAB_COURSE = "课程";
const TAB_TOPIC = "专题";
const TAB_PAPER = "试题";
const pageTitle = "我的收藏";
const lastLearnPrefix = "上次学习：";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "favorites",
  setup(__props) {
    const tabs = [TAB_BOOK, TAB_COURSE, TAB_TOPIC, TAB_PAPER];
    const activeTab = common_vendor.ref(TAB_BOOK);
    const bookItems = common_vendor.ref([
      new BookItem({ id: 1, title: "对症艾灸", timeText: "2019-10-10 10:10", typeLabel: TAB_BOOK, cover: "/static/logo.png" }),
      new BookItem({ id: 2, title: "百草良方", timeText: "2019-10-10 10:10", typeLabel: TAB_BOOK, cover: "/static/logo.png" }),
      new BookItem({ id: 3, title: "黄帝内经", timeText: "2019-10-10 10:10", typeLabel: TAB_BOOK, cover: "/static/logo.png" })
    ]);
    const posterItems = common_vendor.ref([
      new PosterItem({
        id: 1,
        title: "全息易象针灸 基础理论篇",
        posterTitle: "全息\n易象针灸",
        posterSubTitle: "基础理论篇",
        sideText: "郑卫东",
        typeLabel: TAB_COURSE,
        cover: "/static/logo.png",
        coverColor: "#F7E6D8"
      }),
      new PosterItem({
        id: 2,
        title: "全息易象针灸 基础理论篇",
        posterTitle: "全息\n易象针灸",
        posterSubTitle: "基础理论篇",
        sideText: "郑卫东",
        typeLabel: TAB_TOPIC,
        cover: "/static/logo.png",
        coverColor: "#F7E6D8"
      })
    ]);
    const handleBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({
        url: "/pages/mine/index"
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.t(pageTitle),
        d: common_vendor.f(tabs, (tab, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab),
            b: common_vendor.n(common_vendor.unref(activeTab) == tab ? "top-tab-text-active" : ""),
            c: common_vendor.unref(activeTab) == tab
          }, common_vendor.unref(activeTab) == tab ? {} : {}, {
            d: tab,
            e: common_vendor.o(($event) => {
              return activeTab.value = tab;
            }, tab)
          });
        }),
        e: common_vendor.unref(activeTab) == TAB_BOOK
      }, common_vendor.unref(activeTab) == TAB_BOOK ? {
        f: common_vendor.f(common_vendor.unref(bookItems), (item, k0, i0) => {
          return {
            a: item.cover,
            b: common_vendor.t(item.typeLabel),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.timeText),
            e: item.id
          };
        }),
        g: common_vendor.t(lastLearnPrefix)
      } : {
        h: common_vendor.f(common_vendor.unref(posterItems), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.typeLabel),
            b: common_vendor.t(item.posterTitle),
            c: common_vendor.t(item.posterSubTitle),
            d: common_vendor.t(item.sideText),
            e: item.cover,
            f: item.coverColor,
            g: common_vendor.t(item.title),
            h: item.id
          };
        })
      }, {
        i: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/favorites.js.map
