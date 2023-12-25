function bindSingleClick(object, tag) {
	object.on(THING.EventType.Click,(ev) => {
        const { button } = ev;
        if (button === 0) {
            destroyPanel();
            locateThing(object);
        }
    },tag);
}
function dblEvents() {
	app.on(THING.EventType.DBLClick, (e) => {
		if (e.button === 2) {
			backToDefaultView();
			destroyPanel();
			if (curObj) {
				curObj.userData.isLocated = false;
				changeDeviceMarker(curObj, markerType);
				curObj = prevObj = null; 
			}
			if (curRoomCssDom) {
				curRoomCssDom.querySelector('.room-marker-wrap').classList.remove('room-marker-active');
			}
		}
	});
}
function enterLevel() {
	/************	标记显隐设置	**************/
	// 初始化时隐藏房间内物体标记
	app.query('room01').query('.Marker').forEach((v) => {v.visible = false;});
    // 建筑标记
	app.on(THING.EventType.BeforeEnterLevel, '.Building' || '.Campus', (e) => {
        var isCampus=(app.levelManager.current.type==='Campus');
        var people = [app.query('[name = "沐沐"]')[0], app.query('[name = "琳琳"]')[0], app.query('[name = "熙熙"]')[0], app.query('[name = "娜娜"]')[0]];
        console.info(people);
        people.forEach((item) => { item.visible = isCampus;})
        setBubbleVisible(isCampus?e.prev:e.object, 'build_marker', isCampus);
        if(!isCampus) _cancelProbe();
    },'changeLevel');
	//	 进出楼层时显隐房间标记
	app.on(THING.EventType.BeforeEnterLevel, '.Floor || .Room', (e) => {
		app.query('.Room').forEach((room) => setBubbleVisible(room, 'room_marker', true));
		_cancelProbe()
	});
	app.on(THING.EventType.AfterLeaveLevel, '.Floor', (e) => {
		app.query('.Room').forEach((room) => setBubbleVisible(room, 'room_marker', false));
		_cancelProbe()
	});

	/************	视角设置	**************/
	app.on(THING.EventType.CompleteEnterLevel, '.Building' || '.Floor', (e) => { backToDefaultView();});
}
