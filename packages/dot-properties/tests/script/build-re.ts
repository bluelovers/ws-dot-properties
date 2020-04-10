import rewritePattern from 'regexpu-core';
import { outputFile } from 'fs-extra';
import { join } from 'path';

const reNonLatin1 = regexpEscape(/([^\p{ASCII}\x00-\xFF])/ug);

const reNonPrintable1 = regexpEscape(/[^\t\n\f\r -~\xa1-\xff]/ug);

const reNonPrintable2 = regexpEscape(/[\x00\-\b\v\x0e-\x1f]/ug);

outputFile(join(__dirname, '../..', 'lib', 're.ts'), `

export const reNonLatin1 = ${reNonLatin1.toString()};

export const reNonPrintable1 = ${reNonPrintable1.toString()};

export const reNonPrintable2 = ${reNonPrintable2.toString()};

`)

export function unicodePropertyEscape(raw: string, flags: string, useUnicodeFlag: boolean = true)
{
	console.dir({
		raw,
		flags,
	})

	return rewritePattern(raw, flags, {
		unicodePropertyEscape: true,
		useUnicodeFlag,
	})
}

export function regexpEscape(re: RegExp)
{
	let ret = unicodePropertyEscape(re.source, re.flags, re.flags.includes('u'))

	console.dir(ret)

	return new RegExp(ret, re.flags)
}

