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
class BookItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          categoryId: { type: String, optional: false },
          name: { type: String, optional: false },
          shortTitle: { type: String, optional: false },
          author: { type: String, optional: false },
          coverColor: { type: String, optional: false }
        };
      },
      name: "BookItem"
    };
  }
  constructor(options, metadata = BookItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.name = this.__props__.name;
    this.shortTitle = this.__props__.shortTitle;
    this.author = this.__props__.author;
    this.coverColor = this.__props__.coverColor;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const categories = common_vendor.ref([
      new CategoryItem({ id: "theory", name: "中医基础理论" }),
      new CategoryItem({ id: "diagnosis", name: "中医诊断学" }),
      new CategoryItem({ id: "herbs", name: "中药学" }),
      new CategoryItem({ id: "formula", name: "方剂学" }),
      new CategoryItem({ id: "internal", name: "中医内科" }),
      new CategoryItem({ id: "surgery", name: "中医外科" }),
      new CategoryItem({ id: "classic", name: "四大经典" })
    ]);
    const books = common_vendor.ref([
      new BookItem({ id: "b1", categoryId: "theory", name: "中医基础理论概论", shortTitle: "基础\n理论", author: "王某某", coverColor: "#dfead2" }),
      new BookItem({ id: "b2", categoryId: "theory", name: "中医阴阳五行导读", shortTitle: "阴阳\n五行", author: "李某某", coverColor: "#f3d88d" }),
      new BookItem({ id: "b3", categoryId: "theory", name: "脏腑经络入门", shortTitle: "脏腑\n经络", author: "周某某", coverColor: "#d5e1f2" }),
      new BookItem({ id: "b4", categoryId: "theory", name: "中医诊断学图解", shortTitle: "诊断\n图解", author: "赵某某", coverColor: "#f1ddb9" })
    ]);
    const currentCategoryId = common_vendor.ref("theory");
    const currentBooks = common_vendor.ref([]);
    const refreshBooks = () => {
      currentBooks.value = books.value.filter((item) => {
        return item.categoryId == currentCategoryId.value;
      });
    };
    const selectCategory = (id) => {
      currentCategoryId.value = id;
      refreshBooks();
    };
    const goBookDetail = (book) => {
      common_vendor.index.navigateTo({
        url: "/pages/knowledge/book-detail?id=" + book.id + "&name=" + encodeURIComponent(book.name) + "&author=" + encodeURIComponent(book.author)
      });
    };
    const goLearningPage = () => {
      common_vendor.index.reLaunch({ url: "/pages/index/index" });
    };
    const goMinePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/mine/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/consult/index" });
    };
    refreshBooks();
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
        d: common_vendor.f(common_vendor.unref(currentBooks), (book, k0, i0) => {
          return {
            a: common_vendor.t(book.shortTitle),
            b: book.coverColor,
            c: common_vendor.t(book.name),
            d: book.id,
            e: common_vendor.o(($event) => {
              return goBookDetail(book);
            }, book.id)
          };
        }),
        e: common_assets._imports_1$2,
        f: common_vendor.o(goLearningPage),
        g: common_assets._imports_2,
        h: common_assets._imports_3,
        i: common_vendor.o(goConsultPage),
        j: common_assets._imports_4$1,
        k: common_assets._imports_5,
        l: common_vendor.o(goMinePage),
        m: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/index.js.map
