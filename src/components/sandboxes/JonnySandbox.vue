<template>
    <div class="jonny-sandbox">
        <h1>Jonny's Dev Area</h1>
        <LineChart></LineChart>
    </div>
</template>

<script>
    import France from "../visualizations/France";
    import StackedAreaGraph from "../visualizations/StackedAreaGraph";
    import PlayerPastPerformance from "../visualizations/PlayerPastPerformance";
    import LineChart from "../visualizations/LineChart";
    export default {
        name: "JonnySandbox",
        components: {LineChart, PlayerPastPerformance, StackedAreaGraph, France},
    }

</script>

<style scoped>

</style>
