let data_array = [];
let grupper_array = ["25-34","35-44","45-54","55-64","65-74","75-79"];
const csvURL = "sosialeMedier.csv";
let CanvasEl = document.getElementById("canvas");
let ctx = CanvasEl.getContext("2d");

fetch(csvURL)
    .then(response => response.text())  //henter ut teksten fra csv filen
    .then(csvData => {  // Vi sier at vi har en csv fil som skal gjøre denne funksjonen
        Papa.parse(csvData, {
            delimiter: ";",
            header: true,
            dynamicTyping: true,
            complete: function(results){
                console.log(results.data);
                data_array = results.data;
            },
            error:function(error){
                console.log(error);
            },
        });
    })
    console.log(data_array);
    ctx.moveTo(0,0);
    function lagCanvas(data_array){
        ctx.beginPath();
        for (let i = 0; i < data_array.length; i++) {
            ctx.lineTo(i,data_array[i]); 
            ctx.stroke();
        } 
        ctx.closePath();
    }


window.onload="lagCanvas()";
    