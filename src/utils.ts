import type { CubicBezier } from "./scroll";

const cubicBezierDefault: CubicBezier ={
	x1: 0,
	y1: 0,
	x2: 1,
	y2: 1
};

export function transformCubicBezier(point: CubicBezier=cubicBezierDefault):string{
	const controlPoint = { ...cubicBezierDefault, ...point };
	return `cubic-bezier(${controlPoint.x1}, ${controlPoint.y1}, ${controlPoint.x2}, ${controlPoint.y2})`;
}

export function walkNode<T extends ChildNode | HTMLElement>(nodes: T[] | T, cb: (node:T) => boolean): any {
	if (!("length" in nodes)){
		nodes = [nodes];
	}

	nodes = nodes.slice();

	while (nodes.length){
		const node = nodes.shift();
		const shouldBreak = cb(node);
		if (shouldBreak) return;

		if (node.childNodes && node.childNodes.length){
			nodes = Array.from(node.childNodes).slice().concat(nodes) as T[];
		}
	}
}

export function isHexColor(color: string): boolean {
	const hexPattern = /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/;
	return hexPattern.test(color);
}

export function isHSLColor(color: string): boolean {
	const hslPattern = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3}|[0-9.]+)%\s*,\s*(\d{1,3}|[0-9.]+)%\s*\)$/;
	return hslPattern.test(color);
}

const numberRegExp = new RegExp(/-?\d+(?:\.\d+)?/, "g");
export function extractProperty(value:string){
	const valueNumList = (value.match(numberRegExp) || []).map(n => Number(n));
	const valueStrList = value.split(numberRegExp);
	return {
		valueNumList,
		valueStrList,
	};
}