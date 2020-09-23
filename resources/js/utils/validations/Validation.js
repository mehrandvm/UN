export const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const isCoordinateX = (coordinateX) => coordinateX <= 180 && coordinateX >= -180
const isCoordinateY = (coordinateX) => coordinateX <= 90 && coordinateX >= -90

const errors = {
    password_empty_err: 'Password cannot be empty',
    email_empty_err: 'Email cannot be empty',
    email_notValid_err: 'Email is not valid',
    phoneNumber_empty_err: 'Phone number cannot be empty',
    first_name_empty_err: 'First name cannot be empty',
    last_name_empty_err: 'Last name cannot be empty',
    user_name_empty_err: 'User name cannot be empty',
    role_empty_err: 'Please select a role',
    password_do_not_match_err: 'Passwords do not match',
    coordinate_empty_err: 'Coordinate cannot be empty',
    coordinateX_not_valid_err: 'Coordinate X must be between -180 & 180',
    coordinateY_not_valid_err: 'Coordinate Y must be between -90 & 90',
};

export const validateFirstName = (name) => {
    if (!name) {
        return errors.first_name_empty_err;
    }
    return null;
};

export const validateLastName = (name) => {
    if (!name) {
        return errors.last_name_empty_err;
    }
    return null;
};

export const validateUserName = (username) => {
    if (!username) {
        return errors.user_name_empty_err;
    }
    return null;
};

export const validatePhoneNumber = (phoneNumber) => {
    if (!phoneNumber) {
         return errors.phoneNumber_empty_err;
    }
    return null;
};

export const validateRole = (role) => {
    if (!role) {
        return errors.role_empty_err;
    }
    return null;
};

export const validatePassword = (password) => {
    if (!password) {
        return errors.password_empty_err;
    }
    return null;
};

export const validateConfirmPassword = (password, confirmPassword) => {
    if (!password) {
        return errors.password_empty_err;
    } else if (password !== confirmPassword) {
        return errors.password_do_not_match_err;
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

export const validateCoordinateX = (coordinate) => {
    if (!coordinate) {
        return errors.coordinate_empty_err;
    } else if (!isCoordinateX(coordinate)) {
        return errors.coordinateX_not_valid_err;
    }
    return null;
};

export const validateCoordinateY = (coordinate) => {
    if (!coordinate) {
        return errors.coordinate_empty_err;
    } else if (!isCoordinateY(coordinate)) {
        return errors.coordinateY_not_valid_err;
    }
    return null;
};

