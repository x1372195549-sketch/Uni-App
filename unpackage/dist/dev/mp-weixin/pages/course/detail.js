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
          duration: { type: String, optional: false },
          videoUrl: { type: String, optional: false }
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
    this.videoUrl = this.__props__.videoUrl;
    delete this.__props__;
  }
}
const RESOURCE_TYPE = "course";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const courseId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const courseTitle = common_vendor.ref("课程详情");
    const courseViews = common_vendor.ref("0");
    const courseFavorites = common_vendor.ref("0");
    const courseIntro = common_vendor.ref("这里展示课程基础信息。");
    const courseCoverUrl = common_vendor.ref("");
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const catalogItems = common_vendor.ref([]);
    const currentVideoId = common_vendor.ref("");
    const currentVideoUrl = common_vendor.ref("");
    const currentVideoTitle = common_vendor.ref("");
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function formatDuration(seconds) {
      const total = seconds > 0 ? seconds : 0;
      const minute = Math.floor(total / 60);
      const second = total % 60;
      const minuteText = minute < 10 ? "0" + String(minute) : String(minute);
      const secondText = second < 10 ? "0" + String(second) : String(second);
      return minuteText + ":" + secondText;
    }
    function readDurationFromEvent(event = null) {
      if (event == null || event.detail == null) {
        return 0;
      }
      const durationValue = event.detail.duration;
      if (typeof durationValue == "number") {
        return Math.floor(durationValue);
      }
      return 0;
    }
    function updateCatalogDuration(id, durationText) {
      catalogItems.value = catalogItems.value.map((item) => {
        if (item.id == id) {
          return new CatalogItem({
            id: item.id,
            title: item.title,
            duration: durationText,
            videoUrl: item.videoUrl
          });
        }
        return item;
      });
    }
    function syncCurrentVideoDuration(event = null) {
      const duration = readDurationFromEvent(event);
      if (duration > 0 && currentVideoId.value.length > 0) {
        updateCatalogDuration(currentVideoId.value, formatDuration(duration));
      }
    }
    function selectCatalogItem(id) {
      for (let i = 0; i < catalogItems.value.length; i++) {
        const item = catalogItems.value[i];
        if (item.id == id) {
          currentVideoId.value = item.id;
          currentVideoTitle.value = item.title;
          currentVideoUrl.value = item.videoUrl;
          if (item.videoUrl.length == 0) {
            common_vendor.index.showToast({
              title: "暂无可播放视频",
              icon: "none"
            });
          }
          return null;
        }
      }
    }
    function playSelectedVideo() {
      if (currentVideoUrl.value.length > 0) {
        return null;
      }
      if (currentVideoId.value.length == 0 && catalogItems.value.length > 0) {
        selectCatalogItem(catalogItems.value[0].id);
        return null;
      }
      if (currentVideoId.value.length > 0) {
        selectCatalogItem(currentVideoId.value);
      }
    }
    function loadFavoriteStatus() {
      if (courseId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(courseId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    }
    function reportBrowse() {
      if (courseId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(courseId.value)
      }), () => {
      }, () => {
      });
    }
    function toggleFavorite() {
      if (courseId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(courseId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavorited.value = result.favorited;
        courseFavorites.value = String(result.favoriteCount != null ? result.favoriteCount : 0);
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: result.favorited ? "收藏成功" : "已取消收藏",
          icon: "success"
        });
      }, (message) => {
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    function applyCourseDetail(detail) {
      const titleText = safeText(detail.courseName);
      courseCoverUrl.value = safeText(detail.coverUrl);
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
      if (detail.videos != null && detail.videos.length > 0) {
        catalogItems.value = detail.videos.map((item, index) => {
          return new CatalogItem({
            id: String(item.id),
            title: safeText(item.title).length > 0 ? item.title : "课程 " + String(index + 1),
            duration: "--:--",
            videoUrl: utils_auth.normalizeAppUrl(safeText(item.videoUrl))
          });
        });
        currentVideoId.value = catalogItems.value[0].id;
        currentVideoTitle.value = catalogItems.value[0].title;
        currentVideoUrl.value = "";
      } else {
        catalogItems.value = [];
        currentVideoId.value = "";
        currentVideoTitle.value = "";
        currentVideoUrl.value = "";
      }
    }
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
    }
    function loadParams() {
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
      const tabValue = options["tab"];
      if (typeof idValue == "string" && idValue.length > 0) {
        courseId.value = idValue;
      }
      if (typeof tabValue == "string" && tabValue.length > 0) {
        activeTab.value = tabValue;
      }
    }
    function loadCourseDetail() {
      if (courseId.value.length == 0) {
        return null;
      }
      utils_auth.fetchCourseDetail(courseId.value, (detail) => {
        applyCourseDetail(detail);
        reportBrowse();
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    }
    common_vendor.onMounted(() => {
      loadParams();
      loadCourseDetail();
      loadFavoriteStatus();
    });
    common_vendor.onShow(() => {
      loadFavoriteStatus();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: currentVideoUrl.value.length > 0
      }, currentVideoUrl.value.length > 0 ? {
        d: currentVideoUrl.value,
        e: currentVideoTitle.value,
        f: courseCoverUrl.value,
        g: common_vendor.o(syncCurrentVideoDuration),
        h: common_vendor.o(syncCurrentVideoDuration)
      } : {}, {
        i: currentVideoUrl.value.length == 0 && courseCoverUrl.value.length > 0
      }, currentVideoUrl.value.length == 0 && courseCoverUrl.value.length > 0 ? {
        j: courseCoverUrl.value
      } : {}, {
        k: currentVideoUrl.value.length == 0
      }, currentVideoUrl.value.length == 0 ? {} : {}, {
        l: currentVideoUrl.value.length == 0 && courseCoverUrl.value.length == 0
      }, currentVideoUrl.value.length == 0 && courseCoverUrl.value.length == 0 ? {} : {}, {
        m: currentVideoUrl.value.length == 0 && currentVideoId.value.length > 0
      }, currentVideoUrl.value.length == 0 && currentVideoId.value.length > 0 ? {} : {}, {
        n: common_vendor.o(playSelectedVideo),
        o: common_vendor.n(activeTab.value == "intro" ? "tab-text tab-text-active" : "tab-text"),
        p: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {} : {}, {
        q: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        r: common_vendor.n(activeTab.value == "catalog" ? "tab-text tab-text-active" : "tab-text"),
        s: activeTab.value == "catalog"
      }, activeTab.value == "catalog" ? {} : {}, {
        t: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        v: common_vendor.t(isFavorited.value ? "已收藏" : "收藏"),
        w: common_vendor.n(isFavorited.value ? "favorite-text-active" : ""),
        x: common_vendor.o(toggleFavorite),
        y: activeTab.value == "intro"
      }, activeTab.value == "intro" ? {
        z: common_vendor.t(courseTitle.value),
        A: common_vendor.t(courseViews.value),
        B: common_vendor.t(courseFavorites.value),
        C: common_vendor.t(courseIntro.value)
      } : {
        D: common_vendor.f(catalogItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.n(item.id == currentVideoId.value ? "catalog-title-active" : ""),
            c: common_vendor.t(item.duration),
            d: common_vendor.n(item.id == currentVideoId.value ? "catalog-duration-active" : ""),
            e: item.id,
            f: common_vendor.n(item.id == currentVideoId.value ? "catalog-row catalog-row-active" : "catalog-row"),
            g: common_vendor.o(($event) => {
              return selectCatalogItem(item.id);
            }, item.id)
          };
        })
      }, {
        E: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/course/detail.js.map
