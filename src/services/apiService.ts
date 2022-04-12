import axios, { AxiosResponse } from 'axios';

const API_ROUTES = {
    APPLE_BASE: process.env.REACT_APP_APPLE_SERVICE_BASE_URL,

};

export const fetchSongs = async (search: string): Promise<AxiosResponse> => axios.get(`${API_ROUTES.APPLE_BASE}?term=${search}`);
