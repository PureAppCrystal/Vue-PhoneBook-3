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
            const userInfo = res.data.userInfo;
            //session 
            //localStorage.setItem('user', JSON.stringify(userInfo));
            sessionStorage.setItem('user', JSON.stringify(userInfo));
            return userInfo;
        })
        .catch( e => {
            console.log("err : ", e);
        })
    },
    logout: function() {
        console.log("====== user.service - logout ======")
        sessionStorage.removeItem('user')
    }
}