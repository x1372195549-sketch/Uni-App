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
class PageResponse extends UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          records: { type: UTS.UTSType.withGenerics(Array, ["Unknown"]), optional: true },
          total: { type: Number, optional: true },
          page: { type: Number, optional: true },
          size: { type: Number, optional: true }
        };
      },
      name: "PageResponse"
    };
  }
  constructor(options, metadata = PageResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.records = this.__props__.records;
    this.total = this.__props__.total;
    this.page = this.__props__.page;
    this.size = this.__props__.size;
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
class AudioCardItem extends UTS.UTSType {
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
      name: "AudioCardItem"
    };
  }
  constructor(options, metadata = AudioCardItem.get$UTSMetadata$(), isJSONParse = false) {
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
const BASE_URL = "https://api-test.arez.cc.cd";
const ACCESS_TOKEN_KEY = "app_auth_access_token";
const TOKEN_TYPE_KEY = "app_auth_token_type";
const PAGE_SIZE = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    [
      new AudioCardItem({
        id: "1",
        coverTitle: "音频封面占位",
        coverSubtitle: "第一条音频",
        title: "音频标题占位一，点击进入音频详情页面",
        teacher: "讲师名称占位",
        views: "1200",
        comments: "320"
      }),
      new AudioCardItem({
        id: "2",
        coverTitle: "音频封面占位",
        coverSubtitle: "第二条音频",
        title: "音频标题占位二，点击进入音频详情页面",
        teacher: "讲师名称占位",
        views: "1200",
        comments: "320"
      })
    ];
    const audioItems = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function safeNumberText(value = null) {
      return value == null ? "0" : String(value);
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
    function mapPodcastToCard(item, index) {
      const firstAudio = item.audios != null && item.audios.length > 0 ? item.audios[0] : null;
      const summary = safeText(item.summary);
      return new AudioCardItem({
        id: String(item.id),
        coverTitle: safeText(item.title).length > 0 ? safeText(item.title) : "音频封面占位",
        coverSubtitle: firstAudio != null && safeText(firstAudio.title).length > 0 ? safeText(firstAudio.title) : "第" + String(index + 1) + "条音频",
        title: safeText(item.title).length > 0 ? safeText(item.title) : "音频标题占位",
        teacher: summary.length > 0 ? summary : "音频简介占位",
        views: safeNumberText(item.studySeconds),
        comments: safeNumberText(item.audios != null ? item.audios.length : 0)
      });
    }
    function fetchAudioItems(loadMoreValue) {
      if (!loadMoreValue) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        isLoading.value = true;
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      const headers = new UTSJSONObject({
        "Content-Type": "application/json"
      });
      const authorization = getAuthorization();
      if (authorization.length > 0) {
        headers["Authorization"] = authorization;
      }
      common_vendor.index.request({
        url: BASE_URL + "/api/v1/app/learning/podcasts?page=" + String(page.value) + "&size=" + String(PAGE_SIZE) + (keyword.value.length > 0 ? "&keyword=" + encodeURIComponent(keyword.value) : ""),
        method: "GET",
        header: headers,
        success: (res) => {
          const data = res.data;
          if (res.statusCode == 200 && data != null && data.success && data.data != null && data.data.records != null) {
            const mapped = data.data.records.map((item, index) => {
              return mapPodcastToCard(item, index);
            });
            if (loadMoreValue) {
              audioItems.value = audioItems.value.concat(mapped);
            } else {
              audioItems.value = mapped;
            }
            hasMore.value = mapped.length >= PAGE_SIZE;
            if (hasMore.value) {
              page.value += 1;
            }
          } else {
            if (!loadMoreValue) {
              audioItems.value = [];
            }
            hasMore.value = false;
            errorText.value = data != null && data.message != null && data.message.length > 0 ? data.message : "闊抽鍔犺浇澶辫触";
          }
          isLoading.value = false;
          isListLoading.value = false;
        },
        fail: () => {
          errorText.value = "音频加载失败";
          isLoading.value = false;
          isListLoading.value = false;
        }
      });
    }
    function reloadList() {
      fetchAudioItems(false);
    }
    function loadMore() {
      fetchAudioItems(true);
    }
    function goLearningPage() {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    }
    function goTopicsPage() {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    }
    function goLivePage() {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    }
    function goCoursePage() {
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
    }
    function goNewsPage() {
      common_vendor.index.redirectTo({ url: "/pages/news/index" });
    }
    function goMinePage() {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    }
    function goExamPage() {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    }
    function goAudioDetail(id) {
      common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + id });
    }
    function goKnowledgePage() {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    }
    function goConsultPage() {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    }
    fetchAudioItems(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goTopicsPage),
        d: common_vendor.o(goLivePage),
        e: common_vendor.o(goCoursePage),
        f: common_vendor.o(goNewsPage),
        g: common_vendor.o(reloadList),
        h: keyword.value,
        i: common_vendor.o(($event) => {
          return keyword.value = $event.detail.value;
        }),
        j: common_vendor.o(reloadList),
        k: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        m: common_vendor.t(errorText.value),
        n: common_vendor.o(reloadList)
      } : audioItems.value.length == 0 ? {} : common_vendor.e({
        p: common_vendor.f(audioItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.coverTitle),
            b: common_vendor.t(item.coverSubtitle),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.teacher),
            e: common_vendor.t(item.views),
            f: common_vendor.t(item.comments),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goAudioDetail(item.id);
            }, item.id)
          };
        }),
        q: isListLoading.value
      }, isListLoading.value ? {} : !hasMore.value ? {} : {}, {
        r: !hasMore.value
      }), {
        l: errorText.value.length > 0,
        o: audioItems.value.length == 0,
        s: common_vendor.o(loadMore),
        t: common_assets._imports_1$3,
        v: common_assets._imports_2,
        w: common_vendor.o(goExamPage),
        x: common_assets._imports_3,
        y: common_vendor.o(goConsultPage),
        z: common_assets._imports_4,
        A: common_vendor.o(goKnowledgePage),
        B: common_assets._imports_5,
        C: common_vendor.o(goMinePage),
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/index.js.map
