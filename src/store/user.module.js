
import { userService } from '../services';
import { router } from '@/routes'


// const state = {
//     userInfo: "",
// }

// const getters = {
//     getUserInfo( state ) {
//         return state.userInfo;
//     }
// }

// export const user = {
//     namespaced: true,
//     state,
//     getters
// }

export const user = {
    namespaced: true,
    state: {
        userInfo: "",
    },
    getters: {
        getUserInfo: state => {
            return state.userInfo;
        }
    },
    mutations: {
        setUserInfo(state, payload) {
            state.userInfo = payload
        }
    },
    actions: {
        
        login({ dispatch, commit}, {username, password}) {
            console.log("====== user.module - login " );

            userService.login(username, password)
            .then( userInfo => {
                if( userInfo) {
                    console.log("userInfo : ", userInfo)
                    // 유저정보 저장
                    commit('setUserInfo', userInfo);        
                    this.state.userInfo = userInfo;
                    // 화면이동
                    // router.push("/home")
                    router.push({name:'home', params: { obj: "obj", q: "aa", b: "bb"}})
                } else {
                    console.log("user not found")
                    alert("can not found user")
                    // 실패 
                    // 알럿 경고 
                    return false;
                }
            })
        },
        logout({dispatch, commit}) {
            console.log("====== user.module - logout ======")
            userService.logout()
            commit('setUserInfo', "");        
            router.push("/login")
        }
    }
}