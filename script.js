let form = "line";


function line() {
    Chart.config.type = "line";
    Chart.update();
}
function Bar() {
    Chart.config.type = "bar";
    Chart.update();
}
let data_array = [];

const csvURL = "sosialeMedier.csv";
fetch(csvURL)
.then(response => response.text())
.then(csvData => {
    Papa.parse(csvData, {
    delimiter: ";",
    header: true,
    dynamicTyping: true,
    complete: function (results) {
        data_array = results.data;
        lagChart(data_array);
        console.log(data_array);
        
    },
    error: function (error) {
        console.log(error);
    },
    });
});

let CanvasEl = document.getElementById("canvas");
let CanvasEl2 = document.getElementById("canvas2");
let CanvasEl3 = document.getElementById("canvas3");
var ctx = CanvasEl.getContext("2d");
var ctx2 = CanvasEl2.getContext("2d");
var ctx3 = CanvasEl2.getContext("2d");


function lagChart(data) {
    
    const labels = data.map(d => d.År);
    const tjuefem_trettifire = data.map(d => d.tjuefem_trettifire);
    const trettifem_fortifire = data.map(d => d.trettifem_fortifire);
    const fortifem_femtifire = data.map(d => d.fortifem_femtifire);
    const femtifem_sekstifire = data.map(d => d.femtifem_sekstifire);
    const sekstifem_syttifire = data.map(d => d.sekstifem_syttifire);
    const syttifem_syttini = data.map(d => d.syttifem_syttini);

    Chart = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                label: "25-34 år",
                data: tjuefem_trettifire,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
            {
                label: "35-44 år",
                data: trettifem_fortifire,
                borderColor: "rgba(17, 46, 81,1)",
                tension: 0.1,
            },
            {
                label: "45-54 år",
                data: fortifem_femtifire,
                borderColor: "rgba(255, 112, 67, 1)",
                tension: 0.1,
            },
            {
                label: "55-64 år",
                data: femtifem_sekstifire,
                borderColor: "rgba(120, 144, 156, 1)",
                tension: 0.1,
            },
            {
                label: "65-74 år",
                data: sekstifem_syttifire,
                borderColor: "rgba(93, 40, 24, 1)",
                tension: 0.1,
            },
            {
                label: "75-79 år",
                data: syttifem_syttini,
                borderColor: "rgba(46, 120, 210, 1)",
                tension: 0.1,
            }
        ],
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
function lagChart2(data) {
    const tjuefem_trettifire = data.map(d => d.tjuefem_trettifire);
    const tjuefem_trettifireMotsatt = data.map(d => 100-d.tjuefem_trettifire);

    Chart2 = new Chart(ctx2, { 
        type: "donut",
        data: {
            labels: ["Bruker", "Bruker ikke"],
            datasets: [
                {
                label: "25-34 år",
                data: tjuefem_trettifire,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
            {
                label: "25-34 år",
                data: tjuefem_trettifireMotsatt,
                borderColor: "rgba(75, 192, 192, 1)",
                tension: 0.1,
            },
        ],
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


