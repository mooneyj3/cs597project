<template>

</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: 'Player-Depth',
        mounted() {

            const w = 1500;
            const h = 1500;
            let x, y;
            let dataset;

            // setup tooltip
            let div = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);
            
            let teams = d3.select(this.$el).append("select");

            // setup canvas
            let svg = d3.select(this.$el)
                .append('svg')
                .attr("width", w)
                .attr("height", h);

            // let off_sel =  svg
            //              .append('select')
            //              .attr("class", "offense_team");

            // let def_sel =  svg
            //              .append('select')
            //              .attr("class", "defense_team");
            
            // append field image background
            let imgs = svg.selectAll("image").data([0]);
                imgs.enter()
                .append("svg:image")
                .attr("xlink:href", "data/field2.jpg")
                .attr("x", "250")
                .attr("y", "0")
                .attr("width", "1000")
                .attr("height", "1000");
            
            
            // change to set positions (maybe load this)
            var positions = { "offense" : [ { "label" : "QB", "cx" : 750, "cy" : 575, "r" : 20 },
                                            { "label" : "RB", "cx" : 750, "cy" : 675, "r" : 20 },
                                            { "label" : "WR", "cx" : 500, "cy" : 525, "r" : 20 },
                                            { "label" : "WR", "cx" : 1000, "cy" : 535, "r" : 20 },
                                            { "label" : "TE", "cx" : 900, "cy" : 535, "r" : 20 },
                                            { "label" : "LG", "cx" : 700, "cy" : 525, "r" : 20 },
                                            { "label" : "RG", "cx" : 800, "cy" : 525, "r" : 20 },
                                            { "label" : "C", "cx" : 750, "cy" : 525, "r" : 20 },
                                            { "label" : "FB", "cx" : 750, "cy" : 625, "r" : 20 },
                                            { "label" : "LT", "cx" : 650, "cy" : 525, "r" : 20 },
                                            { "label" : "RT", "cx" : 850, "cy" : 525, "r" : 20 },
                                          ],

                              "defense" : [ { "label" : "CB", "cx" : 500, "cy" : 460, "r" : 20 },
                                            { "label" : "CB", "cx" : 1000, "cy" : 460, "r" : 20 },
                                            { "label" : "WLB", "cx" : 845, "cy" : 415, "r" : 20 },
                                            { "label" : "DT", "cx" : 720, "cy" : 475, "r" : 20 },
                                            { "label" : "DT", "cx" : 780, "cy" : 475, "r" : 20 },
                                            { "label" : "SS", "cx" : 875, "cy" : 325, "r" : 20 },
                                            { "label" : "DE", "cx" : 660, "cy" : 475, "r" : 20 },
                                            { "label" : "DE", "cx" : 840, "cy" : 475, "r" : 20 },
                                            { "label" : "MLB", "cx" : 750, "cy" : 375, "r" : 20 },
                                            { "label" : "FS", "cx" : 625, "cy" : 275, "r" : 20 },
                                            { "label" : "SLB", "cx" : 645, "cy" : 415, "r" : 20 },
                                          ]
                            };
            
            // visualize positions
            var nodes = svg.selectAll(".nodes");

            // append offensive positions
            var g_o = nodes.data(positions.offense).enter().append("g");

            g_o.append("circle")
                .attr("class", "offense")   
                .attr("r", 0)
                .style("opacity", 1)
                .style("fill", "blue")
                .attr("id", function(d){return d.label;})
                // .on('click', function () {
                //         d3.select(this)
                //             .transition().duration(1000)
                //             .attr('r',0)
                //             .remove()
                //         })
                    .transition().duration(1000)
                        .attr('cx', function (d) { return d.cx })
                        .attr('cy', function (d) { return d.cy })
                        .attr('r', function (d) { return d.r })

            g_o.append("text")
                .transition().duration(1000)
                .attr("dx", function (d) { if(d.label.length == 1) {return d.cx - 6}
                                           else if(d.label.length == 2) {return d.cx - 12}
                                           else {return d.cx - 15}}
                    )
                .attr("dy", function (d) { return d.cy + 5 })
                .attr("font-weight","bold")
                .attr("fill","white")
                .text(function(d){
                    return d.label;
                });
            
            // append defensive positions
            var g_d = nodes.data(positions.defense).enter().append("g");

            g_d.append("circle")
                .attr("class", "defense")   
                .attr("r", 0)
                .style("opacity", 1)
                .style("fill", "red")
                .attr("id", function(d){return d.label;})
                // .on('click', function () {
                //         d3.select(this)
                //             .transition().duration(1000)
                //             .attr('r',0)
                //             .remove()
                //         })
                    .transition().duration(1000)
                        .attr('cx', function (d) { return d.cx })
                        .attr('cy', function (d) { return d.cy })
                        .attr('r', function (d) { return d.r })

            g_d.append("text")
                .transition().duration(1000)
                .attr("dx", function (d) { if(d.label.length == 1) {return d.cx - 6}
                                           else if(d.label.length == 2) {return d.cx - 12}
                                           else {return d.cx - 17}}
                    )
                .attr("dy", function (d) { return d.cy + 5 })
                .attr("font-weight","bold")
                .attr("fill","white")
                .text(function(d){
                    return d.label;
                });

            //import data
            d3.json("data/depth/depth_week_1.json")
                .then(function(data) {
                    //console.log(data.length);
                    //console.log(data[0]);

                    dataset = data;

                    teams.on('change',updateCircles)
                        .selectAll('option')
                            .data(data[0].teams)
                            .enter()
                        .append('option')
                            .attr('value',function (d,i) { return i })
                            .text(function (d) { return d.name });

                    var tooltip = svg.append("g")
                        .attr("class", "tooltip")
                        .style("display", "none");
                    tooltip.append("rect")
                        .attr("width", 100)
                        .attr("height", 100)
                        .attr("fill", "white")
                        .style("opacity", 1.0)

                    tooltip.append("text")
                        .attr("x", 150)
                        .attr("dy", "1.2em")
                        .style("text-anchor", "middle")
                        .attr("font-size", "12px")
                        .attr("font-weight", "bold")
                        .style("fill", "black");
                    
                    updateCircles();

                    function updateCircles() {
                        var selectValue = teams.property('value');
                        var data2 = data[0].teams[selectValue];

                        g_o.on("mouseover", function(d) { tooltip.style("display", null); 
                            d3.select(this)
                                .style("opacity", 0.2)

                            var data3 = data2.offense;
                            var playerPos = d3.select(this).text();
                            var players = data3.filter(function(data){ return playerPos.includes(data.position.name) })
                            var depth = players[0].position.players;

                            for(var i = 0; i < depth.length; i++){
                                tooltip.select("text").append('tspan').attr("x", 75)
                                        .attr("dy", "1.2em")
                                        .style("text-anchor", "middle")
                                        .attr("font-size", "12px")
                                        .attr("font-weight", "bold")
                                        .style("fill", "black").text(depth[i].name);
                            }
                            var xPosition = d3.event.pageX + 20;
                            var yPosition = d3.event.pageY - 300;
                            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                            tooltip.select("rect").attr("width", 150)
                            tooltip.select("rect").attr("height", 17*depth.length)
                            //tooltip.select("text").append('tspan').attr("x", 50).text("test");
                        })
                        .on("mouseout", function(d) { 
                            tooltip.style("display", "none");
                            tooltip.selectAll('tspan').remove();
                            d3.select(this)
                            .style("opacity", 1)
                        })

                        g_d.on("mouseover", function(d) { tooltip.style("display", null); 
                            d3.select(this)
                                .style("opacity", 0.2)

                            var data3 = data2.defense;
                            var playerPos = d3.select(this).text();
                            var players = data3.filter(function(data){ return playerPos.includes(data.position.name) })
                            var depth = players[0].position.players;

                            for(var i = 0; i < depth.length; i++){
                                tooltip.select("text").append('tspan').attr("x", 75)
                                        .attr("dy", "1.2em")
                                        .style("text-anchor", "middle")
                                        .attr("font-size", "12px")
                                        .attr("font-weight", "bold")
                                        .style("fill", "black").text(depth[i].name);
                            }
                        
                            var xPosition = d3.event.pageX + 20;
                            var yPosition = d3.event.pageY - 300;
                            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                            tooltip.select("rect").attr("width", 150)
                            tooltip.select("rect").attr("height", 17*depth.length)
                            //tooltip.select("text").attr("x", 50).text('Test');
                        })
                        .on("mouseout", function(d) { 
                            tooltip.style("display", "none");
                            tooltip.selectAll('tspan').remove();
                            d3.select(this)
                            .style("opacity", 1)
                        })
                    }
                });
        },
    }

</script>

<style>
    svg circle {
        fill: black;
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