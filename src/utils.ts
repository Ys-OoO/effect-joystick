import type { CubicBezier } from "./scroll";

const cubicBezierDefault :CubicBezier ={
	x1: 0,
	y1: 0,
	x2: 1,
	y2: 1
};

export function transformCubicBezier(point: CubicBezier = cubicBezierDefault):string{
	const controlPoint = { ...cubicBezierDefault, ...point };
	return `cubic-bezier(${controlPoint.x1}, ${controlPoint.y1}, ${controlPoint.x2}, ${controlPoint.y2})`;
}

export function merge(target:object, sources:Array<object>){
	for (let i = 0, j = sources.length; i < j; i++) {
		const source = sources[i] || {};
		for (const prop in source) {
			if (source.hasOwnProperty(prop)) {
				const value = source[prop];
				if (value !== undefined) {
					target[prop] = value;
				}
			}
		}
	}
	return target;
};