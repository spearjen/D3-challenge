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

        var stateCircle = lifeData.map(data => data.abbr);
            console.log(stateCircle);

        var poverty = lifeData.map(data => data.poverty);
            console.log(poverty);
        
        // create scales 
        var xPoverty = d3.scaleLinear()
            .domain ([0,d3.max(lifeData, d=>d.poverty)])
            .range([0,width]);
        
        var xAge = d3.scaleLinear()
            .domain ([0,d3.max(lifeData, d=>d.age)])
            .range([0,width]);

        var xIncome = d3.scaleLinear()
            .domain ([0,d3.max(lifeData, d=>d.income)])
            .range([0,width]);
            
        var yObesity = d3.scaleLinear()
            .domain ([d3.max(lifeData, d=>d.obesity),0])
            .range([height,0]);
    
        var ySmokes = d3.scaleLinear()
            .domain ([d3.max(lifeData, d=>d.smokes),0])
            .range([height,0]);

        var yHealthcare = d3.scaleLinear()
            .domain ([d3.max(lifeData, d=>d.healthcare),0])
            .range([height,0]);

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
            .classed("stateCircle",true)
            .attr("cx", d=>xPoverty(d.poverty)/2)
            .attr("cy", d=>yObesity(d.obesity)/2)
            .attr("r", 10);

        // append tooltip div
        var toolTip = d3.select("body")
            .append("div")
            .classed("d3-tip", true);

        //create mouseover event
        chartGroup.on("mouseover", function(d) {
            toolTip.style("active", "d3-tip")
                .html(
                    `<strong>${d.poverty}<strong><hr>${d.obesity}`)
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

