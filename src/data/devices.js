const devices=[{
		url: './assets/models/doors/doors.gltf',
		name: 'door0',
		id: 'door0',
		userData: {
			type: 'door',
		},

		parent: 'room01',
		position: [-19.673109127725272, 18.745729446411133, -82.35036783621433],
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	{
		url: './assets/models/doors/doors.gltf',
		name: 'door1',
		id: 'door1',
		userData: {
			type: 'door',
		},
		parent: 'room01',
		position: [-36.87310912772527, 18.745729446411133, -82.35036783621433],
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	//新加门
	{
		url: './assets/models/doors/doors.gltf',
		name: 'door2',
		id: 'door2',
		userData: {
			type: 'door',
		},
		parent: 'room01',
		position: [-40.047, 18.745728850364685, -82.31495014938137],
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	{
		url: './assets/models/doors/doors.gltf',
		name: 'door3',
		id: 'door3',
		userData: {
			type: 'door',
		},
		parent: 'room02',
		position: [-10.905742650582303, 18.745728850364685, -100.03386910417206],
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	{
		url: './assets/models/doors/doors.gltf',
		name: 'door4',
		id: 'door4',
		userData: {
			type: 'door',
		},
		parent: 'room02',
		position: [-24.20161230359496, 18.745728850364685, -100.01264143670252],
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},

	//	 道闸01
	{
		url: './assets/models/barrier/barrier.gltf',
		name: 'barrier0',
		position: [145.3529220429267, 0, -14.476022335635687],
		angles: [0, 270, 0],
		scale: [2.5, 2.5, 2.5],
		parent: '.Campus',
		userData: {
			type: '道闸',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [156.7470099896903, -0.8819750003954862, -8.015747421673629],
				position: [112.10736996402612, 23.38659852244409, -29.038492477848983],
			},
		},
	},
	//	 道闸02
	{
		url: './assets/models/barrier/barrier.gltf',
		name: 'barrier1',
		position: [-177.62892545039438, 0, -144.92535490571058],
		angles: [0, 270, 0],
		scale: [2.5, 2.5, 2.5],
		parent: '.Campus',
		userData: {
			type: '道闸',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-183.09464382291708, 5, -144.92535490571058],
				position: [-208.60476859343237, 15.567783991482903, -129.6026465093597],
			},
		},
	},

	//	 道闸01旁边摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera0',
		angles: [0, 0, 0],
		position: [150.2, 11.1, 5.9],
		parent: '.Campus',
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [144.8507908518055, 8.19955531143748, 3.7691324347664765],
				position: [170.80239440401385, 20.611749579390096, -15.236205198670103],
			},
		},
	},
	//	 道闸02旁边摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera1',
		parent: '.Campus',
		angles: [0, 180, 0],
		position: [-175.25, 20.517, -170.8],
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-174.8423840654408, 15.753634032302651, -170.4913136331064],
				position: [-183.6547842593783, 24.416864569451942, -148.97640655504603],
			},
		},
	},

	//	 大门口摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera2',
		parent: '.Campus',
		position: [30.6, 15.3, 177],
		angles: [0, -90, 0],
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [30.941700565652823, 17.488255817207893, 173.3509034157958],
				position: [49.09965057992653, 17.56162331067793, 167.7356441531519],
			},
		},
	},
	//	 新加主楼摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera3',
		parent: '.Campus',
		position: [43.775933477172174, 8.948844561458834, -54.73363876342774], 
		angles: [30, -120, 30],	
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [54.22172626396993, 4.497966766357422, -55.80104978670547],
				position: [54.33548222809875, 0.3428502496052701, -35.25816345214844],	
			},
		},
	},
	//新加行政楼摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera4',
		parent: '.Campus',
		position: [41.25799708226927, 12.029220436481808, -186.59723663330078],	
		angles: [30, -120, 20],	 
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [54.41941594452996, 2.5792440047622307, -179.34619134919532],
				position: [55.15423517648447, 0.20000076293945312, -150.7732484320671],	
			},
		},
	},
	//新加教学楼摄像头
	{
		url: './assets/models/camera/camera.gltf',
		name: 'out_camera5',
		parent: '.Campus',
		position: [37.845612301304904, 9.033071898265762, 53.88033932999453],	
		angles: [-30, 60, 0],	 
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [37.11250833477796, 10.714313918178178, 43.73363876342775],
				position: [40.40555947202605, 0.20000076293945312, 33.5592989930807], 
			},
		},
	},

	// 房间门禁
	{
		name: 'accessControl0',
		url: './assets/models/entrance/entrance.gltf',
		parent: 'room01',
		position: [-35.30005645751953, 20.32525634765625, -82.49284362792969],
		angles: [-180, 0, -180],
		scale: [0.5, 0.5, 0.5],
		userData: {
			type: '门禁',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			related: 'door1',
			defaultView: {
				target: [-35.19521558997416, 20.459239707146462, -82.60264034777322],
				position: [-24.942162204062555, 23.89663460189262, -91.47300302594479],
			},
		},
	},
	//新加门禁
	{
		name: 'accessControl1',
		url: './assets/models/entrance/entrance.gltf',
		parent: 'room01',
		position: [-41.365365764477865, 20.65623173552626, -82.49228763580322],		
		angles: [-180, 0, -180],
		scale: [0.5, 0.5, 0.5],
		userData: {
			type: '门禁',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			related: 'door2',
			defaultView: {
				target: [-41.303522477411505, 20.195227138242917, -82.49228763580322],
				position: [-40.05610158718806, 18.745728850364685, -90.02513168540845],
			},
		},
	},
	{
		name: 'accessControl2',
		url: './assets/models/entrance/entrance.gltf',
		parent: 'room02',
		position: [-12.981813648376235, 20.4676094173471, -100.04728727004098],		
		angles: [-180, 0, -180],
		scale: [0.5, 0.5, 0.5],
		userData: {
			type: '门禁',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			related: 'door3',
			defaultView: {
				target: [-12.161365762238477, 20.110936056071655, -100.03991889953613],
				position: [-11.809563064790556, 18.745728850364685, -96.624359810399],
			},
		},
	},
	{
		name: 'accessControl3',
		url: './assets/models/entrance/entrance.gltf',
		parent: 'room02',
		position: [-22.303887937891112, 20.445113227453575, -100.04728706527303],		
		angles: [-180, 0, -180],
		scale: [0.5, 0.5, 0.5],
		userData: {
			type: '门禁',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			related: 'door4',
			defaultView: {
				target: [-24.080179197463096, 18.745728850364685, -99.87507127291408],
				position: [-24.942162204062555, 23.89663460189262, -91.47300302594479],
			},
		},
	},
	//	房间摄像头
	{
		name: 'in_camera0',
		url: './assets/models/camera/camera.gltf',
		parent: 'room01',
		position: [-18.984275817871094, 21.32172393798828, -73.65314483642578],
		angles: [-180, 135, 180],
		scale: [0.5, 0.5, 0.5],
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-15.241556426644815, 17.470216105533126, -65.28319834067024],
				position: [-21.34393723889664, 23.07919372422422, -77.76421073073476],
			},
		},
	},
	//新加摄像头(更新版)
	{
		name: 'in_camera1',
		url: './assets/models/camera/camera.gltf',
		parent: 'room01',
		position: [-8.416519165039062, 21.290697919462126, -90.86001044387096], 
		angles: [-160, -45, 180],					
		scale: [0.9, 0.9, 0.9],
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-8.416519165039062, 21.290697919462126, -90.86001044387096],
				position: [-8.41219995784899, 20.99685178817565, -82.37728786468506],	
			},
		},
	},
	//新加摄像头
	{
		name: 'in_camera2',
		url: './assets/models/camera/camera.gltf',
		parent: 'room02',
		position: [-28.391517877578735, 21.342995738717512, -108.48742045116228], 
		angles: [-160, -45, 180],					
		scale: [0.8, 0.8, 0.8],
		userData: {
			type: '监控摄像头',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-28.391517877578735, 21.37197894766091, -108.85487149800299],
				position: [-23.19303281841043, 18.745729446411133, -103.18844124286315],	
			},
		},
	},
	// 房间空调1
	{
		url: './assets/models/conditioner/空调.gltf',
		name: 'cooler0',
		position: [-29.32614050166989, 20.65, -77.89239014790601],
		scale: [2, 2, 2],
		parent: 'room01',
		userData: {
			type: '空调',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-29.319850185088175, 21.534744400510828, -77.88701372699089],
				position: [-44.932431317773705, 35.56228455482494, -63.01899001309671],
			},
		},
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	//新加空调
	{
		url: './assets/models/conditioner/空调.gltf',
		name: 'cooler1',
		position: [-43.32614050166989, 20.65, -77.89239014790601],
		scale: [2, 2, 2],
		parent: 'room01',
		userData: {
			type: '空调',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-29.319850185088175, 21.534744400510828, -77.88701372699089],
				position: [-44.932431317773705, 35.56228455482494, -63.01899001309671],
			},
		},
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	{
		url: './assets/models/conditioner/空调.gltf',
		name: 'cooler2',
		position: [-17.690370810979914, 21.65, -105.13528633117676],
		scale: [2, 2, 2],
		parent: 'room02',
		userData: {
			type: '空调',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-17.690370810979914, 21.65, -105.13528633117676],
				position: [-44.932431317773705, 35.56228455482494, -63.01899001309671],
			},
		},
		complete: (e) => {
			e.object.playAnimation('关');
		},
	},
	// 房间照明01
	{
		url: './assets/models/light/light.gltf',
		name: 'light0',
		parent: 'room01',
		position: [-36, 21.65, -78],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-33.875664916963885, 22.137167541890587, -78],
				position: [-43.38666219494847, 28.594743530698494, -87.04902424887558],
			},
		},
	},
	{
		url: './assets/models/light/light.gltf',
		name: 'light1',
		parent: 'room01',
		position: [-21, 21.65, -78],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-20.882579658256827, 22.133710171244115, -78],
				position: [-26.891312408066682, 23.825618181119477, -71.21369041735926],
			},
		},
	},
	//房间照明新加
	{
		url: './assets/models/light/light.gltf',
		name: 'light2',
		parent: 'room01',
		position: [-41, 21.65, -78],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-33.875664916963885, 22.137167541890587, -78],
				position: [-43.38666219494847, 28.594743530698494, -87.04902424887558],
			},
		},
	},
	{
		url: './assets/models/light/light.gltf',
		name: 'light3',
		parent: 'room01',
		position: [-46, 21.65, -78],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-44.795966584715984, 20.695502666140754, -82.24228763580322],
				position: [-43.10179595299084, 18.745728850364685, -73.51453984082279],
			},
		},
	},
	{
		url: './assets/models/light/light.gltf',
		name: 'light4',
		parent: 'room02',
		position: [-9.509916088623527, 21.65, -105.82571336571655],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-8.934068477033964, 19.925424313140592, -109.13528633117676],
				position: [-15.6669199620439, 21.73318783690042, -100.01781368255615],
			},
		},
	},
	{
		url: './assets/models/light/light.gltf',
		name: 'light5',
		parent: 'room02',
		position: [-23.23385144354801, 21.65, -105.82571336571655],
		angles: [0, 90, 0],
		userData: {
			type: '照明',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-23.23385144354801, 21.65, -105.82571336571655],
				position: [-23.490560529653983, 21.73572862148285, -100.09509723657345],
			},
		},
	},
	{
		url: './assets/models/smartboard/model_screen_003.gltf',
		name: '课程表',
		id: '课程表',
		parent: 'room02',
		position: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
		angles: [0, 0, 0],
		userData: {
			type: '课程表',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
		//	defaultView: {
			//	target: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
			 // position: [-17.866739769525438, 18.91302056468737, -93.84728700566767],
			//},
		},
	},
	{
		url: './assets/models/chuanglian/窗帘.gltf',
		name: 'curtain0',
		parent: 'room02',
		position: [-18.381179030719785, 19.75537155427584, -109.25677299499512],
		angles: [0, 0, 0],
		userData: {
			type: 'chuanglian',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
				position: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
			},
		},
	},
	{
		url: './assets/models/fengshan/风扇.gltf',
		name: 'fan0',
		parent: 'room02',
		position: [-20.391517877578735, 22.25200957134852, -104.87882636166296],
		angles: [0, 0, 0],
		userData: {
			type: 'fengshan',
			state: false,
			alarmDesc: '无',
			alarmState: '无',
			isLocated: false,
			defaultView: {
				target: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
				position: [-17.866739769525438, 18.91302056468737, -98.84728700566767],
			},
		},
	},
];