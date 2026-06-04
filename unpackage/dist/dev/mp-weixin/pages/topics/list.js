"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class TopicListItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false }
        };
      },
      name: "TopicListItem"
    };
  }
  constructor(options, metadata = TopicListItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.favoriteCount = this.__props__.favoriteCount;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const appTitleText = "江苏中医在线";
const homeTabText = "首页";
const pageTitleText = "专题";
const audioTabText = "音频";
const liveTabText = "直播";
const courseTabText = "课程";
const newsTabText = "资讯";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const searchPlaceholder = "搜索专题标题";
const searchText = "搜索";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无专题";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "专题加载失败";
const viewText = "浏览";
const favoriteText = "收藏";
const fallbackSummaryText = "暂无专题简介";
const fallbackRequirementText = "暂无学习要求";
const TOPIC_DETAIL_ID_KEY = "topic_detail_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "list",
  setup(__props) {
    const keyword = common_vendor.ref("");
    const topicItems = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const mapTopic = (item) => {
      return new TopicListItem({
        id: item.id,
        title: safeText(item.title),
        summary: safeText(item.summary).length > 0 ? safeText(item.summary) : fallbackSummaryText,
        learningRequirements: safeText(item.learningRequirements).length > 0 ? safeText(item.learningRequirements) : fallbackRequirementText,
        coverUrl: safeText(item.coverUrl),
        tags: item.tags != null ? item.tags.slice(0, 3) : [],
        viewCount: item.viewCount,
        favoriteCount: item.favoriteCount
      });
    };
    const loadTopics = (loadMoreValue) => {
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
      utils_auth.fetchTopicCards(page.value, PAGE_SIZE, keyword.value, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const mapped = records.map((item) => {
          return mapTopic(item);
        });
        if (loadMoreValue) {
          topicItems.value = topicItems.value.concat(mapped);
        } else {
          topicItems.value = mapped;
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
      loadTopics(false);
    };
    const loadMore = () => {
      loadTopics(true);
    };
    const goDetail = (id) => {
      common_vendor.index.setStorageSync(TOPIC_DETAIL_ID_KEY, String(id));
      common_vendor.index.navigateTo({ url: "/pages/topics/detail?id=" + String(id) });
    };
    const goHomePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
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
    const goExamPage = () => {
      common_vendor.index.switchTab({ url: "/pages/exam/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.switchTab({ url: "/pages/consult/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.switchTab({ url: "/pages/knowledge/index" });
    };
    const goMinePage = () => {
      common_vendor.index.switchTab({ url: "/pages/mine/index" });
    };
    loadTopics(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(appTitleText),
        c: common_vendor.t(homeTabText),
        d: common_vendor.o(goHomePage),
        e: common_vendor.t(pageTitleText),
        f: common_vendor.t(audioTabText),
        g: common_vendor.o(goAudioPage),
        h: common_vendor.t(liveTabText),
        i: common_vendor.o(goLivePage),
        j: common_vendor.t(courseTabText),
        k: common_vendor.o(goCoursePage),
        l: common_vendor.t(newsTabText),
        m: common_vendor.o(goNewsPage),
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
      } : topicItems.value.length == 0 ? {
        B: common_vendor.t(emptyText)
      } : common_vendor.e({
        C: common_vendor.f(topicItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(pageTitleText)
          }, {
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.summary),
            f: common_vendor.t(item.learningRequirements),
            g: common_vendor.f(item.tags, (tag, k1, i1) => {
              return {
                a: common_vendor.t(tag),
                b: tag
              };
            }),
            h: common_vendor.t(item.viewCount),
            i: common_vendor.t(item.favoriteCount),
            j: item.id,
            k: common_vendor.o(($event) => {
              return goDetail(item.id);
            }, item.id)
          });
        }),
        D: common_vendor.t(viewText),
        E: common_vendor.t(favoriteText),
        F: isListLoading.value
      }, isListLoading.value ? {
        G: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        I: common_vendor.t(noMoreText)
      } : {}, {
        H: !hasMore.value
      }), {
        w: errorText.value.length > 0,
        A: topicItems.value.length == 0,
        J: common_vendor.o(loadMore),
        K: common_assets._imports_1$3,
        L: common_vendor.t(learningTabText),
        M: common_assets._imports_2,
        N: common_vendor.t(examTabText),
        O: common_vendor.o(goExamPage),
        P: common_assets._imports_3,
        Q: common_vendor.t(consultTabText),
        R: common_vendor.o(goConsultPage),
        S: common_assets._imports_4,
        T: common_vendor.t(knowledgeTabText),
        U: common_vendor.o(goKnowledgePage),
        V: common_assets._imports_5,
        W: common_vendor.t(mineTabText),
        X: common_vendor.o(goMinePage),
        Y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/topics/list.js.map
