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
    const positionOptions = ["医师", "护士", "药师", "技师", "中医师", "康复治疗师", "医学生", "其他"];
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
    const regionValue = common_vendor.computed(() => {
      return [form.value.province, form.value.city, form.value.district];
    });
    const positionIndex = common_vendor.computed(() => {
      const index = positionOptions.indexOf(form.value.positionTitle);
      return index >= 0 ? index : 0;
    });
    const trimText = (value) => {
      return value.trim();
    };
    const digitsOnly = (value) => {
      return value.replace(/[^0-9]/g, "");
    };
    const isValidPhone = (value) => {
      return /^1\d{10}$/.test(value);
    };
    const normalizeIdCard = (value) => {
      return value.replace(/[^0-9Xx]/g, "").toUpperCase().slice(0, 18);
    };
    const isValidIdCard = (value) => {
      return /(^\d{15}$)|(^\d{17}(\d|X)$)/.test(value);
    };
    const readPickerIndex = (event = null) => {
      if (event == null || event.detail == null) {
        return -1;
      }
      const rawValue = event.detail.value;
      if (typeof rawValue == "number") {
        return rawValue;
      }
      if (typeof rawValue == "string") {
        const parsed = parseInt(rawValue);
        return isNaN(parsed) ? -1 : parsed;
      }
      return -1;
    };
    const handlePhoneInput = () => {
      form.value.mobile = digitsOnly(form.value.mobile).slice(0, 11);
    };
    const handleIdCardInput = () => {
      form.value.idCardNo = normalizeIdCard(form.value.idCardNo);
    };
    const handleRegionChange = (event = null) => {
      if (event == null || event.detail == null || event.detail.value == null) {
        return null;
      }
      const values = event.detail.value;
      if (values.length >= 3) {
        form.value.province = values[0];
        form.value.city = values[1];
        form.value.district = values[2];
      }
    };
    const handlePositionChange = (event = null) => {
      const index = readPickerIndex(event);
      if (index >= 0 && index < positionOptions.length) {
        form.value.positionTitle = positionOptions[index];
      }
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
      handlePhoneInput();
      handleIdCardInput();
    };
    const loadCertification = () => {
      utils_auth.fetchCertificationStatus((data) => {
        applyCertificationData(data);
      }, () => {
      });
    };
    const validateForm = () => {
      form.value.realName = trimText(form.value.realName);
      form.value.organization = trimText(form.value.organization);
      form.value.certificationMaterials = trimText(form.value.certificationMaterials);
      handlePhoneInput();
      handleIdCardInput();
      if (form.value.realName == "") {
        common_vendor.index.showToast({ title: "请输入真实姓名", icon: "none" });
        return false;
      }
      if (!isValidPhone(form.value.mobile)) {
        common_vendor.index.showToast({ title: "手机号必须为11位", icon: "none" });
        return false;
      }
      if (!isValidIdCard(form.value.idCardNo)) {
        common_vendor.index.showToast({ title: "请输入正确的身份证号", icon: "none" });
        return false;
      }
      if (form.value.province == "" || form.value.city == "" || form.value.district == "") {
        common_vendor.index.showToast({ title: "请选择省市区", icon: "none" });
        return false;
      }
      if (form.value.organization == "") {
        common_vendor.index.showToast({ title: "请输入工作单位", icon: "none" });
        return false;
      }
      if (form.value.positionTitle == "") {
        common_vendor.index.showToast({ title: "请选择职称或执业类别", icon: "none" });
        return false;
      }
      if (form.value.certificationMaterials == "") {
        common_vendor.index.showToast({ title: "请填写认证材料", icon: "none" });
        return false;
      }
      return true;
    };
    const handleSubmit = () => {
      if (isSaving.value || !validateForm()) {
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
        k: common_vendor.o([($event) => {
          return form.value.idCardNo = $event.detail.value;
        }, handleIdCardInput]),
        l: form.value.idCardNo,
        m: common_vendor.t(form.value.province == "" ? "请选择省份" : form.value.province),
        n: common_vendor.n(form.value.province == "" ? "row-placeholder" : "row-value"),
        o: regionValue.value,
        p: common_vendor.o(handleRegionChange),
        q: common_vendor.t(form.value.city == "" ? "请选择城市" : form.value.city),
        r: common_vendor.n(form.value.city == "" ? "row-placeholder" : "row-value"),
        s: regionValue.value,
        t: common_vendor.o(handleRegionChange),
        v: common_vendor.t(form.value.district == "" ? "请选择区县" : form.value.district),
        w: common_vendor.n(form.value.district == "" ? "row-placeholder" : "row-value"),
        x: regionValue.value,
        y: common_vendor.o(handleRegionChange),
        z: form.value.organization,
        A: common_vendor.o(($event) => {
          return form.value.organization = $event.detail.value;
        }),
        B: common_vendor.t(form.value.positionTitle == "" ? "请选择职称或执业类别" : form.value.positionTitle),
        C: common_vendor.n(form.value.positionTitle == "" ? "row-placeholder" : "row-value"),
        D: positionOptions,
        E: positionIndex.value,
        F: common_vendor.o(handlePositionChange),
        G: form.value.certificationMaterials,
        H: common_vendor.o(($event) => {
          return form.value.certificationMaterials = $event.detail.value;
        }),
        I: common_vendor.t(isSaving.value ? "提交中..." : "提交认证"),
        J: common_vendor.o(handleSubmit),
        K: isSaving.value,
        L: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/certification.js.map
