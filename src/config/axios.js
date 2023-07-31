import React from 'react'
import axios from 'axios'
const API_ENDPOINT = axios.create({
  baseURL: 'https://localhost:5000'
});

export default API_ENDPOINT;
