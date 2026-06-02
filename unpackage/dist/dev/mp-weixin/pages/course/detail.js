"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class CatalogItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          duration: { type: String, optional: false }
        };
      },
      name: "CatalogItem"
    };
  }
  constructor(options, metadata = CatalogItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.duration = this.__props__.duration;
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
  __name: "detail",
  setup(__props) {
    const courseId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const courseTitle = common_vendor.ref("课程详情");
    const courseViews = common_vendor.ref("0");
    const courseFavorites = common_vendor.ref("0");
    const courseIntro = common_vendor.ref("这里展示课程基础信息。接口返回课程简介、讲师、课程副标题与视频目录时，将优先使用后端数据。");
    const catalogItems = common_vendor.ref([
      new CatalogItem({ id: "1", title: "课程1：目录标题占位一", duration: `21'40"` }),
      new CatalogItem({ id: "2", title: "课程2：目录标题占位二", duration: `21'40"` }),
      new CatalogItem({ id: "3", title: "课程3：目录标题占位三", duration: `21'40"` }),
      new CatalogItem({ id: "4", title: "课程4：目录标题占位四", duration: `21'40"` })
    ]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatDuration = (seconds) => {
      const total = seconds > 0 ? seconds : 0;
      const minute = Math.floor(total / 60);
      const second = total % 60;
      const secondText = second < 10 ? "0" + String(second) : String(second);
      return String(minute) + "'" + secondText + '"';
    };
    const applyCourseDetail = (detail) => {
      const titleText = safeText(detail.courseName);
      if (titleText.length > 0) {
        courseTitle.value = titleText;
      }
      const introText = safeText(detail.introduction);
      if (introText.length > 0) {
        courseIntro.value = introText;
      } else {
        const introParts = new Array();
        const subtitleText = safeText(detail.subtitle);
        const lecturerText = safeText(detail.lecturerName);
        const publishedText = safeText(detail.publishedAt);
        if (subtitleText.length > 0) {
          introParts.push("课程副标题：" + subtitleText);
        }
        if (lecturerText.length > 0) {
          introParts.push("讲师：" + lecturerText);
        }
        if (publishedText.length > 0) {
          introParts.push("发布时间：" + publishedText.replace("T", " "));
        }
        if (introParts.length > 0) {
          courseIntro.value = introParts.join("；");
        }
      }
      courseViews.value = String(detail.studySeconds != null ? detail.studySeconds : 0);
      courseFavorites.value = String(detail.videos != null ? detail.videos.length : 0);
      if (detail.videos != null && detail.videos.length > 0) {
        catalogItems.value = detail.videos.map((item, index) => {
          return new CatalogItem({
            id: String(item.id),
            title: safeText(item.title).length > 0 ? item.title : "课程" + String(index + 1),
            duration: formatDuration(item.durationSeconds)
          });
        });
      }
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const current = pages[pages.length - 1];
        if (current != null && current.options != null) {
          if (current.options["id"] != null) {
            courseId.value = current.options["id"];
          }
          if (current.options["tab"] != null) {
            activeTab.value = current.options["tab"];
          }
        }
      }
      if (courseId.value.length > 0) {
        utils_auth.fetchCourseDetail(courseId.value, (detail) => {
          applyCourseDetail(detail);
        }, () => {
        });
      }
    };
    common_vendor.onMounted(() => {
      loadParams();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.n(activeTab.value == "intro" ? "tab-text tab-text-active" : "tab-text"),
        d: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {} : {}, {
        e: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        f: common_vendor.n(activeTab.value == "catalog" ? "tab-text tab-text-active" : "tab-text"),
        g: activeTab.value == "catalog"
      }, activeTab.value == "catalog" ? {} : {}, {
        h: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        i: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        j: common_vendor.t(courseTitle.value),
        k: common_vendor.t(courseViews.value),
        l: common_vendor.t(courseFavorites.value),
        m: common_vendor.t(courseIntro.value)
      } : {
        n: common_vendor.f(catalogItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.duration),
            c: item.id
          };
        })
      }, {
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/detail.js.map
