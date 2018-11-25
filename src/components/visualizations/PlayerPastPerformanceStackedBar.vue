<template>
    <div></div>
</template>

<script>
    // legend?  https://beta.observablehq.com/@mbostock/d3-stacked-area-chart
    import * as d3 from 'd3'

    export default {
        name: "PlayerPastPerformance",
        // props: ['player', 'team'];
        props: ['x', 'y'],

        mounted() {
            // let team = "DET";
            // let playerId = "00-0034349";
            let div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            const play_types = ['Rushing Yards', 'Rushing TDs', 'Receiving Rec.', 'Receiving Yards', 'Receiving TDs'];
            let xFrame = 1000,
                yFrame = 500;

            let margin = {top: 50, right: 10, bottom: 50, left: 70},
                width = xFrame - margin.left - margin.right,
                height = yFrame - margin.top - margin.bottom;

            const x = d3.scaleBand()
                .rangeRound([0, width]);

            const y = d3.scaleLinear()
                .rangeRound([height, 0]);

            let color = d3.scaleOrdinal(d3.schemeDark2);

            const xAxis = d3.axisBottom().scale(x);

            const yAxis = d3.axisLeft().scale(y);

            let svg = d3.select(this.$el)
                .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');


            d3.tsv('/data/Kerryon_Johnson_PPP.tsv')
                .then(function (data) {
                    // color.domain(d3.keys(data[0]).filter(function (key) {return key !== 'week';}));
                    color.domain(data.columns.slice(1));
                    // let keys = data.columns.filter(function (key) {return key !== 'week';});
                    let keys = data.columns.slice(1);

                    let layers = d3.stack().keys(keys)(data);

                    x.domain(layers[0].map(d => d.data.week));
                    // y.domain([0, d3.max(layers[layers.length - 1], d => (d[0] + d[1]))]).nice();
                    y.domain([0, d3.max(layers[layers.length - 1], function(d) {return d[1]})]).nice();
                    // y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();

                    const layer = svg.selectAll('layer')
                        .data(layers)
                        .enter()
                        .append('g')
                        .attr('class', 'layer')
                        .style('fill', function (d) { return color(d.key); });

                    layer.selectAll('rect')
                        .data(function(d) { return d; })
                        .enter()
                        .append('rect')
                        // .attr('x', d => x(d.data.week) + 25)
                        .attr('x', function (d) {return x(d.data.week) + 20;})
                        // .attr('y', d => y(d[0] + d[1]))
                        .attr('y', function (d) {return y(d[1])})
                        // .attr('height', d => y(d[0]) - y(d[1] + d[0]))
                        .attr('height', function (d) {return y(d[0]) - y(d[1]); })
                        .attr('width', x.bandwidth() - 40)
                        .on("mousemove", function (d) {
                            d3.select(this).attr('fill-opacity', 0.8);

                            let xPosition = event.pageX;
                            let yPosition = event.pageY;

                            let value = Math.round((d[1] - d[0]) * 100) / 100;

                            div.transition().style("opacity", .9);
                            div.html(value)
                                .style("left", (xPosition) + "px")
                                .style("top", (yPosition - 28) + "px");
                        })
                        .on("mouseout", function (d) {
                            d3.select(this).attr('fill-opacity', "none");
                            d3.select(div).remove();
                            div.transition().style("opacity", 0);
                        });

                    // bye week
                    svg.append('rect')
                        .attr('x', function () {return x(6) + 20;})
                        .attr('y', function () {return y(15)})
                        .attr('height', function () {return y(5); })
                        .attr('width', x.bandwidth() - 40)
                        .style('fill', 'DimGray');
                    ;
                    svg.append('text')
                        .attr('x', function () {return x(6) + 45;})
                        .attr('y', function () {return y(7)})
                        .style('fill', 'white')
                        .style("font-size", "24px")
                        .html("BYE");
                    ;

                    // x-axis
                    svg.append('g')
                        .attr('class', 'axis axis--x')
                        .attr('transform', `translate(0,${height})`)
                        .call(xAxis);

                    // y-axis
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
                            .attr("transform", (d, i) => `translate(0,${i * 20})`)
                            .attr("fill", "white");

                        g.append("rect")
                            .attr("width", 19)
                            .attr("height", 19)
                            .attr("fill", color);

                        g.append("text")
                            .attr("x", 24)
                            .attr("y", 9.5)
                            .attr("dy", "0.35em")
                            .text(d => d);
                    };

                    svg.append("g")
                        .attr("transform", `translate(${margin.left + 1},${margin.top})`)
                        .call(legend);

                    // text label for x-axis
                    svg.append("text")
                        .attr("transform",
                            "translate(" + (width / 2) + " ," +
                            (height + margin.top) + ")")
                        .style("text-anchor", "middle")
                        .text("Week")
                        .attr("fill", "white");

                    // text label for y-axis
                    svg.append("text")
                        .attr("transform", "rotate(-90)")
                        .attr("y", 0 - margin.left)
                        .attr("x", 0 - (height / 2))
                        .attr("dy", "1em")
                        .style("text-anchor", "middle")
                        .text("Fantasy Points")
                        .attr("fill", "white");

                }) // end of tsv loader


        }
    }
</script>

<style scoped>

</style>
