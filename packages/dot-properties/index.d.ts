import { Node, Pair, Comment, EmptyLine } from './lib/ast';
import { parse, parseLines } from './lib/parse';
import { stringify } from './lib/stringify';
export type { ILine, ITree, IStringifyOptions } from './lib/types';
export { Node, Pair, Comment, EmptyLine, parse, parseLines, stringify, };
declare const _default: {
    Node: typeof Node;
    Pair: typeof Pair;
    Comment: typeof Comment;
    EmptyLine: typeof EmptyLine;
    parse: typeof parse;
    parseLines: typeof parseLines;
    stringify: typeof stringify;
};
export default _default;
