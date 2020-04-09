"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
};
var _source, _tree, _lines_1, _options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.escape = exports.DotProperties = void 0;
const fs_1 = require("fs");
const lib_1 = require("dot-properties/lib");
class DotProperties {
    constructor(options) {
        _source.set(this, void 0);
        _tree.set(this, void 0);
        _lines_1.set(this, void 0);
        _options.set(this, void 0);
        let source = options.source;
        if (source !== null && source !== undefined) {
            if (!(source instanceof Buffer)) {
                source = Buffer.from(source);
            }
        }
        else {
            let file = options.file;
            try {
                file = fs_1.realpathSync(file);
            }
            catch (err) { }
            source = fs_1.readFileSync(this.file = file);
        }
        __classPrivateFieldSet(this, _source, source);
        __classPrivateFieldSet(this, _tree, lib_1.parse(__classPrivateFieldGet(this, _source).toString()));
        __classPrivateFieldSet(this, _lines_1, lib_1.parseLines(__classPrivateFieldGet(this, _source).toString()));
        __classPrivateFieldSet(this, _options, {
            disableEscape: options.disableEscape,
            escapeFn: options.escapeFn,
        });
    }
    get tree() {
        return __classPrivateFieldGet(this, _tree);
    }
    get lines() {
        return __classPrivateFieldGet(this, _lines_1);
    }
    get(key, defaultValue) {
        var _a;
        return (_a = __classPrivateFieldGet(this, _tree)[key]) !== null && _a !== void 0 ? _a : defaultValue;
    }
    set(key, value) {
        __classPrivateFieldGet(this, _tree)[key] = value;
        return this;
    }
    toString() {
        return this.stringify();
    }
    refresh() {
        this._lines();
        return this;
    }
    _lines() {
        const tree = {
            ...__classPrivateFieldGet(this, _tree),
        };
        const lines = __classPrivateFieldGet(this, _lines_1).map(line => {
            if (typeof line === 'string') {
                return line;
            }
            let [key, value] = line;
            if (key in __classPrivateFieldGet(this, _tree)) {
                // @ts-ignore
                value = __classPrivateFieldGet(this, _tree)[key];
            }
            delete tree[key];
            __classPrivateFieldGet(this, _tree)[key] = value;
            return [key, value];
        });
        __classPrivateFieldSet(this, _lines_1, lines);
        return {
            tree,
            lines,
        };
    }
    stringify(options) {
        var _a;
        const { lines, tree } = this._lines();
        const { escapeFn = (_a = __classPrivateFieldGet(this, _options).escapeFn) !== null && _a !== void 0 ? _a : escape, disableEscape = __classPrivateFieldGet(this, _options).disableEscape } = options || {};
        let newLines = [
            ...lines,
            ...Object.entries(tree),
        ].reduce((newLines, line) => {
            if (typeof line === 'string') {
                newLines.push(line);
            }
            else if (disableEscape) {
                newLines.push(line);
            }
            else {
                newLines.push([line[0], escapeFn(line[1])]);
            }
            return newLines;
        }, []);
        return lib_1.stringify(newLines, {
            lineWidth: null,
            ...(options || {}),
        });
    }
    save(opts) {
        var _a;
        fs_1.writeFileSync((_a = opts === null || opts === void 0 ? void 0 : opts.file) !== null && _a !== void 0 ? _a : this.file, this.stringify(opts === null || opts === void 0 ? void 0 : opts.options));
        return this;
    }
}
exports.DotProperties = DotProperties;
_source = new WeakMap(), _tree = new WeakMap(), _lines_1 = new WeakMap(), _options = new WeakMap();
function escape(str) {
    return str.replace(/([^\x00-\xFF])/ug, ($0, $1) => {
        return '\\u' + $1.codePointAt(0).toString(16);
    });
}
exports.escape = escape;
exports.default = DotProperties;
//# sourceMappingURL=index.js.map