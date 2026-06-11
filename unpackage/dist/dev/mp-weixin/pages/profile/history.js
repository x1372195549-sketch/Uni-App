"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class HistoryTab extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          label: { type: String, optional: false }
        };
      },
      name: "HistoryTab"
    };
  }
  constructor(options, metadata = HistoryTab.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.label = this.__props__.label;
    delete this.__props__;
  }
}
class HistoryDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          typeLabel: { type: String, optional: false },
          timeText: { type: String, optional: false },
          progressText: { type: String, optional: false },
          durationText: { type: String, optional: false },
          shortTitle: { type: String, optional: false },
          canOpen: { type: Boolean, optional: false }
        };
      },
      name: "HistoryDisplayItem"
    };
  }
  constructor(options, metadata = HistoryDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.typeLabel = this.__props__.typeLabel;
    this.timeText = this.__props__.timeText;
    this.progressText = this.__props__.progressText;
    this.durationText = this.__props__.durationText;
    this.shortTitle = this.__props__.shortTitle;
    this.canOpen = this.__props__.canOpen;
    delete this.__props__;
  }
}
const TAB_ALL = "ALL";
const TAB_BOOK = "BOOK";
const TAB_COURSE = "COURSE";
const TAB_TOPIC = "TOPIC";
const TAB_PODCAST = "PODCAST";
const TAB_LIVE = "LIVE";
const TAB_ARTICLE = "ARTICLE";
const pageTitle = "学习历史";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无学习历史";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多内容了";
const loadFailedText = "学习历史加载失败";
const lastLearnPrefix = "上次学习: ";
const progressPrefix = "进度 ";
const durationPrefix = "学习 ";
const unsupportedOpenText = "暂不支持打开该历史记录";
const PAGE_SIZE = 15;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "history",
  setup(__props) {
    const tabs = [
      new HistoryTab({ key: TAB_ALL, label: "全部" }),
      new HistoryTab({ key: TAB_BOOK, label: "书籍" }),
      new HistoryTab({ key: TAB_COURSE, label: "课程" }),
      new HistoryTab({ key: TAB_TOPIC, label: "专题" }),
      new HistoryTab({ key: TAB_PODCAST, label: "音频" }),
      new HistoryTab({ key: TAB_LIVE, label: "直播" }),
      new HistoryTab({ key: TAB_ARTICLE, label: "资讯" })
    ];
    const activeTab = common_vendor.ref(TAB_ALL);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const isRefreshing = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const allItems = common_vendor.ref([]);
    const filteredItems = common_vendor.computed(() => {
      if (activeTab.value == TAB_ALL) {
        return allItems.value;
      }
      return allItems.value.filter((item) => {
        return item.resourceType == activeTab.value;
      });
    });
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function normalizeHistoryType(resourceType) {
      const normalized = safeText(resourceType).toUpperCase();
      if (normalized == "BOOK" || normalized == "BOOKS" || normalized == "KNOWLEDGE" || normalized == "KNOWLEDGE_ENTRY" || normalized == "KNOWLEDGEENTRY" || normalized == "ENTRY") {
        return TAB_BOOK;
      }
      if (normalized == "COURSE" || normalized == "COURSES" || normalized == "VIDEO" || normalized == "LESSON") {
        return TAB_COURSE;
      }
      if (normalized == "TOPIC" || normalized == "TOPICS" || normalized == "SPECIAL_TOPIC" || normalized == "SPECIALTOPIC") {
        return TAB_TOPIC;
      }
      if (normalized == "PODCAST" || normalized == "PODCASTS" || normalized == "AUDIO" || normalized == "AUDIOBOOK") {
        return TAB_PODCAST;
      }
      if (normalized == "LIVE" || normalized == "LIVE_SESSION" || normalized == "LIVESESSION" || normalized == "STREAM") {
        return TAB_LIVE;
      }
      if (normalized == "ARTICLE" || normalized == "ARTICLES" || normalized == "INFO" || normalized == "NEWS" || normalized == "CONTENT") {
        return TAB_ARTICLE;
      }
      return normalized;
    }
    function resolveTypeLabel(resourceType, typeLabel) {
      const label = safeText(typeLabel);
      if (label.length > 0) {
        return label;
      }
      const normalized = normalizeHistoryType(resourceType);
      if (normalized == TAB_BOOK) {
        return "书籍";
      }
      if (normalized == TAB_COURSE) {
        return "课程";
      }
      if (normalized == TAB_TOPIC) {
        return "专题";
      }
      if (normalized == TAB_PODCAST) {
        return "音频";
      }
      if (normalized == TAB_LIVE) {
        return "直播";
      }
      if (normalized == TAB_ARTICLE) {
        return "资讯";
      }
      return "历史";
    }
    function formatVisitedTime(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "未知时间";
      }
      return text.replace("T", " ");
    }
    function formatProgress(value) {
      return String(value > 0 ? value : 0) + "%";
    }
    function formatDuration(seconds) {
      const total = seconds > 0 ? seconds : 0;
      if (total < 60) {
        return String(total) + "秒";
      }
      const minute = Math.floor(total / 60);
      const remain = total % 60;
      if (remain == 0) {
        return String(minute) + "分钟";
      }
      return String(minute) + "分" + String(remain) + "秒";
    }
    function toShortTitle(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "历史";
      }
      if (text.length <= 4) {
        return text;
      }
      return text.substring(0, 4);
    }
    function buildFallbackHistoryItem(record) {
      const resourceType = normalizeHistoryType(record.resourceType);
      const typeLabel = resolveTypeLabel(record.resourceType, "");
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType,
        resourceId: record.resourceId,
        title: typeLabel + " #" + String(record.resourceId),
        subtitle: "",
        coverUrl: "",
        typeLabel,
        timeText: formatVisitedTime(record.occurredAt),
        progressText: "0%",
        durationText: formatDuration(record.viewCount),
        shortTitle: toShortTitle(typeLabel),
        canOpen: resourceType == TAB_BOOK || resourceType == TAB_COURSE || resourceType == TAB_TOPIC || resourceType == TAB_PODCAST || resourceType == TAB_LIVE || resourceType == TAB_ARTICLE
      });
    }
    function mapBookHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_BOOK,
        resourceId: record.resourceId,
        title: safeText(detail.bookName).length > 0 ? detail.bookName : "书籍 #" + String(record.resourceId),
        subtitle: safeText(detail.author),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "书籍",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: formatProgress(detail.progressPercent),
        durationText: formatDuration(detail.studySeconds),
        shortTitle: toShortTitle(detail.bookName),
        canOpen: true
      });
    }
    function mapCourseHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_COURSE,
        resourceId: record.resourceId,
        title: safeText(detail.courseName).length > 0 ? detail.courseName : "课程 #" + String(record.resourceId),
        subtitle: safeText(detail.lecturerName),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "课程",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: formatProgress(detail.progressPercent),
        durationText: formatDuration(detail.studySeconds),
        shortTitle: toShortTitle(detail.courseName),
        canOpen: true
      });
    }
    function mapTopicHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_TOPIC,
        resourceId: record.resourceId,
        title: safeText(detail.title).length > 0 ? detail.title : "专题 #" + String(record.resourceId),
        subtitle: safeText(detail.summary),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "专题",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: "0%",
        durationText: formatDuration(record.viewCount),
        shortTitle: toShortTitle(detail.title),
        canOpen: true
      });
    }
    function mapPodcastHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_PODCAST,
        resourceId: record.resourceId,
        title: safeText(detail.title).length > 0 ? detail.title : "音频 #" + String(record.resourceId),
        subtitle: safeText(detail.summary),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "音频",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: formatProgress(detail.progressPercent),
        durationText: formatDuration(detail.studySeconds),
        shortTitle: toShortTitle(detail.title),
        canOpen: true
      });
    }
    function mapLiveHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_LIVE,
        resourceId: record.resourceId,
        title: safeText(detail.title).length > 0 ? detail.title : "直播 #" + String(record.resourceId),
        subtitle: safeText(detail.anchorName),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "直播",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: "0%",
        durationText: formatDuration(record.viewCount),
        shortTitle: toShortTitle(detail.title),
        canOpen: true
      });
    }
    function mapArticleHistory(record, detail) {
      return new HistoryDisplayItem({
        id: String(record.id),
        resourceType: TAB_ARTICLE,
        resourceId: record.resourceId,
        title: safeText(detail.title).length > 0 ? detail.title : "资讯 #" + String(record.resourceId),
        subtitle: safeText(detail.source).length > 0 ? detail.source : safeText(detail.authorName),
        coverUrl: safeText(detail.coverUrl),
        typeLabel: "资讯",
        timeText: formatVisitedTime(record.occurredAt),
        progressText: "0%",
        durationText: formatDuration(record.viewCount),
        shortTitle: toShortTitle(detail.title),
        canOpen: true
      });
    }
    function enrichHistoryRecord(record, success) {
      const resourceType = normalizeHistoryType(record.resourceType);
      if (resourceType == TAB_BOOK) {
        utils_auth.fetchBookDetail(String(record.resourceId), (detail) => {
          success(mapBookHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      if (resourceType == TAB_COURSE) {
        utils_auth.fetchCourseDetail(String(record.resourceId), (detail) => {
          success(mapCourseHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      if (resourceType == TAB_TOPIC) {
        utils_auth.fetchTopicDetail(String(record.resourceId), (detail) => {
          success(mapTopicHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      if (resourceType == TAB_PODCAST) {
        utils_auth.fetchAudioDetail(String(record.resourceId), (detail) => {
          success(mapPodcastHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      if (resourceType == TAB_LIVE) {
        utils_auth.fetchLiveSessionDetail(String(record.resourceId), (detail) => {
          success(mapLiveHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      if (resourceType == TAB_ARTICLE) {
        utils_auth.fetchArticleDetail(String(record.resourceId), (detail) => {
          success(mapArticleHistory(record, detail));
        }, () => {
          success(buildFallbackHistoryItem(record));
        });
        return null;
      }
      success(buildFallbackHistoryItem(record));
    }
    function finalizeItems(records, loadMoreValue) {
      if (records.length == 0) {
        if (!loadMoreValue) {
          allItems.value = [];
        }
        hasMore.value = false;
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
        return null;
      }
      const nextItems = new Array();
      let finished = 0;
      records.forEach((record) => {
        enrichHistoryRecord(record, (item) => {
          nextItems.push(item);
          finished += 1;
          if (finished == records.length) {
            if (loadMoreValue) {
              allItems.value = allItems.value.concat(nextItems);
            } else {
              allItems.value = nextItems;
            }
            hasMore.value = records.length >= PAGE_SIZE;
            if (hasMore.value) {
              page.value += 1;
            }
            isLoading.value = false;
            isListLoading.value = false;
            isRefreshing.value = false;
          }
        });
      });
    }
    function loadHistory(loadMoreValue) {
      if (!loadMoreValue) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        isLoading.value = !isRefreshing.value;
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchLearningHistory(page.value, PAGE_SIZE, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        finalizeItems(records, loadMoreValue);
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      });
    }
    function reloadHistory() {
      loadHistory(false);
    }
    function refreshHistory() {
      if (isRefreshing.value) {
        return null;
      }
      isRefreshing.value = true;
      loadHistory(false);
    }
    function changeTab(tabKey) {
      activeTab.value = tabKey;
    }
    function goToDetail(item) {
      if (!item.canOpen) {
        common_vendor.index.showToast({
          title: unsupportedOpenText,
          icon: "none"
        });
        return null;
      }
      if (item.resourceType == TAB_BOOK) {
        common_vendor.index.setStorageSync("knowledge_detail_id", String(item.resourceId));
        common_vendor.index.navigateTo({ url: "/pages/book/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == TAB_COURSE) {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == TAB_TOPIC) {
        common_vendor.index.setStorageSync("topic_detail_id", String(item.resourceId));
        common_vendor.index.navigateTo({ url: "/pages/topics/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == TAB_PODCAST) {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == TAB_LIVE) {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == TAB_ARTICLE) {
        common_vendor.index.setStorageSync("article_detail_id", String(item.resourceId));
        common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + String(item.resourceId) });
        return null;
      }
      common_vendor.index.showToast({
        title: unsupportedOpenText,
        icon: "none"
      });
    }
    function loadMore() {
      loadHistory(true);
    }
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
    common_vendor.onShow(() => {
      loadHistory(false);
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.t(pageTitle),
        d: common_vendor.f(tabs, (tab, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(tab.label),
            b: common_vendor.n(activeTab.value == tab.key ? "top-tab-text-active" : ""),
            c: activeTab.value == tab.key
          }, activeTab.value == tab.key ? {} : {}, {
            d: tab.key,
            e: common_vendor.o(($event) => {
              return changeTab(tab.key);
            }, tab.key)
          });
        }),
        e: isLoading.value
      }, isLoading.value ? {
        f: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        h: common_vendor.t(errorText.value),
        i: common_vendor.t(retryText),
        j: common_vendor.o(reloadHistory)
      } : filteredItems.value.length == 0 ? {
        l: common_vendor.t(emptyText)
      } : common_vendor.e({
        m: common_vendor.f(filteredItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.shortTitle)
          }, {
            d: common_vendor.t(item.typeLabel),
            e: common_vendor.t(item.title),
            f: item.subtitle.length > 0
          }, item.subtitle.length > 0 ? {
            g: common_vendor.t(item.subtitle)
          } : {}, {
            h: common_vendor.t(item.timeText),
            i: common_vendor.t(item.progressText),
            j: common_vendor.t(item.durationText),
            k: item.id,
            l: common_vendor.o(($event) => {
              return goToDetail(item);
            }, item.id)
          });
        }),
        n: common_vendor.t(lastLearnPrefix),
        o: common_vendor.t(progressPrefix),
        p: common_vendor.t(durationPrefix),
        q: isListLoading.value
      }, isListLoading.value ? {
        r: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        t: common_vendor.t(noMoreText)
      } : {}, {
        s: !hasMore.value
      }), {
        g: errorText.value.length > 0,
        k: filteredItems.value.length == 0,
        v: isRefreshing.value,
        w: common_vendor.o(refreshHistory),
        x: common_vendor.o(loadMore),
        y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/history.js.map
