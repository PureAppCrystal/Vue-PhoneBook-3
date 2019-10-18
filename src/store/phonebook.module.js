import { router } from '@/routes'

export const phonebook = {
    namespaced: true,
    state: {
        id: 3,
        name: "",
        number: "",
        search: "",
        selectPhone: {},
        list: [
            {
                id: 0,
                name: 'Lion',
                number: '12312341234'
            },
            {
                id: 1,
                name: 'Mage',
                number: '1111111111111'
            },
            {
                id: 2,
                name: 'Logue',
                number: '222222222222'
            },
        ],
        searchList: [],
    },
    getters: {
        getList: state => {
            return state.list;
        },
        getId: state => {
            return state.id++;
        },
        getName: state => {
            return state.name;
        },
        getNumber: state => {
            return state.number;
        },
        getSearch: state => {
            return state.search;
        },
        getSearchList: state => {
            return state.searchList;
        },
        getSelectPhone : state => {
            return state.selectPhone;
        }
    },
    mutations: {
        addList(state, payload) {
            console.log("====== module.phonebook - addList ======")
            const phone = {
                id: state.id++,
                name: payload.name,
                number: payload.number
            }
            state.list.push(phone);
        },
        updatePhone(state, payload) {
            console.log("====== module.phonebook - updatePhone ======")
            console.log("payload : ", payload)
            state.list.filter( phone => {
                if (phone.id === payload.selectId ) {
                    phone.name = payload.name;
                    phone.number = payload.number;
                }
            })
        },
        deletePhone(state, payload) {
            console.log("====== module.phonebook - deletePhone ======")
            const { id } = payload;
            state.list = state.list.filter( phone => {
                return phone.id != id;
            })
        },
        doSearch(state, payload) {
            console.log("====== module.phonebook - doSearch ======")
            state.searchList = state.list.filter( phone => {
                if ( phone.name.indexOf(payload) > -1 || phone.number.indexOf(payload) > -1 ) {
                    return phone;
                }
            })
        },
        getPhoneById(state, selectedId) {
            // Actions 은 return 이 안되나
            console.log("====== module.phonebook - getPhoneById ======")
            state.list.some( phone => {
                const intId = parseInt(selectedId);
                if ( phone.id === intId ) {
                    state.selectPhone = phone;
                    return true;
                }
            })

        }
    }
}