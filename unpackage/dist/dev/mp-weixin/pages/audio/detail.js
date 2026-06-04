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
const RESOURCE_TYPE = "podcast";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const audioId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const audioTitle = common_vendor.ref("音频详情");
    const audioSummary = common_vendor.ref("这里展示音频简介内容。");
    const viewCount = common_vendor.ref("0");
    const favoriteCount = common_vendor.ref("0");
    const currentAudioItemId = common_vendor.ref("");
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const catalogItems = common_vendor.ref([]);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function formatDuration(seconds) {
      const total = seconds > 0 ? seconds : 0;
      const minute = Math.floor(total / 60);
      const second = total % 60;
      const secondText = second < 10 ? "0" + String(second) : String(second);
      return String(minute) + "'" + secondText + '"';
    }
    function selectCatalogItem(id) {
      currentAudioItemId.value = id;
    }
    function loadFavoriteStatus() {
      if (audioId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(audioId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    }
    function toggleFavorite() {
      if (audioId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(audioId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavorited.value = result.favorited;
        favoriteCount.value = String(result.favoriteCount != null ? result.favoriteCount : 0);
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
    function applyAudioDetail(detail) {
      const titleText = safeText(detail.title);
      const summaryText = safeText(detail.summary);
      if (titleText.length > 0) {
        audioTitle.value = titleText;
      }
      if (summaryText.length > 0) {
        audioSummary.value = summaryText;
      }
      viewCount.value = String(detail.studySeconds != null ? detail.studySeconds : 0);
      if (detail.audios != null && detail.audios.length > 0) {
        catalogItems.value = detail.audios.map((item, index) => {
          return new CatalogItem({
            id: String(item.id),
            title: safeText(item.title).length > 0 ? item.title : "音频 " + String(index + 1),
            duration: formatDuration(item.durationSeconds)
          });
        });
        currentAudioItemId.value = catalogItems.value[0].id;
      } else {
        catalogItems.value = [];
        currentAudioItemId.value = "";
      }
    }
    function loadParams() {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const currentPage = pages[pages.length - 1];
      if (currentPage == null || currentPage.options == null) {
        return null;
      }
      const options = currentPage.options;
      const idValue = options["id"];
      if (typeof idValue == "string" && idValue.length > 0) {
        audioId.value = idValue;
      }
    }
    function loadAudioDetail() {
      if (audioId.value.length == 0) {
        return null;
      }
      utils_auth.fetchAudioDetail(audioId.value, (detail) => {
        applyAudioDetail(detail);
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    common_vendor.onMounted(() => {
      loadParams();
      loadAudioDetail();
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
        c: common_vendor.n(activeTab.value == "intro" ? "detail-tab detail-tab-active" : "detail-tab"),
        d: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {} : {}, {
        e: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        f: common_vendor.n(activeTab.value == "catalog" ? "detail-tab detail-tab-active" : "detail-tab"),
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
        m: common_vendor.t(audioTitle.value),
        n: common_vendor.t(viewCount.value),
        o: common_vendor.t(favoriteCount.value),
        p: common_vendor.t(audioSummary.value)
      } : {
        q: common_vendor.f(catalogItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.n(item.id == currentAudioItemId.value ? "catalog-title-active" : ""),
            c: common_vendor.t(item.duration),
            d: common_vendor.n(item.id == currentAudioItemId.value ? "catalog-duration-active" : ""),
            e: item.id,
            f: common_vendor.n(item.id == currentAudioItemId.value ? "catalog-item-active" : ""),
            g: common_vendor.o(($event) => {
              return selectCatalogItem(item.id);
            }, item.id)
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/detail.js.map
