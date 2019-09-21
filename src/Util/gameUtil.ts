import * as tl from "@akashic-extension/akashic-timeline";
import { AssetInfoType } from "../commonTypes/assetInfoType";
import { RectData } from "./spriteSheetTypes";
import { SpriteFrameMap } from "./spriteSheetTypes";

export type AssetMapType = { [key: string]: g.Asset };
/** GlyphAreaのマップの型 */
export type GlyphMapType = { [key: string]: g.GlyphArea };
/** 0のキャラクターコード */
export const CHAR_CODE_0 = 48;
/** 9のキャラクターコード+1 */
export const CHAR_CODE_10 = 58;

export namespace gameUtil{

    export function makeGlyphMapFromFrames(
		_charCodeStart: number, _charCodeEnd: number, _json: SpriteFrameMap,
		_frames: string[]): GlyphMapType {
		const map: GlyphMapType = {};
		for (let i = 0; i < (_charCodeEnd - _charCodeStart); ++i) {
			const frame = _json.frames[_frames[i]].frame;
			map[i + _charCodeStart] = {
				x: frame.x,
				y: frame.y,
				width: frame.w,
				height: frame.h
			};
		}
		//+を追加
		/*map[43] = {x:_json.frames["num_R_export0012.png"].frame.x,
				   y:_json.frames["num_R_export0012.png"].frame.y,
				   width:_json.frames["num_R_export0012.png"].frame.w,
				   height:_json.frames["num_R_export0012.png"].frame.height
				};
		*/
		return map;
    }
    
    export function addOneGlyphMapFromFrame(
		_oneChar: string, _json: SpriteFrameMap, _frameName: string,
		_map: GlyphMapType): void {
		const frame: RectData = _json.frames[_frameName].frame;
		console.log(_oneChar.charCodeAt(0));
		_map[_oneChar.charCodeAt(0)] = {
			x: frame.x,
			y: frame.y,
			width: frame.w,
			height: frame.h
		};
	}

    export function createNumFontWithAssetInfo(
		_info: AssetInfoType, opt_assets?: AssetMapType): g.BitmapFont {
		if (!opt_assets) {
			opt_assets = g.game.scene().assets;
        }
        
		const frameMap: SpriteFrameMap = JSON.parse(
			(<g.TextAsset>opt_assets[_info.json]).data);
		const glyphMap = gameUtil.makeGlyphMapFromFrames(
			CHAR_CODE_0, CHAR_CODE_10, frameMap, _info.numFrames);
		if (_info.nonnumFrames) {
			const iEnd = _info.nonnumFrames.length;
			for (let i = 0; i < iEnd; ++i) {
				const oneChar = _info.nonnumFrames[i];
				addOneGlyphMapFromFrame(
					oneChar.char, frameMap, oneChar.frame, glyphMap);
			}
		}
		let missingGlyph: g.GlyphArea;
		if (_info.missing) {
			const frame: RectData = frameMap.frames[_info.missing].frame;
			missingGlyph = {
				x: frame.x,
				y: frame.y,
				width: frame.w,
				height: frame.h
			};
		}
		const font = new g.BitmapFont(
			{src:opt_assets[_info.img], map:glyphMap, defaultGlyphWidth:_info.fontWidth,
			defaultGlyphHeight:_info.fontHeight, missingGlyph:missingGlyph});
		return font;
    }
    
    export function updateGameStateScore(_score: number): void {
		/*const gameState = <GameStateType>g.game.vars.gameState;
		if (gameState && (!gameState.isFinished)) {
			gameState.score = _score;
        }*/
        g.game.vars.gameState.score = _score;
		// console.log("updateGameStateScore: gameState.score:" + g.game.vars.gameState.score + ".");
	}

}