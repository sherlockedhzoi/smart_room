const removeBubble=(obj, cssName) => { if (obj?.[cssName]) obj.removeComponent(cssName);}
const setBubbleVisible=(obj, cssName, bol) => {if (obj?.[cssName]) obj[cssName].visible = bol;}

// Building Markers
const createBuildingMarkers=() => app.query('.Building').forEach((build) => { createBuildingMarker(build);});
function createBuildingMarkerDom(name) {
    // 步骤一：创建图文dom元素节点
    const div = document.createElement('div');
    div.className = 'build-marker';
    div.innerHTML = `
    <div style="display: flex; flex-direction: column; align-items: center; justify-content:center; cursor: pointer">
        <div
            style="background: rgba(7, 39, 74, 0.85);
            padding: 4px 15px;
            border-radius: 10px;
            color: #fff;
            font-size: 14px;
            border: 2px solid rgba(255,255,255,0.5); 
            font-weight: 500">${name}</div>
            <img src="./images/icon.png" alt="" />
    </div>`;
    return div;
}
function createBuildingMarker(build) {
	const ele = createBuildingMarkerDom(build.name);
	const targetContainer = app.container;
	targetContainer.append(ele);

	removeBubble(build); // 避免重复创建。创建之前先移除
	build.addComponent(THING.DOM.CSS3DComponent, 'build_marker');
	const css = build.build_marker;
	css.autoUpdateVisible = true;
	css.factor = 0.5;
	css.pivot = [0.5, -0.5];
	css.domElement = ele;
	css.domElement.onclick = function () {
		app.camera.flyTo({ target: build });
	};
}

// Rooms Markers
let prevRoomCssDom = null,curRoomCssDom = null;
function createRoomMarkerDom(room) {
    const div = document.createElement('div');
    div.className = 'room-marker-wrap';
    div.innerHTML = `
    <div class="room-marker">
        <div class="room-info">
            <div class="room-name">${room.name}</div>
            <div class="room-state">${room.userData.state || '--'}</div>
        </div>
            <div class="room-operate">
            <span> 一键操作设备： </span>
            <div class="operate">
                <span class="circle"></span>
            </div>
        </div>
    </div>`;
    return div;
}
function createRoomMarker(room, callback) {
    const Dom = createRoomMarkerDom(room);
    app.container.append(Dom);

    removeBubble(room, 'room_marker');
    room.addComponent(THING.DOM.CSS3DComponent, 'room_marker');
    const css = room.room_marker;
    css.factor = 0.04;
    css.pivot = [0.5, -1];
    css.visible = false;

    css.domElement = Dom;
    css.domElement.onclick = (e) => {
        callback && callback(Dom);
    };
    Dom.querySelector('.operate')?.addEventListener('click', (e) => {
        e.stopPropagation();
        switchRoomDevicesStates(Dom, room);
    });
}
function createRoomMarkers() { // NEED TEST
    roomInfo.data.forEach((item) => {
        const room = app.query(`#${item.roomId}`)[0];
        room.userData.state = item.state;
        room.userData.allDeviceOpen = item.allDeviceOpen;
        createRoomMarker(room, (cssObj) => {
            prevRoomCssDom = curRoomCssDom;
            curRoomCssDom = cssObj;
            if (prevRoomCssDom) {
                prevRoomCssDom.classList.remove('room-marker-active');
            }
            curRoomCssDom.classList.add('room-marker-active');
            // app.camera.flyTo({ target: room });
        });
    });
}

// Unmovable Object Markers
const markerUrls = {
    'barrier': './images/mar_sensor.png',
    'camera': './images/mar_camera.png',
    'cooler': './images/mar_condition.png',
    'curtain': './images/mar_sensor.png',
    'light': './images/mar_light.png',
    'lock': './images/mar_entrance.png',
    'alert': './images/mar_alarm.png',
    'locate': './images/mar_locate.png',
    'build': './images/icon.png',
    'accessControl': './images/mar_ups.png',
    'classroomTable': './images/mar_electric.png',
};
// function createDeviceMarkers() {
// 	// 1. 收集设备对象，依次创建Marker
// 	const devices = app.query('[userData/type]');
// 	devices.forEach((v) => {
// 		// 1.物体绑定点击定位事件
// 		bindSingleClick(v, 'clickToLocateObject');
// 		// 2. 物体创建顶牌
// 		createDeviceMarker(v);
// 	});
// }
const createDeviceMarkers= () => app.query('["userData/type"!="people"]').forEach(createDeviceMarker);
function createDeviceMarker(device) {
	const { name } = device;
	const marker = device.query(`${name}_marker`);
	if (marker.length) return;
	const markerUrl = markerUrls[device.userData.type];
	const image = new THING.ImageTexture(markerUrl);
	return new THING.Marker({
		name: `${name}_marker`,
		scale: [5, 5, 5],
		parent: device,
		alwaysOnTop: true,
		keepSize: true,
		localPosition: [0, device.boundingBox.size[1] + 0.8, 0], 
		style: {image},
		complete: (ev) => {
			const { object } = ev;
			addClickEvent(object, 'markerBindSingleClick'); // TODO BindSingleClick
		},
	});
}
// People Markers
const createPeopleMarkers = () => app.query('["userData/type"=="people"]').forEach(createPeopleMarker);
function createPeopleMarkerDom(name) {
	const div = document.createElement('div');
	div.className = 'person-marker';
	div.innerHTML = `
    <div style='cursor:pointer'>
        <div class="image"></div>
        <div class="name" style='margin-left:15px'>${name}</div>
    </div>`;
	return div;
}
function createPeopleMarker(obj) {
	const domElement = createPeopleMarkerDom(obj.name);
	app.container.append(domElement);

	obj.addComponent(THING.DOM.CSS3DComponent, 'person_marker');
	const css = obj.person_marker;
    css.pivot = [0.5, -1.3];
	css.domElement = domElement;

	domElement.onclick = () => locate(obj); // TODO locate
}

function createMarkers(){
    createPeopleMarkers();
    createDeviceMarkers();
    createBuildingMarkers();
    createRoomMarkers();
}


// marker change
function updateDeviceMarker(obj){
    const {isLocated, alarmState, type}=obj.userData;
    const markerType=isLocated?'locate':(alarmState=='告警'?'alert':type);
    const marker = obj.query(/_marker/)[0];
    if (!marker){
        console.warn(`Warning: want to change ${obj.name}_marker but marker not found.`);
        return;
    }
    const image = new THING.ImageTexture(markerUrls[markerType]);
    marker.style.image = image;
}