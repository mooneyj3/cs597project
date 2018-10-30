<template>
    <div class="scott-sandbox">
        <h1>Scott's Dev Area</h1>
        <PlayerProjectedPoints></PlayerProjectedPoints>
    </div>
</template>

<script>
    import PlayerProjectedPoints from "../visualizations/PlayerProjectedPoints";
    export default {
        name: "ScottSandbox",
        components: {PlayerProjectedPoints},
    }

</script>

<style scoped>

</style>