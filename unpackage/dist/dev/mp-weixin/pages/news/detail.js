"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const PRIMARY_RESOURCE_TYPE = "article";
const FALLBACK_RESOURCE_TYPE = "info";
const detailTitleText = "资讯详情";
const summaryTitle = "摘要";
const contentTitle = "正文";
const favoriteBtnText = "收藏";
const favoritedText = "已收藏";
const viewText = "浏览";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const articleId = common_vendor.ref("");
    const title = common_vendor.ref("");
    const summary = common_vendor.ref("");
    const content = common_vendor.ref("");
    const coverUrl = common_vendor.ref("");
    const source = common_vendor.ref("");
    const publishedAt = common_vendor.ref("");
    const viewCount = common_vendor.ref("0");
    const tags = common_vendor.ref([]);
    const isHtmlContent = common_vendor.ref(false);
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const favoriteResourceType = common_vendor.ref(PRIMARY_RESOURCE_TYPE);
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
    const detectHtml = (value) => {
      return value.indexOf("<p") >= 0 || value.indexOf("<div") >= 0 || value.indexOf("<br") >= 0;
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const current = pages[pages.length - 1];
      if (current == null || current.options == null) {
        return null;
      }
      const options = current.options;
      const idValue = options["id"];
      if (typeof idValue == "string" && idValue.length > 0) {
        articleId.value = idValue;
      }
    };
    const applyDetail = (detail) => {
      title.value = safeText(detail.title);
      summary.value = safeText(detail.summary);
      content.value = safeText(detail.content);
      coverUrl.value = safeText(detail.coverUrl);
      source.value = safeText(detail.source);
      publishedAt.value = formatDate(detail.publishedAt);
      viewCount.value = String(detail.viewCount);
      tags.value = detail.tags != null ? detail.tags : [];
      isHtmlContent.value = detectHtml(content.value);
    };
    const setFavoriteStatusByType = (resourceType, next) => {
      utils_auth.checkFavoriteStatus(resourceType, Number(articleId.value), (favorited) => {
        if (favorited) {
          isFavorited.value = true;
          favoriteResourceType.value = resourceType;
          return null;
        }
        next();
      }, () => {
        next();
      });
    };
    const loadFavoriteStatus = () => {
      if (articleId.value.length == 0) {
        return null;
      }
      isFavorited.value = false;
      favoriteResourceType.value = PRIMARY_RESOURCE_TYPE;
      setFavoriteStatusByType(PRIMARY_RESOURCE_TYPE, () => {
        setFavoriteStatusByType(FALLBACK_RESOURCE_TYPE, () => {
          isFavorited.value = false;
          favoriteResourceType.value = PRIMARY_RESOURCE_TYPE;
        });
      });
    };
    const reportBrowse = () => {
      if (articleId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: PRIMARY_RESOURCE_TYPE,
        resourceId: Number(articleId.value)
      }), () => {
      }, () => {
      });
    };
    const loadDetail = () => {
      if (articleId.value.length == 0) {
        return null;
      }
      utils_auth.fetchArticleDetail(articleId.value, (detail) => {
        applyDetail(detail);
        reportBrowse();
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    const submitFavoriteRequest = (resourceType, favorited, success, fail) => {
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType,
        resourceId: Number(articleId.value),
        favorited
      }), (result) => {
        favoriteResourceType.value = resourceType;
        isFavorited.value = result.favorited;
        success();
      }, (message) => {
        fail(message);
      });
    };
    const toggleFavorite = () => {
      if (articleId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      const nextFavorited = !isFavorited.value;
      const primaryType = nextFavorited ? PRIMARY_RESOURCE_TYPE : favoriteResourceType.value;
      const backupType = primaryType == PRIMARY_RESOURCE_TYPE ? FALLBACK_RESOURCE_TYPE : PRIMARY_RESOURCE_TYPE;
      submitFavoriteRequest(primaryType, nextFavorited, () => {
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: isFavorited.value ? "收藏成功" : "已取消收藏",
          icon: "none"
        });
      }, (message) => {
        submitFavoriteRequest(backupType, nextFavorited, () => {
          isFavoriteLoading.value = false;
          common_vendor.index.showToast({
            title: isFavorited.value ? "收藏成功" : "已取消收藏",
            icon: "none"
          });
        }, (fallbackMessage) => {
          isFavoriteLoading.value = false;
          common_vendor.index.showToast({
            title: fallbackMessage.length > 0 ? fallbackMessage : message,
            icon: "none"
          });
        });
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
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
        c: common_vendor.t(detailTitleText),
        d: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        e: coverUrl.value
      } : {}, {
        f: common_vendor.t(title.value),
        g: common_vendor.t(source.value),
        h: common_vendor.t(publishedAt.value),
        i: common_vendor.t(viewText),
        j: common_vendor.t(viewCount.value),
        k: common_vendor.f(tags.value, (tag, k0, i0) => {
          return {
            a: common_vendor.t(tag),
            b: tag
          };
        }),
        l: summary.value.length > 0
      }, summary.value.length > 0 ? {
        m: common_vendor.t(summaryTitle),
        n: common_vendor.t(summary.value)
      } : {}, {
        o: common_vendor.t(contentTitle),
        p: common_vendor.t(isFavorited.value ? favoritedText : favoriteBtnText),
        q: common_vendor.o(toggleFavorite),
        r: isHtmlContent.value
      }, isHtmlContent.value ? {
        s: content.value
      } : {
        t: common_vendor.t(content.value)
      }, {
        v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/detail.js.map
