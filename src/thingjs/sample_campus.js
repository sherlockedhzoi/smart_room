class Campus extends THING.Object3D {
	get buildings() {
		return this.children.query('tags:or(Building');
	}
	showOutside() {
		this.visible = true;
		this.buildings.forEach(building => {
			building.showOutside();
		});
	}
	hasGround(object) {
		if (object.tags.has('Ground')) {
			return true;
		}
		return false;
	}
	get isCampus() { return true; }
}

class Building extends THING.Object3D {
	constructor(params) {
		super(params);

		this._isExpand = false;
	}

	get facade() {
		return this.children.query('tags:or(Facade');
	}
	showOutside() {
		this.visible = true;
		this.facade.visible = true;
		this.floors.visible = false;
	}
	showInside() {
		this.parent.visible = false
		this.visible = true;
		this.facade.visible = false;
	}

	/**
	 * 展开楼层
	 * @param {Object} params
	 * @param {Number} [params.time] Expanding time(ms)
	 * @param {Number} [params.distance] Expanded interval(m)
	 * @param {Function} [params.onComplete] The callback function after the expand
	 */
	expandFloors(params = {}) {
		this._moveFloors(params, true);
	}
	unexpandFloors(params = {}) {
		this._moveFloors(params, false);
	}

	_moveFloors(params, isExpand) {
		if (this.isExpand === isExpand) {
			return;
		}

		let time = params.time || 1000;
		let distance = params.distance || 20;
		let onComplete = params.onComplete;

		// 获取所有楼层
		let floors = this.floors;

		// 计算终点坐标
		let endPositions = [];
		for (let i = 0; i < floors.length; i++) {
			const floor = floors[i];
			// 先关闭移动动画
			floor.stopMoving();
			let endPosition = floor.position;
			// 获取y的高度
			let y = endPosition[1];
			// 设置偏移
			let offset = i * distance;
			endPosition[1] += isExpand ? offset : -offset;
			endPositions.push(endPosition);
		}

		// 开始移动
		for (let i = 0; i < floors.length; i++) {
			// 构造移动动画参数
			let moveToOptions = {
				time: time,
				orientToPath: false
			};

			// 只在最后一个动画设置回调
			if (i === floors.length - 1) {
				// 设置正常停止回调
				moveToOptions.onComplete = onComplete;
				// 设置中断停止回调
				moveToOptions.onStop = onStop;
			}

			floors[i].moveTo(endPositions[i], moveToOptions);
		}

		this._isExpand = isExpand;

		// 如果中断，直接把楼层位置设置到终点
		function onStop() {
			for (let i = 0; i < floors.length; i++) {
				floors[i].position = endPositions[i];
			}
			onComplete && onComplete();
		}
	}

	get isBuilding() { return true; }

	get floors() {
		return this.children.queryByType('Floor');
	}

	get isExpand() {
		return this._isExpand;
	}
}

class Floor extends THING.Object3D {
	get isFloor() { return true; }
	get levelNumber() { return this.parent.children.indexOf(this) + 1; }
}

class Room extends THING.Object3D {
	get isRoom() { return true; }
}

THING.Utils.registerClass('Campus', Campus);
THING.Utils.registerClass('Building', Building);
THING.Utils.registerClass('Floor', Floor);
THING.Utils.registerClass('Room', Room);

//  extends THING.BaseLevelControl
class StandardControl extends THING.BaseLevelControl {
	constructor(param = {}) {
		super(param);
		this.outlineColor = param['outlineColor'] || '#cc6600';
		this.duration = param['flyTime'] || 1000;
		this.eventTag = this.constructor.name;
	}

	onEnter(param) {
		const object = param.current;
		this._current = object;
		let app = this.app;

		// Register mouse move in and out events.
		app.on('mouseenter', (e) => {
			if (e.object) {
				let object = this.supportOutline(e.object);
				if (object) {
					object.style.outlineColor = this.outlineColor;
					this._outlineObject = object;
				}
			}
		}, this.eventTag);

		app.on('mouseleave', (e) => {
			if (e.object) {
				let object = this.supportOutline(e.object);
				if (object) {
					object.style.outlineColor = null;
					this._outlineObject = null;
				}
			}
		}, this.eventTag);

		app.on('dblclick', (e) => {
			if (e.button === 0) {
				if (e.object) {
					let object = this.supportOutline(e.object);
					if (object && this.supportChange(object)) {
						app.levelManager.change(object);
					}
				}
			} else if (e.button == 2) {
				const current = this.current;
				if (!current || current.isCampus) {
					return;
				}
				const parent = current.parent;
				if (!parent || parent == app.root) {
					return;
				}
				app.levelManager.change(parent);
			}
		}, this.eventTag);

		app.camera.flyTo({
			target: object,
			duration: this.duration,
		});
	}

	onLeave() {
		let app = this.app;

		app.off('mouseenter', this.eventTag);
		app.off('mouseleave', this.eventTag);
		app.off('dblclick', this.eventTag);

		if (this._outlineObject) {
			this._outlineObject.style.outlineColor = null;
		}

		app.camera.stopFlying();
	}

	supportChange(object) {
		let tags = object.tags;
		if (tags.has('Campus') || tags.has('Building') || tags.has('Floor')) {
			return true;
		}

		return false;
	}

	supportOutline(object) {
		const parents = object.parents;
		const index = parents.indexOf(this.current);
		if (index > 0) {
			return parents[index - 1];
		}
		return object;
	}

	get current() {
		return this._current
	}
}


class CampusControl extends StandardControl {
	onEnter(param) {
		let campus = param.current;
		campus.showOutside();
		super.onEnter(param);
	}
	supportOutline(object) {
		if (this.current.hasGround(object)) {
			return null;
		}
		return super.supportOutline(object);
	}
}

class BuildingControl extends StandardControl {
	onEnter(param) {
		let building = param.current;
		building.showInside();
		super.onEnter(param);
	}
}

class FloorControl extends StandardControl {
	onEnter(param) {
		let floor = param.current;
		floor.parent.visible = false;
		floor.visible = true;
		super.onEnter(param);
	}
	supportOutline(object) {
		if (object == this.current) {
			return null;
		}
		return super.supportOutline(object);
	}
}

class RoomControl extends StandardControl {
	supportOutline() {
		return null;
	}
}

THING.App.addCompleteCallback((app) => {
	// 注册层级控制方式
	app.level.register(".Campus", new CampusControl());
	app.level.register(".Building", new BuildingControl());
	app.level.register(".Floor", new FloorControl());
	app.level.register(".Room", new RoomControl());
});