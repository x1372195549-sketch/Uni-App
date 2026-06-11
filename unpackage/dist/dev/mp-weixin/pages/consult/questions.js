"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class QuestionDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          idText: { type: String, optional: false },
          title: { type: String, optional: false },
          content: { type: String, optional: false },
          statusLabel: { type: String, optional: false },
          statusClass: { type: String, optional: false },
          answerPreview: { type: String, optional: false }
        };
      },
      name: "QuestionDisplayItem"
    };
  }
  constructor(options, metadata = QuestionDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.idText = this.__props__.idText;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    this.statusLabel = this.__props__.statusLabel;
    this.statusClass = this.__props__.statusClass;
    this.answerPreview = this.__props__.answerPreview;
    delete this.__props__;
  }
}
const PAGE_SIZE = 10;
const questionStorageKey = "consult_current_question_id";
const pageTitleText = "我的咨询";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyText = "暂无咨询记录";
const goConsultText = "去咨询";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const failedText = "咨询记录加载失败";
const untitledText = "未命名咨询";
const emptyContentText = "暂无问题描述";
const questionIdLabel = "咨询ID：";
const latestReplyText = "最新回复：";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "questions",
  setup(__props) {
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const isRefreshing = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const hasMore = common_vendor.ref(true);
    const page = common_vendor.ref(1);
    const questionItems = common_vendor.ref([]);
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const mapStatusClass = (status) => {
      if (status == "ANSWERED") {
        return "status-answered";
      }
      if (status == "CLOSED") {
        return "status-closed";
      }
      return "status-pending";
    };
    const saveCurrentQuestionId = (id) => {
      common_vendor.index.setStorageSync(questionStorageKey, String(id));
    };
    const mapQuestion = (item) => {
      const firstAnswer = item.answers != null && item.answers.length > 0 ? item.answers[0] : null;
      const titleValue = safeText(item.title);
      const contentValue = safeText(item.content);
      const statusLabelValue = safeText(item.statusLabel).length > 0 ? safeText(item.statusLabel) : safeText(item.status);
      return new QuestionDisplayItem({
        id: item.id,
        idText: item.id > 0 ? String(item.id) : "--",
        title: titleValue.length > 0 ? titleValue : untitledText,
        content: contentValue.length > 0 ? contentValue : emptyContentText,
        statusLabel: statusLabelValue.length > 0 ? statusLabelValue : "--",
        statusClass: mapStatusClass(safeText(item.status)),
        answerPreview: firstAnswer != null ? safeText(firstAnswer.content) : ""
      });
    };
    const loadQuestions = (loadMoreValue) => {
      if (!loadMoreValue) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        isLoading.value = !isRefreshing.value;
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchQaQuestions(page.value, PAGE_SIZE, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const mapped = records.map((item) => {
          return mapQuestion(item);
        });
        if (loadMoreValue) {
          questionItems.value = questionItems.value.concat(mapped);
        } else {
          questionItems.value = mapped;
        }
        hasMore.value = records.length >= PAGE_SIZE;
        if (hasMore.value) {
          page.value += 1;
        }
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : failedText;
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      });
    };
    const reloadQuestions = () => {
      loadQuestions(false);
    };
    const refreshQuestions = () => {
      if (isRefreshing.value) {
        return null;
      }
      isRefreshing.value = true;
      loadQuestions(false);
    };
    const goBack = () => {
      common_vendor.index.redirectTo({
        url: "/pages/consult/index",
        fail: () => {
          common_vendor.index.navigateTo({
            url: "/pages/consult/index",
            fail: () => {
              common_vendor.index.reLaunch({ url: "/pages/consult/index" });
            }
          });
        }
      });
    };
    const goConsultHome = () => {
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    const loadMore = () => {
      loadQuestions(true);
    };
    const goDetail = (id) => {
      if (id <= 0) {
        common_vendor.index.showToast({
          title: "未能读取咨询ID",
          icon: "none"
        });
        return null;
      }
      saveCurrentQuestionId(id);
      common_vendor.index.navigateTo({
        url: "/pages/consult/question-detail?id=" + String(id)
      });
    };
    loadQuestions(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_assets._imports_0$1,
        c: common_vendor.o(goBack),
        d: common_vendor.t(pageTitleText),
        e: isLoading.value
      }, isLoading.value ? {
        f: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        h: common_vendor.t(errorText.value),
        i: common_vendor.t(retryText),
        j: common_vendor.o(reloadQuestions)
      } : questionItems.value.length == 0 ? {
        l: common_vendor.t(emptyText),
        m: common_vendor.t(goConsultText),
        n: common_vendor.o(goConsultHome)
      } : common_vendor.e({
        o: common_vendor.f(questionItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.statusLabel),
            c: common_vendor.n(item.statusClass),
            d: common_vendor.t(item.idText),
            e: common_vendor.t(item.content),
            f: item.answerPreview.length > 0
          }, item.answerPreview.length > 0 ? {
            g: common_vendor.t(latestReplyText),
            h: common_vendor.t(item.answerPreview)
          } : {}, {
            i: item.id,
            j: common_vendor.o(($event) => {
              return goDetail(item.id);
            }, item.id)
          });
        }),
        p: common_vendor.t(questionIdLabel),
        q: isListLoading.value
      }, isListLoading.value ? {
        r: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        t: common_vendor.t(noMoreText)
      } : {}, {
        s: !hasMore.value
      }), {
        g: errorText.value.length > 0,
        k: questionItems.value.length == 0,
        v: isRefreshing.value,
        w: common_vendor.o(refreshQuestions),
        x: common_vendor.o(loadMore),
        y: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/questions.js.map
