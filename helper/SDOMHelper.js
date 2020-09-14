import axios from 'axios'
import { urlConstants, asyncStorageKeys } from '../constants/sdomConstants';
import { NativeModules } from 'react-native';
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
        setCategory({ ...category, categories: responseCategoryData });
    } catch (error) {
        console.log(error);
        setCategory({ ...category, categories: [] });
    }
}

export const fetchPostsAndSaveToState = async (sdomDatastate, setSdomDatastate) => {
    try {
        let categoryPostsData = [];
        const responseData = await axios.get(urlConstants.fetchPosts);
        if (responseData) {
            const responsePostsData = responseData.data.posts;
            const categoryIds = await getCategoryIdsFromStorage();
            const parsedCategoryIds = JSON.parse(categoryIds);
            categoryPostsData = parsedCategoryIds && parsedCategoryIds.length &&
                responsePostsData.filter(post => parsedCategoryIds.includes(post.categoryId)).sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
                }) || responsePostsData.sort((datePost1, datePost2) => {
                    return Date.parse(datePost2.addedOn) - Date.parse(datePost1.addedOn)
                });
        }
        setSdomDatastate({ ...sdomDatastate, posts: categoryPostsData });
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

export const setCurrentImageAsWallPaper = async (postUrl, postTitle) => {
    try {
        NativeModules.SdomApi.setPostAsWallPaper(postUrl, postTitle);
    } catch (error) {
        console.log("Cannot set current image as wallpaper", error);
    }
}