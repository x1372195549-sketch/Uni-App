"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const KNOWLEDGE_DETAIL_ID_KEY = "knowledge_detail_id";
class CategoryDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          displayName: { type: String, optional: false }
        };
      },
      name: "CategoryDisplayItem"
    };
  }
  constructor(options, metadata = CategoryDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.displayName = this.__props__.displayName;
    delete this.__props__;
  }
}
class KnowledgeDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          author: { type: String, optional: false },
          categoryName: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          viewCount: { type: String, optional: false },
          publishedAt: { type: String, optional: false },
          shortTitle: { type: String, optional: false }
        };
      },
      name: "KnowledgeDisplayItem"
    };
  }
  constructor(options, metadata = KnowledgeDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.author = this.__props__.author;
    this.categoryName = this.__props__.categoryName;
    this.coverUrl = this.__props__.coverUrl;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.shortTitle = this.__props__.shortTitle;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const selectedCategoryId = common_vendor.ref(0);
    const flatCategories = common_vendor.ref([]);
    const knowledgeList = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isInitialLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const isRefreshing = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const coverLoadingIds = common_vendor.ref([]);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function toShortTitle(value) {
      const title = safeText(value);
      if (title.length == 0) {
        return "知识";
      }
      if (title.length <= 4) {
        return title;
      }
      return title.substring(0, 4);
    }
    function flattenCategories(items, level, result) {
      items.forEach((item) => {
        const indent = level > 0 ? "· ".repeat(level) : "";
        result.push(new CategoryDisplayItem({
          id: item.id,
          displayName: indent + safeText(item.categoryName)
        }));
        if (item.children != null && item.children.length > 0) {
          flattenCategories(item.children, level + 1, result);
        }
      });
    }
    function mapKnowledgeItem(item) {
      return new KnowledgeDisplayItem({
        id: item.id,
        title: safeText(item.title),
        summary: safeText(item.summary),
        author: safeText(item.author),
        categoryName: safeText(item.categoryName),
        coverUrl: safeText(item.coverUrl),
        viewCount: String(item.viewCount != null ? item.viewCount : 0),
        publishedAt: safeText(item.publishedAt).replace("T", " "),
        shortTitle: toShortTitle(item.title)
      });
    }
    function hasCoverLoading(id) {
      return coverLoadingIds.value.indexOf(id) >= 0;
    }
    function updateKnowledgeCover(id, coverUrl) {
      const normalizedCover = safeText(coverUrl);
      if (normalizedCover.length == 0) {
        return null;
      }
      knowledgeList.value = knowledgeList.value.map((item) => {
        if (item.id == id) {
          return new KnowledgeDisplayItem({
            id: item.id,
            title: item.title,
            summary: item.summary,
            author: item.author,
            categoryName: item.categoryName,
            coverUrl: normalizedCover,
            viewCount: item.viewCount,
            publishedAt: item.publishedAt,
            shortTitle: item.shortTitle
          });
        }
        return item;
      });
    }
    function markCoverLoaded(id) {
      coverLoadingIds.value = coverLoadingIds.value.filter((itemId) => {
        return itemId != id;
      });
    }
    function hydrateMissingCovers(items) {
      items.forEach((item) => {
        if (item.coverUrl.length > 0 || hasCoverLoading(item.id)) {
          return null;
        }
        coverLoadingIds.value = coverLoadingIds.value.concat([item.id]);
        utils_auth.fetchKnowledgeEntryDetail(String(item.id), (detail) => {
          updateKnowledgeCover(item.id, detail.coverUrl);
          markCoverLoaded(item.id);
        }, () => {
          markCoverLoaded(item.id);
        });
      });
    }
    function loadCategories() {
      utils_auth.fetchKnowledgeCategoryTree((categories) => {
        const nextItems = new Array();
        flattenCategories(categories, 0, nextItems);
        flatCategories.value = nextItems;
        loadKnowledgeList(false);
      }, (message) => {
        errorText.value = message.length > 0 ? message : "分类加载失败";
        isInitialLoading.value = false;
        isRefreshing.value = false;
      });
    }
    function loadKnowledgeList(loadMore2) {
      if (!loadMore2) {
        page.value = 1;
        hasMore.value = true;
        if (!isRefreshing.value) {
          isInitialLoading.value = true;
        }
        errorText.value = "";
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchKnowledgeEntries(page.value, PAGE_SIZE, searchKeyword.value, selectedCategoryId.value, (pageData) => {
        const mapped = pageData.records != null ? pageData.records.map((item) => {
          return mapKnowledgeItem(item);
        }) : [];
        if (loadMore2) {
          knowledgeList.value = knowledgeList.value.concat(mapped);
        } else {
          knowledgeList.value = mapped;
        }
        hydrateMissingCovers(mapped);
        hasMore.value = mapped.length >= PAGE_SIZE;
        if (hasMore.value) {
          page.value += 1;
        }
        isInitialLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : "内容加载失败";
        isInitialLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      });
    }
    function loadInitialData() {
      loadCategories();
    }
    function selectCategory(id) {
      if (selectedCategoryId.value == id) {
        return null;
      }
      selectedCategoryId.value = id;
      loadKnowledgeList(false);
    }
    function handleSearch() {
      loadKnowledgeList(false);
    }
    function handleRefresh() {
      isRefreshing.value = true;
      loadKnowledgeList(false);
    }
    function loadMore() {
      loadKnowledgeList(true);
    }
    function goKnowledgeDetail(item) {
      common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, String(item.id));
      common_vendor.index.navigateTo({
        url: "/pages/knowledge/detail?id=" + String(item.id)
      });
    }
    function goLearningPage() {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    }
    function goExamPage() {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    }
    function goMinePage() {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    }
    function goConsultPage() {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    }
    loadInitialData();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.o(handleSearch),
        c: searchKeyword.value,
        d: common_vendor.o(($event) => {
          return searchKeyword.value = $event.detail.value;
        }),
        e: common_vendor.o(handleSearch),
        f: selectedCategoryId.value == 0
      }, selectedCategoryId.value == 0 ? {} : {}, {
        g: selectedCategoryId.value == 0 ? 1 : "",
        h: selectedCategoryId.value == 0 ? 1 : "",
        i: common_vendor.o(($event) => {
          return selectCategory(0);
        }),
        j: common_vendor.f(flatCategories.value, (item, k0, i0) => {
          return common_vendor.e({
            a: selectedCategoryId.value == item.id
          }, selectedCategoryId.value == item.id ? {} : {}, {
            b: common_vendor.t(item.displayName),
            c: selectedCategoryId.value == item.id ? 1 : "",
            d: item.id,
            e: selectedCategoryId.value == item.id ? 1 : "",
            f: common_vendor.o(($event) => {
              return selectCategory(item.id);
            }, item.id)
          });
        }),
        k: isInitialLoading.value
      }, isInitialLoading.value ? {} : errorText.value.length > 0 ? {
        m: common_vendor.t(errorText.value),
        n: common_vendor.o(loadInitialData)
      } : knowledgeList.value.length == 0 ? {} : common_vendor.e({
        p: common_vendor.f(knowledgeList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {}, {
            c: common_vendor.t(item.title),
            d: item.summary.length > 0
          }, item.summary.length > 0 ? {
            e: common_vendor.t(item.summary)
          } : {}, {
            f: item.author.length > 0
          }, item.author.length > 0 ? {
            g: common_vendor.t(item.author)
          } : item.categoryName.length > 0 ? {
            i: common_vendor.t(item.categoryName)
          } : {}, {
            h: item.categoryName.length > 0,
            j: common_vendor.t(item.viewCount),
            k: item.publishedAt.length > 0
          }, item.publishedAt.length > 0 ? {
            l: common_vendor.t(item.publishedAt)
          } : {}, {
            m: item.id,
            n: common_vendor.o(($event) => {
              return goKnowledgeDetail(item);
            }, item.id)
          });
        }),
        q: isListLoading.value
      }, isListLoading.value ? {} : !hasMore.value ? {} : {}, {
        r: !hasMore.value
      }), {
        l: errorText.value.length > 0,
        o: knowledgeList.value.length == 0,
        s: isRefreshing.value,
        t: common_vendor.o(handleRefresh),
        v: common_vendor.o(loadMore),
        w: common_assets._imports_2,
        x: common_vendor.o(goLearningPage),
        y: common_assets._imports_2$1,
        z: common_vendor.o(goExamPage),
        A: common_assets._imports_4,
        B: common_vendor.o(goConsultPage),
        C: common_assets._imports_4$1,
        D: common_assets._imports_6$1,
        E: common_vendor.o(goMinePage),
        F: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/index.js.map
