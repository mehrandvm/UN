export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const errors = {
    password_empty_err: 'Password cannot be empty',
    email_empty_err: 'Email cannot be empty',
    email_notValid_err: 'Email is not valid',
};

export const validatePassword = (password) => {
    if (!password) {
        return errors.password_empty_err;
    }
    return null;
};

export const validateEmail = (email) => {
    if (!email) {
        return errors.email_empty_err;
    } else if (!emailRegex.test(String(email).toLowerCase())) {
        return errors.email_notValid_err;
    }
    return null;
};
