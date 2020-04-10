export declare type Type = 'COMMENT' | 'EMPTY_LINE' | 'PAIR';
export declare type INodes = Comment | EmptyLine | Pair;
export declare class Node<T extends Type = Type, R extends number[] = [number, number] | [number, number, number, number]> {
    type: T;
    range?: R;
    constructor(type: T, range?: R);
}
export declare class Pair extends Node<'PAIR', [number, number, number, number]> {
    key: string;
    value: string;
    constructor(key: string, value: string, range?: [number, number, number, number]);
    separator(src: string): string;
}
export declare class Comment extends Node<'COMMENT', [number, number]> {
    comment: string;
    constructor(comment: string, range?: [number, number]);
}
export declare class EmptyLine extends Node<'EMPTY_LINE', [number, number]> {
    constructor(range?: [number, number]);
}
export declare function isPairNode(node: INodes | any): node is Pair;
export declare function isCommentNode(node: INodes | any): node is Comment;
export declare function isEmptyLineNode(node: INodes | any): node is EmptyLine;
export declare function isNode(node: INodes | any): node is INodes;
