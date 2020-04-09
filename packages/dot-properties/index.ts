import { Node, Pair, Comment, EmptyLine } from './lib/ast';

import { parse, parseLines } from './lib/parse';

import { stringify } from './lib/stringify';

export type { ILine, ITree, IStringifyOptions } from './lib/types';

export {
	Node,
	Pair,
	Comment,
	EmptyLine,
	parse,
	parseLines,
	stringify,
}

export default {
	Node,
	Pair,
	Comment,
	EmptyLine,
	parse,
	parseLines,
	stringify,
}
