// Build the metadata panel
// URL for the data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
 
// Function to format numbers with commas
const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
 
// Function to build the metadata panel
function buildMetadata(sample) {
    d3.json(url).then((data) => {
        let metadata = data.metadata;
        let result = metadata.find(sampleObj => sampleObj.id == sample);
        let PANEL = d3.select("#sample-metadata");
 
        // Clear existing metadata
        PANEL.html("");
 
        // Add each key-value pair with formatted values
        Object.entries(result).forEach(([key, value]) => {
            if (typeof value === 'number') {
                value = numberWithCommas(value);
            }
            PANEL.append("p").html(`<strong>${key.toUpperCase()}:</strong> ${value}`);
        });
    }).catch(error => {
        console.error("Error fetching metadata:", error);
    });
}
 
// Function to build the charts
function buildCharts(sample) {
    d3.json(url).then((data) => {
        let result = data.samples.find(sampleObj => sampleObj.id == sample);
        let metadata = data.metadata.find(sampleObj => sampleObj.id == sample);
 
        // Extract the required arrays
        let { otu_ids, otu_labels, sample_values } = result;
 
        // Create Bar Chart
        let barTrace = {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(id => `OTU ${id}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            marker: {
                color: 'rgb(55, 83, 109)'
            }
        };
 
        let barLayout = {
            title: {
                text: "Top 10 Bacterial Species Found",
                font: { size: 24 }
            },
            xaxis: { title: "Sample Values" },
            yaxis: { title: "OTU ID" },
            height: 500,
            margin: { t: 40, l: 100, r: 20, b: 40 }
        };
 
        Plotly.newPlot("bar", [barTrace], barLayout);
 
        // Create Bubble Chart
        let bubbleTrace = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth",
                showscale: true,
                sizeref: 2 * Math.max(...sample_values) / (100**2),
                sizemode: 'area'
            }
        };
 
        let bubbleLayout = {
            title: {
                text: "Bacteria Cultures Per Sample",
                font: { size: 24 }
            },
            xaxis: { 
                title: "OTU ID",
                tickangle: -45
            },
            yaxis: { 
                title: "Sample Values",
                tickformat: ','
            },
            height: 600,
            showlegend: false,
            hovermode: "closest",
            margin: { t: 40, l: 100, r: 20, b: 60 }
        };
 
        Plotly.newPlot("bubble", [bubbleTrace], bubbleLayout);
 
    }).catch(error => {
        console.error("Error fetching chart data:", error);
    });
}
 
// Initialize the dashboard
function init() {
    // Set up the dropdown menu
    let selector = d3.select("#selDataset");
 
    d3.json(url).then((data) => {
        let sampleNames = data.names;
 
        sampleNames.forEach(sample => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
 
        // Use the first sample to build initial plots
        buildCharts(sampleNames[0]);
        buildMetadata(sampleNames[0]);
    }).catch(error => {
        console.error("Error initializing dashboard:", error);
    });
}
 
// Handle change events
function optionChanged(newSample) {
    buildCharts(newSample);
    buildMetadata(newSample);
}
 
// Initialize the dashboard
init();