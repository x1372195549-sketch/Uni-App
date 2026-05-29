"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class AudioItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          coverTitle: { type: String, optional: false },
          coverSubtitle: { type: String, optional: false },
          title: { type: String, optional: false },
          teacher: { type: String, optional: false },
          views: { type: String, optional: false },
          comments: { type: String, optional: false }
        };
      },
      name: "AudioItem"
    };
  }
  constructor(options, metadata = AudioItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.coverTitle = this.__props__.coverTitle;
    this.coverSubtitle = this.__props__.coverSubtitle;
    this.title = this.__props__.title;
    this.teacher = this.__props__.teacher;
    this.views = this.__props__.views;
    this.comments = this.__props__.comments;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const audioItems = common_vendor.ref([
      new AudioItem({
        id: "1",
        coverTitle: "音频封面占位",
        coverSubtitle: "第一条音频",
        title: "音频标题占位一，点击进入音频详情页面",
        teacher: "讲师名称占位",
        views: "1200",
        comments: "320"
      }),
      new AudioItem({
        id: "2",
        coverTitle: "音频封面占位",
        coverSubtitle: "第二条音频",
        title: "音频标题占位二，点击进入音频详情页面",
        teacher: "讲师名称占位",
        views: "1200",
        comments: "320"
      })
    ]);
    const goLearningPage = () => {
      common_vendor.index.reLaunch({ url: "/pages/index/index" });
    };
    const goLivePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/live/index" });
    };
    const goCoursePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/course/index" });
    };
    const goNewsPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/news/index" });
    };
    const goMinePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/mine/index" });
    };
    const goAudioDetail = (id) => {
      common_vendor.index.navigateTo({ url: "/pages/audio/detail?id=" + id });
    };
    const goKnowledgePage = () => {
      common_vendor.index.navigateTo({ url: "/pages/knowledge/index" });
    };
    const goConsultPage = () => {
      common_vendor.index.navigateTo({ url: "/pages/consult/index" });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_1$3,
        b: common_vendor.o(goLearningPage),
        c: common_vendor.o(goLivePage),
        d: common_vendor.o(goCoursePage),
        e: common_vendor.o(goNewsPage),
        f: common_vendor.f(common_vendor.unref(audioItems), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.coverTitle),
            b: common_vendor.t(item.coverSubtitle),
            c: common_vendor.t(item.title),
            d: common_vendor.t(item.teacher),
            e: common_vendor.t(item.views),
            f: common_vendor.t(item.comments),
            g: item.id,
            h: common_vendor.o(($event) => {
              return goAudioDetail(item.id);
            }, item.id)
          };
        }),
        g: common_assets._imports_1$5,
        h: common_assets._imports_2,
        i: common_assets._imports_3,
        j: common_vendor.o(goConsultPage),
        k: common_assets._imports_4,
        l: common_vendor.o(goKnowledgePage),
        m: common_assets._imports_5,
        n: common_vendor.o(goMinePage),
        o: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audio/index.js.map
