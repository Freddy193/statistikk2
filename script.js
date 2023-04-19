let data_array = [];
let grupper_array = ["25-34", "35-44", "45-54", "55-64", "65-74", "75-79"];
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
            complete: function (results) {
                console.log(results.data);
                data_array = results.data;
            },
            error: function (error) {
                console.log(error);
            },
        });
    })
ctx.moveTo(0, 0);
function lagCanvas(array) {
    for (let i = 2010; i < array.length; i++) {
        ctx.lineTo(i, array[i]);

        function getMaxValue(array) {
            let maxValue = 0;
            for (let i = 0; i < array.length; i++) {
                for (const key in array[i]) {
                    if (array[i][key] > maxValue) {
                        maxValue = array[i][key];
                        console.log(maxValue);
                    }
                }
            }
            return maxValue;
        }

        function drawAxes() {
            ctx.beginPath();
            ctx.moveTo(50, 0);
            ctx.lineTo(50, CanvasEl.height - 50);
            ctx.lineTo(CanvasEl.width, CanvasEl.height - 50);
            ctx.stroke();

            for (let i = 2011, xPos = 60; i <= 2011 + data_array.length - 1; i++, xPos += 50) {
                ctx.fillText(i, xPos, CanvasEl.height - 35);
            }

            for (let i = 0, yPos = CanvasEl.height - 60; i <= 100; i += 10, yPos -= 50) {
                ctx.fillText(i, 20, yPos);
            }
        }

        function lagCanvas(array) {
            let maxValue = getMaxValue(array);
            drawAxes();

            ctx.beginPath();
            for (let i = 0; i < array.length; i++) {
                let year = 2011 + i;
                let x = 60 + i * 50;
                let y = (CanvasEl.height - 50) - (array[i][year] / maxValue) * (CanvasEl.height - 100);
                if (i === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }
        }