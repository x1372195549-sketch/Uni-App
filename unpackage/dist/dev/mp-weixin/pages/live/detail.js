"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const utils_auth = require("../../utils/auth.js");
class DetailVideoItem extends UTS.UTSType {
  static get$UTSMetadata$() {
    return {
      kind: 2,
      get fields() {
        return {
          id: { type: String, optional: false },
          title: { type: String, optional: false },
          videoUrl: { type: String, optional: false },
          durationText: { type: String, optional: false }
        };
      },
      name: "DetailVideoItem"
    };
  }
  constructor(options, metadata = DetailVideoItem.get$UTSMetadata$(), isJSONParse = false) {
    super();
    this.__props__ = UTS.UTSType.initProps(options, metadata, isJSONParse);
    this.id = this.__props__.id;
    this.title = this.__props__.title;
    this.videoUrl = this.__props__.videoUrl;
    this.durationText = this.__props__.durationText;
    delete this.__props__;
  }
}
const RESOURCE_TYPE = "live";
const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent({
  __name: "detail",
  setup(__props) {
    const liveId = common_vendor.ref("");
    const liveTitle = common_vendor.ref("直播详情");
    const coverUrl = common_vendor.ref("");
    const anchorText = common_vendor.ref("待定");
    const speakerText = common_vendor.ref("待定");
    const startText = common_vendor.ref("待定");
    const endText = common_vendor.ref("待定");
    const statusLabel = common_vendor.ref("未开始");
    const tagText = common_vendor.ref("");
    const favoriteCountText = common_vendor.ref("0");
    const liveIntro = common_vendor.ref("暂无直播介绍");
    const liveUrl = common_vendor.ref("");
    const playbackUrl = common_vendor.ref("");
    const isFavorited = common_vendor.ref(false);
    const isFavoriteLoading = common_vendor.ref(false);
    const videoItems = common_vendor.ref([]);
    const selectedVideoId = common_vendor.ref("");
    const selectedVideoTitle = common_vendor.ref("");
    const selectedVideoUrl = common_vendor.ref("");
    const actionButtonText = common_vendor.computed(() => {
      if (statusLabel.value == "直播中") {
        return "进入直播";
      }
      if (statusLabel.value == "已结束") {
        return playbackUrl.value.length > 0 ? "观看回放" : "直播已结束";
      }
      if (statusLabel.value == "已取消") {
        return "直播已取消";
      }
      return "等待开播";
    });
    function safeText(value = null) {
      return value == null || value.length == 0 ? "" : value;
    }
    function formatDateTime(value) {
      const text = safeText(value);
      if (text.length == 0) {
        return "待定";
      }
      if (text.length >= 16) {
        return text.slice(0, 16).replace("T", " ");
      }
      return text.replace("T", " ");
    }
    function formatDuration(seconds) {
      if (seconds <= 0) {
        return "--:--";
      }
      const minute = Math.floor(seconds / 60);
      const second = seconds % 60;
      const minuteText = minute < 10 ? "0" + String(minute) : String(minute);
      const secondText = second < 10 ? "0" + String(second) : String(second);
      return minuteText + ":" + secondText;
    }
    function readDurationFromEvent(event = null) {
      if (event == null || event.detail == null) {
        return 0;
      }
      const durationValue = event.detail.duration;
      if (typeof durationValue == "number") {
        return Math.floor(durationValue);
      }
      return 0;
    }
    function updateRelatedVideoDuration(id, durationText) {
      videoItems.value = videoItems.value.map((item) => {
        if (item.id == id) {
          return new DetailVideoItem({
            id: item.id,
            title: item.title,
            videoUrl: item.videoUrl,
            durationText
          });
        }
        return item;
      });
    }
    function syncSelectedVideoDuration(event = null) {
      const duration = readDurationFromEvent(event);
      if (duration > 0 && selectedVideoId.value.length > 0) {
        updateRelatedVideoDuration(selectedVideoId.value, formatDuration(duration));
      }
    }
    function mapLiveStatus(status) {
      const normalized = safeText(status).toUpperCase();
      if (normalized == "LIVE" || normalized == "1") {
        return "直播中";
      }
      if (normalized == "ENDED" || normalized == "2") {
        return "已结束";
      }
      if (normalized == "CANCELED" || normalized == "3") {
        return "已取消";
      }
      return "未开始";
    }
    function mapVideoItem(item, index) {
      const titleText = safeText(item.title);
      return new DetailVideoItem({
        id: String(item.id > 0 ? item.id : index + 1),
        title: titleText.length > 0 ? titleText : "视频 " + String(index + 1),
        videoUrl: utils_auth.normalizeAppUrl(safeText(item.videoUrl)),
        durationText: formatDuration(item.durationSeconds)
      });
    }
    function goBack() {
      const pages = getCurrentPages();
      if (pages.length > 1) {
        common_vendor.index.navigateBack();
        return null;
      }
      common_vendor.index.redirectTo({ url: "/pages/live/index" });
    }
    function loadFavoriteStatus() {
      if (liveId.value.length == 0) {
        return null;
      }
      utils_auth.checkFavoriteStatus(RESOURCE_TYPE, Number(liveId.value), (favorited) => {
        isFavorited.value = favorited;
      }, () => {
        isFavorited.value = false;
      });
    }
    function reportBrowse() {
      if (liveId.value.length == 0) {
        return null;
      }
      utils_auth.reportBrowseHistory(new utils_auth.BrowseHistoryRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(liveId.value)
      }), () => {
      }, () => {
      });
    }
    function toggleFavorite() {
      if (liveId.value.length == 0 || isFavoriteLoading.value) {
        return null;
      }
      isFavoriteLoading.value = true;
      utils_auth.updateFavoriteStatus(new utils_auth.AppFavoriteRequest({
        resourceType: RESOURCE_TYPE,
        resourceId: Number(liveId.value),
        favorited: !isFavorited.value
      }), (result) => {
        isFavorited.value = result.favorited;
        favoriteCountText.value = String(result.favoriteCount != null ? result.favoriteCount : 0);
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: result.favorited ? "收藏成功" : "已取消收藏",
          icon: "none"
        });
      }, (message) => {
        isFavoriteLoading.value = false;
        common_vendor.index.showToast({
          title: message.length > 0 ? message : "收藏操作失败",
          icon: "none"
        });
      });
    }
    function applyLiveDetail(detail) {
      const titleText = safeText(detail.title);
      liveTitle.value = titleText.length > 0 ? titleText : "直播详情";
      coverUrl.value = safeText(detail.coverUrl);
      anchorText.value = safeText(detail.anchorName).length > 0 ? safeText(detail.anchorName) : "待定";
      speakerText.value = safeText(detail.speakerName).length > 0 ? safeText(detail.speakerName) : anchorText.value;
      startText.value = formatDateTime(detail.startAt);
      endText.value = formatDateTime(detail.endAt);
      statusLabel.value = mapLiveStatus(detail.liveStatus);
      tagText.value = detail.tags != null ? detail.tags.join(" / ") : "";
      favoriteCountText.value = String(detail.favoriteCount);
      liveUrl.value = utils_auth.normalizeAppUrl(safeText(detail.liveUrl));
      playbackUrl.value = utils_auth.normalizeAppUrl(safeText(detail.playbackUrl));
      isFavorited.value = detail.favorited;
      videoItems.value = detail.videos != null ? detail.videos.filter((item) => {
        return item.videoUrl.length > 0;
      }).sort((left, right) => {
        return left.sortOrder - right.sortOrder;
      }).map((item, index) => {
        return mapVideoItem(item, index);
      }) : [];
      selectedVideoId.value = "";
      selectedVideoTitle.value = "";
      selectedVideoUrl.value = "";
      const introParts = new Array();
      introParts.push("主播：" + anchorText.value);
      introParts.push("主讲：" + speakerText.value);
      introParts.push("开始时间：" + startText.value);
      introParts.push("结束时间：" + endText.value);
      if (tagText.value.length > 0) {
        introParts.push("标签：" + tagText.value);
      }
      if (statusLabel.value == "直播中" && liveUrl.value.length > 0) {
        introParts.push("当前可进入直播观看。");
      } else if (statusLabel.value == "已结束" && playbackUrl.value.length > 0) {
        introParts.push("当前可观看回放。");
      } else if (statusLabel.value == "已取消") {
        introParts.push("本场直播已取消。");
      } else {
        introParts.push("当前直播尚未开始。");
      }
      liveIntro.value = introParts.join("\n");
    }
    function loadLiveDetail() {
      if (liveId.value.length == 0) {
        return null;
      }
      utils_auth.fetchLiveSessionDetail(liveId.value, (detail) => {
        applyLiveDetail(detail);
        reportBrowse();
      }, (message) => {
        common_vendor.index.showToast({
          title: message.length > 0 ? message : "直播详情加载失败",
          icon: "none"
        });
      });
    }
    function openPlayer(url, title, playMode) {
      const targetUrl = utils_auth.normalizeAppUrl(url);
      if (targetUrl.length == 0) {
        common_vendor.index.showToast({
          title: "暂无可用地址",
          icon: "none"
        });
        return null;
      }
      common_vendor.index.navigateTo({
        url: "/pages/live/player?mode=" + encodeURIComponent(playMode) + "&title=" + encodeURIComponent(title) + "&url=" + encodeURIComponent(targetUrl)
      });
    }
    function selectRelatedVideo(item) {
      const targetUrl = utils_auth.normalizeAppUrl(item.videoUrl);
      if (targetUrl.length == 0) {
        common_vendor.index.showToast({
          title: "暂无可用地址",
          icon: "none"
        });
        return null;
      }
      selectedVideoId.value = item.id;
      selectedVideoTitle.value = item.title;
      selectedVideoUrl.value = targetUrl;
    }
    function enterLive() {
      if (statusLabel.value == "已取消") {
        common_vendor.index.showToast({
          title: "直播已取消",
          icon: "none"
        });
        return null;
      }
      if (statusLabel.value == "直播中") {
        openPlayer(liveUrl.value, liveTitle.value, "live");
        return null;
      }
      if (statusLabel.value == "已结束") {
        if (playbackUrl.value.length == 0) {
          common_vendor.index.showToast({
            title: "暂无回放地址",
            icon: "none"
          });
          return null;
        }
        openPlayer(playbackUrl.value, liveTitle.value, "playback");
        return null;
      }
      common_vendor.index.showToast({
        title: "直播尚未开始",
        icon: "none"
      });
    }
    common_vendor.onLoad((options = null) => {
      const routeOptions = options;
      const idValue = routeOptions["id"];
      if (typeof idValue == "string" && idValue.length > 0) {
        liveId.value = idValue;
      }
      loadLiveDetail();
      loadFavoriteStatus();
    });
    common_vendor.onShow(() => {
      loadFavoriteStatus();
    });
    return (_ctx, _cache) => {
      "raw js";
      const __returned__ = common_vendor.e({
        a: common_assets._imports_0$1,
        b: common_vendor.o(goBack),
        c: coverUrl.value.length > 0
      }, coverUrl.value.length > 0 ? {
        d: coverUrl.value
      } : {}, {
        e: common_vendor.t(statusLabel.value),
        f: common_vendor.t(liveTitle.value),
        g: common_vendor.t(isFavorited.value ? "已收藏" : "收藏"),
        h: common_vendor.n(isFavorited.value ? "favorite-text-active" : ""),
        i: common_vendor.o(toggleFavorite),
        j: common_vendor.t(startText.value),
        k: common_vendor.t(favoriteCountText.value),
        l: common_vendor.t(anchorText.value),
        m: common_vendor.t(speakerText.value),
        n: common_vendor.t(statusLabel.value),
        o: common_vendor.t(endText.value),
        p: tagText.value.length > 0
      }, tagText.value.length > 0 ? {
        q: common_vendor.t(tagText.value)
      } : {}, {
        r: common_vendor.t(liveIntro.value),
        s: videoItems.value.length > 0
      }, videoItems.value.length > 0 ? common_vendor.e({
        t: selectedVideoUrl.value.length > 0
      }, selectedVideoUrl.value.length > 0 ? {
        v: selectedVideoUrl.value,
        w: selectedVideoTitle.value,
        x: coverUrl.value,
        y: common_vendor.o(syncSelectedVideoDuration),
        z: common_vendor.o(syncSelectedVideoDuration)
      } : {}, {
        A: common_vendor.f(videoItems.value, (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: common_vendor.t(item.durationText),
            c: item.id,
            d: common_vendor.n(item.id == selectedVideoId.value ? "video-card video-card-active" : "video-card"),
            e: common_vendor.o(($event) => {
              return selectRelatedVideo(item);
            }, item.id)
          };
        })
      }) : {}, {
        B: common_vendor.t(actionButtonText.value),
        C: common_vendor.o(enterLive),
        D: common_vendor.sei(common_vendor.gei(_ctx, ""), "view")
      });
      return __returned__;
    };
  }
});
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/live/detail.js.map
