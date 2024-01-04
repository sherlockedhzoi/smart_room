// 记录园区最佳视角
const campusView = {
	target: [-10.74304744677866, -27.345996644148578, -11.879535617315948],
	position: [152.61525303425609, 81.42784417418167, 295.8674469011864],
};
// 建筑最佳视角
const buildView = {
	target: [-15.528481939952101, 14.918177638322637, -88.88615711895133],
	position: [14.766962620210986, 40.16103319934905, -56.15521348861049],
};
// 楼层最佳视角
const floorView = {
	target: [-21.58338349603153, 15.220250893059061, -91.7314171466946],
	position: [-41.94207171953202, 37.25976982063078, -54.286192369496895],
};
const peopleView = {
	target: [7.965095030548585, -10.465178331182717, -26.570176704189265],
	position: [1.89794317664251, 98.41186088447536, -252.43792246164415],
};

function cameraFly(obj, callback) {
	// 1. 设置目标对象的默认视角
	const objDefaultView = obj?.userData?.defaultView;
	const param = objDefaultView || { target: obj };
	// 2. 摄像机飞行
	app.camera.flyTo({
		...param,
		time: 1500,
		distance: 30,
		complete: () => callback && callback(),
	});
}
// 回到当前层级默认视角
function backToDefaultView() {
    // console.log('back to default view');
	const currentLevel = app.levelManager.current?app.levelManager.current:campus;
		switch (currentLevel.type) {
            case 'Campus': app.camera.flyTo(campusView);break;
            case 'Building': app.camera.flyTo(buildView);break;
            case 'Floor': app.camera.flyTo(floorView);break;
            case 'Room': app.camera.flyTo({target: currentLevel,});break;
            default: console.warn(`Error: currentLevel ${currentLevel.type} default view not defined`);
		}
}
let curObj = null;
function reverseDeviceLocated(obj){
	obj.userData.isLocated = !obj.userData.isLocated;
    updateDeviceMarker(obj);
}
function locate(obj) {
	obj = obj.type === 'Marker' ? obj.parent : obj;
    const located=obj.userData.located;
    if(!located){
        if (curObj?.userData ) reverseDeviceLocated(curObj);
        reverseDeviceLocated(obj);
        curObj = obj;

        const currentLevel = app.levelManager.current;
        const objectParent = obj.parent;
        if (currentLevel.uuid !== objectParent.uuid) app.levelManager.change(objectParent);
        cameraFly(obj);
    }
    if(obj.userData.type === 'classroomTable') createClassTable(obj);
    else {
        if (obj.userData.type === 'camera' && obj.userData.state && !userCamera) _createProbe(obj);
        createPanel(obj);
    }
}

let userCamera=null;

function _createProbe(obj) {
	let viewProbe = new THING.EXTEND.ViewProbe({
		id: 'ballViewProbe',
		innerScanning: false,
		coneScanning: true,
		scanningNum: [10, 20], // 后期可以自适应精度,
		innerPlaneColor: '#00FF9B', // 设置 plane 颜色
		innerPlaneOpacity: 0.5, // 设置 plane 透明度
		parent: obj,
		pickable: true,
	});
	viewProbe.fov = 10 //视锥 vfov
	viewProbe.far = 15 //视锥长度
	//viewProbe.near = 10
	viewProbe.rotateX(0) // 视锥角度
	viewProbe.aspect = 3;// hov/vfov

	//viewProbe.start(app.query('.Floor'), true, false, false);

	viewProbe.localPosition = [0, 0, -2.5]; //视锥起始点

	if (userCamera) {
		userCamera.destroy();
		userCamera = null;
	}
	const camera = new THING.Camera();
	userCamera = camera;
	// const camera = new THING.Camera();
	camera.enableViewport = true;
	camera.control.enable = false;

	camera.viewport = [500, 50, 800, 200]; // [面板位置，面板位置，视角宽，视角高]

	// camera.background = THING.Math.randomFromArray([image, image2]);
	camera.projectionType = THING.ProjectionType.Perspective;

	camera.postEffect.FXAA.enable = true;
	camera.postEffect.MSAA.enable = true;
	camera.position = app.query('#ballViewProbe')[0].position;
	camera.control.enable = false;

	if (!camera) {
		return;
	}
	camera.fov = 50;
	const [x, y, z] = app.query('#ballViewProbe')[0].boundingBox.center;
	camera.target = [x,y,z];
	// camera.angles = app.query('#ballViewProbe')[0].angles
	app.query('#ballViewProbe')[0].start(app.query('.Floor'), true, false, false);
}

function _cancelProbe() {
	if (userCamera) {
		app.query('#ballViewProbe')[0].destroy()
		userCamera.destroy();
		userCamera = null;
	}
}