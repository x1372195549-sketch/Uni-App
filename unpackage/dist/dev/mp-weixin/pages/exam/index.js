"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const pageTitleText = "中医知识考核";
const bannerTitleLineOne = "中医";
const bannerTitleLineTwo = "知识考核";
const noteTextOne = "熟读相关知识点";
const noteTextTwo = "了解书本知识和考核的关系";
const noteTextThree = "第一时间获取知识点的运用";
const sourceLabelText = "来源:";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无可用试卷";
const loadFailedText = "考核试卷加载失败";
const questionText = "共";
const durationText = "题，限时";
const minuteText = "分钟";
const totalScoreText = "总分:";
const passScoreText = "及格分:";
const startExamText = "立即答题";
const learningTabText = "学习";
const examTabText = "考核";
const consultTabText = "咨询";
const knowledgeTabText = "知识库";
const mineTabText = "我的";
const EXAM_PAPER_ID_KEY = "exam_paper_id";
const EXAM_PAPER_TITLE_KEY = "exam_paper_title";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const papers = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const sourceName = common_vendor.ref("");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return null;
      }
      const currentPage = pages[pages.length - 1];
      if (currentPage == null || currentPage.options == null) {
        return null;
      }
      const options = currentPage.options;
      const sourceValue = options["sourceName"];
      if (typeof sourceValue == "string" && sourceValue.length > 0) {
        sourceName.value = decodeURIComponent(sourceValue);
      }
    };
    const loadPapers = () => {
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchExamPapers(1, 20, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        papers.value = records.filter((paper) => {
          return safeText(paper.status) == "" || safeText(paper.status) == "ENABLED";
        });
        isLoading.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        papers.value = [];
        isLoading.value = false;
      });
    };
    const goExamPaper = (paper) => {
      const paperIdText = String(paper.id);
      if (paperIdText.length == 0 || paperIdText == "undefined" || paperIdText == "null") {
        common_vendor.index.showToast({
          title: "缺少试卷 ID",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, paperIdText);
      common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, paper.paperName);
      common_vendor.index.navigateTo({
        url: "/pages/exam/paper?id=" + paperIdText + "&paperId=" + paperIdText + "&title=" + encodeURIComponent(paper.paperName)
      });
    };
    const goLearningHome = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    loadParams();
    loadPapers();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(pageTitleText),
        c: common_assets._imports_1$3,
        d: common_vendor.t(bannerTitleLineOne),
        e: common_vendor.t(bannerTitleLineTwo),
        f: common_vendor.t(noteTextOne),
        g: common_vendor.t(noteTextTwo),
        h: common_vendor.t(noteTextThree),
        i: sourceName.value.length > 0
      }, sourceName.value.length > 0 ? {
        j: common_vendor.t(sourceLabelText),
        k: common_vendor.t(sourceName.value)
      } : {}, {
        l: isLoading.value
      }, isLoading.value ? {
        m: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        o: common_vendor.t(errorText.value),
        p: common_vendor.t(retryText),
        q: common_vendor.o(loadPapers)
      } : papers.value.length == 0 ? {
        s: common_vendor.t(emptyText)
      } : {
        t: common_vendor.f(papers.value, (paper, k0, i0) => {
          return {
            a: common_vendor.t(paper.paperName),
            b: common_vendor.t(paper.description),
            c: common_vendor.t(paper.questionCount),
            d: common_vendor.t(paper.durationMinutes),
            e: common_vendor.t(paper.totalScore),
            f: common_vendor.t(paper.passScore),
            g: common_vendor.o(($event) => {
              return goExamPaper(paper);
            }, paper.id),
            h: paper.id
          };
        }),
        v: common_vendor.t(questionText),
        w: common_vendor.t(durationText),
        x: common_vendor.t(minuteText),
        y: common_vendor.t(totalScoreText),
        z: common_vendor.t(passScoreText),
        A: common_vendor.t(startExamText)
      }, {
        n: errorText.value.length > 0,
        r: papers.value.length == 0,
        B: common_assets._imports_2,
        C: common_vendor.t(learningTabText),
        D: common_vendor.o(goLearningHome),
        E: common_assets._imports_3$1,
        F: common_vendor.t(examTabText),
        G: common_assets._imports_4,
        H: common_vendor.t(consultTabText),
        I: common_vendor.o(goConsultPage),
        J: common_assets._imports_5,
        K: common_vendor.t(knowledgeTabText),
        L: common_vendor.o(goKnowledgePage),
        M: common_assets._imports_6$1,
        N: common_vendor.t(mineTabText),
        O: common_vendor.o(goMinePage),
        P: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/index.js.map
