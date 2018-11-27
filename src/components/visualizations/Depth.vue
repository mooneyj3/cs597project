<template>

</template>

<script>
    import * as d3 from 'd3'
    export default {
        name: 'Player-Depth',
        mounted() {

            const w = 1500;
            const h = 1500;
            const shiftX = 40;
            const shiftY = 10;
            let x, y;
            let dataset;

            // setup tooltip
            let div = d3.select("body")
                .append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            let offTxt = d3.select(this.$el).append("text").text('Offense: ').style("color", "blue").style("background-color", "black").style("margin-left","25%");
            let offTeam = d3.select(this.$el).append("select").style("background-color", "black");
            let defTxt = d3.select(this.$el).append("text").attr("x",200).text('  Defense: ').style("color", "red").style("background-color", "black");
            let defTeam = d3.select(this.$el).append("select").style("background-color", "black").style("x",200);

            // setup canvas
            let svg = d3.select(this.$el)
                .append('svg')
                .attr("width", w)
                .attr("height", h);

            // var legend = svg.append("g")
            //         .attr("class","legend")
            //         .attr("transform","translate(50,30)")
            //         .style("font-size","12px")
            //         .call(d3.legend)

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
                .attr("xlink:href", "/data/field.jpg")
                .attr("x", shiftX)
                .attr("y", shiftY)
                .attr("width", "1000")
                .attr("height", "1000");

            // let offTxt = svg.selectAll(".offTxt").data([0]).enter().append("text").attr("x", shiftX+200).attr("y", shiftY+50).text('Offense: ').style("color", "blue").style("background-color", "black");
            // let offTeam = svg.selectAll(".offTeam").append("select").style("background-color", "black");
            // let defTxt = svg.selectAll(".defTxt").append("text").attr("x",200).text('  Defense: ').style("color", "red").style("background-color", "black");
            // let defTeam = svg.selectAll(".defTeam").append("select").style("background-color", "black").style("x",200);


            // change to set positions (maybe load this)
            var positions = { "offense" : [ { "label" : "QB", "cx" : shiftX + 500, "cy" : shiftY + 575, "r" : 20 },
                                            { "label" : "RB", "cx" : shiftX + 500, "cy" : shiftY + 675, "r" : 20 },
                                            { "label" : "WR", "cx" : shiftX + 250, "cy" : shiftY + 525, "r" : 20 },
                                            { "label" : "WR", "cx" : shiftX + 750, "cy" : shiftY + 535, "r" : 20 },
                                            { "label" : "TE", "cx" : shiftX + 650, "cy" : shiftY + 535, "r" : 20 },
                                            { "label" : "G", "cx" : shiftX + 450, "cy" : shiftY + 525, "r" : 20 },
                                            { "label" : "G", "cx" : shiftX + 550, "cy" : shiftY + 525, "r" : 20 },
                                            { "label" : "C", "cx" : shiftX + 500, "cy" : shiftY + 525, "r" : 20 },
                                            { "label" : "FB", "cx" : shiftX + 500, "cy" : shiftY + 625, "r" : 20 },
                                            { "label" : "T", "cx" : shiftX + 400, "cy" : shiftY + 525, "r" : 20 },
                                            { "label" : "T", "cx" : shiftX + 600, "cy" : shiftY + 525, "r" : 20 },
                                          ],

                              "defense" : [ { "label" : "CB", "cx" : shiftX + 250, "cy" : shiftY + 460, "r" : 20 },
                                            { "label" : "CB", "cx" : shiftX + 750, "cy" : shiftY + 460, "r" : 20 },
                                            { "label" : "LB", "cx" : shiftX + 595, "cy" : shiftY + 415, "r" : 20 },
                                            { "label" : "DT", "cx" : shiftX + 470, "cy" : shiftY + 475, "r" : 20 },
                                            { "label" : "DT", "cx" : shiftX + 530, "cy" : shiftY + 475, "r" : 20 },
                                            { "label" : "S", "cx" : shiftX + 625, "cy" : shiftY + 325, "r" : 20 },
                                            { "label" : "DE", "cx" : shiftX + 410, "cy" : shiftY + 475, "r" : 20 },
                                            { "label" : "DE", "cx" : shiftX + 590, "cy" : shiftY + 475, "r" : 20 },
                                            { "label" : "LB", "cx" : shiftX + 500, "cy" : shiftY + 375, "r" : 20 },
                                            { "label" : "S", "cx" : shiftX + 375, "cy" : shiftY + 275, "r" : 20 },
                                            { "label" : "LB", "cx" : shiftX + 395, "cy" : shiftY + 415, "r" : 20 },
                                          ]
                            };


            //var legend = svg.selectAll(".legend").append("g").attr("class", "legend");

            var legend = svg.selectAll(".legend").data(positions.offense).enter().append("g");

            var bg = legend.append("rect")
                .attr("x", shiftX + 650)
                .attr("y", shiftY + 50)
                .attr("height", 120)
                .attr("width", 150)
                .style('opacity', '0.1')
                .style("fill", 'black');

            legend.append("text") .attr("x", shiftX + 690)
                .attr("y", shiftY + 65).attr("font-size", "12px").style("font-family","sans-serif").text("Injury Status").style('fill','white');

            legend.append("text") .attr("x", shiftX + 695)
                .attr("y", shiftY + 90).attr("font-size", "12px").style("font-family","sans-serif").text("Questionable").style('fill','white');

            legend.append("text") .attr("x", shiftX + 695)
                .attr("y", shiftY + 110).attr("font-size", "12px").style("font-family","sans-serif").text("Doubtful").style('fill','white');

            legend.append("text") .attr("x", shiftX + 695)
                .attr("y", shiftY + 130).attr("font-size", "12px").style("font-family","sans-serif").text("Out").style('fill','white');

            legend.append("text") .attr("x", shiftX + 695)
                .attr("y", shiftY + 150).attr("font-size", "12px").style("font-family","sans-serif").text("Unconfirmed").style('fill','white');

            legend.append("rect")
                .attr("x", shiftX + 660)
                .attr("y", shiftY + 77)
                .attr("height", 15)
                .attr("width", 15)
                .style('opacity', '1')
                .style("fill", '#cccc00');

            legend.append("rect")
                .attr("x", shiftX + 660)
                .attr("y", shiftY + 97)
                .attr("height", 15)
                .attr("width", 15)
                .style('opacity', '1')
                .style("fill", "#ff751a");

            legend.append("rect")
                .attr("x", shiftX + 660)
                .attr("y", shiftY + 117)
                .attr("height", 15)
                .attr("width", 15)
                .style('opacity', '1')
                .style("fill", '#990000');

            legend.append("rect")
                .attr("x", shiftX + 660)
                .attr("y", shiftY + 137)
                .attr("height", 15)
                .attr("width", 15)
                .style('opacity', '1')
                .style("fill", '#c61aff');

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
            Promise.all([d3.json("/data/depth/depth_week_1.json"), d3.json("/data/injuries/injuries_week_1.json"),])
                .then(function(files) {
                    // console.log(data.length);
                    // console.log(data[0]);

                    var data = files[0];
                    var injuries = files[1];
                    dataset = data;

                    offTeam.on('change',updateCircles)
                        .selectAll('option')
                            .data(data[0].teams)
                            .enter()
                        .append('option')
                            .attr('value',function (d,i) { return i })
                            .text(function (d) { return d.name });

                    defTeam.on('change',updateCircles)
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
                        .attr("width", 120)
                        .attr("height", 100)
                        .attr("fill", "black")
                        .style("opacity", 0.8)

                    tooltip.append("text")
                        .attr("x", 150)
                        .attr("dy", "1.2em")
                        .style("text-anchor", "middle")
                        .attr("font-size", "16px")
                        .attr("font-weight", "bold")
                        .style("fill", "white");


                    offTeam.property('value', '10');
                    defTeam.property('value', '27');

                    updateCircles();


                    function updateCircles() {
                        var offValue = offTeam.property('value');
                        var defValue = defTeam.property('value');

                        var offData = data[0].teams[offValue];
                        var defData = data[0].teams[defValue];

                        var offInj;
                       for(var i = 0; i < injuries[0].teams.length; i++){
                            if(injuries[0].teams[i].name == offData.name){
                                offInj = injuries[0].teams[i];
                            }
                        }
                        var defInj;
                         for(var i = 0; i < injuries[0].teams.length; i++){
                            if(injuries[0].teams[i].name == defData.name){
                                defInj = injuries[0].teams[i];
                            }
                        }

                        g_o.on("mouseover", function(d) { tooltip.style("display", null);
                            var sel = d3.select(this)
                                .style("opacity", 0.2)

                            var data3 = offData.offense;
                            var injData = offInj.players;
                            var playerPos = d3.select(this).text();
                            var playerVec = []
                            var players = data3.filter(function(data){if(playerPos == 'T'){
                                if(data.position.name != 'TE'){
                                    return data.position.name.includes(playerPos)
                                }
                                } else {
                                     return data.position.name.includes(playerPos)
                                }}).forEach(function(d) {
                                    playerVec.push(d);
                            });

                            // Append depth title
                            // tooltip.select("text").append('tspan').attr("x", 75)
                            //                 .attr("dy", "1.2em")
                            //                 .style("text-anchor", "middle")
                            //                 .attr("font-size", "12px")
                            //                 .attr("font-weight", "bold")
                            //                 .style("fill", "black").text('Depth');

                            // find all players in that position
                            var depthList = []
                            for(var j =  0; j < playerVec.length; j++){
                                var depth = playerVec[j].position.players;
                                for(var i = 0; i < depth.length; i++){
                                    depthList.push(depth[i])
                                }
                            }

                            //sort by depth
                            depthList.sort(function(a,b) {
                                return a.depth - b.depth;
                            })

                            //append players
                            for(var i = 0; i < depthList.length; i++){
                                var injPlayer = injData.filter(function(data){return data.name == depthList[i].name})
                                if(injPlayer.length != 0 && injPlayer[0].name == depthList[i].name){
                                    if(injPlayer[0].injuries[0].hasOwnProperty('status')){
                                        if(injPlayer[0].injuries[0].status == "Questionable"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#cccc00").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else if (injPlayer[0].injuries[0].status == "Doubtful"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#ff751a").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else if(injPlayer[0].injuries[0].status == "Out"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#990000").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else {
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#ff6600").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        }

                                    } else {
                                         tooltip.select("text").append('tspan').attr("x", 75)
                                            .attr("dy", "1.2em")
                                            .style("text-anchor", "middle")
                                            .attr("font-size", "12px")
                                            .attr("font-weight", "bold")
                                            .attr("class", "test")
                                            .attr("class", "test")
                                            .style("fill", "#c61aff").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);

                                    }
                                } else {
                                    tooltip.select("text").append('tspan').attr("x", 75)
                                            .attr("dy", "1.2em")
                                            .style("text-anchor", "middle")
                                            .attr("font-size", "12px")
                                            .attr("font-weight", "bold")
                                            .attr("class", "test")
                                            .style("fill", "white").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                }
                            }

                            //var xPosition = d3.event.pageX + 20;
                            //var yPosition = d3.event.pageY - 220;

                            var xPosition = d3.mouse(this)[0] + 20;
                            var yPosition = d3.mouse(this)[1] + 20;
                            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                            tooltip.select("rect").attr("width", 150)
                            tooltip.select("rect").attr("height", 17*(depthList.length))
                        })
                        .on("mouseout", function(d) {
                            tooltip.style("display", "none");
                            tooltip.selectAll('tspan').remove();
                            d3.select(this)
                            .style("opacity", 1)
                        })

                        g_d.on("mouseover", function(d) { tooltip.style("display", null);
                            var sel = d3.select(this)
                                .style("opacity", 0.2)

                            var data3 = defData.defense;
                             var injData = defInj.players;
                            var playerPos = d3.select(this).text();
                            var playerVec = [];
                            var players = data3.filter(function(data){
                                if(playerPos == 'DT'){
                                    if(data.position.name == 'RDT' || data.position.name == 'NT' || data.position.name == 'LDT'){
                                        return data.position.name
                                    } else {
                                        return data.position.name.includes(playerPos)
                                    }

                                } else if(playerPos == 'LB'){
                                    if(data.position.name == 'MIKE' || data.position.name == 'SAM' || data.position.name == 'WILL'){
                                        return data.position.name
                                    } else {
                                        return data.position.name.includes(playerPos)
                                    }

                                } else if(playerPos == 'S'){
                                    if(!data.position.name.includes('LB')){
                                        return data.position.name.includes(playerPos)
                                    }
                                } else if(playerPos == 'DE'){
                                    if(data.position.name == 'LEO'){
                                        return data.position.name
                                    } else {
                                        return data.position.name.includes(playerPos)
                                    }

                                } else {
                                     return data.position.name.includes(playerPos)
                                }}).forEach(function(d) {
                                    playerVec.push(d);
                            });

                            // find all players in that position
                            var depthList = []
                            for(var j =  0; j < playerVec.length; j++){
                                var depth = playerVec[j].position.players;
                                for(var i = 0; i < depth.length; i++){
                                    depthList.push(depth[i])
                                }
                            }

                            //sort by depth
                            depthList.sort(function(a,b) {
                                return a.depth - b.depth;
                            })

                            //append players
                            for(var i = 0; i < depthList.length; i++){
                                var injPlayer = injData.filter(function(data){return data.name == depthList[i].name})
                                if(injPlayer.length != 0 && injPlayer[0].name == depthList[i].name){
                                    if(injPlayer[0].injuries[0].hasOwnProperty('status')){
                                        if(injPlayer[0].injuries[0].status == "Questionable"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#cccc00").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else if (injPlayer[0].injuries[0].status == "Doubtful"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#ff751a").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else if(injPlayer[0].injuries[0].status == "Out"){
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#990000").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                        } else {
                                            tooltip.select("text").append('tspan').attr("x", 75)
                                                .attr("dy", "1.2em")
                                                .style("text-anchor", "middle")
                                                .attr("font-size", "12px")
                                                .attr("font-weight", "bold")
                                                .attr("class", "test")
                                                .style("fill", "#c61aff").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);

                                        }
                                    }
                                } else {
                                    tooltip.select("text").append('tspan').attr("x", 75)
                                            .attr("dy", "1.2em")
                                            .style("text-anchor", "middle")
                                            .attr("font-size", "12px")
                                            .attr("font-weight", "bold")
                                            .attr("class", "test")
                                            .style("fill", "white").text(depthList[i].name + ' ' + depthList[i].depth + ' ' + depthList[i].position);
                                }
                            }

                            //var xPosition = d3.event.pageX + 20;
                            //var yPosition = d3.event.pageY - 220;

                            var xPosition = d3.mouse(this)[0] + 20;
                            var yPosition = d3.mouse(this)[1] - 100;
                            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
                            tooltip.select("rect").attr("width", 150)
                            tooltip.select("rect").attr("height", 17*(depthList.length))
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
        background: grey;
        border: 0px;
        border-radius: 4px;
        pointer-events: none;
    }

    .offense {
    fill: none;
    stroke: black;
    stroke-width: 3px;
    stroke-linejoin: round;
    }

    .defense {
    fill: none;
    stroke: black;
    stroke-width: 3px;
    stroke-linejoin: round;
    }

    .offtext {
        fill: white;
        stroke: black;
    stroke-width: 3px;
    stroke-linejoin: round;
    }

    select {
    /* Whatever color  you want */
    background-color: #82caff;
    }
</style>
