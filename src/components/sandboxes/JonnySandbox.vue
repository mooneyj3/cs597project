<template>
    <div class="jonny-sandbox">
        <h1>Jonny's Dev Area</h1>
        <PlayerPastPerformance></PlayerPastPerformance>
    </div>
</template>

<script>
    import France from "../visualizations/France";
    import StackedAreaGraph from "../visualizations/StackedAreaGraph";
    import PlayerPastPerformance from "../visualizations/PlayerPastPerformance";
    export default {
        name: "JonnySandbox",
        components: {PlayerPastPerformance, StackedAreaGraph, France},
    }

</script>

<style scoped>

</style>
