"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class ExperienceDisplayItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          timeText: { type: String, optional: false },
          description: { type: String, optional: false }
        };
      },
      name: "ExperienceDisplayItem"
    };
  }
  constructor(options, metadata = ExperienceDisplayItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.timeText = this.__props__.timeText;
    this.description = this.__props__.description;
    delete this.__props__;
  }
}
const expertStorageKey = "consult_current_expert";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const doctorName = common_vendor.ref("专家详情");
    const doctorTitle = common_vendor.ref("专家");
    const organization = common_vendor.ref("暂无单位信息");
    const specialty = common_vendor.ref("暂无专业方向");
    const consultationNotice = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("");
    const avatarFailed = common_vendor.ref(false);
    const introduction = common_vendor.ref("这里展示专家简介、履历和研究方向。");
    const experienceItems = common_vendor.ref([]);
    const shortName = common_vendor.computed(() => {
      return doctorName.value.length > 0 ? doctorName.value.substring(0, 1) : "医";
    });
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const sanitizeAvatarUrl = (value) => {
      const avatar = utils_auth.normalizeAppUrl(safeText(value));
      if (avatar.length == 0) {
        return "";
      }
      if (avatar.indexOf("example.com") >= 0) {
        return "";
      }
      return avatar;
    };
    const formatDateRange = (startDate, endDate) => {
      const start = safeText(startDate);
      const end = safeText(endDate);
      if (start.length == 0 && end.length == 0) {
        return "";
      }
      if (start.length > 0 && end.length > 0) {
        return start + " - " + end;
      }
      return start.length > 0 ? start : end;
    };
    const goBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/consult/index" });
    };
    const handleAvatarError = () => {
      avatarFailed.value = true;
      avatarUrl.value = "";
    };
    const mapExperience = (item) => {
      return new ExperienceDisplayItem({
        id: item.id,
        title: safeText(item.title),
        timeText: formatDateRange(item.startDate, item.endDate),
        description: safeText(item.description)
      });
    };
    const saveCurrentExpert = () => {
      common_vendor.index.setStorageSync(expertStorageKey, new UTSJSONObject({
        expertId: detailId.value,
        expertName: doctorName.value
      }));
    };
    const applyExpertDetail = (detail) => {
      const nameText = safeText(detail.realName);
      const titleText = safeText(detail.title);
      const orgText = safeText(detail.organization);
      const specialtyText = safeText(detail.specialty);
      const introText = safeText(detail.introduction);
      const noticeText = safeText(detail.consultationNotice);
      const avatarText = sanitizeAvatarUrl(detail.avatarUrl);
      if (nameText.length > 0) {
        doctorName.value = nameText;
      }
      if (titleText.length > 0) {
        doctorTitle.value = titleText;
      }
      if (orgText.length > 0) {
        organization.value = orgText;
      }
      if (specialtyText.length > 0) {
        specialty.value = specialtyText;
      }
      avatarUrl.value = avatarText;
      avatarFailed.value = avatarText.length == 0;
      consultationNotice.value = noticeText;
      if (introText.length > 0) {
        introduction.value = introText;
      }
      experienceItems.value = detail.experiences != null ? detail.experiences.map((item) => {
        return mapExperience(item);
      }).filter((item) => {
        return item.title.length > 0 || item.description.length > 0;
      }) : [];
      saveCurrentExpert();
    };
    const loadParams = () => {
      const currentPages = getCurrentPages();
      if (currentPages.length == 0) {
        return null;
      }
      const currentPage = currentPages[currentPages.length - 1];
      if (currentPage.options == null) {
        return null;
      }
      const options = currentPage.options;
      if (options["id"] != null) {
        detailId.value = options["id"];
      }
      if (options["name"] != null) {
        doctorName.value = decodeURIComponent(options["name"]);
      }
      if (options["title"] != null) {
        doctorTitle.value = decodeURIComponent(options["title"]);
      }
      if (options["organization"] != null) {
        organization.value = decodeURIComponent(options["organization"]);
      }
      if (options["specialty"] != null) {
        specialty.value = decodeURIComponent(options["specialty"]);
      }
      if (options["tag"] != null) {
        consultationNotice.value = decodeURIComponent(options["tag"]);
      }
      if (detailId.value.length > 0) {
        saveCurrentExpert();
      }
    };
    const loadExpertDetail = () => {
      if (detailId.value.length == 0) {
        return null;
      }
      utils_auth.fetchExpertDetail(detailId.value, (detail) => {
        applyExpertDetail(detail);
      }, (message) => {
        if (message.length > 0) {
          common_vendor.index.showToast({
            title: message,
            icon: "none"
          });
        }
      });
    };
    const goCreateQuestion = () => {
      saveCurrentExpert();
      common_vendor.index.navigateTo({
        url: "/pages/consult/create?expertId=" + detailId.value + "&expertName=" + encodeURIComponent(doctorName.value)
      });
    };
    const goMyQuestions = () => {
      common_vendor.index.navigateTo({ url: "/pages/consult/questions" });
    };
    common_vendor.onMounted(() => {
      loadParams();
      loadExpertDetail();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: avatarUrl.value.length > 0 && !avatarFailed.value
      }, avatarUrl.value.length > 0 && !avatarFailed.value ? {
        d: avatarUrl.value,
        e: common_vendor.o(handleAvatarError)
      } : {
        f: common_vendor.t(shortName.value)
      }, {
        g: common_vendor.t(doctorName.value),
        h: common_vendor.t(doctorTitle.value),
        i: common_vendor.t(organization.value),
        j: common_vendor.t(specialty.value),
        k: consultationNotice.value.length > 0
      }, consultationNotice.value.length > 0 ? {
        l: common_vendor.t(consultationNotice.value)
      } : {}, {
        m: common_vendor.t(introduction.value),
        n: experienceItems.value.length > 0
      }, experienceItems.value.length > 0 ? {
        o: common_vendor.f(experienceItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.title),
            b: item.timeText.length > 0
          }, item.timeText.length > 0 ? {
            c: common_vendor.t(item.timeText)
          } : {}, {
            d: item.description.length > 0
          }, item.description.length > 0 ? {
            e: common_vendor.t(item.description)
          } : {}, {
            f: item.id
          });
        })
      } : {}, {
        p: common_vendor.o(goCreateQuestion),
        q: common_vendor.o(goMyQuestions),
        r: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/detail.js.map
