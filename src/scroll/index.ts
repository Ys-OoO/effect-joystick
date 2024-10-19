import { extractProperty, walkNode } from "../utils";
import { defaultScrollConfig, defaultStageConfig } from "./constant";
import Color from "color";

export type EffectConfig = {
    property: string;
    start: string;
    end: string;
    startAt?: number;
    endAt?: number;
}
export type ItemConfig = {
    id: string;
    effects: Array<EffectConfig>;
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

interface Effect extends EffectConfig {
	isColor?: boolean;
	startNumbers?: number[];
	endNumbers?: number[];
	strings?: string[];
}
interface Item extends ItemConfig {
	node: HTMLElement | ChildNode,
	effects : Array<Effect>
}
interface Stage extends StageConfig{
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
	stagesProxy: any;

	switchTimeout: any;
	animatingTimeout: any;
	
	constructor(target:string | HTMLElement, config: ScrollConfig){
		if (typeof target === "string"){
			target = document.querySelector(target) as HTMLElement;
		}
		if (!target || target.nodeType !==1){
			throw new TypeError("Cannot find correct DOM Element to apply scroll effects, target is :"+ target);
		}
		if (!config.stages.length){
			throw new Error("Cannot find any stage to apply scroll effects, stages is required !");
		}
		target.style.overflow = "hidden";
		
		this.target = target;
		this.animating = false;
		this.switching = false;
		this.activeStageIndex = 0;

		this.initConfig(config);
		this.activateStage();
		this.addEventListeners();
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
			// walk Stage's node, insert 'node' in item
			walkNode(stage.node, node => {
				if (node.nodeType !== 1) return;
				const itemId = (node as HTMLElement).getAttribute("data-scroll-item-id");
				if (itemId){
					const items = stage.stageConfig.items;
					for (let i =0;i<items.length;i++){
						if (items[i].id === itemId){
							(stage.items || (stage.items = [])) && stage.items.push({ ...items[i], node });
						}
					}
				}
				return false;
			});
			// init effect config
			stage.stageConfig.items.forEach(item => {
				const effects = item.effects;
				effects.forEach((effect: Effect) => {
					if (effect.startAt == undefined) effect.startAt = 0;
					if (effect.endAt == undefined) effect.endAt = Number(stage.stageConfig.scrollNumber);
					// process color values
					["start", "end"].forEach((key: "start" | "end") => {
						const value = effect[key];
						try {
							const color = Color(value).rgb().toString();
							effect[key] = color;
						} catch (e){
							// pass other value
						} finally {
							const {
								valueNumList, valueStrList
							} = extractProperty(effect[key]);
							const numSignature = (key + "Numbers") as "startNumbers" | "endNumbers";
							effect[numSignature] = valueNumList;
							effect["strings"] = valueStrList;
						}
					});

				});
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

	activateStage(){
		let activeStage = this.stages[this.activeStageIndex];
		const stageProxy = new Proxy(this, {
			get: function(obj, prop){
				if (prop === "activeStage") return activeStage;
				return obj[prop as keyof Scroll];
			},
			set: function(obj, prop, value){
				if (prop === "activeStage"){
					if (value === activeStage) return;
					const preStage = JSON.parse(JSON.stringify(activeStage));
					activeStage = value;
					obj.activeStageIndex = obj.stages.findIndex(stage => stage === value);
					obj.handleStageChange();
					// dispatch stage-change Event
					(obj.target as Node).dispatchEvent(new CustomEvent("stage-change", {
						detail: {
							previous: {
							  id: preStage.id,
							  node: preStage.node,
							  config: preStage.stageConfig,
							  step: preStage.step
							},
							current: {
							  id: value.id,
							  node: value.node,
							  config: value.stageConfig
							}
						  }
					}));
				}
				return Reflect.set(obj, prop, value);
			}
		});
		this.stagesProxy = stageProxy;
	}

	handleStageChange(){
		clearTimeout(this.switchTimeout);
		this.switching = true;
		this.stages.forEach(stage => {
			// Currently, stage switching is always vertical
			(stage.node as HTMLElement).style["transform"] = `translateY(${ -this.activeStageIndex * 100}%)`;
		});
		this.switchTimeout = setTimeout(() => {
			this.switching = false;
		}, Number(this.config.stageSwitchTransition)+Number(this.config.disableAfterSwitching));
	}

	addEventListeners(){
		(this.target as HTMLElement).addEventListener("wheel", this.handleScroll.bind(this));
	}

	handleScroll(event: WheelEvent){
		event.preventDefault();
		if (this.animating || this.switching) return;

		// handle Step change
		this.stagesProxy.activeStage.step += event.deltaY > 0 ? 1 : -1;
		this.handleStepChange();
	}

	handleStepChange(){
		const curStage = this.stagesProxy.activeStage as Stage;
		const step = curStage.step as number;
		const stageConfig = curStage.stageConfig as Stage;
		const items = curStage.items;
		const curIndex = this.activeStageIndex;

		if (step > Number(stageConfig.scrollNumber)){
			// change to next Stage
			if (curIndex === this.stages.length - 1){
				(this.target as HTMLElement).dispatchEvent(new CustomEvent("scroll-end", {
					detail: {}
				}));
				return;
			}
			// change
			this.setActiveStage(this.stages[this.activeStageIndex+1].id, true);
		} else if (step<0){
			// change to previous Stage
			if (curIndex === 0){
				(this.target as HTMLElement).dispatchEvent(new CustomEvent("scroll-end", {
					detail: {}
				}));
				return;
			}
			// change
			this.setActiveStage(this.stages[this.activeStageIndex+1].id, true);
		} else {
			// change Step
			clearTimeout(this.animatingTimeout);
			this.animating = true;
			items.forEach(item => {
				(item.node as HTMLElement).style.transition = `${ stageConfig.transition }ms ${ stageConfig.easing }`;
				item.effects.forEach(effect => {
					(item.node as HTMLElement).style[effect.property as any] = Scroll.getCurrentStyleValue(effect, step);
				});
			  });
			this.animatingTimeout = setTimeout(() => {
				this.animating = false;
			}, Number(stageConfig.transition));
		}
	}

	setActiveStage(id:string, changeByScroll = false) {
		if (this.stagesProxy.activeStage.id === id) return;
		const oldIndex = this.activeStageIndex;
		this.stagesProxy.activeStage.step = 0;
		let newStage : Stage;
		for (let i =0;i<this.stages.length;i++){
			const stage=this.stages[i];
			if (stage.id === id){
				newStage = stage;
			}
		}
		const newIndex = this.stages.findIndex(stage => stage === newStage);
		if (changeByScroll) {
			newStage.step = oldIndex < newIndex
				? 0
				: Number(newStage.stageConfig.scrollNumber);
			this.stagesProxy.activeStage = newStage;
			this.handleStepChange();
		} else {
			this.stagesProxy.activeStage = newStage;
			this.handleStepChange();
		}
	}

	static getCurrentStyleValue(effect:Effect, step:number) :string{
		const { startAt, endAt, startNumbers, endNumbers, strings, isColor } = effect;
		step = Math.min(endAt, Math.max(startAt, step));
		let result = strings[0];
		let alphaIndex = -1;
		if (startNumbers && startNumbers.length > 0) {
		  startNumbers.forEach((startNumber, index) => {
				if ((/rgb/).test(strings[index])) alphaIndex = index + 3;
				let stepNumber = startNumber + (step - startAt) *
			  (endNumbers[index] - startNumber) / (endAt - startAt);
				if (isColor && index !== alphaIndex) stepNumber = Math.round(stepNumber);
				result += `${ stepNumber }${ strings[index + 1] }`;
		  });
		}
		return result;
	}
}

export default Scroll;