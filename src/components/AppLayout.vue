<template>
    <v-app id="inspire" dark>
        <!-- Side Tray -->
        <v-navigation-drawer v-model="drawer" clipped fixed app>
            <v-list dense>
                <!-- Tray 1 -->
                <v-list-tile click="" href="/players">
                    <v-list-tile-action>
                        <v-icon>people</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Players</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- Tray 1 -->
                <v-list-tile @click="" href="/jonnysandbox">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Jonny's Sandbox</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- Tray 2 -->
                <v-list-tile @click="" href="/scottsandbox">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Scott's Sandbox</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <!-- Tray 3 -->
                <v-list-tile @click="" href="/austinsandbox">
                    <v-list-tile-action>
                        <v-icon>dashboard</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                        <v-list-tile-title>Austin's Sandbox</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>

            </v-list>
        </v-navigation-drawer>

        <v-toolbar app fixed clipped-left>
            <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
            <v-toolbar-title>unBeleagable</v-toolbar-title>
        </v-toolbar>

        <!-- Content Stage -->
        <v-content>
            <v-container fluid>  <!-- <v-container fluid fill-height> -->
                <!--<v-layout justify-center align-center>-->
                    <v-flex shrink>
                        <router-view>

                        </router-view>
                    </v-flex>
                <!--</v-layout>-->
            </v-container>
        </v-content>
        <v-footer app fixed>
            <span>&copy; 2018</span>
        </v-footer>
    </v-app>
</template>

<script>
    export default {
        data: () => ({
            drawer: null
        }),
        props: {
            source: String
        }
    }
</script>
