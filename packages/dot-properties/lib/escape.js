"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeNonLatin1 = exports.escape = exports.escapeNonPrintable = void 0;
/**
 * Created by user on 2020/4/10.
 */
const re_1 = require("./re");
function escapeNonPrintable(str, latin1) {
    const re = latin1 !== false ? re_1.reNonPrintable1 : re_1.reNonPrintable2;
    return String(str).replace(re, ch => {
        const esc = ch.codePointAt(0).toString(16);
        return '\\u' + esc.padStart(4, '0');
    });
}
exports.escapeNonPrintable = escapeNonPrintable;
function escape(str, latin1) {
    return escapeNonLatin1(String(str)
        .replace(/\\/g, '\\\\')
        .replace(/\f/g, '\\f')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t'), latin1);
}
exports.escape = escape;
function escapeNonLatin1(str, latin1) {
    if (latin1 === false) {
        return str;
    }
    return String(str)
        .replace(re_1.reNonLatin1, ($0, $1) => {
        return '\\u' + $1.codePointAt(0).toString(16).padStart(4, '0');
    });
}
exports.escapeNonLatin1 = escapeNonLatin1;
//# sourceMappingURL=escape.js.map