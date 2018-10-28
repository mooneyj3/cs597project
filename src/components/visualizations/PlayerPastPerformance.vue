<template>

</template>

<script>
    // legend?  https://beta.observablehq.com/@mbostock/d3-stacked-area-chart
    import * as d3 from 'd3'

    export default {
        name: "PlayerPastPerformance",
        // props: ['player', 'team'];

        mounted () {
            let team = "DET";
            let playerId = "00-0034349";

            let xFrame = 1000,
                yFrame = 500;

            let margin = {top: 50, right: 10, bottom: 50, left: 70},
                width = xFrame - margin.left - margin.right,
                height = yFrame - margin.top - margin.bottom;

            let x = d3.scaleLinear().range([0, width]);
            let y = d3.scaleLinear().range([height, 0]);

            let color = d3.scaleOrdinal(d3.schemeDark2);

            let xAxis = d3.axisBottom().scale(x).ticks(6);
            let yAxis = d3.axisLeft().scale(y).ticks(20); //.tickFormat(formatBillion);

            let area = d3.area()
                .curve(d3.curveStep)
                .x(function(d) {
                    return x(d.data.week); })
                .y0(function(d) { return y(d[0]); })
                .y1(function(d) { return y(d[1]); });

            let stack = d3.stack();

            let svg = d3.select(this.$el)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            // Chart Title
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", 0 - (margin.top /2 ))
                .attr("text-anchor", "middle")
                .text("Kerryon Johnson (RB - DET)")
                .attr("class", "chart-title");

            /* // JSON loading
            d3.json('data/' + team + '_team_stats_.json')
                .then(function (data) {
                    let playerObj = data[team][playerId];

                    console.log(playerObj)
                })
             */
            d3.tsv('data/Kerryon_Johnson_PPP.tsv')
                .then(function (data) {
                    //console.log(data)
                    color.domain(d3.keys(data[0]).filter(function(key) { return key !== 'week'; }));
                    let keys = data.columns.filter(function(key) { return key !== 'week'; });
                    // data.forEach(function(d) {
                    //     d.week = d.week;
                    // });

                    let maxDateVal = d3.max(data, function(d){
                        var vals = d3.keys(d).map(function(key){ return key !== 'week' ? d[key] : 0 });
                        return d3.sum(vals);
                    });

                    // x.domain(d3.extent(data, function(d) { return d.week; }));
                    x.domain([1,7]);
                    y.domain([0, maxDateVal]);

                    // set stacks
                    stack.keys(keys);
                    stack.order(d3.stackOrderAscending);
                    stack.offset(d3.stackOffsetNone);

                    // setup browser
                    let browser = svg.selectAll('.browser')
                        .data(stack(data))
                        .enter().append('g')
                        .attr('class', function(d){ return 'browser ' + d.key; })
                        .attr('fill-opacity', 'none');


                    // append the path areas
                    browser.append('path')
                        .attr('class', 'area')
                        .attr('d', area)
                        .style('fill', function(d) { return color(d.key); })
                        .on("mouseover", function(d) {
                        })
                        .on("mousemove", function (d) {
                            d3.select(this)
                                .style("fill", color(d.key))
                                .attr('fill-opacity', 0.6);

                            // let xPosition =  event.pageX;
                            // let yPosition = event.pageY;
                        })
                        .on("mouseout", function (d) {
                            d3.select(this)
                                .style("fill", color(d.key))
                                .attr('fill-opacity', "none");
                        });

                    // add the x-axis
                    svg.append('g')
                        .attr('class', 'x axis')
                        .attr('transform', 'translate(0,' + height + ')')
                        .call(xAxis)

                    // add the y-axis
                    svg.append('g')
                        .attr('class', 'y axis')
                        .call(yAxis);

                    // legend
                    let legend = svg => {
                        const g = svg
                            .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                            .selectAll("g")
                            .data(color.domain().slice().reverse())
                            .enter().append("g")
                            .attr("transform", (d, i) => `translate(0,${i * 20})`);

                        g.append("rect")
                            .attr("width", 19)
                            .attr("height", 19)
                            .attr("fill", color);

                        g.append("text")
                            .attr("x", 24)
                            .attr("y", 9.5)
                            .attr("dy", "0.35em")
                            .text(d => d);
                    }

                    svg.append("g")
                        .attr("transform", `translate(${margin.left + 1},${margin.top})`)
                        .call(legend);


                }) // end of tsv loader



        }
    }
</script>

<style scoped>

</style>
