import { walkNode } from "../utils";
import { defaultScrollConfig, defaultStageConfig } from "./constant";

export type Effect = {
    property: string;
    start: string;
    end: string;
    startAt?: number;
    endAt?: number
}
export type ItemConfig = {
    id: string;
    effects: Array<Effect>;
}
export type StageConfig = {
    id: string;
    scrollNumber?: number;
    transition?: number;
    easing?: "ease" | "linear" | "ease-in" | "esae-out" | "ease-in-out" | CubicBezier;
    items?: Array<ItemConfig>;
}
export type ScrollConfig = {
    stageSwitchTransition?: number,
    stageSwitchDelay?: number,
    stageSwitchEasing?: string,
    disableAfterSwitching?: number,
    stages : StageConfig[]
}

interface Item extends ItemConfig {
	node: HTMLElement | ChildNode,
}
interface Stage {
	node: HTMLElement | ChildNode,
	stageConfig: StageConfig,
	id: StageConfig["id"],
	step: number,
	items?: Item[],
}
type Stages = Array<Stage>;


export type CubicBezier = {
    x1?:number,
    y1?:number,
    x2?:number,
    y2?:number
}



class Scroll {
	private animating: boolean;
	private switching: boolean;
	private activeStageIndex: number;
	target: string | HTMLElement;
	config: ScrollConfig;
	stages: Stages;

	constructor(target:string | HTMLElement, config: ScrollConfig){
		if (typeof target === "string"){
			target = document.querySelector(target) as HTMLElement;
		}
		if (!target || target.nodeType !==1){
			// throw new TypeError("Cannot find correct DOM Element to apply scroll effects, target is :"+ target);
		}
		if (!config.stages.length){
			throw new Error("Cannot find any stage to apply scroll effects, stages is required !");
		}
		// target.style.overflow = "hidden";
		
		this.target = target;
		this.animating = false;
		this.switching = false;
		this.activeStageIndex = 0;

		this.initConfig(config);
	}

	initConfig(config: ScrollConfig): void{
		config = { ...defaultScrollConfig, ...config };
		this.config = config;
		this.initStages();
	}

	initStages(): void{
		walkNode([this.target] as HTMLElement[], (node) => {
			if (node.nodeType !== 1) return;
			let stage;
			const stageId = node.getAttribute("data-scroll-stage-id");
			if (stageId && (stage = this.getStage(stageId))){
				node.style.transition = `${this.config.stageSwitchTransition}ms ${this.config.stageSwitchEasing} ${this.config.stageSwitchDelay}ms`;
				(this.stages || (this.stages = [])) && this.stages.push({
					node,
					stageConfig: { ...defaultStageConfig, ...stage },
					id: stageId,
					step: 0
				});
				return false;
			}
		});
		this.initItemsEffects();
	}
	
	initItemsEffects(){
		this.stages.forEach(stage => {
			// walk Stage's node, init item's config
			walkNode(stage.node, node => {
				if (node.nodeType !== 1) return;
				const itemId = (node as HTMLElement).getAttribute("data-scroll-item-id");
				if (itemId){
					for (let i = 0; i<this.config.stages.length; i++){
						for (let j = 0; j<this.config.stages[i].items.length; j++){
							const item = this.config.stages[i].items[j];
							if (item.id = itemId){
								if (!stage.items){
									stage.items = [];
								}
								stage.items.push({
									...this.config.stages[i].items[j],
									node,
								});
								break;
							}
						}
					}
				}
				return false;
			});
		});
	}

	getStage(id: string){
		const stageConfig = this.config.stages;
		for (let i = 0; i < stageConfig.length; i++){
			const stage = stageConfig[i];
			if (stage.id === id){
				return stage;
			}
		}
	}
}

export default Scroll;