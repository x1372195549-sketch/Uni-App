"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const RESOURCE_TYPE = "topic";
const KNOWLEDGE_DETAIL_ID_KEY = "knowledge_detail_id";
const TOPIC_DETAIL_ID_KEY = "topic_detail_id";
const pageTitleText = "专题详情";
const loadingText = "加载中...";
const retryText = "重新加载";
const requirementTitle = "学习要求";
const relatedTitle = "相关内容";
const relatedSubtitle = "为你整理专题内的课程、视频、图书与音频资源";
const moreText = "更多";
const emptySectionText = "暂无内容";
const favoriteBtnText = "收藏";
const favoritedText = "已收藏";
const viewText = "浏览";
const favoriteText = "收藏";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const topicId = common_vendor.ref("");
    const title = common_vendor.ref("");
    const summary = common_vendor.ref("");
    const learningRequirements = common_vendor.ref("");
    const coverUrl = common_vendor.ref("");
    const viewCount = common_vendor.ref("0");
    const favoriteCount = common_vendor.ref("0");
    const publishedAt = common_vendor.ref("");
    const tags = common_vendor.ref([]);
    const sections = common_vendor.ref([]);
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatDate = (value) => {
      const text = safeText(value);
      if (text.length == 0) {
        return "";
      }
      return text.replace("T", " ").substring(0, 16);
    };
    const normalizeResourceType = (value) => {
      const type = safeText(value).toLowerCase();
      if (type == "learning" || type == "book") {
        return "book";
      }
      if (type == "video" || type == "course") {
        return "course";
      }
      if (type == "audio" || type == "podcast") {
        return "podcast";
      }
      return type;
    };
    const getSectionLabel = (section) => {
      const type = safeText(section.sectionType).toLowerCase();
      if (type == "book" || type == "learning") {
        return "图书";
      }
      if (type == "video") {
        return "视频";
      }
      if (type == "course") {
        return "课程";
      }
      if (type == "podcast" || type == "audio") {
        return "音频";
      }
      const label = safeText(section.sectionLabel);
      if (label.length > 0) {
        return label;
      }
      return "学习";
    };
    const getResourceTypeLabel = (value) => {
      const type = normalizeResourceType(value);
      if (type == "book") {
        return "图书";
      }
      if (type == "course") {
        return "课程";
      }
      if (type == "podcast") {
        return "音频";
      }
      if (type == "live") {
        return "直播";
      }
      return "资源";
    };
    const hydrateSections = () => {
      if (topicId.value.length == 0 || sections.value.length == 0) {
        return null;
      }
      sections.value.forEach((section, index) => {
        if (section.previewItems != null && section.previewItems.length > 0) {
          return null;
        }
        utils_auth.fetchTopicSectionResources(topicId.value, section.sectionType, 1, 6, (pageData) => {
          const records = pageData.records != null ? pageData.records : [];
          const current = sections.value.slice();
          if (index >= current.length) {
            return null;
          }
          current[index] = {
            sectionType: current[index].sectionType,
            sectionLabel: current[index].sectionLabel,
            total: pageData.total > 0 ? pageData.total : records.length,
            hasMore: pageData.total > records.length || current[index].hasMore,
            previewItems: records
          };
          sections.value = current;
        }, () => {
        });
      });
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        const cachedId_1 = common_vendor.index.getStorageSync(TOPIC_DETAIL_ID_KEY);
        if (typeof cachedId_1 == "string" && cachedId_1.length > 0) {
          topicId.value = cachedId_1;
        }
        return null;
      }
      const current = pages[pages.length - 1];
      if (current == null || current.options == null) {
        const cachedId_2 = common_vendor.index.getStorageSync(TOPIC_DETAIL_ID_KEY);
        if (typeof cachedId_2 == "string" && cachedId_2.length > 0) {
          topicId.value = cachedId_2;
        }
        return null;
      }
      const options = current.options;
      const idValue = options["id"];
      if (typeof idValue == "string" && idValue.length > 0) {
        topicId.value = idValue;
        common_vendor.index.setStorageSync(TOPIC_DETAIL_ID_KEY, topicId.value);
        return null;
      }
      const topicValue = options["topicId"];
      if (typeof topicValue == "string" && topicValue.length > 0) {
        topicId.value = topicValue;
        common_vendor.index.setStorageSync(TOPIC_DETAIL_ID_KEY, topicId.value);
        return null;
      }
      const cachedId = common_vendor.index.getStorageSync(TOPIC_DETAIL_ID_KEY);
      if (typeof cachedId == "string" && cachedId.length > 0) {
        topicId.value = cachedId;
      }
    };
    const applyDetail = (detail) => {
      title.value = safeText(detail.title);
      summary.value = safeText(detail.summary);
      learningRequirements.value = safeText(detail.learningRequirements);
      coverUrl.value = safeText(detail.coverUrl);
      viewCount.value = String(detail.viewCount);
      favoriteCount.value = String(detail.favoriteCount);
      publishedAt.value = formatDate(detail.publishedAt);
      tags.value = detail.tags != null ? detail.tags : [];
      sections.value = detail.sections != null ? detail.sections : [];
      hydrateSections();
    };
    const reportBrowse = () => {
      if (topicId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(topicId.value)
      }), () => {
      }, () => {
      });
    };
    const loadFavoriteStatus = () => {
      if (topicId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(topicId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    };
    const loadDetail = () => {
      if (topicId.value.length == 0) {
        errorText.value = "缺少专题 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchTopicDetailV2(topicId.value, (detail) => {
        applyDetail(detail);
        isLoading.value = false;
        reportBrowse();
      }, (message) => {
        errorText.value = message.length > 0 ? message : "专题详情加载失败";
        isLoading.value = false;
      });
    };
    const toggleFavorite = () => {
      if (topicId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(topicId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavoriteLoading.value = false;
        isFavorited.value = result.favorited;
        favoriteCount.value = String(result.favoriteCount);
        common_vendor.index.showToast({
          title: result.favorited ? "收藏成功" : "已取消收藏",
          icon: "none"
        });
      }, (message) => {
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    const goSectionPage = (section) => {
      common_vendor.index.navigateTo({
        url: "/pages/topics/section?topicId=" + topicId.value + "&sectionType=" + encodeURIComponent(section.sectionType) + "&title=" + encodeURIComponent(section.sectionLabel)
      });
    };
    const goResourceDetail = (item) => {
      const type = normalizeResourceType(item.resourceType);
      if (type == "book") {
        if (item.resourceId <= 0) {
          common_vendor.index.showToast({
            title: "缺少图书条目 ID",
            icon: "none"
          });
          return null;
        }
        common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, String(item.resourceId));
        common_vendor.index.navigateTo({ url: "/pages/book/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "course") {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "podcast") {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "live") {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + String(item.resourceId) });
      }
    };
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack(new UTSJSONObject({ delta: 1 }));
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    };
    loadParams();
    loadDetail();
    common_vendor.onShow(() => {
      loadFavoriteStatus();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(pageTitleText),
        d: isLoading.value
      }, isLoading.value ? {
        e: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        g: common_vendor.t(errorText.value),
        h: common_vendor.t(retryText),
        i: common_vendor.o(loadDetail)
      } : common_vendor.e({
        j: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        k: coverUrl.value
      } : {
        l: common_vendor.t(pageTitleText)
      }, {
        m: common_vendor.t(title.value),
        n: common_vendor.t(summary.value),
        o: common_vendor.t(viewText),
        p: common_vendor.t(viewCount.value),
        q: common_vendor.t(favoriteText),
        r: common_vendor.t(favoriteCount.value),
        s: common_vendor.t(publishedAt.value),
        t: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        v: common_vendor.t(isFavorited.value ? favoritedText : favoriteBtnText),
        w: common_vendor.o(toggleFavorite),
        x: common_vendor.t(requirementTitle),
        y: common_vendor.t(learningRequirements.value),
        z: common_vendor.t(relatedTitle),
        A: common_vendor.t(relatedSubtitle),
        B: common_vendor.f(sections.value, (section, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(getSectionLabel(section)),
            b: section.hasMore
          }, section.hasMore ? {
            c: common_vendor.t(moreText),
            d: common_vendor.o(($event) => {
              return goSectionPage(section);
            }, section.sectionType)
          } : {}, {
            e: section.previewItems.length == 0
          }, section.previewItems.length == 0 ? {
            f: common_vendor.t(emptySectionText)
          } : {
            g: common_vendor.f(section.previewItems, (item, k1, i1) => {
              return common_vendor.e({
                a: item.coverUrl.length > 0
              }, item.coverUrl.length > 0 ? {
                b: item.coverUrl
              } : {
                c: common_vendor.t(getResourceTypeLabel(item.resourceType))
              }, {
                d: common_vendor.t(item.title),
                e: common_vendor.t(item.subtitle.length > 0 ? item.subtitle : item.summary),
                f: common_vendor.t(item.browseCount),
                g: common_vendor.t(item.favoriteCount),
                h: section.sectionType + "-" + item.resourceId,
                i: common_vendor.o(($event) => {
                  return goResourceDetail(item);
                }, section.sectionType + "-" + item.resourceId)
              });
            }),
            h: common_vendor.t(viewText),
            i: common_vendor.t(favoriteText)
          }, {
            j: section.sectionType
          });
        })
      }), {
        f: errorText.value.length > 0,
        C: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/topics/detail.js.map
