"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class FavoriteTab extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          label: { type: String, optional: false }
        };
      },
      name: "FavoriteTab"
    };
  }
  constructor(options, metadata = FavoriteTab.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.label = this.__props__.label;
    delete this.__props__;
  }
}
class FavoriteDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          typeLabel: { type: String, optional: false },
          title: { type: String, optional: false },
          source: { type: String, optional: false },
          timeText: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          coverColor: { type: String, optional: false }
        };
      },
      name: "FavoriteDisplayItem"
    };
  }
  constructor(options, metadata = FavoriteDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.typeLabel = this.__props__.typeLabel;
    this.title = this.__props__.title;
    this.source = this.__props__.source;
    this.timeText = this.__props__.timeText;
    this.coverUrl = this.__props__.coverUrl;
    this.coverColor = this.__props__.coverColor;
    delete this.__props__;
  }
}
const TYPE_ALL = "ALL";
const TYPE_AUDIO = "AUDIO";
const TYPE_LIVE = "LIVE";
const TYPE_COURSE = "COURSE";
const TYPE_TOPIC = "TOPIC";
const TYPE_INFO = "INFO";
const pageTitleText = "我的收藏";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无收藏内容";
const loadFailedText = "加载收藏失败";
const favoriteTimeText = "收藏时间:";
const unsupportedOpenText = "暂不支持打开该收藏";
const unknownText = "未知";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "favorites",
  setup(__props) {
    const tabs = [
      new FavoriteTab({ key: TYPE_ALL, label: "全部" }),
      new FavoriteTab({ key: TYPE_AUDIO, label: "音频" }),
      new FavoriteTab({ key: TYPE_LIVE, label: "直播" }),
      new FavoriteTab({ key: TYPE_COURSE, label: "课程" }),
      new FavoriteTab({ key: TYPE_TOPIC, label: "专题" }),
      new FavoriteTab({ key: TYPE_INFO, label: "资讯" })
    ];
    const activeTab = common_vendor.ref(TYPE_ALL);
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const allItems = common_vendor.ref([]);
    const filteredItems = common_vendor.computed(() => {
      if (activeTab.value == TYPE_ALL) {
        return allItems.value;
      }
      return allItems.value.filter((item) => {
        return item.resourceType == activeTab.value;
      });
    });
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatOccurredAt = (value) => {
      const text = safeText(value);
      if (text.length == 0) {
        return unknownText;
      }
      return text.replace("T", " ");
    };
    const normalizeFavoriteType = (resourceType) => {
      const normalizedType = safeText(resourceType).toLowerCase();
      if (normalizedType == "audio" || normalizedType == "podcast") {
        return TYPE_AUDIO;
      }
      if (normalizedType == "live") {
        return TYPE_LIVE;
      }
      if (normalizedType == "course") {
        return TYPE_COURSE;
      }
      if (normalizedType == "topic") {
        return TYPE_TOPIC;
      }
      if (normalizedType == "article" || normalizedType == "info") {
        return TYPE_INFO;
      }
      return safeText(resourceType).toUpperCase();
    };
    const getTypeLabel = (resourceType) => {
      const normalizedType = normalizeFavoriteType(resourceType);
      if (normalizedType == TYPE_AUDIO) {
        return "音频";
      }
      if (normalizedType == TYPE_LIVE) {
        return "直播";
      }
      if (normalizedType == TYPE_COURSE) {
        return "课程";
      }
      if (normalizedType == TYPE_TOPIC) {
        return "专题";
      }
      if (normalizedType == TYPE_INFO) {
        return "资讯";
      }
      return "收藏";
    };
    const getCoverColor = (resourceType) => {
      const normalizedType = normalizeFavoriteType(resourceType);
      if (normalizedType == TYPE_AUDIO) {
        return "#F6E3D2";
      }
      if (normalizedType == TYPE_LIVE) {
        return "#E1D7C8";
      }
      if (normalizedType == TYPE_COURSE) {
        return "#F3E3D8";
      }
      if (normalizedType == TYPE_TOPIC) {
        return "#EDE3D4";
      }
      if (normalizedType == TYPE_INFO) {
        return "#EFE2D0";
      }
      return "#F1F1F1";
    };
    const sanitizeCoverUrl = (value) => {
      const cover = safeText(value);
      if (cover.length == 0) {
        return "";
      }
      if (cover.indexOf("example.com") >= 0) {
        return "";
      }
      return cover;
    };
    const buildFallbackItem = (record) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: getTypeLabel(record.resourceType) + " #" + String(record.resourceId),
        source: safeText(record.source),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: "",
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapAudioFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.title).length > 0 ? detail.title : "音频 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.publishedAt),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: sanitizeCoverUrl(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapLiveFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.title).length > 0 ? detail.title : "直播 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.anchorName),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: sanitizeCoverUrl(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapCourseFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.courseName).length > 0 ? detail.courseName : "课程 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.lecturerName),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: sanitizeCoverUrl(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapTopicFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.title).length > 0 ? detail.title : "专题 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.publishedAt),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: sanitizeCoverUrl(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapArticleFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.title).length > 0 ? detail.title : "资讯 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.source),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: sanitizeCoverUrl(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const enrichFavoriteItem = (record, success) => {
      const normalizedType = normalizeFavoriteType(record.resourceType);
      if (normalizedType == TYPE_AUDIO) {
        utils_auth.fetchAudioDetail(String(record.resourceId), (detail) => {
          success(mapAudioFavorite(record, detail));
        }, () => {
          success(buildFallbackItem(record));
        });
        return null;
      }
      if (normalizedType == TYPE_LIVE) {
        utils_auth.fetchLiveSessionDetail(String(record.resourceId), (detail) => {
          success(mapLiveFavorite(record, detail));
        }, () => {
          success(buildFallbackItem(record));
        });
        return null;
      }
      if (normalizedType == TYPE_COURSE) {
        utils_auth.fetchCourseDetail(String(record.resourceId), (detail) => {
          success(mapCourseFavorite(record, detail));
        }, () => {
          success(buildFallbackItem(record));
        });
        return null;
      }
      if (normalizedType == TYPE_TOPIC) {
        utils_auth.fetchTopicDetail(String(record.resourceId), (detail) => {
          success(mapTopicFavorite(record, detail));
        }, () => {
          success(buildFallbackItem(record));
        });
        return null;
      }
      if (normalizedType == TYPE_INFO) {
        utils_auth.fetchArticleDetail(String(record.resourceId), (detail) => {
          success(mapArticleFavorite(record, detail));
        }, () => {
          success(buildFallbackItem(record));
        });
        return null;
      }
      success(buildFallbackItem(record));
    };
    const loadFavorites = () => {
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchProfileFavorites(1, 50, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        if (records.length == 0) {
          allItems.value = [];
          isLoading.value = false;
          return null;
        }
        const resultItems = new Array();
        let finishedCount = 0;
        records.forEach((record) => {
          enrichFavoriteItem(record, (item) => {
            resultItems.push(item);
            finishedCount += 1;
            if (finishedCount == records.length) {
              allItems.value = resultItems.sort((left, right) => {
                if (left.timeText == right.timeText) {
                  return 0;
                }
                return left.timeText > right.timeText ? -1 : 1;
              });
              isLoading.value = false;
            }
          });
        });
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        allItems.value = [];
        isLoading.value = false;
      });
    };
    const changeTab = (tabKey) => {
      activeTab.value = tabKey;
    };
    const handleCoverError = (itemId) => {
      allItems.value = allItems.value.map((item) => {
        if (item.id != itemId) {
          return item;
        }
        return new FavoriteDisplayItem({
          id: item.id,
          resourceType: item.resourceType,
          resourceId: item.resourceId,
          typeLabel: item.typeLabel,
          title: item.title,
          source: item.source,
          timeText: item.timeText,
          coverUrl: "",
          coverColor: item.coverColor
        });
      });
    };
    const goToDetail = (item) => {
      let url = "";
      if (item.resourceType == TYPE_AUDIO) {
        url = "/pages/audio/detail?id=" + String(item.resourceId);
      } else if (item.resourceType == TYPE_LIVE) {
        url = "/pages/live/detail?id=" + String(item.resourceId);
      } else if (item.resourceType == TYPE_COURSE) {
        url = "/pages/course/detail?id=" + String(item.resourceId);
      } else if (item.resourceType == TYPE_TOPIC) {
        url = "/pages/topics/detail?id=" + String(item.resourceId);
      } else if (item.resourceType == TYPE_INFO) {
        url = "/pages/news/detail?id=" + String(item.resourceId);
      }
      if (url.length == 0) {
        common_vendor.index.showToast({
          title: unsupportedOpenText,
          icon: "none"
        });
        return null;
      }
      common_vendor.index.navigateTo({ url });
    };
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
    loadFavorites();
    common_vendor.onShow(() => {
      loadFavorites();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.t(pageTitleText),
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
        j: common_vendor.o(loadFavorites)
      } : filteredItems.value.length == 0 ? {
        l: common_vendor.t(emptyText)
      } : {
        m: common_vendor.f(filteredItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl,
            c: common_vendor.o(($event) => {
              return handleCoverError(item.id);
            }, item.id)
          } : {
            d: common_vendor.t(item.typeLabel)
          }, {
            e: item.coverColor,
            f: common_vendor.t(item.typeLabel),
            g: common_vendor.t(item.title),
            h: item.source.length > 0
          }, item.source.length > 0 ? {
            i: common_vendor.t(item.source)
          } : {}, {
            j: common_vendor.t(item.timeText),
            k: item.id,
            l: common_vendor.o(($event) => {
              return goToDetail(item);
            }, item.id)
          });
        }),
        n: common_vendor.t(favoriteTimeText)
      }, {
        g: errorText.value.length > 0,
        k: filteredItems.value.length == 0,
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/favorites.js.map
