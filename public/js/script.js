let currentTime = 10;
window.addEventListener("load", function(evt) {
    let ws;

    document.getElementById("open").onclick = function(evt) {
        if (ws) {
            return false;
        }
        ws = new ReconnectingWebSocket(location.protocol.replace("http","ws") + "//" + location.host + "/ws");
        ws.onopen = function(evt) {
            console.log("OPEN");
        }

        ws.onclose = function(evt) {
            console.log("CLOSE");
            ws = null;
        }

        let nextTime;
        dataSet1 = new anychart.data.set();
        dataSet2 = new anychart.data.set();
        ws.onmessage = function(evt) {
            let a = JSON.parse(evt.data)
            // dataSet.append({
            //
            //     // x value
            //     x: Math.floor((Math.random() * 500)+ 1),
            //
            //     // random value from 1 to 500
            //     value : Math.floor((Math.random() * 500)+ 1)
            // });
            if (currentTime == a.Time){
                dataSet.append({
                    x: Number(a.X),
                    value: Number(a.Y)
                });
                //console.log("PARSE: " + a.Time + " first");
                //console.log(dataSet.getRowsCount());
                //console.log(dataSet2.getRowsCount());
                console.log(Number(a.X) + " " + Number(a.Y));
            } else {
                currentTime = a.Time;
                //dataSet = dataSet2;
                //dataSet2 = new anychart.data.set();
                dataSet.append({
                    x: Number(a.X),
                    value: Number(a.Y)
                });
                console.log(Number(a.X) + " " + Number(a.Y));
                //console.log(dataSet.getRowsCount());
                //console.log(dataSet2.getRowsCount());

            }
            //chart.draw();


            //console.log(dataSet.x);
        }

        ws.onerror = function(evt) {
            console.log("ERROR: " + evt.data);
        }
        return false;
    };


    document.getElementById("send").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        console.log("SEND: " + "Test message");
        ws.send("Test message")
        return false;
    };


    document.getElementById("close").onclick = function(evt) {
        if (!ws) {
            return false;
        }
        ws.close();
        return false;
    };
});