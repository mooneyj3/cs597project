import Vue from 'vue'
import Router from 'vue-router'
import Skills from '../components/Skills'
import About from '../components/About'

/* Sandboxes */
import JonnySandbox from '../components/sandboxes/JonnySandbox'
import ScottSandbox from '../components/sandboxes/ScottSandbox'
import AustinSandbox from '../components/sandboxes/AustinSandbox'


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'skills',
            component: Skills
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/jonnysandbox',
            name: 'jonny-sandbox',
            component: JonnySandbox
        },
        {
            path: '/austinsandbox',
            name: 'austin-sandbox',
            component: AustinSandbox
        },
        {
            path: '/scottsandbox',
            name: 'scott-sandbox',
            component: ScottSandbox
        }

    ]
})