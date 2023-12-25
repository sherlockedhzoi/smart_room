function alarmEvent(isAlarm) {
	const result = isAlarm ? alarmData.data : deviceData.data;
	processAlarmData(result);

	// 接收websocket发送来的设备数据↓
	// const info = JSON.stringify({ type: isAlarm });
	// ws.send(info);
	// ws.onmessage = (msg) => {
	//	 const serverData = JSON.parse(msg.data);
	//	 processAlarmData(serverData.data);
	// };
}
function processAlarmData(data) {
	data.forEach((item) => {
		const { id, alarmState } = item;
		const object = app.query(`#${id}`)[0];
		if (!object) console.error(`没有找到id为${id}的对象`);

		changeDeviceAlarm(object, item);
        updateDeviceMarker(object);

		if (object.userData.type === '道闸') {
			showVideoNearEntrance(object, alarmState);
		}
	});
}
function showVideoNearEntrance(object, type) {
	const nearObject = getNearDevice(object);
	nearObject.forEach((o) => {
		type === '告警' ? createPanel(o) : removeBubble(o, 'css_panel');
	});
}
function getNearDevice(sourceObj, distance = 25) {
	const objects = app.query('[userData/type]');
	return objects.filter((item) => {
		const itemType = item.userData?.type === '监控摄像头';
		return itemType && item.distanceTo(sourceObj) <= distance;
	});
}
function changeDeviceAlarm(object, newData) {
	const { alarmDesc, alarmState, state } = newData;
	// 更新userData下挂载的数据
	object.userData.alarmDesc = alarmDesc;
	object.userData.alarmState = alarmState;
	object.userData.state = state;
	// 更新面板
	updatePanel(object, state);
}