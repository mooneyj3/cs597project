<template>
    <svg width="1000" height="1000">
    </svg>
</template>

<script>
    // import dataset from '../../data/france.tsv'
    /* eslint-disable */
    import * as d3 from 'd3'


    d3.tsv("../../data/france.tsv");

    export default {
        name: 'Hello-France',
        mounted() {

            const w = 600;
            const h = 600;
            let x, y;
            let pop;
            let dataset

            let div = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            let svg = d3.select(this.$el)
                .append('svg')
                .attr("width", w)
                .attr("height", h);


            // codePostal: +d["Postal Code"],
            //     inseeCode: +d.inseecode,
            //     place: d.place,
            //     longitude: +d.x,
            //     latitude: +d.y,
            //     population: +d.population,
            //     density: +d.density


            // Needs to be in the public folder
            d3.tsv("france.tsv", function (d) {
                return {
                    codePostal: +d["Postal Code"],
                    inseeCode: +d.inseecode,
                    place: d.place,
                    longitude: +d.x,
                    latitude: +d.y,
                    population: +d.population,
                    density: +d.density
                };})
                .then(function (data) {
                    console.log(data.length);
                    console.log(data[0]);

                    dataset = data;

                    x = d3.scaleLinear()
                        .domain(d3.extent(data, (row) => row.longitude))
                        .range([0, w]);
                    y = d3.scaleLinear()
                        .domain(d3.extent(data, (row) => row.latitude))
                        .range([h, 0]);

                    pop = d3.scaleLinear()
                        .domain(d3.extent(data, (row) => row.population))
                        .range([1,40]);

                    svg.selectAll("circle")
                        .data(dataset)
                        .enter()
                        .append("circle")
                        .attr("cx", 1)
                        .attr("cy", 1)
                        .attr("r", (d) => pop(d.population))
                        .attr("cx", (d) => x(d.longitude))
                        .attr("cy", (d) => y(d.latitude))
                        .style("opacity", 0.25)
                        .style("fill", "#2b49fd")
                        .on("mouseover", function(d) {
                            d3.select(this)
                                .style("fill", "#d220fd")
                                .style("opacity", 0.9)
                                .attr("r", (d) => 1.2 * pop(d.population));
                            div.transition()
                                .duration(200)
                                .style("opacity", .9);
                            div.html(d.place + "<br/>" +
                                "pop: " + d.population )
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");
                        })
                        .on("mouseout", function(d) {
                            d3.select(this)
                                .style("fill", "#2b49fd")
                                .style("opacity", 0.25)
                                .attr("r", (d) => pop(d.population));
                            div.transition()
                                .style("opacity", 0);
                        })
                    ;
                    svg.append("g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0, " + h + ")")
                        .call(d3.axisBottom(x));
                    svg.append("g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(0, " + w + ")")
                        .call(d3.axisLeft(y));
                });
        },

        methods: {
            drawPlot() {

            }
        }

    }

</script>

<style>
    svg circle {
        fill: aqua;
    }

    div.tooltip {
        position: absolute;
        text-align: center;
        min-width: 100px;
        width: auto;
        height: 28px;
        font: 12px sans-serif;
        background: lightsteelblue;
        border: 0px;
        border-radius: 4px;
        pointer-events: none;
    }

</style>