"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class HomeTopicCard extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false }
        };
      },
      name: "HomeTopicCard"
    };
  }
  constructor(options, metadata = HomeTopicCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.favoriteCount = this.__props__.favoriteCount;
    delete this.__props__;
  }
}
class HomeRecommendItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          typeLabel: { type: String, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false }
        };
      },
      name: "HomeRecommendItem"
    };
  }
  constructor(options, metadata = HomeRecommendItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.typeLabel = this.__props__.typeLabel;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    delete this.__props__;
  }
}
class HomeHeroSlide extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          kicker: { type: String, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          actionText: { type: String, optional: false }
        };
      },
      name: "HomeHeroSlide"
    };
  }
  constructor(options, metadata = HomeHeroSlide.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.kicker = this.__props__.kicker;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.actionText = this.__props__.actionText;
    delete this.__props__;
  }
}
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicTabText = "专题";
const bookTabText = "图书";
const audioTabText = "音频";
const liveTabText = "直播";
const courseTabText = "课程";
const newsTabText = "资讯";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const heroKickerText = "学习专题";
const heroTitleText = "分场景、分资源的中医学习设计";
const heroSubtitleText = "用专题把图书、课程、音频串成完整学习路径。";
const heroActionText = "进入专题";
const heroActionAudioText = "进入音频";
const heroActionLiveText = "进入直播";
const heroActionCourseText = "进入课程";
const heroActionNewsText = "查看资讯";
const homeRecommendTitle = "首页推荐";
const recommendTopicTitle = "热门专题";
const emptyRecommendText = "暂无首页推荐";
const emptyTopicText = "暂无热门专题";
const moreText = "更多";
const viewText = "浏览";
const favoriteText = "收藏";
const fallbackTopicSummary = "更适合按主题化学习的内容组合。";
const fallbackAudioSummary = "从音频角度继续学习。";
const fallbackLiveSummary = "查看最新直播与回放内容。";
const fallbackCourseSummary = "进入系统课程学习。";
const fallbackNewsSlideSummary = "了解最新资讯内容。";
const TOPIC_DETAIL_ID_KEY = "topic_detail_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const topicItems = common_vendor.ref([]);
    const recommendItems = common_vendor.ref([]);
    const heroSlides = common_vendor.ref([]);
    const isNavigating = common_vendor.ref(false);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const safeNumber = (value = null) => {
      return value == null ? 0 : value;
    };
    const normalizeResourceType = (value) => {
      const text = safeText(value).toUpperCase();
      if (text == "PODCAST" || text == "PODCASTS" || text == "AUDIO" || text == "AUDIOS" || text == "APP_PODCAST" || text == "音频") {
        return "AUDIO";
      }
      if (text == "ARTICLE" || text == "ARTICLES" || text == "NEWS" || text == "INFO" || text == "资讯") {
        return "ARTICLE";
      }
      if (text == "TOPIC" || text == "TOPICS" || text == "SPECIAL" || text == "SPECIAL_TOPIC" || text == "SUBJECT" || text == "专题") {
        return "TOPIC";
      }
      if (text == "BOOK" || text == "BOOKS" || text == "图书") {
        return "BOOK";
      }
      if (text == "LIVE" || text == "LIVES" || text == "LIVESESSION" || text == "LIVE_SESSION" || text == "LIVE_STREAM" || text == "直播") {
        return "LIVE";
      }
      if (text == "COURSE" || text == "COURSES" || text == "APP_COURSE" || text == "课程") {
        return "COURSE";
      }
      return text;
    };
    const labelByResourceType = (type, fallback) => {
      if (fallback.length > 0) {
        return fallback;
      }
      if (type == "AUDIO") {
        return audioTabText;
      }
      if (type == "LIVE") {
        return liveTabText;
      }
      if (type == "COURSE") {
        return courseTabText;
      }
      if (type == "ARTICLE") {
        return newsTabText;
      }
      if (type == "TOPIC") {
        return topicTabText;
      }
      if (type == "BOOK") {
        return bookTabText;
      }
      return fallback;
    };
    const fallbackSummaryByResourceType = (type) => {
      if (type == "AUDIO") {
        return fallbackAudioSummary;
      }
      if (type == "LIVE") {
        return fallbackLiveSummary;
      }
      if (type == "COURSE") {
        return fallbackCourseSummary;
      }
      if (type == "ARTICLE") {
        return fallbackNewsSlideSummary;
      }
      if (type == "BOOK") {
        return "进入图书阅读。";
      }
      return fallbackTopicSummary;
    };
    const actionTextByResourceType = (type) => {
      if (type == "AUDIO") {
        return heroActionAudioText;
      }
      if (type == "LIVE") {
        return heroActionLiveText;
      }
      if (type == "COURSE") {
        return heroActionCourseText;
      }
      if (type == "ARTICLE") {
        return heroActionNewsText;
      }
      if (type == "BOOK") {
        return "查看图书";
      }
      return heroActionText;
    };
    const mapRecommendItem = (item) => {
      const type = normalizeResourceType(item.contentType);
      const label = labelByResourceType(type, safeText(item.contentTypeLabel));
      const summary = safeText(item.summary).length > 0 ? safeText(item.summary) : safeText(item.subtitle);
      return new HomeRecommendItem({
        id: type + "-" + String(item.id),
        resourceType: type,
        resourceId: safeNumber(item.targetId),
        typeLabel: label,
        title: safeText(item.title),
        summary: summary.length > 0 ? summary : fallbackSummaryByResourceType(type),
        coverUrl: safeText(item.coverUrl)
      });
    };
    const mapTopicItem = (item) => {
      const type = normalizeResourceType(item.contentType);
      return new HomeTopicCard({
        id: item.id,
        resourceType: type,
        resourceId: safeNumber(item.targetId),
        title: safeText(item.title),
        summary: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackTopicSummary,
        coverUrl: safeText(item.coverUrl),
        tags: [],
        viewCount: 0,
        favoriteCount: 0
      });
    };
    const mapHeroSlide = (item) => {
      const type = normalizeResourceType(item.contentType);
      return new HomeHeroSlide({
        id: type + "-" + String(item.id),
        resourceType: type,
        resourceId: safeNumber(item.targetId),
        kicker: labelByResourceType(type, safeText(item.contentTypeLabel)),
        title: safeText(item.title),
        subtitle: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackSummaryByResourceType(type),
        coverUrl: safeText(item.coverUrl),
        actionText: actionTextByResourceType(type)
      });
    };
    const findSection = (sections, codeKeywords, nameKeywords) => {
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const code = safeText(section.categoryCode).toLowerCase();
        const name = safeText(section.categoryName);
        for (let j = 0; j < codeKeywords.length; j++) {
          if (code.indexOf(codeKeywords[j]) >= 0) {
            return section;
          }
        }
        for (let k = 0; k < nameKeywords.length; k++) {
          if (name.indexOf(nameKeywords[k]) >= 0) {
            return section;
          }
        }
      }
      return null;
    };
    const collectSectionItems = (sections) => {
      const items = [];
      for (let i = 0; i < sections.length; i++) {
        const sectionItems = sections[i].items != null ? sections[i].items : [];
        for (let j = 0; j < sectionItems.length; j++) {
          items.push(sectionItems[j]);
        }
      }
      return items;
    };
    const filterItemsByResourceType = (items, resourceType) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        if (normalizeResourceType(items[i].contentType) == resourceType) {
          result.push(items[i]);
        }
      }
      return result;
    };
    const filterRecommendItems = (items) => {
      const result = [];
      for (let i = 0; i < items.length; i++) {
        const type = normalizeResourceType(items[i].contentType);
        if (type == "AUDIO" || type == "LIVE" || type == "COURSE" || type == "ARTICLE") {
          result.push(items[i]);
        }
      }
      return result;
    };
    const loadHomeData = () => {
      utils_auth.fetchAppHome((data) => {
        const sections = data.sections != null ? data.sections : [];
        const recommendSection = findSection(sections, ["recommend", "home_recommend", "index_recommend"], ["首页推荐", "推荐"]);
        const topicSection = findSection(sections, ["topic", "hot_topic", "popular_topic"], ["热门专题", "专题"]);
        const allItems = collectSectionItems(sections);
        const matchedRecommendSource = recommendSection != null && recommendSection.items != null ? recommendSection.items : [];
        const matchedTopicSource = topicSection != null && topicSection.items != null ? topicSection.items : [];
        const fallbackRecommendSource = filterRecommendItems(allItems);
        const fallbackTopicSource = filterItemsByResourceType(allItems, "TOPIC");
        const recommendSource = matchedRecommendSource.length > 0 ? matchedRecommendSource : fallbackRecommendSource;
        const topicSource = matchedTopicSource.length > 0 ? matchedTopicSource : fallbackTopicSource;
        const heroSource = recommendSource.length > 0 ? recommendSource : allItems;
        recommendItems.value = recommendSource.slice(0, 3).map((item) => {
          return mapRecommendItem(item);
        });
        topicItems.value = topicSource.slice(0, 6).map((item) => {
          return mapTopicItem(item);
        });
        heroSlides.value = heroSource.slice(0, 5).map((item) => {
          return mapHeroSlide(item);
        });
      }, () => {
        recommendItems.value = [];
        topicItems.value = [];
        heroSlides.value = [];
      });
    };
    const goHeroDetail = (item) => {
      if (item.resourceType == "TOPIC") {
        goTopicDetail(item.resourceId);
        return null;
      }
      if (item.resourceType == "AUDIO") {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "LIVE") {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "COURSE") {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "ARTICLE") {
        goArticleDetail(item.resourceId);
        return null;
      }
      if (item.resourceType == "BOOK") {
        goBookDetail(item.resourceId);
        return null;
      }
      if (item.resourceType == "TOPIC") {
        goTopicDetail(item.resourceId);
      }
    };
    const goRecommendDetail = (item) => {
      if (item.resourceType == "AUDIO") {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "LIVE") {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "COURSE") {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (item.resourceType == "ARTICLE") {
        goArticleDetail(item.resourceId);
        return null;
      }
      if (item.resourceType == "BOOK") {
        goBookDetail(item.resourceId);
        return null;
      }
      if (item.resourceType == "TOPIC") {
        goTopicDetail(item.resourceId);
      }
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
    const goTopicsPage = () => {
      redirectToPage("/pages/topics/list");
    };
    const goTopicDetail = (id) => {
      common_vendor.index.setStorageSync(TOPIC_DETAIL_ID_KEY, String(id));
      common_vendor.index.navigateTo({ url: "/pages/topics/detail?id=" + String(id) });
    };
    const goHomeTopicDetail = (item) => {
      const id = item.resourceId > 0 ? item.resourceId : item.id;
      goTopicDetail(id);
    };
    const goArticleDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + String(id) });
    };
    const goBookDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/book/detail?id=" + String(id) });
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
    const goCoursePage = () => {
      redirectToPage("/pages/course/index");
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
    loadHomeData();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.t(audioTabText),
        e: common_vendor.o(goAudioPage),
        f: common_vendor.t(courseTabText),
        g: common_vendor.o(goCoursePage),
        h: common_vendor.t(liveTabText),
        i: common_vendor.o(goLivePage),
        j: common_vendor.t(bookTabText),
        k: common_vendor.o(goBookPage),
        l: common_vendor.t(topicTabText),
        m: common_vendor.o(goTopicsPage),
        n: common_vendor.t(newsTabText),
        o: common_vendor.o(goNewsPage),
        p: heroSlides.value.length > 0
      }, heroSlides.value.length > 0 ? {
        q: common_vendor.f(heroSlides.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.kicker),
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.subtitle),
            d: common_vendor.t(item.actionText),
            e: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            f: item.coverUrl
          } : {
            g: common_vendor.t(item.kicker)
          }, {
            h: common_vendor.o(($event) => {
              return goHeroDetail(item);
            }, item.id),
            i: item.id
          });
        })
      } : {
        r: common_vendor.t(heroKickerText),
        s: common_vendor.t(heroTitleText),
        t: common_vendor.t(heroSubtitleText),
        v: common_vendor.t(heroActionText),
        w: common_vendor.t(topicTabText),
        x: common_vendor.o(goTopicsPage)
      }, {
        y: common_vendor.t(homeRecommendTitle),
        z: recommendItems.value.length > 0
      }, recommendItems.value.length > 0 ? {
        A: common_vendor.f(recommendItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.typeLabel)
          }, {
            d: common_vendor.t(item.typeLabel),
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.summary),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goRecommendDetail(item);
            }, item.id)
          });
        })
      } : {
        B: common_vendor.t(emptyRecommendText)
      }, {
        C: common_vendor.t(recommendTopicTitle),
        D: common_vendor.t(moreText),
        E: common_vendor.o(goTopicsPage),
        F: topicItems.value.length > 0
      }, topicItems.value.length > 0 ? {
        G: common_vendor.f(topicItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(topicTabText)
          }, {
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.summary),
            f: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            g: common_vendor.t(item.viewCount),
            h: common_vendor.t(item.favoriteCount),
            i: item.id,
            j: common_vendor.o(($event) => {
              return goHomeTopicDetail(item);
            }, item.id)
          });
        }),
        H: common_vendor.t(viewText),
        I: common_vendor.t(favoriteText)
      } : {
        J: common_vendor.t(emptyTopicText)
      }, {
        K: common_assets._imports_1$2,
        L: common_vendor.t(learningTabText),
        M: common_assets._imports_2$1,
        N: common_vendor.t(examTabText),
        O: common_vendor.o(goExamPage),
        P: common_assets._imports_4,
        Q: common_vendor.t(consultTabText),
        R: common_vendor.o(goConsultPage),
        S: common_assets._imports_5,
        T: common_vendor.t(knowledgeTabText),
        U: common_vendor.o(goKnowledgePage),
        V: common_assets._imports_6$1,
        W: common_vendor.t(mineTabText),
        X: common_vendor.o(goMinePage),
        Y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
