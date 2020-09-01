import axiosInstance from '../AxiosConfig'

export const loginAPI = async (email, password) => axiosInstance.post(
    '/user/login', {email, password}
    );

export const checkAuth = async () => {
    // console.log('Log: Check Auth Called!')
    // try {
    //     await axiosInstance.get('/user');
    //     return true;
    // } catch (e) {
    //     return false;
    // }
    return true
};
