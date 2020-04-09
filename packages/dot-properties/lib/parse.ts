import { Node, Pair, Comment, EmptyLine, INodes } from './ast';
import type { ILine, ITree } from './types';

export function atComment(src, offset)
{
	const ch = src[offset]
	return ch === '#' || ch === '!'
}

export function atLineEnd(src, offset)
{
	const ch = src[offset]
	return !ch || ch === '\r' || ch === '\n'
}

export function endOfIndent(src, offset)
{
	let ch = src[offset]
	while (ch === '\t' || ch === '\f' || ch === ' ')
	{
		offset += 1
		ch = src[offset]
	}
	return offset
}

export function endOfComment(src, offset)
{
	let ch = src[offset]
	while (ch && ch !== '\r' && ch !== '\n')
	{
		offset += 1
		ch = src[offset]
	}
	return offset
}

export function endOfKey(src, offset)
{
	let ch = src[offset]
	while (
		ch &&
		ch !== '\r' &&
		ch !== '\n' &&
		ch !== '\t' &&
		ch !== '\f' &&
		ch !== ' ' &&
		ch !== ':' &&
		ch !== '='
		)
	{
		if (ch === '\\')
		{
			if (src[offset + 1] === '\n')
			{
				offset = endOfIndent(src, offset + 2)
			}
			else
			{
				offset += 2
			}
		}
		else
		{
			offset += 1
		}
		ch = src[offset]
	}
	return offset
}

export function endOfSeparator(src, offset)
{
	let ch = src[offset]
	let hasEqSign = false
	loop: while (
		ch === '\t' ||
		ch === '\f' ||
		ch === ' ' ||
		ch === '=' ||
		ch === ':' ||
		ch === '\\'
		)
	{
		switch (ch)
		{
			case '\\':
				if (src[offset + 1] !== '\n') break loop
				offset = endOfIndent(src, offset + 2)
				break
			case '=':
			case ':':
				if (hasEqSign) break loop
				hasEqSign = true
			// fallthrough
			default:
				offset += 1
		}
		ch = src[offset]
	}
	return offset
}

export function endOfValue(src, offset)
{
	let ch = src[offset]
	while (ch && ch !== '\r' && ch !== '\n')
	{
		offset += ch === '\\' ? 2 : 1
		ch = src[offset]
		if (ch === '\n' && src[offset - 1] === '\r')
		{
			// escaped CRLF line terminator
			offset += 1
			ch = src[offset]
		}
	}
	return offset
}

export function unescape(str)
{
	return str.replace(/\\(u[0-9a-fA-F]{4}|\r?\n[ \t\f]*|.)?/g, (match, code) =>
	{
		switch (code && code[0])
		{
			case 'f':
				return '\f'
			case 'n':
				return '\n'
			case 'r':
				return '\r'
			case 't':
				return '\t'
			case 'u':
			{
				const c = parseInt(code.substr(1), 16)
				return isNaN(c) ? code : String.fromCharCode(c)
			}
			case '\r':
			case '\n':
			case undefined:
				return ''
			default:
				return code
		}
	});
}

/**
 * Splits the input string into an array of logical lines
 *
 * Key-value pairs are `[key, value]` arrays with string values. Escape
 * sequences in keys and values are parsed. Empty lines are included as empty
 * strings, and comments as strings that start with `#` or `!` characters.
 * Leading whitespace is not included.
 */
export function parseLines(str: string, ast?: false): ILine[]
/**
 * Splits the input string into an array of AST nodes
 **/
export function parseLines(src: string, ast: true): INodes[]
export function parseLines(src: string, ast)
{
	const lines = []
	for (let i = 0; i < src.length; ++i)
	{
		if (src[i] === '\n' && src[i - 1] === '\r') i += 1
		if (!src[i]) break
		const keyStart = endOfIndent(src, i)
		if (atLineEnd(src, keyStart))
		{
			lines.push(ast ? new EmptyLine([i, keyStart]) : '')
			i = keyStart
			continue
		}
		if (atComment(src, keyStart))
		{
			const commentEnd = endOfComment(src, keyStart)
			const comment = src.slice(keyStart, commentEnd)
			lines.push(ast ? new Comment(comment, [keyStart, commentEnd]) : comment)
			i = commentEnd
			continue
		}
		const keyEnd = endOfKey(src, keyStart)
		const key = unescape(src.slice(keyStart, keyEnd))
		const valueStart = endOfSeparator(src, keyEnd)
		if (atLineEnd(src, valueStart))
		{
			lines.push(
				ast
					? new Pair(key, '', [keyStart, keyEnd, valueStart, valueStart])
					: [key, ''],
			)
			i = valueStart
			continue
		}
		const valueEnd = endOfValue(src, valueStart)
		const value = unescape(src.slice(valueStart, valueEnd))
		lines.push(
			ast
				? new Pair(key, value, [keyStart, keyEnd, valueStart, valueEnd])
				: [key, value],
		)
		i = valueEnd
	}
	return lines
}

export function addPair(res, key, value, pathSep)
{
	if (!pathSep)
	{
		res[key] = value
		return
	}

	const keyPath = key.split(pathSep)
	let parent = res
	while (keyPath.length >= 2)
	{
		const p = keyPath.shift()
		if (!parent[p])
		{
			parent[p] = {}
		}
		else if (typeof parent[p] !== 'object')
		{
			parent[p] = { '': parent[p] }
		}
		parent = parent[p]
	}
	const leaf = keyPath[0]
	if (typeof parent[leaf] === 'object')
	{
		parent[leaf][''] = value
	}
	else
	{
		parent[leaf] = value
	}
}

/**
 * Parses an input string read from a .properties file into a JavaScript Object
 *
 * If the second `path` parameter is true, dots `.` in keys will result in a
 * multi-level object (use a string value to customise). If a parent level is
 * directly assigned a value while it also has a child with an assigned value,
 * the parent value will be assigned to its empty string `''` key. Repeated keys
 * will take the last assigned value. Key order is not guaranteed, but is likely
 * to match the order of the input lines.
 */
export function parse(src: string | ILine[] | Node[], path?: boolean | string): ITree
{
	const pathSep = path ? (typeof path === 'string' ? path : '.') : null
	const lines = Array.isArray(src) ? src : parseLines(src, false)
	const res = {}
	for (const line of lines)
	{
		if (line instanceof Pair)
		{
			addPair(res, line.key, line.value, pathSep)
		}
    else if (Array.isArray(line)) addPair(res, line[0], line[1], pathSep)
	}
	return res
}

export default parse
