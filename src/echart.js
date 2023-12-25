let flag = 0;
document.getElementById("echart").addEventListener('click', function () {
	if (flag === 0) {
		showEchart()
		flag = 1;
	} else {
		showEchart()
		var chartContainer = document.getElementById('echartbox');
		if (chartContainer.style.display === 'none') {
			chartContainer.style.display = 'block';
		} else {
			chartContainer.style.display = 'none';
		}
	}
})
function showEchart() {
	let bottomCharts = window.echarts.init(document.querySelector('#echartbox'))
	//配置图表的属性 图表的各项属性 options 代表的含义可以在 Echarts 官网中查询
	let echartOptions = {
		title: {
			text: '设备分布',
			subtext: '数据',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [
			{
				name: 'Access From',
				type: 'pie',
				radius: '50%',
				data: [],
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)'
					}
				}
			}
		]
	};
	const obj = {}
	people.forEach((item) => {
		if (!obj[item.userData.type]) {
			obj[item.userData.type] = []
		}
		obj[item.userData.type].push(item)

	});
	app.query(/door/).forEach((item) => {
		if (item.id !== '') {
			if (!obj[item.userData.type]) {
				obj[item.userData.type] = []
			}
			console.info(item);
			obj[item.userData.type].push(item)
		}

	});
	app.query(/道闸/).forEach((item) => {
		if (item.id !== '') {
			if (!obj[item.userData.type]) {
				obj[item.userData.type] = []
			}
			console.info(item);
			obj[item.userData.type].push(item)
		}
	});

	app.query(/监控/).forEach((item) => {
		if (item.id !== '') {
			if (!obj[item.userData.type]) {
				obj[item.userData.type] = []
			}
			console.info(item);
			obj[item.userData.type].push(item)
		}
	});
	app.query(/门禁/).forEach((item) => {
		if (item.id !== '') {
			if (!obj[item.userData.type]) {
				obj[item.userData.type] = []
			}
			console.info(item);
			obj[item.userData.type].push(item)
		}
	});
	app.query(/照明/).forEach((item) => {
		if (item.id !== '') {
			if (!obj[item.userData.type]) {
				obj[item.userData.type] = []
			}
			console.info(item);
			obj[item.userData.type].push(item)
		}
	});
	// const _data = []
	Object.keys(obj).forEach(item => {
		echartOptions.series[0].data.push({
			name: item,
			value: obj[item].length
		})
	})
	//调用setOptions 方法将配置好的 options 传入图表
	bottomCharts.setOption(echartOptions);

}