"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyLine = exports.Comment = exports.Pair = exports.Node = void 0;
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
//# sourceMappingURL=ast.js.map