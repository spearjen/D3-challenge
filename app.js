//state abbreviations not appearing on screen, show in 
//does not resize for smaller screen
// Obesity axis label moves badly on resize

// code for the chart function that automatically resizes
function makeResponsive() {

    // empty the svg if it isn't already empty when the browser loads; remove and replace with a resized version
    var svgArea = d3.select("body").select("svg");

    // clear svg if not empty    
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    // svg wrapper dimensions are determined by browser width and height
    var svgWidth = window.innerHeight;
    var svgHeight = window.innerWidth-1000;

    var margin = {
        top:150,
        right:150,
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

    // append group element
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    //read .csv
    d3.csv('data.csv').then(function(lifeData) {
        console.log(lifeData);

        // stateCircle variables
        var stateCircle = lifeData.map(d => d.abbr);
            console.log(stateCircle);
        
        // convert everything to int
        lifeData.forEach(function(data) {
            data.poverty= +data.poverty;
            console.log("Poverty:",data.poverty);
        });

        lifeData.forEach(function(data) {
            data.obesity= +data.obesity;
            console.log("Obesity:", data.obesity);
        });

        lifeData.forEach(function(data) {
            data.age= +data.age;
            console.log("Age:",data.age);
        });

        lifeData.forEach(function(data) {
            data.income= +data.income;
            console.log("Income:", data.income);
        });

        lifeData.forEach(function(data) {
            data.smokes= +data.smokes;
            console.log("Smokes:",data.smokes);
        });

        lifeData.forEach(function(data) {
            data.healthcare= +data.healthcare;
            console.log("Healthcare:", data.healthcare);
        });

        // create scales 
        var xPoverty = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.poverty)))
            .range([0,width]);
        
        var xAge = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.age)))
            .range([0,width]);

        var xIncome = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.income)))
            .range([0,width+500]);

        // var xLinearList=[xPoverty,xAge,xIncome];
            
        var yObesity = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.obesity)))
            .range([height,0]);
    
        var ySmokes = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.smokes)))
            .range([height,0]);

        var yHealthcare = d3.scaleLinear()
            .domain(d3.extent(lifeData.map(d=>d.healthcare)))
            .range([height,0]);

        // var yLinearList=[yObesity,ySmokes,yIncome];

        // create axes
        var xAxis = d3.axisBottom(xPoverty);
        var yAxis = d3.axisLeft(yObesity);

        // append axes
        chartGroup.append("g")
            .attr('transform',`translate(0,${height})`)
            .call(xAxis);
        
        chartGroup.append("g")
            .call(yAxis);

        var r = 12;

        // append circle
        var circlesGroup=chartGroup.selectAll(".scatter")
            .data(lifeData)
            .enter()
        circlesGroup.append("circle")
            // .append(d=>d.abbr)
            .classed("stateCircle",true)
            .attr("cx", d=>xPoverty(d.poverty))
            .attr("cy", d=>yObesity(d.obesity))
            .attr("r", r)
            .classed("stateText",true)
        circlesGroup.append("text")
            .text(function(d) {
                return d.abbr;
            })
            .attr("dx", d=>xPoverty(d.poverty) - r/1.5)
            .attr("dy", d=>yObesity(d.obesity) + r/4.5)
            .style("font-size",r-2);
            
         // text label for the x axis
        svg.append("text")             
            .attr("x", width-margin.left)
            .attr("y",  height+margin.top+25)
            .classed("aText",true)
            .attr("dy", "1em")
            .text("Poverty (%)");

        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left+50)
            .attr("x", -margin.top-50)
            .attr("dx","-12.5em")
            .attr("dy","12.5em")
            .classed("aText",true)
            .text("Obesity (%)"); 

        var toolTip=d3.tip()
            .attr("class","d3-tip")
            .offset([80,-60])
            .html(function(d) {
                return(`State: <strong> ${d.state}</strong> </br> Poverty: <strong> ${d.poverty}</strong> </br> Obesity: <strong> ${d.obesity} </strong>`)
            });

        chartGroup.call(toolTip);

        circlesGroup.on("mouseover",function(d) { 
            toolTip.show(d,this);
        })

            .on("mouseout",function(d) {
                toolTip.hide(d);
            })

    }).catch(function(error) {
        console.log(error);  
    });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);

