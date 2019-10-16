<template>
<div id='phonebook-insert'>
    <div id='title'>
        <button @click="goBack"> 뒤로 </button>
        <div> 등록 </div>
        <button @click="doInsert"> 완료 </button>
    </div>
    <div id='insert-form'>
            <input type='text' v-model="name"/> <br/>
            <input type='text' v-model="number"/>
    </div>
</div>    

</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'

export default {
    name: 'PhoneBookInsert',
    data() {
        return {
            name: "",
            number: "",
        }
    },
    computed: {

    },
    methods: {
        goBack: function() {
            console.log("====== go Back ======")
            this.$router.go(-1);
        },
        doInsert: function() {
            console.log("====== do Insert ======")
            const { name, number} = this;

            //유효성 체크
            if (name && number ) {
                const reqData = {
                name: name,
                number: number
                }
                this.addList(reqData);
                // 성공후 초기화 및 화면 이동 
                this.name="";
                this.number="";
                this.goBack();
            } else {
                console.log("input name, number")
            }
            
        },
        ...mapMutations({
            addList: 'phonebook/addList'
        }),
    }
}
</script>


<style scoped>

#title {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

#insert-form {
    margin-top: 3rem;
}

input {
    flex: 1;
}


</style>