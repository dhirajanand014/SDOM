import React, { useContext, useCallback } from 'react';
import { SDOMCategoryContext } from '../App';
import axios from 'axios'

import data from '../data/data.json'
import categoryData from '../data/category.json'

export const fetchData = () => {
    // async () => {
    //     const response = axios.get('/data/data.json');
    //     console.log(response, "re");
    //     return response.data;
    // }
    return data;
}

export const fetchCategoryData = async () => {
    // async () => {
    //     const response = axios.get('/data/data.json');
    //     console.log(response, "re");
    //     return response.data;
    // }
    return await categoryData;
}

export const fetchAndUpdateCategoryState = async (category, setCategory) => {
    debugger;

};

export const isSaveButtonEnabled = async (category) => {
    debugger
    return category && category.categories.length && category.categories.some((item) => { return item.isSelected });
}