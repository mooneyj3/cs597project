<template>
    <div id="player">
        <!--<v-toolbar color="navy blue" dark>-->
            <!--<v-toolbar-title>Kerryon Johnson</v-toolbar-title>-->
            <!--<v-toolbar-title>RB - DET</v-toolbar-title>-->
        <!--</v-toolbar>-->
        <v-card>
            <v-card-title primary-title>
                <div>
                    <!--<v-img-->
                            <!--:src="`/images/kerryonjohnson.jpg`"-->
                            <!--aspect-ratio="1"-->
                            <!--height="200"-->
                            <!--contain-->
                    <!--&gt;</v-img>-->
                    <h3 class="headline mb-0">
                        Kerryon Johnson
                    </h3>
                    <div>
                        #33 Running Back - Detroit Lions<br>
                        <b>BYE</b>: week 6
                    </div>
                    <div id="player-bio">
                        5' 11", 206 lbs <br>
                        <b>Born</b>: Jun 30, 1997 in Huntsville, AL (Age: 21) <br>
                        <b>Drafted</b> 2018: 2nd Rnd, 43rd by DET<br>
                        <b>Experience</b>: Rookie<br>
                        <b>College</b>: Auburn<br>
                    </div>
                    <div id="player-img">
                        <img src="/images/kerryonjohnson.jpg" height="200""/>
                    </div>

                </div>

            </v-card-title>
            <v-container fluid grid-list-lg>
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
                                <div class="headline">Past Performance Fantasy Point Breakdown</div>
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

    #player-img {
        float: left;
        padding: 10px;
    }

    #player-bio {
        float: right;
        padding: 10px;
    }
</style>
