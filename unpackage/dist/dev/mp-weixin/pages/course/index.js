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
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
class CourseVideo extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseId: { type: Number, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "CourseVideo"
    };
  }
  constructor(options, metadata = CourseVideo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseId = this.__props__.courseId;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class Course extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseName: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          lecturerName: { type: String, optional: false },
          introduction: { type: String, optional: false },
          paperId: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          videos: { type: UTS.UTSType.withGenerics(Array, [CourseVideo]), optional: false }
        };
      },
      name: "Course"
    };
  }
  constructor(options, metadata = Course.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseName = this.__props__.courseName;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.lecturerName = this.__props__.lecturerName;
    this.introduction = this.__props__.introduction;
    this.paperId = this.__props__.paperId;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.videos = this.__props__.videos;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const placeholderItems = [
      new UTSJSONObject({
        id: "1",
        coverTitle: "课程封面占位",
        coverSubtitle: "第一门课程",
        title: "课程标题占位一，点击进入课程详情页面",
        teacher: "讲师名称占位",
        views: "2600",
        comments: "420"
      }),
      new UTSJSONObject({
        id: "2",
        coverTitle: "课程封面占位",
        coverSubtitle: "第二门课程",
        title: "课程标题占位二，点击进入课程详情页面",
        teacher: "讲师名称占位",
        views: "2600",
        comments: "420"
      })
    ];
    const courseItems = common_vendor.ref([]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const mapCourseToCard = (item, index) => {
      const courseName = safeText(item.courseName);
      const subtitle = safeText(item.subtitle);
      const lecturer = safeText(item.lecturerName);
      return new CourseItem({
        id: String(item.id),
        coverTitle: courseName.length > 0 ? courseName : "课程封面占位",
        coverSubtitle: subtitle.length > 0 ? subtitle : "第" + String(index + 1) + "门课程",
        title: courseName.length > 0 ? courseName : "课程标题占位",
        teacher: lecturer.length > 0 ? lecturer : "讲师名称占位",
        views: String(item.studySeconds != null ? item.studySeconds : 0),
        comments: String(item.videos != null ? item.videos.length : 0)
      });
    };
    const loadCourseItems = () => {
      utils_auth.fetchCourses((pageData) => {
        if (pageData.records != null && pageData.records.length > 0) {
          courseItems.value = pageData.records.map((item, index) => {
            return mapCourseToCard(item, index);
          });
          return null;
        }
        courseItems.value = placeholderItems;
      }, () => {
        courseItems.value = placeholderItems;
      });
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goAudioPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    };
    const goNewsPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/news/index" });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const goCourseDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + id });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    loadCourseItems();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goAudioPage),
        d: common_vendor.o(goLivePage),
        e: common_vendor.o(goNewsPage),
        f: common_vendor.f(courseItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.coverTitle),
            b: common_vendor.t(item.coverSubtitle),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.teacher),
            e: common_vendor.t(item.views),
            f: common_vendor.t(item.comments),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goCourseDetail(item.id);
            }, item.id)
          };
        }),
        g: common_assets._imports_1$4,
        h: common_assets._imports_2,
        i: common_vendor.o(goExamPage),
        j: common_assets._imports_3,
        k: common_vendor.o(goConsultPage),
        l: common_assets._imports_4,
        m: common_vendor.o(goKnowledgePage),
        n: common_assets._imports_5,
        o: common_vendor.o(goMinePage),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/index.js.map
