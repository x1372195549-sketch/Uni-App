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
const TYPE_ARTICLE = "ARTICLE";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "favorites",
  setup(__props) {
    const tabs = [
      new FavoriteTab({ key: TYPE_ALL, label: "全部" }),
      new FavoriteTab({ key: TYPE_AUDIO, label: "音频" }),
      new FavoriteTab({ key: TYPE_LIVE, label: "直播" }),
      new FavoriteTab({ key: TYPE_COURSE, label: "课程" }),
      new FavoriteTab({ key: TYPE_TOPIC, label: "资讯" })
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
        return normalizeFavoriteType(item.resourceType) == activeTab.value;
      });
    });
    const normalizeFavoriteType = (resourceType) => {
      const normalizedType = resourceType.toLowerCase();
      if (normalizedType == TYPE_INFO || normalizedType == TYPE_ARTICLE) {
        return TYPE_TOPIC;
      }
      if (normalizedType == "audio") {
        return TYPE_AUDIO;
      }
      if (normalizedType == "podcast") {
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
      if (normalizedType == "info") {
        return TYPE_TOPIC;
      }
      return resourceType.toUpperCase();
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
        return "#EFE2D0";
      }
      return "#F1F1F1";
    };
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatOccurredAt = (value) => {
      if (value.length == 0) {
        return "未知";
      }
      return value.replace("T", " ");
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
        coverUrl: safeText(detail.coverUrl),
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
        coverUrl: safeText(detail.coverUrl),
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
        coverUrl: safeText(detail.coverUrl),
        coverColor: getCoverColor(record.resourceType)
      });
    };
    const mapTopicFavorite = (record, detail) => {
      return new FavoriteDisplayItem({
        id: String(record.id),
        resourceType: normalizeFavoriteType(record.resourceType),
        resourceId: record.resourceId,
        typeLabel: getTypeLabel(record.resourceType),
        title: safeText(detail.title).length > 0 ? detail.title : "资讯 #" + String(record.resourceId),
        source: safeText(record.source).length > 0 ? safeText(record.source) : safeText(detail.publishedAt),
        timeText: formatOccurredAt(safeText(record.occurredAt)),
        coverUrl: safeText(detail.coverUrl),
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
        errorText.value = message.length > 0 ? message : "加载收藏失败";
        allItems.value = [];
        isLoading.value = false;
      });
    };
    const changeTab = (tabKey) => {
      activeTab.value = tabKey;
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
        url = "/pages/news/detail?id=" + String(item.resourceId);
      }
      if (url.length == 0) {
        common_vendor.index.showToast({
          title: "暂不支持打开该收藏",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.navigateTo({
        url
      });
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
        c: common_vendor.f(tabs, (tab, k0, i0) => {
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
        d: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        f: common_vendor.t(errorText.value),
        g: common_vendor.o(loadFavorites)
      } : filteredItems.value.length == 0 ? {} : {
        i: common_vendor.f(filteredItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.typeLabel)
          }, {
            d: item.coverColor,
            e: common_vendor.t(item.typeLabel),
            f: common_vendor.t(item.title),
            g: item.source.length > 0
          }, item.source.length > 0 ? {
            h: common_vendor.t(item.source)
          } : {}, {
            i: common_vendor.t(item.timeText),
            j: item.id,
            k: common_vendor.o(($event) => {
              return goToDetail(item);
            }, item.id)
          });
        })
      }, {
        e: errorText.value.length > 0,
        h: filteredItems.value.length == 0,
        j: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/favorites.js.map
