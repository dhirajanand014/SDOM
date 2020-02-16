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