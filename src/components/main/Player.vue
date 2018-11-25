<template>
    <div id="player">
        <v-toolbar color="navy blue" dark>
            <v-toolbar-title>Kerryon Johnson</v-toolbar-title>
            <v-toolbar-title>RB - DET</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-container flued grid-list-lg>
                <v-layout row wrap>
                    <!-- Projected vs. Actual -->
                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text">
                            <v-card-title primary-title>
                                <div class="headline">Projected vs. Actual Points</div>
                            </v-card-title>
                            <v-card-actions>
                                <PlayerProjectedPoints></PlayerProjectedPoints>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <!-- Past Performance -->
                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text">
                            <v-card-title primary-title>
                                <div class="headline">Performance</div>
                            </v-card-title>
                            <v-card-actions>
                                <PlayerPastPerformanceStackedBar></PlayerPastPerformanceStackedBar>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <!-- Team Treemap -->
                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text">
                            <v-card-title primary-title>
                                <div class="headline">Team Treemap</div>
                            </v-card-title>
                            <v-card-actions>
                                <TableauTreeMap></TableauTreeMap>
                            </v-card-actions>
                        </v-card>
                    </v-flex>

                    <!-- Team Treemap -->
                    <v-flex xs12>
                        <v-card color="blue-grey darken-2" class="white--text">
                            <v-card-title primary-title>
                                <div class="headline">Team Depth</div>
                            </v-card-title>
                            <v-card-actions>
                                <Depth></Depth>
                            </v-card-actions>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>

<script>
    import PlayerPastPerformanceStackedBar from "../visualizations/PlayerPastPerformanceStackedBar";
    import PlayerProjectedPoints from "../visualizations/PlayerProjectedPoints";
    import TableauTreeMap from "../visualizations/TableauTreeMap";
    import Depth from "../visualizations/Depth"

    export default {
        name: "Player",
        components: {TableauTreeMap, PlayerProjectedPoints, PlayerPastPerformanceStackedBar, Depth},
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped>
    #player-projections {
    }

    #past-performance {
    }
</style>
