import axios from 'axios'
import { urlConstants } from '../constants/sdomConstants';
import data from '../data/data.json'
import categoryData from '../data/category.json'

export const fetchCategoryData = async () => {
    const responseData = await axios.get(urlConstants.fetchCategories);
    return responseData.data.categories;
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    try {
        const responseCategoryData = await fetchCategoryData();
        responseCategoryData.map((category) => category.isSelected = false);
        setCategory({ ...category, categories: responseCategoryData });
    } catch (error) {
        setCategory({ ...category, categories: [] });
    }
}

export const fetchPostsAndSaveToState = async (sdomDatastate, setSdomDatastate) => {
    try {
        const responseData = await axios.get(urlConstants.fetchPosts);
        const responsePostsData = responseData.data.posts;
        setSdomDatastate({ ...sdomDatastate, posts: responsePostsData });
    } catch (error) {
        setSdomDatastate({ ...sdomDatastate, posts: [] });
    }
}

export const isSaveButtonEnabled = async (category) => {
    return category.categories.length && category.categories.some((item) => { return item.isSelected });
}