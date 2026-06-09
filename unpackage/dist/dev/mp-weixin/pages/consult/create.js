"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const expertStorageKey = "consult_current_expert";
const titleText = "发起咨询";
const consultTargetText = "咨询对象";
const subjectText = "标题";
const contentText = "内容";
const submitText = "提交咨询";
const submittingText = "提交中...";
const titlePlaceholder = "请概括你的问题（必填）";
const contentPlaceholder = "请详细描述你的疑问，专家将针对性解答（必填）";
const fallbackExpertText = "未选择专家";
const missingExpertText = "缺少专家信息";
const missingTitleText = "请输入标题";
const missingContentText = "请输入咨询内容";
const loadingText = "提交中...";
const successText = "提交成功，请等待专家回复";
const failedText = "提交失败，请稍后重试";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "create",
  setup(__props) {
    const expertId = common_vendor.ref("");
    const expertName = common_vendor.ref("");
    const title = common_vendor.ref("");
    const content = common_vendor.ref("");
    const isSubmitting = common_vendor.ref(false);
    const isGoingBack = common_vendor.ref(false);
    const displayExpertName = common_vendor.computed(() => {
      return expertName.value.length > 0 ? expertName.value : fallbackExpertText;
    });
    const fallbackBack = () => {
      if (expertId.value.length > 0) {
        let url = "/pages/consult/detail?id=" + expertId.value;
        if (expertName.value.length > 0) {
          url += "&name=" + encodeURIComponent(expertName.value);
        }
        common_vendor.index.redirectTo({ url });
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    const goBack = () => {
      if (isGoingBack.value) {
        return null;
      }
      isGoingBack.value = true;
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack(new UTSJSONObject({
          delta: 1,
          fail: () => {
            fallbackBack();
          },
          complete: () => {
            setTimeout(() => {
              isGoingBack.value = false;
            }, 300);
          }
        }));
        return null;
      }
      fallbackBack();
      setTimeout(() => {
        isGoingBack.value = false;
      }, 300);
    };
    const readStoredExpert = () => {
      const stored = common_vendor.index.getStorageSync(expertStorageKey);
      return stored != null && stored != "" ? stored : null;
    };
    const loadParams = () => {
      const currentPages = getCurrentPages();
      if (currentPages.length == 0) {
        return null;
      }
      const currentPage = currentPages[currentPages.length - 1];
      if (currentPage.options != null) {
        const options = currentPage.options;
        if (options["expertId"] != null) {
          expertId.value = options["expertId"];
        }
        if (options["expertName"] != null) {
          expertName.value = decodeURIComponent(options["expertName"]);
        }
      }
      if (expertId.value.length > 0 && expertName.value.length > 0) {
        return null;
      }
      const stored = readStoredExpert();
      if (stored == null) {
        return null;
      }
      const storedId = stored["expertId"];
      const storedName = stored["expertName"];
      if (expertId.value.length == 0 && storedId != null) {
        expertId.value = storedId;
      }
      if (expertName.value.length == 0 && storedName != null) {
        expertName.value = storedName;
      }
    };
    const submitQuestion = () => {
      if (expertId.value.length == 0) {
        common_vendor.index.showToast({
          title: missingExpertText,
          icon: "none"
        });
        return null;
      }
      if (title.value.trim().length == 0) {
        common_vendor.index.showToast({
          title: missingTitleText,
          icon: "none"
        });
        return null;
      }
      if (content.value.trim().length == 0) {
        common_vendor.index.showToast({
          title: missingContentText,
          icon: "none"
        });
        return null;
      }
      if (isSubmitting.value) {
        return null;
      }
      isSubmitting.value = true;
      common_vendor.index.showLoading({
        title: loadingText
      });
      utils_auth.createQaQuestion(new utils_auth.AppQaQuestionRequest({
        expertCategoryId: 0,
        expertId: Number(expertId.value),
        title: title.value.trim(),
        content: content.value.trim()
      }), () => {
        isSubmitting.value = false;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: successText,
          icon: "none"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/consult/questions"
          });
        }, 600);
      }, (message) => {
        isSubmitting.value = false;
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: message.length > 0 ? message : failedText,
          icon: "none"
        });
      });
    };
    loadParams();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$3,
        b: common_assets._imports_0$1,
        c: common_vendor.o(goBack),
        d: common_vendor.t(titleText),
        e: common_vendor.t(consultTargetText),
        f: common_vendor.t(displayExpertName.value),
        g: common_vendor.t(subjectText),
        h: titlePlaceholder,
        i: title.value,
        j: common_vendor.o(($event) => {
          return title.value = $event.detail.value;
        }),
        k: common_vendor.t(title.value.length),
        l: common_vendor.t(contentText),
        m: contentPlaceholder,
        n: content.value,
        o: common_vendor.o(($event) => {
          return content.value = $event.detail.value;
        }),
        p: common_vendor.t(content.value.length),
        q: common_vendor.t(isSubmitting.value ? submittingText : submitText),
        r: common_vendor.o(submitQuestion),
        s: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/create.js.map
