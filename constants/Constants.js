export const urlConstants = {
    fetchCategories: `https://www.wallpiper.app/4RhvfbEGwnsmxcat.php`,
    fetchPosts: `https://www.wallpiper.app/4RhvfbEGwnsmxcpst.php`,
    setPostCounts: `https://www.wallpiper.app/4RhvfbEGwnsmxliks.php`,
    fetchReportAbuses: `https://www.wallpiper.app/4RhvfbEGwnsmxrpts.php`,
    setReportAbuseIdWithPostId: `https://www.wallpiper.app/4RhvfbEGwnsmxrptlist.php`
}

export const asyncStorageKeys = {
    SAVE_CATEGORY_ID: `@save_category_id`,
    SAVE_CATEGORY_BUTTON_TYPE: `@save_category_button_type`,
    SAVE_POST_COUNTS: `@save_post_counts`,
    SAVE_SELECTED_REPORT: `@save_selected_report`
}

export const savePostCountKeys = {
    SELECTED_POST_LIKES: `selectedPostIdLikesCount`
}

export const componentErrorConsts = {
    ERROR_BOUNDARY: 1,
    CATEGORY_WITHOUT_POST: 2,
    POST_IMAGE_LOAD_ERROR: 3
}

export const setPostImages = {
    SET_POST_WALLPAPER: `postWallPaper`,
    SET_POST_DOWNLOAD: `postDownload`
}

export const jsonConstants = {
    EMPTY: []
}

export const postCountTypes = {
    POST_LIKES: `postLikes`,
    POST_DOWNLOADS: `postDownloads`,
    POST_WALLPAPERS: `postWallPapers`
}

export const postCountRequestKeys = {
    POST_ID_KEY: `post_id`,
    POST_COUNT_TYPE_KEY: `post_count_type`
}

export const permissionsButtons = {
    OK: `OK`,
    CANCEL: `Cancel`,
    ASK_ME_LATER: `Ask Me Later`,
    NONE: `none`,
    AUTO: `auto`
}

export const permissionMessages = {
    READ_WRITE_EXTERNAL_STORAGE_TITLE: `Requesting Permission to access your external storage`,
    READ_WRITE_EXTERNAL_STORAGE_MESSAGE: `WallPiper requires access to write to your External Storage`
}

export const stringConstants = {
    EMPTY: ``,
    COMMA: `,`,
    PLUS: `+`,
    SPACE: ` `,
    PIPELINE_JOIN: ` | `
}

export const modalTextConstants = {
    REPORT_ABUSE_TITLE: `Report this post`,
    CANCEL_BUTTON: `Cancel`,
    CLOSE_BUTTON: `Close`,
    SUBMIT_BUTTON: `Submit`
}

export const alertTextMessages = {
    CONFIRM_TITLE: `Set Wallpaper`,
    POST_WALLPAPER_TEXT: `Do you want to set the current image as Home Screen and Lock Screen?`,
    POST_REPORT_ABUSED: `You have already submitted the report!`,
    WALLPAPER_SET_SUCESS: `Success`,
    WALLPAPER_SET_SUCCESS_TEXT: `Image successfully set as wallpaper`
}

export const errorMessages = {
    ERROR_BOUNDARY: `The app ran into a problem and could not continue.We apologise for any inconvenience this has caused! Press the button below to restart the app and sign back in.Please contact us if this issue persists.`,
    SELECT_OTHER_CATEGORIES: `Selected category has no posts! Please select another category by clicking below.`,
    POST_IMAGE_LOAD_ERROR: `Image failed to load!`,
}

export const reportAbuseRequestPayloadKeys = {
    POST_ID: `postId`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
}

export const responseStringData = {
    SUCCESS: `Success`
}

export const postitionStringConstants = {
    UP: `up`, RIGHT: `right`, DOWN: `down`, LEFT: `left`
}

export const colorConstants = {
    TRANSPARENT_BUTTON: `rgba(0, 0, 0, 0.0)`,
    GREY: `#99999`,
    YELLOW: `#fcc200`,
    WHITE: `#ffffff`,
    BLACK: `#3d3d3d`
}

export const backHandlerConstants = {
    HARDWAREBACKPRESS: `hardwareBackPress`
}