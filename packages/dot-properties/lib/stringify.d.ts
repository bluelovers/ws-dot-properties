import { IStringifyOptions } from './types';
export declare function pairWithSeparator(key: any, value: any, sep: any): string;
export declare function commentWithPrefix(str: any, prefix: any): any;
export declare function getFold({ indent, latin1, lineWidth, newline }: {
    indent: any;
    latin1: any;
    lineWidth: any;
    newline: any;
}): (line: any) => any;
export declare function toLines(obj: any, pathSep: any, defaultKey: any, prefix?: string): any;
/**
 * Stringifies a hierarchical object or an array of lines to .properties format
 *
 * If the input is a hierarchical object, keys will consist of the path parts
 * joined by `.` characters. With array input, string values represent blank or
 * comment lines and string arrays are [key, value] pairs. The characters `\`,
 * `\n` and `\r` will be appropriately escaped. If the `latin1` option is not
 * set to false, all non-Latin-1 characters will also be `\u` escaped.
 *
 * Output styling is controlled by the second options parameter; by default a
 * spaced `=` separates the key from the value, `\n` is the newline separator,
 * lines are folded at 80 characters, with subsequent lines indented by four
 * spaces, and comment lines are prefixed with a `#`. `''` as a key value is
 * considered the default, and set as the value of a key corresponding to its
 * parent object's path.
 */
export declare function stringify(input: any, { commentPrefix, defaultKey, indent, keySep, latin1, lineWidth, newline, pathSep, }?: IStringifyOptions): string;
export default stringify;
