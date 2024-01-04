const getScale=(item) => item.userData.type==='people'?[5, 5, 5]:item.scale;
const getDeviceID = (name) => {
    let id=0;
    fetch(`http://124.221.115.182/api/hardware.php?name=${name}`)
    .then(res => res.json())
    .then(data => {id=data.id;});
    return id;
}

const modelUrls={
    'barrier': './assets/models/barrier/barrier.gltf',
    'camera': './assets/models/camera/camera.gltf',
    'cooler': './assets/models/conditioner/空调.gltf',
    'curtain': './assets/models/chuanglian/窗帘.gltf',
    'door': './assets/models/doors/doors.gltf',
    'accessControl': './assets/models/entrance/entrance.gltf',
    'fan': './assets/models/fengshan/风扇.gltf',
    'light': './assets/models/light/light.gltf',
    'classroomTable': './assets/models/smartboard/model_screen_003.gltf'
}
function createModel(item, callback){
    const { id, name, url, parent, position, angles, userData, complete} = item;
    return new THING.Entity({
        id, name, parent, url, position, angles, userData,
        scale: getScale(item),
        complete: (e) => {
            const obj=e.object;
            complete && complete(e);
            console.log(`Model ${name} created.`);
            callback && callback(obj);
            setInterval(() => {
                fetch(`${hardware_url}?name=${name}`)
                    .then(res => res.json())
                    .then(data => {
                        if (!changing && data && (data.data>0) != obj.userData.state){
                            console.log(`${name} state changed`);
                            switchDeviceState(name, false);
                        }
                    })
            }, interval);
        }
    });
}
const removeModel = (item) => {
    const name=item.name;
    app.query(`["name"="${name}"]`)[0].destroy();
}
function createDeviceModels(){
    // console.log('createDeviceModels in');
    devices.forEach((device) =>{
        if(!device.id) device.id=getDeviceID(device.name);
        device.url=modelUrls[device.userData.type];
        device.parent=app.query(device.parent)[0];
        createModel(device, (obj) => {
            addClickEvent(obj, 'deviceClick');
        });
    });
}
function createPeopleModels(){
    people.forEach((item) => {
        item.parent=campus;
        createModel(item);
        move(item);
    });
}
function createModels(){
    createDeviceModels();
    createPeopleModels();
}

//---------

const changeDeviceState = (device,state) => {
    if(device.userData.state !== state){
        const animateName = state ? '开' : '关';
        if(device.animationNames.includes(animateName)) device.playAnimation(animateName);
        else if(device.userData.type === 'camera') state?_createProbe(device):_cancelProbe();
    }
    device.userData.state = state;
}
function switchDeviceState(deviceName, local){
    changing=local;
    const device=app.query(deviceName)[0];
    // console.log(deviceName, device);
    const state=!device.userData.state;
    changeDeviceState(device,state);
    updatePanel(device, state);
    if(local){
        const {name, userData} = device;
        const {state} = userData;
        fetch(hardware_url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': name, 'data': Number(state)})
        }).then(res => res.text())
            .then(text => {console.log(text);});
        fetch(hardware_url,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'name': 'changed', 'data': 1})
        }).then(res => res.text())
            .then(text => {console.log(text);changing=false;});
    }
}
function switchRoomDevicesStates(curDom, room) {
	const state = room.userData.state;
	room.userData.state = !state;
	changeSwitch(curDom, state);
	const roomDevices = room.query('[userData/type]');
	roomDevices.forEach((device) => switchDeviceState(device.name, true));
}