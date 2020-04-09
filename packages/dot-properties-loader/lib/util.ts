/**
 * Created by user on 2020/4/10.
 */

/**
 * @deprecated
 */
export function escape(str: string)
{
	return str.replace(/([^\x00-\xFF])/ug, ($0, $1: string) =>
	{
		return '\\u' + $1.codePointAt(0).toString(16).padStart(4, '0')
	});
}
