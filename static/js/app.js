console.log("This is app.js");

//Define a global varibale to hold Url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Draw BarGraph

function DrawBarGraph(sampleId)
{
    console.log(`DrawBarGraph(${sampleId})`);

    d3.json(url).then(data => {
        console.log(data);

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

        let yticks = otu_ids.slice(0,10).map(otuId =>  `OTU ${otuId}`).reverse();
        //console.log(`yticks = ${}`)

        // Create a trace object
        let barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: 'bar',
            text: otu_labels.slice(0,10).reverse(),
            orientation: 'h'

        };
        // Put the trace object into array
        let barArray = [barData];

        let barLayout = {
            title: "Top 10 Bacteria Cultures Found"
        }

        //Call the plotly function
        Plotly.newPlot("bar", barArray, barLayout);
        
        


    })

}

//Draw BarBubbleChart

function DrawBubbleChart(sampleId)
{
    console.log(`DrawBubbleChart(${sampleId})`);

    d3.json(url).then(data => {

        let samples = data.samples;
        let resultArray = samples.filter(s => s.id == sampleId);
        let result = resultArray[0];

        let otu_ids = result.otu_ids;
        let otu_labels = result.otu_labels;
        let sample_values = result.sample_values;

           // Create a trace object
           let bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: 'markers',
            text: otu_labels,
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }

        };
        // Put the trace object into array
        let bubbleArray = [bubbleData];

        let bubbleLayout = {
            title: "Bacteria Cultures Per Sample",
            margin: {t: 30},
            hovermode: "closest",
            xaxis: {title: "OTU_ID"}

        }

        //Call the plotly function
        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);


    });
 
}

// ShowMetaData Demographic Info

function ShowMetaData(sampleId)
{
    console.log(`ShowMetaData(${sampleId})`);

    d3.json(url).then(data => {
        let metadata = data.metadata;
        //let sampleNames = data.names;
        let demoPanel = d3.select("#sample-metadata").html("");

        let resultArray = metadata.filter(s => s.id == sampleId);
        let result = resultArray[0];

        Object.entries(result).forEach(([key, value]) => {
            demoPanel.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });

    });

    
}

function optionChanged(sampleId)
{
    console.log(`optionchanged: (${sampleId})`);

    DrawBarGraph(sampleId);
    DrawBubbleChart(sampleId);
    ShowMetaData(sampleId);



}


function InitDashboard()
{
    console.log("InitDashboard");

    // Get a handle to the dropdwon
    let selector = d3.select("#selDataset");



    d3.json(url).then(data => {
        console.log("Data:", data);

        let sampleNames = data.names;

        console.log(sampleNames);

        // Populating the dropdown

        for(let i=0; i<sampleNames.length; i++){
            let sampleId = sampleNames[i];
            console.log(sampleId);

            selector.append("option").text(sampleId).property("value",sampleId);

        }

        // Read the current value from dropdown

        let InitialId = selector.property("value");

        DrawBarGraph(InitialId);
        DrawBubbleChart(InitialId);
        ShowMetaData(InitialId);

    });



}

InitDashboard();
