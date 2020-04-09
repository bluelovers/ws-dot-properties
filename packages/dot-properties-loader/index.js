"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var _source, _tree, _lines_1, _options;
exports.__esModule = true;
exports.DotProperties = void 0;
var fs_1 = require("fs");
var dot_properties2_1 = require("dot-properties2");
var DotProperties = /** @class */ (function () {
    function DotProperties(options) {
        _source.set(this, void 0);
        _tree.set(this, void 0);
        _lines_1.set(this, void 0);
        _options.set(this, void 0);
        var source = options.source;
        if (source !== null && source !== undefined) {
            if (!(source instanceof Buffer)) {
                source = Buffer.from(source);
            }
        }
        else {
            var file = options.file;
            try {
                file = fs_1.realpathSync(file);
            }
            catch (err) { }
            source = fs_1.readFileSync(this.file = file);
        }
        __classPrivateFieldSet(this, _source, source);
        __classPrivateFieldSet(this, _tree, dot_properties2_1.parse(__classPrivateFieldGet(this, _source).toString()));
        __classPrivateFieldSet(this, _lines_1, dot_properties2_1.parseLines(__classPrivateFieldGet(this, _source).toString()));
        __classPrivateFieldSet(this, _options, {});
    }
    Object.defineProperty(DotProperties.prototype, "tree", {
        get: function () {
            return __classPrivateFieldGet(this, _tree);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(DotProperties.prototype, "lines", {
        get: function () {
            return __classPrivateFieldGet(this, _lines_1);
        },
        enumerable: false,
        configurable: true
    });
    DotProperties.prototype.get = function (key, defaultValue) {
        var _a;
        return (_a = __classPrivateFieldGet(this, _tree)[key]) !== null && _a !== void 0 ? _a : defaultValue;
    };
    DotProperties.prototype.set = function (key, value) {
        __classPrivateFieldGet(this, _tree)[key] = value;
        return this;
    };
    DotProperties.prototype.toString = function () {
        return this.stringify();
    };
    DotProperties.prototype.refresh = function () {
        this._lines();
        return this;
    };
    DotProperties.prototype._lines = function () {
        var _this = this;
        var tree = __assign({}, __classPrivateFieldGet(this, _tree));
        var lines = __classPrivateFieldGet(this, _lines_1).map(function (line) {
            if (typeof line === 'string') {
                return line;
            }
            var key = line[0], value = line[1];
            if (key in __classPrivateFieldGet(_this, _tree)) {
                // @ts-ignore
                value = __classPrivateFieldGet(_this, _tree)[key];
            }
            delete tree[key];
            __classPrivateFieldGet(_this, _tree)[key] = value;
            return [key, value];
        });
        __classPrivateFieldSet(this, _lines_1, lines);
        return {
            tree: tree,
            lines: lines,
        };
    };
    DotProperties.prototype.stringify = function (options) {
        var _a = this._lines(), lines = _a.lines, tree = _a.tree;
        var newLines = __spreadArrays(lines, Object.entries(tree)).reduce(function (newLines, line) {
            if (typeof line === 'string') {
                newLines.push(line);
            }
            else {
                newLines.push(line);
            }
            return newLines;
        }, []);
        return dot_properties2_1.stringify(newLines, __assign({ lineWidth: null }, (options || {})));
    };
    DotProperties.prototype.save = function (opts) {
        var _a;
        fs_1.writeFileSync((_a = opts === null || opts === void 0 ? void 0 : opts.file) !== null && _a !== void 0 ? _a : this.file, this.stringify(opts === null || opts === void 0 ? void 0 : opts.options));
        return this;
    };
    return DotProperties;
}());
exports.DotProperties = DotProperties;
_source = new WeakMap(), _tree = new WeakMap(), _lines_1 = new WeakMap(), _options = new WeakMap();
exports["default"] = DotProperties;
