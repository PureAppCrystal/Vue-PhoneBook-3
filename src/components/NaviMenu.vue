<template>
<div id="navi-menu">
    <router-link to="/main"> 홈 </router-link>
    <router-link to="/main/phonebook"> 연락처 </router-link>
</div>
</template>

<script>
export default {
    name: 'NaviMenu'    
}
</script>

<style scoped>
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
</style>