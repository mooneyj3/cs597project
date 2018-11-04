<template>
    <v-card>
        <v-card-actions>
            <div id="player-projections">
                <PlayerProjectedPoints></PlayerProjectedPoints>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div id="past-performance">
                <PlayerPastPerformance></PlayerPastPerformance>
            </div>
        </v-card-actions>
        <v-card-actions>
            <div id="teamtreemap">
                <TableauTreeMap></TableauTreeMap>
            </div>
        </v-card-actions>
    </v-card>
</template>

<script>
    import PlayerPastPerformance from "../visualizations/PlayerPastPerformance";
    import PlayerProjectedPoints from "../visualizations/PlayerProjectedPoints";
    import TableauTreeMap from "../visualizations/TableauTreeMap";

    export default {
        name: "Player",
        components: {TableauTreeMap, PlayerProjectedPoints, PlayerPastPerformance},
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
