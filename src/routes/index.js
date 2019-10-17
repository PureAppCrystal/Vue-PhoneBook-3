import Vue from 'vue'
import VueRouter from 'vue-router'

import LoginPageView from '@/views/LoginPageView'
import MainPageView from '@/views/MainPageView'
import PhoneBookView from '@/views/PhoneBookView'
import PhoneBookDetail from '@/views/PhoneBookDetail'

Vue.config.devteools = true;
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        component: LoginPageView
    },
    {
        path: '/main',
        component: MainPageView,
        children: [
            {
                path: 'phonebook',
                component: PhoneBookView
            },
            {
                path: 'phonebook/insert',
                component: PhoneBookDetail
            },
            {
                path: 'phonebook/select',
                component: PhoneBookDetail
            },
            {
                path: 'phonebook/update',
                component: PhoneBookDetail
            }
        ]
    },


]

export const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach( (to, from, next) => {


    next();
})