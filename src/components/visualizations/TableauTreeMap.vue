<template>
    <div ref="tableau">
    </div>
</template>

<script>
    export default {
        name: "TableauTreeMap",
        data() {
            return {
                msg: 'Hello Tableau Fans!',
                url: "https://public.tableau.com/views/PrototypingNFLData/Sheet1?:embed=y&:display_count=yes",
                options: {hideTabs: true},
            }
        },
        methods: {
            initViz: function () {
                let viz = new tableau.Viz(this.$refs.tableau, this.url, this.options);
            }
        },
        mounted: function () {
            this.initViz()
        }
    }

</script>

<style scoped>

</style>
