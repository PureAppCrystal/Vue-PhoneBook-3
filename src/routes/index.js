import Vue from 'vue'
import VueRouter from 'vue-router'


import HomePageView from '@/views/HomePageView'
import LoginPageView from '@/views/LoginPageView'
import MainPageView from '@/views/MainPageView'
import PhoneBookView from '@/views/PhoneBookView'
import PhoneBookDetail from '@/views/PhoneBookDetail'

import NotFountPage from '@/views/NotFoundPage'

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
        path: '/home',
        component: HomePageView,
    },
    {
        path: '/main',
        redirect: '/main/phonebook'
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
    {
        path: '*',
        component: NotFountPage
    },


]

export const router = new VueRouter({
    mode: 'history',
    routes
})

router.beforeEach( (to, from, next) => {
    const loginPage = ['/login'];
    const authRequired = !loginPage.includes(to.path);
    const userInfo = sessionStorage.getItem('user');

    if (authRequired && !userInfo) {
        return next('/login');
    }

    if (userInfo && loginPage.includes(to.path)) {
        if ( from.path==='/' ) {
            return next('/main')
        }
        return next(from.fullPath);
    }

    next();
})