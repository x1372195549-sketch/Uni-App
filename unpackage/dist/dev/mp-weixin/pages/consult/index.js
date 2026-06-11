"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class CategoryItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          key: { type: String, optional: false },
          categoryId: { type: Number, optional: false },
          specialty: { type: String, optional: false },
          name: { type: String, optional: false }
        };
      },
      name: "CategoryItem"
    };
  }
  constructor(options, metadata = CategoryItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.key = this.__props__.key;
    this.categoryId = this.__props__.categoryId;
    this.specialty = this.__props__.specialty;
    this.name = this.__props__.name;
    delete this.__props__;
  }
}
class ExpertCard extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          name: { type: String, optional: false },
          shortName: { type: String, optional: false },
          title: { type: String, optional: false },
          organization: { type: String, optional: false },
          specialty: { type: String, optional: false },
          avatarUrl: { type: String, optional: false },
          consultationNotice: { type: String, optional: false },
          avatarFailed: { type: Boolean, optional: false }
        };
      },
      name: "ExpertCard"
    };
  }
  constructor(options, metadata = ExpertCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.name = this.__props__.name;
    this.shortName = this.__props__.shortName;
    this.title = this.__props__.title;
    this.organization = this.__props__.organization;
    this.specialty = this.__props__.specialty;
    this.avatarUrl = this.__props__.avatarUrl;
    this.consultationNotice = this.__props__.consultationNotice;
    this.avatarFailed = this.__props__.avatarFailed;
    delete this.__props__;
  }
}
const PAGE_SIZE = 12;
const CATEGORY_FETCH_SIZE = 100;
const pageTitleText = "咨询";
const searchPlaceholder = "搜索专家姓名、职称、机构";
const searchButtonText = "搜索";
const allCategoryText = "全部";
const loadingText = "加载中...";
const retryText = "重新加载";
const emptyExpertText = "暂无专家";
const loadingMoreText = "加载更多中...";
const noMoreText = "没有更多了";
const loadFailedText = "专家加载失败";
const myQuestionsText = "我的咨询";
const learningText = "学习";
const examText = "考核";
const consultText = "咨询";
const knowledgeText = "知识库";
const mineText = "我的";
const fallbackShortName = "医";
const fallbackExpertName = "专家";
const fallbackCategoryPrefix = "专业分类";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const searchKeyword = common_vendor.ref("");
    const selectedCategoryKey = common_vendor.ref("all");
    const selectedCategoryId = common_vendor.ref(0);
    const selectedCategorySpecialty = common_vendor.ref("");
    const categoryItems = common_vendor.ref([]);
    const expertItems = common_vendor.ref([]);
    const page = common_vendor.ref(1);
    const hasMore = common_vendor.ref(true);
    const isLoading = common_vendor.ref(true);
    const isListLoading = common_vendor.ref(false);
    const isRefreshing = common_vendor.ref(false);
    const errorText = common_vendor.ref("");
    const safeText = (value = null) => {
      return value == null || value.length == 0 ? "" : value;
    };
    const sanitizeAvatarUrl = (value) => {
      const avatar = utils_auth.normalizeAppUrl(safeText(value));
      if (avatar.length == 0) {
        return "";
      }
      if (avatar.indexOf("example.com") >= 0) {
        return "";
      }
      return avatar;
    };
    const toShortName = (name) => {
      const text = safeText(name);
      return text.length > 0 ? text.substring(0, 1) : fallbackShortName;
    };
    const sortCategoryItems = () => {
      categoryItems.value = categoryItems.value.slice().sort((left, right) => {
        if (left.categoryId > 0 && right.categoryId > 0) {
          return left.categoryId - right.categoryId;
        }
        return left.name.localeCompare(right.name);
      });
    };
    const resolveCategoryName = (detail, categoryId) => {
      const specialty = safeText(detail.specialty);
      if (specialty.length > 0) {
        return specialty;
      }
      const title = safeText(detail.title);
      if (title.length > 0) {
        return title;
      }
      return fallbackCategoryPrefix + " " + String(categoryId);
    };
    const appendCategoryItems = (detail) => {
      const ids = detail.categoryIds != null ? detail.categoryIds : [];
      if (ids.length > 0) {
        ids.forEach((categoryId) => {
          if (categoryId <= 0) {
            return null;
          }
          if (categoryItems.value.some((item) => {
            return item.categoryId == categoryId;
          })) {
            return null;
          }
          categoryItems.value.push({
            key: "id:" + String(categoryId),
            categoryId,
            specialty: "",
            name: resolveCategoryName(detail, categoryId)
          });
        });
        return null;
      }
      const specialty = safeText(detail.specialty);
      if (specialty.length == 0) {
        return null;
      }
      if (categoryItems.value.some((item) => {
        return item.specialty == specialty;
      })) {
        return null;
      }
      categoryItems.value.push({
        key: "sp:" + specialty,
        categoryId: 0,
        specialty,
        name: specialty
      });
    };
    const filterExpertsBySelectedCategory = (records) => {
      if (selectedCategoryId.value > 0) {
        return records;
      }
      if (selectedCategorySpecialty.value.length == 0) {
        return records;
      }
      return records.filter((item) => {
        return safeText(item.specialty) == selectedCategorySpecialty.value;
      });
    };
    const resolveRequestPage = (loadMoreValue) => {
      if (selectedCategoryId.value == 0 && selectedCategorySpecialty.value.length > 0) {
        return 1;
      }
      return loadMoreValue ? page.value : 1;
    };
    const resolveRequestSize = () => {
      if (selectedCategoryId.value == 0 && selectedCategorySpecialty.value.length > 0) {
        return CATEGORY_FETCH_SIZE;
      }
      return PAGE_SIZE;
    };
    const resetSelection = () => {
      selectedCategoryKey.value = "all";
      selectedCategoryId.value = 0;
      selectedCategorySpecialty.value = "";
    };
    const applyCategorySelection = (item = null) => {
      if (item == null) {
        resetSelection();
        return null;
      }
      selectedCategoryKey.value = item.key;
      selectedCategoryId.value = item.categoryId;
      selectedCategorySpecialty.value = item.specialty;
    };
    const rebuildCategories = (records) => {
      categoryItems.value = [];
      records.forEach((detail) => {
        appendCategoryItems(detail);
      });
      sortCategoryItems();
    };
    const mapExpert = (detail) => {
      return new ExpertCard({
        id: detail.id,
        name: safeText(detail.realName).length > 0 ? safeText(detail.realName) : fallbackExpertName,
        shortName: toShortName(detail.realName),
        title: safeText(detail.title),
        organization: safeText(detail.organization),
        specialty: safeText(detail.specialty),
        avatarUrl: sanitizeAvatarUrl(detail.avatarUrl),
        consultationNotice: safeText(detail.consultationNotice),
        avatarFailed: false
      });
    };
    const loadCategories = () => {
      utils_auth.fetchExperts(1, CATEGORY_FETCH_SIZE, "", 0, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        rebuildCategories(records);
      }, () => {
      });
    };
    const loadExperts = (loadMoreValue) => {
      if (!loadMoreValue) {
        page.value = 1;
        hasMore.value = true;
        errorText.value = "";
        isLoading.value = !isRefreshing.value;
      } else {
        if (!hasMore.value || isListLoading.value) {
          return null;
        }
        isListLoading.value = true;
      }
      utils_auth.fetchExperts(resolveRequestPage(loadMoreValue), resolveRequestSize(), searchKeyword.value, selectedCategoryId.value, (pageData) => {
        const records = pageData.records != null ? pageData.records : [];
        const filteredRecords = filterExpertsBySelectedCategory(records);
        const mapped = filteredRecords.map((item) => {
          return mapExpert(item);
        });
        if (loadMoreValue) {
          expertItems.value = expertItems.value.concat(mapped);
        } else {
          expertItems.value = mapped;
        }
        if (categoryItems.value.length == 0) {
          rebuildCategories(records);
        }
        hasMore.value = selectedCategorySpecialty.value.length == 0 && mapped.length >= PAGE_SIZE;
        if (hasMore.value) {
          page.value += 1;
        }
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      }, (message) => {
        errorText.value = message.length > 0 ? message : loadFailedText;
        isLoading.value = false;
        isListLoading.value = false;
        isRefreshing.value = false;
      });
    };
    const handleSearch = () => {
      loadExperts(false);
    };
    const reloadExperts = () => {
      loadExperts(false);
    };
    const refreshExperts = () => {
      if (isRefreshing.value) {
        return null;
      }
      isRefreshing.value = true;
      loadCategories();
      loadExperts(false);
    };
    const selectCategory = (item) => {
      if (typeof item == "number" && item == 0) {
        resetSelection();
        loadExperts(false);
        return null;
      }
      if (typeof item != "number") {
        applyCategorySelection(item);
      }
      loadExperts(false);
    };
    const loadMore = () => {
      loadExperts(true);
    };
    const handleAvatarError = (id) => {
      expertItems.value = expertItems.value.map((item) => {
        if (item.id != id) {
          return item;
        }
        return new ExpertCard({
          id: item.id,
          name: item.name,
          shortName: item.shortName,
          title: item.title,
          organization: item.organization,
          specialty: item.specialty,
          avatarUrl: "",
          consultationNotice: item.consultationNotice,
          avatarFailed: true
        });
      });
    };
    const goDoctorDetail = (doctor) => {
      common_vendor.index.navigateTo({
        url: "/pages/consult/detail?id=" + String(doctor.id) + "&name=" + encodeURIComponent(doctor.name) + "&title=" + encodeURIComponent(doctor.title) + "&organization=" + encodeURIComponent(doctor.organization) + "&specialty=" + encodeURIComponent(doctor.specialty) + "&tag=" + encodeURIComponent(doctor.consultationNotice)
      });
    };
    const goMyQuestions = () => {
      common_vendor.index.navigateTo({ url: "/pages/consult/questions" });
    };
    const goLearningPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/index/index" });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({ url: "/pages/exam/index" });
    };
    const goKnowledgePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/knowledge/index" });
    };
    const goMinePage = () => {
      common_vendor.index.redirectTo({ url: "/pages/mine/index" });
    };
    loadCategories();
    loadExperts(false);
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$3,
        b: common_vendor.t(pageTitleText),
        c: searchPlaceholder,
        d: common_vendor.o(handleSearch),
        e: searchKeyword.value,
        f: common_vendor.o(($event) => {
          return searchKeyword.value = $event.detail.value;
        }),
        g: common_vendor.t(searchButtonText),
        h: common_vendor.o(handleSearch),
        i: selectedCategoryId.value == 0
      }, selectedCategoryId.value == 0 ? {} : {}, {
        j: common_vendor.t(allCategoryText),
        k: selectedCategoryId.value == 0 ? 1 : "",
        l: selectedCategoryId.value == 0 ? 1 : "",
        m: common_vendor.o(($event) => {
          return selectCategory(0);
        }),
        n: common_vendor.f(categoryItems.value, (item, k0, i0) => {
          return common_vendor.e({
            a: selectedCategoryKey.value == item.key
          }, selectedCategoryKey.value == item.key ? {} : {}, {
            b: common_vendor.t(item.name),
            c: selectedCategoryKey.value == item.key ? 1 : "",
            d: item.key,
            e: selectedCategoryKey.value == item.key ? 1 : "",
            f: common_vendor.o(($event) => {
              return selectCategory(item);
            }, item.key)
          });
        }),
        o: isLoading.value
      }, isLoading.value ? {
        p: common_vendor.t(loadingText)
      } : errorText.value.length > 0 ? {
        r: common_vendor.t(errorText.value),
        s: common_vendor.t(retryText),
        t: common_vendor.o(reloadExperts)
      } : expertItems.value.length == 0 ? {
        w: common_vendor.t(emptyExpertText)
      } : common_vendor.e({
        x: common_vendor.f(expertItems.value, (doctor, k0, i0) => {
          return common_vendor.e({
            a: doctor.avatarUrl.length > 0 && !doctor.avatarFailed
          }, doctor.avatarUrl.length > 0 && !doctor.avatarFailed ? {
            b: doctor.avatarUrl,
            c: common_vendor.o(($event) => {
              return handleAvatarError(doctor.id);
            }, doctor.id)
          } : {
            d: common_vendor.t(doctor.shortName)
          }, {
            e: common_vendor.t(doctor.name),
            f: common_vendor.t(doctor.title),
            g: common_vendor.t(doctor.organization),
            h: common_vendor.t(doctor.specialty),
            i: doctor.id,
            j: common_vendor.o(($event) => {
              return goDoctorDetail(doctor);
            }, doctor.id)
          });
        }),
        y: isListLoading.value
      }, isListLoading.value ? {
        z: common_vendor.t(loadingMoreText)
      } : !hasMore.value ? {
        B: common_vendor.t(noMoreText)
      } : {}, {
        A: !hasMore.value
      }), {
        q: errorText.value.length > 0,
        v: expertItems.value.length == 0,
        C: isRefreshing.value,
        D: common_vendor.o(refreshExperts),
        E: common_vendor.o(loadMore),
        F: common_vendor.t(myQuestionsText),
        G: common_vendor.o(goMyQuestions),
        H: common_assets._imports_2,
        I: common_vendor.t(learningText),
        J: common_vendor.o(goLearningPage),
        K: common_assets._imports_2$1,
        L: common_vendor.t(examText),
        M: common_vendor.o(goExamPage),
        N: common_assets._imports_3,
        O: common_vendor.t(consultText),
        P: common_assets._imports_5,
        Q: common_vendor.t(knowledgeText),
        R: common_vendor.o(goKnowledgePage),
        S: common_assets._imports_6$1,
        T: common_vendor.t(mineText),
        U: common_vendor.o(goMinePage),
        V: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/consult/index.js.map
