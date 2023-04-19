let data_array = [];
let grupper_array = ["25-34","35-44","45-54","55-64","65-74","75-79"];
const csvURL = "sosialeMedier.csv";
let CanvasEl = document.getElementById("canvas");
let ctx = CanvasEl.getContext("2d");

fetch(csvURL)
    .then(response => response.text())
    .then(csvData => {
        Papa.parse(csvData, {
            delimiter: ";",
            header: true,
            dynamicTyping: true,
            complete: function(results){
                console.log(results.data);
                data_array = results.data;
                lagCanvas(data_array);
            },
            error:function(error){
                console.log(error);
            },
        });
    })
    ctx.moveTo(0,0);
    function lagCanvas(array){
        for (let i = 2010; i < array.length; i++) {
            ctx.lineTo(i,array[i]); 
            ctx.stroke();
        } 
    }