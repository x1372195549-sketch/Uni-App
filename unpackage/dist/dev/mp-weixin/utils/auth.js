"use strict";
const common_vendor = require("../common/vendor.js");
let LoginUserProfile$1 = class LoginUserProfile extends UTS.UTSType {
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
};
let LoginResponseData$1 = class LoginResponseData extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          tokenType: { type: String, optional: false },
          accessToken: { type: String, optional: false },
          expiresIn: { type: Number, optional: false },
          user: { type: LoginUserProfile$1, optional: true }
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
};
let CurrentUser$1 = class CurrentUser extends UTS.UTSType {
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
};
let CurrentUserPatch$1 = class CurrentUserPatch extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          nickname: { type: String, optional: true },
          avatarUrl: { type: String, optional: true },
          mobile: { type: String, optional: true },
          email: { type: String, optional: true },
          profileCompleted: { type: Boolean, optional: true },
          studentId: { type: Number, optional: true },
          certificationStatus: { type: String, optional: true }
        };
      },
      name: "CurrentUserPatch"
    };
  }
  constructor(options, metadata = CurrentUserPatch.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.nickname = this.__props__.nickname;
    this.avatarUrl = this.__props__.avatarUrl;
    this.mobile = this.__props__.mobile;
    this.email = this.__props__.email;
    this.profileCompleted = this.__props__.profileCompleted;
    this.studentId = this.__props__.studentId;
    this.certificationStatus = this.__props__.certificationStatus;
    delete this.__props__;
  }
};
let ApiResponse$1 = class ApiResponse extends UTS.UTSType {
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
};
const BASE_URL = "https://api-test.arez.cc.cd";
let WechatLoginData$1 = class WechatLoginData extends UTS.UTSType {
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
          user: { type: LoginUserProfile$1, optional: true }
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
};
let AppProfile$1 = class AppProfile extends UTS.UTSType {
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
};
let AppProfileUpdateRequest$1 = class AppProfileUpdateRequest extends UTS.UTSType {
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
};
let AppFeedbackRequest$1 = class AppFeedbackRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          feedbackType: { type: String, optional: false },
          content: { type: String, optional: false },
          contact: { type: String, optional: false }
        };
      },
      name: "AppFeedbackRequest"
    };
  }
  constructor(options, metadata = AppFeedbackRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.feedbackType = this.__props__.feedbackType;
    this.content = this.__props__.content;
    this.contact = this.__props__.contact;
    delete this.__props__;
  }
};
let AppStudentCertification$1 = class AppStudentCertification extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          studentId: { type: Number, optional: false },
          studentNo: { type: String, optional: false },
          realName: { type: String, optional: false },
          mobile: { type: String, optional: false },
          province: { type: String, optional: false },
          city: { type: String, optional: false },
          district: { type: String, optional: false },
          organization: { type: String, optional: false },
          positionTitle: { type: String, optional: false },
          status: { type: String, optional: false },
          certificationStatus: { type: String, optional: false },
          certificationSubmittedAt: { type: String, optional: false },
          certificationReviewedAt: { type: String, optional: false },
          rejectReason: { type: String, optional: false },
          certificationMaterials: { type: String, optional: false },
          enrolledAt: { type: String, optional: false }
        };
      },
      name: "AppStudentCertification"
    };
  }
  constructor(options, metadata = AppStudentCertification.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.studentId = this.__props__.studentId;
    this.studentNo = this.__props__.studentNo;
    this.realName = this.__props__.realName;
    this.mobile = this.__props__.mobile;
    this.province = this.__props__.province;
    this.city = this.__props__.city;
    this.district = this.__props__.district;
    this.organization = this.__props__.organization;
    this.positionTitle = this.__props__.positionTitle;
    this.status = this.__props__.status;
    this.certificationStatus = this.__props__.certificationStatus;
    this.certificationSubmittedAt = this.__props__.certificationSubmittedAt;
    this.certificationReviewedAt = this.__props__.certificationReviewedAt;
    this.rejectReason = this.__props__.rejectReason;
    this.certificationMaterials = this.__props__.certificationMaterials;
    this.enrolledAt = this.__props__.enrolledAt;
    delete this.__props__;
  }
};
let AppStudentCertificationRequest$1 = class AppStudentCertificationRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          realName: { type: String, optional: false },
          mobile: { type: String, optional: true },
          idCardNo: { type: String, optional: true },
          province: { type: String, optional: true },
          city: { type: String, optional: true },
          district: { type: String, optional: true },
          organization: { type: String, optional: true },
          positionTitle: { type: String, optional: true },
          certificationMaterials: { type: String, optional: true }
        };
      },
      name: "AppStudentCertificationRequest"
    };
  }
  constructor(options, metadata = AppStudentCertificationRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.realName = this.__props__.realName;
    this.mobile = this.__props__.mobile;
    this.idCardNo = this.__props__.idCardNo;
    this.province = this.__props__.province;
    this.city = this.__props__.city;
    this.district = this.__props__.district;
    this.organization = this.__props__.organization;
    this.positionTitle = this.__props__.positionTitle;
    this.certificationMaterials = this.__props__.certificationMaterials;
    delete this.__props__;
  }
};
let LiveSessionVideo$1 = class LiveSessionVideo extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          liveSessionId: { type: Number, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "LiveSessionVideo"
    };
  }
  constructor(options, metadata = LiveSessionVideo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.liveSessionId = this.__props__.liveSessionId;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    this.status = this.__props__.status;
    delete this.__props__;
  }
};
let LiveSession$1 = class LiveSession extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          anchorName: { type: String, optional: false },
          speakerName: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          liveUrl: { type: String, optional: false },
          playbackUrl: { type: String, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          reviewStatus: { type: String, optional: false },
          liveStatus: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          videos: { type: UTS.UTSType.withGenerics(Array, [LiveSessionVideo$1]), optional: false }
        };
      },
      name: "LiveSession"
    };
  }
  constructor(options, metadata = LiveSession.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.anchorName = this.__props__.anchorName;
    this.speakerName = this.__props__.speakerName;
    this.tags = this.__props__.tags;
    this.liveUrl = this.__props__.liveUrl;
    this.playbackUrl = this.__props__.playbackUrl;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.reviewStatus = this.__props__.reviewStatus;
    this.liveStatus = this.__props__.liveStatus;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.videos = this.__props__.videos;
    delete this.__props__;
  }
};
let CourseVideo$1 = class CourseVideo extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseId: { type: Number, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "CourseVideo"
    };
  }
  constructor(options, metadata = CourseVideo.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseId = this.__props__.courseId;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let Course$1 = class Course extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseName: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          lecturerName: { type: String, optional: false },
          introduction: { type: String, optional: false },
          paperId: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          videos: { type: UTS.UTSType.withGenerics(Array, [CourseVideo$1]), optional: false }
        };
      },
      name: "Course"
    };
  }
  constructor(options, metadata = Course.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseName = this.__props__.courseName;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.lecturerName = this.__props__.lecturerName;
    this.introduction = this.__props__.introduction;
    this.paperId = this.__props__.paperId;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.videos = this.__props__.videos;
    delete this.__props__;
  }
};
let AppPodcastAudio$1 = class AppPodcastAudio extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          podcastId: { type: Number, optional: false },
          title: { type: String, optional: false },
          audioUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppPodcastAudio"
    };
  }
  constructor(options, metadata = AppPodcastAudio.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.podcastId = this.__props__.podcastId;
    this.title = this.__props__.title;
    this.audioUrl = this.__props__.audioUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let AppPodcast$1 = class AppPodcast extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          audios: { type: UTS.UTSType.withGenerics(Array, [AppPodcastAudio$1]), optional: false }
        };
      },
      name: "AppPodcast"
    };
  }
  constructor(options, metadata = AppPodcast.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.audios = this.__props__.audios;
    delete this.__props__;
  }
};
let TopicItem$1 = class TopicItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          topicId: { type: Number, optional: false },
          itemType: { type: String, optional: false },
          itemId: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          resource: { type: "Unknown", optional: true }
        };
      },
      name: "TopicItem"
    };
  }
  constructor(options, metadata = TopicItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.topicId = this.__props__.topicId;
    this.itemType = this.__props__.itemType;
    this.itemId = this.__props__.itemId;
    this.sortOrder = this.__props__.sortOrder;
    this.resource = this.__props__.resource;
    delete this.__props__;
  }
};
let Topic$1 = class Topic extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          items: { type: UTS.UTSType.withGenerics(Array, [TopicItem$1]), optional: false }
        };
      },
      name: "Topic"
    };
  }
  constructor(options, metadata = Topic.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.items = this.__props__.items;
    delete this.__props__;
  }
};
let TopicTag$1 = class TopicTag extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          tagName: { type: String, optional: false }
        };
      },
      name: "TopicTag"
    };
  }
  constructor(options, metadata = TopicTag.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.tagName = this.__props__.tagName;
    delete this.__props__;
  }
};
let TopicSectionResource$1 = class TopicSectionResource extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          progressPercent: { type: Number, optional: false }
        };
      },
      name: "TopicSectionResource"
    };
  }
  constructor(options, metadata = TopicSectionResource.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.progressPercent = this.__props__.progressPercent;
    delete this.__props__;
  }
};
let TopicSection$1 = class TopicSection extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sectionType: { type: String, optional: false },
          sectionLabel: { type: String, optional: false },
          total: { type: Number, optional: false },
          hasMore: { type: Boolean, optional: false },
          previewItems: { type: UTS.UTSType.withGenerics(Array, [TopicSectionResource$1]), optional: false }
        };
      },
      name: "TopicSection"
    };
  }
  constructor(options, metadata = TopicSection.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sectionType = this.__props__.sectionType;
    this.sectionLabel = this.__props__.sectionLabel;
    this.total = this.__props__.total;
    this.hasMore = this.__props__.hasMore;
    this.previewItems = this.__props__.previewItems;
    delete this.__props__;
  }
};
let TopicCard$1 = class TopicCard extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "TopicCard"
    };
  }
  constructor(options, metadata = TopicCard.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
};
let TopicDetail$1 = class TopicDetail extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          sections: { type: UTS.UTSType.withGenerics(Array, [TopicSection$1]), optional: false }
        };
      },
      name: "TopicDetail"
    };
  }
  constructor(options, metadata = TopicDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.sections = this.__props__.sections;
    delete this.__props__;
  }
};
let Article$1 = class Article extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          content: { type: String, optional: false },
          authorName: { type: String, optional: false },
          source: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          publishedAt: { type: String, optional: false }
        };
      },
      name: "Article"
    };
  }
  constructor(options, metadata = Article.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.content = this.__props__.content;
    this.authorName = this.__props__.authorName;
    this.source = this.__props__.source;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.publishedAt = this.__props__.publishedAt;
    delete this.__props__;
  }
};
let ExamQuestionOption$1 = class ExamQuestionOption extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          optionKey: { type: String, optional: false },
          optionContent: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "ExamQuestionOption"
    };
  }
  constructor(options, metadata = ExamQuestionOption.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.optionKey = this.__props__.optionKey;
    this.optionContent = this.__props__.optionContent;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let ExamQuestion$1 = class ExamQuestion extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          questionType: { type: String, optional: false },
          title: { type: String, optional: false },
          analysis: { type: String, optional: false },
          difficulty: { type: String, optional: false },
          score: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          options: { type: UTS.UTSType.withGenerics(Array, [ExamQuestionOption$1]), optional: false }
        };
      },
      name: "ExamQuestion"
    };
  }
  constructor(options, metadata = ExamQuestion.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.questionType = this.__props__.questionType;
    this.title = this.__props__.title;
    this.analysis = this.__props__.analysis;
    this.difficulty = this.__props__.difficulty;
    this.score = this.__props__.score;
    this.sortOrder = this.__props__.sortOrder;
    this.options = this.__props__.options;
    delete this.__props__;
  }
};
let ExamPaper$1 = class ExamPaper extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          paperName: { type: String, optional: false },
          description: { type: String, optional: false },
          totalScore: { type: Number, optional: false },
          passScore: { type: Number, optional: false },
          durationMinutes: { type: Number, optional: false },
          status: { type: String, optional: false },
          questionCount: { type: Number, optional: false },
          questions: { type: UTS.UTSType.withGenerics(Array, [ExamQuestion$1]), optional: false }
        };
      },
      name: "ExamPaper"
    };
  }
  constructor(options, metadata = ExamPaper.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.paperName = this.__props__.paperName;
    this.description = this.__props__.description;
    this.totalScore = this.__props__.totalScore;
    this.passScore = this.__props__.passScore;
    this.durationMinutes = this.__props__.durationMinutes;
    this.status = this.__props__.status;
    this.questionCount = this.__props__.questionCount;
    this.questions = this.__props__.questions;
    delete this.__props__;
  }
};
let ExamAnswerSubmitItem$1 = class ExamAnswerSubmitItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          answerContent: { type: String, optional: false }
        };
      },
      name: "ExamAnswerSubmitItem"
    };
  }
  constructor(options, metadata = ExamAnswerSubmitItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.answerContent = this.__props__.answerContent;
    delete this.__props__;
  }
};
let ExamSubmitRequest$1 = class ExamSubmitRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sourceType: { type: String, optional: true },
          sourceId: { type: Number, optional: true },
          answers: { type: UTS.UTSType.withGenerics(Array, [ExamAnswerSubmitItem$1]), optional: false }
        };
      },
      name: "ExamSubmitRequest"
    };
  }
  constructor(options, metadata = ExamSubmitRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sourceType = this.__props__.sourceType;
    this.sourceId = this.__props__.sourceId;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
};
let ExamAnswerResult$1 = class ExamAnswerResult extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          questionType: { type: String, optional: false },
          title: { type: String, optional: false },
          answerContent: { type: String, optional: false },
          correctAnswer: { type: String, optional: false },
          analysis: { type: String, optional: false },
          score: { type: Number, optional: false },
          correct: { type: Number, optional: false },
          options: { type: UTS.UTSType.withGenerics(Array, [ExamQuestionOption$1]), optional: false }
        };
      },
      name: "ExamAnswerResult"
    };
  }
  constructor(options, metadata = ExamAnswerResult.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.questionType = this.__props__.questionType;
    this.title = this.__props__.title;
    this.answerContent = this.__props__.answerContent;
    this.correctAnswer = this.__props__.correctAnswer;
    this.analysis = this.__props__.analysis;
    this.score = this.__props__.score;
    this.correct = this.__props__.correct;
    this.options = this.__props__.options;
    delete this.__props__;
  }
};
let ExamRecord$1 = class ExamRecord extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          paperName: { type: String, optional: false },
          score: { type: Number, optional: false },
          passed: { type: Number, optional: false },
          totalScore: { type: Number, optional: false },
          passScore: { type: Number, optional: false },
          submittedAt: { type: String, optional: false },
          answers: { type: UTS.UTSType.withGenerics(Array, [ExamAnswerResult$1]), optional: false }
        };
      },
      name: "ExamRecord"
    };
  }
  constructor(options, metadata = ExamRecord.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.paperId = this.__props__.paperId;
    this.paperName = this.__props__.paperName;
    this.score = this.__props__.score;
    this.passed = this.__props__.passed;
    this.totalScore = this.__props__.totalScore;
    this.passScore = this.__props__.passScore;
    this.submittedAt = this.__props__.submittedAt;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
};
let BrowseHistoryRequest$1 = class BrowseHistoryRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false }
        };
      },
      name: "BrowseHistoryRequest"
    };
  }
  constructor(options, metadata = BrowseHistoryRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    delete this.__props__;
  }
};
let KnowledgeCategory$1 = class KnowledgeCategory extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          children: { type: UTS.UTSType.withGenerics(Array, [KnowledgeCategory]), optional: false }
        };
      },
      name: "KnowledgeCategory"
    };
  }
  constructor(options, metadata = KnowledgeCategory.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.children = this.__props__.children;
    delete this.__props__;
  }
};
let KnowledgeEntry$1 = class KnowledgeEntry extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          content: { type: String, optional: false },
          keywords: { type: String, optional: true },
          source: { type: String, optional: true },
          author: { type: String, optional: true },
          publisher: { type: String, optional: true },
          totalPages: { type: Number, optional: true },
          publishedAt: { type: String, optional: true },
          viewCount: { type: Number, optional: true },
          sortOrder: { type: Number, optional: true }
        };
      },
      name: "KnowledgeEntry"
    };
  }
  constructor(options, metadata = KnowledgeEntry.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.coverUrl = this.__props__.coverUrl;
    this.content = this.__props__.content;
    this.keywords = this.__props__.keywords;
    this.source = this.__props__.source;
    this.author = this.__props__.author;
    this.publisher = this.__props__.publisher;
    this.totalPages = this.__props__.totalPages;
    this.publishedAt = this.__props__.publishedAt;
    this.viewCount = this.__props__.viewCount;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let AppBookChapter$1 = class AppBookChapter extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          bookId: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          chapterTitle: { type: String, optional: false },
          content: { type: String, optional: false },
          startPage: { type: Number, optional: false },
          pageCount: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppBookChapter"
    };
  }
  constructor(options, metadata = AppBookChapter.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.bookId = this.__props__.bookId;
    this.parentId = this.__props__.parentId;
    this.chapterTitle = this.__props__.chapterTitle;
    this.content = this.__props__.content;
    this.startPage = this.__props__.startPage;
    this.pageCount = this.__props__.pageCount;
    this.paperId = this.__props__.paperId;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let AppBookCategory$1 = class AppBookCategory extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppBookCategory"
    };
  }
  constructor(options, metadata = AppBookCategory.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let AppBook$1 = class AppBook extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          bookName: { type: String, optional: false },
          author: { type: String, optional: false },
          publisher: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          introduction: { type: String, optional: false },
          totalPages: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          chapters: { type: UTS.UTSType.withGenerics(Array, [AppBookChapter$1]), optional: false }
        };
      },
      name: "AppBook"
    };
  }
  constructor(options, metadata = AppBook.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.bookName = this.__props__.bookName;
    this.author = this.__props__.author;
    this.publisher = this.__props__.publisher;
    this.coverUrl = this.__props__.coverUrl;
    this.introduction = this.__props__.introduction;
    this.totalPages = this.__props__.totalPages;
    this.paperId = this.__props__.paperId;
    this.publishedAt = this.__props__.publishedAt;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.chapters = this.__props__.chapters;
    delete this.__props__;
  }
};
let PageResponse$1 = class PageResponse extends UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          records: { type: UTS.UTSType.withGenerics(Array, ["Unknown"]), optional: false },
          total: { type: Number, optional: false },
          page: { type: Number, optional: false },
          size: { type: Number, optional: false }
        };
      },
      name: "PageResponse"
    };
  }
  constructor(options, metadata = PageResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.records = this.__props__.records;
    this.total = this.__props__.total;
    this.page = this.__props__.page;
    this.size = this.__props__.size;
    delete this.__props__;
  }
};
let AppResourceRecord$1 = class AppResourceRecord extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          source: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          occurredAt: { type: String, optional: false }
        };
      },
      name: "AppResourceRecord"
    };
  }
  constructor(options, metadata = AppResourceRecord.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.source = this.__props__.source;
    this.viewCount = this.__props__.viewCount;
    this.occurredAt = this.__props__.occurredAt;
    delete this.__props__;
  }
};
let LearningHistoryRecord$1 = class LearningHistoryRecord extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          resourceTypeLabel: { type: String, optional: false },
          visitedTime: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false }
        };
      },
      name: "LearningHistoryRecord"
    };
  }
  constructor(options, metadata = LearningHistoryRecord.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.resourceTypeLabel = this.__props__.resourceTypeLabel;
    this.visitedTime = this.__props__.visitedTime;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    delete this.__props__;
  }
};
let AppFavoriteRequest$1 = class AppFavoriteRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "AppFavoriteRequest"
    };
  }
  constructor(options, metadata = AppFavoriteRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
};
let AppResourceInteraction$1 = class AppResourceInteraction extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "AppResourceInteraction"
    };
  }
  constructor(options, metadata = AppResourceInteraction.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
};
let HomeCategory$1 = class HomeCategory extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          iconUrl: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeCategory"
    };
  }
  constructor(options, metadata = HomeCategory.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.iconUrl = this.__props__.iconUrl;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.status = this.__props__.status;
    delete this.__props__;
  }
};
let HomeContent$1 = class HomeContent extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          contentType: { type: String, optional: false },
          targetId: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          linkUrl: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeContent"
    };
  }
  constructor(options, metadata = HomeContent.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.contentType = this.__props__.contentType;
    this.targetId = this.__props__.targetId;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.linkUrl = this.__props__.linkUrl;
    this.sortOrder = this.__props__.sortOrder;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.status = this.__props__.status;
    delete this.__props__;
  }
};
let AppHomeItem$1 = class AppHomeItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          contentType: { type: String, optional: false },
          contentTypeLabel: { type: String, optional: false },
          targetId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          linkUrl: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppHomeItem"
    };
  }
  constructor(options, metadata = AppHomeItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.contentType = this.__props__.contentType;
    this.contentTypeLabel = this.__props__.contentTypeLabel;
    this.targetId = this.__props__.targetId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.linkUrl = this.__props__.linkUrl;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let AppHomeSection$1 = class AppHomeSection extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          iconUrl: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          items: { type: UTS.UTSType.withGenerics(Array, [AppHomeItem$1]), optional: false }
        };
      },
      name: "AppHomeSection"
    };
  }
  constructor(options, metadata = AppHomeSection.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.iconUrl = this.__props__.iconUrl;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.items = this.__props__.items;
    delete this.__props__;
  }
};
let AppHomeResponse$1 = class AppHomeResponse extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sections: { type: UTS.UTSType.withGenerics(Array, [AppHomeSection$1]), optional: false }
        };
      },
      name: "AppHomeResponse"
    };
  }
  constructor(options, metadata = AppHomeResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sections = this.__props__.sections;
    delete this.__props__;
  }
};
let AvatarUploadUrlResponse$1 = class AvatarUploadUrlResponse extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uploadUrl: { type: String, optional: false },
          objectKey: { type: String, optional: false },
          method: { type: String, optional: false },
          headers: { type: "Unknown", optional: true },
          formData: { type: "Unknown", optional: true },
          publicUrl: { type: String, optional: false }
        };
      },
      name: "AvatarUploadUrlResponse"
    };
  }
  constructor(options, metadata = AvatarUploadUrlResponse.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uploadUrl = this.__props__.uploadUrl;
    this.objectKey = this.__props__.objectKey;
    this.method = this.__props__.method;
    this.headers = this.__props__.headers;
    this.formData = this.__props__.formData;
    this.publicUrl = this.__props__.publicUrl;
    delete this.__props__;
  }
};
let AvatarUploadUrlRequest$1 = class AvatarUploadUrlRequest extends UTS.UTSType {
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
      name: "AvatarUploadUrlRequest"
    };
  }
  constructor(options, metadata = AvatarUploadUrlRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.originalName = this.__props__.originalName;
    this.contentType = this.__props__.contentType;
    this.fileSize = this.__props__.fileSize;
    delete this.__props__;
  }
};
let AvatarConfirmRequest$1 = class AvatarConfirmRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          objectKey: { type: String, optional: false },
          originalName: { type: String, optional: true }
        };
      },
      name: "AvatarConfirmRequest"
    };
  }
  constructor(options, metadata = AvatarConfirmRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.objectKey = this.__props__.objectKey;
    this.originalName = this.__props__.originalName;
    delete this.__props__;
  }
};
let AvatarBinaryUploadConfig$1 = class AvatarBinaryUploadConfig extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          contentType: { type: String, optional: false }
        };
      },
      name: "AvatarBinaryUploadConfig"
    };
  }
  constructor(options, metadata = AvatarBinaryUploadConfig.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.contentType = this.__props__.contentType;
    delete this.__props__;
  }
};
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
function getBaseOrigin() {
  const matches = BASE_URL.match(/^https?:\/\/[^/]+/);
  if (matches != null && matches.length > 0) {
    return matches[0];
  }
  return BASE_URL;
}
function normalizeExternalUrl(rawUrl) {
  if (rawUrl == null || rawUrl == "") {
    return "";
  }
  const baseOrigin = getBaseOrigin();
  if (/^https?:\/\/minio(?::\d+)?($|\/|\?)/.test(rawUrl)) {
    return rawUrl.replace(/^https?:\/\/minio(?::\d+)?/i, baseOrigin);
  }
  if (/^https?:\/\/[^/]*minio[^/]*($|\/|\?)/.test(rawUrl)) {
    return rawUrl.replace(/^https?:\/\/[^/]*minio[^/]*/i, baseOrigin);
  }
  if (/^https?:\/\/minio(?::\d+)?\//.test(rawUrl)) {
    return rawUrl.replace(/^https?:\/\/minio(?::\d+)?/, baseOrigin);
  }
  if (/^https?:\/\/[^/]+\/minio\//.test(rawUrl) && rawUrl.indexOf(baseOrigin) == 0) {
    return rawUrl;
  }
  if (rawUrl.startsWith("/")) {
    return baseOrigin + rawUrl;
  }
  return rawUrl;
}
function normalizeAppUrl(rawUrl) {
  const normalized = normalizeExternalUrl(rawUrl);
  if (normalized.indexOf("https://example.com/assets/") == 0 || normalized.indexOf("http://example.com/assets/") == 0) {
    return "";
  }
  return normalized;
}
function normalizeUploadUrlResponse(data) {
  const rawUploadUrl = data["uploadUrl"] || data["signedUrl"] || data["presignedUrl"] || data["url"] || "";
  const uploadUrl = normalizeExternalUrl(rawUploadUrl);
  const objectKey = data["objectKey"] || data["fileKey"] || data["key"] || "";
  const method = data["method"] || "PUT";
  const headers = data["headers"];
  const formData = data["formData"];
  const rawPublicUrl = data["publicUrl"] || data["avatarUrl"] || data["fileUrl"] || "";
  const publicUrl = normalizeExternalUrl(rawPublicUrl);
  return new AvatarUploadUrlResponse$1({
    uploadUrl,
    objectKey,
    method,
    headers,
    formData,
    publicUrl
  });
}
function saveLogin(data) {
  common_vendor.index.setStorageSync(ACCESS_TOKEN_KEY, data.accessToken);
  common_vendor.index.setStorageSync(TOKEN_TYPE_KEY, data.tokenType);
  if (data.user != null) {
    data.user.avatarUrl = normalizeAppUrl(data.user.avatarUrl);
    common_vendor.index.setStorageSync(LOGIN_USER_KEY, data.user);
  }
}
function saveCurrentUser(user) {
  user.avatarUrl = normalizeAppUrl(user.avatarUrl);
  common_vendor.index.setStorageSync(CURRENT_USER_KEY, user);
}
function normalizeCurrentUserData(raw = null) {
  if (raw == null) {
    return null;
  }
  return new CurrentUser$1({
    id: typeof raw["id"] == "number" ? raw["id"] : 0,
    username: typeof raw["username"] == "string" ? raw["username"] : "",
    nickname: typeof raw["nickname"] == "string" ? raw["nickname"] : "",
    avatarUrl: normalizeAppUrl(typeof raw["avatarUrl"] == "string" ? raw["avatarUrl"] : ""),
    mobile: typeof raw["mobile"] == "string" ? raw["mobile"] : "",
    email: typeof raw["email"] == "string" ? raw["email"] : "",
    profileCompleted: typeof raw["profileCompleted"] == "boolean" ? raw["profileCompleted"] : false,
    studentId: typeof raw["studentId"] == "number" ? raw["studentId"] : 0,
    certificationStatus: typeof raw["certificationStatus"] == "string" ? raw["certificationStatus"] : ""
  });
}
function mergeProfileIntoCurrentUser(profile) {
  profile.avatarUrl = normalizeAppUrl(profile.avatarUrl);
  const cached = getCurrentUserFromStorage();
  const nextUser = new CurrentUser$1({
    id: cached != null ? cached.id : profile.id || 0,
    username: cached != null ? cached.username : profile.username || "",
    nickname: profile.nickname || (cached != null ? cached.nickname : ""),
    avatarUrl: profile.avatarUrl || (cached != null ? cached.avatarUrl : ""),
    mobile: profile.mobile || (cached != null ? cached.mobile : ""),
    email: profile.email || (cached != null ? cached.email : ""),
    profileCompleted: profile.profileCompleted || (cached != null ? cached.profileCompleted : false),
    studentId: profile.studentId || (cached != null ? cached.studentId : 0),
    certificationStatus: profile.certificationStatus || (cached != null ? cached.certificationStatus : "")
  });
  saveCurrentUser(nextUser);
}
function fetchProfile(success, fail) {
  request("/api/v1/app/profile", "GET", null, true, false, (profile) => {
    profile.avatarUrl = normalizeAppUrl(profile.avatarUrl);
    mergeProfileIntoCurrentUser(profile);
    success(profile);
  }, (message) => {
    fail(message);
  });
}
function updateProfile(data, success, fail) {
  request("/api/v1/app/profile", "PUT", data, true, false, (profile) => {
    profile.avatarUrl = normalizeAppUrl(profile.avatarUrl);
    mergeProfileIntoCurrentUser(profile);
    success(profile);
  }, (message) => {
    fail(message);
  });
}
function fetchCertificationStatus(success, fail) {
  request("/api/v1/app/profile/certification", "GET", null, true, false, (data) => {
    success(data);
  }, (message) => {
    fail(message);
  });
}
function submitCertification(data, success, fail) {
  request("/api/v1/app/profile/certification", "POST", data, true, false, (result) => {
    success(result);
  }, (message) => {
    fail(message);
  });
}
function fetchLiveSessions(page, size, keyword, success, fail) {
  let path = "/api/v1/app/live-sessions?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const records = pageData.records != null ? pageData.records : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeLiveSession(item);
      }),
      total: pageData.total,
      page: pageData.page,
      size: pageData.size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchLiveSessionDetail(id, success, fail) {
  request("/api/v1/app/live-sessions/" + id, "GET", null, true, false, (detail) => {
    success(normalizeLiveSession(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchCourses(page, size, keyword, success, fail) {
  let path = "/api/v1/app/learning/courses?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  request(path, "GET", null, true, false, (pageData) => {
    success(pageData);
  }, (message) => {
    fail(message);
  });
}
function fetchCourseDetail(id, success, fail) {
  request("/api/v1/app/learning/courses/" + id, "GET", null, true, false, (detail) => {
    success(detail);
  }, (message) => {
    fail(message);
  });
}
function fetchAudioDetail(id, success, fail) {
  request("/api/v1/app/learning/podcasts/" + id, "GET", null, true, false, (detail) => {
    detail.coverUrl = normalizeAppUrl(detail.coverUrl);
    success(detail);
  }, (message) => {
    fail(message);
  });
}
let ExpertExperience$1 = class ExpertExperience extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          experienceType: { type: String, optional: false },
          title: { type: String, optional: false },
          description: { type: String, optional: false },
          startDate: { type: String, optional: false },
          endDate: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "ExpertExperience"
    };
  }
  constructor(options, metadata = ExpertExperience.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.expertId = this.__props__.expertId;
    this.experienceType = this.__props__.experienceType;
    this.title = this.__props__.title;
    this.description = this.__props__.description;
    this.startDate = this.__props__.startDate;
    this.endDate = this.__props__.endDate;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
};
let ExpertDetail$1 = class ExpertDetail extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          realName: { type: String, optional: false },
          gender: { type: String, optional: true },
          birthDate: { type: String, optional: true },
          mobile: { type: String, optional: true },
          avatarUrl: { type: String, optional: false },
          coverUrl: { type: String, optional: true },
          title: { type: String, optional: false },
          organization: { type: String, optional: false },
          specialty: { type: String, optional: false },
          introduction: { type: String, optional: false },
          consultationNotice: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          categoryIds: { type: UTS.UTSType.withGenerics(Array, [Number]), optional: false },
          experiences: { type: UTS.UTSType.withGenerics(Array, [ExpertExperience$1]), optional: false }
        };
      },
      name: "ExpertDetail"
    };
  }
  constructor(options, metadata = ExpertDetail.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.realName = this.__props__.realName;
    this.gender = this.__props__.gender;
    this.birthDate = this.__props__.birthDate;
    this.mobile = this.__props__.mobile;
    this.avatarUrl = this.__props__.avatarUrl;
    this.coverUrl = this.__props__.coverUrl;
    this.title = this.__props__.title;
    this.organization = this.__props__.organization;
    this.specialty = this.__props__.specialty;
    this.introduction = this.__props__.introduction;
    this.consultationNotice = this.__props__.consultationNotice;
    this.sortOrder = this.__props__.sortOrder;
    this.categoryIds = this.__props__.categoryIds;
    this.experiences = this.__props__.experiences;
    delete this.__props__;
  }
};
let AppQaAnswer$1 = class AppQaAnswer extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          questionId: { type: Number, optional: false },
          adminId: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          content: { type: String, optional: false },
          answeredAt: { type: String, optional: false }
        };
      },
      name: "AppQaAnswer"
    };
  }
  constructor(options, metadata = AppQaAnswer.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.questionId = this.__props__.questionId;
    this.adminId = this.__props__.adminId;
    this.expertId = this.__props__.expertId;
    this.content = this.__props__.content;
    this.answeredAt = this.__props__.answeredAt;
    delete this.__props__;
  }
};
let AppQaQuestion$1 = class AppQaQuestion extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          expertCategoryId: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          title: { type: String, optional: false },
          content: { type: String, optional: false },
          status: { type: String, optional: false },
          statusCode: { type: String, optional: false },
          statusLabel: { type: String, optional: false },
          answers: { type: UTS.UTSType.withGenerics(Array, [AppQaAnswer$1]), optional: false }
        };
      },
      name: "AppQaQuestion"
    };
  }
  constructor(options, metadata = AppQaQuestion.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.expertCategoryId = this.__props__.expertCategoryId;
    this.expertId = this.__props__.expertId;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    this.status = this.__props__.status;
    this.statusCode = this.__props__.statusCode;
    this.statusLabel = this.__props__.statusLabel;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
};
let AppQaQuestionRequest$1 = class AppQaQuestionRequest extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          expertCategoryId: { type: Number, optional: true },
          expertId: { type: Number, optional: true },
          title: { type: String, optional: false },
          content: { type: String, optional: false }
        };
      },
      name: "AppQaQuestionRequest"
    };
  }
  constructor(options, metadata = AppQaQuestionRequest.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.expertCategoryId = this.__props__.expertCategoryId;
    this.expertId = this.__props__.expertId;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    delete this.__props__;
  }
};
function normalizeExpertExperience(raw) {
  return new ExpertExperience$1({
    id: readNumberField(raw, "id"),
    expertId: readNumberField(raw, "expertId"),
    experienceType: readStringField(raw, "experienceType"),
    title: readStringField(raw, "title"),
    description: readStringField(raw, "description"),
    startDate: readStringField(raw, "startDate"),
    endDate: readStringField(raw, "endDate"),
    sortOrder: readNumberField(raw, "sortOrder")
  });
}
function normalizeExpertDetail(raw) {
  const categoryIdsValue = raw["categoryIds"];
  const rawCategoryIds = categoryIdsValue != null && UTS.isInstanceOf(categoryIdsValue, Array) ? categoryIdsValue : [];
  const experiencesValue = raw["experiences"];
  const rawExperiences = experiencesValue != null && UTS.isInstanceOf(experiencesValue, Array) ? experiencesValue : [];
  return new ExpertDetail$1({
    id: readNumberField(raw, "id"),
    realName: readStringField(raw, "realName"),
    gender: readStringField(raw, "gender"),
    birthDate: readStringField(raw, "birthDate"),
    mobile: readStringField(raw, "mobile"),
    avatarUrl: readStringField(raw, "avatarUrl"),
    coverUrl: readStringField(raw, "coverUrl"),
    title: readStringField(raw, "title"),
    organization: readStringField(raw, "organization"),
    specialty: readStringField(raw, "specialty"),
    introduction: readStringField(raw, "introduction"),
    consultationNotice: readStringField(raw, "consultationNotice"),
    sortOrder: readNumberField(raw, "sortOrder"),
    categoryIds: rawCategoryIds,
    experiences: rawExperiences.map((item) => {
      return normalizeExpertExperience(item);
    })
  });
}
function normalizeQaAnswer(raw) {
  return new AppQaAnswer$1({
    id: readNumberField(raw, "id"),
    questionId: readNumberField(raw, "questionId"),
    adminId: readNumberField(raw, "adminId"),
    expertId: readNumberField(raw, "expertId"),
    content: readStringField(raw, "content"),
    answeredAt: readStringField(raw, "answeredAt")
  });
}
function normalizeQaQuestion(raw) {
  const answersValue = raw["answers"];
  const rawAnswers = answersValue != null && UTS.isInstanceOf(answersValue, Array) ? answersValue : [];
  return new AppQaQuestion$1({
    id: readNumberField(raw, "id"),
    expertCategoryId: readNumberField(raw, "expertCategoryId"),
    expertId: readNumberField(raw, "expertId"),
    title: readStringField(raw, "title"),
    content: readStringField(raw, "content"),
    status: readStringField(raw, "status"),
    statusCode: readStringField(raw, "statusCode"),
    statusLabel: readStringField(raw, "statusLabel"),
    answers: rawAnswers.map((item) => {
      return normalizeQaAnswer(item);
    })
  });
}
function fetchExpertDetail(id, success, fail) {
  request("/api/v1/app/experts/" + id, "GET", null, true, false, (detail) => {
    success(normalizeExpertDetail(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchExperts(page, size, keyword, categoryId, success, fail) {
  let path = "/api/v1/app/experts?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  if (categoryId > 0) {
    path += "&categoryId=" + String(categoryId);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeExpertDetail(item);
      }),
      total: readNumberField(pageData, "total"),
      page: readNumberField(pageData, "page"),
      size: readNumberField(pageData, "size")
    }));
  }, (message) => {
    fail(message);
  });
}
function createQaQuestion(data, success, fail) {
  request("/api/v1/app/interaction/qa/questions", "POST", data, true, false, (result) => {
    success(normalizeQaQuestion(result));
  }, (message) => {
    fail(message);
  });
}
function fetchQaQuestions(page, size, success, fail) {
  request("/api/v1/app/interaction/qa/questions?page=" + String(page) + "&size=" + String(size), "GET", null, true, true, (pageData) => {
    if (pageData == null) {
      success(new PageResponse$1({
        records: [],
        total: 0,
        page,
        size
      }));
      return null;
    }
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeQaQuestion(item);
      }),
      total: readNumberField(pageData, "total") > 0 ? readNumberField(pageData, "total") : records.length,
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchQaQuestionDetail(id, success, fail) {
  request("/api/v1/app/interaction/qa/questions/" + id, "GET", null, true, false, (detail) => {
    success(normalizeQaQuestion(detail));
  }, (message) => {
    fail(message);
  });
}
function readStringField(raw, key) {
  const value = raw[key];
  return typeof value == "string" ? value : "";
}
function readNumberField(raw, key) {
  const value = raw[key];
  return typeof value == "number" ? value : 0;
}
function readLooseNumberField(raw, key) {
  const value = raw[key];
  if (typeof value == "number") {
    return value;
  }
  if (typeof value == "string") {
    const text = value;
    if (text.length > 0) {
      return Number(text);
    }
  }
  return 0;
}
function readBooleanField(raw, key) {
  const value = raw[key];
  return typeof value == "boolean" ? value : false;
}
function readStringArrayField(raw, key) {
  const value = raw[key];
  if (value == null || !UTS.isInstanceOf(value, Array)) {
    return [];
  }
  return value.filter((item = null) => {
    return typeof item == "string";
  }).map((item = null) => {
    return item;
  });
}
function normalizeTopicSectionResource(raw) {
  const resourceId = readLooseNumberField(raw, "resourceId");
  const itemId = readLooseNumberField(raw, "itemId");
  const entryId = readLooseNumberField(raw, "entryId");
  const knowledgeId = readLooseNumberField(raw, "knowledgeId");
  const contentId = readLooseNumberField(raw, "contentId");
  const id = readLooseNumberField(raw, "id");
  const resourceValue = raw["resource"];
  const nestedResource = resourceValue != null && UTS.isInstanceOf(resourceValue, UTSJSONObject) ? resourceValue : null;
  const nestedId = nestedResource != null ? readLooseNumberField(nestedResource, "id") : 0;
  const nestedEntryId = nestedResource != null ? readLooseNumberField(nestedResource, "entryId") : 0;
  const nestedKnowledgeId = nestedResource != null ? readLooseNumberField(nestedResource, "knowledgeId") : 0;
  const nestedContentId = nestedResource != null ? readLooseNumberField(nestedResource, "contentId") : 0;
  const resolvedResourceType = readStringField(raw, "resourceType").length > 0 ? readStringField(raw, "resourceType") : readStringField(raw, "itemType").length > 0 ? readStringField(raw, "itemType") : nestedResource != null ? readStringField(nestedResource, "resourceType") : "";
  const resolvedTitle = readStringField(raw, "title").length > 0 ? readStringField(raw, "title") : nestedResource != null ? readStringField(nestedResource, "title") : "";
  const resolvedSubtitle = readStringField(raw, "subtitle").length > 0 ? readStringField(raw, "subtitle") : nestedResource != null ? readStringField(nestedResource, "subtitle") : "";
  const resolvedSummary = readStringField(raw, "summary").length > 0 ? readStringField(raw, "summary") : nestedResource != null ? readStringField(nestedResource, "summary") : "";
  const resolvedCoverUrl = readStringField(raw, "coverUrl").length > 0 ? readStringField(raw, "coverUrl") : nestedResource != null ? readStringField(nestedResource, "coverUrl") : "";
  return new TopicSectionResource$1({
    resourceType: resolvedResourceType,
    resourceId: resourceId > 0 ? resourceId : itemId > 0 ? itemId : entryId > 0 ? entryId : knowledgeId > 0 ? knowledgeId : contentId > 0 ? contentId : nestedEntryId > 0 ? nestedEntryId : nestedKnowledgeId > 0 ? nestedKnowledgeId : nestedContentId > 0 ? nestedContentId : nestedId > 0 ? nestedId : id,
    title: resolvedTitle,
    subtitle: resolvedSubtitle,
    summary: resolvedSummary,
    coverUrl: normalizeAppUrl(resolvedCoverUrl),
    browseCount: readNumberField(raw, "browseCount") > 0 ? readNumberField(raw, "browseCount") : nestedResource != null ? readNumberField(nestedResource, "browseCount") : 0,
    favoriteCount: readNumberField(raw, "favoriteCount") > 0 ? readNumberField(raw, "favoriteCount") : nestedResource != null ? readNumberField(nestedResource, "favoriteCount") : 0,
    favorited: readBooleanField(raw, "favorited") || (nestedResource != null ? readBooleanField(nestedResource, "favorited") : false),
    progressPercent: readNumberField(raw, "progressPercent") > 0 ? readNumberField(raw, "progressPercent") : nestedResource != null ? readNumberField(nestedResource, "progressPercent") : 0
  });
}
function normalizeTopicSection(raw) {
  const previewValue = raw["previewItems"] != null ? raw["previewItems"] : raw["items"];
  const previewItems = previewValue != null && UTS.isInstanceOf(previewValue, Array) ? previewValue : [];
  return new TopicSection$1({
    sectionType: readStringField(raw, "sectionType"),
    sectionLabel: readStringField(raw, "sectionLabel"),
    total: readNumberField(raw, "total"),
    hasMore: readBooleanField(raw, "hasMore"),
    previewItems: previewItems.map((item) => {
      return normalizeTopicSectionResource(item);
    })
  });
}
function normalizeTopicCard(raw) {
  return new TopicCard$1({
    id: readNumberField(raw, "id"),
    title: readStringField(raw, "title"),
    summary: readStringField(raw, "summary"),
    learningRequirements: readStringField(raw, "learningRequirements"),
    coverUrl: normalizeAppUrl(readStringField(raw, "coverUrl")),
    tags: readStringArrayField(raw, "tags"),
    viewCount: readNumberField(raw, "viewCount"),
    publishedAt: readStringField(raw, "publishedAt"),
    favoriteCount: readNumberField(raw, "favoriteCount"),
    favorited: readBooleanField(raw, "favorited")
  });
}
function normalizeTopicDetail(raw) {
  const sectionsValue = raw["sections"];
  const sections = sectionsValue != null && UTS.isInstanceOf(sectionsValue, Array) ? sectionsValue : [];
  return new TopicDetail$1({
    id: readNumberField(raw, "id"),
    title: readStringField(raw, "title"),
    summary: readStringField(raw, "summary"),
    learningRequirements: readStringField(raw, "learningRequirements"),
    coverUrl: normalizeAppUrl(readStringField(raw, "coverUrl")),
    tags: readStringArrayField(raw, "tags"),
    viewCount: readNumberField(raw, "viewCount"),
    publishedAt: readStringField(raw, "publishedAt"),
    favoriteCount: readNumberField(raw, "favoriteCount"),
    favorited: readBooleanField(raw, "favorited"),
    sections: sections.map((item) => {
      return normalizeTopicSection(item);
    })
  });
}
function normalizeArticle(raw) {
  return new Article$1({
    id: readNumberField(raw, "id"),
    title: readStringField(raw, "title"),
    summary: readStringField(raw, "summary"),
    coverUrl: normalizeAppUrl(readStringField(raw, "coverUrl")),
    content: readStringField(raw, "content"),
    authorName: readStringField(raw, "authorName"),
    source: readStringField(raw, "source"),
    tags: readStringArrayField(raw, "tags"),
    viewCount: readNumberField(raw, "viewCount"),
    favoriteCount: readNumberField(raw, "favoriteCount"),
    favorited: readBooleanField(raw, "favorited"),
    publishedAt: readStringField(raw, "publishedAt")
  });
}
function normalizeLiveSessionVideo(raw) {
  return new LiveSessionVideo$1({
    id: typeof raw["id"] == "number" ? raw["id"] : 0,
    liveSessionId: typeof raw["liveSessionId"] == "number" ? raw["liveSessionId"] : 0,
    title: typeof raw["title"] == "string" ? raw["title"] : "",
    videoUrl: normalizeAppUrl(typeof raw["videoUrl"] == "string" ? raw["videoUrl"] : ""),
    durationSeconds: typeof raw["durationSeconds"] == "number" ? raw["durationSeconds"] : 0,
    sortOrder: typeof raw["sortOrder"] == "number" ? raw["sortOrder"] : 0,
    status: typeof raw["status"] == "string" ? raw["status"] : ""
  });
}
function normalizeLiveSession(raw) {
  const videoRaw = raw["videos"];
  const videos = Array.isArray(videoRaw) ? videoRaw.map((item) => {
    return normalizeLiveSessionVideo(item);
  }) : [];
  const tagRaw = raw["tags"];
  const tags = Array.isArray(tagRaw) ? tagRaw.filter((item) => {
    return item != null && item.length > 0;
  }) : [];
  return new LiveSession$1({
    id: typeof raw["id"] == "number" ? raw["id"] : 0,
    title: typeof raw["title"] == "string" ? raw["title"] : "",
    coverUrl: normalizeAppUrl(typeof raw["coverUrl"] == "string" ? raw["coverUrl"] : ""),
    anchorName: typeof raw["anchorName"] == "string" ? raw["anchorName"] : "",
    speakerName: typeof raw["speakerName"] == "string" ? raw["speakerName"] : "",
    tags,
    liveUrl: normalizeAppUrl(typeof raw["liveUrl"] == "string" ? raw["liveUrl"] : ""),
    playbackUrl: normalizeAppUrl(typeof raw["playbackUrl"] == "string" ? raw["playbackUrl"] : ""),
    startAt: typeof raw["startAt"] == "string" ? raw["startAt"] : "",
    endAt: typeof raw["endAt"] == "string" ? raw["endAt"] : "",
    reviewStatus: typeof raw["reviewStatus"] == "string" ? raw["reviewStatus"] : "",
    liveStatus: typeof raw["liveStatus"] == "string" ? raw["liveStatus"] : "",
    browseCount: typeof raw["browseCount"] == "number" ? raw["browseCount"] : 0,
    favoriteCount: typeof raw["favoriteCount"] == "number" ? raw["favoriteCount"] : 0,
    favorited: typeof raw["favorited"] == "boolean" ? raw["favorited"] : false,
    videos
  });
}
function normalizeExamQuestionOption(raw) {
  const optionKey = readStringField(raw, "optionKey").length > 0 ? readStringField(raw, "optionKey") : readStringField(raw, "key").length > 0 ? readStringField(raw, "key") : readStringField(raw, "label");
  const optionContent = readStringField(raw, "optionContent").length > 0 ? readStringField(raw, "optionContent") : readStringField(raw, "content").length > 0 ? readStringField(raw, "content") : readStringField(raw, "optionText").length > 0 ? readStringField(raw, "optionText") : readStringField(raw, "label");
  return new ExamQuestionOption$1({
    id: readNumberField(raw, "id"),
    optionKey,
    optionContent,
    sortOrder: readNumberField(raw, "sortOrder") > 0 ? readNumberField(raw, "sortOrder") : readNumberField(raw, "orderNum")
  });
}
function readObjectArrayField(raw, key) {
  const value = raw[key];
  if (value == null || !UTS.isInstanceOf(value, Array)) {
    return [];
  }
  return value.filter((item = null) => {
    return item != null && typeof item == "object";
  }).map((item = null) => {
    return item;
  });
}
function normalizeExamQuestionTypeValue(value = null) {
  if (typeof value == "number") {
    const typeCode = value;
    if (typeCode == 1) {
      return "SINGLE_CHOICE";
    }
    if (typeCode == 2) {
      return "MULTIPLE_CHOICE";
    }
    if (typeCode == 3) {
      return "TRUE_FALSE";
    }
    if (typeCode == 4) {
      return "SHORT_ANSWER";
    }
    return "";
  }
  if (typeof value == "string") {
    const text = value.toUpperCase();
    if (text == "1" || text == "SINGLE_CHOICE" || text == "SINGLE" || text == "RADIO") {
      return "SINGLE_CHOICE";
    }
    if (text == "2" || text == "MULTIPLE_CHOICE" || text == "MULTIPLE" || text == "CHECKBOX") {
      return "MULTIPLE_CHOICE";
    }
    if (text == "3" || text == "TRUE_FALSE" || text == "JUDGE" || text == "BOOLEAN") {
      return "TRUE_FALSE";
    }
    if (text == "4" || text == "SHORT_ANSWER" || text == "TEXT" || text == "ESSAY" || text == "FILL_BLANK") {
      return "SHORT_ANSWER";
    }
  }
  return "";
}
function readExamQuestionType(raw, key) {
  return normalizeExamQuestionTypeValue(raw[key]);
}
function normalizeExamQuestion(raw) {
  const options = readObjectArrayField(raw, "options");
  const questionRaw = raw["question"] != null ? raw["question"] : raw;
  const questionId = readNumberField(raw, "questionId") > 0 ? readNumberField(raw, "questionId") : readNumberField(questionRaw, "id");
  const score = readNumberField(raw, "score") > 0 ? readNumberField(raw, "score") : readNumberField(questionRaw, "score");
  const sortOrder = readNumberField(raw, "sortOrder");
  const nestedOptions = readObjectArrayField(questionRaw, "options");
  const questionOptions = readObjectArrayField(questionRaw, "questionOptions");
  const optionList = readObjectArrayField(questionRaw, "optionList");
  const answerOptions = readObjectArrayField(questionRaw, "answers");
  const normalizedOptionsSource = options.length > 0 ? options : nestedOptions.length > 0 ? nestedOptions : questionOptions.length > 0 ? questionOptions : optionList.length > 0 ? optionList : answerOptions;
  const questionType = readExamQuestionType(questionRaw, "questionType").length > 0 ? readExamQuestionType(questionRaw, "questionType") : readExamQuestionType(raw, "questionType");
  return new ExamQuestion$1({
    questionId,
    questionType,
    title: readStringField(questionRaw, "title"),
    analysis: readStringField(questionRaw, "analysis"),
    difficulty: readStringField(questionRaw, "difficulty"),
    score,
    sortOrder,
    options: normalizedOptionsSource.map((item) => {
      return normalizeExamQuestionOption(item);
    })
  });
}
function normalizeExamPaper(raw) {
  const questionsValue = raw["questions"];
  const questions = questionsValue != null && UTS.isInstanceOf(questionsValue, Array) ? questionsValue : [];
  const questionCountValue = readNumberField(raw, "questionCount");
  return new ExamPaper$1({
    id: readNumberField(raw, "id"),
    paperName: readStringField(raw, "paperName"),
    description: readStringField(raw, "description"),
    totalScore: readNumberField(raw, "totalScore"),
    passScore: readNumberField(raw, "passScore"),
    durationMinutes: readNumberField(raw, "durationMinutes"),
    status: readStringField(raw, "status"),
    questionCount: questionCountValue > 0 ? questionCountValue : questions.length,
    questions: questions.map((item) => {
      return normalizeExamQuestion(item);
    })
  });
}
function normalizeExamAnswerResult(raw) {
  const optionsValue = raw["options"];
  const options = optionsValue != null && UTS.isInstanceOf(optionsValue, Array) ? optionsValue : [];
  return new ExamAnswerResult$1({
    questionId: readNumberField(raw, "questionId"),
    questionType: readExamQuestionType(raw, "questionType"),
    title: readStringField(raw, "title"),
    answerContent: readStringField(raw, "answerContent"),
    correctAnswer: readStringField(raw, "correctAnswer"),
    analysis: readStringField(raw, "analysis"),
    score: readNumberField(raw, "score"),
    correct: readNumberField(raw, "correct"),
    options: options.map((item) => {
      return normalizeExamQuestionOption(item);
    })
  });
}
function normalizeExamRecord(raw) {
  const answersValue = raw["answers"];
  const answers = answersValue != null && UTS.isInstanceOf(answersValue, Array) ? answersValue : [];
  return new ExamRecord$1({
    id: readNumberField(raw, "id"),
    paperId: readNumberField(raw, "paperId"),
    paperName: readStringField(raw, "paperName"),
    score: readNumberField(raw, "score"),
    passed: readNumberField(raw, "passed"),
    totalScore: readNumberField(raw, "totalScore"),
    passScore: readNumberField(raw, "passScore"),
    submittedAt: readStringField(raw, "submittedAt"),
    answers: answers.map((item) => {
      return normalizeExamAnswerResult(item);
    })
  });
}
function normalizeKnowledgeCategory(raw) {
  const childrenValue = raw["children"];
  const rawChildren = childrenValue != null && UTS.isInstanceOf(childrenValue, Array) ? childrenValue : [];
  const children = rawChildren.map((item) => {
    return normalizeKnowledgeCategory(item);
  });
  return new KnowledgeCategory$1({
    id: readNumberField(raw, "id"),
    parentId: readNumberField(raw, "parentId"),
    categoryName: readStringField(raw, "categoryName"),
    categoryCode: readStringField(raw, "categoryCode"),
    description: readStringField(raw, "description"),
    sortOrder: readNumberField(raw, "sortOrder"),
    children
  });
}
function normalizeKnowledgeEntry(raw) {
  return new KnowledgeEntry$1({
    id: readNumberField(raw, "id"),
    categoryId: readNumberField(raw, "categoryId"),
    title: readStringField(raw, "title"),
    summary: readStringField(raw, "summary"),
    categoryName: readStringField(raw, "categoryName"),
    categoryCode: readStringField(raw, "categoryCode"),
    coverUrl: normalizeAppUrl(readStringField(raw, "coverUrl")),
    content: readStringField(raw, "content"),
    keywords: readStringField(raw, "keywords"),
    source: readStringField(raw, "source"),
    author: readStringField(raw, "author"),
    publisher: readStringField(raw, "publisher"),
    totalPages: readNumberField(raw, "totalPages"),
    publishedAt: readStringField(raw, "publishedAt"),
    viewCount: readNumberField(raw, "viewCount"),
    sortOrder: readNumberField(raw, "sortOrder")
  });
}
function normalizeBookChapter(raw) {
  return new AppBookChapter$1({
    id: readNumberField(raw, "id"),
    bookId: readNumberField(raw, "bookId"),
    parentId: readNumberField(raw, "parentId"),
    chapterTitle: readStringField(raw, "chapterTitle"),
    content: readStringField(raw, "content"),
    startPage: readNumberField(raw, "startPage"),
    pageCount: readNumberField(raw, "pageCount"),
    paperId: readNumberField(raw, "paperId"),
    sortOrder: readNumberField(raw, "sortOrder")
  });
}
function normalizeBookCategory(raw) {
  return new AppBookCategory$1({
    id: readNumberField(raw, "id"),
    parentId: readNumberField(raw, "parentId"),
    categoryName: readStringField(raw, "categoryName"),
    sortOrder: readNumberField(raw, "sortOrder")
  });
}
function normalizeBook(raw) {
  const chaptersValue = raw["chapters"];
  const chapters = chaptersValue != null && UTS.isInstanceOf(chaptersValue, Array) ? chaptersValue : [];
  return new AppBook$1({
    id: readNumberField(raw, "id"),
    categoryId: readNumberField(raw, "categoryId"),
    bookName: readStringField(raw, "bookName").length > 0 ? readStringField(raw, "bookName") : readStringField(raw, "title"),
    author: readStringField(raw, "author"),
    publisher: readStringField(raw, "publisher"),
    coverUrl: normalizeAppUrl(readStringField(raw, "coverUrl")),
    introduction: readStringField(raw, "introduction").length > 0 ? readStringField(raw, "introduction") : readStringField(raw, "summary"),
    totalPages: readNumberField(raw, "totalPages"),
    paperId: readNumberField(raw, "paperId"),
    publishedAt: readStringField(raw, "publishedAt"),
    browseCount: readNumberField(raw, "browseCount"),
    favoriteCount: readNumberField(raw, "favoriteCount"),
    favorited: readBooleanField(raw, "favorited"),
    progressPercent: readNumberField(raw, "progressPercent"),
    studySeconds: readNumberField(raw, "studySeconds"),
    chapters: chapters.map((item) => {
      return normalizeBookChapter(item);
    })
  });
}
function fetchKnowledgeCategoryTree(success, fail) {
  request("/api/v1/app/knowledge/categories/tree", "GET", null, true, false, (categories) => {
    const categoryList = categories != null && UTS.isInstanceOf(categories, Array) ? categories : [];
    const normalized = categoryList.map((item) => {
      return normalizeKnowledgeCategory(item);
    });
    success(normalized);
  }, (message) => {
    fail(message);
  });
}
function fetchKnowledgeEntries(page, size, keyword, categoryId, success, fail) {
  let path = "/api/v1/app/knowledge/entries?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  if (categoryId > 0) {
    path += "&categoryId=" + String(categoryId);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    const normalizedRecords = records.map((item) => {
      return normalizeKnowledgeEntry(item);
    });
    success(new PageResponse$1({
      records: normalizedRecords,
      total: readNumberField(pageData, "total") > 0 ? readNumberField(pageData, "total") : normalizedRecords.length,
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchKnowledgeEntryDetail(id, success, fail) {
  request("/api/v1/app/knowledge/entries/" + id, "GET", null, true, false, (detail) => {
    success(normalizeKnowledgeEntry(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchBookDetail(id, success, fail) {
  request("/api/v1/app/learning/books/" + id, "GET", null, true, false, (detail) => {
    success(normalizeBook(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchBookCategories(page, size, keyword, parentId, success, fail) {
  let path = "/api/v1/app/learning/book-categories?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  if (parentId > 0) {
    path += "&parentId=" + String(parentId);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    const normalizedRecords = records.map((item) => {
      return normalizeBookCategory(item);
    });
    success(new PageResponse$1({
      records: normalizedRecords,
      total: readNumberField(pageData, "total") > 0 ? readNumberField(pageData, "total") : normalizedRecords.length,
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchBooks(page, size, keyword, categoryId, success, fail) {
  let path = "/api/v1/app/learning/books?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  if (categoryId > 0) {
    path += "&categoryId=" + String(categoryId);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    const normalizedRecords = records.map((item) => {
      return normalizeBook(item);
    });
    success(new PageResponse$1({
      records: normalizedRecords,
      total: readNumberField(pageData, "total") > 0 ? readNumberField(pageData, "total") : normalizedRecords.length,
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchBookChapterDetail(bookId, chapterId, success, fail) {
  request("/api/v1/app/learning/books/" + bookId + "/chapters/" + chapterId, "GET", null, true, false, (detail) => {
    success(normalizeBookChapter(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchAppHome(success, fail) {
  request("/api/v1/app/home", "GET", null, true, false, (data) => {
    success(data);
  }, (message) => {
    fail(message);
  });
}
function fetchTopicDetail(id, success, fail) {
  request("/api/v1/app/learning/topics/" + id, "GET", null, true, false, (detail) => {
    success(detail);
  }, (message) => {
    fail(message);
  });
}
function fetchProfileFavorites(page, size, success, fail, sort = "") {
  let path = "/api/v1/app/profile/favorites?page=" + String(page) + "&size=" + String(size);
  if (sort != null && sort.length > 0) {
    path += "&sort=" + encodeURIComponent(sort);
  }
  request(path, "GET", null, true, false, (pageData) => {
    success(pageData);
  }, (message) => {
    fail(message);
  });
}
function fetchLearningHistory(page, size, success, fail) {
  request("/api/v1/app/profile/browse-histories?page=" + String(page) + "&size=" + String(size) + "&sort=occurredAt,desc", "GET", null, true, false, (pageData) => {
    success(pageData);
  }, (message) => {
    fail(message);
  });
}
function fetchTopicCards(page, size, keyword, success, fail) {
  let path = "/api/v1/app/learning/topics?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeTopicCard(item);
      }),
      total: readNumberField(pageData, "total"),
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchTopicDetailV2(id, success, fail) {
  request("/api/v1/app/learning/topics/" + id, "GET", null, true, false, (detail) => {
    success(normalizeTopicDetail(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchTopicSectionResources(topicId, sectionType, page, size, success, fail) {
  request("/api/v1/app/learning/topics/" + topicId + "/sections/" + sectionType + "?page=" + String(page) + "&size=" + String(size), "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeTopicSectionResource(item);
      }),
      total: readNumberField(pageData, "total"),
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchArticles(page, size, keyword, success, fail) {
  let path = "/api/v1/app/content/articles?page=" + String(page) + "&size=" + String(size);
  if (keyword != null && keyword.length > 0) {
    path += "&keyword=" + encodeURIComponent(keyword);
  }
  request(path, "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeArticle(item);
      }),
      total: readNumberField(pageData, "total"),
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchArticleDetail(id, success, fail) {
  request("/api/v1/app/content/articles/" + id, "GET", null, true, false, (detail) => {
    success(normalizeArticle(detail));
  }, (message) => {
    fail(message);
  });
}
function fetchExamPapers(page, size, success, fail) {
  request("/api/v1/app/learning/exam-papers?page=" + String(page) + "&size=" + String(size), "GET", null, true, false, (pageData) => {
    const recordsValue = pageData["records"];
    const records = recordsValue != null && UTS.isInstanceOf(recordsValue, Array) ? recordsValue : [];
    success(new PageResponse$1({
      records: records.map((item) => {
        return normalizeExamPaper(item);
      }),
      total: readNumberField(pageData, "total"),
      page: readNumberField(pageData, "page") > 0 ? readNumberField(pageData, "page") : page,
      size: readNumberField(pageData, "size") > 0 ? readNumberField(pageData, "size") : size
    }));
  }, (message) => {
    fail(message);
  });
}
function fetchExamPaperDetail(id, success, fail) {
  request("/api/v1/app/learning/exam-papers/" + id, "GET", null, true, false, (detail) => {
    success(normalizeExamPaper(detail));
  }, (message) => {
    fail(message);
  });
}
function submitExamPaper(id, data, success, fail) {
  request("/api/v1/app/learning/exam-papers/" + id + "/submit", "POST", data, true, false, (record) => {
    success(normalizeExamRecord(record));
  }, (message) => {
    fail(message);
  });
}
function fetchExamRecordDetail(id, success, fail) {
  request("/api/v1/app/learning/exam-records/" + id, "GET", null, true, false, (record) => {
    success(normalizeExamRecord(record));
  }, (message) => {
    fail(message);
  });
}
function reportBrowseHistory(data, success, fail) {
  request("/api/v1/app/interaction/browse-histories", "POST", data, true, true, () => {
    success();
  }, (message) => {
    fail(message);
  });
}
function normalizeFavoriteResourceType(resourceType) {
  if (resourceType == null || resourceType.length == 0) {
    return "";
  }
  const normalized = resourceType.toLowerCase();
  if (normalized == "audio" || normalized == "podcast") {
    return "AUDIO";
  }
  if (normalized == "course") {
    return "COURSE";
  }
  if (normalized == "live") {
    return "LIVE";
  }
  if (normalized == "info" || normalized == "topic" || normalized == "article") {
    return "INFO";
  }
  if (normalized == "knowledge") {
    return "KNOWLEDGE";
  }
  return resourceType.toUpperCase();
}
function isFavoriteResourceTypeMatched(left, right) {
  return normalizeFavoriteResourceType(left) == normalizeFavoriteResourceType(right);
}
function checkFavoriteStatus(resourceType, resourceId, success, fail) {
  fetchProfileFavorites(1, 100, (pageData) => {
    const records = pageData.records != null ? pageData.records : [];
    const matched = records.some((item) => {
      return isFavoriteResourceTypeMatched(item.resourceType, resourceType) && item.resourceId == resourceId;
    });
    success(matched);
  }, (message) => {
    fail(message);
  });
}
function updateFavoriteStatus(data, success, fail) {
  request("/api/v1/app/interaction/favorites", "POST", data, true, false, (result) => {
    success(result);
  }, (message) => {
    fail(message);
  });
}
function submitFeedback(data, success, fail) {
  request("/api/v1/app/interaction/feedbacks", "POST", data, true, true, () => {
    success();
  }, (message) => {
    fail(message);
  });
}
function requestAvatarUploadUrl(requestData, success, fail) {
  request("/api/v1/app/profile/avatar/upload-url", "POST", requestData, true, false, (data) => {
    const normalized = normalizeUploadUrlResponse(data);
    if (normalized.uploadUrl == "" || normalized.objectKey == "") {
      fail("头像上传地址返回格式不正确");
      return null;
    }
    success(normalized);
  }, (message) => {
    fail(message);
  });
}
function confirmAvatarUpload(data, success, fail) {
  request("/api/v1/app/profile/avatar/confirm", "POST", data, true, false, (result) => {
    success(result);
  }, (message) => {
    fail(message);
  });
}
function uploadAvatarBinaryFile(filePath, config, binaryConfig, success, fail) {
  if (config.method.toUpperCase() == "PUT") {
    common_vendor.index.getFileSystemManager().readFile({
      filePath,
      success: (readRes) => {
        const putHeaders = new UTSJSONObject({
          "Content-Type": binaryConfig.contentType
        });
        if (config.headers != null) {
          const keys = Object.keys(config.headers);
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const value = config.headers[key];
            if (typeof value == "string") {
              putHeaders[key] = value;
            }
          }
        }
        common_vendor.index.request({
          url: config.uploadUrl,
          method: "PUT",
          data: readRes.data,
          header: putHeaders,
          success: (res) => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              success();
              return null;
            }
            fail("头像文件上传失败");
          },
          fail: (err) => {
            fail(err.errMsg != null && err.errMsg != "" ? err.errMsg : "头像文件上传失败");
          }
        });
      },
      fail: (err) => {
        fail(err.errMsg != null && err.errMsg != "" ? err.errMsg : "读取头像文件失败");
      }
    });
    return null;
  }
  const uploadHeader = new UTSJSONObject({});
  if (config.headers != null) {
    const keys = Object.keys(config.headers);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = config.headers[key];
      if (typeof value == "string") {
        uploadHeader[key] = value;
      }
    }
  }
  const uploadFormData = new UTSJSONObject({});
  if (config.formData != null) {
    const keys = Object.keys(config.formData);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const value = config.formData[key];
      if (typeof value == "string") {
        uploadFormData[key] = value;
      }
    }
  }
  common_vendor.index.uploadFile({
    url: config.uploadUrl,
    filePath,
    name: "file",
    formData: uploadFormData,
    header: uploadHeader,
    success: (res) => {
      if (res.statusCode >= 200 && res.statusCode < 300) {
        success();
        return null;
      }
      fail("头像文件上传失败");
    },
    fail: (err) => {
      fail(err.errMsg != null && err.errMsg != "" ? err.errMsg : "头像文件上传失败");
    }
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
  return normalizeCurrentUserData(user);
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
function redirectToLogin() {
  common_vendor.index.showToast({
    title: "请先登录",
    icon: "none"
  });
  common_vendor.index.navigateTo({
    url: "/pages/login/index"
  });
}
function request(path, method, data = null, needAuth, allowEmptyData, success, fail) {
  const header = new UTSJSONObject({
    "Content-Type": "application/json"
  });
  if (needAuth) {
    const authorization = buildAuthorization();
    if (authorization == "") {
      clearAuthStorage();
      redirectToLogin();
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
      if (statusCode == 401 || body != null && body.code == "UNAUTHORIZED") {
        clearAuthStorage();
        redirectToLogin();
        fail(body != null && body.message != null && body.message != "" ? body.message : "登录状态已失效，请重新登录");
        return null;
      }
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
    user.avatarUrl = normalizeAppUrl(user.avatarUrl);
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
        const saveData = new LoginResponseData$1({
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
class LoginUserProfile2 extends UTS.UTSType {
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
  constructor(options, metadata = LoginUserProfile2.get$UTSMetadata$(), isJSONParse = false) {
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
class LoginResponseData2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          tokenType: { type: String, optional: false },
          accessToken: { type: String, optional: false },
          expiresIn: { type: Number, optional: false },
          user: { type: LoginUserProfile2, optional: true }
        };
      },
      name: "LoginResponseData"
    };
  }
  constructor(options, metadata = LoginResponseData2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.tokenType = this.__props__.tokenType;
    this.accessToken = this.__props__.accessToken;
    this.expiresIn = this.__props__.expiresIn;
    this.user = this.__props__.user;
    delete this.__props__;
  }
}
class CurrentUser2 extends UTS.UTSType {
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
  constructor(options, metadata = CurrentUser2.get$UTSMetadata$(), isJSONParse = false) {
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
class CurrentUserPatch2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          nickname: { type: String, optional: true },
          avatarUrl: { type: String, optional: true },
          mobile: { type: String, optional: true },
          email: { type: String, optional: true },
          profileCompleted: { type: Boolean, optional: true },
          studentId: { type: Number, optional: true },
          certificationStatus: { type: String, optional: true }
        };
      },
      name: "CurrentUserPatch"
    };
  }
  constructor(options, metadata = CurrentUserPatch2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
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
class ApiResponse2 extends UTS.UTSType {
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
  constructor(options, metadata = ApiResponse2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.success = this.__props__.success;
    this.code = this.__props__.code;
    this.message = this.__props__.message;
    this.data = this.__props__.data;
    delete this.__props__;
  }
}
class WechatLoginData2 extends UTS.UTSType {
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
          user: { type: LoginUserProfile2, optional: true }
        };
      },
      name: "WechatLoginData"
    };
  }
  constructor(options, metadata = WechatLoginData2.get$UTSMetadata$(), isJSONParse = false) {
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
class AppProfile2 extends UTS.UTSType {
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
  constructor(options, metadata = AppProfile2.get$UTSMetadata$(), isJSONParse = false) {
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
class AppProfileUpdateRequest2 extends UTS.UTSType {
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
  constructor(options, metadata = AppProfileUpdateRequest2.get$UTSMetadata$(), isJSONParse = false) {
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
class AppFeedbackRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          feedbackType: { type: String, optional: false },
          content: { type: String, optional: false },
          contact: { type: String, optional: false }
        };
      },
      name: "AppFeedbackRequest"
    };
  }
  constructor(options, metadata = AppFeedbackRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.feedbackType = this.__props__.feedbackType;
    this.content = this.__props__.content;
    this.contact = this.__props__.contact;
    delete this.__props__;
  }
}
class AppStudentCertification2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          studentId: { type: Number, optional: false },
          studentNo: { type: String, optional: false },
          realName: { type: String, optional: false },
          mobile: { type: String, optional: false },
          province: { type: String, optional: false },
          city: { type: String, optional: false },
          district: { type: String, optional: false },
          organization: { type: String, optional: false },
          positionTitle: { type: String, optional: false },
          status: { type: String, optional: false },
          certificationStatus: { type: String, optional: false },
          certificationSubmittedAt: { type: String, optional: false },
          certificationReviewedAt: { type: String, optional: false },
          rejectReason: { type: String, optional: false },
          certificationMaterials: { type: String, optional: false },
          enrolledAt: { type: String, optional: false }
        };
      },
      name: "AppStudentCertification"
    };
  }
  constructor(options, metadata = AppStudentCertification2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.studentId = this.__props__.studentId;
    this.studentNo = this.__props__.studentNo;
    this.realName = this.__props__.realName;
    this.mobile = this.__props__.mobile;
    this.province = this.__props__.province;
    this.city = this.__props__.city;
    this.district = this.__props__.district;
    this.organization = this.__props__.organization;
    this.positionTitle = this.__props__.positionTitle;
    this.status = this.__props__.status;
    this.certificationStatus = this.__props__.certificationStatus;
    this.certificationSubmittedAt = this.__props__.certificationSubmittedAt;
    this.certificationReviewedAt = this.__props__.certificationReviewedAt;
    this.rejectReason = this.__props__.rejectReason;
    this.certificationMaterials = this.__props__.certificationMaterials;
    this.enrolledAt = this.__props__.enrolledAt;
    delete this.__props__;
  }
}
class AppStudentCertificationRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          realName: { type: String, optional: false },
          mobile: { type: String, optional: true },
          idCardNo: { type: String, optional: true },
          province: { type: String, optional: true },
          city: { type: String, optional: true },
          district: { type: String, optional: true },
          organization: { type: String, optional: true },
          positionTitle: { type: String, optional: true },
          certificationMaterials: { type: String, optional: true }
        };
      },
      name: "AppStudentCertificationRequest"
    };
  }
  constructor(options, metadata = AppStudentCertificationRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.realName = this.__props__.realName;
    this.mobile = this.__props__.mobile;
    this.idCardNo = this.__props__.idCardNo;
    this.province = this.__props__.province;
    this.city = this.__props__.city;
    this.district = this.__props__.district;
    this.organization = this.__props__.organization;
    this.positionTitle = this.__props__.positionTitle;
    this.certificationMaterials = this.__props__.certificationMaterials;
    delete this.__props__;
  }
}
class LiveSessionVideo2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          liveSessionId: { type: Number, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "LiveSessionVideo"
    };
  }
  constructor(options, metadata = LiveSessionVideo2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.liveSessionId = this.__props__.liveSessionId;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class LiveSession2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          anchorName: { type: String, optional: false },
          speakerName: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          liveUrl: { type: String, optional: false },
          playbackUrl: { type: String, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          reviewStatus: { type: String, optional: false },
          liveStatus: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          videos: { type: UTS.UTSType.withGenerics(Array, [LiveSessionVideo2]), optional: false }
        };
      },
      name: "LiveSession"
    };
  }
  constructor(options, metadata = LiveSession2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.anchorName = this.__props__.anchorName;
    this.speakerName = this.__props__.speakerName;
    this.tags = this.__props__.tags;
    this.liveUrl = this.__props__.liveUrl;
    this.playbackUrl = this.__props__.playbackUrl;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.reviewStatus = this.__props__.reviewStatus;
    this.liveStatus = this.__props__.liveStatus;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.videos = this.__props__.videos;
    delete this.__props__;
  }
}
class CourseVideo2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseId: { type: Number, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "CourseVideo"
    };
  }
  constructor(options, metadata = CourseVideo2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseId = this.__props__.courseId;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class Course2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          courseName: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          lecturerName: { type: String, optional: false },
          introduction: { type: String, optional: false },
          paperId: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          videos: { type: UTS.UTSType.withGenerics(Array, [CourseVideo2]), optional: false }
        };
      },
      name: "Course"
    };
  }
  constructor(options, metadata = Course2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.courseName = this.__props__.courseName;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.lecturerName = this.__props__.lecturerName;
    this.introduction = this.__props__.introduction;
    this.paperId = this.__props__.paperId;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.videos = this.__props__.videos;
    delete this.__props__;
  }
}
class AppPodcastAudio2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          podcastId: { type: Number, optional: false },
          title: { type: String, optional: false },
          audioUrl: { type: String, optional: false },
          durationSeconds: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppPodcastAudio"
    };
  }
  constructor(options, metadata = AppPodcastAudio2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.podcastId = this.__props__.podcastId;
    this.title = this.__props__.title;
    this.audioUrl = this.__props__.audioUrl;
    this.durationSeconds = this.__props__.durationSeconds;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppPodcast2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          publishedAt: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          audios: { type: UTS.UTSType.withGenerics(Array, [AppPodcastAudio2]), optional: false }
        };
      },
      name: "AppPodcast"
    };
  }
  constructor(options, metadata = AppPodcast2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.publishedAt = this.__props__.publishedAt;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.audios = this.__props__.audios;
    delete this.__props__;
  }
}
class TopicItem2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          topicId: { type: Number, optional: false },
          itemType: { type: String, optional: false },
          itemId: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          resource: { type: "Unknown", optional: true }
        };
      },
      name: "TopicItem"
    };
  }
  constructor(options, metadata = TopicItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.topicId = this.__props__.topicId;
    this.itemType = this.__props__.itemType;
    this.itemId = this.__props__.itemId;
    this.sortOrder = this.__props__.sortOrder;
    this.resource = this.__props__.resource;
    delete this.__props__;
  }
}
class Topic2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          items: { type: UTS.UTSType.withGenerics(Array, [TopicItem2]), optional: false }
        };
      },
      name: "Topic"
    };
  }
  constructor(options, metadata = Topic2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.items = this.__props__.items;
    delete this.__props__;
  }
}
class TopicTag2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          tagName: { type: String, optional: false }
        };
      },
      name: "TopicTag"
    };
  }
  constructor(options, metadata = TopicTag2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.tagName = this.__props__.tagName;
    delete this.__props__;
  }
}
class TopicSectionResource2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          progressPercent: { type: Number, optional: false }
        };
      },
      name: "TopicSectionResource"
    };
  }
  constructor(options, metadata = TopicSectionResource2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.progressPercent = this.__props__.progressPercent;
    delete this.__props__;
  }
}
class TopicSection2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sectionType: { type: String, optional: false },
          sectionLabel: { type: String, optional: false },
          total: { type: Number, optional: false },
          hasMore: { type: Boolean, optional: false },
          previewItems: { type: UTS.UTSType.withGenerics(Array, [TopicSectionResource2]), optional: false }
        };
      },
      name: "TopicSection"
    };
  }
  constructor(options, metadata = TopicSection2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sectionType = this.__props__.sectionType;
    this.sectionLabel = this.__props__.sectionLabel;
    this.total = this.__props__.total;
    this.hasMore = this.__props__.hasMore;
    this.previewItems = this.__props__.previewItems;
    delete this.__props__;
  }
}
class TopicCard2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "TopicCard"
    };
  }
  constructor(options, metadata = TopicCard2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
}
class TopicDetail2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          learningRequirements: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          sections: { type: UTS.UTSType.withGenerics(Array, [TopicSection2]), optional: false }
        };
      },
      name: "TopicDetail"
    };
  }
  constructor(options, metadata = TopicDetail2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.learningRequirements = this.__props__.learningRequirements;
    this.coverUrl = this.__props__.coverUrl;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.publishedAt = this.__props__.publishedAt;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.sections = this.__props__.sections;
    delete this.__props__;
  }
}
class Article2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          content: { type: String, optional: false },
          authorName: { type: String, optional: false },
          source: { type: String, optional: false },
          tags: { type: UTS.UTSType.withGenerics(Array, [String]), optional: false },
          viewCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          publishedAt: { type: String, optional: false }
        };
      },
      name: "Article"
    };
  }
  constructor(options, metadata = Article2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.content = this.__props__.content;
    this.authorName = this.__props__.authorName;
    this.source = this.__props__.source;
    this.tags = this.__props__.tags;
    this.viewCount = this.__props__.viewCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.publishedAt = this.__props__.publishedAt;
    delete this.__props__;
  }
}
class ExamQuestionOption2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          optionKey: { type: String, optional: false },
          optionContent: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "ExamQuestionOption"
    };
  }
  constructor(options, metadata = ExamQuestionOption2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.optionKey = this.__props__.optionKey;
    this.optionContent = this.__props__.optionContent;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class ExamQuestion2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          questionType: { type: String, optional: false },
          title: { type: String, optional: false },
          analysis: { type: String, optional: false },
          difficulty: { type: String, optional: false },
          score: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false },
          options: { type: UTS.UTSType.withGenerics(Array, [ExamQuestionOption2]), optional: false }
        };
      },
      name: "ExamQuestion"
    };
  }
  constructor(options, metadata = ExamQuestion2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.questionType = this.__props__.questionType;
    this.title = this.__props__.title;
    this.analysis = this.__props__.analysis;
    this.difficulty = this.__props__.difficulty;
    this.score = this.__props__.score;
    this.sortOrder = this.__props__.sortOrder;
    this.options = this.__props__.options;
    delete this.__props__;
  }
}
class ExamPaper2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          paperName: { type: String, optional: false },
          description: { type: String, optional: false },
          totalScore: { type: Number, optional: false },
          passScore: { type: Number, optional: false },
          durationMinutes: { type: Number, optional: false },
          status: { type: String, optional: false },
          questionCount: { type: Number, optional: false },
          questions: { type: UTS.UTSType.withGenerics(Array, [ExamQuestion2]), optional: false }
        };
      },
      name: "ExamPaper"
    };
  }
  constructor(options, metadata = ExamPaper2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.paperName = this.__props__.paperName;
    this.description = this.__props__.description;
    this.totalScore = this.__props__.totalScore;
    this.passScore = this.__props__.passScore;
    this.durationMinutes = this.__props__.durationMinutes;
    this.status = this.__props__.status;
    this.questionCount = this.__props__.questionCount;
    this.questions = this.__props__.questions;
    delete this.__props__;
  }
}
class ExamAnswerSubmitItem2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          answerContent: { type: String, optional: false }
        };
      },
      name: "ExamAnswerSubmitItem"
    };
  }
  constructor(options, metadata = ExamAnswerSubmitItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.answerContent = this.__props__.answerContent;
    delete this.__props__;
  }
}
class ExamSubmitRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sourceType: { type: String, optional: true },
          sourceId: { type: Number, optional: true },
          answers: { type: UTS.UTSType.withGenerics(Array, [ExamAnswerSubmitItem2]), optional: false }
        };
      },
      name: "ExamSubmitRequest"
    };
  }
  constructor(options, metadata = ExamSubmitRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sourceType = this.__props__.sourceType;
    this.sourceId = this.__props__.sourceId;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
}
class ExamAnswerResult2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          questionId: { type: Number, optional: false },
          questionType: { type: String, optional: false },
          title: { type: String, optional: false },
          answerContent: { type: String, optional: false },
          correctAnswer: { type: String, optional: false },
          analysis: { type: String, optional: false },
          score: { type: Number, optional: false },
          correct: { type: Number, optional: false },
          options: { type: UTS.UTSType.withGenerics(Array, [ExamQuestionOption2]), optional: false }
        };
      },
      name: "ExamAnswerResult"
    };
  }
  constructor(options, metadata = ExamAnswerResult2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.questionId = this.__props__.questionId;
    this.questionType = this.__props__.questionType;
    this.title = this.__props__.title;
    this.answerContent = this.__props__.answerContent;
    this.correctAnswer = this.__props__.correctAnswer;
    this.analysis = this.__props__.analysis;
    this.score = this.__props__.score;
    this.correct = this.__props__.correct;
    this.options = this.__props__.options;
    delete this.__props__;
  }
}
class ExamRecord2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          paperName: { type: String, optional: false },
          score: { type: Number, optional: false },
          passed: { type: Number, optional: false },
          totalScore: { type: Number, optional: false },
          passScore: { type: Number, optional: false },
          submittedAt: { type: String, optional: false },
          answers: { type: UTS.UTSType.withGenerics(Array, [ExamAnswerResult2]), optional: false }
        };
      },
      name: "ExamRecord"
    };
  }
  constructor(options, metadata = ExamRecord2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.paperId = this.__props__.paperId;
    this.paperName = this.__props__.paperName;
    this.score = this.__props__.score;
    this.passed = this.__props__.passed;
    this.totalScore = this.__props__.totalScore;
    this.passScore = this.__props__.passScore;
    this.submittedAt = this.__props__.submittedAt;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
}
class BrowseHistoryRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false }
        };
      },
      name: "BrowseHistoryRequest"
    };
  }
  constructor(options, metadata = BrowseHistoryRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    delete this.__props__;
  }
}
class KnowledgeCategory2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          children: { type: UTS.UTSType.withGenerics(Array, [KnowledgeCategory2]), optional: false }
        };
      },
      name: "KnowledgeCategory"
    };
  }
  constructor(options, metadata = KnowledgeCategory2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.children = this.__props__.children;
    delete this.__props__;
  }
}
class KnowledgeEntry2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          title: { type: String, optional: false },
          summary: { type: String, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          content: { type: String, optional: false },
          keywords: { type: String, optional: true },
          source: { type: String, optional: true },
          author: { type: String, optional: true },
          publisher: { type: String, optional: true },
          totalPages: { type: Number, optional: true },
          publishedAt: { type: String, optional: true },
          viewCount: { type: Number, optional: true },
          sortOrder: { type: Number, optional: true }
        };
      },
      name: "KnowledgeEntry"
    };
  }
  constructor(options, metadata = KnowledgeEntry2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.title = this.__props__.title;
    this.summary = this.__props__.summary;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.coverUrl = this.__props__.coverUrl;
    this.content = this.__props__.content;
    this.keywords = this.__props__.keywords;
    this.source = this.__props__.source;
    this.author = this.__props__.author;
    this.publisher = this.__props__.publisher;
    this.totalPages = this.__props__.totalPages;
    this.publishedAt = this.__props__.publishedAt;
    this.viewCount = this.__props__.viewCount;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppBookChapter2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          bookId: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          chapterTitle: { type: String, optional: false },
          content: { type: String, optional: false },
          startPage: { type: Number, optional: false },
          pageCount: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppBookChapter"
    };
  }
  constructor(options, metadata = AppBookChapter2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.bookId = this.__props__.bookId;
    this.parentId = this.__props__.parentId;
    this.chapterTitle = this.__props__.chapterTitle;
    this.content = this.__props__.content;
    this.startPage = this.__props__.startPage;
    this.pageCount = this.__props__.pageCount;
    this.paperId = this.__props__.paperId;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppBookCategory2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppBookCategory"
    };
  }
  constructor(options, metadata = AppBookCategory2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppBook2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          bookName: { type: String, optional: false },
          author: { type: String, optional: false },
          publisher: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          introduction: { type: String, optional: false },
          totalPages: { type: Number, optional: false },
          paperId: { type: Number, optional: false },
          publishedAt: { type: String, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false },
          chapters: { type: UTS.UTSType.withGenerics(Array, [AppBookChapter2]), optional: false }
        };
      },
      name: "AppBook"
    };
  }
  constructor(options, metadata = AppBook2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.bookName = this.__props__.bookName;
    this.author = this.__props__.author;
    this.publisher = this.__props__.publisher;
    this.coverUrl = this.__props__.coverUrl;
    this.introduction = this.__props__.introduction;
    this.totalPages = this.__props__.totalPages;
    this.paperId = this.__props__.paperId;
    this.publishedAt = this.__props__.publishedAt;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    this.chapters = this.__props__.chapters;
    delete this.__props__;
  }
}
class PageResponse2 extends UTS.UTSType {
  static get$UTSMetadata$(T) {
    return {
      kind: 2,
      get fields() {
        return {
          records: { type: UTS.UTSType.withGenerics(Array, ["Unknown"]), optional: false },
          total: { type: Number, optional: false },
          page: { type: Number, optional: false },
          size: { type: Number, optional: false }
        };
      },
      name: "PageResponse"
    };
  }
  constructor(options, metadata = PageResponse2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.records = this.__props__.records;
    this.total = this.__props__.total;
    this.page = this.__props__.page;
    this.size = this.__props__.size;
    delete this.__props__;
  }
}
class AppResourceRecord2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          source: { type: String, optional: false },
          viewCount: { type: Number, optional: false },
          occurredAt: { type: String, optional: false }
        };
      },
      name: "AppResourceRecord"
    };
  }
  constructor(options, metadata = AppResourceRecord2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.source = this.__props__.source;
    this.viewCount = this.__props__.viewCount;
    this.occurredAt = this.__props__.occurredAt;
    delete this.__props__;
  }
}
class LearningHistoryRecord2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          resourceTypeLabel: { type: String, optional: false },
          visitedTime: { type: String, optional: false },
          progressPercent: { type: Number, optional: false },
          studySeconds: { type: Number, optional: false }
        };
      },
      name: "LearningHistoryRecord"
    };
  }
  constructor(options, metadata = LearningHistoryRecord2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.coverUrl = this.__props__.coverUrl;
    this.resourceTypeLabel = this.__props__.resourceTypeLabel;
    this.visitedTime = this.__props__.visitedTime;
    this.progressPercent = this.__props__.progressPercent;
    this.studySeconds = this.__props__.studySeconds;
    delete this.__props__;
  }
}
class AppFavoriteRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "AppFavoriteRequest"
    };
  }
  constructor(options, metadata = AppFavoriteRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
}
class AppResourceInteraction2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          resourceType: { type: String, optional: false },
          resourceId: { type: Number, optional: false },
          browseCount: { type: Number, optional: false },
          favoriteCount: { type: Number, optional: false },
          favorited: { type: Boolean, optional: false }
        };
      },
      name: "AppResourceInteraction"
    };
  }
  constructor(options, metadata = AppResourceInteraction2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.resourceType = this.__props__.resourceType;
    this.resourceId = this.__props__.resourceId;
    this.browseCount = this.__props__.browseCount;
    this.favoriteCount = this.__props__.favoriteCount;
    this.favorited = this.__props__.favorited;
    delete this.__props__;
  }
}
class HomeCategory2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          parentId: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          iconUrl: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeCategory"
    };
  }
  constructor(options, metadata = HomeCategory2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.parentId = this.__props__.parentId;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.iconUrl = this.__props__.iconUrl;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class HomeContent2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryId: { type: Number, optional: false },
          contentType: { type: String, optional: false },
          targetId: { type: Number, optional: false },
          title: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          linkUrl: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          status: { type: String, optional: false }
        };
      },
      name: "HomeContent"
    };
  }
  constructor(options, metadata = HomeContent2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryId = this.__props__.categoryId;
    this.contentType = this.__props__.contentType;
    this.targetId = this.__props__.targetId;
    this.title = this.__props__.title;
    this.coverUrl = this.__props__.coverUrl;
    this.linkUrl = this.__props__.linkUrl;
    this.sortOrder = this.__props__.sortOrder;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.status = this.__props__.status;
    delete this.__props__;
  }
}
class AppHomeItem2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          contentType: { type: String, optional: false },
          contentTypeLabel: { type: String, optional: false },
          targetId: { type: Number, optional: false },
          title: { type: String, optional: false },
          subtitle: { type: String, optional: false },
          summary: { type: String, optional: false },
          coverUrl: { type: String, optional: false },
          linkUrl: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "AppHomeItem"
    };
  }
  constructor(options, metadata = AppHomeItem2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.contentType = this.__props__.contentType;
    this.contentTypeLabel = this.__props__.contentTypeLabel;
    this.targetId = this.__props__.targetId;
    this.title = this.__props__.title;
    this.subtitle = this.__props__.subtitle;
    this.summary = this.__props__.summary;
    this.coverUrl = this.__props__.coverUrl;
    this.linkUrl = this.__props__.linkUrl;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class AppHomeSection2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          categoryName: { type: String, optional: false },
          categoryCode: { type: String, optional: false },
          iconUrl: { type: String, optional: false },
          description: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          items: { type: UTS.UTSType.withGenerics(Array, [AppHomeItem2]), optional: false }
        };
      },
      name: "AppHomeSection"
    };
  }
  constructor(options, metadata = AppHomeSection2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.categoryName = this.__props__.categoryName;
    this.categoryCode = this.__props__.categoryCode;
    this.iconUrl = this.__props__.iconUrl;
    this.description = this.__props__.description;
    this.sortOrder = this.__props__.sortOrder;
    this.items = this.__props__.items;
    delete this.__props__;
  }
}
class AppHomeResponse2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          sections: { type: UTS.UTSType.withGenerics(Array, [AppHomeSection2]), optional: false }
        };
      },
      name: "AppHomeResponse"
    };
  }
  constructor(options, metadata = AppHomeResponse2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.sections = this.__props__.sections;
    delete this.__props__;
  }
}
class AvatarUploadUrlResponse2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          uploadUrl: { type: String, optional: false },
          objectKey: { type: String, optional: false },
          method: { type: String, optional: false },
          headers: { type: "Unknown", optional: true },
          formData: { type: "Unknown", optional: true },
          publicUrl: { type: String, optional: false }
        };
      },
      name: "AvatarUploadUrlResponse"
    };
  }
  constructor(options, metadata = AvatarUploadUrlResponse2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.uploadUrl = this.__props__.uploadUrl;
    this.objectKey = this.__props__.objectKey;
    this.method = this.__props__.method;
    this.headers = this.__props__.headers;
    this.formData = this.__props__.formData;
    this.publicUrl = this.__props__.publicUrl;
    delete this.__props__;
  }
}
class AvatarUploadUrlRequest2 extends UTS.UTSType {
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
      name: "AvatarUploadUrlRequest"
    };
  }
  constructor(options, metadata = AvatarUploadUrlRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.originalName = this.__props__.originalName;
    this.contentType = this.__props__.contentType;
    this.fileSize = this.__props__.fileSize;
    delete this.__props__;
  }
}
class AvatarConfirmRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          objectKey: { type: String, optional: false },
          originalName: { type: String, optional: true }
        };
      },
      name: "AvatarConfirmRequest"
    };
  }
  constructor(options, metadata = AvatarConfirmRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.objectKey = this.__props__.objectKey;
    this.originalName = this.__props__.originalName;
    delete this.__props__;
  }
}
class AvatarBinaryUploadConfig2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          contentType: { type: String, optional: false }
        };
      },
      name: "AvatarBinaryUploadConfig"
    };
  }
  constructor(options, metadata = AvatarBinaryUploadConfig2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.contentType = this.__props__.contentType;
    delete this.__props__;
  }
}
class ExpertExperience2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          experienceType: { type: String, optional: false },
          title: { type: String, optional: false },
          description: { type: String, optional: false },
          startDate: { type: String, optional: false },
          endDate: { type: String, optional: false },
          sortOrder: { type: Number, optional: false }
        };
      },
      name: "ExpertExperience"
    };
  }
  constructor(options, metadata = ExpertExperience2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.expertId = this.__props__.expertId;
    this.experienceType = this.__props__.experienceType;
    this.title = this.__props__.title;
    this.description = this.__props__.description;
    this.startDate = this.__props__.startDate;
    this.endDate = this.__props__.endDate;
    this.sortOrder = this.__props__.sortOrder;
    delete this.__props__;
  }
}
class ExpertDetail2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          realName: { type: String, optional: false },
          gender: { type: String, optional: true },
          birthDate: { type: String, optional: true },
          mobile: { type: String, optional: true },
          avatarUrl: { type: String, optional: false },
          coverUrl: { type: String, optional: true },
          title: { type: String, optional: false },
          organization: { type: String, optional: false },
          specialty: { type: String, optional: false },
          introduction: { type: String, optional: false },
          consultationNotice: { type: String, optional: false },
          sortOrder: { type: Number, optional: false },
          categoryIds: { type: UTS.UTSType.withGenerics(Array, [Number]), optional: false },
          experiences: { type: UTS.UTSType.withGenerics(Array, [ExpertExperience2]), optional: false }
        };
      },
      name: "ExpertDetail"
    };
  }
  constructor(options, metadata = ExpertDetail2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.realName = this.__props__.realName;
    this.gender = this.__props__.gender;
    this.birthDate = this.__props__.birthDate;
    this.mobile = this.__props__.mobile;
    this.avatarUrl = this.__props__.avatarUrl;
    this.coverUrl = this.__props__.coverUrl;
    this.title = this.__props__.title;
    this.organization = this.__props__.organization;
    this.specialty = this.__props__.specialty;
    this.introduction = this.__props__.introduction;
    this.consultationNotice = this.__props__.consultationNotice;
    this.sortOrder = this.__props__.sortOrder;
    this.categoryIds = this.__props__.categoryIds;
    this.experiences = this.__props__.experiences;
    delete this.__props__;
  }
}
class AppQaAnswer2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          questionId: { type: Number, optional: false },
          adminId: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          content: { type: String, optional: false },
          answeredAt: { type: String, optional: false }
        };
      },
      name: "AppQaAnswer"
    };
  }
  constructor(options, metadata = AppQaAnswer2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.questionId = this.__props__.questionId;
    this.adminId = this.__props__.adminId;
    this.expertId = this.__props__.expertId;
    this.content = this.__props__.content;
    this.answeredAt = this.__props__.answeredAt;
    delete this.__props__;
  }
}
class AppQaQuestion2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: Number, optional: false },
          expertCategoryId: { type: Number, optional: false },
          expertId: { type: Number, optional: false },
          title: { type: String, optional: false },
          content: { type: String, optional: false },
          status: { type: String, optional: false },
          statusCode: { type: String, optional: false },
          statusLabel: { type: String, optional: false },
          answers: { type: UTS.UTSType.withGenerics(Array, [AppQaAnswer2]), optional: false }
        };
      },
      name: "AppQaQuestion"
    };
  }
  constructor(options, metadata = AppQaQuestion2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.expertCategoryId = this.__props__.expertCategoryId;
    this.expertId = this.__props__.expertId;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    this.status = this.__props__.status;
    this.statusCode = this.__props__.statusCode;
    this.statusLabel = this.__props__.statusLabel;
    this.answers = this.__props__.answers;
    delete this.__props__;
  }
}
class AppQaQuestionRequest2 extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          expertCategoryId: { type: Number, optional: true },
          expertId: { type: Number, optional: true },
          title: { type: String, optional: false },
          content: { type: String, optional: false }
        };
      },
      name: "AppQaQuestionRequest"
    };
  }
  constructor(options, metadata = AppQaQuestionRequest2.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.expertCategoryId = this.__props__.expertCategoryId;
    this.expertId = this.__props__.expertId;
    this.title = this.__props__.title;
    this.content = this.__props__.content;
    delete this.__props__;
  }
}
exports.AppBook = AppBook$1;
exports.AppFavoriteRequest = AppFavoriteRequest2;
exports.AppFeedbackRequest = AppFeedbackRequest$1;
exports.AppQaQuestionRequest = AppQaQuestionRequest2;
exports.AppStudentCertificationRequest = AppStudentCertificationRequest2;
exports.AvatarBinaryUploadConfig = AvatarBinaryUploadConfig2;
exports.AvatarConfirmRequest = AvatarConfirmRequest2;
exports.AvatarUploadUrlRequest = AvatarUploadUrlRequest2;
exports.BrowseHistoryRequest = BrowseHistoryRequest2;
exports.ExamSubmitRequest = ExamSubmitRequest$1;
exports.checkFavoriteStatus = checkFavoriteStatus;
exports.clearBindToken = clearBindToken;
exports.confirmAvatarUpload = confirmAvatarUpload;
exports.createQaQuestion = createQaQuestion;
exports.fetchAppHome = fetchAppHome;
exports.fetchArticleDetail = fetchArticleDetail;
exports.fetchArticles = fetchArticles;
exports.fetchAudioDetail = fetchAudioDetail;
exports.fetchBookCategories = fetchBookCategories;
exports.fetchBookChapterDetail = fetchBookChapterDetail;
exports.fetchBookDetail = fetchBookDetail;
exports.fetchBooks = fetchBooks;
exports.fetchCertificationStatus = fetchCertificationStatus;
exports.fetchCourseDetail = fetchCourseDetail;
exports.fetchCourses = fetchCourses;
exports.fetchExamPaperDetail = fetchExamPaperDetail;
exports.fetchExamPapers = fetchExamPapers;
exports.fetchExamRecordDetail = fetchExamRecordDetail;
exports.fetchExpertDetail = fetchExpertDetail;
exports.fetchExperts = fetchExperts;
exports.fetchKnowledgeCategoryTree = fetchKnowledgeCategoryTree;
exports.fetchKnowledgeEntries = fetchKnowledgeEntries;
exports.fetchKnowledgeEntryDetail = fetchKnowledgeEntryDetail;
exports.fetchLearningHistory = fetchLearningHistory;
exports.fetchLiveSessionDetail = fetchLiveSessionDetail;
exports.fetchLiveSessions = fetchLiveSessions;
exports.fetchProfile = fetchProfile;
exports.fetchProfileFavorites = fetchProfileFavorites;
exports.fetchQaQuestionDetail = fetchQaQuestionDetail;
exports.fetchQaQuestions = fetchQaQuestions;
exports.fetchTopicCards = fetchTopicCards;
exports.fetchTopicDetail = fetchTopicDetail;
exports.fetchTopicDetailV2 = fetchTopicDetailV2;
exports.fetchTopicSectionResources = fetchTopicSectionResources;
exports.getBindToken = getBindToken;
exports.getCurrentUserFromStorage = getCurrentUserFromStorage;
exports.hasBoundMobile = hasBoundMobile;
exports.hasToken = hasToken;
exports.loginBySms = loginBySms;
exports.loginByWechat = loginByWechat;
exports.logout = logout;
exports.normalizeAppUrl = normalizeAppUrl;
exports.reportBrowseHistory = reportBrowseHistory;
exports.requestAvatarUploadUrl = requestAvatarUploadUrl;
exports.saveLogin = saveLogin;
exports.sendSmsCode = sendSmsCode;
exports.submitCertification = submitCertification;
exports.submitExamPaper = submitExamPaper;
exports.submitFeedback = submitFeedback;
exports.updateFavoriteStatus = updateFavoriteStatus;
exports.updateProfile = updateProfile;
exports.uploadAvatarBinaryFile = uploadAvatarBinaryFile;
exports.wechatBindMobile = wechatBindMobile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
