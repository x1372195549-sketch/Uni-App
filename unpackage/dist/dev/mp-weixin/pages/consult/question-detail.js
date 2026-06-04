"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class AnswerDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          content: { type: String, optional: false },
          answeredAt: { type: String, optional: false }
        };
      },
      name: "AnswerDisplayItem"
    };
  }
  constructor(options, metadata = AnswerDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.content = this.__props__.content;
    this.answeredAt = this.__props__.answeredAt;
    delete this.__props__;
  }
}
const questionStorageKey = "consult_current_question_id";
const pageTitleText = "咨询详情";
const loadingText = "加载中...";
const retryText = "重新加载";
const answerSectionText = "专家回复";
const emptyAnswerText = "专家尚未回复，请耐心等待";
const missingIdText = "缺少咨询ID";
const failedText = "咨询详情加载失败";
const untitledText = "未命名咨询";
const emptyContentText = "暂无问题描述";
const questionIdLabel = "咨询ID：";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "question-detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const isLoading = common_vendor.ref(true);
    const errorText = common_vendor.ref("");
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const statusLabel = common_vendor.ref("");
    const statusClass = common_vendor.ref("status-pending");
    const answerItems = common_vendor.ref([]);
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
      if (id.length > 0) {
        common_vendor.index.setStorageSync(questionStorageKey, id);
      }
    };
    const loadParams = () => {
      const currentPages = getCurrentPages();
      if (currentPages.length > 0) {
        const currentPage = currentPages[currentPages.length - 1];
        if (currentPage.options != null) {
          const options = currentPage.options;
          const routeId = options["id"];
          if (routeId != null) {
            detailId.value = String(routeId);
          }
        }
      }
      if (detailId.value.length == 0) {
        const stored = common_vendor.index.getStorageSync(questionStorageKey);
        if (stored != null && String(stored).length > 0) {
          detailId.value = String(stored);
        }
      }
      saveCurrentQuestionId(detailId.value);
    };
    const applyDetail = (detail) => {
      const titleValue = safeText(detail.title);
      const contentValue = safeText(detail.content);
      const statusLabelValue = safeText(detail.statusLabel).length > 0 ? safeText(detail.statusLabel) : safeText(detail.status);
      title.value = titleValue.length > 0 ? titleValue : untitledText;
      content.value = contentValue.length > 0 ? contentValue : emptyContentText;
      statusLabel.value = statusLabelValue.length > 0 ? statusLabelValue : "--";
      statusClass.value = mapStatusClass(safeText(detail.status));
      answerItems.value = detail.answers != null ? detail.answers.map((item) => {
        return new AnswerDisplayItem({
          id: item.id,
          content: safeText(item.content),
          answeredAt: safeText(item.answeredAt).replace("T", " ")
        });
      }) : [];
    };
    const loadDetail = () => {
      loadParams();
      if (detailId.value.length == 0) {
        errorText.value = missingIdText;
        isLoading.value = false;
        return null;
      }
      isLoading.value = true;
      errorText.value = "";
      utils_auth.fetchQaQuestionDetail(detailId.value, (detail) => {
        applyDetail(detail);
        isLoading.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : failedText;
        isLoading.value = false;
      });
    };
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack(new UTSJSONObject({ delta: 1 }));
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/consult/questions" });
    };
    loadDetail();
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
        j: common_vendor.o(loadDetail)
      } : common_vendor.e({
        k: common_vendor.t(title.value),
        l: common_vendor.t(statusLabel.value),
        m: common_vendor.n(statusClass.value),
        n: common_vendor.t(questionIdLabel),
        o: common_vendor.t(detailId.value),
        p: common_vendor.t(content.value),
        q: common_vendor.t(answerSectionText),
        r: answerItems.value.length == 0
      }, answerItems.value.length == 0 ? {
        s: common_vendor.t(emptyAnswerText)
      } : {
        t: common_vendor.f(answerItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.t(item.answeredAt),
            c: item.id
          };
        })
      }), {
        g: errorText.value.length > 0,
        v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/question-detail.js.map
