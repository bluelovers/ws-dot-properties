"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringify = exports.toLines = exports.getFold = exports.commentWithPrefix = exports.pairWithSeparator = void 0;
const ast_1 = require("./ast");
const escape_1 = require("./escape");
function pairWithSeparator(key, value, sep, latin1) {
    return escape_1.escape(key, latin1).replace(/[ =:]/g, '\\$&') +
        sep +
        escape_1.escape(value, latin1).replace(/^ /, '\\ ');
}
exports.pairWithSeparator = pairWithSeparator;
function commentWithPrefix(str, prefix) {
    return str.replace(/^\s*([#!][ \t\f]*)?/g, prefix);
}
exports.commentWithPrefix = commentWithPrefix;
function getFold({ indent, latin1, lineWidth, newline }) {
    return line => {
        if (!lineWidth || lineWidth < 0)
            return line;
        line = escape_1.escapeNonPrintable(line, latin1);
        let start = 0;
        let split = undefined;
        for (let i = 0, ch = line[0]; ch; ch = line[(i += 1)]) {
            let end = i - start >= lineWidth ? split || i : undefined;
            if (!end) {
                switch (ch) {
                    case '\r':
                        if (line[i + 1] === '\n')
                            i += 1;
                    // fallthrough
                    case '\n':
                        end = i + 1;
                        break;
                    case '\\':
                        i += 1;
                        switch (line[i]) {
                            case 'r':
                                if (line[i + 1] === '\\' && line[i + 2] === 'n')
                                    i += 2;
                            // fallthrough
                            case 'n':
                                end = i + 1;
                                break;
                            case ' ':
                            case 'f':
                            case 't':
                                split = i + 1;
                                break;
                        }
                        break;
                    case '\f':
                    case '\t':
                    case ' ':
                    case '.':
                        split = i + 1;
                        break;
                }
            }
            if (end) {
                let lineEnd = end;
                let ch = line[lineEnd - 1];
                while (ch === '\n' || ch === '\r') {
                    lineEnd -= 1;
                    ch = line[lineEnd - 1];
                }
                const next = line[end];
                const atWhitespace = next === '\t' || next === '\f' || next === ' ';
                line =
                    line.slice(0, lineEnd) +
                        newline +
                        indent +
                        (atWhitespace ? '\\' : '') +
                        line.slice(end);
                start = lineEnd + newline.length;
                split = undefined;
                i = start + indent.length - 1;
            }
        }
        return line;
    };
}
exports.getFold = getFold;
function toLines(obj, pathSep, defaultKey, prefix = '') {
    return Object.keys(obj).reduce((lines, key) => {
        const value = obj[key];
        if (value && typeof value === 'object') {
            return lines.concat(toLines(value, pathSep, defaultKey, prefix + key + pathSep));
        }
        else {
            const k = key === defaultKey ? prefix.slice(0, -pathSep.length) : prefix + key;
            lines.push([k, value]);
            return lines;
        }
    }, []);
}
exports.toLines = toLines;
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
function stringify(input, { commentPrefix = '# ', defaultKey = '', indent = '    ', keySep = ' = ', latin1 = true, lineWidth = 80, newline = '\n', pathSep = '.', } = {}) {
    if (!input)
        return '';
    if (!Array.isArray(input))
        input = toLines(input, pathSep, defaultKey);
    const foldLine = getFold({
        indent,
        latin1,
        lineWidth,
        newline: '\\' + newline,
    });
    const foldComment = getFold({
        indent: commentPrefix,
        latin1,
        lineWidth,
        newline,
    });
    return input
        .map(line => {
        switch (true) {
            case !line:
            case line instanceof ast_1.EmptyLine:
                return '';
            case Array.isArray(line):
                return foldLine(pairWithSeparator(line[0], line[1], keySep, latin1));
            case line instanceof ast_1.Pair:
                return foldLine(pairWithSeparator(line.key, line.value, keySep, latin1));
            case line instanceof ast_1.Comment:
                return foldComment(commentWithPrefix(line.comment, commentPrefix));
            default:
                return foldComment(commentWithPrefix(String(line), commentPrefix));
        }
    })
        .join(newline);
}
exports.stringify = stringify;
exports.default = stringify;
//# sourceMappingURL=stringify.js.map