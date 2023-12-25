function _panelUI(obj) {
	const { name, id, userData } = obj;
	let paneldom = document.createElement('div');
	paneldom.className = 'panel-wrap';
	const isCamera = userData.type === '监控摄像头';
	let videoUrl = '';
	if (isCamera) videoUrl ='https://video-for-inside-online-env.thingjs.com/index.html?id=1';

	const operateOpenDevice = userData.state ? 'operate-open-device' : '';
	const circleOpenDevice = userData.state ? 'circle-open-device' : '';
    
	paneldom.innerHTML = `
    <div class="top-icon">
        <img src="https://static.3dmomoda.com/textures/22040714innijpmrnzu8hujw3ozfbdlg.png" alt=""/>
    </div>
        <div class="content">
            <div class="close" onclick="closePanel('${name}','${userData.type}')"></div>
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