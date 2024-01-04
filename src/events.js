function addClickEvent(object, tag, callback) {
	object.on(THING.EventType.Click,(ev) => {
        const { button } = ev;
        const current=(object.userData.type=='Marker'?object.parent:object);
        console.log(`${current.name} touched`)
        if (button === 0) {
            // destroyPanels();
            locate(current);
            callback && callback();
            // createPanel(current);
            // createPanel_dom(current);
        }
    },tag);
}
function initGlobalDBLEvent() {
	app.on(THING.EventType.DBLClick, (e) => {
		if (e.button === 2) {
			destroyPanels();
			if (curObj) {
                reverseDeviceLocated(curObj);
                if(curObj.userData.type=='camera') _cancelProbe();
				curObj = null; 
			}
			if (curRoomCssDom) {
                curRoomCssDom.classList.remove('room-marker-active');
			}
            backToDefaultView();
		}
	});
}
function enterLevel() {
	/************	标记显隐设置	**************/
	// 初始化时隐藏房间内物体标记
	app.query('.Floor').query('.Marker').forEach((v) => {v.visible = false;});
    // 建筑标记
	app.on(THING.EventType.BeforeEnterLevel, '.Building' || '.Campus', (e) => {
        var isCampus=(app.levelManager.current.type==='Campus');
        var people = app.query('["userData/type" = "people"]');
        // console.info(people, Array(people));
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
	app.on(THING.EventType.CompleteEnterLevel, '.Campus || .Building || .Floor', (e) => { backToDefaultView();});
}

function initGlobalEvents(){
    initGlobalDBLEvent();
    enterLevel();
    initPeople();
}