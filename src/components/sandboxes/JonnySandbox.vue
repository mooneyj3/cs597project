<template>
    <div class="jonny-sandbox">
        <h1>Jonny's Dev Area</h1>
    </div>
</template>

<script>
    import France from "../visualizations/France";
    import StackedAreaGraph from "../visualizations/StackedAreaGraph";
    export default {
        name: "JonnySandbox",
        components: {StackedAreaGraph, France},
    }

</script>

<style scoped>

</style>
