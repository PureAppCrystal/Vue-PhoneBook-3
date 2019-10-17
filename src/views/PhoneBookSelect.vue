<template>
<div id="phonebook-select">
    <div id='title'>
        <button @click="goBack"> 뒤로 </button>
        <div> 등록 </div>
        <button @click="goUpdate"> 편집 </button>
    </div>
    Select
</div>    
</template>

<script>
export default {
    name: 'PhoneBookSelect',
    data() {
        return {

        }
    },
    mounted() {
        console.log("select mounted")
        console.log(this.$route);
        console.log(this.$route.path);
        console.log(this.$route.query);
    }

}
</script>

<style scoped>
#title {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}    
</style>