// svg wrapper dimensions 
var svgWidth = 800;
var svgHeight = 800;

var margin = {
    top:20,
    right:40,
    bottom:150,
    left:150
};

var width = svgWidth-margin.left-margin.right;
var height = svgHeight-margin.top-margin.bottom;

// append svg element
var svg = d3
    .select(".scatter")
    .append("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth);

// append svg element
var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Initial Params
var chosenXAxis = "poverty";
var chosenYAxis = "obesity";

// function used for updating x-scale var upon click on axis label
function xScale(lifeData, chosenXAxis, xLinearScale) {
    // create scales
    var xLinearScale = d3.scaleLinear()
        .domain([d3.min(lifeData, d => d[chosenXAxis]) * 0.8, d3.max(lifeData, d => d[chosenXAxis]) * 1.2])
        .range([0, width]);
    return xLinearScale;
}

// function used for updating y-scale var upon click on axis label
function yScale(lifeData, chosenYAxis, yLinearScale) {
    // create scales
    var yLinearScale = d3.scaleLinear()
        .domain([d3.min(lifeData, d => d[chosenYAxis]) * 0.8, d3.max(lifeData, d => d[chosenYAxis]) * 1.2])
        .range([width,0]);
    return yLinearScale;
}

// function used for updating xAxis var upon click on axis label
function renderXAxes(newXScale, xAxis) {
    var bottomAxis = d3.axisBottom(newXScale);

    xAxis.transition()
        .duration(1000)
        .call(bottomAxis);
    return xAxis;
}

// function used for updating yAxis var upon click on axis label
function renderYAxes(newYScale, yAxis) {
    var leftAxis = d3.axisLeft(newYScale);

    yAxis.transition()
        .duration(1000)
        .call(leftAxis);
    return yAxis;
}

// function used for updating circles group with a transition to
// new circles X
function renderXCircles(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
    .duration(1000)
    .attr("cx", d => newXScale(d[chosenXAxis])).duration(300);
        return circlesGroup;
}

function renderYCircles(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
    .attr("cy", d => newYScale(d[chosenYAxis])).duration(300);
        return circlesGroup;
}

function renderXStateText(circlesGroup, newXScale, chosenXAxis) {

    circlesGroup.transition()
    .duration(1000)
    .attr("dx", d => newXScale(d[chosenXAxis]));
        return circlesGroup;
    }

function renderYStateText(circlesGroup, newYScale, chosenYAxis) {

    circlesGroup.transition()
    .attr("dy", d => newYScale(d[chosenYAxis]));
        return circlesGroup;
    }

// function used for updating circles group with new tooltip

function updateToolTip(xLabel, yLabel, circlesGroup) {

    function findXLabel(chosenXAxis,xLabel) {
        var xLabel;

        if (chosenXAxis === "poverty") {
            xLabel = "Poverty:";
        }else if (chosenXAxis === "age") {
            xLabel = "Age:";
        }else {
            xLabel = "Income:";
        }
            return xLabel;
    }

    function findYLabel(chosenYAxis,yLabel) {
        var yLabel;

        if (chosenYAxis === "obesity") {
        label = "Obesity:";
        }else if  (chosenYAxis === "smokes"){
            label = "Smokes:";
        }else  {
        label = "Healthcare:";
        }
            return yLabel;   
    }

    var toolTip = d3.tip()
        .attr("class", "d3-tip")
        .offset([80, -60])
        .html(function(d) {
            return (`<strong>State: ${d.state}</strong></br>${xLabel}: <strong>${d[chosenXAxis]}</strong>
            </br>${yLabel}: <strong>${d[chosenYAxis]}</strong`);
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })
    // onmouseout event
    .on("mouseout", function(data, index) {
        toolTip.hide(data);
    });

    return circlesGroup;
}

//read .csv
d3.csv('data.csv').then(function(lifeData,err) {
    console.log(lifeData);
    if (err) throw err;

    //parse data
    lifeData.forEach(function(data) {
        data.poverty= + data.poverty;
        data.obesity= + data.obesity;
        data.age= + data.age;
        data.income= + data.income;
        data.smokes= + data.smokes;
        data.healthcare= + data.healthcare;
    });

    // Create x scale function
    var xLinearScale = xScale(lifeData,chosenXAxis);

    // Create y scale function
    var yLinearScale = yScale(lifeData,chosenYAxis);

    // stateCircle variables
    var stateCircle = lifeData.map(d => d.abbr);
        console.log(stateCircle);
    
    // create axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // append x and y axes
    var xAxis=chartGroup.append('g')
        .classed("aText",true)
        .attr("transform",`translate(0,${height})`)
        .call(bottomAxis);

    var yAxis = chartGroup.append('g')
        .classed("aText",true)
        .call(leftAxis);

    var r = 12;

    // append initial circles
    var circlesGroup = chartGroup.selectAll("circle")
        .data(lifeData)
        .enter()
        .append("circle")
        .classed("stateCircle",true)
        .attr("cx", d=>xLinearScale(d[chosenXAxis]))
        .attr("cy", d=>yLinearScale(d[chosenYAxis]))
        .attr("r", r);

    // append stateLabels
    circlesGroup.select("text.stateText")
        .data(lifeData)
        .enter()
        .append("text")
        .classed("stateText",true)
        .text(function(d) {
             return d.abbr;
        })

        .attr("dx", d=>xLinearScale(d[chosenXAxis]))
        .attr("dy", d=>yLinearScale(d[chosenYAxis]))
        .style("font-size",r-2);

    // Create group for three x-axis labels
    var labelsXGroup = chartGroup.append("g")
        .attr("transform", `translate(${width / 2}, ${height + 20})`);

    var povertyXLabel =labelsXGroup.append("text")
        .attr("x",0)
        .attr("y",20)
        .attr("value","poverty")
        .classed("aText",true)
        .classed("active",true)
        .text("Poverty (%)");

    var ageXLabel = labelsXGroup.append("text")
        .attr("x",0)
        .attr("y",40)
        .attr("value","age")
        .classed("aText",true)
        .classed("inactive",true)
        .text("Age");

    var incomeXLabel = labelsXGroup.append("text")
        .attr("x",0)
        .attr("y",60)
        .attr("value","income")
        .classed("aText",true)
        .classed("inactive",true)
        .text("Income");


    // Create group for three y-axis labels
    var labelsYGroup = chartGroup.append("g")
        .attr("transform", "rotate(-90)");

    var obesityYLabel = labelsYGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "4.5em")
        .classed("aText", true)
        .classed("active",true)
        .text("Obesity (%)");

    var smokesYLabel = labelsYGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "6em")
        .classed("aText", true)
        .classed("inactive",true)
        .text("Smokes (%)");

    var healthcareYLabel = labelsYGroup.append("text")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 2))
        .attr("dy", "7.5em")
        .classed("aText", true)
        .classed("inactive",true)
        .text("Healthcare (%)");

    //update ToolTip function, csv import
    // var circlesYGroup = updateYToolTip(chosenXAxis,circlesYGroup);
    var circlesGroup = updateToolTip(chosenXAxis,chosenYAxis, circlesGroup);

    //x axis labels event listener:
    labelsXGroup.selectAll("text")
        .on("click",function() {
            //get value of selection
            var valueX = d3.select(this).attr("value");
            if (valueX !==chosenXAxis) {

                //replaces chosenXAxis with value
                chosenXAxis = valueX;

                //updates x scale for new data
                xLinearScale = xScale(lifeData,chosenXAxis);

                //updates x axis with transition
                xAxis = renderXAxes(xLinearScale,xAxis);

                //updates circles with new xvalues
                circlesGroup=renderXCircles(circlesGroup, xLinearScale, chosenXAxis);

                //changes classes to change bold text
                if (chosenXAxis === "poverty") {
                    povertyXLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    ageXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    incomeXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                }
                else if (chosenXAxis === "age") {
                    ageXLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    povertyXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    incomeXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                }
                else {
                    incomeXLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    povertyXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    ageXLabel
                        .classed("active",false)
                        .classed("inactive",true);
                }
            }
        });

    //y axis labels event listener:
    labelsYGroup.selectAll("text")
        .on("click",function() {
            //get value of selection
            var valueY = d3.select(this).attr("value");
            if (valueY !==chosenYAxis) {

                //replaces chosenYAxis with value
                chosenYAxis = valueY;

                //updates x scale for new data
                yLinearScale = yScale(lifeData,chosenYAxis);

                //updates x axis with transition
                yAxis = renderYAxes(yLinearScale,yAxis);

                //updates circles with new xvalues
                circlesGroup=renderYCircles(circlesGroup, yLinearScale, chosenYAxis);

                //changes classes to change bold text
                if (chosenYAxis === "obesity") {
                    obesityYLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    smokesYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    healthcareYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                }
                else if (chosenYAxis === "smokes") {
                    smokesYLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    obesityYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    healthcareYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                }
                else {
                    healthcareYLabel
                        .classed("active",true)
                        .classed("inactive",false);
                    obesityYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                    smokesYLabel
                        .classed("active",false)
                        .classed("inactive",true);
                } 
            }
        });
    }).catch(function(error) {
    console.log(error);
});