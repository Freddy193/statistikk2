let data_array = [];
let grupper_array = ["25-34","35-44","45-54","55-64","65-74","75-79"];
const csvURL = "sosialeMedier.csv";
let canvasEl = document.getElementById("canvas");
let ctx = canvasEl.getContext("2d");

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

function lagCanvas(array){
  // Finn høyeste verdi i data_array
  let maxVerdi = 0;
  for (let i = 0; i < array.length; i++) {
    let verdi = array[i]["Antall brukere"];
    if (verdi > maxVerdi) {
      maxVerdi = verdi;
    }
  }

  // Tegn x-aksen
  ctx.beginPath();
  ctx.moveTo(50, canvasEl.height - 50);
  ctx.lineTo(canvasEl.width - 50, canvasEl.height - 50);
  ctx.stroke();

  // Tegn y-aksen
  ctx.beginPath();
  ctx.moveTo(50, canvasEl.height - 50);
  ctx.lineTo(50, 50);
  ctx.stroke();

  // Tegn høyeste verdi på y-aksen
  ctx.font = "16px Arial";
  ctx.fillText(maxVerdi, 10, 60);

  // Tegn årene og grafen
  ctx.beginPath();
  for (let i = 0; i < array.length; i++) {
    let verdi = array[i]["Antall brukere"];
    let x = 50 + (i / (array.length - 1)) * (canvasEl.width - 100);
    let y = canvasEl.height - 50 - (verdi / maxVerdi) * (canvasEl.height - 100);
    ctx.lineTo(x, y);
    ctx.fillText(array[i]["År"], x, canvasEl.height - 20);
  }
  ctx.stroke();
}
