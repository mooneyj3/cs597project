<template>
    <v-card>
        <v-card-title primary-title>
            <div>
                <h3 class="headline mb-0">Kerryon Johnson</h3>
                <div>RB - DET</div>
            </div>
        </v-card-title>
        <v-card-actions>
            <div id="player-projections">
                <h2>Projected vs. Actual Points</h2>
                <PlayerProjectedPoints></PlayerProjectedPoints>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div id="past-performance">
                <h2>Past Performance</h2>
                <PlayerPastPerformanceStackedBar></PlayerPastPerformanceStackedBar>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div id="teamtreemap">
                <h2>Player Team Treemap</h2>
                <p>The following link goes to our treemap prototype on Tableau Public. While we would like to embed this, we are still working through logistics of building in D3, or maintaining an external reference.</p>
                <a href="https://public.tableau.com/profile/jonathan.mooneyham#!/vizhome/PrototypingNFLData/Sheet1"
                    target="_blank">
                    Link to TreeMap in Tableau
                </a>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div id="teamdepth">
                <h2>Team Depth</h2>
                <!-- <p>The following link takes you to the field view. There were some D3 conflicts integrating this. On the main player page.  The prototype is accessible at teh link below</p>
                <a href="/austinsandbox" target="_blank">
                    Link to Football field view with players
                </a> -->
                <Depth></Depth>

            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
    import PlayerPastPerformanceStackedBar from "../visualizations/PlayerPastPerformanceStackedBar";
    import PlayerProjectedPoints from "../visualizations/PlayerProjectedPoints";
    import TableauTreeMap from "../visualizations/TableauTreeMap";
    import Depth from "../visualizations/Depth"

    export default {
        name: "Player",
        components: {TableauTreeMap, PlayerProjectedPoints, PlayerPastPerformanceStackedBar, Depth},
        methods: {
        },
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
