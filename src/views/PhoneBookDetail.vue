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
                <input type='text' v-model="formattedNumber"  placeholder="전화번호를 입력하세요"/>{{formatNum}}
        </div>
    </div>
    <div v-else-if="type =='select'">
        <div id='select-form'>
                <div>{{selectedPhone.name || '정보가 없습니다.' }}</div>
                <div>{{formattedNumber || '정보가 없습니다.' }}</div>
        </div>
    </div>
</div>    

</template>

<script>
import {mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import {formatter} from '@/utils/formatter'
import {stringHelper} from '@/utils/string.helper'

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
            selectId: "",
        }
    },
    computed: {
        ...mapGetters({
            selectedPhone : 'phonebook/getSelectPhone',
        }),
        formattedNumber: {
            get: function() {
                let oriNumber = this.number;
                 oriNumber = formatter.phoneFormatter(oriNumber, 1);
                return oriNumber;
            },
            set: function(newNumber) {
                const plainNumber = newNumber.replaceAll('-', '');
                this.number = plainNumber;
            }
        }
    },
    methods: {
        ...mapMutations({
            addList: 'phonebook/addList',
            updatePhone: 'phonebook/updatePhone',
            getPhoneById: 'phonebook/getPhoneById',
        }),
        onLeft: function() {
            switch(this.type) {
                case 'insert' :
                    this.goBack();
                    break;
                case 'select' :
                    this.goList();
                    break;
                case 'update' :
                    this.goSelect();
                    break;

                
                
            }
        },
        onRight: function() {
            switch(this.type) {
                case 'insert' :
                    this.doInsert();
                    break;
                case 'select' :
                    this.goUpdate();
                    break;
                case 'update' :
                    this.doUpdate();
                    break;
            }
        },
        goList: function() {
            console.log("====== go List ======")
            this.$router.push('/main/phonebook')
        },
        goBack: function() {
            console.log("====== go Back ======")
            this.$router.go(-1);
        },
        goSelect: function() {
            console.log("====== go select ======")
            this.$router.push('/main/phonebook/select?id='+this.selectId);
            this.type ='select'
            this.title = "상세정보";
            this.leftDesc = "뒤로";
            this.rightDesc = "편집"
            const { id } = this.$route.query;
            this.selectId = parseInt(id);
            this.getPhoneById(id)
        },
        goUpdate: function() {
            if (isNaN(this.selectId) ) {
                return;
            }
            this.$router.push('/main/phonebook/update?id='+this.selectId);

            console.log("====== go Update ======")
            this.type = 'update';
            this.title = "편집";
            this.leftDesc = "취소";
            this.rightDesc = "완료"

            
        },
        doInsert: function() {
            console.log("====== do Insert ======")
            
            const { name, number} = this;
            if (name && number ) {
                const reqData = {
                name: name,
                number: number
                }
                this.addList(reqData);
                // 성공후 초기화 및 화면 이동 
                this.name="";
                this.number="";
                //////this.goBack(); -> insert 로 시작시 고백하면 이전 페이지(별개임 ) 로 가면서 이전 페이지의 상태를 가져옴 
                this.goList();
            } else {
                alert("input both of name and number")
            }
        },
        doUpdate: function() {
            console.log("====== do Update ======")
            const { name, number, selectId} = this;
            console.log(name)
            console.log(number)
            console.log(selectId)
            if (name && number && selectId > -1) {
                const reqData = {
                    selectId: selectId,
                    name: name,
                    number: number
                }
                this.updatePhone(reqData);
                this.goSelect();
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
            if(id !== undefined ) {
                this.selectId = parseInt(id);
                if (!isNaN(this.selectId) ) {
                    this.getPhoneById(id)

                    // update 대비?
                    this.name=this.selectedPhone.name;
                    this.number=this.selectedPhone.number;
                }
            } 
        } else if ( path.indexOf('update') > -1 ) { 
            const { id } = this.$route.query;
            // 예외처리 
            if ( id === undefined ) {
                this.$router.push('/main/phonebook')
            }
            this.selectId = parseInt(id);

            console.log("====== update mode ======")
            this.type = 'update';
            this.title = "편집";
            this.leftDesc = "취소";
            this.rightDesc = "완료"

            this.getPhoneById(id)

            // update 대비?
            this.name=this.selectedPhone.name;
            this.number=this.selectedPhone.number;

            
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