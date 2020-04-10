"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reNonPrintable2 = exports.reNonPrintable1 = exports.reNonLatin1 = void 0;
exports.reNonLatin1 = /([\u0100-\u{10FFFF}])/gu;
exports.reNonPrintable1 = /[\0-\x08\x0B\x0E-\x1F\x7F-\xA0\u0100-\u{10FFFF}]/gu;
exports.reNonPrintable2 = /[\0\x08\x0B\x0E-\x1F\x2D]/gu;
//# sourceMappingURL=re.js.map