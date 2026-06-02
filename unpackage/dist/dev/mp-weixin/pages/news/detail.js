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
class CatalogItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          duration: { type: String, optional: false }
        };
      },
      name: "CatalogItem"
    };
  }
  constructor(options, metadata = CatalogItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.duration = this.__props__.duration;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const topicId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const topicTitle = common_vendor.ref("资讯详情");
    const topicViews = common_vendor.ref("0");
    const topicCatalogCount = common_vendor.ref("0");
    const topicIntro = common_vendor.ref("这里展示专题简介、学习要求和补充说明。接口返回真实专题内容时，将优先显示后端数据。");
    const catalogItems = common_vendor.ref([
      new CatalogItem({ id: "1", title: "专题1：目录标题占位一", duration: `10'20"` }),
      new CatalogItem({ id: "2", title: "专题2：目录标题占位二", duration: `10'20"` }),
      new CatalogItem({ id: "3", title: "专题3：目录标题占位三", duration: `10'20"` }),
      new CatalogItem({ id: "4", title: "专题4：目录标题占位四", duration: `10'20"` })
    ]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const applyTopicDetail = (detail) => {
      const titleText = safeText(detail.title);
      if (titleText.length > 0) {
        topicTitle.value = titleText;
      }
      const introText = safeText(detail.learningRequirements).length > 0 ? safeText(detail.learningRequirements) : safeText(detail.summary);
      if (introText.length > 0) {
        topicIntro.value = introText;
      }
      topicViews.value = String(detail.viewCount != null ? detail.viewCount : 0);
      topicCatalogCount.value = String(detail.items != null ? detail.items.length : 0);
      if (detail.items != null && detail.items.length > 0) {
        catalogItems.value = detail.items.map((item, index) => {
          const itemType = safeText(item.itemType);
          return new CatalogItem({
            id: String(item.id),
            title: "专题" + String(index + 1) + "：" + (itemType.length > 0 ? itemType : "目录项"),
            duration: `10'20"`
          });
        });
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const current = pages[pages.length - 1];
        if (current != null && current.options != null) {
          if (current.options["id"] != null) {
            topicId.value = current.options["id"];
          }
          if (current.options["tab"] != null) {
            activeTab.value = current.options["tab"];
          }
        }
      }
      if (topicId.value.length > 0) {
        utils_auth.fetchTopicDetail(topicId.value, (detail) => {
          applyTopicDetail(detail);
        }, () => {
        });
      }
    };
    common_vendor.onMounted(() => {
      loadParams();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.n(activeTab.value == "intro" ? "tab-text tab-text-active" : "tab-text"),
        d: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {} : {}, {
        e: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        f: common_vendor.n(activeTab.value == "catalog" ? "tab-text tab-text-active" : "tab-text"),
        g: activeTab.value == "catalog"
      }, activeTab.value == "catalog" ? {} : {}, {
        h: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        i: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        j: common_vendor.t(topicTitle.value),
        k: common_vendor.t(topicViews.value),
        l: common_vendor.t(topicCatalogCount.value),
        m: common_vendor.t(topicIntro.value)
      } : {
        n: common_vendor.f(catalogItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.duration),
            c: item.id
          };
        })
      }, {
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/detail.js.map
