import { router } from '@/routes'

export const phonebook = {
    namespaced: true,
    state: {
        id: 3,
        name: "",
        number: "",
        search: "",
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
        deletePhone(state, payload) {
            console.log("====== module.phonebook - deletePhone ======")
            const { id } = payload;
            state.list = state.list.filter( phone => {
                return phone.id != id;
            })
        }
    }
}