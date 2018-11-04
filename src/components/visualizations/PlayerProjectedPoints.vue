<template>
    <div></div>
</template>
<style>

    .AppliedLine {
        fill: none;
        stroke-width: 3;
    }
    .ProjectedLine {
        fill: none;
        stroke-width: 3;
        stroke-dasharray: 5,5;
    }
    .overlay {
        fill: none;
        pointer-events: all;
    }
    .AppliedDot {
        stroke: #fff;
    }
    .ProjectedDot {
        stroke:#fff;
    }
</style>

<script>

    import * as d3 from 'd3';

    export default {
        name: "PlayerProjectedPoints",

        mounted() {

            // Establish variables
            const player = 'Kerryon Johnson';

            let xFrame = 1000,
                yFrame = 500;

            let margin = {top: 50, right: 10, bottom: 50, left: 70},
                width = xFrame - margin.left - margin.right,
                height = yFrame - margin.top - margin.bottom;

            let color = d3.scaleOrdinal(d3.schemeDark2);

            // Establish svg variable
            let svg = d3.select(this.$el)
                        .append('svg')
                        .attr('width', width + margin.left + margin.right)
                        .attr('height', height + margin.top + margin.bottom)
                        .append("g")
                        .attr('transform', 'translate(' + margin.left + ',' + margin.top +')');

            // Establish svg legend
            let legend = svg => {
                        const g = svg
                        .attr("font-family", "sans-serif")
                            .attr("font-size", 10)
                            .selectAll("g")
                            .data(color.domain().slice().reverse())
                            .enter().append("g")
                            .attr("transform", (i) => `translate(0,${i * 20})`);

                        g.append("circle")
                            .attr("r", 7)
                            .style("fill", color);

                        g.append("text")
                            .attr("x", 24)
                            .attr("dy", "0.35em")
                            .text(function(i){
                                var text = ['Applied Points', 'Projected Points'];
                                return text[i]
                            });
            }
            let tooltip = d3.select("body")
                .append("div")
                .style("position", "absolute")
                .style("z-index", "10")
                .style("visibility", "hidden")

            // Load in the data and format it
            d3.json('/data/PlayerData.json')
                    .then(function (data) {

                        let currPlayer = data[player];
                        let playerWeeks = currPlayer.Weeks;
                        let dataPoints = playerWeeks.length

                        // Scrub the data
                        playerWeeks.forEach(function(d) {
                            d.Week              = +d.Week;
                            d.ProjectedPoints   = d.ProjectedPoints == '--' ? 'BYE' : +d.ProjectedPoints;
                            d.AppliedPoints     = d.AppliedPoints == "--" ? 0 : +d.AppliedPoints;
                            d.PercentError      = d.PercentError =='--' ? 0 : +d.PercentError;
                            d.RunningError      = +d.RunningError;
                        });

                        // Establish range of graph
                        let maxPoints = d3.max(currPlayer.Weeks, function(d){
                            return d.ProjectedPoints > d.AppliedPoints ? d.ProjectedPoints : d.AppliedPoints;
                        }) + 1.10;

                        // Establish scales for axes
                        let x = d3.scaleLinear()
                                        .domain([0, dataPoints])
                                        .range([0,width]);
                        let y = d3.scaleLinear()
                                        .domain([0, maxPoints])
                                        .range([height, 0]);

                        // Add a title
                        svg.append('text')
                            .attr('x', (width / 2))
                            .attr('y', 0 - (margin.top / 2))
                            .attr('text-anchor', 'middle')
                            .text(player + ', ' + currPlayer.Posistion + " - " + currPlayer.Team)
                            .attr('class', 'chart-title');

                        // Add the axes
                        svg.append('g')
                            .attr('class', 'y axis')
                            .call(d3.axisLeft(y));
                        svg.append('g')
                            .attr('class', 'x axis')
                            .attr('transform', 'translate(0,' + height + ')')
                            .call(d3.axisBottom(x));

                        // Define the line functions
                        let AppliedLine = d3.line()
                                    .defined(function (d){return d.ProjectedPoints != 'BYE'})
                                    .x(function(d) {return x(d.Week);})
                                    .y(function(d) {return y(d.AppliedPoints);})
                                    .curve(d3.curveMonotoneX)
                        let ProjectedLine = d3.line()
                                    .defined(function (d){return d.ProjectedPoints != 'BYE'})
                                    .x(function(d) {return x(d.Week);})
                                    .y(function(d) {return y(d.ProjectedPoints);})
                                    .curve(d3.curveMonotoneX)

                        // Append the lines to the graph
                        svg.append('path')
                            .datum(playerWeeks)
                            .attr('class', 'AppliedLine')
                            .style('stroke', function(){return color(0)})
                            .on('mousemove', function(){
                                d3.select(this)
                                    .style('stroke-width', 5);
                            })
                            .on('mouseout', function(){
                                d3.select(this)
                                    .style('stroke-width', 3);
                            })
                            .attr('d', AppliedLine)
                        svg.append('path')
                            .datum(playerWeeks)
                            .attr('class', 'ProjectedLine')
                            .style('stroke', function(){return color(1)})
                            .on('mousemove', function(){
                                d3.select(this)
                                    .style('stroke-width', 5);
                            })
                            .on('mouseout', function(){
                                d3.select(this)
                                    .style('stroke-width', 3);
                            })
                            .attr('d', ProjectedLine)


                        // Apply the dots
                        svg.selectAll('.AppliedDot')
                            .data(playerWeeks)
                            .enter().append('circle')
                            .attr('class', 'AppliedDot')
                            .attr('cx', function(d){return x(d.Week);})
                            .attr('cy', function(d){return y(d.AppliedPoints);})
                            .attr('r', '5')
                            .style('fill', function(){return color(0);})
                            .style('display', function(d){
                                if (d.ProjectedPoints == 'BYE'){
                                    return 'none';
                                }
                                return 'block';
                            })
                            .on('mouseover', function(d) {
                                d3.select(this)
                                    .attr('r', '7');
                                return tooltip.style('visibility', 'visible').text(d.AppliedPoints);
                            })
                            .on("mousemove", function(){
                                return tooltip.style("top", (event.pageY-30)+"px").style("left",(event.pageX)+"px");
                            })
                            .on('mouseout', function() {
                                d3.select(this)
                                    .attr('r', '5');
                                return tooltip.style("visibility", "hidden");
                            })
                        svg.selectAll('.ProjectedDot')
                            .data(playerWeeks)
                            .enter().append('circle')
                            .attr('class', 'AppliedDot')
                            .attr('cx', function(d){return x(d.Week);})
                            .attr('cy', function(d){return d.ProjectedPoints == 'BYE' ? y(0) :  y(d.ProjectedPoints);})
                            .attr('r', '5')
                            .style('fill', function(){return color(1);})
                            .style('display', function(d){
                                if (d.ProjectedPoints == 'BYE'){
                                    return 'none';
                                }
                                return 'block';
                            })
                            .on('mouseover', function(d) {
                                d3.select(this)
                                    .attr('r', '7');
                                return tooltip.style('visibility', 'visible').text(d.ProjectedPoints);
                            })
                            .on('mousemove', function() {
                                d3.select(this)
                                    return tooltip.style("top", (event.pageY-30)+"px").style("left",(event.pageX)+"px");
                            })
                            .on('mouseout', function() {
                                d3.select(this)
                                    .attr('r', '5');
                                return tooltip.style("visibility", "hidden");
                            })
                        svg.append("g")
                            .attr("transform", `translate(${margin.left - 20},${margin.top - 20})`)
                            .call(legend);
                    });
        }
    }


</script>
