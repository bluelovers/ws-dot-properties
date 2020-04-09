"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.parseLines = exports.parse = exports.EmptyLine = exports.Comment = exports.Pair = exports.Node = void 0;
const ast_1 = require("./lib/ast");
Object.defineProperty(exports, "Node", { enumerable: true, get: function () { return ast_1.Node; } });
Object.defineProperty(exports, "Pair", { enumerable: true, get: function () { return ast_1.Pair; } });
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return ast_1.Comment; } });
Object.defineProperty(exports, "EmptyLine", { enumerable: true, get: function () { return ast_1.EmptyLine; } });
const parse_1 = require("./lib/parse");
Object.defineProperty(exports, "parse", { enumerable: true, get: function () { return parse_1.parse; } });
Object.defineProperty(exports, "parseLines", { enumerable: true, get: function () { return parse_1.parseLines; } });
const stringify_1 = require("./lib/stringify");
Object.defineProperty(exports, "stringify", { enumerable: true, get: function () { return stringify_1.stringify; } });
exports.default = {
    Node: ast_1.Node,
    Pair: ast_1.Pair,
    Comment: ast_1.Comment,
    EmptyLine: ast_1.EmptyLine,
    parse: parse_1.parse,
    parseLines: parse_1.parseLines,
    stringify: stringify_1.stringify,
};
//# sourceMappingURL=index.js.map