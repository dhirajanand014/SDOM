import axios from 'axios'
import {
    urlConstants, asyncStorageKeys,
    postCountTypes, postCountRequestKeys,
    savePostCountKeys, setPostImages,
    permissionsButtons, permissionMessages
} from '../constants/sdomConstants';
import { Alert, NativeModules, PermissionsAndroid, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchCategoryData = async () => {
    const responseData = await axios.get(urlConstants.fetchCategories);
    return responseData.data.categories;
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    try {
        const responseCategoryData = await fetchCategoryData();
        if (responseCategoryData) {
            const selectedCategories = await getSelectedCategoryIdsFromStorage();
            const parsedSelectedCategoryIds = selectedCategories.length && JSON.parse(selectedCategories) || [];
            responseCategoryData.map((category) =>
                category.isSelected = parsedSelectedCategoryIds.some(selectedCategory =>
                    category.categoryId == selectedCategory.selectedCategoryId));
        }

        let initialCategory = await getCategoryButtonType();
        initialCategory = initialCategory && initialCategory || 'skipButton';

        setCategory({ ...category, categories: responseCategoryData, initialCategory: initialCategory });
    } catch (error) {
        console.log(error);
        setCategory({ ...category, categories: [], initialCategory: 'skipButton' });
    }
}

export const fetchPostsAndSaveToState = async (sdomDatastate, setSdomDatastate) => {
    try {
        let categoryPostsData = [];
        const responseData = await axios.get(urlConstants.fetchPosts);
        if (responseData) {
            const responsePostsData = responseData.data.posts;
            const selectedCategories = await getSelectedCategoryIdsFromStorage();

            const fetchedPostCounts = await getPostCounts();

            const postCounts = fetchedPostCounts && JSON.parse(fetchedPostCounts) || [];

            const parsedCategoryIds = selectedCategories && JSON.parse(selectedCategories) || categoryPostsData;
            categoryPostsData = parsedCategoryIds && parsedCategoryIds.length &&
                responsePostsData.filter(post => parsedCategoryIds.some((selectedCategory) =>
                    post.categoryIds[0].split(',').includes(selectedCategory.selectedCategoryId))).sort((datePost1, datePost2) => {
                        return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
                    }) || responsePostsData.sort((datePost1, datePost2) => {
                        return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
                    });

            categoryPostsData.map(postItem => {
                const postHasLikes = postCounts && postCounts[savePostCountKeys.SELECTED_POST_LIKES] &&
                    postCounts[savePostCountKeys.SELECTED_POST_LIKES].some(postId => postItem.postId == postId);
                if (postHasLikes)
                    postItem.likeDisabled = postHasLikes;
            });
        }
        setSdomDatastate({ ...sdomDatastate, posts: categoryPostsData, });
    } catch (error) {
        console.log(error);
        setSdomDatastate({ ...sdomDatastate, posts: [] });
    }
}

export const saveCategoryIdsToStorage = async (categoryIds) => {
    try {
        await AsyncStorage.setItem(asyncStorageKeys.SAVE_CATEGORY_ID, categoryIds);
    } catch (error) {
        console.log('Cannot save categoryIds to the storage', error);
    }
}

export const getSelectedCategoryIdsFromStorage = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_CATEGORY_ID) || "";
    } catch (error) {
        console.log('Cannot fetch the categoryIds from the storage', error);
    }
}

export const increaseAndSetPostCounts = async (post, sdomDatastate, setSdomDatastate, postCountType) => {
    try {
        if (postCountType == postCountTypes.POST_LIKES) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postLikes = ++post.postLikes;
        } else if (postCountType == postCountTypes.POST_DOWNLOADS) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postDownloads = ++post.postDownloads;
        } else if (postCountType == postCountTypes.POST_WALLPAPERS) {
            sdomDatastate.posts.find(item => item.postId == post.postId).postWallPapers = ++post.postWallPapers;
        }

        const postCountRequest = {
            [postCountRequestKeys.POST_ID_KEY]: parseInt(post.postId),
            [postCountRequestKeys.POST_COUNT_TYPE_KEY]: postCountType
        }

        setSdomDatastate({ ...sdomDatastate });

        if (postCountRequest) {
            const response = await axios.post(urlConstants.setPostCounts, postCountRequest);
            if (response && response.data == "Success") {
                if (postCountType == postCountTypes.POST_LIKES) {
                    ToastAndroid.show(`You have liked the post : ${post.postTitle}`, ToastAndroid.SHORT);
                    await savePostCounts(post.postId, savePostCountKeys.SELECTED_POST_LIKES, sdomDatastate, setSdomDatastate);
                }
                postCountType == postCountTypes.POST_DOWNLOADS &&
                    ToastAndroid.show(`You have downloaded the post : ${post.postTitle}`, ToastAndroid.SHORT);
            }
        }
    } catch (error) {
        console.log("Cannot set the increased count to the database", error);
    }
}

