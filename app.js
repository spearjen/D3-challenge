// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var chartMargin = {
    top:30,
    right:30,
    bottom:30,
    left:30
};

var chartWidth = svgWidth-chartMargin.left-chartMargin.right;
var chartHeight = svgHeight-chartMargin.top-chartMargin.bottom;

var svg = d3
    .select("body")
    .append("svg")
    .attr("height",svgHeight)
    .attr("width",svgWidth);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


    d3.csv('data.csv').then(function(lifeData) {
        console.log(lifeData);
    
    
    var state = lifeData.map(data => data.state);
    console.log(state);

    var age = lifeData.map(data => data.age);
    console.log(age);

    var healthcare = lifeData.map(data => data.healthcare);
    console.log(healthcare);

    var healthcareHigh = lifeData.map(data => data.healthcareHigh);
    console.log(healthcareHigh);

    var healthcareLow = lifeData.map(data => data.healthcareLow);
    console.log(healthcareLow);

    var income = lifeData.map(data => data.income);
    console.log(income);

    var obesity = lifeData.map(data => data.obesity);
    console.log(obesity);    
    
    var obesityHigh = lifeData.map(data => data.obesityHigh);
    console.log(obesityHigh);      
    
    var obesityLow = lifeData.map(data => data.obesityLow);
    console.log(obesityLow);    

    var poverty = lifeData.map(data => data.poverty);
    console.log(poverty);   

    var smokes = lifeData.map(data => data.smokes);
    console.log(smokes);    
    
    var smokesHigh = lifeData.map(data => data.smokesHigh);
    console.log(smokesHigh);   
    
    var smokesLow = lifeData.map(data => data.smokesLow);
    console.log(smokesLow);    
    
    var stateCircle = lifeData.map(data => data.abbr);
    console.log(abbr);
    
    var xBandScale = d3.scaleBand()
        .domain(lifeData.map(d=>d.stateCircle)
        .range([0,width]);

    var yLinearScale1 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.age)])
        .range([height,0]);

    var yLinearScale2 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.healthcare)])
        .range([height,0]);

    var yLinearScale3 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.income)])
        .range([height,0]);

    var yLinearScale4 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.obesity)])
        .range([height,0]);

    var yLinearScale5 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.poverty)])
        .range([height,0]);
        
    var yLinearScale4 = d3.scaleLinear()
        .domain ([0,d3.max(lifeData, d=>d.smokes)])
        .range([height,0]);
    
    var bottomAxis = d3.axisBottom(xBandScale);
    var leftAxis = d2.axisLeft(yLinearScalre).ticks(10);

    chartGroup.append("g")
        .attr('transform',`translate(0,${chartHeight})`)
        .call(botomAxis);

    chartGroup.selectAll()
        .data(lifeData)
        .enter()
        .append("circle")
        .attr("class", "scattter")
        .attr("x", d=>xBandScale(d.stateCircle))
        .attr("y", d=>yLinearScale1(d.age))
        // .attr("y", d=>yLinearScale2(d.healthcare))
        // .attr("y", d=>yLinearScale3(d.income))
        // .attr("y", d=>yLinearScale4(d.obesity))
        // .attr("y", d=>yLinearScale5(d.poverty))
        // .attr("y", d=>yLinearScale6(d.smokes))
        .attr("width",xBandScale.bandwidth())
        .attr("height", d=>chartHeight-yLinearScale1(d.age));

});.catch(function(error) {
    console.log(error);
});

