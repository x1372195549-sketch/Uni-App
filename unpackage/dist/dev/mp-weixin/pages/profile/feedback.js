"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const pageTitle = "意见反馈";
const typeLabel = "反馈类型";
const contentLabel = "反馈内容";
const contactLabel = "联系方式";
const requiredMark = "*";
const submitText = "提交反馈";
const submittingText = "提交中...";
const contentPlaceholder = "请详细描述您的问题或建议";
const contactPlaceholder = "手机号或微信号（选填）";
const emptyContentText = "请填写反馈内容";
const successText = "提交成功";
const failedText = "提交失败，请稍后重试";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "feedback",
  setup(__props) {
    const typeOptions = ["功能建议", "体验问题", "其他"];
    const submitting = common_vendor.ref(false);
    const form = common_vendor.ref(new utils_auth.AppFeedbackRequest({
      feedbackType: typeOptions[0],
      content: "",
      contact: ""
    }));
    const handleBack = () => {
      common_vendor.index.navigateBack(new UTSJSONObject({
        fail: () => {
          common_vendor.index.redirectTo({
            url: "/pages/mine/index"
          });
        }
      }));
    };
    const handleTypeChange = (event) => {
      const rawValue = event.detail.value;
      const index = Number(rawValue);
      if (index >= 0 && index < typeOptions.length) {
        form.value.feedbackType = typeOptions[index];
      }
    };
    const validate = () => {
      const content = form.value.content.trim();
      if (content.length == 0) {
        common_vendor.index.showToast({
          title: emptyContentText,
          icon: "none"
        });
        return false;
      }
      if (content.length > 500) {
        common_vendor.index.showToast({
          title: emptyContentText,
          icon: "none"
        });
        return false;
      }
      return true;
    };
    const resetForm = () => {
      form.value = {
        feedbackType: typeOptions[0],
        content: "",
        contact: ""
      };
    };
    const handleSubmit = () => {
      if (submitting.value || !validate()) {
        return null;
      }
      submitting.value = true;
      const requestData = new utils_auth.AppFeedbackRequest({
        feedbackType: form.value.feedbackType,
        content: form.value.content.trim(),
        contact: form.value.contact.trim()
      });
      utils_auth.submitFeedback(requestData, () => {
        submitting.value = false;
        resetForm();
        common_vendor.index.showToast({
          title: successText,
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack(new UTSJSONObject({
            fail: () => {
              common_vendor.index.redirectTo({
                url: "/pages/mine/index"
              });
            }
          }));
        }, 1500);
      }, (message) => {
        submitting.value = false;
        common_vendor.index.showToast({
          title: message.length > 0 ? message : failedText,
          icon: "none"
        });
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.t(pageTitle),
        d: common_vendor.t(typeLabel),
        e: common_vendor.t(form.value.feedbackType),
        f: typeOptions,
        g: common_vendor.o(handleTypeChange),
        h: common_vendor.t(contentLabel),
        i: common_vendor.t(requiredMark),
        j: contentPlaceholder,
        k: form.value.content,
        l: common_vendor.o(($event) => {
          return form.value.content = $event.detail.value;
        }),
        m: common_vendor.t(form.value.content.length),
        n: common_vendor.t(contactLabel),
        o: contactPlaceholder,
        p: form.value.contact,
        q: common_vendor.o(($event) => {
          return form.value.contact = $event.detail.value;
        }),
        r: common_vendor.t(submitting.value ? submittingText : submitText),
        s: submitting.value,
        t: common_vendor.o(handleSubmit),
        v: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/feedback.js.map
