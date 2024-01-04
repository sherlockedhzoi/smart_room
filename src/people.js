function calculateDistance(path) {
	const [x, y, z] = path[0];
	const [x1, y1, z1] = path[1];
	return Math.trunc(Math.hypot(x - x1, y - y1, z - z1));
}
function move(people){
    const obj = app.query(`${people.id}`)[0]
    const path = routes[people.id];
    const distance = calculateDistance(path);
    const time = ((distance / 1) * 1000) / 5;
    obj.playAnimation({ name: '走', loopType: THING.LoopType.Repeat });
    obj.movePath(path, {
        time,
        complete: (e) => {
            obj.stopAnimation('走');
        },
    });
}
const moveAllPeople = () => people.forEach(move);
function getRandomPeople(){
    let newPeople=null, newRoute=null;
    if(app.levelManager.current.type!=='Campus'){
        newPeople={
            id: `people${people.length}`,
            name: 'temp',
            url: './assets/people/man/普通男性.gltf',
            position: [-19.673109127725272, 0, -82.35036783621433],
            tags: ['people'],
            userData: {
                type: 'people',
                state: false,
                alarmDesc: '无',
                alarmState: '无',
                isLocated: false,
            }
        };
        newRoute=[
            [-19.673109127725272, 0, -82.35036783621433],
            [-36, 0, -78],
            [-29.32614050166989, 0, -77.89239014790601]
        ];
    }else{
        newPeople=people[0];
        newRoute=routes[newPeople.name];
    }
    console.log(newPeople,newRoute);
    return {
        'randomPeople': newPeople,
        'randomRoute': newRoute,
    }
}
function createRandomPeopleModel(){
    const {randomPeople, randomRoute} = getRandomPeople();
    console.log(randomPeople,randomRoute);
    const obj=createModel(randomPeople);
    createPeopleMarker(obj);
    createPanel(obj);
    setBubbleVisible(obj, 'css_panel', false);
    people.push(randomPeople);
    routes[randomPeople.name]=randomRoute;
    move(randomPeople);
}
function removeRandomPeople(){
    removeModel(people.pop());
}
function initPeople(){
    setInterval(() => {
        fetch(hardware_url+'?name=people').then(res => res.json())
            .then(data => {
                let newPeople = data.data, nowPeople=people.length;
                if(newPeople<0||newPeople>10){
                    console.error(`get illegal people number ${newPeople}`);
                }else if(newPeople!=nowPeople){
                    while(newPeople!=nowPeople){
                        newPeople<nowPeople?removeRandomPeople():createRandomPeopleModel();
                        nowPeople=people.length;
                    }console.log(`people number changed to ${newPeople}`);
                }
            })
    }, interval);
}