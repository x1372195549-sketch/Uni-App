"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class CategoryChild extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          name: { type: String, optional: false }
        };
      },
      name: "CategoryChild"
    };
  }
  constructor(options, metadata = CategoryChild.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
class CategoryItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          name: { type: String, optional: false },
          children: { type: UTS.UTSType.withGenerics(Array, [CategoryChild]), optional: false }
        };
      },
      name: "CategoryItem"
    };
  }
  constructor(options, metadata = CategoryItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.name = this.__props__.name;
    this.children = this.__props__.children;
    delete this.__props__;
  }
}
class DoctorItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          primaryCategoryId: { type: String, optional: false },
          secondaryCategoryId: { type: String, optional: false },
          name: { type: String, optional: false },
          shortName: { type: String, optional: false },
          brief: { type: String, optional: false },
          tag: { type: String, optional: false },
          organization: { type: String, optional: false },
          title: { type: String, optional: false },
          specialty: { type: String, optional: false },
          introduction: { type: String, optional: false },
          qaTitleOne: { type: String, optional: false },
          qaTitleTwo: { type: String, optional: false },
          avatarUrl: { type: String, optional: false }
        };
      },
      name: "DoctorItem"
    };
  }
  constructor(options, metadata = DoctorItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.primaryCategoryId = this.__props__.primaryCategoryId;
    this.secondaryCategoryId = this.__props__.secondaryCategoryId;
    this.name = this.__props__.name;
    this.shortName = this.__props__.shortName;
    this.brief = this.__props__.brief;
    this.tag = this.__props__.tag;
    this.organization = this.__props__.organization;
    this.title = this.__props__.title;
    this.specialty = this.__props__.specialty;
    this.introduction = this.__props__.introduction;
    this.qaTitleOne = this.__props__.qaTitleOne;
    this.qaTitleTwo = this.__props__.qaTitleTwo;
    this.avatarUrl = this.__props__.avatarUrl;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const primaryCategories = common_vendor.ref([
      new CategoryItem({
        id: "internal",
        name: "中医内科",
        children: [
          new CategoryChild({ id: "cardio", name: "心血管" }),
          new CategoryChild({ id: "brain", name: "脑病" }),
          new CategoryChild({ id: "elder", name: "老年病" }),
          new CategoryChild({ id: "lung", name: "肺病" }),
          new CategoryChild({ id: "spleen", name: "脾胃病" }),
          new CategoryChild({ id: "kidney", name: "肾病" }),
          new CategoryChild({ id: "rheumatism", name: "风湿病" })
        ]
      }),
      new CategoryItem({ id: "surgery", name: "中医外科", children: [] }),
      new CategoryItem({ id: "bone", name: "中医骨伤科", children: [] }),
      new CategoryItem({ id: "gynecology", name: "中医妇科", children: [] }),
      new CategoryItem({ id: "pediatrics", name: "中医儿科", children: [] }),
      new CategoryItem({ id: "acupuncture", name: "中医五官科", children: [] })
    ]);
    const doctors = common_vendor.ref([
      new DoctorItem({
        id: "d1",
        primaryCategoryId: "internal",
        secondaryCategoryId: "cardio",
        name: "符惠娟",
        shortName: "符",
        brief: "常州市中医院心血管科主任中医师，医学硕士，简介占位内容会在后续由数据库替换。",
        tag: "中医心血管",
        organization: "常州市中医院",
        title: "主任中医师",
        specialty: "中医心血管",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "符主任您好！请问胸闷气短跟黑心慌，高血压口服药物期间如何调理？",
        qaTitleTwo: "请问脑梗塞治疗方法",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d2",
        primaryCategoryId: "internal",
        secondaryCategoryId: "cardio",
        name: "林轶蓉",
        shortName: "林",
        brief: "镇江市中医院心血管方向副主任医师，占位简介至少三行显示，后续替换真实数据库内容。",
        tag: "中医心血管",
        organization: "镇江市中医院",
        title: "副主任医师",
        specialty: "中医心血管",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "请问心悸失眠如何调理？",
        qaTitleTwo: "高血压伴头晕如何辨证？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d3",
        primaryCategoryId: "internal",
        secondaryCategoryId: "cardio",
        name: "刘健",
        shortName: "刘",
        brief: "江苏省中医院心内科方向副主任中医师，医生简介占位内容，等待数据库替换。",
        tag: "中医心血管",
        organization: "江苏省中医院",
        title: "副主任中医师",
        specialty: "中医心血管",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "胸闷胸痛平时需要注意什么？",
        qaTitleTwo: "冠心病饮食如何调理？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d4",
        primaryCategoryId: "internal",
        secondaryCategoryId: "brain",
        name: "刘敏",
        shortName: "敏",
        brief: "徐州市中医院脑病方向副主任医师，当前为占位简介内容，后续由接口统一替换。",
        tag: "脑病方向",
        organization: "徐州市中医院",
        title: "副主任医师",
        specialty: "脑病方向",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "头晕头痛持续发作怎么办？",
        qaTitleTwo: "脑病恢复期如何调养？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d5",
        primaryCategoryId: "internal",
        secondaryCategoryId: "elder",
        name: "赵宁",
        shortName: "赵",
        brief: "老年病方向医生占位简介内容，至少展示三行并在超出时省略，方便后续接真实数据。",
        tag: "老年病",
        organization: "南京市中医院",
        title: "主任医师",
        specialty: "老年病调养",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "老人睡眠差和食欲差怎么调养？",
        qaTitleTwo: "慢病管理需要注意什么？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d6",
        primaryCategoryId: "surgery",
        secondaryCategoryId: "",
        name: "王庆春",
        shortName: "王",
        brief: "连云港市中医院外科方向主任中医师，医生信息当前保留占位内容。",
        tag: "中医外科",
        organization: "连云港市中医院",
        title: "主任中医师",
        specialty: "中医外科",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "术后体虚怎样进行中医调理？",
        qaTitleTwo: "慢性伤口恢复如何用药？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d7",
        primaryCategoryId: "surgery",
        secondaryCategoryId: "",
        name: "郑晓丹",
        shortName: "郑",
        brief: "南通市中医院中医外科医学博士，医生简介占位内容等待数据库导入。",
        tag: "中医外科",
        organization: "南通市中医院",
        title: "医学博士",
        specialty: "中医外科",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "术后调理期间饮食注意事项？",
        qaTitleTwo: "长期慢性炎症如何调理？",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d8",
        primaryCategoryId: "acupuncture",
        secondaryCategoryId: "",
        name: "邹冲",
        shortName: "邹",
        brief: "江苏省中医院五官科方向主治医师，医生简介占位内容后续直接替换。",
        tag: "中医五官科",
        organization: "江苏省中医院",
        title: "主治医师",
        specialty: "中医五官科",
        introduction: "这里保留医生详情简介占位内容，后续将由数据库返回医生的履历简介、研究方向和临床经验。",
        qaTitleOne: "耳鸣耳聋如何进行中医调理？",
        qaTitleTwo: "过敏性鼻炎怎么辨证治疗？",
        avatarUrl: ""
      })
    ]);
    const currentPrimaryId = common_vendor.ref("internal");
    const currentSecondaryId = common_vendor.ref("");
    const currentDoctors = common_vendor.ref([]);
    const refreshDoctors = () => {
      currentDoctors.value = doctors.value.filter((item) => {
        if (item.primaryCategoryId != currentPrimaryId.value) {
          return false;
        }
        if (currentSecondaryId.value == "") {
          return true;
        }
        return item.secondaryCategoryId == currentSecondaryId.value;
      });
    };
    const selectPrimaryCategory = (id) => {
      currentPrimaryId.value = id;
      currentSecondaryId.value = "";
      refreshDoctors();
    };
    const selectSecondaryCategory = (primaryId, childId) => {
      currentPrimaryId.value = primaryId;
      currentSecondaryId.value = childId;
      refreshDoctors();
    };
    const goDoctorDetail = (doctor) => {
      common_vendor.index.navigateTo({
        url: "/pages/consult/detail?id=" + doctor.id + "&name=" + encodeURIComponent(doctor.name) + "&title=" + encodeURIComponent(doctor.title) + "&organization=" + encodeURIComponent(doctor.organization) + "&specialty=" + encodeURIComponent(doctor.specialty) + "&tag=" + encodeURIComponent(doctor.tag)
      });
    };
    const goLearningPage = () => {
      common_vendor.index.reLaunch({ url: "/pages/index/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/knowledge/index" });
    };
    const goMinePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/mine/index" });
    };
    refreshDoctors();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.f(common_vendor.unref(primaryCategories), (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(currentPrimaryId) === item.id && common_vendor.unref(currentSecondaryId) === ""
          }, common_vendor.unref(currentPrimaryId) === item.id && common_vendor.unref(currentSecondaryId) === "" ? {} : {}, {
            b: common_vendor.t(item.name),
            c: common_vendor.unref(currentPrimaryId) === item.id && common_vendor.unref(currentSecondaryId) === "" ? 1 : "",
            d: common_vendor.unref(currentPrimaryId) === item.id && common_vendor.unref(currentSecondaryId) === "" ? 1 : "",
            e: common_vendor.o(($event) => {
              return selectPrimaryCategory(item.id);
            }, item.id),
            f: common_vendor.unref(currentPrimaryId) === item.id && item.children.length > 0
          }, common_vendor.unref(currentPrimaryId) === item.id && item.children.length > 0 ? {
            g: common_vendor.f(item.children, (child, k1, i1) => {
              return common_vendor.e({
                a: common_vendor.unref(currentSecondaryId) === child.id
              }, common_vendor.unref(currentSecondaryId) === child.id ? {} : {}, {
                b: common_vendor.t(child.name),
                c: common_vendor.unref(currentSecondaryId) === child.id ? 1 : "",
                d: child.id,
                e: common_vendor.unref(currentSecondaryId) === child.id ? 1 : "",
                f: common_vendor.o(($event) => {
                  return selectSecondaryCategory(item.id, child.id);
                }, child.id)
              });
            })
          } : {}, {
            h: item.id
          });
        }),
        d: common_vendor.f(common_vendor.unref(currentDoctors), (doctor, k0, i0) => {
          return common_vendor.e({
            a: doctor.avatarUrl !== ""
          }, doctor.avatarUrl !== "" ? {
            b: doctor.avatarUrl
          } : {
            c: common_vendor.t(doctor.shortName)
          }, {
            d: common_vendor.t(doctor.name),
            e: common_vendor.t(doctor.brief),
            f: common_vendor.t(doctor.tag),
            g: doctor.id,
            h: common_vendor.o(($event) => {
              return goDoctorDetail(doctor);
            }, doctor.id)
          });
        }),
        e: common_assets._imports_1$2,
        f: common_vendor.o(goLearningPage),
        g: common_assets._imports_2,
        h: common_assets._imports_3$1,
        i: common_assets._imports_4,
        j: common_vendor.o(goKnowledgePage),
        k: common_assets._imports_5,
        l: common_vendor.o(goMinePage),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/index.js.map
