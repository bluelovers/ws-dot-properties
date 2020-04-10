"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmptyLineNode = exports.isCommentNode = exports.isPairNode = exports.EmptyLine = exports.Comment = exports.Pair = exports.Node = void 0;
class Node {
    constructor(type, range) {
        this.type = type;
        this.range = range;
    }
}
exports.Node = Node;
class Pair extends Node {
    constructor(key, value, range) {
        super('PAIR', range);
        this.key = key;
        this.value = value;
    }
    separator(src) {
        if (Array.isArray(this.range) && this.range.length >= 3) {
            // eslint-disable-next-line no-unused-vars
            const [_, start, end] = this.range;
            return src.slice(start, end);
        }
        return null;
    }
}
exports.Pair = Pair;
class Comment extends Node {
    constructor(comment, range) {
        super('COMMENT', range);
        this.comment = comment;
    }
}
exports.Comment = Comment;
class EmptyLine extends Node {
    constructor(range) {
        super('EMPTY_LINE', range);
    }
}
exports.EmptyLine = EmptyLine;
function isPairNode(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === 'PAIR' || (node instanceof Pair);
}
exports.isPairNode = isPairNode;
function isCommentNode(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === 'COMMENT' || (node instanceof Comment);
}
exports.isCommentNode = isCommentNode;
function isEmptyLineNode(node) {
    return (node === null || node === void 0 ? void 0 : node.type) === 'EMPTY_LINE' || (node instanceof EmptyLine);
}
exports.isEmptyLineNode = isEmptyLineNode;
//# sourceMappingURL=ast.js.map