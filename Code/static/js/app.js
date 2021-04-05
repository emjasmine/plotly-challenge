//Use the D3 library to read in samples.json.
 d3.json('../../../data/samples.json').then(function(data){
     var sampleData = data;
     console.log(sampleData);

     //********************************************************* */
     //Create the drop down options
    //select where the dropdown menu is
    var dropdown = d3.select("#selDataset");

    //pull the data for the drop down
    var  nameID = sampleData[0].names;
    console.log(nameID);

    //loop through and append to the dropdown
    nameID.forEach((item) => {
        //append each to the dropdown
        dropdown.append("option").text(item);
    
     //*********************************************************** */ 
     //capture change in the dropdown menu 
     dropdown.on("change", function(event){
         var selectID = dropdown.property("value");
         var selectData = sampleData[0].samples.filter(item => item.id === selectID);
         console.log(selectData);

        //create an array for the top 10
        var top10_IDs = [];
        selectData[0].otu_ids.slice(0,10).forEach(item => {
            var substring = top10.push(`"OTU ${item}`)
        });

        console.log(top10)

        var top10_sample_values = selectData[0].sample_values.slice(0,10);
        var top10_otu_label = selectData[0].otu_labels.slice(0,10);

     });
     /************************************************************* */
     //plot the bar chart
     var barData =
     [{
         type: 'bar',
         x: top10_sample_values,
         y: top10_IDs,
         orientation: 'h',
         text: top10_otu_label,
         mode: 'markers'
     }]

     var barLayout =
     { yaxis:{autorange: 'reversed'}};

     Plotly.newPlot('bar',barData, barLayout)
    });
 });


//Create the drop down options
    //where the "select" tag is, add options to this tag (the tags are called options)
    //add options value for each test subject, name is the same as the samples.ID

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.

    // Use sample_values as the values for the bar chart.


    // Use otu_ids as the labels for the bar chart.


    // Use otu_labels as the hovertext for the chart.

// Create a bubble chart that displays each sample.

    // Use otu_ids for the x values.


    // Use sample_values for the y values.


    // Use sample_values for the marker size.


    // Use otu_ids for the marker colors.


    // Use otu_labels for the text values.

// Display the sample metadata, i.e., an individual's demographic information.


// Display each key-value pair from the metadata JSON object somewhere on the page.




// Update all of the plots any time that a new sample is selected.