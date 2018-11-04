<template>
    <AppLayout></AppLayout>
    <!--<div id="app">-->
        <!--<div id="top-bar">-->
            <!--<h1>Fluent Fantasy Football</h1>-->
        <!--</div>-->
        <!--<nav class="navbar navbar-expand-lg navbar-light bg-light">-->
            <!--<a class="navbar-brand" href="#">Navbar</a>-->
            <!--<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">-->
                <!--<span class="navbar-toggler-icon"></span>-->
            <!--</button>-->
            <!--<div class="collapse navbar-collapse" id="navbarNavAltMarkup">-->
                <!--<div class="navbar-nav">-->
                    <!--<a class="nav-item nav-link active"><router-link to="/">Home</router-link></a>-->
                    <!--<router-link to="/about">About</router-link>-->
                    <!--<router-link to="/jonnysandbox">Jonny's Dev Area</router-link>-->
                    <!--<router-link to="/austinsandbox">Austin's Dev Area</router-link>-->
                    <!--<router-link to="/scottsandbox">Scott's Dev Area</router-link>-->
                    <!--<router-link to="/players">Players</router-link>-->
                <!--</div>-->
            <!--</div>-->
        <!--</nav>-->
        <!--<router-view/>-->
    <!--</div>-->
</template>

<script>
    import AppLayout from "./components/AppLayout";
    export default {
        name: 'app',
        components: {AppLayout}
    }
</script>

<style>
    /*#app {*/
        /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        /*text-align: center;*/
    /*}*/

    /*h1 {*/
        /*display: block;*/
        /*margin-left: auto;*/
        /*margin-right: auto;*/
        /*width: 60%;*/
        /*color: white;*/
        /*font-family: "Arial Black";*/
        /*font-size: 20px;*/
    /*}*/

    /*body {*/
        /*background-color: rgb(75, 89, 102);*/
        /*font-family: 'Montserrat', sans-serif;*/
        /*display: grid;*/
        /*grid-template-rows: auto;*/
        /*justify-items: center;*/
    /*}*/

    /*!*nav {*!*/
        /*!*padding: 20px 20px 20px 0;*!*/
    /*!*}*!*/

    /*!*nav a {*!*/
        /*!*padding: 10px;*!*/
        /*!*text-decoration: none;*!*/
        /*!*background: #fff;*!*/
        /*!*border-radius: 3px;*!*/
        /*!*color: rgb(0, 110, 255);*!*/
        /*!*font-weight: bold;*!*/
        /*!*margin-right: 15px;*!*/
    /*!*}*!*/
</style>
