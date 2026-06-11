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
          duration: { type: String, optional: false },
          audioUrl: { type: String, optional: false }
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
    this.audioUrl = this.__props__.audioUrl;
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
    const audioCoverUrl = common_vendor.ref("");
    const viewCount = common_vendor.ref("0");
    const favoriteCount = common_vendor.ref("0");
    const currentAudioItemId = common_vendor.ref("");
    const currentAudioUrl = common_vendor.ref("");
    const currentAudioTitle = common_vendor.ref("");
    const currentAudioDuration = common_vendor.ref("00:00");
    const isAudioPlaying = common_vendor.ref(false);
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const catalogItems = common_vendor.ref([]);
    let audioContext = null;
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function formatDuration(seconds) {
      const total = seconds > 0 ? seconds : 0;
      const minute = Math.floor(total / 60);
      const second = total % 60;
      const minuteText = minute < 10 ? "0" + String(minute) : String(minute);
      const secondText = second < 10 ? "0" + String(second) : String(second);
      return minuteText + ":" + secondText;
    }
    function formatBackendDuration(seconds) {
      return seconds > 0 ? formatDuration(seconds) : "--:--";
    }
    function updateCatalogDuration(id, durationText) {
      catalogItems.value = catalogItems.value.map((item) => {
        if (item.id == id) {
          return new CatalogItem({
            id: item.id,
            title: item.title,
            duration: durationText,
            audioUrl: item.audioUrl
          });
        }
        return item;
      });
    }
    function syncRealAudioDuration(context) {
      const duration = Math.floor(context.duration);
      if (duration > 0) {
        const durationText = formatDuration(duration);
        if (currentAudioDuration.value != durationText) {
          currentAudioDuration.value = durationText;
          updateCatalogDuration(currentAudioItemId.value, durationText);
        }
      }
    }
    function normalizeAudioPlayUrl(url) {
      return utils_auth.normalizeAppUrl(url);
    }
    function releaseAudioContext() {
      if (audioContext != null) {
        audioContext.stop();
        audioContext.destroy();
        audioContext = null;
      }
      isAudioPlaying.value = false;
    }
    function prepareAudioContext() {
      releaseAudioContext();
      if (currentAudioUrl.value.length == 0) {
        return null;
      }
      common_vendor.index.setInnerAudioOption(new UTSJSONObject({
        obeyMuteSwitch: false
      }));
      const context = common_vendor.index.createInnerAudioContext();
      context.src = currentAudioUrl.value;
      context.autoplay = false;
      context.onPlay(() => {
        isAudioPlaying.value = true;
      });
      context.onPause(() => {
        isAudioPlaying.value = false;
      });
      context.onStop(() => {
        isAudioPlaying.value = false;
      });
      context.onEnded(() => {
        isAudioPlaying.value = false;
      });
      context.onCanplay(() => {
        syncRealAudioDuration(context);
      });
      context.onTimeUpdate(() => {
        syncRealAudioDuration(context);
      });
      context.onError(() => {
        isAudioPlaying.value = false;
        common_vendor.index.showToast({
          title: "音频播放失败，请检查音频地址",
          icon: "none"
        });
      });
      audioContext = context;
    }
    function toggleAudioPlayback() {
      if (currentAudioUrl.value.length == 0 && currentAudioItemId.value.length > 0) {
        selectCatalogItem(currentAudioItemId.value);
      }
      if (currentAudioUrl.value.length == 0) {
        common_vendor.index.showToast({
          title: "暂无可播放音频",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.setInnerAudioOption(new UTSJSONObject({
        obeyMuteSwitch: false
      }));
      if (audioContext == null) {
        prepareAudioContext();
      }
      if (audioContext == null) {
        return null;
      }
      if (isAudioPlaying.value) {
        audioContext.pause();
      } else {
        audioContext.play();
      }
    }
    function applyCurrentAudio(item) {
      releaseAudioContext();
      currentAudioItemId.value = item.id;
      currentAudioTitle.value = item.title;
      currentAudioUrl.value = item.audioUrl;
      currentAudioDuration.value = item.duration;
    }
    function selectCatalogItem(id) {
      for (let i = 0; i < catalogItems.value.length; i++) {
        const item = catalogItems.value[i];
        if (item.id == id) {
          applyCurrentAudio(item);
          if (item.audioUrl.length == 0) {
            common_vendor.index.showToast({
              title: "暂无可播放音频",
              icon: "none"
            });
          }
          return null;
        }
      }
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
    function reportBrowse() {
      if (audioId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(audioId.value)
      }), () => {
      }, () => {
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
      audioCoverUrl.value = safeText(detail.coverUrl);
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
            duration: formatBackendDuration(item.durationSeconds),
            audioUrl: normalizeAudioPlayUrl(safeText(item.audioUrl))
          });
        });
        currentAudioItemId.value = catalogItems.value[0].id;
        currentAudioTitle.value = catalogItems.value[0].title;
        currentAudioDuration.value = catalogItems.value[0].duration;
        currentAudioUrl.value = "";
      } else {
        catalogItems.value = [];
        currentAudioItemId.value = "";
        currentAudioTitle.value = "";
        currentAudioUrl.value = "";
        currentAudioDuration.value = "00:00";
        releaseAudioContext();
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
        reportBrowse();
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    }
    common_vendor.onMounted(() => {
      loadParams();
      loadAudioDetail();
      loadFavoriteStatus();
    });
    common_vendor.onShow(() => {
      loadFavoriteStatus();
    });
    common_vendor.onHide(() => {
      releaseAudioContext();
    });
    common_vendor.onUnload(() => {
      releaseAudioContext();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: audioCoverUrl.value.length > 0
      }, audioCoverUrl.value.length > 0 ? {
        d: audioCoverUrl.value
      } : {}, {
        e: currentAudioItemId.value.length > 0
      }, currentAudioItemId.value.length > 0 ? common_vendor.e({
        f: !isAudioPlaying.value
      }, !isAudioPlaying.value ? {} : {}) : {}, {
        g: currentAudioItemId.value.length > 0
      }, currentAudioItemId.value.length > 0 ? {
        h: common_vendor.t(currentAudioDuration.value)
      } : {}, {
        i: common_vendor.o(toggleAudioPlayback),
        j: common_vendor.n(activeTab.value == "intro" ? "detail-tab detail-tab-active" : "detail-tab"),
        k: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {} : {}, {
        l: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        m: common_vendor.n(activeTab.value == "catalog" ? "detail-tab detail-tab-active" : "detail-tab"),
        n: activeTab.value == "catalog"
      }, activeTab.value == "catalog" ? {} : {}, {
        o: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        p: common_vendor.t(isFavorited.value ? "已收藏" : "收藏"),
        q: common_vendor.n(isFavorited.value ? "favorite-text-active" : ""),
        r: common_vendor.o(toggleFavorite),
        s: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        t: common_vendor.t(audioTitle.value),
        v: common_vendor.t(viewCount.value),
        w: common_vendor.t(favoriteCount.value),
        x: common_vendor.t(audioSummary.value)
      } : {
        y: common_vendor.f(catalogItems.value, (item, k0, i0) => {
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
        z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/detail.js.map
