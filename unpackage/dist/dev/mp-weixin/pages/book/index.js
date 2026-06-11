"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const PAGE_SIZE = 10;
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicsTabText = "专题";
const pageTitleText = "图书";
const audioTabText = "音频";
const liveTabText = "直播";
const courseTabText = "课程";
const newsTabText = "资讯";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const selectedCategoryId = common_vendor.ref(0);
    const categories = common_vendor.ref([]);
    const books = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isInitialLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const isRefreshing = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
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
    function formatMinutes(seconds) {
      const minutes = Math.floor(seconds / 60);
      return String(minutes) + "分钟";
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
    function readViewedChapterIds(bookId) {
      const stored = common_vendor.index.getStorageSync(buildProgressStorageKey(bookId));
      if (UTS.isInstanceOf(stored, Array)) {
        return stored;
      }
      return [];
    }
    function readBookStudySummary(bookId) {
      const stored = common_vendor.index.getStorageSync(buildBookStudySummaryKey(bookId));
      if (stored != null && typeof stored == "object") {
        return stored;
      }
      return null;
    }
    function applyLocalBookProgress(item) {
      const bookIdText = String(item.id);
      const chapters = item.chapters != null ? item.chapters : [];
      const viewedIds = readViewedChapterIds(bookIdText);
      const summary = readBookStudySummary(bookIdText);
      let progressPercent = item.progressPercent;
      let studySeconds = item.studySeconds;
      if (summary != null) {
        const cachedProgress = summary["progressPercent"];
        const cachedSeconds = summary["studySeconds"];
        if (typeof cachedProgress == "number") {
          progressPercent = cachedProgress;
        }
        if (typeof cachedSeconds == "number") {
          studySeconds = cachedSeconds;
        }
      } else if (chapters.length > 0 && viewedIds.length > 0) {
        let viewedCount = 0;
        let totalSeconds = 0;
        chapters.forEach((chapter) => {
          const chapterIdText = String(chapter.id);
          if (viewedIds.indexOf(chapterIdText) >= 0) {
            viewedCount += 1;
          }
          totalSeconds += readNumberStorage(buildChapterStudySecondsKey(bookIdText + "_" + chapterIdText));
        });
        progressPercent = Math.floor(viewedCount * 100 / chapters.length);
        studySeconds = totalSeconds;
      }
      return new utils_auth.AppBook({
        id: item.id,
        categoryId: item.categoryId,
        bookName: item.bookName,
        author: item.author,
        publisher: item.publisher,
        coverUrl: item.coverUrl,
        introduction: item.introduction,
        totalPages: item.totalPages,
        paperId: item.paperId,
        publishedAt: item.publishedAt,
        browseCount: item.browseCount,
        favoriteCount: item.favoriteCount,
        favorited: item.favorited,
        progressPercent,
        studySeconds,
        chapters: item.chapters
      });
    }
    function loadCategories() {
      utils_auth.fetchBookCategories(1, 100, "", 0, (pageData) => {
        categories.value = pageData.records != null ? pageData.records : [];
      }, () => {
        categories.value = [];
      });
    }
    function loadBooks(loadMoreFlag) {
      if (!loadMoreFlag) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        if (!isRefreshing.value) {
          isInitialLoading.value = true;
        }
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchBooks(page.value, PAGE_SIZE, keyword.value, selectedCategoryId.value, (pageData) => {
        const records = pageData.records != null ? pageData.records.map((item) => {
          return applyLocalBookProgress(item);
        }) : [];
        if (loadMoreFlag) {
          books.value = books.value.concat(records);
        } else {
          books.value = records;
        }
        hasMore.value = books.value.length < pageData.total && records.length > 0;
        if (hasMore.value) {
          page.value += 1;
        }
        isInitialLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : "图书加载失败";
        isInitialLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      });
    }
    function loadInitialData() {
      loadCategories();
      loadBooks(false);
    }
    function selectCategory(id) {
      if (selectedCategoryId.value == id) {
        return null;
      }
      selectedCategoryId.value = id;
      loadBooks(false);
    }
    function handleSearch() {
      loadBooks(false);
    }
    function handleRefresh() {
      if (isRefreshing.value) {
        return null;
      }
      isRefreshing.value = true;
      utils_auth.fetchBookCategories(1, 100, "", 0, (pageData) => {
        categories.value = pageData.records != null ? pageData.records : [];
        loadBooks(false);
      }, () => {
        categories.value = [];
        loadBooks(false);
      });
    }
    function loadMore() {
      loadBooks(true);
    }
    function refreshLocalBookProgress() {
      books.value = books.value.map((item) => {
        return applyLocalBookProgress(item);
      });
    }
    function goDetail(id) {
      common_vendor.index.navigateTo({ url: "/pages/book/detail?id=" + String(id) });
    }
    common_vendor.onShow(() => {
      refreshLocalBookProgress();
    });
    function goLearningPage() {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    }
    function goTopicsPage() {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    }
    function goAudioPage() {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    }
    function goLivePage() {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    }
    function goCoursePage() {
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
    }
    function goNewsPage() {
      common_vendor.index.redirectTo({ url: "/pages/news/index" });
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
    function goMinePage() {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    }
    loadInitialData();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.o(goLearningPage),
        e: common_vendor.t(audioTabText),
        f: common_vendor.o(goAudioPage),
        g: common_vendor.t(courseTabText),
        h: common_vendor.o(goCoursePage),
        i: common_vendor.t(liveTabText),
        j: common_vendor.o(goLivePage),
        k: common_vendor.t(pageTitleText),
        l: common_vendor.t(topicsTabText),
        m: common_vendor.o(goTopicsPage),
        n: common_vendor.t(newsTabText),
        o: common_vendor.o(goNewsPage),
        p: common_vendor.o(handleSearch),
        q: keyword.value,
        r: common_vendor.o(($event) => {
          return keyword.value = $event.detail.value;
        }),
        s: common_vendor.o(handleSearch),
        t: common_vendor.n(selectedCategoryId.value == 0 ? "category-text-active" : ""),
        v: common_vendor.n(selectedCategoryId.value == 0 ? "category-item-active" : ""),
        w: common_vendor.o(($event) => {
          return selectCategory(0);
        }),
        x: common_vendor.f(categories.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.categoryName),
            b: common_vendor.n(selectedCategoryId.value == item.id ? "category-text-active" : ""),
            c: item.id,
            d: common_vendor.n(selectedCategoryId.value == item.id ? "category-item-active" : ""),
            e: common_vendor.o(($event) => {
              return selectCategory(item.id);
            }, item.id)
          };
        }),
        y: isInitialLoading.value
      }, isInitialLoading.value ? {} : errorText.value.length > 0 ? {
        A: common_vendor.t(errorText.value),
        B: common_vendor.o(loadInitialData)
      } : books.value.length == 0 ? {} : common_vendor.e({
        D: common_vendor.f(books.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(buildShortTitle(item.bookName))
          }, {
            d: common_vendor.t(item.bookName),
            e: common_vendor.t(item.author.length > 0 ? item.author : "作者未填写"),
            f: common_vendor.t(item.introduction.length > 0 ? item.introduction : "暂无简介"),
            g: common_vendor.s("width:" + String(item.progressPercent) + "%"),
            h: common_vendor.t(String(item.progressPercent)),
            i: common_vendor.t(String(item.browseCount)),
            j: common_vendor.t(formatMinutes(item.studySeconds)),
            k: item.id,
            l: common_vendor.o(($event) => {
              return goDetail(item.id);
            }, item.id)
          });
        }),
        E: isListLoading.value
      }, isListLoading.value ? {} : !hasMore.value ? {} : {}, {
        F: !hasMore.value
      }), {
        z: errorText.value.length > 0,
        C: books.value.length == 0,
        G: isRefreshing.value,
        H: common_vendor.o(handleRefresh),
        I: common_vendor.o(loadMore),
        J: common_assets._imports_1$2,
        K: common_vendor.o(goLearningPage),
        L: common_assets._imports_2$1,
        M: common_vendor.o(goExamPage),
        N: common_assets._imports_4,
        O: common_vendor.o(goConsultPage),
        P: common_assets._imports_5,
        Q: common_vendor.o(goKnowledgePage),
        R: common_assets._imports_6$1,
        S: common_vendor.o(goMinePage),
        T: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/book/index.js.map
