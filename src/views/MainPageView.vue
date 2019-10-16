<template>
<div id="main">
    <NaviMenu/>
    <router-view></router-view>
</div>    
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import NaviMenu from '@/components/NaviMenu.vue'

export default {
    name: 'mainPageView',
    components: {
        NaviMenu,
    },
    data() {
        return{

        }
    },
    computed: {
        ...mapGetters({
            loginInfo: 'user/getUserInfo'
        })
    },
    mounted() {
        console.log("====== MainPage mounted ======")
        console.log(" loginInfo : ", this.loginInfo)
    }
    
}
</script>

<style scoped>

#main {
    width: 100%;
    height: 100%;
}

</style>