"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const pageTitleText = "中医知识答题";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "试卷暂无题目";
const loadFailedText = "试卷加载失败";
const remainTimeText = "剩余时间";
const questionCountText = "共";
const questionUnitText = "题";
const durationTitleText = "限时";
const minuteText = "分钟";
const fillPlaceholderText = "请输入你的答案";
const prevText = "上一题";
const nextText = "下一题";
const submitText = "提交答卷";
const submitConfirmText = "确认提交当前试卷吗？";
const submitFailedText = "提交试卷失败";
const EXAM_PAPER_ID_KEY = "exam_paper_id";
const EXAM_PAPER_TITLE_KEY = "exam_paper_title";
const EXAM_RECORD_ID_KEY = "exam_record_id";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paper",
  setup(__props) {
    const paperId = common_vendor.ref("");
    const paperTitle = common_vendor.ref("");
    const durationMinutes = common_vendor.ref(10);
    const questions = common_vendor.ref([]);
    const currentQuestionIndex = common_vendor.ref(0);
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const remainingSeconds = common_vendor.ref(0);
    const answers = common_vendor.ref({});
    const storageKey = common_vendor.ref("");
    let timer = -1;
    let lastLoadedPaperId = "";
    let routePaperId = "";
    let routePaperTitle = "";
    const currentQuestion = common_vendor.computed(() => {
      return questions.value[currentQuestionIndex.value];
    });
    const currentQuestionTypeLabel = common_vendor.computed(() => {
      const typeValue = currentQuestion.value.questionType;
      if (typeValue == "SINGLE_CHOICE") {
        return "单选题";
      }
      if (typeValue == "MULTIPLE_CHOICE") {
        return "多选题";
      }
      if (typeValue == "TRUE_FALSE") {
        return "判断题";
      }
      return "简答题";
    });
    const isChoiceQuestion = common_vendor.computed(() => {
      const typeValue = currentQuestion.value.questionType;
      return typeValue == "SINGLE_CHOICE" || typeValue == "MULTIPLE_CHOICE" || typeValue == "TRUE_FALSE";
    });
    const fillAnswerText = common_vendor.computed({
      get() {
        const questionKey = String(currentQuestion.value.questionId);
        const value = answers.value[questionKey];
        return value == null ? "" : value;
      },
      set(value) {
        const questionKey = String(currentQuestion.value.questionId);
        answers.value[questionKey] = value;
        saveDraft();
      }
    });
    const timeDisplay = common_vendor.computed(() => {
      const minutes = Math.floor(remainingSeconds.value / 60);
      const seconds = remainingSeconds.value % 60;
      const mm = minutes < 10 ? "0" + String(minutes) : String(minutes);
      const ss = seconds < 10 ? "0" + String(seconds) : String(seconds);
      return mm + ":" + ss;
    });
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const resetRuntimeState = () => {
      stopTimer();
      questions.value = [];
      currentQuestionIndex.value = 0;
      remainingSeconds.value = 0;
      answers.value = {};
      lastLoadedPaperId = "";
    };
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
    const resolvePaperContext = () => {
      const pageRouteId = routePaperId.length > 0 ? routePaperId : readPageOption("id");
      const pagePaperId = routePaperId.length > 0 ? routePaperId : readPageOption("paperId");
      const cachedPaperId = readCachedText(EXAM_PAPER_ID_KEY);
      const nextPaperId = pageRouteId.length > 0 ? pageRouteId : pagePaperId.length > 0 ? pagePaperId : cachedPaperId;
      if (nextPaperId.length > 0) {
        paperId.value = nextPaperId;
        storageKey.value = "exam_temp_" + nextPaperId;
        common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, nextPaperId);
      } else {
        paperId.value = "";
        storageKey.value = "";
      }
      const optionTitle = routePaperTitle.length > 0 ? routePaperTitle : readPageOption("title");
      const decodedTitle = optionTitle.length > 0 ? decodeURIComponent(optionTitle) : "";
      const cachedTitle = readCachedText(EXAM_PAPER_TITLE_KEY);
      const nextTitle = decodedTitle.length > 0 ? decodedTitle : cachedTitle;
      if (nextTitle.length > 0) {
        paperTitle.value = nextTitle;
        common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, nextTitle);
      } else {
        paperTitle.value = "";
      }
    };
    const restoreDraft = () => {
      if (storageKey.value.length == 0) {
        return null;
      }
      const draft = common_vendor.index.getStorageSync(storageKey.value);
      if (draft == null) {
        return null;
      }
      if (typeof draft == "object") {
        const raw = draft;
        const answerRaw = raw["answers"];
        if (answerRaw != null && typeof answerRaw == "object") {
          answers.value = answerRaw;
        }
        const remainRaw = raw["remainingSeconds"];
        if (typeof remainRaw == "number") {
          const remainValue = remainRaw;
          if (remainValue > 0) {
            remainingSeconds.value = remainValue;
          }
        }
        const indexRaw = raw["currentQuestionIndex"];
        if (typeof indexRaw == "number") {
          currentQuestionIndex.value = indexRaw;
        }
      }
    };
    const saveDraft = () => {
      if (storageKey.value.length == 0) {
        return null;
      }
      const draft = new UTSJSONObject({
        answers: answers.value,
        remainingSeconds: remainingSeconds.value,
        currentQuestionIndex: currentQuestionIndex.value
      });
      common_vendor.index.setStorageSync(storageKey.value, draft);
    };
    const clearDraft = () => {
      if (storageKey.value.length == 0) {
        return null;
      }
      common_vendor.index.removeStorageSync(storageKey.value);
    };
    const startTimer = () => {
      if (timer != -1) {
        clearInterval(timer);
      }
      timer = setInterval(() => {
        if (remainingSeconds.value <= 0) {
          submitPaper(true);
          return null;
        }
        remainingSeconds.value -= 1;
        saveDraft();
      }, 1e3);
    };
    const stopTimer = () => {
      if (timer != -1) {
        clearInterval(timer);
        timer = -1;
      }
    };
    const loadPaper = () => {
      resolvePaperContext();
      if (paperId.value.length == 0) {
        resetRuntimeState();
        errorText.value = "缺少试卷ID";
        isLoading.value = false;
        return null;
      }
      if (lastLoadedPaperId == paperId.value && questions.value.length > 0 && errorText.value.length == 0) {
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchExamPaperDetail(paperId.value, (paper) => {
        lastLoadedPaperId = paperId.value;
        common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, paperId.value);
        paperTitle.value = safeText(paper.paperName).length > 0 ? paper.paperName : paperTitle.value;
        if (paperTitle.value.length > 0) {
          common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, paperTitle.value);
        }
        durationMinutes.value = paper.durationMinutes > 0 ? paper.durationMinutes : 10;
        questions.value = paper.questions != null ? paper.questions.slice().sort((left, right) => {
          return left.sortOrder - right.sortOrder;
        }) : [];
        remainingSeconds.value = durationMinutes.value * 60;
        restoreDraft();
        if (currentQuestionIndex.value >= questions.value.length) {
          currentQuestionIndex.value = 0;
        }
        isLoading.value = false;
        startTimer();
      }, (message) => {
        lastLoadedPaperId = "";
        errorText.value = message.length > 0 ? message : loadFailedText;
        questions.value = [];
        isLoading.value = false;
      });
    };
    const isOptionSelected = (optionKey) => {
      const questionKey = String(currentQuestion.value.questionId);
      const saved = answers.value[questionKey];
      if (saved == null || saved.length == 0) {
        return false;
      }
      if (currentQuestion.value.questionType == "MULTIPLE_CHOICE") {
        return saved.split(",").includes(optionKey);
      }
      return saved == optionKey;
    };
    const selectOption = (optionKey) => {
      const questionKey = String(currentQuestion.value.questionId);
      if (currentQuestion.value.questionType == "MULTIPLE_CHOICE") {
        const saved = answers.value[questionKey];
        let selected = saved == null || saved.length == 0 ? [] : saved.split(",");
        if (selected.includes(optionKey)) {
          selected = selected.filter((item) => {
            return item != optionKey;
          });
        } else {
          selected.push(optionKey);
        }
        selected.sort();
        answers.value[questionKey] = selected.join(",");
      } else {
        answers.value[questionKey] = optionKey;
      }
      saveDraft();
    };
    const prevQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value -= 1;
        saveDraft();
      }
    };
    const nextOrSubmit = () => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value += 1;
        saveDraft();
        return null;
      }
      submitPaper(false);
    };
    const buildSubmitRequest = () => {
      const answerItems = questions.value.map((question) => {
        const questionKey = String(question.questionId);
        return {
          questionId: question.questionId,
          answerContent: answers.value[questionKey] != null ? answers.value[questionKey] : ""
        };
      });
      return new utils_auth.ExamSubmitRequest({
        sourceType: "exam",
        sourceId: 0,
        answers: answerItems
      });
    };
    const submitPaper = (autoSubmit) => {
      stopTimer();
      if (!autoSubmit) {
        common_vendor.index.showModal(new UTSJSONObject({
          title: "",
          content: submitConfirmText,
          success: (res) => {
            if (res.confirm) {
              doSubmit();
              return null;
            }
            startTimer();
          }
        }));
        return null;
      }
      doSubmit();
    };
    const doSubmit = () => {
      utils_auth.submitExamPaper(paperId.value, buildSubmitRequest(), (record) => {
        clearDraft();
        common_vendor.index.setStorageSync(EXAM_PAPER_ID_KEY, paperId.value);
        common_vendor.index.setStorageSync(EXAM_PAPER_TITLE_KEY, paperTitle.value);
        common_vendor.index.setStorageSync(EXAM_RECORD_ID_KEY, String(record.id));
        common_vendor.index.navigateTo({
          url: "/pages/exam/result?recordId=" + String(record.id) + "&paperId=" + encodeURIComponent(paperId.value) + "&title=" + encodeURIComponent(paperTitle.value)
        });
      }, (message) => {
        common_vendor.index.showToast({
          title: message.length > 0 ? message : submitFailedText,
          icon: "none"
        });
        startTimer();
      });
    };
    const goBack = () => {
      stopTimer();
      saveDraft();
      common_vendor.index.navigateBack();
    };
    common_vendor.onLoad((options = null) => {
      if (options == null) {
        return null;
      }
      const rawId = options["id"];
      if (typeof rawId == "string" && rawId.length > 0) {
        routePaperId = rawId;
      }
      const rawPaperId = options["paperId"];
      if (routePaperId.length == 0 && typeof rawPaperId == "string" && rawPaperId.length > 0) {
        routePaperId = rawPaperId;
      }
      const rawTitle = options["title"];
      if (typeof rawTitle == "string" && rawTitle.length > 0) {
        routePaperTitle = rawTitle;
      }
      resolvePaperContext();
    });
    common_vendor.onShow(() => {
      loadPaper();
    });
    common_vendor.onUnmounted(() => {
      stopTimer();
      saveDraft();
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
        i: common_vendor.o(loadPaper)
      } : questions.value.length == 0 ? {
        k: common_vendor.t(emptyText)
      } : common_vendor.e({
        l: common_vendor.t(paperTitle.value),
        m: common_vendor.t(remainTimeText),
        n: common_vendor.t(timeDisplay.value),
        o: common_vendor.t(questionCountText),
        p: common_vendor.t(questions.value.length),
        q: common_vendor.t(questionUnitText),
        r: common_vendor.t(durationTitleText),
        s: common_vendor.t(durationMinutes.value),
        t: common_vendor.t(minuteText),
        v: common_vendor.t(currentQuestionIndex.value + 1),
        w: common_vendor.t(questions.value.length),
        x: common_vendor.t(currentQuestionTypeLabel.value),
        y: common_vendor.t(currentQuestion.value.title),
        z: isChoiceQuestion.value
      }, isChoiceQuestion.value ? {
        A: common_vendor.f(currentQuestion.value.options, (option, k0, i0) => {
          return {
            a: common_vendor.t(option.optionKey),
            b: common_vendor.t(option.optionContent),
            c: option.optionKey,
            d: common_vendor.n(isOptionSelected(option.optionKey) ? "option-card-active" : ""),
            e: common_vendor.o(($event) => {
              return selectOption(option.optionKey);
            }, option.optionKey)
          };
        })
      } : {
        B: fillPlaceholderText,
        C: fillAnswerText.value,
        D: common_vendor.o(($event) => {
          return fillAnswerText.value = $event.detail.value;
        })
      }), {
        f: errorText.value.length > 0,
        j: questions.value.length == 0,
        E: !isLoading.value && errorText.value.length == 0 && questions.value.length > 0
      }, !isLoading.value && errorText.value.length == 0 && questions.value.length > 0 ? {
        F: common_vendor.t(prevText),
        G: common_vendor.o(prevQuestion),
        H: common_vendor.t(currentQuestionIndex.value == questions.value.length - 1 ? submitText : nextText),
        I: common_vendor.o(nextOrSubmit)
      } : {}, {
        J: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/paper.js.map
