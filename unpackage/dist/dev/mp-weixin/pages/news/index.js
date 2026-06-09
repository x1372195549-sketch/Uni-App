"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class ArticleCard extends UTS.UTSType {
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
          publishedAt: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false }
        };
      },
      name: "ArticleCard"
    };
  }
  constructor(options, metadata = ArticleCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.source = this.__props__.source;
    this.publishedAt = this.__props__.publishedAt;
    this.viewCount = this.__props__.viewCount;
    this.tags = this.__props__.tags;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
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
const searchPlaceholder = "搜索标题、来源或摘要";
const searchText = "搜索";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无资讯";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "资讯加载失败";
const viewText = "浏览";
const fallbackSummaryText = "暂无摘要";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const articleItems = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
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
    const mapArticle = (item) => {
      return new ArticleCard({
        id: item.id,
        title: safeText(item.title),
        summary: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackSummaryText,
        coverUrl: safeText(item.coverUrl),
        source: safeText(item.source),
        publishedAt: formatDate(item.publishedAt),
        viewCount: item.viewCount,
        tags: item.tags != null ? item.tags.slice(0, 2) : []
      });
    };
    const loadArticles = (loadMoreValue) => {
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
      utils_auth.fetchArticles(page.value, PAGE_SIZE, keyword.value, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const mapped = records.map((item) => {
          return mapArticle(item);
        });
        if (loadMoreValue) {
          articleItems.value = articleItems.value.concat(mapped);
        } else {
          articleItems.value = mapped;
        }
        hasMore.value = mapped.length >= PAGE_SIZE;
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
      loadArticles(false);
    };
    const loadMore = () => {
      loadArticles(true);
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goTopicsPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
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
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const goNewsDetail = (id) => {
      common_vendor.index.setStorageSync("article_detail_id", String(id));
      common_vendor.index.navigateTo({ url: "/pages/news/detail?id=" + String(id) });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    loadArticles(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.o(goLearningPage),
        e: common_vendor.t(topicTabText),
        f: common_vendor.o(goTopicsPage),
        g: common_vendor.t(audioTabText),
        h: common_vendor.o(goAudioPage),
        i: common_vendor.t(liveTabText),
        j: common_vendor.o(goLivePage),
        k: common_vendor.t(courseTabText),
        l: common_vendor.o(goCoursePage),
        m: common_vendor.t(newsTabText),
        n: searchPlaceholder,
        o: common_vendor.o(reloadList),
        p: keyword.value,
        q: common_vendor.o(($event) => {
          return keyword.value = $event.detail.value;
        }),
        r: common_vendor.t(searchText),
        s: common_vendor.o(reloadList),
        t: isLoading.value
      }, isLoading.value ? {
        v: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        x: common_vendor.t(errorText.value),
        y: common_vendor.t(retryText),
        z: common_vendor.o(reloadList)
      } : articleItems.value.length == 0 ? {
        B: common_vendor.t(emptyText)
      } : common_vendor.e({
        C: common_vendor.f(articleItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {}, {
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.summary),
            e: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            f: common_vendor.t(item.source),
            g: common_vendor.t(item.publishedAt),
            h: common_vendor.t(item.viewCount),
            i: item.id,
            j: common_vendor.o(($event) => {
              return goNewsDetail(item.id);
            }, item.id)
          });
        }),
        D: common_vendor.t(viewText),
        E: isListLoading.value
      }, isListLoading.value ? {
        F: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        H: common_vendor.t(noMoreText)
      } : {}, {
        G: !hasMore.value
      }), {
        w: errorText.value.length > 0,
        A: articleItems.value.length == 0,
        I: common_vendor.o(loadMore),
        J: common_assets._imports_1$2,
        K: common_vendor.t(learningTabText),
        L: common_assets._imports_2$1,
        M: common_vendor.t(examTabText),
        N: common_vendor.o(goExamPage),
        O: common_assets._imports_4,
        P: common_vendor.t(consultTabText),
        Q: common_vendor.o(goConsultPage),
        R: common_assets._imports_5,
        S: common_vendor.t(knowledgeTabText),
        T: common_vendor.o(goKnowledgePage),
        U: common_assets._imports_6$1,
        V: common_vendor.t(mineTabText),
        W: common_vendor.o(goMinePage),
        X: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/news/index.js.map
