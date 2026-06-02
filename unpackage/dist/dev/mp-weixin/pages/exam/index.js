"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
class ExamPaperItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          questionCount: { type: Number, optional: false },
          durationMinutes: { type: Number, optional: false }
        };
      },
      name: "ExamPaperItem"
    };
  }
  constructor(options, metadata = ExamPaperItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.questionCount = this.__props__.questionCount;
    this.durationMinutes = this.__props__.durationMinutes;
    delete this.__props__;
  }
}
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const currentPages = getCurrentPages();
    let currentSourceName = "";
    if (currentPages.length > 0) {
      const currentPage = currentPages[currentPages.length - 1];
      const options = currentPage.options;
      if (options != null && options["sourceName"] != null) {
        currentSourceName = decodeURIComponent(options["sourceName"]);
      }
    }
    const sourceName = common_vendor.ref(currentSourceName);
    const papers = common_vendor.ref([
      new ExamPaperItem({ id: "paper-1", title: "实用中医方药学模拟练习卷", questionCount: 10, durationMinutes: 10 }),
      new ExamPaperItem({ id: "paper-2", title: "中医适宜技术模拟练习卷", questionCount: 10, durationMinutes: 10 }),
      new ExamPaperItem({ id: "paper-3", title: "实用中医理论基础模拟练习卷", questionCount: 10, durationMinutes: 10 }),
      new ExamPaperItem({ id: "paper-4", title: "实用针灸推拿学模拟练习卷", questionCount: 10, durationMinutes: 10 })
    ]);
    const goExamPaper = (paper) => {
      common_vendor.index.navigateTo({
        url: "/pages/exam/paper?id=" + paper.id + "&title=" + encodeURIComponent(paper.title)
      });
    };
    const goLearningHome = () => {
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    };
    const goConsultPage = () => {
      common_vendor.index.redirectTo({
        url: "/pages/consult/index"
      });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({
        url: "/pages/knowledge/index"
      });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({
        url: "/pages/mine/index"
      });
    };
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.unref(sourceName).length > 0
      }, common_vendor.unref(sourceName).length > 0 ? {
        c: common_vendor.t(common_vendor.unref(sourceName))
      } : {}, {
        d: common_vendor.f(common_vendor.unref(papers), (paper, k0, i0) => {
          return {
            a: common_vendor.t(paper.title),
            b: common_vendor.t(paper.questionCount),
            c: common_vendor.t(paper.durationMinutes),
            d: common_vendor.o(($event) => {
              return goExamPaper(paper);
            }, paper.id),
            e: paper.id
          };
        }),
        e: common_assets._imports_1$2,
        f: common_vendor.o(goLearningHome),
        g: common_assets._imports_2$1,
        h: common_assets._imports_3,
        i: common_vendor.o(goConsultPage),
        j: common_assets._imports_4,
        k: common_vendor.o(goKnowledgePage),
        l: common_assets._imports_5,
        m: common_vendor.o(goMinePage),
        n: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/exam/index.js.map
