import { transformCubicBezier } from "../utils";

interface Effect {
    property : string;
    start:string;
    end:string;
    startAt:number;
    endAt:number
}
interface Item {
    id: string;
    effects: Array<Effect>;
}
interface Stage {
    id?: string;
    scrollNumber?: number;
    transition?: number;
    easing?: "ease" | "linear" | "ease-in" | "esae-out" | "ease-in-out" | CubicBezier;
    items?: Array<Item>;
}
type Stages = Stage[] | [];

type ScrollConfig = {
    stageSwitchTransition?:number,
    stageSwitchDelay?:number,
    stageSwitchEasing?:string,
    disableAfterSwitching?:number,
    stages?:Stages
}
export type CubicBezier = {
    x1?:number,
    y1?:number,
    x2?:number,
    y2?:number
}

const defaultConfig : ScrollConfig = {
	stageSwitchTransition: 800,
	stageSwitchDelay: 0,
	stageSwitchEasing: transformCubicBezier(),
	disableAfterSwitching: 500,
	stages: []
};

const defaultStageConfig: Stage = {
	scrollNumber: 1,
	transition: 200,
	easing: "ease",
	items: []
};

class Scroll {
	target:string | HTMLElement;
	config: ScrollConfig;

	constructor(target:string | HTMLElement, config: ScrollConfig){
		if (typeof target === "string"){
			target = document.querySelector(target) as HTMLElement;
		}
		if (!target || target.nodeType !==1){
			throw new TypeError("Cannot find correct DOM Element to apply scroll effects, target is :"+ target);
		}
		target.style.overflow = "hidden";
		
		this.target = target;
		this.config = this.initConfig(config);
	}

	initConfig(config: ScrollConfig):ScrollConfig{
		return {};
	}
}

export default Scroll;