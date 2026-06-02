"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class HomeCategory extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          iconUrl: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeCategory"
    };
  }
  constructor(options, metadata = HomeCategory.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.iconUrl = this.__props__.iconUrl;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class HomeContent extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          contentType: { type: String, optional: false },
          targetId: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          linkUrl: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeContent"
    };
  }
  constructor(options, metadata = HomeContent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.contentType = this.__props__.contentType;
    this.targetId = this.__props__.targetId;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.linkUrl = this.__props__.linkUrl;
    this.sortOrder = this.__props__.sortOrder;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class HomeSection extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sectionKey: { type: String, optional: false },
          contentType: { type: String, optional: false },
          typeLabel: { type: String, optional: false },
          typeShort: { type: String, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          description: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          targetId: { type: String, optional: false }
        };
      },
      name: "HomeSection"
    };
  }
  constructor(options, metadata = HomeSection.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sectionKey = this.__props__.sectionKey;
    this.contentType = this.__props__.contentType;
    this.typeLabel = this.__props__.typeLabel;
    this.typeShort = this.__props__.typeShort;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.description = this.__props__.description;
    this.coverUrl = this.__props__.coverUrl;
    this.targetId = this.__props__.targetId;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const homeSections = common_vendor.ref([
      new HomeSection({
        sectionKey: "audio",
        contentType: "podcast",
        typeLabel: "音频内容",
        typeShort: "音频",
        title: "音频内容占位",
        subtitle: "等待首页内容接口返回",
        description: "点击进入音频详情页",
        coverUrl: "",
        targetId: ""
      }),
      new HomeSection({
        sectionKey: "live",
        contentType: "live",
        typeLabel: "直播内容",
        typeShort: "直播",
        title: "直播内容占位",
        subtitle: "等待首页内容接口返回",
        description: "点击进入直播详情页",
        coverUrl: "",
        targetId: ""
      }),
      new HomeSection({
        sectionKey: "course",
        contentType: "course",
        typeLabel: "课程内容",
        typeShort: "课程",
        title: "课程内容占位",
        subtitle: "等待首页内容接口返回",
        description: "点击进入课程详情页",
        coverUrl: "",
        targetId: ""
      }),
      new HomeSection({
        sectionKey: "news",
        contentType: "topic",
        typeLabel: "资讯内容",
        typeShort: "资讯",
        title: "资讯内容占位",
        subtitle: "等待首页内容接口返回",
        description: "点击进入资讯详情页",
        coverUrl: "",
        targetId: ""
      })
    ]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const normalizeContentType = (value) => {
      const type = value.toLowerCase();
      if (type == "podcast" || type == "audio") {
        return "podcast";
      }
      if (type == "live" || type == "live_session") {
        return "live";
      }
      if (type == "course") {
        return "course";
      }
      if (type == "topic" || type == "article" || type == "news") {
        return "topic";
      }
      return type;
    };
    const buildFallbackSections = () => {
      return [...homeSections.value];
    };
    const mapHomeContentToSection = (item, categories) => {
      const normalizedType = normalizeContentType(safeText(item.contentType));
      if (normalizedType != "podcast" && normalizedType != "live" && normalizedType != "course" && normalizedType != "topic") {
        return null;
      }
      const category = UTS.arrayFind(categories, (entry) => {
        return entry.id == item.categoryId;
      });
      const categoryName = category != null ? safeText(category.categoryName) : "";
      let typeLabel = "首页内容";
      let typeShort = "内容";
      let subtitle = "首页配置内容";
      let description = "点击进入详情页";
      if (normalizedType == "podcast") {
        typeLabel = "音频内容";
        typeShort = "音频";
        subtitle = categoryName.length > 0 ? categoryName : "音频推荐";
        description = "点击进入音频详情页";
      }
      if (normalizedType == "live") {
        typeLabel = "直播内容";
        typeShort = "直播";
        subtitle = categoryName.length > 0 ? categoryName : "直播推荐";
        description = "点击进入直播详情页";
      }
      if (normalizedType == "course") {
        typeLabel = "课程内容";
        typeShort = "课程";
        subtitle = categoryName.length > 0 ? categoryName : "课程推荐";
        description = "点击进入课程详情页";
      }
      if (normalizedType == "topic") {
        typeLabel = "资讯内容";
        typeShort = "资讯";
        subtitle = categoryName.length > 0 ? categoryName : "资讯推荐";
        description = "点击进入资讯详情页";
      }
      return {
        sectionKey: normalizedType,
        contentType: normalizedType,
        typeLabel,
        typeShort,
        title: safeText(item.title).length > 0 ? item.title : typeLabel,
        subtitle,
        description,
        coverUrl: safeText(item.coverUrl),
        targetId: String(item.targetId)
      };
    };
    const applyHomeData = (categories, contents) => {
      const fallbackMap = /* @__PURE__ */ new Map();
      const fallbacks = buildFallbackSections();
      for (let i = 0; i < fallbacks.length; i++) {
        fallbackMap.set(fallbacks[i].sectionKey, fallbacks[i]);
      }
      const sortedContents = [...contents].sort((left, right) => {
        return (left.sortOrder || 0) - (right.sortOrder || 0);
      });
      for (let i = 0; i < sortedContents.length; i++) {
        const mapped = mapHomeContentToSection(sortedContents[i], categories);
        if (mapped != null && fallbackMap.has(mapped.sectionKey)) {
          fallbackMap.set(mapped.sectionKey, mapped);
        }
      }
      homeSections.value = [
        UTS.mapGet(fallbackMap, "podcast"),
        UTS.mapGet(fallbackMap, "live"),
        UTS.mapGet(fallbackMap, "course"),
        UTS.mapGet(fallbackMap, "topic")
      ];
    };
    const loadHomeData = () => {
      utils_auth.fetchHomeCategories((categoryPage) => {
        utils_auth.fetchHomeContents((contentPage) => {
          applyHomeData(categoryPage.records || [], contentPage.records || []);
        }, () => {
        });
      }, () => {
      });
    };
    const goHomeDetail = (item) => {
      if (item.targetId.length == 0) {
        return null;
      }
      if (item.contentType == "podcast") {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + item.targetId });
        return null;
      }
      if (item.contentType == "live") {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + item.targetId });
        return null;
      }
      if (item.contentType == "course") {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + item.targetId });
        return null;
      }
      if (item.contentType == "topic") {
        common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + item.targetId });
      }
    };
    const goAudioPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/audio/index" });
    };
    const goLivePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/course/index" });
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
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    common_vendor.onMounted(() => {
      loadHomeData();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.o(goAudioPage),
        c: common_vendor.o(goLivePage),
        d: common_vendor.o(goCoursePage),
        e: common_vendor.o(goNewsPage),
        f: common_assets._imports_1$3,
        g: common_vendor.f(homeSections.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.typeLabel),
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.subtitle),
            d: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            e: item.coverUrl
          } : {
            f: common_vendor.t(item.typeShort)
          }, {
            g: common_vendor.t(item.description),
            h: item.sectionKey,
            i: common_vendor.o(($event) => {
              return goHomeDetail(item);
            }, item.sectionKey)
          });
        }),
        h: common_assets._imports_1$4,
        i: common_assets._imports_2,
        j: common_vendor.o(goExamPage),
        k: common_assets._imports_3,
        l: common_vendor.o(goConsultPage),
        m: common_assets._imports_4,
        n: common_vendor.o(goKnowledgePage),
        o: common_assets._imports_5,
        p: common_vendor.o(goMinePage),
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
