// @TODO: YOUR CODE HERE!
var svgWidth = 1000;
var svgHeight = 700;

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
    
    var abbr = lifeData.map(data => data.abbr);
    console.log(abbr);
    
    
    
    

});