"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const KNOWLEDGE_DETAIL_ID_KEY = "knowledge_detail_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book-detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const activeTab = common_vendor.ref("overview");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const chapterLoading = common_vendor.ref(false);
    const chapterErrorText = common_vendor.ref("");
    const title = common_vendor.ref("");
    const shortTitle = common_vendor.ref("图书");
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
    const chapters = common_vendor.ref([]);
    const activeChapterId = common_vendor.ref("");
    const activeChapterTitle = common_vendor.ref("");
    const activeChapterContent = common_vendor.ref("");
    const activeChapterIsHtml = common_vendor.ref(false);
    const activeChapterStartPage = common_vendor.ref("");
    const activeChapterPageCount = common_vendor.ref("");
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function buildShortTitle(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "图书";
      }
      if (text.length <= 4) {
        return text;
      }
      return text.substring(0, 4);
    }
    function detectHtml(value) {
      return value.indexOf("<p") >= 0 || value.indexOf("<div") >= 0 || value.indexOf("<br") >= 0;
    }
    function sortChapters(items) {
      return items.slice().sort((left, right) => {
        if (left.sortOrder != right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }
        return left.id - right.id;
      });
    }
    function applyKnowledgeDetail(detail) {
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
    function applyBookDetail(detail) {
      title.value = safeText(detail.bookName);
      shortTitle.value = buildShortTitle(detail.bookName);
      coverUrl.value = safeText(detail.coverUrl);
      summary.value = safeText(detail.introduction);
      if (summary.value.length > 0 && content.value.length == 0) {
        content.value = summary.value;
      }
      author.value = safeText(detail.author);
      publisher.value = safeText(detail.publisher);
      publishedAt.value = safeText(detail.publishedAt).replace("T", " ");
      totalPages.value = detail.totalPages > 0 ? "共 " + String(detail.totalPages) + " 页" : "";
      viewCount.value = String(detail.browseCount);
      chapters.value = sortChapters(detail.chapters != null ? detail.chapters : []);
      if (chapters.value.length > 0 && activeChapterId.value.length == 0) {
        activeChapterId.value = String(chapters.value[0].id);
      }
    }
    function applyChapterDetail(detail) {
      activeChapterTitle.value = safeText(detail.chapterTitle).length > 0 ? detail.chapterTitle : "章节内容";
      activeChapterContent.value = safeText(detail.content);
      activeChapterIsHtml.value = detectHtml(activeChapterContent.value);
      activeChapterStartPage.value = detail.startPage > 0 ? "起始页 " + String(detail.startPage) : "";
      activeChapterPageCount.value = detail.pageCount > 0 ? "页数 " + String(detail.pageCount) : "";
    }
    function loadParams(options = null) {
      if (options != null) {
        const idValue = options["id"];
        const entryIdValue = options["entryId"];
        const knowledgeIdValue = options["knowledgeId"];
        const contentIdValue = options["contentId"];
        if (typeof idValue == "string" && idValue.length > 0) {
          detailId.value = idValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof entryIdValue == "string" && entryIdValue.length > 0) {
          detailId.value = entryIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof knowledgeIdValue == "string" && knowledgeIdValue.length > 0) {
          detailId.value = knowledgeIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof contentIdValue == "string" && contentIdValue.length > 0) {
          detailId.value = contentIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
      }
      const cachedId = common_vendor.index.getStorageSync(KNOWLEDGE_DETAIL_ID_KEY);
      if (typeof cachedId == "string" && cachedId.length > 0) {
        detailId.value = cachedId;
      }
    }
    function loadKnowledgeFallback() {
      utils_auth.fetchKnowledgeEntryDetail(detailId.value, (detail) => {
        applyKnowledgeDetail(detail);
        isLoading.value = false;
        reportBrowse();
      }, (message) => {
        errorText.value = message.length > 0 ? message : "详情加载失败";
        isLoading.value = false;
      });
    }
    function reportBrowse() {
      if (detailId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: "book",
        resourceId: Number(detailId.value)
      }), () => {
      }, () => {
      });
    }
    function loadDetail() {
      if (detailId.value.length == 0) {
        errorText.value = "缺少知识条目 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchBookDetail(detailId.value, (detail) => {
        applyBookDetail(detail);
        if (title.value.length == 0) {
          loadKnowledgeFallback();
          return null;
        }
        isLoading.value = false;
        reportBrowse();
        if (chapters.value.length > 0) {
          selectChapter(chapters.value[0].id);
        }
      }, () => {
        loadKnowledgeFallback();
      });
    }
    function reloadActiveChapter() {
      if (activeChapterId.value.length == 0) {
        return null;
      }
      selectChapter(Number(activeChapterId.value));
    }
    function selectChapter(chapterId) {
      if (detailId.value.length == 0) {
        return null;
      }
      activeChapterId.value = String(chapterId);
      chapterLoading.value = true;
      chapterErrorText.value = "";
      utils_auth.fetchBookChapterDetail(detailId.value, String(chapterId), (detail) => {
        applyChapterDetail(detail);
        reportBrowse();
        chapterLoading.value = false;
      }, (message) => {
        chapterErrorText.value = message.length > 0 ? message : "章节加载失败";
        chapterLoading.value = false;
      });
    }
    function switchTab(tabKey) {
      activeTab.value = tabKey;
      if (tabKey == "chapters") {
        reportBrowse();
      }
      if (tabKey == "chapters" && chapters.value.length > 0 && activeChapterContent.value.length == 0 && !chapterLoading.value) {
        selectChapter(chapters.value[0].id);
      }
    }
    function goBack() {
      common_vendor.index.navigateBack();
    }
    function goLearningPage() {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    }
    function goExamPage() {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    }
    function goConsultPage() {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    }
    function goMinePage() {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    }
    common_vendor.onLoad((options = null) => {
      loadParams(options);
      loadDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.n(activeTab.value == "overview" ? "tab-text tab-text-active" : "tab-text"),
        d: activeTab.value == "overview"
      }, activeTab.value == "overview" ? {} : {}, {
        e: common_vendor.o(($event) => {
          return switchTab("overview");
        }),
        f: common_vendor.n(activeTab.value == "chapters" ? "tab-text tab-text-active" : "tab-text"),
        g: activeTab.value == "chapters"
      }, activeTab.value == "chapters" ? {} : {}, {
        h: common_vendor.o(($event) => {
          return switchTab("chapters");
        }),
        i: activeTab.value == "overview"
      }, activeTab.value == "overview" ? common_vendor.e({
        j: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        l: common_vendor.t(errorText.value),
        m: common_vendor.o(loadDetail)
      } : common_vendor.e({
        n: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        o: coverUrl.value
      } : {
        p: common_vendor.t(shortTitle.value)
      }, {
        q: common_vendor.t(title.value),
        r: author.value.length > 0
      }, author.value.length > 0 ? {
        s: common_vendor.t(author.value)
      } : {}, {
        t: publisher.value.length > 0
      }, publisher.value.length > 0 ? {
        v: common_vendor.t(publisher.value)
      } : {}, {
        w: categoryName.value.length > 0
      }, categoryName.value.length > 0 ? {
        x: common_vendor.t(categoryName.value)
      } : {}, {
        y: publishedAt.value.length > 0
      }, publishedAt.value.length > 0 ? {
        z: common_vendor.t(publishedAt.value)
      } : {}, {
        A: common_vendor.t(viewCount.value),
        B: totalPages.value.length > 0
      }, totalPages.value.length > 0 ? {
        C: common_vendor.t(totalPages.value)
      } : {}, {
        D: chapters.value.length > 0
      }, chapters.value.length > 0 ? {
        E: common_vendor.o(($event) => {
          return switchTab("chapters");
        })
      } : {}, {
        F: summary.value.length > 0
      }, summary.value.length > 0 ? {
        G: common_vendor.t(summary.value)
      } : {}, {
        H: isHtmlContent.value
      }, isHtmlContent.value ? {
        I: content.value
      } : {
        J: common_vendor.t(content.value)
      }, {
        K: keywords.value.length > 0 || source.value.length > 0
      }, keywords.value.length > 0 || source.value.length > 0 ? common_vendor.e({
        L: keywords.value.length > 0
      }, keywords.value.length > 0 ? {
        M: common_vendor.t(keywords.value)
      } : {}, {
        N: source.value.length > 0
      }, source.value.length > 0 ? {
        O: common_vendor.t(source.value)
      } : {}) : {}), {
        k: errorText.value.length > 0
      }) : common_vendor.e({
        P: common_vendor.f(chapters.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.chapterTitle.length > 0 ? item.chapterTitle : "章节 " + String(item.id)),
            b: common_vendor.n(item.id == activeChapterId.value ? "drawer-item-text-active" : ""),
            c: item.id,
            d: common_vendor.n(item.id == activeChapterId.value ? "drawer-item-active" : ""),
            e: common_vendor.o(($event) => {
              return selectChapter(item.id);
            }, item.id)
          };
        }),
        Q: chapters.value.length == 0
      }, chapters.value.length == 0 ? {} : {}, {
        R: chapterLoading.value
      }, chapterLoading.value ? {} : chapterErrorText.value.length > 0 ? common_vendor.e({
        T: common_vendor.t(chapterErrorText.value),
        U: activeChapterId.value.length > 0
      }, activeChapterId.value.length > 0 ? {
        V: common_vendor.o(reloadActiveChapter)
      } : {}) : common_vendor.e({
        W: common_vendor.t(activeChapterTitle.value),
        X: activeChapterStartPage.value.length > 0
      }, activeChapterStartPage.value.length > 0 ? {
        Y: common_vendor.t(activeChapterStartPage.value)
      } : {}, {
        Z: activeChapterPageCount.value.length > 0
      }, activeChapterPageCount.value.length > 0 ? {
        aa: common_vendor.t(activeChapterPageCount.value)
      } : {}, {
        ab: activeChapterIsHtml.value
      }, activeChapterIsHtml.value ? {
        ac: activeChapterContent.value
      } : {
        ad: common_vendor.t(activeChapterContent.value)
      }), {
        S: chapterErrorText.value.length > 0
      }), {
        ae: common_assets._imports_2,
        af: common_vendor.o(goLearningPage),
        ag: common_assets._imports_2$1,
        ah: common_vendor.o(goExamPage),
        ai: common_assets._imports_4,
        aj: common_vendor.o(goConsultPage),
        ak: common_assets._imports_4$1,
        al: common_assets._imports_6$1,
        am: common_vendor.o(goMinePage),
        an: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/book-detail.js.map
