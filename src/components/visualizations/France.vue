<template>
        <svg width="1000" height="1000">
            <circle v-for="(item, index) in dataset"
                    :key="index"
                    :cx="item[0]"
                    :cy="item[1]"
                    r="10"
                    @click="onClick(item)"></circle>
        </svg>
</template>

<script>
    // import dataset from '../../data/france.tsv'
    import * as d3 from 'd3'
    import dataset from './dataset'

    d3.tsv("../../data/france.tsv");

    export default {

        data () {
            return {
                dataset
            }
        },
        methods: {
            onClick(item) {
                self.console.log('hey there');
                self.console.log(item)
            }
        }
    }

</script>

<style>
    svg circle {
        fill: aqua;
    }

</style>