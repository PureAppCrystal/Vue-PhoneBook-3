<template>
<div id="phone-book">
    <div id='title'>
        <button @click="goHome"> 홈 </button>
        <div> 연락처 </div>
        <button @click="goInsert"> 등록 </button>
    </div>
    <div id='search'>
        <input type="text" v-model="search" placeholder="search by name"/>
    </div>
    <div id='list'>
        <div id='phone' v-for="phone in list" v-bind:key="phone.id">
            <div id='name'> {{phone.name}} </div>
            <button id='del' @click="doDelete(phone.id)"> 삭제 </button>
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

        }
    },
    computed: {
        ...mapGetters({
            list: 'phonebook/getList',
            search: 'phonebook/getSearch'
        })
    },
    methods: {
        ...mapMutations({
            deletePhone: 'phonebook/deletePhone'
        }),
        goHome: function() {
            console.log("====== go Home ======")
            this.$router.push('/main')
        },
        goInsert: function() {
            console.log("====== go Insert ======")
            this.$router.push('/main/phonebook/insert')
        },
        doDelete: function(id) {
            console.log("====== do Delete ======")
            console.log("id : ", id)
            this.deletePhone({id});
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
    padding-left: 1rem;
    padding-right: 1rem;
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