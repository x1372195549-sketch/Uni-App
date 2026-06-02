"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book-detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const title = common_vendor.ref("");
    const shortTitle = common_vendor.ref("知识");
    const coverUrl = common_vendor.ref("");
    const summary = common_vendor.ref("");
    const content = common_vendor.ref("");
    const categoryName = common_vendor.ref("");
    const author = common_vendor.ref("");
    const publisher = common_vendor.ref("");
    const keywords = common_vendor.ref("");
    const source = common_vendor.ref("");
    const publishedAt = common_vendor.ref("");
    const totalPages = common_vendor.ref("");
    const viewCount = common_vendor.ref("0");
    const isHtmlContent = common_vendor.ref(false);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function buildShortTitle(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "知识";
      }
      if (text.length <= 4) {
        return text;
      }
      return text.substring(0, 4);
    }
    function detectHtml(value) {
      return value.indexOf("<p") >= 0 || value.indexOf("<div") >= 0 || value.indexOf("<br") >= 0;
    }
    function applyDetail(detail) {
      title.value = safeText(detail.title);
      shortTitle.value = buildShortTitle(detail.title);
      coverUrl.value = safeText(detail.coverUrl);
      summary.value = safeText(detail.summary);
      content.value = safeText(detail.content);
      categoryName.value = safeText(detail.categoryName);
      author.value = safeText(detail.author);
      publisher.value = safeText(detail.publisher);
      keywords.value = safeText(detail.keywords);
      source.value = safeText(detail.source);
      publishedAt.value = safeText(detail.publishedAt).replace("T", " ");
      totalPages.value = detail.totalPages != null && detail.totalPages > 0 ? "共 " + String(detail.totalPages) + " 页" : "";
      viewCount.value = String(detail.viewCount != null ? detail.viewCount : 0);
      isHtmlContent.value = detectHtml(content.value);
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
        detailId.value = idValue;
      }
    }
    function loadDetail() {
      if (detailId.value.length == 0) {
        errorText.value = "缺少知识条目 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchKnowledgeEntryDetail(detailId.value, (detail) => {
        applyDetail(detail);
        isLoading.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : "详情加载失败";
        isLoading.value = false;
      });
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    loadParams();
    loadDetail();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        e: common_vendor.t(errorText.value),
        f: common_vendor.o(loadDetail)
      } : common_vendor.e({
        g: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        h: coverUrl.value
      } : {
        i: common_vendor.t(shortTitle.value)
      }, {
        j: common_vendor.t(title.value),
        k: author.value.length > 0
      }, author.value.length > 0 ? {
        l: common_vendor.t(author.value)
      } : {}, {
        m: publisher.value.length > 0
      }, publisher.value.length > 0 ? {
        n: common_vendor.t(publisher.value)
      } : {}, {
        o: categoryName.value.length > 0
      }, categoryName.value.length > 0 ? {
        p: common_vendor.t(categoryName.value)
      } : {}, {
        q: publishedAt.value.length > 0
      }, publishedAt.value.length > 0 ? {
        r: common_vendor.t(publishedAt.value)
      } : {}, {
        s: common_vendor.t(viewCount.value),
        t: totalPages.value.length > 0
      }, totalPages.value.length > 0 ? {
        v: common_vendor.t(totalPages.value)
      } : {}, {
        w: summary.value.length > 0
      }, summary.value.length > 0 ? {
        x: common_vendor.t(summary.value)
      } : {}, {
        y: isHtmlContent.value
      }, isHtmlContent.value ? {
        z: content.value
      } : {
        A: common_vendor.t(content.value)
      }, {
        B: keywords.value.length > 0 || source.value.length > 0
      }, keywords.value.length > 0 || source.value.length > 0 ? common_vendor.e({
        C: keywords.value.length > 0
      }, keywords.value.length > 0 ? {
        D: common_vendor.t(keywords.value)
      } : {}, {
        E: source.value.length > 0
      }, source.value.length > 0 ? {
        F: common_vendor.t(source.value)
      } : {}) : {}), {
        d: errorText.value.length > 0,
        G: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/book-detail.js.map
