import axios from 'axios'
import { urlConstants, asyncStorageKeys, postCountTypes, postCountRequestKeys } from '../constants/sdomConstants';
import { Alert, NativeModules, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const fetchCategoryData = async () => {
    const responseData = await axios.get(urlConstants.fetchCategories);
    return responseData.data.categories;
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    try {
        const responseCategoryData = await fetchCategoryData();
        if (responseCategoryData) {
            const categoryIds = await getCategoryIdsFromStorage();
            const parsedCategoryIds = categoryIds.length && JSON.parse(categoryIds) || [];
            responseCategoryData.map((category) =>
                category.isSelected = parsedCategoryIds.some(categoryId => categoryId == category.categoryId));
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
            const categoryIds = await getCategoryIdsFromStorage();
            const parsedCategoryIds = categoryIds && JSON.parse(categoryIds) || categoryPostsData;
            categoryPostsData = parsedCategoryIds && parsedCategoryIds.length &&
                responsePostsData.filter(post => parsedCategoryIds.some((categoryId) =>
                    post.categoryIds[0].split(',').includes(categoryId)))
                    .sort((datePost1, datePost2) => {
                        return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
                    }) || responsePostsData.sort((datePost1, datePost2) => {
                        return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
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

export const getCategoryIdsFromStorage = async () => {
    try {
        return await AsyncStorage.getItem(asyncStorageKeys.SAVE_CATEGORY_ID) || "";
    } catch (error) {
        console.log('Cannot fetch the categoryIds from the storage', error);
    }
}

export const increaseAndSetPostCounts = async (post, sdomDatastate, setSdomDatastate, postCountType) => {
    try {
        let postCountRequest;
        if (postCountType == postCountTypes.POST_LIKES) {
            const postLikeCount = ++post.postLikes;
            sdomDatastate.posts.find(item => item.postId == post.postId).postLikes = postLikeCount;
            postCountRequest = {
                [postCountRequestKeys.POST_ID_KEY]: parseInt(post.postId),
                [postCountRequestKeys.POST_LIKES_KEY]: postLikeCount || 0
            }
        } else if (postCountType == postCountTypes.POST_DOWNLOADS) {
            const postDownloadCount = ++post.postDownloads;
            sdomDatastate.posts.find(item => item.postId == post.postId).postDownloads = postDownloadCount;
            postCountRequest = {
                [postCountRequestKeys.POST_ID_KEY]: parseInt(post.postId),
                [postCountRequestKeys.POST_DOWNLOADS_KEY]: postDownloadCount || 0
            }
        } else if (postCountType == postCountTypes.POST_WALLPAPERS) {
            const postWallPaperCount = ++post.postWallPapers;
            sdomDatastate.posts.find(item => item.postId == post.postId).postWallPapers = postDownloadCount;
            postCountRequest = {
                [postCountRequestKeys.POST_ID_KEY]: parseInt(post.postId),
                [postCountRequestKeys.POST_DOWNLOADS_KEY]: postWallPaperCount || 0
            }
        }

        setSdomDatastate({ ...sdomDatastate });

        if (postCountRequest) {
            const response = await axios.post(urlConstants.setPostCounts, postCountRequest);
            if (response && response.data == "Success") {
                postCountRequestKeys.POST_LIKES_KEY in postCountRequest && ToastAndroid.show(`You have liked the post : ${post.postTitle}`,
                    ToastAndroid.SHORT);
                postCountRequestKeys.POST_DOWNLOADS_KEY in postCountRequest && ToastAndroid.show(`You have downloaded the post : ${post.postTitle}`,
                    ToastAndroid.SHORT);
            }
        }
    } catch (error) {
        console.log("Cannot set the increased count to the database", error);
    }
}

export const setCurrentImageAsWallPaper = async (postUrl, postTitle) => {
    try {
        NativeModules.SdomApi.setPostAsWallPaper(postUrl, postTitle);
    } catch (error) {
        console.log("Cannot set current image as wallpaper", error);
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
        console.log('Cannot fetch the save vutton type from the storage', error);
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
                            await setCurrentImageAsWallPaper(item.postImage, item.postTitle);
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