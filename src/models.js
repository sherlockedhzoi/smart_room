function createModel(item){
    const { id, name, url, parent, position, scale, angles, userData, complete} = item;
	return new THING.Entity({
		id, name, parent, url, position, angles, userData,
		scale: userData.type==='people'?[5, 5, 5]:scale, // TODO getScale
		complete: complete?complete: () => {console.log(`Model ${name} created.`)}
	});
}
function getItemID(name){
    const id=0;
    fetch(`http://124.221.115.182/api/hardware.php?name=${name}`)
        .then(res => res.json())
        .then(data => {
            id=data.id;
        });
    return id;
}
function createDeviceModels(){
    console.log('createDeviceModels in');
    devices.forEach((item) =>{
        item.id=getItemID(item.name);
        item.parent=app.query(item.parent)[0];
        console.log(createModel(item));
    });
}
function createPeopleModels(){
    people.forEach((item) => {
        item.parent=campus;
        createModel(item);
    });
    peopleMove();
}
function createModels(){
    createDeviceModels();
    createPeopleModels();
}

//---------

let prevObj = null, curObj = null;
function locate(obj) {
	obj = obj.type === 'Marker' ? obj.parent : obj;

	if (curObj?.userData){
        curObj.userData.isLocated = false;
        updateDeviceMarker(prevObj);
    }
	obj.userData.isLocated = true;
	prevObj = curObj;curObj = obj;

	const currentLevel = app.levelManager.current;
	const objectParent = object.parent;
	if (currentLevel.uuid === objectParent.uuid) cameraFly(object);
	else app.levelManager.change(objectParent, { complete: () => cameraFly(object)});
}
function changeDeviceState(device,state){
    if(device.userData.state !== state){
        const animateName = state ? '开' : '关';
        device.playAnimation(animateName);
    }
    device.userData.state = state;
    updatePanel(device, state);
}
function changeRoomDevicesStates(curDom, room) {
	const allDeviceOpen = room.userData.allDeviceOpen;
	room.userData.allDeviceOpen = !allDeviceOpen;
	changeSwitch(curDom, room.userData.allDeviceOpen);
	const state = room.userData.allDeviceOpen;
	const roomDevices = room.query('[userData/type]');
	roomDevices.forEach((device) => changeDeviceState(device, state));
}