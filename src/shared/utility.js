export const checkValidity = (value, rules) => {

    let isValid = true;

    if (rules.required)
        isValid = value.trim() !== '';

    if (rules.minLength)
        isValid = value.length >= rules.minLength;

    if (rules.maxLength)
        isValid = value.length <= rules.maxLength;

    if (rules.isEmail) {
        const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        isValid = pattern.test(value) && isValid;
    }

    return isValid;
};