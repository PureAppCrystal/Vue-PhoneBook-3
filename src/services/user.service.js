import Axios from 'axios';



export const userService = {
    login: function(username, password) {
        console.log("====== user.service - login ======")
        const reqData = {
            username: username,
            password: password
        }

        return Axios.post("http://192.168.111.66:8000/user/login", reqData)
        .then ( res => {
            return res.data.userInfo;
        })
        .catch( e => {
            console.log("err : ", e);
        })
    },
}