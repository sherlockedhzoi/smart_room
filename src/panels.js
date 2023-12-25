
function _panelUI(obj) {
	const { name, id, userData } = obj;
	let paneldom = document.createElement('div');
	paneldom.className = 'panel-wrap';
	const isCamera = userData.type === '监控摄像头';
	let videoUrl = '';
	if (isCamera) 
        videoUrl ='https://video-for-inside-online-env.thingjs.com/index.html?id=1';

	const operateOpenDevice = userData.state ? 'operate-open-device' : '';
	const circleOpenDevice = userData.state ? 'circle-open-device' : '';
    
	paneldom.innerHTML = `
    <div class="top-icon">
        <img src="https://static.3dmomoda.com/textures/22040714innijpmrnzu8hujw3ozfbdlg.png" alt=""/>
    </div>
    <div class="content">
        <div class="close" onclick="closePanel('${name}')"></div>
        <div class="info">
            <h2 class="title">基础信息</h2>
            <div class="detail">
                <div class="item">
                    <span>编号：</span>
                    <span>${id}</span>
                </div>
                <div class="item">
                    <span>名称：</span>
                    <span>${name}</span>
                </div>
                <div class="item">
                    <span>操作：</span>
                    <div id="switchDevice-${id}" class="operate info-panel ${operateOpenDevice}" onclick="switchDeviceState(this, '${id}')">
                        <span class="circle ${circleOpenDevice}"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <h2 class="title">告警状态</h2>
            <div class="detail">
                <div class="item">
                    <span>状态：</span>
                    <span>${userData.alarmState || '--'}</span>
                </div>
                <div class="item">
                    <span>详情：</span>
                    <span>${userData.alarmDesc || '--'}</span>
                </div>
            </div>
        </div>
        <div class="info video-info video-info-${id}" style="height: ${isCamera && userData.state ? '170px' : '0px'}">
            <h2 class="title">监控视频</h2>
            <div class="detail">
                <iframe class="video-iframe" src="${videoUrl}" marginwidth="0" frameborder="0">监控摄像头</iframe>
            </div>
        </div>
    </div>`;
	return paneldom;
}
function createPanel(device) {
	const paneldom = _panelUI(device);
	app.container.append(paneldom);

	panelMap.push(device);

	removeBubble(device, 'css_panel');
	device.addComponent(THING.DOM.CSS2DComponent, 'css_panel');
	const css = device.css_panel;
	css.factor = 0.03;
	css.pivot = [-0.5, 0.5];
	css.domElement = paneldom;
}
function _panelUI_ff(obj) {
    const { name, id, userData } = obj;
	let paneldom = document.createElement('div');
	paneldom.className = 'panel-wrap-tt';
	const isCamera = userData.type === '监控摄像头';
	let videoUrl = '';
	if (isCamera) videoUrl = 'https://video-for-inside-online-env.thingjs.com/index.html?id=1';

	const operateOpenDevice = userData.state ? 'operate-open-device' : '';
	const circleOpenDevice = userData.state ? 'circle-open-device' : '';
    
	paneldom.innerHTML = `
    <div class="content">
        <div class="info">
            <h2 class="title">基础信息</h2>
                <div class="detail">
                    <div class="item">
                        <span>编号：</span>
                        <span>${id}</span>
                    </div>
                <div class="item">
                    <span>名称：</span>
                    <span>${name}</span>
                </div>
                <div class="item">
                    <span>操作：</span>
                    <div id="switchDevice-${id}" class="operate info-panel ${operateOpenDevice}" onclick="switchDeviceState(this, '${id}')">
                        <span class="circle ${circleOpenDevice}"></span>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <h2 class="title">告警状态</h2>
            <div class="detail">
                <div class="item">
                    <span>状态：</span>
                    <span>${userData.alarmState || '--'}</span>
                </div>
                <div class="item">
                    <span>详情：</span>
                    <span>${userData.alarmDesc || '--'}</span>
                </div>
            </div>
        </div>
            <div class="info video-info video-info-${id}" style="height: ${isCamera && userData.state ? '170px' : '0px'}">
                <h2 class="title">监控视频</h2>
                <div class="detail">
                    <iframe class="video-iframe" src="${videoUrl}" marginwidth="0" frameborder="0">监控摄像头</iframe>
                </div>
            </div>
        </div>
        `;
        return paneldom;
}
function createPanel_dom(device) { // TODO rename
	const paneldom = _panelUI_ff(device);
	app.container.append(paneldom);

	panelMap.push(device);
    
	removeBubble(device, 'css_panel');
	device.addComponent(THING.DOM.CSS2DComponent, 'css_panel');
    
	const css = device.css_panel;
	css.factor = 0.03;
	css.pivot = [-0.5, 0.5];
	css.domElement = paneldom;
}
function _classTableUI(courseData) {
    const { WeekDay: day, ClassTime: time, CourseName: courseName, ClassroomID: room } = courseData;
	let paneldom = document.createElement('div');
	paneldom.className = 'panel-wrap-full-screen';
    
	let tableHtml = `
    <table class="course-table">
    <tr>
    <th>时间/日期</th>
    <th>周一</th><th>周二</th><th>周三</th><th>周四</th><th>周五</th><th>周六</th><th>周日</th>
    </tr>`;
    const timeSlots = ['08:00-08:45', '08:50-09:35', '09:50-10:35', '10:40-11:25', '11:30-12:15', '13:00-14:35', '14:45-15:30', '15:40-16:25', '16:35-17:20', '17:25-18:10'];
    const weekDays = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    
    // 函数用于检查课程是否在指定的时间段内
    function isInTimeSlot(course, timeSlotIndex) {
        return course.Startime <= timeSlotIndex && course.Endtime >= timeSlotIndex;
    }
    
    timeSlots.forEach((timeSlot, timeSlotIndex) => {
        tableHtml += `<tr><td>${timeSlot}</td>`;
        for (let i = 0; i < weekDays.length; i++) {
            let dayCourses = courseData.filter(course => course.WeekDay === weekDays[i] && isInTimeSlot(course, timeSlotIndex + 1));
            tableHtml += `<td>${dayCourses.map(course => `<p>${course.CourseName}<br/>教室：${course.ClassroomID}<br/>老师：${course.Teacher}</p>`).join('')}</td>`;
        }
        tableHtml += `</tr>`;
    });
	tableHtml += `</table>`;
    
	paneldom.innerHTML = `
    <div class="top-icon">
        <!-- 可以根据需要添加顶部图标 -->
        <img src="./assets/models/smartboard/top.bmp" alt="" style="cursor: pointer;"/>
    </div>
    <div class="content">
        ${tableHtml}
    </div>
    <div class="button-group">
        <img src="./assets/models/smartboard/cha.png" alt="关闭" onclick="removePanel(this.parentElement.parentElement)" style="cursor: pointer;"/>
    </div>`;
    return paneldom;
}


