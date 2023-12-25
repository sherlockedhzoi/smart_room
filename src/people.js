function calculateDistance(path) {
	const [x, y, z] = path[0];
	const [x1, y1, z1] = path[1];
	return Math.trunc(Math.hypot(x - x1, y - y1, z - z1));
}
function peopleMove() {
	people.forEach((people) => {
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
	});
}