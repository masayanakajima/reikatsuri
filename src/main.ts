import {AssetInfo} from "./assetInfo";
import { GameScene } from "./GameScene";
import { ResultScene } from "./ResultScene";
import { DescriptionScene } from "./DescriptionScene";

function main(param: g.GameMainParameterObject): void {

	var descriptionScene = new DescriptionScene({game:g.game,assetIds:AssetInfo.descriptionAssets});
	var gameScene = new GameScene({game: g.game,assetIds:AssetInfo.gameAssets});
	var resultScene = new ResultScene({game:g.game,assetIds:AssetInfo.resultAssets});

	// 何も送られてこない時は、標準の乱数生成器を使う
	var random = new g.XorshiftRandomGenerator(new Date().getSeconds());

	descriptionScene.message.handle((msg:any)=> {
		if (msg.data && msg.data.type === "start" && msg.data.parameters) { // セッションパラメータのイベント
			console.log("msg.data");
			var sessionParameters = msg.data.parameters;
			if (sessionParameters.randomSeed != null) {
				// プレイヤー間で共通の乱数生成器を生成
				// `g.XorshiftRandomGenerator` は Akashic Engine の提供する乱数生成器実装で、 `g.game.random` と同じ型。
				random = new g.XorshiftRandomGenerator(sessionParameters.randomSeed);
				console.log(random.get(0,100));
			}
		}
	});

	
	descriptionScene.init(gameScene);
	gameScene.init(resultScene);
	resultScene.init();

	g.game.pushScene(descriptionScene);
	
}

export = main;
