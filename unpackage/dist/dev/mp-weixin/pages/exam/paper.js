"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class ExamOption extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          text: { type: String, optional: false }
        };
      },
      name: "ExamOption"
    };
  }
  constructor(options, metadata = ExamOption.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.text = this.__props__.text;
    delete this.__props__;
  }
}
class ExamQuestion extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          type: { type: String, optional: false },
          typeLabel: { type: String, optional: false },
          title: { type: String, optional: false },
          options: { type: UTS.UTSType.withGenerics(Array, [ExamOption]), optional: false },
          correctAnswer: { type: String, optional: false }
        };
      },
      name: "ExamQuestion"
    };
  }
  constructor(options, metadata = ExamQuestion.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.type = this.__props__.type;
    this.typeLabel = this.__props__.typeLabel;
    this.title = this.__props__.title;
    this.options = this.__props__.options;
    this.correctAnswer = this.__props__.correctAnswer;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "paper",
  setup(__props) {
    const currentPages = getCurrentPages();
    let pageTitle = "实用中医方药学模拟练习卷";
    if (currentPages.length > 0) {
      const currentPage = currentPages[currentPages.length - 1];
      const options = currentPage.options;
      if (options != null && options["title"] != null) {
        pageTitle = decodeURIComponent(options["title"]);
      }
    }
    const paperTitle = common_vendor.ref(pageTitle);
    const remainSeconds = common_vendor.ref(597);
    const currentQuestionIndex = common_vendor.ref(0);
    let timer = -1;
    const questions = common_vendor.ref([
      new ExamQuestion({
        id: "q1",
        type: "single",
        typeLabel: "单选题",
        title: "辛凉解表药中薄荷的归经是",
        options: [
          new ExamOption({ key: "A", text: "肺、肝经" }),
          new ExamOption({ key: "B", text: "脾、胃经" }),
          new ExamOption({ key: "C", text: "肺、大肠经" }),
          new ExamOption({ key: "D", text: "心、肝经" })
        ],
        correctAnswer: "A"
      }),
      new ExamQuestion({
        id: "q2",
        type: "multiple",
        typeLabel: "多选题",
        title: "下列属于中医基础理论学习重点的是",
        options: [
          new ExamOption({ key: "A", text: "阴阳学说" }),
          new ExamOption({ key: "B", text: "五行学说" }),
          new ExamOption({ key: "C", text: "藏象学说" }),
          new ExamOption({ key: "D", text: "计算机网络" })
        ],
        correctAnswer: "A,B,C"
      }),
      new ExamQuestion({
        id: "q3",
        type: "blank",
        typeLabel: "填空题",
        title: "请填写一条中医知识点占位内容。",
        options: [],
        correctAnswer: "中医基础理论"
      })
    ]);
    const answers = common_vendor.ref({});
    const currentQuestion = common_vendor.computed(() => {
      return questions.value[currentQuestionIndex.value];
    });
    const timeDisplay = common_vendor.computed(() => {
      const minutes = Math.floor(remainSeconds.value / 60);
      const seconds = remainSeconds.value % 60;
      const mm = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
      const ss = seconds < 10 ? "0" + seconds.toString() : seconds.toString();
      return mm + ":" + ss;
    });
    const selectedSingle = common_vendor.computed(() => {
      const value = answers.value[currentQuestion.value.id];
      return value == null ? "" : value;
    });
    const fillAnswer = common_vendor.computed({
      get() {
        const value = answers.value[currentQuestion.value.id];
        return value == null ? "" : value;
      },
      set(value) {
        answers.value[currentQuestion.value.id] = value;
      }
    });
    const selectSingle = (key) => {
      answers.value[currentQuestion.value.id] = key;
    };
    const isMultipleSelected = (key) => {
      const value = answers.value[currentQuestion.value.id];
      if (value == null || value.length == 0) {
        return false;
      }
      return value.split(",").includes(key);
    };
    const toggleMultiple = (key) => {
      const value = answers.value[currentQuestion.value.id];
      let selected = value == null || value.length == 0 ? [] : value.split(",");
      if (selected.includes(key)) {
        selected = selected.filter((item) => {
          return item != key;
        });
      } else {
        selected.push(key);
      }
      selected.sort();
      answers.value[currentQuestion.value.id] = selected.join(",");
    };
    const prevQuestion = () => {
      if (currentQuestionIndex.value > 0) {
        currentQuestionIndex.value -= 1;
      }
    };
    const nextOrSubmit = () => {
      if (currentQuestionIndex.value < questions.value.length - 1) {
        currentQuestionIndex.value += 1;
        return null;
      }
      submitPaper();
    };
    const submitPaper = () => {
      if (timer != -1) {
        clearInterval(timer);
        timer = -1;
      }
      let correctCount = 0;
      questions.value.forEach((question) => {
        const answer = answers.value[question.id];
        if (answer != null && answer == question.correctAnswer) {
          correctCount += 1;
        }
      });
      common_vendor.index.redirectTo({
        url: "/pages/exam/result?total=" + questions.value.length.toString() + "&correct=" + correctCount.toString()
      });
    };
    const goBack = () => {
      if (timer != -1) {
        clearInterval(timer);
        timer = -1;
      }
      common_vendor.index.navigateBack();
    };
    common_vendor.onMounted(() => {
      timer = setInterval(() => {
        if (remainSeconds.value <= 0) {
          submitPaper();
          return null;
        }
        remainSeconds.value -= 1;
      }, 1e3);
    });
    common_vendor.onUnmounted(() => {
      if (timer != -1) {
        clearInterval(timer);
        timer = -1;
      }
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(common_vendor.unref(paperTitle)),
        d: common_vendor.t(common_vendor.unref(timeDisplay)),
        e: common_vendor.t(common_vendor.unref(currentQuestionIndex) + 1),
        f: common_vendor.t(common_vendor.unref(currentQuestion).typeLabel),
        g: common_vendor.t(common_vendor.unref(currentQuestion).title),
        h: common_vendor.unref(currentQuestion).type == "single"
      }, common_vendor.unref(currentQuestion).type == "single" ? {
        i: common_vendor.f(common_vendor.unref(currentQuestion).options, (option, k0, i0) => {
          return {
            a: common_vendor.t(option.key),
            b: common_vendor.t(option.text),
            c: option.key,
            d: common_vendor.unref(selectedSingle) == option.key ? 1 : "",
            e: common_vendor.o(($event) => {
              return selectSingle(option.key);
            }, option.key)
          };
        })
      } : common_vendor.unref(currentQuestion).type == "multiple" ? {
        k: common_vendor.f(common_vendor.unref(currentQuestion).options, (option, k0, i0) => {
          return {
            a: common_vendor.t(option.key),
            b: common_vendor.t(option.text),
            c: option.key,
            d: isMultipleSelected(option.key) ? 1 : "",
            e: common_vendor.o(($event) => {
              return toggleMultiple(option.key);
            }, option.key)
          };
        })
      } : {
        l: common_vendor.unref(fillAnswer),
        m: common_vendor.o(($event) => {
          return common_vendor.isRef(fillAnswer) ? fillAnswer.value = $event.detail.value : null;
        })
      }, {
        j: common_vendor.unref(currentQuestion).type == "multiple",
        n: common_vendor.o(prevQuestion),
        o: common_vendor.t(common_vendor.unref(currentQuestionIndex) == common_vendor.unref(questions).length - 1 ? "提交答卷" : "下一题"),
        p: common_vendor.o(nextOrSubmit),
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/paper.js.map
