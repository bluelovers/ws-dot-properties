/// <reference types="node" />
/**
 * Created by user on 2020/4/9.
 */
import { ITSRequireAtLeastOne } from 'ts-type';
import { ITree, IStringifyOptions } from 'dot-properties2';
export declare class DotProperties {
    #private;
    file: string;
    constructor(options: ITSRequireAtLeastOne<{
        file?: string;
        source?: string | Buffer;
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
    stringify(options?: IStringifyOptions): string;
    save(opts?: {
        file?: string;
        options?: IStringifyOptions;
    }): this;
}
export default DotProperties;
