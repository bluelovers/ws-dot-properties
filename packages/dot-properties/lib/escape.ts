/**
 * Created by user on 2020/4/10.
 */
import { reNonLatin1, reNonPrintable1, reNonPrintable2 } from './re';

export function escapeNonPrintable(str, latin1?: boolean)
{
	const re =
		latin1 !== false ? reNonPrintable1 : reNonPrintable2
	return String(str).replace(re, ch =>
	{
		const esc = ch.codePointAt(0).toString(16)
		return '\\u' + esc.padStart(4, '0')
	})
}

export function escape(str: string, latin1?: boolean)
{
	return escapeNonLatin1(String(str)
		.replace(/\\/g, '\\\\')
		.replace(/\f/g, '\\f')
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
		.replace(/\t/g, '\\t'), latin1)
		;
}

export function escapeNonLatin1(str, latin1?: boolean)
{
	if (latin1 === false)
	{
		return str;
	}

	return String(str)
		.replace(reNonLatin1, ($0, $1: string) =>
		{
			return '\\u' + $1.codePointAt(0).toString(16).padStart(4, '0')
		})
}
