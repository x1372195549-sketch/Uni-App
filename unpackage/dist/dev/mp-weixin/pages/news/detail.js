"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
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
const RESOURCE_TYPE = "INFO";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const topicId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const topicTitle = common_vendor.ref("资讯详情");
    const topicViews = common_vendor.ref("0");
    const topicFavoriteCount = common_vendor.ref("0");
    const topicIntro = common_vendor.ref("这里展示专题简介、学习要求和补充说明。");
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const catalogItems = common_vendor.ref([]);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function loadFavoriteStatus() {
      if (topicId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(topicId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    }
    function toggleFavorite() {
      if (topicId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(topicId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavorited.value = result.favorited;
        topicFavoriteCount.value = String(result.favoriteCount != null ? result.favoriteCount : 0);
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
    function applyTopicDetail(detail) {
      const titleText = safeText(detail.title);
      if (titleText.length > 0) {
        topicTitle.value = titleText;
      }
      const introText = safeText(detail.learningRequirements).length > 0 ? safeText(detail.learningRequirements) : safeText(detail.summary);
      if (introText.length > 0) {
        topicIntro.value = introText;
      }
      topicViews.value = String(detail.viewCount != null ? detail.viewCount : 0);
      if (detail.items != null && detail.items.length > 0) {
        catalogItems.value = detail.items.map((item, index) => {
          const itemType = safeText(item.itemType);
          return new CatalogItem({
            id: String(item.id),
            title: itemType.length > 0 ? itemType + " " + String(index + 1) : "条目 " + String(index + 1),
            duration: ""
          });
        });
      } else {
        catalogItems.value = [];
      }
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function loadParams() {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const current = pages[pages.length - 1];
      if (current == null || current.options == null) {
        return null;
      }
      const options = current.options;
      const idValue = options["id"];
      const tabValue = options["tab"];
      if (typeof idValue == "string" && idValue.length > 0) {
        topicId.value = idValue;
      }
      if (typeof tabValue == "string" && tabValue.length > 0) {
        activeTab.value = tabValue;
      }
    }
    function loadTopicDetail() {
      if (topicId.value.length == 0) {
        return null;
      }
      utils_auth.fetchTopicDetail(topicId.value, (detail) => {
        applyTopicDetail(detail);
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    common_vendor.onMounted(() => {
      loadParams();
      loadTopicDetail();
      loadFavoriteStatus();
    });
    common_vendor.onShow(() => {
      loadFavoriteStatus();
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
        i: common_vendor.t(isFavorited.value ? "已收藏" : "收藏"),
        j: common_vendor.n(isFavorited.value ? "favorite-text-active" : ""),
        k: common_vendor.o(toggleFavorite),
        l: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        m: common_vendor.t(topicTitle.value),
        n: common_vendor.t(topicViews.value),
        o: common_vendor.t(topicFavoriteCount.value),
        p: common_vendor.t(topicIntro.value)
      } : {
        q: common_vendor.f(catalogItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.duration),
            c: item.id
          };
        })
      }, {
        r: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/detail.js.map
