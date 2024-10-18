import { transformCubicBezier } from "./utils";

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

const defaultStageConfig: Stage ={
	scrollNumber: 1,
	transition: 200,
	easing: "ease",
	items: []
};

class Scroll {
	public target:string | Element;
	constructor(target:string | Element, config:{}){
		if (typeof target === "string"){
			target = document.querySelector(target);
		}
		this.target = target;

	}
}

export default Scroll;