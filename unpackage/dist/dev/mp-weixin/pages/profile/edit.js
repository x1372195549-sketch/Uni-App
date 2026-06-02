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
    const pendingAvatarPath = common_vendor.ref("");
    const pendingAvatarMeta = common_vendor.ref(null);
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
    const getFileNameFromPath = (filePath) => {
      if (filePath == null || filePath == "") {
        return "avatar.jpg";
      }
      const normalizedPath = filePath.replace(/\\/g, "/");
      const parts = normalizedPath.split("/");
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
      if (lower.endsWith(".webp")) {
        return "image/webp";
      }
      return "image/jpeg";
    };
    const isSupportedAvatarContentType = (contentType) => {
      return contentType == "image/jpeg" || contentType == "image/png" || contentType == "image/webp";
    };
    const buildAvatarMeta = (filePath, fileSize) => {
      const originalName = getFileNameFromPath(filePath);
      return new AvatarMeta({
        originalName,
        contentType: getContentTypeFromFileName(originalName),
        fileSize: fileSize > 0 ? fileSize : 1024
      });
    };
    const saveProfileLocal = () => {
      common_vendor.index.setStorageSync(storageKey, form.value);
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
        form.value.avatarUrl = utils_auth.normalizeAppUrl(profile.avatarUrl) || form.value.avatarUrl;
        form.value.email = profile.email || form.value.email;
        form.value.profileSignature = profile.profileSignature || form.value.profileSignature;
        const mappedGender = genderReverseMap[profile.gender];
        if (mappedGender != null && mappedGender != "") {
          form.value.gender = mappedGender;
        }
        pendingAvatarPath.value = "";
        pendingAvatarMeta.value = null;
        saveProfileLocal();
      }, () => {
      });
    };
    const handleChooseAvatar = () => {
      common_vendor.index.chooseImage(new UTSJSONObject({
        count: 1,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          if (res.tempFilePaths == null || res.tempFilePaths.length == 0) {
            return null;
          }
          const filePath = res.tempFilePaths[0];
          const tempFile = res.tempFiles != null && res.tempFiles.length > 0 ? res.tempFiles[0] : null;
          const fileSize = tempFile != null ? tempFile.size : 0;
          const avatarMeta = buildAvatarMeta(filePath, fileSize);
          if (!isSupportedAvatarContentType(avatarMeta.contentType)) {
            common_vendor.index.showToast({
              title: "仅支持 JPG、PNG、WEBP",
              icon: "none"
            });
            return null;
          }
          if (avatarMeta.fileSize > 5 * 1024 * 1024) {
            common_vendor.index.showToast({
              title: "头像不能超过 5MB",
              icon: "none"
            });
            return null;
          }
          form.value.avatarUrl = filePath;
          pendingAvatarPath.value = filePath;
          pendingAvatarMeta.value = avatarMeta;
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
    const uploadAvatarIfNeeded = (success, fail) => {
      if (pendingAvatarPath.value == "") {
        success(form.value.avatarUrl || "", false);
        return null;
      }
      const meta = pendingAvatarMeta.value;
      if (meta == null) {
        fail("头像文件信息缺失");
        return null;
      }
      utils_auth.requestAvatarUploadUrl(new utils_auth.AvatarUploadUrlRequest({
        originalName: meta.originalName,
        contentType: meta.contentType,
        fileSize: meta.fileSize
      }), (uploadConfig) => {
        utils_auth.uploadAvatarBinaryFile(pendingAvatarPath.value, uploadConfig, new utils_auth.AvatarBinaryUploadConfig({
          contentType: meta.contentType
        }), () => {
          utils_auth.confirmAvatarUpload(new utils_auth.AvatarConfirmRequest({
            objectKey: uploadConfig.objectKey,
            originalName: meta.originalName
          }), (result) => {
            const remoteAvatarUrl = utils_auth.normalizeAppUrl(result.avatarUrl || uploadConfig.publicUrl);
            if (remoteAvatarUrl == "") {
              fail("头像上传成功，但未返回地址");
              return null;
            }
            form.value.avatarUrl = remoteAvatarUrl;
            pendingAvatarPath.value = "";
            pendingAvatarMeta.value = null;
            success(remoteAvatarUrl, true);
          }, (message) => {
            fail(message || "头像上传确认失败");
          });
        }, (message) => {
          fail(message || "头像文件上传失败");
        });
      }, (message) => {
        fail(message || "获取头像上传地址失败");
      });
    };
    const handleSave = () => {
      if (isSaving.value) {
        return null;
      }
      isSaving.value = true;
      uploadAvatarIfNeeded((remoteAvatarUrl, didUploadAvatar) => {
        const genderCode = genderMap[form.value.gender] || "";
        utils_auth.updateProfile(new UTSJSONObject({
          nickname: form.value.nickname,
          profileSignature: form.value.profileSignature,
          email: form.value.email,
          gender: genderCode
        }), () => {
          if (didUploadAvatar && remoteAvatarUrl != "") {
            utils_auth.fetchProfile((profile) => {
              form.value.avatarUrl = utils_auth.normalizeAppUrl(profile.avatarUrl) || remoteAvatarUrl;
              saveProfileLocal();
              isSaving.value = false;
              if (form.value.avatarUrl == remoteAvatarUrl) {
                common_vendor.index.showToast({
                  title: "头像保存成功",
                  icon: "success"
                });
                return null;
              }
              common_vendor.index.showToast({
                title: "头像已上传，但资料未同步",
                icon: "none"
              });
            }, () => {
              saveProfileLocal();
              isSaving.value = false;
              common_vendor.index.showToast({
                title: "已保存，头像状态待确认",
                icon: "none"
              });
            });
            return null;
          }
          saveProfileLocal();
          isSaving.value = false;
          common_vendor.index.showToast({
            title: "保存成功",
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
        c: form.value.avatarUrl || defaultAvatar,
        d: common_vendor.o(handleChooseAvatar),
        e: form.value.nickname,
        f: common_vendor.o(($event) => {
          return form.value.nickname = $event.detail.value;
        }),
        g: common_vendor.t(form.value.gender || "请选择性别"),
        h: common_vendor.o(handleChooseGender),
        i: form.value.email,
        j: common_vendor.o(($event) => {
          return form.value.email = $event.detail.value;
        }),
        k: form.value.profileSignature,
        l: common_vendor.o(($event) => {
          return form.value.profileSignature = $event.detail.value;
        }),
        m: common_vendor.t(isSaving.value ? "保存中..." : "保存"),
        n: common_vendor.o(handleSave),
        o: isSaving.value,
        p: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      };
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/edit.js.map
