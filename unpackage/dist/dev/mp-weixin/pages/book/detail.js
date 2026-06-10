"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const bookId = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const bookName = common_vendor.ref("");
    const shortTitle = common_vendor.ref("图书");
    const author = common_vendor.ref("");
    const publisher = common_vendor.ref("");
    const coverUrl = common_vendor.ref("");
    const introduction = common_vendor.ref("");
    const browseCount = common_vendor.ref("0");
    const favoriteCount = common_vendor.ref("0");
    const favorited = common_vendor.ref(false);
    const progressText = common_vendor.ref("0");
    const studyMinutes = common_vendor.ref("0");
    const totalPagesText = common_vendor.ref("0 页");
    const chapters = common_vendor.ref([]);
    const hasLoadedDetail = common_vendor.ref(false);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function buildShortTitle(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "图书";
      }
      return text.length <= 4 ? text : text.substring(0, 4);
    }
    function sortChapters(items) {
      return items.slice().sort((left, right) => {
        if (left.sortOrder != right.sortOrder) {
          return left.sortOrder - right.sortOrder;
        }
        return left.id - right.id;
      });
    }
    function buildProgressStorageKey(id) {
      return "book_chapter_progress_" + id;
    }
    function buildChapterStudySecondsKey(id) {
      return "book_chapter_seconds_" + id;
    }
    function buildBookStudySummaryKey(id) {
      return "book_study_summary_" + id;
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
    function readViewedChapterIds() {
      if (bookId.value.length == 0) {
        return [];
      }
      const stored = common_vendor.index.getStorageSync(buildProgressStorageKey(bookId.value));
      if (UTS.isInstanceOf(stored, Array)) {
        return stored;
      }
      return [];
    }
    function applyLocalStudyProgress() {
      const totalChapters = chapters.value.length;
      if (bookId.value.length == 0 || totalChapters == 0) {
        progressText.value = "0";
        studyMinutes.value = "0";
        return null;
      }
      const viewedIds = readViewedChapterIds();
      let viewedCount = 0;
      let totalSeconds = 0;
      chapters.value.forEach((item) => {
        const chapterIdText = String(item.id);
        if (viewedIds.indexOf(chapterIdText) >= 0) {
          viewedCount += 1;
        }
        totalSeconds += readNumberStorage(buildChapterStudySecondsKey(bookId.value + "_" + chapterIdText));
      });
      progressText.value = String(Math.floor(viewedCount * 100 / totalChapters));
      studyMinutes.value = String(Math.floor(totalSeconds / 60));
      common_vendor.index.setStorageSync(buildBookStudySummaryKey(bookId.value), new UTSJSONObject({
        progressPercent: Number(progressText.value),
        studySeconds: totalSeconds
      }));
    }
    function isChapterViewed(chapterId) {
      return readViewedChapterIds().indexOf(String(chapterId)) >= 0;
    }
    function applyDetail(detail) {
      bookName.value = safeText(detail.bookName);
      shortTitle.value = buildShortTitle(detail.bookName);
      author.value = safeText(detail.author);
      publisher.value = safeText(detail.publisher);
      coverUrl.value = safeText(detail.coverUrl);
      introduction.value = safeText(detail.introduction);
      browseCount.value = String(detail.browseCount);
      favoriteCount.value = String(detail.favoriteCount);
      favorited.value = detail.favorited;
      totalPagesText.value = detail.totalPages > 0 ? String(detail.totalPages) + " 页" : "0 页";
      chapters.value = sortChapters(detail.chapters != null ? detail.chapters : []);
      applyLocalStudyProgress();
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
    function loadDetail() {
      if (bookId.value.length == 0) {
        errorText.value = "缺少图书 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchBookDetail(bookId.value, (detail) => {
        applyDetail(detail);
        isLoading.value = false;
        hasLoadedDetail.value = true;
        reportBrowse();
      }, (message) => {
        errorText.value = message.length > 0 ? message : "图书详情加载失败";
        isLoading.value = false;
      });
    }
    function toggleFavorite() {
      if (bookId.value.length == 0) {
        return null;
      }
      const nextFavorited = !favorited.value;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: "book",
        resourceId: Number(bookId.value),
        favorited: nextFavorited
      }), () => {
        favorited.value = nextFavorited;
        const nextCount = Number(favoriteCount.value) + (nextFavorited ? 1 : -1);
        favoriteCount.value = String(nextCount < 0 ? 0 : nextCount);
        common_vendor.index.showToast({ title: nextFavorited ? "已收藏" : "已取消收藏", icon: "none" });
      }, (message) => {
        common_vendor.index.showToast({ title: message.length > 0 ? message : "收藏失败", icon: "none" });
      });
    }
    function goChapter(chapterId) {
      common_vendor.index.navigateTo({ url: "/pages/book/chapter?bookId=" + bookId.value + "&chapterId=" + String(chapterId) });
    }
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/book/index" });
    }
    common_vendor.onLoad((options = null) => {
      const idValue = options["id"];
      if (typeof idValue == "string") {
        bookId.value = idValue;
      }
      loadDetail();
    });
    common_vendor.onShow(() => {
      if (hasLoadedDetail.value) {
        applyLocalStudyProgress();
      }
    });
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
        j: common_vendor.t(bookName.value),
        k: common_vendor.t(author.value.length > 0 ? author.value : "作者未填写"),
        l: publisher.value.length > 0
      }, publisher.value.length > 0 ? {
        m: common_vendor.t(publisher.value)
      } : {}, {
        n: common_vendor.t(browseCount.value),
        o: common_vendor.t(favoriteCount.value),
        p: common_vendor.t(favorited.value ? "已收藏" : "收藏"),
        q: common_vendor.o(toggleFavorite),
        r: common_vendor.t(introduction.value.length > 0 ? introduction.value : "暂无简介"),
        s: common_vendor.s("width:" + progressText.value + "%"),
        t: common_vendor.t(progressText.value),
        v: common_vendor.t(studyMinutes.value),
        w: common_vendor.t(totalPagesText.value),
        x: common_vendor.t(String(chapters.value.length)),
        y: chapters.value.length == 0
      }, chapters.value.length == 0 ? {} : {}, {
        z: common_vendor.f(chapters.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.chapterTitle.length > 0 ? item.chapterTitle : "章节 " + String(item.id)),
            b: common_vendor.t(String(item.startPage)),
            c: common_vendor.t(String(item.pageCount)),
            d: common_vendor.t(isChapterViewed(item.id) ? "已学习" : "进入"),
            e: item.id,
            f: common_vendor.o(($event) => {
              return goChapter(item.id);
            }, item.id)
          };
        })
      }), {
        d: errorText.value.length > 0,
        A: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/book/detail.js.map
