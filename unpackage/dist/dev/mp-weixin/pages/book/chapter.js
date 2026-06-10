"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "chapter",
  setup(__props) {
    const bookId = common_vendor.ref("");
    const chapterId = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const chapterTitle = common_vendor.ref("");
    const content = common_vendor.ref("");
    const isHtmlContent = common_vendor.ref(false);
    const startPageText = common_vendor.ref("");
    const pageCountText = common_vendor.ref("");
    const enterTimestamp = common_vendor.ref(0);
    const hasSavedStudyTime = common_vendor.ref(false);
    function buildProgressStorageKey(id) {
      return "book_chapter_progress_" + id;
    }
    function buildChapterStudySecondsKey(id) {
      return "book_chapter_seconds_" + id;
    }
    function readNumberStorage(key) {
      const value = common_vendor.index.getStorageSync(key);
      if (typeof value == "number") {
        return value;
      }
      if (typeof value == "string" && value.length > 0) {
        const parsed = Number(value);
        return isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    }
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function detectHtml(value) {
      return value.indexOf("<p") >= 0 || value.indexOf("<div") >= 0 || value.indexOf("<br") >= 0;
    }
    function applyChapter(detail) {
      chapterTitle.value = safeText(detail.chapterTitle).length > 0 ? safeText(detail.chapterTitle) : "章节内容";
      content.value = safeText(detail.content);
      isHtmlContent.value = detectHtml(content.value);
      startPageText.value = detail.startPage > 0 ? "起始页 " + String(detail.startPage) : "";
      pageCountText.value = detail.pageCount > 0 ? "页数 " + String(detail.pageCount) : "";
    }
    function markChapterViewed() {
      if (bookId.value.length == 0 || chapterId.value.length == 0) {
        return null;
      }
      const key = buildProgressStorageKey(bookId.value);
      const stored = common_vendor.index.getStorageSync(key);
      let viewedIds = [];
      if (UTS.isInstanceOf(stored, Array)) {
        viewedIds = stored;
      }
      if (viewedIds.indexOf(chapterId.value) < 0) {
        viewedIds.push(chapterId.value);
        common_vendor.index.setStorageSync(key, viewedIds);
      }
    }
    function saveStudyDuration() {
      if (hasSavedStudyTime.value || bookId.value.length == 0 || chapterId.value.length == 0 || enterTimestamp.value <= 0) {
        return null;
      }
      const durationSeconds = Math.floor((Date.now() - enterTimestamp.value) / 1e3);
      if (durationSeconds <= 0) {
        return null;
      }
      hasSavedStudyTime.value = true;
      const key = buildChapterStudySecondsKey(bookId.value + "_" + chapterId.value);
      const currentSeconds = readNumberStorage(key);
      common_vendor.index.setStorageSync(key, currentSeconds + durationSeconds);
      markChapterViewed();
    }
    function reportBrowse() {
      if (bookId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: "book",
        resourceId: Number(bookId.value)
      }), () => {
      }, () => {
      });
    }
    function loadChapter() {
      if (bookId.value.length == 0 || chapterId.value.length == 0) {
        errorText.value = "缺少图书或章节 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchBookChapterDetail(bookId.value, chapterId.value, (detail) => {
        applyChapter(detail);
        isLoading.value = false;
        reportBrowse();
      }, (message) => {
        errorText.value = message.length > 0 ? message : "章节加载失败";
        isLoading.value = false;
      });
    }
    function goBack() {
      saveStudyDuration();
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      if (bookId.value.length > 0) {
        common_vendor.index.redirectTo({ url: "/pages/book/detail?id=" + bookId.value });
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/book/index" });
    }
    common_vendor.onLoad((options = null) => {
      const bookIdValue = options["bookId"];
      const chapterIdValue = options["chapterId"];
      if (typeof bookIdValue == "string") {
        bookId.value = bookIdValue;
      }
      if (typeof chapterIdValue == "string") {
        chapterId.value = chapterIdValue;
      }
      enterTimestamp.value = Date.now();
      loadChapter();
    });
    common_vendor.onHide(() => {
      saveStudyDuration();
    });
    common_vendor.onUnload(() => {
      saveStudyDuration();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        e: common_vendor.t(errorText.value),
        f: common_vendor.o(loadChapter)
      } : common_vendor.e({
        g: common_vendor.t(chapterTitle.value),
        h: startPageText.value.length > 0
      }, startPageText.value.length > 0 ? {
        i: common_vendor.t(startPageText.value)
      } : {}, {
        j: pageCountText.value.length > 0
      }, pageCountText.value.length > 0 ? {
        k: common_vendor.t(pageCountText.value)
      } : {}, {
        l: isHtmlContent.value
      }, isHtmlContent.value ? {
        m: content.value
      } : {
        n: common_vendor.t(content.value.length > 0 ? content.value : "暂无章节内容")
      }), {
        d: errorText.value.length > 0,
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/book/chapter.js.map
