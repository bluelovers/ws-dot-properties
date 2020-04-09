/// <reference types="node" />
/**
 * Created by user on 2020/4/9.
 */
import { ITSRequireAtLeastOne } from 'ts-type';
import { ITree, IStringifyOptions, ILine } from 'dot-properties2';
export declare class DotProperties {
    #private;
    file: string;
    constructor(options: ITSRequireAtLeastOne<{
        file?: string;
        source?: string | Buffer;
        disableEscape?: boolean;
        escapeFn?: (value: ILine[1]) => ILine[1];
    }>);
    get tree(): ITree;
    get lines(): (string | string[])[];
    get(key: string, defaultValue?: string): string | ITree;
    set(key: string, value: string): this;
    toString(): string;
    refresh(): this;
    protected _lines(): {
        tree: {
            [x: string]: string | ITree;
        };
        lines: (string | string[])[];
    };
    stringify(options?: IStringifyOptions & {
        disableEscape?: boolean;
        escapeFn?: (value: ILine[1]) => ILine[1];
    }): string;
    save(opts?: {
        file?: string;
        options?: IStringifyOptions;
    }): this;
}
export default DotProperties;
