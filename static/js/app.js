console.log("This is app.js");

//Draw BarGraph

function DrawBarGraph(sampleId)
{
    console.log(`DrawBarGraph(${sampleId})`);

}

//Draw BarBubbleChart

function DrawBubbleChart(sampleId)
{
    console.log(`DrawBubbleChart(${sampleId})`);
    
}

//Draw ShowMetaData

function ShowMetaData(sampleId)
{
    console.log(`ShowMetaData(${sampleId})`);

    
}

function InitDashboard()
{
    console.log("InitDashboard");

    // Get a handle to the dropdwon
    let selector = d3.select("#selDataset");

    let url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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
