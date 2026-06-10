"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const PAGE_SIZE = 10;
const KNOWLEDGE_DETAIL_ID_KEY = "knowledge_detail_id";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无内容";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "分区内容加载失败";
const viewText = "浏览";
const favoriteText = "收藏";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "section",
  setup(__props) {
    const topicId = common_vendor.ref("");
    const sectionType = common_vendor.ref("");
    const titleText = common_vendor.ref("分区内容");
    const resourceItems = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const normalizeResourceType = (value) => {
      const type = safeText(value).toLowerCase();
      if (type == "learning" || type == "book") {
        return "book";
      }
      if (type == "video" || type == "course") {
        return "course";
      }
      if (type == "audio" || type == "podcast") {
        return "podcast";
      }
      return type;
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const current = pages[pages.length - 1];
      if (current == null || current.options == null) {
        return null;
      }
      const options = current.options;
      const topicValue = options["topicId"];
      const sectionValue = options["sectionType"];
      const titleValue = options["title"];
      if (typeof topicValue == "string" && topicValue.length > 0) {
        topicId.value = topicValue;
      }
      if (typeof sectionValue == "string" && sectionValue.length > 0) {
        sectionType.value = decodeURIComponent(sectionValue);
      }
      if (typeof titleValue == "string" && titleValue.length > 0) {
        titleText.value = decodeURIComponent(titleValue);
      }
    };
    const loadResources = (loadMoreValue) => {
      if (topicId.value.length == 0 || sectionType.value.length == 0) {
        return null;
      }
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
      utils_auth.fetchTopicSectionResources(topicId.value, sectionType.value, page.value, PAGE_SIZE, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        if (loadMoreValue) {
          resourceItems.value = resourceItems.value.concat(records);
        } else {
          resourceItems.value = records;
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
      loadResources(false);
    };
    const loadMore = () => {
      loadResources(true);
    };
    const goResourceDetail = (item) => {
      const type = normalizeResourceType(item.resourceType);
      if (type == "book") {
        if (item.resourceId <= 0) {
          common_vendor.index.showToast({
            title: "缺少图书条目 ID",
            icon: "none"
          });
          return null;
        }
        common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, String(item.resourceId));
        common_vendor.index.navigateTo({ url: "/pages/book/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "course") {
        common_vendor.index.navigateTo({ url: "/pages/course/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "podcast") {
        common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + String(item.resourceId) });
        return null;
      }
      if (type == "live") {
        common_vendor.index.navigateTo({ url: "/pages/live/detail?id=" + String(item.resourceId) });
      }
    };
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack(new UTSJSONObject({ delta: 1 }));
        return null;
      }
      if (topicId.value.length > 0) {
        common_vendor.index.redirectTo({ url: "/pages/topics/detail?id=" + topicId.value });
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/topics/list" });
    };
    loadParams();
    loadResources(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(titleText.value),
        d: isLoading.value
      }, isLoading.value ? {
        e: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        g: common_vendor.t(errorText.value),
        h: common_vendor.t(retryText),
        i: common_vendor.o(reloadList)
      } : resourceItems.value.length == 0 ? {
        k: common_vendor.t(emptyText)
      } : common_vendor.e({
        l: common_vendor.f(resourceItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.coverUrl.length > 0
          }, item.coverUrl.length > 0 ? {
            b: item.coverUrl
          } : {
            c: common_vendor.t(item.resourceType)
          }, {
            d: common_vendor.t(item.title),
            e: common_vendor.t(item.subtitle.length > 0 ? item.subtitle : item.summary),
            f: common_vendor.t(item.browseCount),
            g: common_vendor.t(item.favoriteCount),
            h: item.resourceType + "-" + item.resourceId,
            i: common_vendor.o(($event) => {
              return goResourceDetail(item);
            }, item.resourceType + "-" + item.resourceId)
          });
        }),
        m: common_vendor.t(viewText),
        n: common_vendor.t(favoriteText),
        o: isListLoading.value
      }, isListLoading.value ? {
        p: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        r: common_vendor.t(noMoreText)
      } : {}, {
        q: !hasMore.value
      }), {
        f: errorText.value.length > 0,
        j: resourceItems.value.length == 0,
        s: common_vendor.o(loadMore),
        t: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/topics/section.js.map
