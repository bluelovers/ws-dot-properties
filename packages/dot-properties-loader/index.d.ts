/// <reference types="node" />
/**
 * Created by user on 2020/4/9.
 */
import { ITSRequireAtLeastOne } from 'ts-type';
import { Tree, StringifyOptions, Line } from 'dot-properties/lib';
export declare class DotProperties {
    #private;
    file: string;
    constructor(options: ITSRequireAtLeastOne<{
        file?: string;
        source?: string | Buffer;
        disableEscape?: boolean;
        escapeFn?: (value: Line[1]) => Line[1];
    }>);
    get tree(): Tree;
    get lines(): Line[];
    get(key: string, defaultValue?: string): string | Tree;
    set(key: string, value: string): this;
    toString(): string;
    refresh(): this;
    protected _lines(): {
        tree: {
            [x: string]: string | Tree;
        };
        lines: Line[];
    };
    stringify(options?: StringifyOptions & {
        disableEscape?: boolean;
        escapeFn?: (value: Line[1]) => Line[1];
    }): string;
    save(opts?: {
        file?: string;
        options?: StringifyOptions;
    }): this;
}
export declare function escape(str: string): string;
export default DotProperties;
