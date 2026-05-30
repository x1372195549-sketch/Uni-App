"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "index",
  setup(__props) {
    const nickname = common_vendor.ref("");
    const avatarUrl = common_vendor.ref("");
    const userTypeText = common_vendor.ref("");
    const studentNo = common_vendor.ref("");
    const isCertified = common_vendor.ref(false);
    const isLoggedIn = common_vendor.ref(utils_auth.hasToken());
    const menuItems = common_vendor.ref([
      new UTSJSONObject({ label: "个人资料", icon: "/static/mine/icon_about.png" }),
      new UTSJSONObject({ label: "我的收藏", icon: "/static/mine/icon_favorite.png" }),
      new UTSJSONObject({ label: "学习历史", icon: "/static/mine/icon_history.png" }),
      new UTSJSONObject({ label: "意见反馈", icon: "/static/mine/icon_about.png" }),
      new UTSJSONObject({ label: "退出登录", icon: "/static/mine/icon_about.png" }),
      new UTSJSONObject({ label: "使用手册", icon: "/static/mine/icon_manual.png" })
    ]);
    const loadUserData = () => {
      if (!isLoggedIn.value) {
        common_vendor.index.reLaunch({
          url: "/pages/login/index"
        });
        return null;
      }
      const cached = utils_auth.getCurrentUserFromStorage();
      if (cached != null) {
        nickname.value = cached.nickname;
        isCertified.value = cached.certificationStatus == "2";
      }
      utils_auth.fetchProfile((profile) => {
        nickname.value = profile.nickname;
        avatarUrl.value = profile.avatarUrl;
        studentNo.value = profile.studentId != 0 ? "学员" : "";
        isCertified.value = profile.certificationStatus == "2";
        userTypeText.value = profile.profileCompleted ? "（已认证）" : "（普通用户）";
      }, () => {
      });
    };
    const goEditProfile = () => {
      common_vendor.index.navigateTo({
        url: "/pages/profile/edit"
      });
    };
    const handleMenuClick = (label) => {
      if (label == "个人资料") {
        goEditProfile();
        return null;
      }
      if (label == "退出登录") {
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
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
      });
    };
    const goConsultPage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/consult/index"
      });
    };
    const goKnowledgePage = () => {
      common_vendor.index.navigateTo({
        url: "/pages/knowledge/index"
      });
    };
    loadUserData();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$2,
        b: common_vendor.unref(avatarUrl) || "/static/mine/avatar.png",
        c: common_vendor.t(common_vendor.unref(nickname) || "微信用户"),
        d: common_vendor.t(common_vendor.unref(userTypeText)),
        e: common_vendor.t(common_vendor.unref(studentNo)),
        f: common_vendor.unref(isCertified)
      }, common_vendor.unref(isCertified) ? {} : {}, {
        g: common_vendor.f(common_vendor.unref(menuItems), (item, k0, i0) => {
          return {
            a: item.icon,
            b: common_vendor.t(item.label),
            c: item.label,
            d: common_vendor.o(($event) => {
              return handleMenuClick(item.label);
            }, item.label)
          };
        }),
        h: common_assets._imports_1$1,
        i: common_assets._imports_1$2,
        j: common_vendor.o(goLearningHome),
        k: common_assets._imports_2,
        l: common_vendor.o(goKnowledgePage),
        m: common_assets._imports_3,
        n: common_vendor.o(goConsultPage),
        o: common_assets._imports_4,
        p: common_assets._imports_6,
        q: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/index.js.map
