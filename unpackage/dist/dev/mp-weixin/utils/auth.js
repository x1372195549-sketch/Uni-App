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
          liveUrl: { type: String, optional: false },
          playbackUrl: { type: String, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          reviewStatus: { type: String, optional: false },
          liveStatus: { type: String, optional: false }
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
    this.liveUrl = this.__props__.liveUrl;
    this.playbackUrl = this.__props__.playbackUrl;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.reviewStatus = this.__props__.reviewStatus;
    this.liveStatus = this.__props__.liveStatus;
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
  return normalizeExternalUrl(rawUrl);
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
function fetchLiveSessions(success, fail) {
  request("/api/v1/app/live-sessions?page=1&size=20", "GET", null, true, false, (pageData) => {
    success(pageData);
  }, (message) => {
    fail(message);
  });
}
function fetchLiveSessionDetail(id, success, fail) {
  request("/api/v1/app/live-sessions/" + id, "GET", null, true, false, (detail) => {
    success(detail);
  }, (message) => {
    fail(message);
  });
}
function fetchCourses(success, fail) {
  request("/api/v1/app/learning/courses?page=1&size=20", "GET", null, true, false, (pageData) => {
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
function fetchTopics(success, fail) {
  request("/api/v1/app/learning/topics?page=1&size=20", "GET", null, true, false, (pageData) => {
    success(pageData);
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
function fetchHomeCategories(success, fail) {
  request("/api/v1/admin/content/home/categories?page=1&size=50", "GET", null, true, false, (pageData) => {
    success(pageData);
  }, (message) => {
    fail(message);
  });
}
function fetchHomeContents(success, fail) {
  request("/api/v1/admin/content/home/contents?page=1&size=50", "GET", null, true, false, (pageData) => {
    success(pageData);
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
function fetchProfileFavorites(page, size, success, fail) {
  request("/api/v1/app/profile/favorites?page=" + String(page) + "&size=" + String(size), "GET", null, true, false, (pageData) => {
    success(pageData);
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
          liveUrl: { type: String, optional: false },
          playbackUrl: { type: String, optional: false },
          startAt: { type: String, optional: false },
          endAt: { type: String, optional: false },
          reviewStatus: { type: String, optional: false },
          liveStatus: { type: String, optional: false }
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
    this.liveUrl = this.__props__.liveUrl;
    this.playbackUrl = this.__props__.playbackUrl;
    this.startAt = this.__props__.startAt;
    this.endAt = this.__props__.endAt;
    this.reviewStatus = this.__props__.reviewStatus;
    this.liveStatus = this.__props__.liveStatus;
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
exports.AppFavoriteRequest = AppFavoriteRequest2;
exports.AppQaQuestionRequest = AppQaQuestionRequest2;
exports.AppStudentCertificationRequest = AppStudentCertificationRequest2;
exports.AvatarBinaryUploadConfig = AvatarBinaryUploadConfig2;
exports.AvatarConfirmRequest = AvatarConfirmRequest2;
exports.AvatarUploadUrlRequest = AvatarUploadUrlRequest2;
exports.checkFavoriteStatus = checkFavoriteStatus;
exports.clearBindToken = clearBindToken;
exports.confirmAvatarUpload = confirmAvatarUpload;
exports.createQaQuestion = createQaQuestion;
exports.fetchAudioDetail = fetchAudioDetail;
exports.fetchCertificationStatus = fetchCertificationStatus;
exports.fetchCourseDetail = fetchCourseDetail;
exports.fetchCourses = fetchCourses;
exports.fetchExpertDetail = fetchExpertDetail;
exports.fetchExperts = fetchExperts;
exports.fetchHomeCategories = fetchHomeCategories;
exports.fetchHomeContents = fetchHomeContents;
exports.fetchKnowledgeCategoryTree = fetchKnowledgeCategoryTree;
exports.fetchKnowledgeEntries = fetchKnowledgeEntries;
exports.fetchKnowledgeEntryDetail = fetchKnowledgeEntryDetail;
exports.fetchLiveSessionDetail = fetchLiveSessionDetail;
exports.fetchLiveSessions = fetchLiveSessions;
exports.fetchProfile = fetchProfile;
exports.fetchProfileFavorites = fetchProfileFavorites;
exports.fetchQaQuestionDetail = fetchQaQuestionDetail;
exports.fetchQaQuestions = fetchQaQuestions;
exports.fetchTopicDetail = fetchTopicDetail;
exports.fetchTopics = fetchTopics;
exports.getBindToken = getBindToken;
exports.getCurrentUserFromStorage = getCurrentUserFromStorage;
exports.hasBoundMobile = hasBoundMobile;
exports.hasToken = hasToken;
exports.loginBySms = loginBySms;
exports.loginByWechat = loginByWechat;
exports.logout = logout;
exports.normalizeAppUrl = normalizeAppUrl;
exports.requestAvatarUploadUrl = requestAvatarUploadUrl;
exports.saveLogin = saveLogin;
exports.sendSmsCode = sendSmsCode;
exports.submitCertification = submitCertification;
exports.updateFavoriteStatus = updateFavoriteStatus;
exports.updateProfile = updateProfile;
exports.uploadAvatarBinaryFile = uploadAvatarBinaryFile;
exports.wechatBindMobile = wechatBindMobile;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/auth.js.map
