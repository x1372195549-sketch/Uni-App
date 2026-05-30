"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "book-detail",
  setup(__props) {
    const currentPages = getCurrentPages();
    let bookName = "本草纲目";
    let authorName = "李时珍撰写 药学著作";
    if (currentPages.length > 0) {
      const currentPage = currentPages[currentPages.length - 1];
      const options = currentPage.options;
      if (options != null) {
        if (options["name"] != null) {
          bookName = decodeURIComponent(options["name"]);
        }
        if (options["author"] != null) {
          authorName = decodeURIComponent(options["author"]);
        }
      }
    }
    const bookTitle = common_vendor.ref(bookName);
    const bookAuthor = common_vendor.ref(authorName);
    const drawerVisible = common_vendor.ref(false);
    const currentPanel = common_vendor.ref("catalog");
    const catalogItems = common_vendor.ref([
      new UTSJSONObject({ id: "c1", title: "第 1 节：露水" }),
      new UTSJSONObject({ id: "c2", title: "第 2 节：露水" }),
      new UTSJSONObject({ id: "c3", title: "第 3 节：露水" }),
      new UTSJSONObject({ id: "c4", title: "第 4 节：露水" }),
      new UTSJSONObject({ id: "c5", title: "第 5 节：露水" }),
      new UTSJSONObject({ id: "c6", title: "第 6 节：露水" }),
      new UTSJSONObject({ id: "c7", title: "第 7 节：露水" }),
      new UTSJSONObject({ id: "c8", title: "第 8 节：露水" }),
      new UTSJSONObject({ id: "c9", title: "第 9 节：露水" }),
      new UTSJSONObject({ id: "c10", title: "第 10 节：露水" })
    ]);
    const bookmarkItems = common_vendor.ref([
      new UTSJSONObject({ id: "b1", content: "午刻黄水从小便排出。见效占位内容一…", progress: "12%" }),
      new UTSJSONObject({ id: "b2", content: "午刻黄水从小表排除。见效占位内容二…", progress: "12%" }),
      new UTSJSONObject({ id: "b3", content: "午刻黄水从小表排除。见效占位内容三…", progress: "12%" }),
      new UTSJSONObject({ id: "b4", content: "午刻黄水从小表排除。见效占位内容四…", progress: "12%" }),
      new UTSJSONObject({ id: "b5", content: "午刻黄水从小表排除。见效占位内容五…", progress: "12%" }),
      new UTSJSONObject({ id: "b6", content: "午刻黄水从小表排除。见效占位内容六…", progress: "12%" })
    ]);
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    const hideDrawer = () => {
      drawerVisible.value = false;
    };
    const switchPanel = (panel) => {
      currentPanel.value = panel;
    };
    const toggleDrawer = (panel) => {
      if (drawerVisible.value && currentPanel.value == panel) {
        drawerVisible.value = false;
        return null;
      }
      currentPanel.value = panel;
      drawerVisible.value = true;
    };
    const goExamPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/exam/index?sourceType=book&sourceId=book-demo&sourceName=" + encodeURIComponent(bookTitle.value)
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: common_vendor.t(common_vendor.unref(bookTitle)),
        d: common_vendor.o(hideDrawer),
        e: common_vendor.unref(drawerVisible)
      }, common_vendor.unref(drawerVisible) ? {
        f: common_vendor.o(hideDrawer)
      } : {}, {
        g: common_vendor.unref(drawerVisible)
      }, common_vendor.unref(drawerVisible) ? common_vendor.e({
        h: common_vendor.t(common_vendor.unref(bookTitle)),
        i: common_vendor.t(common_vendor.unref(bookAuthor)),
        j: common_vendor.unref(currentPanel) == "catalog" ? 1 : "",
        k: common_vendor.unref(currentPanel) == "catalog"
      }, common_vendor.unref(currentPanel) == "catalog" ? {} : {}, {
        l: common_vendor.o(($event) => {
          return switchPanel("catalog");
        }),
        m: common_vendor.unref(currentPanel) == "bookmark" ? 1 : "",
        n: common_vendor.unref(currentPanel) == "bookmark"
      }, common_vendor.unref(currentPanel) == "bookmark" ? {} : {}, {
        o: common_vendor.o(($event) => {
          return switchPanel("bookmark");
        }),
        p: common_vendor.unref(currentPanel) == "catalog"
      }, common_vendor.unref(currentPanel) == "catalog" ? {
        q: common_vendor.f(common_vendor.unref(catalogItems), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id
          };
        })
      } : {
        r: common_vendor.f(common_vendor.unref(bookmarkItems), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.content),
            b: common_vendor.t(item.progress),
            c: item.id
          };
        })
      }) : {}, {
        s: common_vendor.unref(drawerVisible) && common_vendor.unref(currentPanel) == "catalog" ? "/static/reader/icon_mulu_active.png" : "/static/reader/icon_mulu.png",
        t: common_vendor.unref(drawerVisible) && common_vendor.unref(currentPanel) == "catalog" ? 1 : "",
        v: common_vendor.o(($event) => {
          return toggleDrawer("catalog");
        }),
        w: common_vendor.unref(drawerVisible) && common_vendor.unref(currentPanel) == "bookmark" ? "/static/reader/icon_shuqiandibu_active.png" : "/static/reader/icon_shuqiandibu.png",
        x: common_vendor.unref(drawerVisible) && common_vendor.unref(currentPanel) == "bookmark" ? 1 : "",
        y: common_vendor.o(($event) => {
          return toggleDrawer("bookmark");
        }),
        z: common_assets._imports_1$6,
        A: common_assets._imports_2$1,
        B: common_vendor.o(goExamPage),
        C: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/knowledge/book-detail.js.map
