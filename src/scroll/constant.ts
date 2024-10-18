import { transformCubicBezier } from "../utils";
import type { ScrollConfig, StageConfig } from "./index";

export const defaultScrollConfig : ScrollConfig = {
	stageSwitchTransition: 800,
	stageSwitchDelay: 0,
	stageSwitchEasing: transformCubicBezier(),
	disableAfterSwitching: 500,
	stages: []
};

export const defaultStageConfig: StageConfig = {
	id: "",
	scrollNumber: 1,
	transition: 200,
	easing: "ease",
	items: []
};