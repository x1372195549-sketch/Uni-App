"use strict";
const common_vendor = require("../common/vendor.js");
class LoginUserProfile extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          username: { type: String, optional: false },
          nickname: { type: String, optional: false },
          avatarUrl: { type: String, optional: false },
          lastLoginAt: { type: String, optional: false }
        };
      },
      name: "LoginUserProfile"
    };
  }
  constructor(options, metadata = LoginUserProfile.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.username = this.__props__.username;
    this.nickname = this.__props__.nickname;
    this.avatarUrl = this.__props__.avatarUrl;
    this.lastLoginAt = this.__props__.lastLoginAt;
    delete this.__props__;
  }
}
class LoginResponseData extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          tokenType: { type: String, optional: false },
          accessToken: { type: String, optional: false },
          expiresIn: { type: Number, optional: false },
          user: { type: LoginUserProfile, optional: true }
        };
      },
      name: "LoginResponseData"
    };
  }
  constructor(options, metadata = LoginResponseData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.tokenType = this.__props__.tokenType;
    this.accessToken = this.__props__.accessToken;
    this.expiresIn = this.__props__.expiresIn;
    this.user = this.__props__.user;
    delete this.__props__;
  }
}
class CurrentUser extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          username: { type: String, optional: false },
          nickname: { type: String, optional: false },
          avatarUrl: { type: String, optional: false },
          mobile: { type: String, optional: false },
          email: { type: String, optional: false },
          profileCompleted: { type: Boolean, optional: false },
          studentId: { type: Number, optional: false },
          certificationStatus: { type: String, optional: false }
        };
      },
      name: "CurrentUser"
    };
  }
  constructor(options, metadata = CurrentUser.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.username = this.__props__.username;
    this.nickname = this.__props__.nickname;
    this.avatarUrl = this.__props__.avatarUrl;
    this.mobile = this.__props__.mobile;
    this.email = this.__props__.email;
    this.profileCompleted = this.__props__.profileCompleted;
    this.studentId = this.__props__.studentId;
    this.certificationStatus = this.__props__.certificationStatus;
    delete this.__props__;
  }
}
class ApiResponse extends UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          success: { type: Boolean, optional: false },
          code: { type: String, optional: false },
          message: { type: String, optional: false },
          data: { type: "Unknown", optional: true }
        };
      },
      name: "ApiResponse"
    };
  }
  constructor(options, metadata = ApiResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.success = this.__props__.success;
    this.code = this.__props__.code;
    this.message = this.__props__.message;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
const BASE_URL = "https://api-test.arez.cc.cd";
class WechatLoginData extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          registered: { type: Boolean, optional: false },
          needBindMobile: { type: Boolean, optional: false },
          bindToken: { type: String, optional: false },
          tokenType: { type: String, optional: false },
          accessToken: { type: String, optional: false },
          expiresIn: { type: Number, optional: false },
          user: { type: LoginUserProfile, optional: true }
        };
      },
      name: "WechatLoginData"
    };
  }
  constructor(options, metadata = WechatLoginData.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.registered = this.__props__.registered;
    this.needBindMobile = this.__props__.needBindMobile;
    this.bindToken = this.__props__.bindToken;
    this.tokenType = this.__props__.tokenType;
    this.accessToken = this.__props__.accessToken;
    this.expiresIn = this.__props__.expiresIn;
    this.user = this.__props__.user;
    delete this.__props__;
  }
}
const ACCESS_TOKEN_KEY = "app_auth_access_token";
const TOKEN_TYPE_KEY = "app_auth_token_type";
const LOGIN_USER_KEY = "app_auth_login_user";
const CURRENT_USER_KEY = "app_auth_current_user";
const BIND_TOKEN_KEY = "app_auth_bind_token";
function getTokenType() {
  const tokenType = common_vendor.index.getStorageSync(TOKEN_TYPE_KEY);
  return typeof tokenType == "string" ? tokenType : "";
}
function getAccessToken() {
  const accessToken = common_vendor.index.getStorageSync(ACCESS_TOKEN_KEY);
  return typeof accessToken == "string" ? accessToken : "";
}
function buildAuthorization() {
  const tokenType = getTokenType();
  const accessToken = getAccessToken();
  if (accessToken == "") {
    return "";
  }
  if (tokenType != "") {
    return tokenType + " " + accessToken;
  }
  return "Bearer " + accessToken;
}
function saveLogin(data) {
  common_vendor.index.setStorageSync(ACCESS_TOKEN_KEY, data.accessToken);
  common_vendor.index.setStorageSync(TOKEN_TYPE_KEY, data.tokenType);
  if (data.user != null) {
    common_vendor.index.setStorageSync(LOGIN_USER_KEY, data.user);
  }
}
function saveCurrentUser(user) {
  common_vendor.index.setStorageSync(CURRENT_USER_KEY, user);
}
class AppProfile extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          username: { type: String, optional: false },
          mobile: { type: String, optional: false },
          email: { type: String, optional: false },
          nickname: { type: String, optional: false },
          profileSignature: { type: String, optional: false },
          avatarUrl: { type: String, optional: false },
          authProvider: { type: String, optional: false },
          gender: { type: String, optional: false },
          status: { type: String, optional: false },
          profileCompleted: { type: Boolean, optional: false },
          studentId: { type: Number, optional: false },
          certificationStatus: { type: String, optional: false }
        };
      },
      name: "AppProfile"
    };
  }
  constructor(options, metadata = AppProfile.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.username = this.__props__.username;
    this.mobile = this.__props__.mobile;
    this.email = this.__props__.email;
    this.nickname = this.__props__.nickname;
    this.profileSignature = this.__props__.profileSignature;
    this.avatarUrl = this.__props__.avatarUrl;
    this.authProvider = this.__props__.authProvider;
    this.gender = this.__props__.gender;
    this.status = this.__props__.status;
    this.profileCompleted = this.__props__.profileCompleted;
    this.studentId = this.__props__.studentId;
    this.certificationStatus = this.__props__.certificationStatus;
    delete this.__props__;
  }
}
class AppProfileUpdateRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          nickname: { type: String, optional: true },
          profileSignature: { type: String, optional: true },
          avatarUrl: { type: String, optional: true },
          email: { type: String, optional: true },
          gender: { type: String, optional: true }
        };
      },
      name: "AppProfileUpdateRequest"
    };
  }
  constructor(options, metadata = AppProfileUpdateRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.nickname = this.__props__.nickname;
    this.profileSignature = this.__props__.profileSignature;
    this.avatarUrl = this.__props__.avatarUrl;
    this.email = this.__props__.email;
    this.gender = this.__props__.gender;
    delete this.__props__;
  }
}
function fetchProfile(success, fail) {
  request("/api/v1/app/profile", "GET", null, true, false, (profile) => {
    success(profile);
  }, (message) => {
    fail(message);
  });
}
function updateProfile(data, success, fail) {
  request("/api/v1/app/profile", "PUT", data, true, false, (profile) => {
    success(profile);
  }, (message) => {
    fail(message);
  });
}
function clearAuthStorage() {
  common_vendor.index.removeStorageSync(ACCESS_TOKEN_KEY);
  common_vendor.index.removeStorageSync(TOKEN_TYPE_KEY);
  common_vendor.index.removeStorageSync(LOGIN_USER_KEY);
  common_vendor.index.removeStorageSync(CURRENT_USER_KEY);
  common_vendor.index.removeStorageSync(BIND_TOKEN_KEY);
}
function getCurrentUserFromStorage() {
  const user = common_vendor.index.getStorageSync(CURRENT_USER_KEY);
  if (user == null || user == "") {
    return null;
  }
  return user;
}
function hasToken() {
  return getAccessToken() != "";
}
function hasBoundMobile(user = null) {
  if (user == null) {
    return false;
  }
  return user.mobile != null && user.mobile != "";
}
function saveBindToken(token) {
  common_vendor.index.setStorageSync(BIND_TOKEN_KEY, token);
}
function getBindToken() {
  const token = common_vendor.index.getStorageSync(BIND_TOKEN_KEY);
  return typeof token == "string" ? token : "";
}
function clearBindToken() {
  common_vendor.index.removeStorageSync(BIND_TOKEN_KEY);
}
function request(path, method, data = null, needAuth, allowEmptyData, success, fail) {
  const header = new UTSJSONObject({
    "Content-Type": "application/json"
  });
  if (needAuth) {
    const authorization = buildAuthorization();
    if (authorization == "") {
      fail("登录状态已失效，请重新登录");
      return null;
    }
    header["Authorization"] = authorization;
  }
  common_vendor.index.request({
    url: BASE_URL + path,
    method,
    data,
    header,
    success: (res) => {
      const statusCode = res.statusCode;
      const body = res.data;
      if (statusCode >= 200 && statusCode < 300 && body != null && body.success == true) {
        if (body.data != null) {
          success(body.data);
          return null;
        }
        if (allowEmptyData) {
          success(null);
          return null;
        }
      }
      if (body != null && body.message != null && body.message != "") {
        fail(body.message);
        return null;
      }
      fail("请求失败，请稍后重试");
    },
    fail: (err) => {
      fail(err.errMsg != null && err.errMsg != "" ? err.errMsg : "网络请求失败");
    }
  });
}
function fetchCurrentUser(success, fail) {
  request("/api/v1/app/auth/me", "GET", null, true, false, (user) => {
    saveCurrentUser(user);
    success(user);
  }, (message) => {
    fail(message);
  });
}
function loginByWechat(nickname, avatarUrl, success, fail) {
  common_vendor.index.login(new UTSJSONObject({
    success: (loginRes) => {
      const requestBody = new UTSJSONObject({
        code: loginRes.code,
        nickname,
        avatarUrl
      });
      request("/api/v1/app/auth/wechat-login", "POST", requestBody, false, false, (loginData) => {
        if (loginData.needBindMobile) {
          saveBindToken(loginData.bindToken);
          success(null);
          return null;
        }
        const saveData = new LoginResponseData({
          tokenType: loginData.tokenType,
          accessToken: loginData.accessToken,
          expiresIn: loginData.expiresIn,
          user: loginData.user
        });
        saveLogin(saveData);
        fetchCurrentUser((user) => {
          success(user);
        }, (message) => {
          fail(message);
        });
      }, (message) => {
        fail(message);
      });
    },
    fail: (err) => {
      fail(err.errMsg != null && err.errMsg != "" ? err.errMsg : "微信登录失败");
    }
  }));
}
function wechatBindMobile(bindToken, mobile, code, success, fail) {
  const requestBody = new UTSJSONObject({
    bindToken,
    mobile,
    code
  });
  request("/api/v1/app/auth/wechat-bind-mobile", "POST", requestBody, false, false, (loginData) => {
    success(loginData);
  }, (message) => {
    fail(message);
  });
}
function sendSmsCode(mobile, success, fail) {
  const requestBody = new UTSJSONObject({
    mobile
  });
  request("/api/v1/app/auth/sms-code", "POST", requestBody, false, true, () => {
    success();
  }, (message) => {
    fail(message);
  });
}
function logout(success, fail) {
  request("/api/v1/app/auth/logout", "POST", null, true, true, () => {
    clearAuthStorage();
    success();
  }, (message) => {
    fail(message);
  });
}
function loginBySms(mobile, code, success, fail) {
  const requestBody = new UTSJSONObject({
    mobile,
    code
  });
  request("/api/v1/app/auth/sms-login", "POST", requestBody, false, false, (loginData) => {
    saveLogin(loginData);
    fetchCurrentUser((user) => {
      success(user);
    }, (message) => {
      fail(message);
    });
  }, (message) => {
    fail(message);
  });
}
exports.clearBindToken = clearBindToken;
exports.fetchProfile = fetchProfile;
exports.getBindToken = getBindToken;
exports.getCurrentUserFromStorage = getCurrentUserFromStorage;
exports.hasBoundMobile = hasBoundMobile;
exports.hasToken = hasToken;
exports.loginBySms = loginBySms;
exports.loginByWechat = loginByWechat;
exports.logout = logout;
exports.saveLogin = saveLogin;
exports.sendSmsCode = sendSmsCode;
exports.updateProfile = updateProfile;
exports.wechatBindMobile = wechatBindMobile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
