// code for the chart function that automatically resizes
function makeResponsive() {

    // empty the svg if it isn't already empty when the browser loads; remove and replace with a resized version
    var svgArea = d3.select("body").select("svg");

    // clear svg if not empty    
    if (!svgArea.empty()) {
        svg.Area.remove();
    }

    // svg wrapper dimensions are determined by browser width and height
    var svgWidth = 1000;
    var svgHeight = 600;

    var margin = {
        top:50,
        right:50,
        bottom:50,
        left:50
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
            .range([0,width]);

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

        // // circle generator
        // var stateCircle = d3.circle()
        //     .cx(d=>xLinearScale2(d.healthcare))
        //     .cy(d=>yLinearScale3(d.income));

        // append circle
        chartGroup.selectAll(".scatter")
            .data(lifeData)
            .enter()
            .append("circle")
            // .append(d=>d.abbr)
            .classed("stateCircle",true)
            .attr("cx", d=>xPoverty(d.poverty))
            .attr("cy", d=>yObesity(d.obesity))
            .attr("r", 15)
            .classed("stateText",true)
            .text(d=>d.abbr);

        // append tooltip div
        var toolTip = d3.select("circle")
            .append("div")
            .classed("d3-tip", true);

        //create mouseover event
        chartGroup.on("mouseover", function(d) {
            toolTip.style("aText", "active", "d3-tip")
                .html(
                    `<strong>poverty<strong><hr>obesity`)
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        })

            // create mouseout event
            .on("mouseout",function(){
                toolTip.style("inactive")
            });

    }).catch(function(error) {
        console.log(error);  
    });
}

makeResponsive();

d3.select(window).on("resize", makeResponsive);

