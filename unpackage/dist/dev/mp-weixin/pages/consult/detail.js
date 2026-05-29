"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const introduction = "这里保留医生详情介绍占位内容，后续将由数据库返回医生的履历简介、研究方向、代表成果和临床经验等信息，用于完整替换当前文案。";
const qaTitleOne = "符主任您好！请问胸闷气短跟黑心慌，高血压口服美托洛尔，利尿剂。";
const qaTitleTwo = "请问脑梗塞治疗方法";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const currentPages = getCurrentPages();
    let doctorName = "符惠娟";
    let doctorTitle = "主任中医师";
    let organization = "常州市中医院";
    let specialty = "中医心血管";
    let tag = "中医心血管";
    if (currentPages.length > 0) {
      const currentPage = currentPages[currentPages.length - 1];
      const options = currentPage.options;
      if (options != null) {
        doctorName = options["name"] != null ? decodeURIComponent(options["name"]) : doctorName;
        doctorTitle = options["title"] != null ? decodeURIComponent(options["title"]) : doctorTitle;
        organization = options["organization"] != null ? decodeURIComponent(options["organization"]) : organization;
        specialty = options["specialty"] != null ? decodeURIComponent(options["specialty"]) : specialty;
        tag = options["tag"] != null ? decodeURIComponent(options["tag"]) : tag;
      }
    }
    const shortName = doctorName.length > 0 ? doctorName.substring(0, 1) : "医";
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$2,
        b: common_vendor.o(goBack),
        c: common_assets._imports_1$3,
        d: common_vendor.t(common_vendor.unref(shortName)),
        e: common_vendor.t(common_vendor.unref(doctorName)),
        f: common_vendor.t(common_vendor.unref(doctorTitle)),
        g: common_vendor.t(common_vendor.unref(organization)),
        h: common_vendor.t(common_vendor.unref(specialty)),
        i: common_vendor.t(common_vendor.unref(tag)),
        j: common_vendor.t(introduction),
        k: common_vendor.t(qaTitleOne),
        l: common_vendor.t(qaTitleTwo),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/detail.js.map
