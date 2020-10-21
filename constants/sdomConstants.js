export const urlConstants = {
    fetchCategories: `https://sdom.zevcore.in/4RhvfbEGwnsmxcat.php`,
    fetchPosts: `https://sdom.zevcore.in/4RhvfbEGwnsmxcpst.php`,
    setPostCounts: `https://sdom.zevcore.in/4RhvfbEGwnsmxliks.php`,
    fetchReportAbuses: `https://sdom.zevcore.in/4RhvfbEGwnsmxrpts.php`,
    setReportAbuseIdWithPostId: `https://sdom.zevcore.in/4RhvfbEGwnsmxrptlist.php`
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

export const setPostImages = {
    SET_POST_WALLPAPER: `postWallPaper`,
    SET_POST_DOWNLOAD: `postDownload`
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
    ASK_ME_LATER: `Ask Me Later`
}

export const permissionMessages = {
    READ_WRITE_EXTERNAL_STORAGE_TITLE: `Requesting Permission to access your external storage`,
    READ_WRITE_EXTERNAL_STORAGE_MESSAGE: `Stardom requires access to write to your External Storage`
}

export const stringConstants = {
    EMPTY: "",
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

export const reportAbuseRequestPayloadKeys = {
    POST_ID: `postId`,
    POST_REPORT_ABUSE_ID: `postReportAbuseId`,
    POST_REPORT_ABUSE_SUBMITTED: `reportAbuseSubmitted`
}

export const responseStringData = {
    SUCCESS: `Success`
}