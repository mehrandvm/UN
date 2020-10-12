import axiosInstance from '../AxiosConfig'

export const loginAPI = async (email, password) => axiosInstance.post(
    '/user/login', {email, password}
    );

export const checkAuth = async () => {
    try {
        await axiosInstance.get('/user/profile')
        return true;
    } catch (e) {
        return false;
    }
};
