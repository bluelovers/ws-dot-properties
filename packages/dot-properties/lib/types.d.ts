/**
 * Created by user on 2020/4/10.
 */
export interface IStringifyOptions {
    /**
     * could also use e.g. '!'
     */
    commentPrefix?: '# ' | string;
    /**
     * YAML 1.1 used '='
     */
    defaultKey?: '' | string;
    /**
     * tabs are also valid
     */
    indent?: '    ' | string | number;
    /**
     * should have at most one = or :
     */
    keySep?: ' = ' | string;
    /**
     * default encoding for .properties files
     */
    latin1?: true | boolean;
    /**
     * use null to disable
     */
    lineWidth?: 80 | number;
    /**
     * Windows uses \r\n
     */
    newline?: '\n' | string;
    /**
     * if non-default, use the same in parse()
     */
    pathSep?: '.' | string;
}
export declare type ILine = string | string[];
export interface ITree {
    [key: string]: string | ITree;
}
