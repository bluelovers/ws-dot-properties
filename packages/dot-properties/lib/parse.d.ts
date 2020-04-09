import { Node, INodes } from './ast';
import type { ILine, ITree } from './types';
export declare function atComment(src: any, offset: any): boolean;
export declare function atLineEnd(src: any, offset: any): boolean;
export declare function endOfIndent(src: any, offset: any): any;
export declare function endOfComment(src: any, offset: any): any;
export declare function endOfKey(src: any, offset: any): any;
export declare function endOfSeparator(src: any, offset: any): any;
export declare function endOfValue(src: any, offset: any): any;
export declare function unescape(str: any): any;
/**
 * Splits the input string into an array of logical lines
 *
 * Key-value pairs are `[key, value]` arrays with string values. Escape
 * sequences in keys and values are parsed. Empty lines are included as empty
 * strings, and comments as strings that start with `#` or `!` characters.
 * Leading whitespace is not included.
 */
export declare function parseLines(str: string, ast?: false): ILine[];
/**
 * Splits the input string into an array of AST nodes
 **/
export declare function parseLines(src: string, ast: true): INodes[];
export declare function addPair(res: any, key: any, value: any, pathSep: any): void;
/**
 * Parses an input string read from a .properties file into a JavaScript Object
 *
 * If the second `path` parameter is true, dots `.` in keys will result in a
 * multi-level object (use a string value to customise). If a parent level is
 * directly assigned a value while it also has a child with an assigned value,
 * the parent value will be assigned to its empty string `''` key. Repeated keys
 * will take the last assigned value. Key order is not guaranteed, but is likely
 * to match the order of the input lines.
 */
export declare function parse(src: string | ILine[] | Node[], path?: boolean | string): ITree;
export default parse;
