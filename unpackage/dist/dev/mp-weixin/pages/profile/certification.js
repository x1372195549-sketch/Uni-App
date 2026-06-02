"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class CertificationForm extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          realName: { type: String, optional: false },
          mobile: { type: String, optional: false },
          idCardNo: { type: String, optional: false },
          province: { type: String, optional: false },
          city: { type: String, optional: false },
          district: { type: String, optional: false },
          organization: { type: String, optional: false },
          positionTitle: { type: String, optional: false },
          certificationMaterials: { type: String, optional: false }
        };
      },
      name: "CertificationForm"
    };
  }
  constructor(options, metadata = CertificationForm.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.realName = this.__props__.realName;
    this.mobile = this.__props__.mobile;
    this.idCardNo = this.__props__.idCardNo;
    this.province = this.__props__.province;
    this.city = this.__props__.city;
    this.district = this.__props__.district;
    this.organization = this.__props__.organization;
    this.positionTitle = this.__props__.positionTitle;
    this.certificationMaterials = this.__props__.certificationMaterials;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "certification",
  setup(__props) {
    const isSaving = common_vendor.ref(false);
    const rejectReason = common_vendor.ref("");
    const certificationStatus = common_vendor.ref("0");
    const form = common_vendor.ref(new CertificationForm({
      realName: "",
      mobile: "",
      idCardNo: "",
      province: "",
      city: "",
      district: "",
      organization: "",
      positionTitle: "",
      certificationMaterials: ""
    }));
    const certificationStatusText = common_vendor.computed(() => {
      if (certificationStatus.value == "2") {
        return "已认证";
      }
      if (certificationStatus.value == "1") {
        return "待审核";
      }
      if (certificationStatus.value == "3") {
        return "已驳回";
      }
      return "未提交";
    });
    const certificationStatusClass = common_vendor.computed(() => {
      if (certificationStatus.value == "2") {
        return "status-on";
      }
      if (certificationStatus.value == "1") {
        return "status-pending";
      }
      if (certificationStatus.value == "3") {
        return "status-reject";
      }
      return "status-off";
    });
    const digitsOnly = (value) => {
      return value.replace(/[^0-9]/g, "");
    };
    const isValidPhone = (value) => {
      return value == "" || /^1\d{10}$/.test(value);
    };
    const handlePhoneInput = () => {
      form.value.mobile = digitsOnly(form.value.mobile).slice(0, 11);
    };
    const handleBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/index"
      });
    };
    const applyCertificationData = (data) => {
      form.value.realName = data["realName"] || form.value.realName;
      form.value.mobile = data["mobile"] || form.value.mobile;
      form.value.province = data["province"] || form.value.province;
      form.value.city = data["city"] || form.value.city;
      form.value.district = data["district"] || form.value.district;
      form.value.organization = data["organization"] || form.value.organization;
      form.value.positionTitle = data["positionTitle"] || form.value.positionTitle;
      form.value.certificationMaterials = data["certificationMaterials"] || form.value.certificationMaterials;
      certificationStatus.value = data["certificationStatus"] || certificationStatus.value;
      rejectReason.value = data["rejectReason"] || "";
    };
    const loadCertification = () => {
      utils_auth.fetchCertificationStatus((data) => {
        applyCertificationData(data);
      }, () => {
      });
    };
    const handleSubmit = () => {
      if (isSaving.value) {
        return null;
      }
      handlePhoneInput();
      if (form.value.realName == "") {
        common_vendor.index.showToast({
          title: "请输入真实姓名",
          icon: "none"
        });
        return null;
      }
      if (!isValidPhone(form.value.mobile)) {
        common_vendor.index.showToast({
          title: "手机号格式不正确",
          icon: "none"
        });
        return null;
      }
      isSaving.value = true;
      utils_auth.submitCertification(new utils_auth.AppStudentCertificationRequest({
        realName: form.value.realName,
        mobile: form.value.mobile,
        idCardNo: form.value.idCardNo,
        province: form.value.province,
        city: form.value.city,
        district: form.value.district,
        organization: form.value.organization,
        positionTitle: form.value.positionTitle,
        certificationMaterials: form.value.certificationMaterials
      }), (result) => {
        isSaving.value = false;
        applyCertificationData(result);
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
      }, (message) => {
        isSaving.value = false;
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    loadCertification();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.t(certificationStatusText.value),
        d: common_vendor.n(certificationStatusClass.value),
        e: rejectReason.value != ""
      }, rejectReason.value != "" ? {
        f: common_vendor.t(rejectReason.value)
      } : {}, {
        g: form.value.realName,
        h: common_vendor.o(($event) => {
          return form.value.realName = $event.detail.value;
        }),
        i: common_vendor.o([($event) => {
          return form.value.mobile = $event.detail.value;
        }, handlePhoneInput]),
        j: form.value.mobile,
        k: form.value.idCardNo,
        l: common_vendor.o(($event) => {
          return form.value.idCardNo = $event.detail.value;
        }),
        m: form.value.province,
        n: common_vendor.o(($event) => {
          return form.value.province = $event.detail.value;
        }),
        o: form.value.city,
        p: common_vendor.o(($event) => {
          return form.value.city = $event.detail.value;
        }),
        q: form.value.district,
        r: common_vendor.o(($event) => {
          return form.value.district = $event.detail.value;
        }),
        s: form.value.organization,
        t: common_vendor.o(($event) => {
          return form.value.organization = $event.detail.value;
        }),
        v: form.value.positionTitle,
        w: common_vendor.o(($event) => {
          return form.value.positionTitle = $event.detail.value;
        }),
        x: form.value.certificationMaterials,
        y: common_vendor.o(($event) => {
          return form.value.certificationMaterials = $event.detail.value;
        }),
        z: common_vendor.t(isSaving.value ? "提交中..." : "提交认证"),
        A: common_vendor.o(handleSubmit),
        B: isSaving.value,
        C: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/certification.js.map
