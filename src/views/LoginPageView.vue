<template>
<div id='loginPage'>
    <form @submit.prevent="handleSubmit">
        <img alt="Vue logo" src="@/assets/logo.png">
        <div id="title"> Login </div>
        <div id="row">
            <div id="label"> ID </div>
            <input type="text" autocomplete="off" v-model="username"/>
        </div>
        <div id="row">
            <div id="label"> PW </div>
            <input type="password" autocomplete="off" v-model="password"/>
        </div>
        <div>
            <button type="submit"> Login </button>
        </div>
    </form>
</div>
</template>


<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { userService } from '@/services';

export default {
    name: 'loginPageView',
    data() {
        return {
            username: "",
            password: "",
        }
    },
    computed: {
        ...mapGetters({
            loginInfo: 'user/getUserInfo'
        })
    },
    methods: {
        
        ...mapActions('user', ['login']),
        
        handleSubmit: function(e) {
            console.log("====== login - handleSubmit ======")
            // 유효성검사
            const { username, password } = this;
            if ( username && password ) {
                // 로그인시도 
                this.login({username, password })
            } else {
                // 유효성검사 실패
                console.log("invaild id&pwd")
                this.password=""
            }
        }
    },
    created() {
        console.log("====== LoginPage Created ======")
    },
    mounted() {
        
    },
    updated() {
        console.log("====== LoginPaged Udeated ======")
        console.log(" loginInfo : ", this.loginInfo)
        if ( this.loginInfo) {
            this.$router.push('/main')
        }
    }
    
}
</script>

<style scoped>
#loginPage {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
    
}
form {
    width: 50%;
    padding: 1rem;

    border-radius: 1rem;
    border-color:green;
    border-style: solid;
    border-width: 1px;
}

#title {
    margin: 2rem;
    font-size: 2rem;
}
#row {
    
    display: flex;
    margin: 1rem;
}

#label {
    text-align: left;
    width: 20%;
}

input {
    flex: 1;
}

button {
    margin-top: 1.5rem;
    width: 50%;
}
</style>