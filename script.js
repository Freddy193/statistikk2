let data_array = [];
let grupper_array = ["25-34", "35-44", "45-54", "55-64", "65-74", "75-79"];
const csvURL = "sosialeMedier.csv";
let canvasEl = document.getElementById("canvas");

fetch(csvURL)
    .then(response => response.text())
    .then(csvData => {
        Papa.parse(csvData, {
            delimiter: ";",
            header: true,
            dynamicTyping: true,
            complete: function (results) {
                console.log(results.data);
                data_array = results.data;
                lagGraf(data_array);
            },
            error: function (error) {
                console.log(error);
            },
        });
    });

function lagGraf(data) {
    let labels = [];
    let dataset = [];


    for (let i = 0; i < data.length; i++) {
        const year = 2011 + i;
        labels.push(year);
        dataset.push(data[0][year]);
    }

    let ctx = canvasEl.getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Sosiale medier bruk",
                data: dataset,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}