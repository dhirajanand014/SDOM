import React from 'react'
import axios from 'axios'

import data from '../data/data.json'

export const fetchData = () => {
    // async () => {
    //     const response = axios.get('/data/data.json');
    //     console.log(response, "re");
    //     return response.data;
    // }
    return data;
}

export const formatData = (data, numColumns) => {
    let numberOfElementsLastRow = data.length % numColumns;
    while (numberOfElementsLastRow != numColumns) {
        data.push({ categoryName: `blank`, empty })
        numberOfElementsLastRow += 1;
    }
}