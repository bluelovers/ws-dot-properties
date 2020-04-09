/**
 * Created by user on 2020/4/10.
 */

export function escapeNonPrintable(str, latin1)
{
	const re =
		latin1 !== false ? /[^\t\n\f\r -~\xa1-\xff]/g : /[\0-\b\v\x0e-\x1f]/g
	return String(str).replace(re, ch =>
	{
		const esc = ch.codePointAt(0).toString(16)
		return '\\u' + esc.padStart(4, '0')
	})
}

export function escape(str)
{
	return String(str)
		.replace(/\\/g, '\\\\')
		.replace(/\f/g, '\\f')
		.replace(/\n/g, '\\n')
		.replace(/\r/g, '\\r')
		.replace(/\t/g, '\\t');
}
