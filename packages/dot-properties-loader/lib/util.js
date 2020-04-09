"use strict";
/**
 * Created by user on 2020/4/10.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = void 0;
function escape(str) {
    return str.replace(/([^\x00-\xFF])/ug, ($0, $1) => {
        return '\\u' + $1.codePointAt(0).toString(16);
    });
}
exports.escape = escape;
//# sourceMappingURL=util.js.map