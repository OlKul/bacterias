anychart.onDocumentReady(function () {

    // data
    dataSet = anychart.data.set([]);
    let chart = anychart.scatter();
    // set chart type

    chart.title().text("Click on Chart to Add a Point ");

    // set data
    //chart.spline(dataSet).markers(null);
    chart.marker(dataSet).size(1);
    // disable stagger mode. Only one line for x axis labels
    chart.xAxis().staggerMode(false);

    // set container and draw chart
    chart.container("container").draw();

    // first index for new point
    indexSetter = (dataSet.mapAs().getRowsCount())+1;
});

function startStream() {

    // adjust button content
    let streamButton = document.getElementById("streamButton");
    streamButton.innerHTML = "Stop" + "\nstream";

    // set interval of data stream
    let myVar = setInterval(

        // data streaming itself
        function() {

            //append data

            dataSet.append({

                // x value
                x: Math.floor((Math.random() * 500)+ 1),

                // random value from 1 to 500
                value : Math.floor((Math.random() * 500)+ 1)
            });

            //removes first point
            //dataSet.remove(0);
            indexSetter++;
        }, 1           // interval
    );


    streamButton.onclick = function() {

        // clears interval which stops streaming
        clearInterval(myVar);
        streamButton.onclick = function () {
            startStream();
        };
        streamButton.innerHTML = "Start" + "\nstream";
    };
};