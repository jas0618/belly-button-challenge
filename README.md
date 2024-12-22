# belly-button-challenge

# MetaData and Deployment 
- is to build the consule
- using the metadata function to get the given sample and values

# Bar Charts and Bubble Charts
buildCharts(sample)

Fetches the data for the selected sample and creates:
A Bar Chart showing the top 10 OTUs.
A Bubble Chart displaying all OTUs with marker size and color based on the data.
Uses Plotly.js for rendering the charts with custom layouts and interactivity.
init()

Initializes the dashboard by:
Populating the dropdown menu with sample names.
Loading the bar and bubble charts for the first sample.
optionChanged(newSample)

Updates the charts and metadata when the user selects a new sample from the dropdown.
Error Handling

Catches and logs errors during data fetching or chart creation to ensure debugging is straightforward.
