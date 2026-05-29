"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class CategoryItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          name: { type: String, optional: false }
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
          categoryId: { type: String, optional: false },
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
    this.categoryId = this.__props__.categoryId;
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
    const categories = common_vendor.ref([
      new CategoryItem({ id: "internal", name: "中医内科" }),
      new CategoryItem({ id: "cardio", name: "心血管" }),
      new CategoryItem({ id: "brain", name: "脑病" }),
      new CategoryItem({ id: "elder", name: "老年病" }),
      new CategoryItem({ id: "lung", name: "肺病" }),
      new CategoryItem({ id: "spleen", name: "脾胃病" }),
      new CategoryItem({ id: "kidney", name: "肾病" }),
      new CategoryItem({ id: "rheumatism", name: "风湿病" }),
      new CategoryItem({ id: "surgery", name: "中医外科" }),
      new CategoryItem({ id: "bone", name: "中医骨伤科" }),
      new CategoryItem({ id: "gynecology", name: "中医妇科" }),
      new CategoryItem({ id: "pediatrics", name: "中医儿科" }),
      new CategoryItem({ id: "acupuncture", name: "中医五官科" })
    ]);
    const doctors = common_vendor.ref([
      new DoctorItem({
        id: "d1",
        categoryId: "cardio",
        name: "符惠娟",
        shortName: "符",
        brief: "常州市中医院 心血管方向 主任中医师",
        tag: "中医心血管",
        organization: "常州市中医院",
        title: "主任中医师",
        specialty: "中医心血管",
        introduction: "符惠娟，常州市中医院心血管科主任中医师，医学硕士。这里保留医生详情占位内容，后续可替换成数据库返回的简介。",
        qaTitleOne: "符主任您好！请问胸闷气短跟黑心慌，高血压口服美托洛尔，利尿剂。",
        qaTitleTwo: "请问脑梗塞治疗方法",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d2",
        categoryId: "cardio",
        name: "林轶蓉",
        shortName: "林",
        brief: "镇江市中医院 心血管方向 副主任医师",
        tag: "中医心血管",
        organization: "镇江市中医院",
        title: "副主任医师",
        specialty: "中医心血管",
        introduction: "林轶蓉，镇江市中医院心血管科副主任医师，这里保留医生详情占位内容。",
        qaTitleOne: "请问心悸失眠如何调理",
        qaTitleTwo: "高血压伴头晕如何辨证",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d3",
        categoryId: "cardio",
        name: "刘健",
        shortName: "刘",
        brief: "江苏省中医院 心内科方向 副主任中医师",
        tag: "中医心血管",
        organization: "江苏省中医院",
        title: "副主任中医师",
        specialty: "中医心血管",
        introduction: "刘健，江苏省中医院心内科方向专家，占位简介。",
        qaTitleOne: "胸闷胸痛平时需要注意什么",
        qaTitleTwo: "冠心病饮食如何调理",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d4",
        categoryId: "brain",
        name: "刘敏",
        shortName: "敏",
        brief: "徐州市中医院 脑病方向 科研副主任",
        tag: "脑病方向",
        organization: "徐州市中医院",
        title: "副主任医师",
        specialty: "脑病方向",
        introduction: "刘敏，徐州市中医院脑病方向专家，占位简介。",
        qaTitleOne: "头晕头痛持续发作怎么办",
        qaTitleTwo: "脑病恢复期如何调养",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d5",
        categoryId: "surgery",
        name: "王庆春",
        shortName: "王",
        brief: "连云港市中医院 外科方向 主任中医师",
        tag: "中医心血管",
        organization: "连云港市中医院",
        title: "主任中医师",
        specialty: "中医外科",
        introduction: "王庆春，连云港市中医院外科方向专家，占位简介。",
        qaTitleOne: "术后体虚怎样进行中医调理",
        qaTitleTwo: "慢性伤口恢复如何用药",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d6",
        categoryId: "surgery",
        name: "郑晓丹",
        shortName: "郑",
        brief: "南通市中医院 中医外科 医学博士",
        tag: "中医心血管",
        organization: "南通市中医院",
        title: "医学博士",
        specialty: "中医外科",
        introduction: "郑晓丹，南通市中医院中医外科专家，占位简介。",
        qaTitleOne: "术后调理期间饮食注意事项",
        qaTitleTwo: "长期慢性炎症如何调理",
        avatarUrl: ""
      }),
      new DoctorItem({
        id: "d7",
        categoryId: "acupuncture",
        name: "邹冲",
        shortName: "邹",
        brief: "江苏省中医院 五官科方向 主治医师",
        tag: "中医心血管",
        organization: "江苏省中医院",
        title: "主治医师",
        specialty: "中医五官科",
        introduction: "邹冲，江苏省中医院五官科方向专家，占位简介。",
        qaTitleOne: "耳鸣耳聋如何进行中医调理",
        qaTitleTwo: "过敏性鼻炎怎么辨证治疗",
        avatarUrl: ""
      })
    ]);
    const currentCategoryId = common_vendor.ref("cardio");
    const currentDoctors = common_vendor.ref([]);
    const refreshDoctors = () => {
      currentDoctors.value = doctors.value.filter((item) => {
        return item.categoryId == currentCategoryId.value;
      });
    };
    const selectCategory = (id) => {
      currentCategoryId.value = id;
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
        a: common_assets._imports_0$2,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.f(common_vendor.unref(categories), (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.unref(currentCategoryId) === item.id
          }, common_vendor.unref(currentCategoryId) === item.id ? {} : {}, {
            b: common_vendor.t(item.name),
            c: common_vendor.unref(currentCategoryId) === item.id ? 1 : "",
            d: item.id,
            e: common_vendor.unref(currentCategoryId) === item.id ? 1 : "",
            f: common_vendor.o(($event) => {
              return selectCategory(item.id);
            }, item.id)
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
        h: common_assets._imports_3,
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
