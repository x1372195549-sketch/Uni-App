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
          email: { type: String, optional: false },
          profileSignature: { type: String, optional: false }
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
    this.email = this.__props__.email;
    this.profileSignature = this.__props__.profileSignature;
    delete this.__props__;
  }
}
class AvatarMeta extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          originalName: { type: String, optional: false },
          contentType: { type: String, optional: false },
          fileSize: { type: Number, optional: false }
        };
      },
      name: "AvatarMeta"
    };
  }
  constructor(options, metadata = AvatarMeta.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.originalName = this.__props__.originalName;
    this.contentType = this.__props__.contentType;
    this.fileSize = this.__props__.fileSize;
    delete this.__props__;
  }
}
const storageKey = "profile_edit_form";
const defaultAvatar = "/static/mine/avatar.png";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "edit",
  setup(__props) {
    const genderOptions = ["男", "女"];
    const isSaving = common_vendor.ref(false);
    const selectedAvatarMeta = common_vendor.ref(null);
    const form = common_vendor.ref(new ProfileForm({
      avatarUrl: defaultAvatar,
      nickname: "",
      gender: "",
      email: "",
      profileSignature: ""
    }));
    const genderMap = new UTSJSONObject({
      "男": "1",
      "女": "2"
    });
    const genderReverseMap = new UTSJSONObject({
      "1": "男",
      "2": "女"
    });
    const isRemoteAvatarUrl = (value) => {
      if (value == null || value == "") {
        return false;
      }
      return /^https?:\/\//.test(value);
    };
    const getFileNameFromPath = (filePath) => {
      if (filePath == null || filePath == "") {
        return "avatar.jpg";
      }
      const parts = filePath.split("/");
      if (parts.length > 0) {
        const last = parts[parts.length - 1];
        if (last != null && last != "") {
          return last;
        }
      }
      return "avatar.jpg";
    };
    const getContentTypeFromFileName = (fileName) => {
      const lower = fileName.toLowerCase();
      if (lower.endsWith(".png")) {
        return "image/png";
      }
      if (lower.endsWith(".gif")) {
        return "image/gif";
      }
      if (lower.endsWith(".webp")) {
        return "image/webp";
      }
      return "image/jpeg";
    };
    const buildAvatarMeta = (filePath, fileSize) => {
      const originalName = getFileNameFromPath(filePath);
      return new AvatarMeta({
        originalName,
        contentType: getContentTypeFromFileName(originalName),
        fileSize: fileSize > 0 ? fileSize : 1024
      });
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
      }
      utils_auth.fetchProfile((profile) => {
        form.value.nickname = profile.nickname || form.value.nickname;
        form.value.avatarUrl = profile.avatarUrl || form.value.avatarUrl;
        form.value.email = profile.email || form.value.email;
        form.value.profileSignature = profile.profileSignature || form.value.profileSignature;
        const g = genderReverseMap[profile.gender];
        if (g) {
          form.value.gender = g;
        }
        saveProfileLocal();
      }, () => {
      });
    };
    const handleChooseAvatar = () => {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album"],
        success: (res) => {
          if (res.tempFilePaths != null && res.tempFilePaths.length > 0) {
            form.value.avatarUrl = res.tempFilePaths[0];
            if (res.tempFiles != null && res.tempFiles.length > 0) {
              const tempFile = res.tempFiles[0];
              selectedAvatarMeta.value = buildAvatarMeta(res.tempFilePaths[0], tempFile.size);
              return null;
            }
            selectedAvatarMeta.value = buildAvatarMeta(res.tempFilePaths[0], 1024);
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
    const saveProfileLocal = () => {
      common_vendor.index.setStorageSync(storageKey, form.value);
    };
    const uploadAvatarIfNeeded = (success, fail) => {
      const currentAvatar = form.value.avatarUrl || "";
      if (currentAvatar == "" || currentAvatar == defaultAvatar || isRemoteAvatarUrl(currentAvatar)) {
        success(currentAvatar, false);
        return null;
      }
      utils_auth.requestAvatarUploadUrl(new utils_auth.AvatarUploadUrlRequest({
        originalName: selectedAvatarMeta.value != null ? selectedAvatarMeta.value.originalName : getFileNameFromPath(currentAvatar),
        contentType: selectedAvatarMeta.value != null ? selectedAvatarMeta.value.contentType : getContentTypeFromFileName(getFileNameFromPath(currentAvatar)),
        fileSize: selectedAvatarMeta.value != null ? selectedAvatarMeta.value.fileSize : 1024
      }), (uploadConfig) => {
        utils_auth.uploadAvatarBinaryFile(currentAvatar, uploadConfig, new utils_auth.AvatarBinaryUploadConfig({
          contentType: selectedAvatarMeta.value != null ? selectedAvatarMeta.value.contentType : getContentTypeFromFileName(getFileNameFromPath(currentAvatar))
        }), () => {
          const originalName = getFileNameFromPath(currentAvatar);
          utils_auth.confirmAvatarUpload(new utils_auth.AvatarConfirmRequest({
            objectKey: uploadConfig.objectKey,
            originalName
          }), (result) => {
            const remoteAvatarUrl = result.avatarUrl || uploadConfig.publicUrl;
            if (remoteAvatarUrl == "") {
              fail("头像上传确认成功，但未返回头像地址");
              return null;
            }
            form.value.avatarUrl = remoteAvatarUrl;
            selectedAvatarMeta.value = null;
            success(remoteAvatarUrl, true);
          }, (message) => {
            fail(message || "头像上传确认失败");
          });
        }, (message) => {
          fail(message || "头像上传失败");
        });
      }, (message) => {
        fail(message || "头像上传地址获取失败");
      });
    };
    const handleSave = () => {
      if (isSaving.value) {
        return null;
      }
      isSaving.value = true;
      uploadAvatarIfNeeded((remoteAvatarUrl, didUploadAvatar) => {
        const genderCode = genderMap[form.value.gender];
        utils_auth.updateProfile(new UTSJSONObject({
          nickname: form.value.nickname,
          profileSignature: form.value.profileSignature,
          email: form.value.email,
          gender: genderCode
        }), () => {
          if (didUploadAvatar && remoteAvatarUrl != "") {
            utils_auth.fetchProfile((profile) => {
              saveProfileLocal();
              isSaving.value = false;
              if (profile.avatarUrl == remoteAvatarUrl) {
                common_vendor.index.showToast({
                  title: "头像已上传并入库",
                  icon: "success"
                });
                return null;
              }
              common_vendor.index.showToast({
                title: "头像文件已上传，但后端资料未更新",
                icon: "none"
              });
            }, () => {
              saveProfileLocal();
              isSaving.value = false;
              common_vendor.index.showToast({
                title: "资料已保存，头像上传结果待确认",
                icon: "none"
              });
            });
            return null;
          }
          saveProfileLocal();
          isSaving.value = false;
          common_vendor.index.showToast({
            title: "已保存",
            icon: "success"
          });
        }, (message) => {
          isSaving.value = false;
          common_vendor.index.showToast({
            title: message,
            icon: "none"
          });
        });
      }, (message) => {
        isSaving.value = false;
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
        c: common_vendor.unref(form).avatarUrl || defaultAvatar,
        d: common_vendor.o(handleChooseAvatar),
        e: common_vendor.unref(form).nickname,
        f: common_vendor.o(($event) => {
          return common_vendor.unref(form).nickname = $event.detail.value;
        }),
        g: common_vendor.t(common_vendor.unref(form).gender || "请选择"),
        h: common_vendor.o(handleChooseGender),
        i: common_vendor.unref(form).email,
        j: common_vendor.o(($event) => {
          return common_vendor.unref(form).email = $event.detail.value;
        }),
        k: common_vendor.unref(form).profileSignature,
        l: common_vendor.o(($event) => {
          return common_vendor.unref(form).profileSignature = $event.detail.value;
        }),
        m: common_vendor.t(common_vendor.unref(isSaving) ? "保存中..." : "保存"),
        n: common_vendor.o(handleSave),
        o: common_vendor.unref(isSaving),
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/edit.js.map
