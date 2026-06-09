"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const pageTitleText = "答题结果";
const loadingText = "加载中...";
const retryText = "重新加载";
const loadFailedText = "考核结果加载失败";
const scoreText = "得分:";
const correctCountText = "答对";
const questionUnitText = "题";
const passedText = "已及格";
const notPassedText = "未及格";
const correctText = "正确";
const wrongText = "错误";
const myAnswerText = "我的答案:";
const correctAnswerText = "正确答案:";
const analysisText = "解析:";
const emptyAnswerText = "未作答";
const backListText = "返回列表";
const retryExamText = "再练一次";
const EXAM_RECORD_ID_KEY = "exam_record_id";
const EXAM_PAPER_ID_KEY = "exam_paper_id";
const EXAM_PAPER_TITLE_KEY = "exam_paper_title";
const DEFAULT_QUESTION_SCORE = 5;
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "result",
  setup(__props) {
    const recordId = common_vendor.ref("");
    const paperId = common_vendor.ref("");
    const paperName = common_vendor.ref("");
    const score = common_vendor.ref(0);
    const totalScore = common_vendor.ref(0);
    const correctCount = common_vendor.ref(0);
    const passed = common_vendor.ref(false);
    const answerItems = common_vendor.ref([]);
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    let lastLoadedRecordId = "";
    let routeRecordId = "";
    let routePaperId = "";
    let routePaperTitle = "";
    const readPageOption = (key) => {
      const pages = getCurrentPages();
      if (pages.length == 0) {
        return "";
      }
      const currentPage = pages[pages.length - 1];
      if (currentPage == null || currentPage.options == null) {
        return "";
      }
      const options = currentPage.options;
      const rawValue = options[key];
      return typeof rawValue == "string" ? rawValue : "";
    };
    const readCachedText = (key) => {
      const value = common_vendor.index.getStorageSync(key);
      return typeof value == "string" ? value : "";
    };
    const computeFallbackTotalScore = (items) => {
      if (items.length == 0) {
        return 0;
      }
      return items.length * DEFAULT_QUESTION_SCORE;
    };
    const computeFallbackScore = (items) => {
      if (items.length == 0) {
        return 0;
      }
      const correctItems = items.filter((item) => {
        return item.correct == 1;
      });
      if (correctItems.length == 0) {
        return 0;
      }
      const summedScore = correctItems.reduce((total, item) => {
        return total + (item.score > 0 ? item.score : 0);
      }, 0);
      if (summedScore > 0) {
        return summedScore;
      }
      return correctItems.length * DEFAULT_QUESTION_SCORE;
    };
    const resolveResultContext = () => {
      const optionRecordId = routeRecordId.length > 0 ? routeRecordId : readPageOption("recordId");
      const optionId = routeRecordId.length > 0 ? "" : readPageOption("id");
      const cachedRecordId = readCachedText(EXAM_RECORD_ID_KEY);
      const nextRecordId = optionRecordId.length > 0 ? optionRecordId : optionId.length > 0 ? optionId : cachedRecordId;
      if (nextRecordId.length > 0) {
        recordId.value = nextRecordId;
        common_vendor.index.setStorageSync(EXAM_RECORD_ID_KEY, nextRecordId);
      } else {
        recordId.value = "";
      }
      const cachedPaperId = readCachedText(EXAM_PAPER_ID_KEY);
      const nextPaperId = routePaperId.length > 0 ? routePaperId : cachedPaperId;
      if (nextPaperId.length > 0) {
        paperId.value = nextPaperId;
        common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, nextPaperId);
      }
      const optionTitle = routePaperTitle.length > 0 ? routePaperTitle : readPageOption("title");
      const decodedTitle = optionTitle.length > 0 ? decodeURIComponent(optionTitle) : "";
      const cachedPaperTitle = readCachedText(EXAM_PAPER_TITLE_KEY);
      const nextTitle = decodedTitle.length > 0 ? decodedTitle : cachedPaperTitle;
      if (nextTitle.length > 0) {
        paperName.value = nextTitle;
        common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, nextTitle);
      }
    };
    const loadResult = () => {
      resolveResultContext();
      if (recordId.value.length == 0) {
        errorText.value = "缺少考试记录ID";
        isLoading.value = false;
        return null;
      }
      if (lastLoadedRecordId == recordId.value && answerItems.value.length > 0 && errorText.value.length == 0) {
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchExamRecordDetail(recordId.value, (record) => {
        lastLoadedRecordId = recordId.value;
        paperId.value = String(record.paperId);
        paperName.value = record.paperName;
        if (paperId.value.length > 0) {
          common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, paperId.value);
        }
        if (paperName.value.length > 0) {
          common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, paperName.value);
        }
        answerItems.value = record.answers != null ? record.answers : [];
        score.value = record.score > 0 ? Math.min(record.score, computeFallbackTotalScore(answerItems.value)) : computeFallbackScore(answerItems.value);
        totalScore.value = record.totalScore > 0 ? record.totalScore : computeFallbackTotalScore(answerItems.value);
        correctCount.value = answerItems.value.filter((item) => {
          return item.correct == 1;
        }).length;
        passed.value = score.value >= record.passScore && record.passScore > 0 ? true : record.passed == 1;
        isLoading.value = false;
      }, (message) => {
        lastLoadedRecordId = "";
        errorText.value = message.length > 0 ? message : loadFailedText;
        isLoading.value = false;
      });
    };
    const goExamHome = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const retryExam = () => {
      resolveResultContext();
      if (paperId.value.length == 0) {
        const cachedPaperId = common_vendor.index.getStorageSync(EXAM_PAPER_ID_KEY);
        if (typeof cachedPaperId == "string" && cachedPaperId.length > 0) {
          paperId.value = cachedPaperId;
        }
      }
      if (paperName.value.length == 0) {
        const cachedPaperTitle = common_vendor.index.getStorageSync(EXAM_PAPER_TITLE_KEY);
        if (typeof cachedPaperTitle == "string" && cachedPaperTitle.length > 0) {
          paperName.value = cachedPaperTitle;
        }
      }
      if (paperId.value.length == 0) {
        goExamHome();
        return null;
      }
      common_vendor.index.redirectTo({
        url: "/pages/exam/paper?id=" + paperId.value + "&title=" + encodeURIComponent(paperName.value)
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad((options = null) => {
      if (options == null) {
        return null;
      }
      const rawRecordId = options["recordId"];
      if (typeof rawRecordId == "string" && rawRecordId.length > 0) {
        routeRecordId = rawRecordId;
      }
      const rawId = options["id"];
      if (routeRecordId.length == 0 && typeof rawId == "string" && rawId.length > 0) {
        routeRecordId = rawId;
      }
      const rawPaperId = options["paperId"];
      if (typeof rawPaperId == "string" && rawPaperId.length > 0) {
        routePaperId = rawPaperId;
      }
      const rawTitle = options["title"];
      if (typeof rawTitle == "string" && rawTitle.length > 0) {
        routePaperTitle = rawTitle;
      }
      resolveResultContext();
    });
    common_vendor.onShow(() => {
      loadResult();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(pageTitleText),
        d: isLoading.value
      }, isLoading.value ? {
        e: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        g: common_vendor.t(errorText.value),
        h: common_vendor.t(retryText),
        i: common_vendor.o(loadResult)
      } : {
        j: common_vendor.t(paperName.value),
        k: common_vendor.t(scoreText),
        l: common_vendor.t(score.value),
        m: common_vendor.t(totalScore.value),
        n: common_vendor.t(correctCountText),
        o: common_vendor.t(correctCount.value),
        p: common_vendor.t(questionUnitText),
        q: common_vendor.t(passed.value ? passedText : notPassedText),
        r: common_vendor.f(answerItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.correct == 1 ? correctText : wrongText),
            c: common_vendor.n(item.correct == 1 ? "answer-status-correct" : "answer-status-wrong"),
            d: common_vendor.t(item.answerContent.length > 0 ? item.answerContent : emptyAnswerText),
            e: common_vendor.t(item.correctAnswer),
            f: item.analysis.length > 0
          }, item.analysis.length > 0 ? {
            g: common_vendor.t(analysisText),
            h: common_vendor.t(item.analysis)
          } : {}, {
            i: item.questionId
          });
        }),
        s: common_vendor.t(myAnswerText),
        t: common_vendor.t(correctAnswerText),
        v: common_vendor.t(backListText),
        w: common_vendor.o(goExamHome),
        x: common_vendor.t(retryExamText),
        y: common_vendor.o(retryExam)
      }, {
        f: errorText.value.length > 0,
        z: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/result.js.map
