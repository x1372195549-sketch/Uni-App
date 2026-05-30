"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class ProfileForm extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          avatarUrl: { type: String, optional: false },
          nickname: { type: String, optional: false },
          gender: { type: String, optional: false },
          age: { type: String, optional: false },
          education: { type: String, optional: false },
          practiceType: { type: String, optional: false },
          organization: { type: String, optional: false },
          phone: { type: String, optional: false }
        };
      },
      name: "ProfileForm"
    };
  }
  constructor(options, metadata = ProfileForm.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.avatarUrl = this.__props__.avatarUrl;
    this.nickname = this.__props__.nickname;
    this.gender = this.__props__.gender;
    this.age = this.__props__.age;
    this.education = this.__props__.education;
    this.practiceType = this.__props__.practiceType;
    this.organization = this.__props__.organization;
    this.phone = this.__props__.phone;
    delete this.__props__;
  }
}
const storageKey = "profile_edit_form";
const defaultAvatar = "/static/mine/avatar.png";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "edit",
  setup(__props) {
    const educationOptions = ["小学", "初中", "高中", "专科", "本科", "研究生", "博士"];
    const genderOptions = ["男", "女"];
    const form = common_vendor.ref(new ProfileForm({
      avatarUrl: defaultAvatar,
      nickname: "",
      gender: "",
      age: "",
      education: "",
      practiceType: "",
      organization: "",
      phone: ""
    }));
    const genderMap = new UTSJSONObject({
      "男": "1",
      "女": "2"
    });
    const genderReverseMap = new UTSJSONObject({
      "1": "男",
      "2": "女"
    });
    const digitsOnly = (value) => {
      return value.replace(/[^0-9]/g, "");
    };
    const isValidPhone = (value) => {
      return /^1\d{10}$/.test(value);
    };
    const handleBack = () => {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.navigateTo({
        url: "/pages/mine/index"
      });
    };
    const loadProfile = () => {
      const cached = common_vendor.index.getStorageSync(storageKey);
      if (cached != null && cached != "") {
        form.value = cached;
        form.value.age = digitsOnly(form.value.age).slice(0, 3);
        form.value.phone = digitsOnly(form.value.phone).slice(0, 11);
      }
      utils_auth.fetchProfile((profile) => {
        form.value.nickname = profile.nickname || form.value.nickname;
        form.value.avatarUrl = profile.avatarUrl || form.value.avatarUrl;
        form.value.phone = profile.mobile || form.value.phone;
        const g = genderReverseMap[profile.gender];
        if (g) {
          form.value.gender = g;
        }
      }, () => {
      });
    };
    const handleAgeInput = () => {
      form.value.age = digitsOnly(form.value.age).slice(0, 3);
    };
    const handlePhoneInput = () => {
      form.value.phone = digitsOnly(form.value.phone).slice(0, 11);
    };
    const handleChooseAvatar = () => {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          if (res.tempFilePaths != null && res.tempFilePaths.length > 0) {
            form.value.avatarUrl = res.tempFilePaths[0];
          }
        }
      }));
    };
    const handleChooseGender = () => {
      common_vendor.index.showActionSheet({
        itemList: genderOptions,
        success: (res) => {
          form.value.gender = genderOptions[res.tapIndex];
        }
      });
    };
    const handleChooseEducation = () => {
      common_vendor.index.showActionSheet({
        itemList: educationOptions,
        success: (res) => {
          form.value.education = educationOptions[res.tapIndex];
        }
      });
    };
    const saveProfileLocal = () => {
      common_vendor.index.setStorageSync(storageKey, form.value);
    };
    const handleSave = () => {
      handleAgeInput();
      handlePhoneInput();
      if (form.value.age != "" && digitsOnly(form.value.age) != form.value.age) {
        common_vendor.index.showToast({
          title: "年龄只能填写数字",
          icon: "none"
        });
        return null;
      }
      if (form.value.phone != "" && !isValidPhone(form.value.phone)) {
        common_vendor.index.showToast({
          title: "联系电话需为11位手机号",
          icon: "none"
        });
        return null;
      }
      saveProfileLocal();
      const genderCode = genderMap[form.value.gender];
      utils_auth.updateProfile(new UTSJSONObject({
        nickname: form.value.nickname,
        avatarUrl: form.value.avatarUrl != defaultAvatar ? form.value.avatarUrl : void 0,
        gender: genderCode
      }), () => {
        common_vendor.index.showToast({
          title: "已保存",
          icon: "success"
        });
      }, (message) => {
        common_vendor.index.showToast({
          title: message,
          icon: "none"
        });
      });
    };
    loadProfile();
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = {
        a: common_assets._imports_0$1,
        b: common_vendor.o(handleBack),
        c: common_vendor.unref(form).avatarUrl,
        d: common_vendor.o(handleChooseAvatar),
        e: common_vendor.unref(form).nickname,
        f: common_vendor.o(($event) => {
          return common_vendor.unref(form).nickname = $event.detail.value;
        }),
        g: common_vendor.t(common_vendor.unref(form).gender || "请选择"),
        h: common_vendor.o(handleChooseGender),
        i: common_vendor.o([($event) => {
          return common_vendor.unref(form).age = $event.detail.value;
        }, handleAgeInput]),
        j: common_vendor.unref(form).age,
        k: common_vendor.t(common_vendor.unref(form).education || "请选择"),
        l: common_vendor.o(handleChooseEducation),
        m: common_vendor.unref(form).practiceType,
        n: common_vendor.o(($event) => {
          return common_vendor.unref(form).practiceType = $event.detail.value;
        }),
        o: common_vendor.unref(form).organization,
        p: common_vendor.o(($event) => {
          return common_vendor.unref(form).organization = $event.detail.value;
        }),
        q: common_vendor.o([($event) => {
          return common_vendor.unref(form).phone = $event.detail.value;
        }, handlePhoneInput]),
        r: common_vendor.unref(form).phone,
        s: common_vendor.o(handleSave),
        t: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/edit.js.map
