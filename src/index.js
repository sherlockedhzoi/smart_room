// 创建 app
let campus=null;
const app = new THING.App({
	url: './assets/campus/campus.gltf',
	complete: (e) => {
        console.log(e);
        campus=e.campus;
        app.on('click', (e) => console.info(e.pickedPosition))
        createModels();
        createMarkers();
        enterLevel();
        backToDefaultView();
	},
});

// 设置天空盒
const background=new THING.CubeTexture(backgroundMaps);
app.background=app.envMap=background;
