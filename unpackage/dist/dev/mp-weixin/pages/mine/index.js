"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class MineMenuItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          label: { type: String, optional: false },
          icon: { type: String, optional: false }
        };
      },
      name: "MineMenuItem"
    };
  }
  constructor(options, metadata = MineMenuItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.label = this.__props__.label;
    this.icon = this.__props__.icon;
    delete this.__props__;
  }
}
const defaultAvatar = "/static/mine/avatar.png";
const defaultNickname = "微信用户";
const certifiedText = "学员认证";
const uncertifiedText = "学员未认证";
const footerLineOne = "版权所属";
const footerLineTwo = "江苏凤凰科学技术出版社有限公司";
const profileLabel = "个人资料";
const certificationLabel = "学员认证";
const favoritesLabel = "我的收藏";
const historyLabel = "学习历史";
const feedbackLabel = "意见反馈";
const logoutLabel = "退出登录";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const nickname = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("");
    const userTypeText = common_vendor.ref("（普通用户）");
    const studentNo = common_vendor.ref("");
    const isCertified = common_vendor.ref(false);
    const isLoggedIn = common_vendor.ref(utils_auth.hasToken());
    const menuItems = common_vendor.ref([
      new MineMenuItem({ label: profileLabel, icon: "/static/mine/icon_about.png" }),
      new MineMenuItem({ label: certificationLabel, icon: "/static/mine/icon_about.png" }),
      new MineMenuItem({ label: favoritesLabel, icon: "/static/mine/icon_favorite.png" }),
      new MineMenuItem({ label: historyLabel, icon: "/static/mine/icon_history.png" }),
      new MineMenuItem({ label: feedbackLabel, icon: "/static/mine/icon_about.png" }),
      new MineMenuItem({ label: logoutLabel, icon: "/static/mine/icon_about.png" })
    ]);
    const loadUserData = () => {
      isLoggedIn.value = utils_auth.hasToken();
      if (!isLoggedIn.value) {
        common_vendor.index.reLaunch({
          url: "/pages/login/index"
        });
        return null;
      }
      const cached = utils_auth.getCurrentUserFromStorage();
      if (cached != null) {
        nickname.value = cached.nickname;
        avatarUrl.value = cached.avatarUrl;
        isCertified.value = cached.certificationStatus == "2";
      }
      utils_auth.fetchProfile((profile) => {
        nickname.value = profile.nickname;
        avatarUrl.value = profile.avatarUrl;
        studentNo.value = profile.studentId != 0 ? "学员" : "";
        isCertified.value = profile.certificationStatus == "2";
        userTypeText.value = profile.certificationStatus == "2" ? "（已认证）" : "（未认证）";
      }, () => {
      });
    };
    const handleMenuClick = (label) => {
      if (label == profileLabel) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/edit"
        });
        return null;
      }
      if (label == certificationLabel) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/certification"
        });
        return null;
      }
      if (label == favoritesLabel) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/favorites"
        });
        return null;
      }
      if (label == historyLabel) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/history"
        });
        return null;
      }
      if (label == feedbackLabel) {
        common_vendor.index.navigateTo({
          url: "/pages/profile/feedback"
        });
        return null;
      }
      if (label == logoutLabel) {
        utils_auth.logout(() => {
          common_vendor.index.reLaunch({
            url: "/pages/login/index"
          });
        }, (message) => {
          common_vendor.index.showToast({
            title: message,
            icon: "none"
          });
        });
      }
    };
    const goLearningHome = () => {
      common_vendor.index.redirectTo({
        url: "/pages/index/index"
      });
    };
    const goExamPage = () => {
      common_vendor.index.redirectTo({
        url: "/pages/exam/index"
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
    loadUserData();
    common_vendor.onShow(() => {
      loadUserData();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$2,
        b: avatarUrl.value || defaultAvatar,
        c: common_vendor.t(nickname.value.length > 0 ? nickname.value : defaultNickname),
        d: common_vendor.t(userTypeText.value),
        e: common_vendor.t(studentNo.value),
        f: isCertified.value
      }, isCertified.value ? {
        g: common_vendor.t(certifiedText)
      } : {
        h: common_vendor.t(uncertifiedText)
      }, {
        i: common_vendor.f(menuItems.value, (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => {
              return handleMenuClick(item.label);
            }, item.label)
          };
        }),
        j: common_assets._imports_1$1,
        k: common_vendor.t(footerLineOne),
        l: common_vendor.t(footerLineTwo),
        m: common_assets._imports_2,
        n: common_vendor.o(goLearningHome),
        o: common_assets._imports_2$1,
        p: common_vendor.o(goExamPage),
        q: common_assets._imports_4,
        r: common_vendor.o(goConsultPage),
        s: common_assets._imports_5,
        t: common_vendor.o(goKnowledgePage),
        v: common_assets._imports_6,
        w: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
