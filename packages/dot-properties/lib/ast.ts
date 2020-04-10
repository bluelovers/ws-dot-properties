export type Type = 'COMMENT' | 'EMPTY_LINE' | 'PAIR'

export type INodes = Comment | EmptyLine | Pair;

export class Node<T extends Type = Type, R extends number[] = [number, number] | [number, number, number, number]>
{
	constructor(public type: T, public range?: R)
	{

	}
}

export class Pair extends Node<'PAIR', [number, number, number, number]>
{
	constructor(public key: string, public value: string, range?: [number, number, number, number])
	{
		super('PAIR', range)
	}

	separator(src: string)
	{
		if (Array.isArray(this.range) && this.range.length >= 3)
		{
			// eslint-disable-next-line no-unused-vars
			const [_, start, end] = this.range
			return src.slice(start, end)
		}
		return null
	}
}

export class Comment extends Node<'COMMENT', [number, number]>
{
	constructor(public comment: string, range?: [number, number])
	{
		super('COMMENT', range)
	}
}

export class EmptyLine extends Node<'EMPTY_LINE', [number, number]>
{
	constructor(range?: [number, number])
	{
		super('EMPTY_LINE', range)
	}
}

export function isPairNode(node: INodes | any): node is Pair
{
	return node?.type === 'PAIR' || (node instanceof Pair)
}

export function isCommentNode(node: INodes | any): node is Comment
{
	return node?.type === 'COMMENT' || (node instanceof Comment)
}

export function isEmptyLineNode(node: INodes | any): node is EmptyLine
{
	return node?.type === 'EMPTY_LINE' || (node instanceof EmptyLine)
}
