"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class LiveCardItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          teacher: { type: String, optional: false },
          timeText: { type: String, optional: false },
          statusLabel: { type: String, optional: false },
          playbackText: { type: String, optional: false },
          views: { type: String, optional: false },
          favorites: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          coverTitle: { type: String, optional: false },
          coverSubtitle: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false }
        };
      },
      name: "LiveCardItem"
    };
  }
  constructor(options, metadata = LiveCardItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.timeText = this.__props__.timeText;
    this.statusLabel = this.__props__.statusLabel;
    this.playbackText = this.__props__.playbackText;
    this.views = this.__props__.views;
    this.favorites = this.__props__.favorites;
    this.coverUrl = this.__props__.coverUrl;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.tags = this.__props__.tags;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicsTabText = "专题";
const audioTabText = "音频";
const pageTitleText = "直播";
const courseTabText = "课程";
const newsTabText = "资讯";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const searchPlaceholder = "搜索标题、讲师、主播";
const searchText = "搜索";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无直播";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "请求失败，请稍后重试";
const viewText = "浏览";
const favoriteText = "收藏";
const fallbackTeacherText = "讲师待定";
const fallbackTimeText = "时间待定";
const fallbackCoverTitle = "直播封面";
const playbackReadyText = "可回放";
const playbackEmptyText = "无回放";
const liveText = "直播中";
const endedText = "已结束";
const canceledText = "已取消";
const notStartedText = "未开始";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const liveItems = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const hasLoadedOnce = common_vendor.ref(false);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function formatDateTime(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "";
      }
      if (text.length >= 16) {
        return text.slice(0, 16).replace("T", " ");
      }
      return text.replace("T", " ");
    }
    function mapLiveStatus(status) {
      const normalized = safeText(status).toUpperCase();
      if (normalized == "LIVE" || normalized == "1") {
        return liveText;
      }
      if (normalized == "ENDED" || normalized == "2") {
        return endedText;
      }
      if (normalized == "CANCELED" || normalized == "3") {
        return canceledText;
      }
      return notStartedText;
    }
    function formatLiveTime(item) {
      const startText = formatDateTime(item.startAt);
      const endText = formatDateTime(item.endAt);
      if (startText.length > 0 && endText.length > 0) {
        return startText + " - " + endText;
      }
      if (startText.length > 0) {
        return startText;
      }
      return fallbackTimeText;
    }
    function formatCoverSubtitle(item) {
      const startText = formatDateTime(item.startAt);
      return startText.length > 0 ? startText : "直播预告";
    }
    function mapLiveToCard(item) {
      const titleText = safeText(item.title);
      const speakerText = safeText(item.speakerName);
      const anchorText = safeText(item.anchorName);
      const teacherText = speakerText.length > 0 ? speakerText : anchorText.length > 0 ? anchorText : fallbackTeacherText;
      return new LiveCardItem({
        id: String(item.id),
        title: titleText.length > 0 ? titleText : "直播详情",
        teacher: teacherText,
        timeText: formatLiveTime(item),
        statusLabel: mapLiveStatus(item.liveStatus),
        playbackText: safeText(item.playbackUrl).length > 0 ? playbackReadyText : playbackEmptyText,
        views: String(item.browseCount),
        favorites: String(item.favoriteCount),
        coverUrl: safeText(item.coverUrl),
        coverTitle: titleText.length > 0 ? titleText : fallbackCoverTitle,
        coverSubtitle: formatCoverSubtitle(item),
        tags: item.tags != null ? item.tags : []
      });
    }
    function loadLiveItems(loadMoreValue) {
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
      utils_auth.fetchLiveSessions(page.value, PAGE_SIZE, keyword.value, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const mapped = records.map((item) => {
          return mapLiveToCard(item);
        });
        if (loadMoreValue) {
          liveItems.value = liveItems.value.concat(mapped);
        } else {
          liveItems.value = mapped;
        }
        hasMore.value = records.length >= PAGE_SIZE;
        if (hasMore.value) {
          page.value += 1;
        }
        isLoading.value = false;
        isListLoading.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        isLoading.value = false;
        isListLoading.value = false;
      });
    }
    function reloadList() {
      loadLiveItems(false);
    }
    function loadMore() {
      loadLiveItems(true);
    }
    function goLearningPage() {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    }
    function goTopicsPage() {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    }
    function goAudioPage() {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
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
    function goConsultPage() {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    }
    function goKnowledgePage() {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    }
    function goLiveDetail(id) {
      common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + id });
    }
    common_vendor.onShow(() => {
      if (!hasLoadedOnce.value) {
        hasLoadedOnce.value = true;
        loadLiveItems(false);
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
        g: common_vendor.t(audioTabText),
        h: common_vendor.o(goAudioPage),
        i: common_vendor.t(pageTitleText),
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
      } : liveItems.value.length == 0 ? {
        B: common_vendor.t(emptyText)
      } : common_vendor.e({
        C: common_vendor.f(liveItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.coverTitle),
            d: common_vendor.t(item.coverSubtitle)
          }, {
            e: common_vendor.t(item.statusLabel),
            f: common_vendor.t(item.title),
            g: common_vendor.t(item.teacher),
            h: common_vendor.t(item.timeText),
            i: item.tags.length > 0
          }, item.tags.length > 0 ? {
            j: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            })
          } : {}, {
            k: common_vendor.t(item.views),
            l: common_vendor.t(item.favorites),
            m: common_vendor.t(item.playbackText),
            n: item.id,
            o: common_vendor.o(($event) => {
              return goLiveDetail(item.id);
            }, item.id)
          });
        }),
        D: common_vendor.t(viewText),
        E: common_vendor.t(favoriteText),
        F: isListLoading.value
      }, isListLoading.value ? {
        G: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        I: common_vendor.t(noMoreText)
      } : {}, {
        H: !hasMore.value
      }), {
        w: errorText.value.length > 0,
        A: liveItems.value.length == 0,
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
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/index.js.map
