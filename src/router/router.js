import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'

/* Sandboxes */
import JonnySandbox from '../components/sandboxes/JonnySandbox'
import ScottSandbox from '../components/sandboxes/ScottSandbox'
import AustinSandbox from '../components/sandboxes/AustinSandbox'
import Players from '../components/main/Players'
import Player from '../components/main/Player'


Vue.use(Router);

export default new Router({
    mode: 'history',
    hash: false,
    routes: [
        {path: '/', name: 'home', component: Home},
        {path: '/jonnysandbox', name: 'jonny-sandbox', component: JonnySandbox},
        {path: '/austinsandbox', name: 'austin-sandbox', component: AustinSandbox},
        {path: '/scottsandbox', name: 'scott-sandbox', component: ScottSandbox},
        {path: '/players', name: 'players', component: Players},
        {path: '/players/:id', name: 'player', component: Player}
    ]
})
