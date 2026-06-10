"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class KnowledgeSection extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          index: { type: Number, optional: false },
          title: { type: String, optional: false },
          content: { type: String, optional: false },
          preview: { type: String, optional: false },
          pageText: { type: String, optional: false },
          isHtml: { type: Boolean, optional: false }
        };
      },
      name: "KnowledgeSection"
    };
  }
  constructor(options, metadata = KnowledgeSection.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.index = this.__props__.index;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    this.preview = this.__props__.preview;
    this.pageText = this.__props__.pageText;
    this.isHtml = this.__props__.isHtml;
    delete this.__props__;
  }
}
const KNOWLEDGE_DETAIL_ID_KEY = "knowledge_detail_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const title = common_vendor.ref("");
    const shortTitle = common_vendor.ref("知识");
    const coverUrl = common_vendor.ref("");
    const summary = common_vendor.ref("");
    const content = common_vendor.ref("");
    const categoryName = common_vendor.ref("");
    const keywords = common_vendor.ref("");
    const source = common_vendor.ref("");
    const publishedAt = common_vendor.ref("");
    const viewCount = common_vendor.ref("0");
    const sections = common_vendor.ref([]);
    const activeSectionIndex = common_vendor.ref(0);
    const activeTitle = common_vendor.ref("正文");
    const activeContent = common_vendor.ref("");
    const activeParagraphs = common_vendor.ref([]);
    const activeIsHtml = common_vendor.ref(false);
    const activePageText = common_vendor.ref("1");
    const showCatalog = common_vendor.ref(false);
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function buildShortTitle(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "知识";
      }
      return text.length <= 4 ? text : text.substring(0, 4);
    }
    function detectHtml(value) {
      const text = safeText(value).toLowerCase();
      return text.indexOf("<p") >= 0 || text.indexOf("<div") >= 0 || text.indexOf("<br") >= 0 || text.indexOf("<h1") >= 0 || text.indexOf("<h2") >= 0 || text.indexOf("<section") >= 0;
    }
    function normalizePlainText(value) {
      return safeText(value).split("\r").join("\n");
    }
    function buildParagraphs(value) {
      const lines = normalizePlainText(value).split("\n");
      const result = [];
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line.length > 0) {
          result.push(line);
        }
      }
      if (result.length == 0) {
        result.push("暂无内容");
      }
      return result;
    }
    function buildPreview(value) {
      const paragraphs = buildParagraphs(value);
      const first = paragraphs.length > 0 ? paragraphs[0] : "";
      if (first.length <= 22) {
        return first;
      }
      return first.substring(0, 22) + "...";
    }
    function addSection(items, sectionTitle, sectionContent, isHtml) {
      const text = safeText(sectionContent);
      if (text.length == 0) {
        return null;
      }
      const index = items.length;
      items.push(new KnowledgeSection({
        index,
        title: sectionTitle,
        content: text,
        preview: isHtml ? "" : buildPreview(text),
        pageText: String(index + 1),
        isHtml
      }));
    }
    function buildSupplementText() {
      let text = "";
      if (keywords.value.length > 0) {
        text = text + "关键词：" + keywords.value;
      }
      if (source.value.length > 0) {
        if (text.length > 0) {
          text = text + "\n";
        }
        text = text + "来源：" + source.value;
      }
      return text;
    }
    function rebuildSections() {
      const nextSections = [];
      addSection(nextSections, "前言", summary.value, false);
      addSection(nextSections, "正文", content.value, detectHtml(content.value));
      addSection(nextSections, "补充信息", buildSupplementText(), false);
      if (nextSections.length == 0) {
        addSection(nextSections, "正文", "暂无内容", false);
      }
      sections.value = nextSections;
      selectSection(0);
    }
    function selectSection(index) {
      if (index < 0 || index >= sections.value.length) {
        return null;
      }
      const item = sections.value[index];
      activeSectionIndex.value = index;
      activeTitle.value = item.title;
      activeContent.value = item.content;
      activeIsHtml.value = item.isHtml;
      activePageText.value = item.pageText;
      activeParagraphs.value = item.isHtml ? [] : buildParagraphs(item.content);
      showCatalog.value = false;
    }
    function toggleCatalog() {
      showCatalog.value = !showCatalog.value;
    }
    function goPreviousSection() {
      if (activeSectionIndex.value <= 0) {
        return null;
      }
      selectSection(activeSectionIndex.value - 1);
    }
    function goNextSection() {
      if (activeSectionIndex.value >= sections.value.length - 1) {
        return null;
      }
      selectSection(activeSectionIndex.value + 1);
    }
    function applyKnowledgeDetail(detail) {
      title.value = safeText(detail.title);
      shortTitle.value = buildShortTitle(detail.title);
      coverUrl.value = safeText(detail.coverUrl);
      summary.value = safeText(detail.summary);
      content.value = safeText(detail.content);
      categoryName.value = safeText(detail.categoryName);
      keywords.value = safeText(detail.keywords);
      source.value = safeText(detail.source);
      publishedAt.value = safeText(detail.publishedAt).replace("T", " ");
      viewCount.value = String(detail.viewCount != null ? detail.viewCount : 0);
      rebuildSections();
    }
    function loadParams(options = null) {
      if (options != null) {
        const idValue = options["id"];
        const entryIdValue = options["entryId"];
        const knowledgeIdValue = options["knowledgeId"];
        const contentIdValue = options["contentId"];
        if (typeof idValue == "string" && idValue.length > 0) {
          detailId.value = idValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof entryIdValue == "string" && entryIdValue.length > 0) {
          detailId.value = entryIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof knowledgeIdValue == "string" && knowledgeIdValue.length > 0) {
          detailId.value = knowledgeIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
        if (typeof contentIdValue == "string" && contentIdValue.length > 0) {
          detailId.value = contentIdValue;
          common_vendor.index.setStorageSync(KNOWLEDGE_DETAIL_ID_KEY, detailId.value);
          return null;
        }
      }
      const cachedId = common_vendor.index.getStorageSync(KNOWLEDGE_DETAIL_ID_KEY);
      if (typeof cachedId == "string" && cachedId.length > 0) {
        detailId.value = cachedId;
      }
    }
    function reportBrowse() {
      if (detailId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: "knowledge",
        resourceId: Number(detailId.value)
      }), () => {
      }, () => {
      });
    }
    function loadDetail() {
      if (detailId.value.length == 0) {
        errorText.value = "缺少知识条目 ID";
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchKnowledgeEntryDetail(detailId.value, (detail) => {
        applyKnowledgeDetail(detail);
        isLoading.value = false;
        reportBrowse();
      }, (message) => {
        errorText.value = message.length > 0 ? message : "详情加载失败";
        isLoading.value = false;
      });
    }
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    }
    common_vendor.onLoad((options = null) => {
      loadParams(options);
      loadDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$4,
        b: common_assets._imports_0$1,
        c: common_vendor.o(goBack),
        d: common_vendor.t(title.value.length > 0 ? title.value : "知识详情"),
        e: isLoading.value
      }, isLoading.value ? {} : errorText.value.length > 0 ? {
        g: common_vendor.t(errorText.value),
        h: common_vendor.o(loadDetail)
      } : common_vendor.e({
        i: showCatalog.value
      }, showCatalog.value ? common_vendor.e({
        j: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        k: coverUrl.value
      } : {
        l: common_vendor.t(shortTitle.value)
      }, {
        m: common_vendor.t(categoryName.value.length > 0 ? categoryName.value : "知识库"),
        n: common_vendor.t(String(sections.value.length)),
        o: common_vendor.t(title.value.length > 0 ? title.value : "知识条目"),
        p: publishedAt.value.length > 0
      }, publishedAt.value.length > 0 ? {
        q: common_vendor.t(publishedAt.value)
      } : {}, {
        r: common_vendor.t(viewCount.value),
        s: common_vendor.f(sections.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(String(item.index + 1)),
            b: common_vendor.t(item.title),
            c: common_vendor.t(item.pageText),
            d: item.preview.length > 0
          }, item.preview.length > 0 ? {
            e: common_vendor.t(item.preview)
          } : {}, {
            f: item.index,
            g: common_vendor.n(item.index == activeSectionIndex.value ? "catalog-item catalog-item-active" : "catalog-item"),
            h: common_vendor.o(($event) => {
              return selectSection(item.index);
            }, item.index)
          });
        })
      }) : common_vendor.e({
        t: common_vendor.t(categoryName.value.length > 0 ? categoryName.value : "知识库阅读"),
        v: common_vendor.t(activeTitle.value),
        w: common_vendor.t(activePageText.value),
        x: common_vendor.t(String(sections.value.length)),
        y: publishedAt.value.length > 0
      }, publishedAt.value.length > 0 ? {
        z: common_vendor.t(publishedAt.value)
      } : {}, {
        A: common_vendor.t(viewCount.value),
        B: activeIsHtml.value
      }, activeIsHtml.value ? {
        C: activeContent.value
      } : {
        D: common_vendor.f(activeParagraphs.value, (paragraph, k0, i0) => {
          return {
            a: common_vendor.t(paragraph),
            b: paragraph
          };
        })
      })), {
        f: errorText.value.length > 0,
        E: !isLoading.value && errorText.value.length == 0
      }, !isLoading.value && errorText.value.length == 0 ? {
        F: common_vendor.n(activeSectionIndex.value > 0 ? "bottom-action" : "bottom-action bottom-action-disabled"),
        G: common_vendor.o(goPreviousSection),
        H: common_vendor.t(showCatalog.value ? "正文" : "目录"),
        I: common_vendor.o(toggleCatalog),
        J: common_vendor.n(activeSectionIndex.value < sections.value.length - 1 ? "bottom-action" : "bottom-action bottom-action-disabled"),
        K: common_vendor.o(goNextSection)
      } : {}, {
        L: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/detail.js.map
