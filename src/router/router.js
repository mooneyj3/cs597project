import Vue from 'vue'
import Router from 'vue-router'
import Skills from '../components/Skills'
import About from '../components/About'

/* Sandboxes */
import JonnySandbox from '../components/sandboxes/JonnySandbox'


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
        }

    ]
})