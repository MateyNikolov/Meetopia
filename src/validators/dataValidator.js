import { handleAlert } from "../services/messages/AlertMessage"

export const validateData = (data) => {
    if (
        data.email.length == 0 ||
        data.password.length == 0 ||
        data.age.length == 0 ||
        data.city.length == 0
    ) {
        return handleAlert("Please fill the whole form")
    } else if (Number(data.age) <= 17) {
        return handleAlert('You must be atleast 18 years old.')
    }
    else if (data.password !== data.confirm) {
        return handleAlert("Passwords don't match")
    } else {
        return true;
    }
}