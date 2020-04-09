"use strict";
/**
 * Created by user on 2020/4/10.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.escapeNonPrintable = void 0;
function escapeNonPrintable(str, latin1) {
    const re = latin1 !== false ? /[^\t\n\f\r -~\xa1-\xff]/g : /[\0-\b\v\x0e-\x1f]/g;
    return String(str).replace(re, ch => {
        const esc = ch.codePointAt(0).toString(16);
        return '\\u' + esc.padStart(4, '0');
    });
}
exports.escapeNonPrintable = escapeNonPrintable;
function escape(str) {
    return String(str)
        .replace(/\\/g, '\\\\')
        .replace(/\f/g, '\\f')
        .replace(/\n/g, '\\n')
        .replace(/\r/g, '\\r')
        .replace(/\t/g, '\\t');
}
exports.escape = escape;
//# sourceMappingURL=escape.js.map