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

export function walkNode<T extends ChildNode | HTMLElement>(nodes: T[], cb: (node:T) => void): any {
	if (!("length" in nodes)){
		nodes = [nodes];
	}

	nodes = nodes.slice();

	while (nodes.length){
		const node = nodes.shift();
		cb(node);

		if (node.childNodes && node.childNodes.length){
			nodes = Array.from(node.childNodes).slice().concat(nodes) as T[];
		}
	}
}