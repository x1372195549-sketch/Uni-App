"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class CourseItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          coverTitle: { type: String, optional: false },
          coverSubtitle: { type: String, optional: false },
          title: { type: String, optional: false },
          teacher: { type: String, optional: false },
          views: { type: String, optional: false },
          comments: { type: String, optional: false }
        };
      },
      name: "CourseItem"
    };
  }
  constructor(options, metadata = CourseItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.coverUrl = this.__props__.coverUrl;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicsTabText = "专题";
const bookTabText = "图书";
const audioTabText = "音频";
const liveTabText = "直播";
const pageTitleText = "课程";
const newsTabText = "资讯";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const searchPlaceholder = "搜索标题、讲师、课程";
const searchText = "搜索";
const retryText = "重新加载";
const emptyText = "暂无课程";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "请求失败，请稍后重试";
const viewText = "浏览";
const commentText = "评论";
const fallbackCoverTitle = "课程封面";
const fallbackTitle = "课程标题";
const fallbackTeacher = "讲师待定";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const courseItems = common_vendor.ref([]);
    const keyword = common_vendor.ref("");
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const hasLoadedOnce = common_vendor.ref(false);
    const isNavigating = common_vendor.ref(false);
    const skeletonItems = [1, 2, 3];
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const safeNumberText = (value) => {
      return String(value == null ? 0 : value);
    };
    const mapCourseToCard = (item, index) => {
      const title = safeText(item.courseName);
      const subtitle = safeText(item.subtitle);
      const lecturer = safeText(item.lecturerName);
      return new CourseItem({
        id: String(item.id),
        coverUrl: safeText(item.coverUrl),
        coverTitle: title.length > 0 ? title : fallbackCoverTitle,
        coverSubtitle: subtitle.length > 0 ? subtitle : "第" + String(index + 1) + "门课程",
        title: title.length > 0 ? title : fallbackTitle,
        teacher: lecturer.length > 0 ? lecturer : fallbackTeacher,
        views: safeNumberText(item.studySeconds),
        comments: safeNumberText(item.videos != null ? item.videos.length : 0)
      });
    };
    const loadCourseItems = (loadMoreValue) => {
      if (!loadMoreValue) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        isLoading.value = true;
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchCourses(page.value, PAGE_SIZE, keyword.value, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const mapped = records.map((item, index) => {
          return mapCourseToCard(item, loadMoreValue ? courseItems.value.length + index : index);
        });
        if (loadMoreValue) {
          courseItems.value = courseItems.value.concat(mapped);
        } else {
          courseItems.value = mapped;
        }
        hasMore.value = records.length >= PAGE_SIZE;
        if (hasMore.value) {
          page.value += 1;
        }
        isLoading.value = false;
        isListLoading.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        isLoading.value = false;
        isListLoading.value = false;
      });
    };
    const reloadList = () => {
      loadCourseItems(false);
    };
    const loadMore = () => {
      loadCourseItems(true);
    };
    const redirectToPage = (url) => {
      if (isNavigating.value) {
        return null;
      }
      isNavigating.value = true;
      common_vendor.index.redirectTo({
        url,
        complete: () => {
          isNavigating.value = false;
        }
      });
    };
    const goLearningPage = () => {
      redirectToPage("/pages/index/index");
    };
    const goTopicsPage = () => {
      redirectToPage("/pages/topics/list");
    };
    const goBookPage = () => {
      redirectToPage("/pages/book/index");
    };
    const goAudioPage = () => {
      redirectToPage("/pages/audio/index");
    };
    const goLivePage = () => {
      redirectToPage("/pages/live/index");
    };
    const goNewsPage = () => {
      redirectToPage("/pages/news/index");
    };
    const goMinePage = () => {
      redirectToPage("/pages/mine/index");
    };
    const goExamPage = () => {
      redirectToPage("/pages/exam/index");
    };
    const goKnowledgePage = () => {
      redirectToPage("/pages/knowledge/index");
    };
    const goConsultPage = () => {
      redirectToPage("/pages/consult/index");
    };
    const goCourseDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + id });
    };
    const ensureLoaded = () => {
      if (!hasLoadedOnce.value) {
        hasLoadedOnce.value = true;
        loadCourseItems(false);
      }
    };
    ensureLoaded();
    common_vendor.onShow(() => {
      ensureLoaded();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.o(goLearningPage),
        e: common_vendor.t(audioTabText),
        f: common_vendor.o(goAudioPage),
        g: common_vendor.t(pageTitleText),
        h: common_vendor.t(liveTabText),
        i: common_vendor.o(goLivePage),
        j: common_vendor.t(bookTabText),
        k: common_vendor.o(goBookPage),
        l: common_vendor.t(topicsTabText),
        m: common_vendor.o(goTopicsPage),
        n: common_vendor.t(newsTabText),
        o: common_vendor.o(goNewsPage),
        p: searchPlaceholder,
        q: common_vendor.o(reloadList),
        r: keyword.value,
        s: common_vendor.o(($event) => {
          return keyword.value = $event.detail.value;
        }),
        t: common_vendor.t(searchText),
        v: common_vendor.o(reloadList),
        w: isLoading.value
      }, isLoading.value ? {
        x: common_vendor.f(skeletonItems, (item, k0, i0) => {
          return {
            a: item
          };
        })
      } : errorText.value.length > 0 ? {
        z: common_vendor.t(errorText.value),
        A: common_vendor.t(retryText),
        B: common_vendor.o(reloadList)
      } : courseItems.value.length == 0 ? {
        D: common_vendor.t(emptyText)
      } : common_vendor.e({
        E: common_vendor.f(courseItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.coverTitle),
            d: common_vendor.t(item.coverSubtitle),
            e: common_vendor.t(pageTitleText)
          }, {
            f: common_vendor.t(item.title),
            g: common_vendor.t(item.teacher),
            h: common_vendor.t(item.views),
            i: common_vendor.t(item.comments),
            j: item.id,
            k: common_vendor.o(($event) => {
              return goCourseDetail(item.id);
            }, item.id)
          });
        }),
        F: common_vendor.t(viewText),
        G: common_vendor.t(commentText),
        H: isListLoading.value
      }, isListLoading.value ? {
        I: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        K: common_vendor.t(noMoreText)
      } : {}, {
        J: !hasMore.value
      }), {
        y: errorText.value.length > 0,
        C: courseItems.value.length == 0,
        L: common_vendor.o(loadMore),
        M: common_assets._imports_1$2,
        N: common_vendor.t(learningTabText),
        O: common_assets._imports_2$1,
        P: common_vendor.t(examTabText),
        Q: common_vendor.o(goExamPage),
        R: common_assets._imports_4,
        S: common_vendor.t(consultTabText),
        T: common_vendor.o(goConsultPage),
        U: common_assets._imports_5,
        V: common_vendor.t(knowledgeTabText),
        W: common_vendor.o(goKnowledgePage),
        X: common_assets._imports_6$1,
        Y: common_vendor.t(mineTabText),
        Z: common_vendor.o(goMinePage),
        aa: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/index.js.map
