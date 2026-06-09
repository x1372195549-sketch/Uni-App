"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
require("../../utils/auth.js");
class AudioCardItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
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
    this.coverUrl = this.__props__.coverUrl;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicsTabText = "专题";
const pageTitleText = "音频";
const liveTabText = "直播";
const courseTabText = "课程";
const newsTabText = "资讯";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const searchPlaceholder = "搜索标题、讲师、摘要";
const searchText = "搜索";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无音频";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "请求失败，请稍后重试";
const viewText = "浏览";
const commentText = "评论";
const fallbackCoverTitle = "音频封面";
const fallbackTitle = "音频标题";
const fallbackTeacher = "暂无简介";
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
const BASE_URL = "https://api-test.arez.cc.cd";
const ACCESS_TOKEN_KEY = "app_auth_access_token";
const TOKEN_TYPE_KEY = "app_auth_token_type";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const audioItems = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const hasLoadedOnce = common_vendor.ref(false);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const getAuthorization = () => {
      const token = common_vendor.index.getStorageSync(ACCESS_TOKEN_KEY);
      const tokenType = common_vendor.index.getStorageSync(TOKEN_TYPE_KEY);
      if (typeof token === "string" && token.length > 0) {
        if (typeof tokenType === "string" && tokenType.length > 0) {
          return tokenType + " " + token;
        }
        return "Bearer " + token;
      }
      return "";
    };
    const mapAudioItem = (item, index) => {
      const title = safeText(item.title);
      const summary = safeText(item.summary);
      const firstAudio = item.audios != null && item.audios.length > 0 ? item.audios[0] : null;
      return new AudioCardItem({
        id: String(item.id),
        coverUrl: safeText(item.coverUrl),
        coverTitle: title.length > 0 ? title : fallbackCoverTitle,
        coverSubtitle: firstAudio != null && safeText(firstAudio.title).length > 0 ? safeText(firstAudio.title) : "第" + String(index + 1) + "条音频",
        title: title.length > 0 ? title : fallbackTitle,
        teacher: summary.length > 0 ? summary : fallbackTeacher,
        views: String(item.studySeconds),
        comments: String(item.audios != null ? item.audios.length : 0)
      });
    };
    const loadAudioItems = (loadMoreValue) => {
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
            const records = data.data.records != null ? data.data.records : [];
            const mapped = records.map((item, index) => {
              return mapAudioItem(item, loadMoreValue ? audioItems.value.length + index : index);
            });
            if (loadMoreValue) {
              audioItems.value = audioItems.value.concat(mapped);
            } else {
              audioItems.value = mapped;
            }
            hasMore.value = records.length >= PAGE_SIZE;
            if (hasMore.value) {
              page.value += 1;
            }
          } else {
            if (!loadMoreValue) {
              audioItems.value = [];
            }
            hasMore.value = false;
            errorText.value = data != null && data.message != null && data.message.length > 0 ? data.message : loadFailedText;
          }
          isLoading.value = false;
          isListLoading.value = false;
        },
        fail: () => {
          errorText.value = loadFailedText;
          isLoading.value = false;
          isListLoading.value = false;
        }
      });
    };
    const reloadList = () => {
      loadAudioItems(false);
    };
    const loadMore = () => {
      loadAudioItems(true);
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goTopicsPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    };
    const goLivePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
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
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    const goAudioDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + id });
    };
    common_vendor.onShow(() => {
      if (!hasLoadedOnce.value) {
        hasLoadedOnce.value = true;
        loadAudioItems(false);
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.o(goLearningPage),
        e: common_vendor.t(topicsTabText),
        f: common_vendor.o(goTopicsPage),
        g: common_vendor.t(pageTitleText),
        h: common_vendor.t(liveTabText),
        i: common_vendor.o(goLivePage),
        j: common_vendor.t(courseTabText),
        k: common_vendor.o(goCoursePage),
        l: common_vendor.t(newsTabText),
        m: common_vendor.o(goNewsPage),
        n: searchPlaceholder,
        o: common_vendor.o(reloadList),
        p: keyword.value,
        q: common_vendor.o(($event) => {
          return keyword.value = $event.detail.value;
        }),
        r: common_vendor.t(searchText),
        s: common_vendor.o(reloadList),
        t: isLoading.value
      }, isLoading.value ? {
        v: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        x: common_vendor.t(errorText.value),
        y: common_vendor.t(retryText),
        z: common_vendor.o(reloadList)
      } : audioItems.value.length == 0 ? {
        B: common_vendor.t(emptyText)
      } : common_vendor.e({
        C: common_vendor.f(audioItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.coverTitle),
            d: common_vendor.t(item.coverSubtitle)
          }, {
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.teacher),
            g: common_vendor.t(item.views),
            h: common_vendor.t(item.comments),
            i: item.id,
            j: common_vendor.o(($event) => {
              return goAudioDetail(item.id);
            }, item.id)
          });
        }),
        D: common_vendor.t(viewText),
        E: common_vendor.t(commentText),
        F: isListLoading.value
      }, isListLoading.value ? {
        G: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        I: common_vendor.t(noMoreText)
      } : {}, {
        H: !hasMore.value
      }), {
        w: errorText.value.length > 0,
        A: audioItems.value.length == 0,
        J: common_vendor.o(loadMore),
        K: common_assets._imports_1$2,
        L: common_vendor.t(learningTabText),
        M: common_assets._imports_2$1,
        N: common_vendor.t(examTabText),
        O: common_vendor.o(goExamPage),
        P: common_assets._imports_4,
        Q: common_vendor.t(consultTabText),
        R: common_vendor.o(goConsultPage),
        S: common_assets._imports_5,
        T: common_vendor.t(knowledgeTabText),
        U: common_vendor.o(goKnowledgePage),
        V: common_assets._imports_6$1,
        W: common_vendor.t(mineTabText),
        X: common_vendor.o(goMinePage),
        Y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/index.js.map
