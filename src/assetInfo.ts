/**
 * 画像アセット関連の静的情報
 */
export class AssetInfo {

	static gameAssets:string[] = [
		"normal",
		"normal_caught",
		"huwareika",
		"yureika",
		"tsuribito",
		"tsurizao",
		"tsuribito2",
		"tsuribito3",
		"img_stg_num1",
		"json_stg_num1",
		"img_stg_num2",
		"json_stg_num2",
		"img_stg_num3",
		"json_stg_num3",
		"pt",
		"time",
		"wave",
		"finishLabel",
		"gyakureika",
		"bikkurireika",
		"odoreika",
		"reikatyon",
		"nemureika",
		"gatareika",
		"takoreika",
		"yuizarashi",
		"maxgage",
		"gage",
		"se_real57",
		"reppu",
		"konoyaro",
		"needle",
		"needle2",
		"thunder",
		"bgm",
		"catchSE",
		"unti",
		"untireika",
		"throwunti",
		"unticaught",
		"getreika",
		"paralysisSound",
		"yuizarashi2",
		"alertBG",
		"Countdown",
		"gamestart",
		"sun",
		"catchFeverSE"
	];

	static resultAssets:string[] = [
		"result_board",
		"json_num_result",
		"img_num_result",
		"se_No8_RollCount2",
		"se_No8_RollCount_Finish",
	];

	static descriptionAssets:string[] = [
		"title",
	];

	static getWaveProperty(scene:g.Scene):any{
		return {scene:scene,
						height:100,
						width:700,
						x:-20,
						y:90,
						src:<g.ImageAsset>scene.assets["wave"],
						srcWidth:700,
						srcHeight:100,
						frames:[0,1,2,3],
						interval:1000,
						loop:true};
	}

	static getSunProperty(scene:g.Scene):any{
		return {scene:scene,
						height:60,
						width:60,
						x:0,
						y:0,
						src:<g.ImageAsset>scene.assets["sun"],
						srcWidth:100,
						srcHeight:100,
						frames:[0,1],
						interval:1300,
						loop:true};
	}

	static getAnglerProperty(scene:g.Scene):any{
		return {scene:scene,
				src:scene.assets["tsuribito"],
				x:100,
				y:5,
				srcWidth:550,
				srcHeight:523,
				width:140,
				height:140,
			   };
	}

	static getLineProperty(scene:g.Scene):any{
		return {scene:scene,
				src:scene.assets["tsurizao"],
				x:100+130,
				y:10+10,
				srcWidth:14,
				srcHeight:480,
				width:14,
				height:300
			};
	}

	static getThunderProperty(scene:g.Scene):any{
		return {scene:scene,
				height:200,
				width:200,
				x:30,
				y:-20,
				src:<g.ImageAsset>scene.assets["thunder"],
				srcWidth:550,
				srcHeight:523,
				frames:[0,1],
				interval:200,
				loop:true
			};
	}

	/** ゲーム中の数字（白） */
	// tslint:disable-next-line:typedef
	static numWhite = {
		img: "img_stg_num1",
		json: "json_stg_num1",
		numFrames: [
			"num_W_export0001.png",
			"num_W_export0002.png",
			"num_W_export0003.png",
			"num_W_export0004.png",
			"num_W_export0005.png",
			"num_W_export0006.png",
			"num_W_export0007.png",
			"num_W_export0008.png",
			"num_W_export0009.png",
			"num_W_export0010.png"
		],
		frames: {
			cross: "num_W_export0011.png",
			plus: "num_W_export0012.png",
			minus: "num_W_export0013.png"
		},
		fontWidth: 26,
		fontHeight: 30
		};

	static numResult = {
		img: "img_num_result",
		json: "json_num_result",
		frames: {
			cross: "num_result_0011.png",
			plus: "num_result_0012.png",
			minus: "num_result_0013.png"
		},
		numFrames: [
			"num_result_0001.png",
			"num_result_0002.png",
			"num_result_0003.png",
			"num_result_0004.png",
			"num_result_0005.png",
			"num_result_0006.png",
			"num_result_0007.png",
			"num_result_0008.png",
			"num_result_0009.png",
			"num_result_0010.png"
		],
		fontWidth: 70,
		fontHeight: 81
	};
		

	static numRed = {
		img: "img_stg_num2",
		json: "json_stg_num2",
		numFrames: [
			"num_R_export0001.png",
			"num_R_export0002.png",
			"num_R_export0003.png",
			"num_R_export0004.png",
			"num_R_export0005.png",
			"num_R_export0006.png",
			"num_R_export0007.png",
			"num_R_export0008.png",
			"num_R_export0009.png",
			"num_R_export0010.png"
		],
		nonnumFrames: [
			{char:"*",frame:"num_R_export0011.png"},
			{char:"+",frame: "num_R_export0012.png"},
			{char:"-",frame: "num_R_export0013.png"}
		],
		fontWidth: 26,
		fontHeight: 30
	};
		

	static numBlue = {
		img: "img_stg_num3",
		json: "json_stg_num3",
		numFrames: [
			"num_Bl_export0001.png",
			"num_Bl_export0002.png",
			"num_Bl_export0003.png",
			"num_Bl_export0004.png",
			"num_Bl_export0005.png",
			"num_Bl_export0006.png",
			"num_Bl_export0007.png",
			"num_Bl_export0008.png",
			"num_Bl_export0009.png",
			"num_Bl_export0010.png"
		],
		frames: {
			cross: "num_Bl_export0011.png",
			plus: "num_Bl_export0012.png",
			minus: "num_Bl_export0013.png"
		},
		fontWidth: 26,
		fontHeight: 30
	};
	/** ゲーム中の数字（黄色 コンボ） */
	// tslint:disable-next-line:typedef
	static numCb = {
		img: "img_num_cb",
		json: "json_num_cb",
		numFrames: [
			"num_Cb_export0001.png",
			"num_Cb_export0002.png",
			"num_Cb_export0003.png",
			"num_Cb_export0004.png",
			"num_Cb_export0005.png",
			"num_Cb_export0006.png",
			"num_Cb_export0007.png",
			"num_Cb_export0008.png",
			"num_Cb_export0009.png",
			"num_Cb_export0010.png"
		],
		frames: {
			cross: "num_Cb_export0011.png",
			plus: "num_Cb_export0012.png",
			minus: "num_Cb_export0013.png"
		},
		fontWidth: 30,
		fontHeight: 34
	};
	
}