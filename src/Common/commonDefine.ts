import { ReikaInfo } from "./commonType";

export namespace commonDefine{
    export const SPAWN_LEFT_ARRAY =  [160,180,200,220,240,260,280];
    export const SPAWN_RIGHT_ARRAY = [180,200,220,240,260,280,300];
    export const FISH_PULL_SPEED = 5;
    export const GAME_OVER_TIME = 65000;
    export const FEVER_MAGNIFICATION = 2;
    export const MAX_REIKA_POOL = 15;
    export const READY_TIME = 3;
    export const ALERT_TIME = 10;
    export const TIME_X = 590;
    export const TIME_Y = 20;
    export const SPAWN_INTERVAL = 1.2;

    export const NormalReika={
        speed : 6,
		point : 500,
		swim_src : "normal",
		caught_src : "normal"
    }

    export const GataReika={
        speed : 6,
		point : 3000,
		swim_src : "gatareika",
		caught_src : "gatareika"
    }

    export const NemuReika = {
        speed : 3,
		point : 5000,
		swim_src : "nemureika",
		caught_src : "bikkurireika"
    }

    export const GyakuReika = {
        speed : 6,
		point : 700,
		swim_src : "gyakureika",
		caught_src : "gyakureika"
    }

    export const HuwaReika = {
        speed : 7,
		point : 1000,
		swim_src : "huwareika",
		caught_src : "huwareika"
    }

    export const OdoReika = {
        speed : 7,
		point : 4000,
		swim_src : "odoreika",
		caught_src : "odoreika"
    }

    export const ReikaTyon = {
        speed : 7,
		point : 1500,
		swim_src : "reikatyon",
		caught_src : "reikatyon"
    }

    export const YuReika = {
        speed : 8,
		point : 3000,
		swim_src : "yureika",
		caught_src : "yureika"
    }

    export const TakoReika = {
        speed : 4,
        point : 5500,
        swim_src : "takoreika",
        caught_src : "takoreika"
    }

    export const YuiZarashi = {
        speed : 4,
        point : 14000,
        swim_src : "yuizarashi2",
        caught_src : "yuizarashi2"
    }

    export const UntiReika = {
        speed: 3,
        point : 8000,
        swim_src : "untireika",
        caught_src : "untireika"
    }

    export const Unti = {
        speed: 5,
        point : 0,
        swim_src : "unti",
        caught_src : "unticaught"
    }
}


