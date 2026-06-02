"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class ExpertExperience extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          experienceType: { type: String, optional: false },
          title: { type: String, optional: false },
          description: { type: String, optional: false },
          startDate: { type: String, optional: false },
          endDate: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "ExpertExperience"
    };
  }
  constructor(options, metadata = ExpertExperience.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.expertId = this.__props__.expertId;
    this.experienceType = this.__props__.experienceType;
    this.title = this.__props__.title;
    this.description = this.__props__.description;
    this.startDate = this.__props__.startDate;
    this.endDate = this.__props__.endDate;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class ExpertDetail extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          realName: { type: String, optional: false },
          avatarUrl: { type: String, optional: false },
          title: { type: String, optional: false },
          organization: { type: String, optional: false },
          specialty: { type: String, optional: false },
          introduction: { type: String, optional: false },
          consultationNotice: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          categoryIds: { type: UTS.UTSType.withGenerics(Array, [Number]), optional: false },
          experiences: { type: UTS.UTSType.withGenerics(Array, [ExpertExperience]), optional: false }
        };
      },
      name: "ExpertDetail"
    };
  }
  constructor(options, metadata = ExpertDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.realName = this.__props__.realName;
    this.avatarUrl = this.__props__.avatarUrl;
    this.title = this.__props__.title;
    this.organization = this.__props__.organization;
    this.specialty = this.__props__.specialty;
    this.introduction = this.__props__.introduction;
    this.consultationNotice = this.__props__.consultationNotice;
    this.sortOrder = this.__props__.sortOrder;
    this.categoryIds = this.__props__.categoryIds;
    this.experiences = this.__props__.experiences;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const detailId = common_vendor.ref("");
    const doctorName = common_vendor.ref("医生详情");
    const doctorTitle = common_vendor.ref("专家");
    const organization = common_vendor.ref("暂无单位信息");
    const specialty = common_vendor.ref("暂无专业方向");
    const tag = common_vendor.ref("暂无标签");
    const avatarUrl = common_vendor.ref("");
    const introduction = common_vendor.ref("这里展示医生简介、履历和研究方向。接口返回医生介绍时，将优先使用后端数据。");
    const qaTitleOne = common_vendor.ref("医生答疑功能占位，后续可根据后端接口补充真实问答内容。");
    const qaTitleTwo = common_vendor.ref("当前页面已优先展示医生基础信息，问答列表等待后端接口补充。");
    const shortName = common_vendor.computed(() => {
      return doctorName.value.length > 0 ? doctorName.value.substring(0, 1) : "医";
    });
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const applyExpertDetail = (detail) => {
      const nameText = safeText(detail.realName);
      const titleText = safeText(detail.title);
      const orgText = safeText(detail.organization);
      const specialtyText = safeText(detail.specialty);
      const introText = safeText(detail.introduction);
      const noticeText = safeText(detail.consultationNotice);
      const avatarText = safeText(detail.avatarUrl);
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
      if (avatarText.length > 0) {
        avatarUrl.value = avatarText;
      }
      if (noticeText.length > 0) {
        tag.value = noticeText;
      }
      if (introText.length > 0) {
        introduction.value = introText;
      } else if (detail.experiences != null && detail.experiences.length > 0) {
        const experienceText = detail.experiences.slice(0, 3).map((item) => {
          const titleValue = safeText(item.title);
          const descValue = safeText(item.description);
          return titleValue.length > 0 ? titleValue + (descValue.length > 0 ? "：" + descValue : "") : descValue;
        }).filter((item) => {
          return item.length > 0;
        });
        if (experienceText.length > 0) {
          introduction.value = experienceText.join("；");
        }
      }
    };
    const loadParams = () => {
      const currentPages = getCurrentPages();
      if (currentPages.length > 0) {
        const currentPage = currentPages[currentPages.length - 1];
        if (currentPage.options != null) {
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
            tag.value = decodeURIComponent(options["tag"]);
          }
        }
      }
      if (detailId.value.length > 0) {
        utils_auth.fetchExpertDetail(detailId.value, (detail) => {
          applyExpertDetail(detail);
        }, () => {
        });
      }
    };
    common_vendor.onMounted(() => {
      loadParams();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_assets._imports_0$3,
        d: avatarUrl.value.length > 0
      }, avatarUrl.value.length > 0 ? {
        e: avatarUrl.value
      } : {
        f: common_vendor.t(shortName.value)
      }, {
        g: common_vendor.t(doctorName.value),
        h: common_vendor.t(doctorTitle.value),
        i: common_vendor.t(organization.value),
        j: common_vendor.t(specialty.value),
        k: common_vendor.t(tag.value),
        l: common_vendor.t(introduction.value),
        m: common_vendor.t(qaTitleOne.value),
        n: common_vendor.t(qaTitleTwo.value),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/detail.js.map
