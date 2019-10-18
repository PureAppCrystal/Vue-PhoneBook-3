<template>
<div id="navi">
    
    <div id="navi-menu">
        <router-link to="/home"> 홈 </router-link>
        <router-link to="/main/phonebook"> 연락처 </router-link>
        <div id="navi-menu-top">
            <button @click="handleOnLogout"> Logout </button>
        </div>
    </div>
    
</div>

</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'
export default {
    name: 'NaviMenu',
    methods: {
        ...mapActions({
            logout: 'user/logout',
        }),
        handleOnLogout: function() {
            console.log("====== Navi - logout ======")
            this.logout();
        }
    }
}
</script>

<style scoped>
#navi {
    /* display: flex; */
}

#navi-menu {
    padding: 0.5rem;
    border-bottom-style: solid;
    border-width: 1px;
    display: flex;
    margin-bottom: 1rem;
}

a {
    margin: 0.5rem;
    padding: 0.3rem;
    background-color: rgb(243, 81, 81);
    text-decoration: none;
}

#navi-menu-top{
    flex: 1;
    display: flex;
    justify-content: flex-end;
}

</style>