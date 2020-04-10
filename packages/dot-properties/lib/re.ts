

export const reNonLatin1 = /([\u0100-\u{10FFFF}])/gu;

export const reNonPrintable1 = /[\0-\x08\x0B\x0E-\x1F\x7F-\xA0\u0100-\u{10FFFF}]/gu;

export const reNonPrintable2 = /[\0\x08\x0B\x0E-\x1F\x2D]/gu;

