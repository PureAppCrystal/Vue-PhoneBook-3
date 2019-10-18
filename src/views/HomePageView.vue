<template>
<div id="home">
    <NaviMenu/>
    Home <br/>
    <br/>
    <span style="font-size: 1rem;"> My Home !!</span><br/>
    <span style="font-size: 2rem;"> My Home !!</span><br/>
    <span style="font-size: 3rem;"> My Home !!</span><br/>
    <br/>
    <span style="font-size: 3rem;"> It's My Home Mannnnnn!!</span><br/>
</div>

</template>

<script>
import NaviMenu from '@/components/NaviMenu.vue'

export default {
    name: 'HomePageView',
    components: {
        NaviMenu,
    },
    data() {
        return {

        }
    },
    mounted() {
        console.log("====== HomePageView mounted ======")
        console.log("params : ", this.$route.params);
    }
}
</script>

<style scoped>

</style>