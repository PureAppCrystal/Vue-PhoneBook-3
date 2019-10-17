<template>
<div id='phonebook-insert'>
    <div id='title'>
        <button @click="onLeft"> {{leftDesc}} </button>
        <div> {{title}} </div>
        <button @click="onRight"> {{rightDesc}} </button>
    </div>
    <div v-if="type =='insert' || type == 'update'">
        <div id='insert-form'>
                <input type='text' v-model="name" placeholder="이름을 입력하세요"/>
                <input type='text' v-model="number"  placeholder="전화번호를 입력하세요"/>{{formatNum}}
        </div>
    </div>
    <div v-else-if="type =='select'">
        <div id='select-form'>
                <div>{{selectedPhone.name || '정보가 없습니다.' }}</div>
                <div>{{selectedPhone.number || '정보가 없습니다.' }}</div>
        </div>
    </div>
</div>    

</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import {formatter} from '@/utils/formatter'

export default {
    name: 'PhoneBookInsert',
    data() {
        return {
            type: "",

            title: "",
            leftDesc: "",
            rightDesc: "",

            name: "",
            number: "",
            selectId: 0,
        }
    },
    computed: {
        ...mapGetters({
            selectedPhone : 'phonebook/getSelectPhone',
        }),
    },
    methods: {
        ...mapMutations({
            addList: 'phonebook/addList',
            getPhoneById: 'phonebook/getPhoneById',
        }),
        
        onRight: function() {
            switch(this.type) {
                case 'insert' :
                    this.doInsert();
                    break;
            
                
            }
        },
        onLeft: function() {
            switch(this.type) {
                case 'insert' :
                case 'select' :
                    this.goBack();
                    break;
                
            }
        },
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
                alert("input both of name and number")
            }
            
        },
        
    },
    mounted() {
        const path = this.$route.path;
        if ( path.indexOf('insert') > -1 ) {
            console.log("====== insert mode ======")
            this.type = 'insert'
            this.title = "등록";
            this.leftDesc = "뒤로";
            this.rightDesc = "완료"
        } else if ( path.indexOf('select') > -1 ) { 
            console.log("====== select mode ======")
            this.type ='select'
            this.title = "상세정보";
            this.leftDesc = "뒤로";
            this.rightDesc = "편집"
            const { id } = this.$route.query;
            this.getPhoneById(id)

            

        } else if ( path.indexOf('update') > -1 ) { 
            console.log("====== update mode ======")
            this.type = 'update'
        } 
    },
    updated() {
    }

}
</script>


<style scoped>
#phonebook-insert {
    padding: 1rem;
}

#title {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

#insert-form {
    display: flex;
    flex-flow:column nowrap;
    margin-top: 3rem;
}

input {
    flex: 1;
    margin: 0rem 1rem 1rem 1rem;
    border-style: none;
    border-bottom-style: solid;
    border-width: 1px;
    padding: 0.5rem;
    outline: none;
    font-size: 1rem;
}

#select-form {
    display: flex;
    flex-flow:column nowrap;
    margin-top: 3rem;
    
}
#select-form div{
    flex: 1;
    margin: 0rem 1rem 1rem 1rem;
    border-style: none;
    border-bottom-style: solid;
    border-width: 1px;
    padding: 0.5rem;
    outline: none;
    font-size: 1rem;
    text-align: left;
}






</style>