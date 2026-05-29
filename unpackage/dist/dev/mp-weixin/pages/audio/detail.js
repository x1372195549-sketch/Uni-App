"use strict";
const common_vendor = require("../../common/vendor.js");
class CatalogItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          duration: { type: String, optional: false }
        };
      },
      name: "CatalogItem"
    };
  }
  constructor(options, metadata = CatalogItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.duration = this.__props__.duration;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const audioId = common_vendor.ref("");
    const activeTab = common_vendor.ref("intro");
    const catalogItems = common_vendor.ref([
      new CatalogItem({ id: "1", title: "音频1：目录标题占位一", duration: `12'30"` }),
      new CatalogItem({ id: "2", title: "音频2：目录标题占位二", duration: `12'30"` }),
      new CatalogItem({ id: "3", title: "音频3：目录标题占位三", duration: `12'30"` }),
      new CatalogItem({ id: "4", title: "音频4：目录标题占位四", duration: `12'30"` })
    ]);
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const loadParams = () => {
      const pages = getCurrentPages();
      if (pages.length > 0) {
        const current = pages[pages.length - 1];
        if (current != null && current.options != null) {
          if (current.options["id"] != null) {
            audioId.value = current.options["id"];
          }
          if (current.options["tab"] != null) {
            activeTab.value = current.options["tab"];
          }
        }
      }
    };
    loadParams();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_vendor.o(goBack),
        b: common_vendor.n(common_vendor.unref(activeTab) == "intro" ? "tab-text tab-text-active" : "tab-text"),
        c: common_vendor.unref(activeTab) == "intro"
      }, common_vendor.unref(activeTab) == "intro" ? {} : {}, {
        d: common_vendor.o(($event) => {
          return activeTab.value = "intro";
        }),
        e: common_vendor.n(common_vendor.unref(activeTab) == "catalog" ? "tab-text tab-text-active" : "tab-text"),
        f: common_vendor.unref(activeTab) == "catalog"
      }, common_vendor.unref(activeTab) == "catalog" ? {} : {}, {
        g: common_vendor.o(($event) => {
          return activeTab.value = "catalog";
        }),
        h: common_vendor.unref(activeTab) == "intro"
      }, common_vendor.unref(activeTab) == "intro" ? {
        i: common_vendor.t(common_vendor.unref(audioId))
      } : {
        j: common_vendor.f(common_vendor.unref(catalogItems), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.duration),
            c: item.id
          };
        })
      }, {
        k: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/detail.js.map
