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
    nameID.forEach((item) => 
    {
        //append each to the dropdown
        dropdown.append("option").text(item);
    });

    /************************************************************ */
    // Default view when page loads - Subject ID 940
    /*************************************************************/

    // Pull data for subject 940
    var starterID = sampleData[0].samples.filter(item => item.id === "940");

    // Top 10 sample values for subject 940
    var sampleValues = starterID[0].sample_values.slice(0,10);

    // First 10 otu IDs for subject 940
    var otuID = starterID[0].otu_ids.slice(0,10);

    // Initialize new array for string version of otuID
    var otuID_10 = [];

    // Loop through otuID and push to "OTU (otu_id)"
    otuID.forEach(item => 
    {
        var substring = otuID_10.push(`OTU ${item}`);
    })
    
    // First 10 otu labels for subject 940
    var otuLabels = starterID[0].otu_labels.slice(0,10);

    //Graphs for subject 940
    // Data for bar chart
    var data = [{
        x: sampleValues,
        y: otuID_10,
        mode:'markers',
        text:otuLabels,
        type: 'bar',
        orientation: 'h'
    }];

    // Layout for bar chart
    var layout = {
        xaxis:{title:'Sample Values'},
        yaxis:{title:'OTU ID Number',autorange:'reversed'}
    };

    // Plot bar chart
    Plotly.newPlot('bar', data, layout);

    // Extract all sample values
    var sampleValues = starterID[0].sample_values;

    // Extract all otu ids
    var otuID = starterID[0].otu_ids;

    // Extract all otu labels
    var otuLabels = starterID[0].otu_labels;

    // Data for bubble chart
    var data = [{
        x: otuID,
        y: sampleValues,
        mode: 'markers',
        marker: {
          size: sampleValues,
          color: otuID,
          colorscale: [[0, 'rgb(204, 15, 170)'], [1, 'rgb(204, 240, 170)']]
        },
        text:otuLabels
      }];
      
    // Layout for bubble chart
    var layout = {
        showlegend: false,
        height: 600,
        width: 1200,
        xaxis:{title:'OTU ID'}
      };

    // Plot bubble chart 
    Plotly.newPlot('bubble', data, layout);

    // Get metadata for individual person
    var starterMeta = sampleData[0].metadata.filter(item => item.id === 940);

    // Grab reference to div for demographic info box
    var metaTable = d3.select("#sample-metadata")

     // Append paragraph tags to the demographic info box
     metaTable.append('p').text(`id: ${starterMeta[0].id}`);
     metaTable.append('p').text(`ethnicity: ${starterMeta[0].ethnicity}`);
     metaTable.append('p').text(`gender: ${starterMeta[0].gender}`);
     metaTable.append('p').text(`age: ${starterMeta[0].age}`);
     metaTable.append('p').text(`location: ${starterMeta[0].location}`);
     metaTable.append('p').text(`bbtype: ${starterMeta[0].bbtype}`);
     metaTable.append('p').text(`wfreq: ${starterMeta[0].wfreq}`);

    
     /*********************************************************** */ 
     //capture change in the dropdown menu 
     dropdown.on("change", function(event){
         var selectID = dropdown.property("value");
         var selectData = sampleData[0].samples.filter(item => item.id === selectID);
         console.log(selectData);

        //create an array for the top 10
        var top10_IDs = [];
        selectData[0].otu_ids.slice(0,10).forEach(item => {
            var substring = top10_IDs.push(`OTU ${item}`)
        });

        console.log(top10_IDs)

        var top10_sample_values = selectData[0].sample_values.slice(0,10);
        var top10_otu_label = selectData[0].otu_labels.slice(0,10);
        console.log(top10_sample_values)
     
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
     /*************************************************************** */
     //plot the bubble chart
     var otuID = selectData[0].otu_ids;
     console.log(otuID);

     var bubbleData = 
        [{
            x: otuID,
            y: top10_sample_values,
            mode: 'markers',
            text: top10_otu_label,
            marker: 
            {
              size: top10_sample_values,
              color: otuID,
              colorscale: [[0, 'rgb(204, 15, 170)'], [1, 'rgb(204, 240, 170)']]
            }
        }];
          
        var bubbleLayout = 
          {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: {title: 'OTU ID'},
            opacity: 0.6
          };
          
        Plotly.newPlot('bubble',bubbleData, bubbleLayout);
    /************************************************************************* */

    //pull just the meta Data from the full data set (sampleData)
    var metaData = sampleData[0].metadata.filter(item => item.id === parseInt(selectID));
    console.log(metaData)
    //select the demographic box
    var metaTable = d3.select("#sample-metadata");
     // clear the table 
    metaTable.text("");

    // Append paragraph tags to the demographic info box
    metaTable.append('p').text(`id: ${metaData[0].id}`);
    metaTable.append('p').text(`ethnicity: ${metaData[0].ethnicity}`);
    metaTable.append('p').text(`gender: ${metaData[0].gender}`);
    metaTable.append('p').text(`age: ${metaData[0].age}`);
    metaTable.append('p').text(`location: ${metaData[0].location}`);
    metaTable.append('p').text(`bbtype: ${metaData[0].bbtype}`);
    metaTable.append('p').text(`wfreq: ${metaData[0].wfreq}`);
    /************************************************************** */
    //Bonus: select the gauge id
    var gaugeID = d3.select("#gauge")

    //pull the wash frequency data from the metadata set
    var wash_freq = metaData[0].wfreq;
    console.log (wash_freq);

    var gaugeData = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wash_freq,
            title: { text: "Belly Button Washing Frequency (Scrubs per Week)" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: { range: [null, 9] },
              steps: 
              [
                {range: [0, 1], color: "rgba(255, 255, 207, 1)"},
                {range: [1,2], color: "rgba(255, 236, 207, 1)"},
                {range: [2,3], color: "rgba(255, 209, 207, 1)"},
                {range: [3,4], color: "rgba(255, 209, 134, 1)"},
                {range: [4,5], color: "rgba(255, 172, 134, 1)"},
                {range: [5,6], color: "rgba(255, 137, 134, 1)"},
                {range: [6,7], color: "rgba(255, 95, 81, 1)"},
                {range: [7,8], color: "rgba(255, 51, 57, 1)"},
                {range: [8,9], color: "rgba(171, 51, 0, 1)"}
              ]
            }
        }];
      
      var gaugeLayout = 
      { 
          width: 600, height: 450, margin: { t: 0, b: 0 } 
        };

      Plotly.newPlot('#gauge', gaugeData, gaugeLayout);
    });
    



 });
