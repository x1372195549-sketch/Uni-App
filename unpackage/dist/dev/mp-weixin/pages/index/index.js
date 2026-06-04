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
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.favoriteCount = this.__props__.favoriteCount;
    delete this.__props__;
  }
}
class HomeArticleCard extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          source: { type: String, optional: false },
          publishedAt: { type: String, optional: false }
        };
      },
      name: "HomeArticleCard"
    };
  }
  constructor(options, metadata = HomeArticleCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.source = this.__props__.source;
    this.publishedAt = this.__props__.publishedAt;
    delete this.__props__;
  }
}
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const topicTabText = "专题";
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
const recommendTopicTitle = "热门专题";
const recommendNewsTitle = "最新资讯";
const moreText = "更多";
const viewText = "浏览";
const favoriteText = "收藏";
const fallbackTopicSummary = "更适合按主题化学习的内容组合。";
const fallbackArticleSummary = "暂无摘要";
const TOPIC_DETAIL_ID_KEY = "topic_detail_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const topicItems = common_vendor.ref([]);
    const articleItems = common_vendor.ref([]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const formatDate = (value) => {
      const text = safeText(value);
      if (text.length == 0) {
        return "";
      }
      return text.replace("T", " ").substring(0, 16);
    };
    const mapTopic = (item) => {
      return new HomeTopicCard({
        id: item.id,
        title: safeText(item.title),
        summary: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackTopicSummary,
        coverUrl: safeText(item.coverUrl),
        tags: item.tags != null ? item.tags.slice(0, 2) : [],
        viewCount: item.viewCount,
        favoriteCount: item.favoriteCount
      });
    };
    const mapArticle = (item) => {
      return new HomeArticleCard({
        id: item.id,
        title: safeText(item.title),
        summary: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackArticleSummary,
        coverUrl: safeText(item.coverUrl),
        source: safeText(item.source),
        publishedAt: formatDate(item.publishedAt)
      });
    };
    const loadHomeData = () => {
      utils_auth.fetchTopicCards(1, 6, "", (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        topicItems.value = records.map((item) => {
          return mapTopic(item);
        });
      }, () => {
        topicItems.value = [];
      });
      utils_auth.fetchArticles(1, 5, "", (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        articleItems.value = records.map((item) => {
          return mapArticle(item);
        });
      }, () => {
        articleItems.value = [];
      });
    };
    const goTopicsPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    };
    const goTopicDetail = (id) => {
      common_vendor.index.setStorageSync(TOPIC_DETAIL_ID_KEY, String(id));
      common_vendor.index.navigateTo({ url: "/pages/topics/detail?id=" + String(id) });
    };
    const goArticleDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + String(id) });
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
    loadHomeData();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.t(topicTabText),
        e: common_vendor.o(goTopicsPage),
        f: common_vendor.t(audioTabText),
        g: common_vendor.o(goAudioPage),
        h: common_vendor.t(liveTabText),
        i: common_vendor.o(goLivePage),
        j: common_vendor.t(courseTabText),
        k: common_vendor.o(goCoursePage),
        l: common_vendor.t(newsTabText),
        m: common_vendor.o(goNewsPage),
        n: common_vendor.t(heroKickerText),
        o: common_vendor.t(heroTitleText),
        p: common_vendor.t(heroSubtitleText),
        q: common_vendor.t(heroActionText),
        r: common_vendor.o(goTopicsPage),
        s: common_vendor.t(recommendTopicTitle),
        t: common_vendor.t(moreText),
        v: common_vendor.o(goTopicsPage),
        w: common_vendor.f(topicItems.value, (item, k0, i0) => {
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
              return goTopicDetail(item.id);
            }, item.id)
          });
        }),
        x: common_vendor.t(viewText),
        y: common_vendor.t(favoriteText),
        z: common_vendor.t(recommendNewsTitle),
        A: common_vendor.t(moreText),
        B: common_vendor.o(goNewsPage),
        C: common_vendor.f(articleItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {}, {
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.summary),
            e: common_vendor.t(item.source),
            f: common_vendor.t(item.publishedAt),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goArticleDetail(item.id);
            }, item.id)
          });
        }),
        D: common_assets._imports_1$3,
        E: common_vendor.t(learningTabText),
        F: common_assets._imports_2,
        G: common_vendor.t(examTabText),
        H: common_vendor.o(goExamPage),
        I: common_assets._imports_3,
        J: common_vendor.t(consultTabText),
        K: common_vendor.o(goConsultPage),
        L: common_assets._imports_4,
        M: common_vendor.t(knowledgeTabText),
        N: common_vendor.o(goKnowledgePage),
        O: common_assets._imports_5,
        P: common_vendor.t(mineTabText),
        Q: common_vendor.o(goMinePage),
        R: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