export const savePostCounts = async (postId, postIdForSelectedCountType, sdomDatastate, setSdomDatastate) => {
    try {
        const getPostIdOfPostForCount = await getPostCounts(asyncStorageKeys.SAVE_POST_COUNTS);
        let postCounts, postIds = [], postIdsJson;
        if (getPostIdOfPostForCount) {
            postCounts = JSON.parse(getPostIdOfPostForCount) || "";
        }
        if (postIdForSelectedCountType == savePostCountKeys.SELECTED_POST_LIKES) {
            if (postCounts) {
                postIds = postCounts[savePostCountKeys.SELECTED_POST_LIKES];
                !postIds.includes(postId) && postIds.push(postId);
            }
            else {
                postIds.push(postId);
                postCounts = {
                    [savePostCountKeys.SELECTED_POST_LIKES]: postIds
                }
            }
            sdomDatastate.posts.filter(post => post.postId == postId).map(item => item.likeDisabled = true);
            setSdomDatastate({ ...sdomDatastate });
            postIdsJson = JSON.stringify(postCounts);
            await AsyncStorage.setItem(asyncStorageKeys.SAVE_POST_COUNTS, postIdsJson)
        }
    } catch (error) {
        console.log(`Cannot save the post counts for the post id ${postId}`, error);
    }
}

export const getPostCounts = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_POST_COUNTS);
    } catch (error) {
        console.log(`Cannot fetch the post ids from the selected post counts for type: ${postIdForSelectedCountType}`,
            error);
    }
}

export const setCurrentImageAsWallPaper = async (postUrl, postTitle, postType) => {
    try {
        NativeModules.SdomApi.setPostAsWallPaper(postUrl, postTitle, postType);
    } catch (error) {
        console.log("Cannot set current image as wallpaper", error);
    }
}

export const downloadCurrentImage = async (postUrl, postTitle, postType) => {
    try {
        NativeModules.SdomApi.downloadPostImage(postUrl, postTitle, postType);
    } catch (error) {
        console.log("Cannot download the current image", error);
    }
}

export const saveCategoryButtonType = async (inCategoryButtonType) => {
    try {
        await AsyncStorage.setItem(asyncStorageKeys.SAVE_CATEGORY_BUTTON_TYPE, inCategoryButtonType);
    } catch (error) {
        console.log('Cannot save button type to the storage', error);
    }
}

export const getCategoryButtonType = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_CATEGORY_BUTTON_TYPE) || "";
    } catch (error) {
        console.log('Cannot fetch the save button type from the storage', error);
    }
}

export const postWallPaperAlert = async (item, sdomDatastate, setSdomDatastate) => {
    try {
        return (
            Alert.alert(
                "Confirm",
                "Do you want to set the current image as wallpaper and lockscreen?",
                [
                    {
                        text: "Cancel", style: "cancel"
                    },
                    {
                        text: "OK", onPress: async () => {
                            await setCurrentImageAsWallPaper(item.postImage, item.postTitle, setPostImages.SET_POST_WALLPAPER);
                            await increaseAndSetPostCounts(item, sdomDatastate, setSdomDatastate, postCountTypes.POST_WALLPAPERS);
                        }
                    }
                ],
                { cancelable: false }
            ));
    } catch (error) {
        console.log(error);
    }
}

export const downloadImageFromURL = async (item, sdomDatastate, setSdomDatastate) => {
    const write_granted = await accessAndGrantPermssionsToSDOM(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);

    const read_granted = await accessAndGrantPermssionsToSDOM(permissionMessages.READ_WRITE_EXTERNAL_STORAGE_TITLE,
        permissionMessages.READ_WRITE_EXTERNAL_STORAGE_MESSAGE, PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);

    if (PermissionsAndroid.RESULTS.GRANTED == write_granted && PermissionsAndroid.RESULTS.GRANTED === read_granted) {
        await downloadCurrentImage(item.postImage, item.postTitle, setPostImages.SET_POST_DOWNLOAD);
        await increaseAndSetPostCounts(item, sdomDatastate, setSdomDatastate, postCountTypes.POST_DOWNLOADS);
    } else {
        ToastAndroid.show(`External Storage Permission Denited`, ToastAndroid.SHORT);
    }
}

export const accessAndGrantPermssionsToSDOM = async (permissionTitie, permissionMessage, permissionType) => {
    try {
        return await PermissionsAndroid.request(permissionType,
            {
                title: permissionTitie,
                message:
                    permissionMessage,
                buttonNeutral: permissionsButtons.ASK_ME_LATER,
                buttonNegative: permissionsButtons.CANCEL,
                buttonPositive: permissionsButtons.OK
            }
        );
    } catch (error) {
        console.log(`Error accessing permissions for ${permissionType}`, error);
    }
}