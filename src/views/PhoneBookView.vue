<template>
<div id="phone-book">
    <div id='title'>
        <button @click="goHome"> 홈 </button>
        <div> 연락처 </div>
        <button @click="goInsert"> 등록 </button>
    </div>
    <div id='search'>
        <input type="text" v-model="localSearch" v-on:keyup="searchKeyUp" placeholder="search by name"/>
    </div>
    <div id='list'>
        <div id='phone' v-for="phone in localSearch ? searchList : list" v-bind:key="phone.id" @click="goSelect(phone.id)">
            <div id='name'> {{phone.name}} </div>
            <button id='del' @click.stop="doDelete(phone.id)"> 삭제 </button>
        </div>
    </div>
</div>    
</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'


export default {
    name: 'PhoneBookView',
    data() { 
        return {
            localSearch: "",
        }
    },
    computed: {
        ...mapGetters({
            list: 'phonebook/getList',
            search: 'phonebook/getSearch',
            searchList: 'phonebook/getSearchList'
        }),
    },
    methods: {
        ...mapMutations({
            deletePhone: 'phonebook/deletePhone',
            doSearch: 'phonebook/doSearch',
        }),
        goHome: function() {
            console.log("====== go Home ======")
            this.$router.push('/home')
        },
        goInsert: function() {
            console.log("====== go Insert ======")
            this.$router.push('/main/phonebook/insert')
        },
        goSelect: function(id) {
            console.log("====== go Select ======")
            this.$router.push('/main/phonebook/select?id='+id)
        },
        doDelete: function(id) {
            console.log("====== do Delete ======")
            console.log("id : ", id)
            this.deletePhone({id});
        },
        searchKeyUp: function(e) {
            console.log("====== searchKeyUp ======")
            const value = e.target.value;
            this.doSearch(value);
        }
    }
    
}
</script>

<style scoped>

#phone-book {
    height: 100%;
    padding: 1rem;
}

#title {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

#search {
    padding: 1rem;
    display: flex;
}
#search input {
    flex: 1;
    padding: 0.5rem;
    padding-left: 1rem;
    padding-right: 1rem;
    outline: none;
    border-radius: 0.5rem;
    border-style: solid;
    border-width: 1px;
}

#list {
    padding: 1rem;
}

#phone {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
}

#phone + #phone {
    border-top-style: solid;
    border-width: 1px;
}

#name {
    flex: 1;
    padding:0.5rem;
    text-align: left;
}

#del {
    padding:0.5rem;
    background-color: red;
}
</style>