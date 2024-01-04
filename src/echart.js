// import * as echarts from './thingjs/echarts.min.js'
document.getElementById("echart").addEventListener("click", function () {
    var chartContainer = document.getElementById("echartbox");
    if (chartContainer.style.display === "none") {
        chartContainer.style.display = "block";
        chartContainer.classList.add('active-echart');
    } else {
        chartContainer.style.display = "none";
        chartContainer.classList.remove('active-echart');
    }
});
document.getElementById("update").addEventListener("click", showEchart)

let echartOptions = {
    tooltip: {
        trigger: "axis",
        axisPointer: {
            type: "shadow",
        },
    },
    legend: {
        data: ["室内", "室外"],
    },
    xAxis: {
        type: "category",
        data: ["温度", "湿度", "CO2", "PM2.5"],
    },
    yAxis: {
        type: "value",
    },
    series: [
        {
            name: "室内",
            type: "bar",
            data: [],
        },
        {
            name: "室外",
            type: "bar",
            data: [],
        },
    ],
};
function showEchart() {
    if(flag>0) return;
    flag=6;
    for (var i = 0; i < 2; i++) {
        const nownum=i;
        echartOptions.series[nownum].data = [0,0,0,0];
        for (var j = 0; j < 4; j++) {
            const prefix = prefixs[j],nowj=j;
            fetch(hardware_url + `?name=${prefix}${nownum}`)
                .then((res) => res.json())
                .then((data) => {
                    echartOptions.series[nownum].data[nowj]=Number(data.data);
                    flag--;
                });
        }
    }
}
const prefixs = ["temperature", "humidity", "CO2", "PM25"];
let flag = 0;
const initEcharts = () => {
    console.log(prefixs);
    setInterval(() => {
        let bottomCharts = echarts.init(document.getElementById("echartbox"));
        bottomCharts.setOption(echartOptions);
    }, interval);
}