function createClassTable(object, courseData) {
    // 首先从服务器获取课程表数据，然后将数据传入面板的HTML结构中
    fetch('http://124.221.115.182/infoquery.php')
        .then(response => response.json())
        .then(weeklyCourses => {
        console.log(data); // 打印数据检查
            const paneldom = _classTableUI(weeklyCourses);
            app.container.append(paneldom);
            panelMap.push(object);
            removeBubble(paneldom, 'css_panel');
            object.addComponent(THING.DOM.CSS1DComponent, 'css_panel');
            const css = object.css_panel;
            css.factor = -0.03;
            css.pivot = [-0.5, 0.5];
            css.domElement = paneldom;
        })
        .catch(error => console.error('Error:', error));
}
// function showCourseSchedule(time) {
//     const panels = document.querySelectorAll('.panel-wrap.full-screen');
//     panels.forEach(panel => {panel.classList.remove('active');});
//     const activePanel = document.querySelector(`.panel-wrap.full-screen.${time}`);
//     activePanel.classList.add('active');
// }
function switchDeviceState(dom, objectId) { // NEED TEST
	// 1. 更新设备userData挂载的数据
	
	const targetObject = app.query(`#${objectId}`)[0];
	const state = targetObject.userData.state;
	targetObject.userData.state = !state;

	// 2. 更新设备信息面板样式
	changeSwitch(dom, targetObject.userData.state);

	// 3. 获取控制对象：如果是门禁设备，则获取与门禁关联的门
	const entranceGetdDoorId = targetObject.userData.related;
	const object = entranceGetdDoorId ? app.query(entranceGetdDoorId)[0] : targetObject;

	// 4. 获取动画名称，此场景当中不同设备的开关动画名称不同。如果是门禁设备，则调用门的动画。
	const animateName = targetObject.userData.state ? '开' : '关';

	// 5. 调用设备开/关动画
	object?.playAnimation(animateName);

	// 6. 摄像头优化：在开启的状态下显示监控画面，关闭时隐藏监控画面。
	const isCamera = targetObject.userData.type === '监控摄像头';
	isCamera && showVideoPage(targetObject);

	// 7.上传完毕后，将数据发送给服务器
	const newState = targetObject.userData.state;

	// 发送状态更新到后端
	fetch('http://124.221.115.182/updateDevice.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ id: objectId, state: newState })
	})
	.then(response => response.json())
	.then(data => console.log('State updated successfully'))
	.catch(error => console.error('Error:', error));
}
function showVideoPage(camera) {
	const videoDom = `.video-info-${camera.id}`;
	const cameraInfo = document.querySelector(videoDom);
	cameraInfo.style.height = camera.userData.state ? '170px' : '0px';
}
function switchDeviceState_own(dom, objectId, newState) {
	// 以新的状态（newState）更新设备
	// ... 其余的代码 ...
	// 1. 更新设备userData挂载的数据
	const targetObject = app.query(`#${objectId}`)[0];
	const state = targetObject.userData.state;
	 // 将targetObject的当前状态转换为数字形式（false或'0' -> 0, 其他 -> 1）
	 const numericCurrentState = targetObject.userData.state === false || targetObject.userData.state === '0' || targetObject.userData.state === 0 ? 0 : 1;
	 // 将newState转换为数字形式（false或'0' -> 0, 其他 -> 1）
	 const numericNewState = newState === false || newState === '0' || newState === 0 ? 0 : 1;
	// console.log(`State changed for device ${objectId}: ${numericCurrentState} -> ${numericNewState}`);
	 // 如果状态没有变化，则结束函数
	 if (numericCurrentState === numericNewState) {
		//  console.log(`No state change for device ${objectId}: ${numericCurrentState}`);
		 return;
	 }
	targetObject.userData.state = newState;
	// 2. 更新设备信息面板样式
	changeSwitch(dom, numericNewState);
	// 3. 获取控制对象：如果是门禁设备，则获取与门禁关联的门
	const entranceGetdDoorId = targetObject.userData.related;
	const object = entranceGetdDoorId
		? app.query(entranceGetdDoorId)[0]
		: targetObject;
	// 4. 获取动画名称，此场景当中不同设备的开关动画名称不同。如果是门禁设备，则调用门的动画。
	const animateName = numericNewState === 1 ? '开' : '关';

	// 5. 调用设备开/关动画
	object?.playAnimation(animateName);

	// 6. 摄像头优化：在开启的状态下显示监控画面，关闭时隐藏监控画面。
	const isCamera = targetObject.userData.type === '监控摄像头';
	isCamera && showVideoPage(targetObject);
}
function updateDeviceStateFromServer(deviceId) {
	fetch(`http://124.221.115.182/getState.php`)
		.then(response => response.json())
		.then(dataArray => {
			// 在数组中找到与deviceId匹配的元素
			const deviceData = dataArray.find(device => device.id === String(deviceId));
			// console.log(deviceData);

			if (deviceData && deviceData.state !== undefined) {
				// 找到对应的设备对象
				const domElement = document.getElementById(`switchDevice-${deviceId}`);
				// console.log(domElement);
				if (domElement) {
					switchDeviceState_own(domElement, deviceId, deviceData.state);
						} else {
							// 若没有对应的dom节点，就去创建
							const device = app.query(`#${deviceId}`)[0];
							console.log( "我要创建啦");
							if (device) {
								createPanel_dom(device);
							} else {
								// console.error(`Device object not found for ID: ${deviceId}`);
							}
							// console.error(`Device object not found for ID: ${deviceId}`);
						}
			} else {
				// console.error(`No data found for device ID: ${deviceId}`);
			}
		})
		.catch(error => console.error(`Error fetching state for device ${deviceId}:`, error));
}
// 轮询获取数据，更新设备状态
function pollAllDevices() {
	let deviceId = 1;
	setInterval(() => {
		updateDeviceStateFromServer(deviceId);
		deviceId = (deviceId % 35) + 1; // 循环设备ID从1到35
	}, 1000 / 35); // 每隔约142毫秒更新一个设备的状态
}
// 调用函数以启动轮询
pollAllDevices(); 

let panelMap=[];
function changeSwitch(dom, bol) {
	const circleDom = dom.querySelector('.circle');
	if (bol) {
		dom.classList.add('operate-open-device');
		circleDom.classList.add('circle-open-device');
	} else {
		dom.classList.remove('operate-open-device');
		circleDom.classList.remove('circle-open-device');
	}
}
function updatePanel(device, bol) {
	const panelDom = device.css_panel?.domElement;
	if (!panelDom) return;
	// 更新操作按钮状态
	const switchButton = panelDom.querySelector(`#switchDevice-${device.id}`);
	changeSwitch(switchButton, bol);
	// 如果是摄像头，根据开启状态显隐监控画面
	device.userData.type === '监控摄像头' && showVideoPage(device);
}
const removePanel=(panel) => {if (panel) panel.remove();}
function closePanel(name) {
    const object = app.query(name)[0];
    
	object.userData.isLocated = false;
	updateDeviceMarker(object);
    
	destroyPanels();
}
function destroyPanels() {
	panelMap.forEach((ele) => {removeBubble(ele, 'css_panel');});
	panelMap = [];
}
