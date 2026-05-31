"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class ApiResponse extends UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          success: { type: Boolean, optional: false },
          code: { type: String, optional: true },
          message: { type: String, optional: true },
          data: { type: "Unknown", optional: true }
        };
      },
      name: "ApiResponse"
    };
  }
  constructor(options, metadata = ApiResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.success = this.__props__.success;
    this.code = this.__props__.code;
    this.message = this.__props__.message;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class AppPodcastAudio extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          podcastId: { type: Number, optional: false },
          title: { type: String, optional: false },
          audioUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppPodcastAudio"
    };
  }
  constructor(options, metadata = AppPodcastAudio.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.podcastId = this.__props__.podcastId;
    this.title = this.__props__.title;
    this.audioUrl = this.__props__.audioUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppPodcast extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          audios: { type: UTS.UTSType.withGenerics(Array, [AppPodcastAudio]), optional: false }
        };
      },
      name: "AppPodcast"
    };
  }
  constructor(options, metadata = AppPodcast.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.audios = this.__props__.audios;
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
const BASE_URL = "https://api-test.arez.cc.cd";
const ACCESS_TOKEN_KEY = "app_auth_access_token";
const TOKEN_TYPE_KEY = "app_auth_token_type";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const audioId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    common_vendor.ref(false);
    const audioTitle = common_vendor.ref("音频标题占位 1");
    const audioSummary = common_vendor.ref("这里是音频简介占位内容。后续可接入真实的音频简介、讲师说明、学习目标、适用人群与补充说明等文本信息。这里保留为较长段落，用于模拟设计图中的正文排版效果，方便后续直接替换成接口返回内容。");
    const viewCount = common_vendor.ref("1200");
    const favoriteCount = common_vendor.ref("860");
    const currentAudioItemId = common_vendor.ref("1");
    const catalogItems = common_vendor.ref([
      new CatalogItem({ id: "1", title: "音频 1：目录标题占位一", duration: `21'44"` }),
      new CatalogItem({ id: "2", title: "音频 2：目录标题占位二", duration: `18'20"` }),
      new CatalogItem({ id: "3", title: "音频 3：目录标题占位三", duration: `16'08"` }),
      new CatalogItem({ id: "4", title: "音频 4：目录标题占位四", duration: `14'35"` })
    ]);
    function showDebugModal(content) {
      return null;
    }
    function getAuthorization() {
      const token = common_vendor.index.getStorageSync(ACCESS_TOKEN_KEY);
      const tokenType = common_vendor.index.getStorageSync(TOKEN_TYPE_KEY);
      if (typeof token === "string" && token.length > 0) {
        if (typeof tokenType === "string" && tokenType.length > 0) {
          return tokenType + " " + token;
        }
        return "Bearer " + token;
      }
      return "";
    }
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
    function tryReadRouteParams() {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return false;
      }
      const currentPage = pages[pages.length - 1];
      if (currentPage == null || currentPage.options == null) {
        return false;
      }
      const options = currentPage.options;
      const idValue = options["id"];
      if (typeof idValue === "string" && idValue.length > 0) {
        audioId.value = idValue;
        return true;
      }
      return false;
    }
    function fetchAudioDetail() {
      if (audioId.value.length == 0) {
        return null;
      }
      const headers = new UTSJSONObject({
        "Content-Type": "application/json"
      });
      const authorization = getAuthorization();
      if (authorization.length > 0) {
        headers["Authorization"] = authorization;
      }
      common_vendor.index.request({
        url: BASE_URL + "/api/v1/app/learning/podcasts/" + audioId.value,
        method: "GET",
        header: headers,
        success: (res) => {
          const data = res.data;
          if (res.statusCode == 200 && data != null && data.success && data.data != null) {
            const podcast = data.data;
            const titleText = safeText(podcast.title).length > 0 ? podcast.title : "空";
            const audioCount = podcast.audios != null ? podcast.audios.length : 0;
            showDebugModal("详情接口返回成功：id=" + audioId.value + "，title=" + titleText + "，目录数量=" + String(audioCount));
            if (safeText(podcast.title).length > 0) {
              audioTitle.value = podcast.title;
            }
            if (safeText(podcast.summary).length > 0) {
              audioSummary.value = podcast.summary;
            }
            viewCount.value = String(podcast.studySeconds != null ? podcast.studySeconds : 0);
            favoriteCount.value = String(podcast.audios != null ? podcast.audios.length : 0);
            if (podcast.audios != null && podcast.audios.length > 0) {
              catalogItems.value = podcast.audios.map((item, index) => {
                const itemTitle = safeText(item.title).length > 0 ? item.title : "音频 " + String(index + 1) + "：目录标题占位";
                return new CatalogItem({
                  id: String(item.id),
                  title: itemTitle,
                  duration: formatDuration(item.durationSeconds)
                });
              });
              currentAudioItemId.value = catalogItems.value[0].id;
            }
          } else {
            const codeText = data != null && typeof data.code === "string" ? data.code : "未知错误";
            const messageText = data != null && typeof data.message === "string" ? data.message : "无返回说明";
            showDebugModal("详情接口返回失败：HTTP " + String(res.statusCode) + "，" + codeText + "，" + messageText);
          }
        },
        fail: (err) => {
          typeof err.errMsg === "string" ? err.errMsg : "请求失败";
        }
      });
    }
    function initAudioDetail() {
      if (tryReadRouteParams()) {
        fetchAudioDetail();
        return null;
      }
      setTimeout(() => {
        if (tryReadRouteParams()) {
          fetchAudioDetail();
        }
      }, 300);
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    common_vendor.onMounted(() => {
      initAudioDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.n(activeTab.value == "intro" ? "detail-tab-active" : ""),
        d: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        e: common_vendor.n(activeTab.value == "catalog" ? "detail-tab-active" : ""),
        f: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        g: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        h: common_vendor.t(audioTitle.value),
        i: common_vendor.t(viewCount.value),
        j: common_vendor.t(favoriteCount.value),
        k: common_vendor.t(audioSummary.value)
      } : {
        l: common_vendor.f(catalogItems.value, (item, k0, i0) => {
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
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/detail.js.map
