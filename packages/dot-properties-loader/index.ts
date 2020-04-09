/**
 * Created by user on 2020/4/9.
 */
import { ITSRequireAtLeastOne } from 'ts-type';
import { readFile, readFileSync, realpathSync, writeFile, writeFileSync } from 'fs';
import { parse, Tree, stringify, StringifyOptions, Line, parseLines } from 'dot-properties/lib';

export class DotProperties
{
	file: string;
	#source: Buffer;
	#tree: Tree;
	#lines: Line[];
	#options: {
		disableEscape?: boolean,
	};

	constructor(options: ITSRequireAtLeastOne<{
		file?: string,
		source?: string | Buffer,
		disableEscape?: boolean,
	}>)
	{
		let source: Buffer = options.source as any;

		if (source !== null && source !== undefined)
		{
			if (!(source instanceof Buffer))
			{
				source = Buffer.from(source)
			}
		}
		else
		{
			let file = options.file;
			try
			{
				file = realpathSync(file)
			}
			catch (err)
			{}
			source = readFileSync(this.file = file);
		}

		this.#source = source;

		this.#tree = parse(this.#source.toString())
		this.#lines = parseLines(this.#source.toString())

		this.#options = {
			disableEscape: options.disableEscape,
		}
	}

	get tree()
	{
		return this.#tree
	}

	get lines()
	{
		return this.#lines
	}

	get(key: string, defaultValue: string)
	{
		return this.#tree[key] ?? defaultValue;
	}

	set(key: string, value: string)
	{
		this.#tree[key] = value;

		return this;
	}

	toString()
	{
		return this.stringify();
	}

	refresh()
	{
		this._lines();

		return this;
	}

	protected _lines()
	{
		const tree = {
			...this.#tree,
		};

		const lines = this.#lines.map(line =>
		{
			if (typeof line === 'string')
			{
				return line
			}

			let [key, value] = line;

			if (key in this.#tree)
			{
				// @ts-ignore
				value = this.#tree[key]
			}

			delete tree[key];

			this.#tree[key] = value;
			return [key, value]
		})

		this.#lines = lines;

		return {
			tree,
			lines,
		}
	}

	stringify(options?: StringifyOptions)
	{
		const { lines, tree } = this._lines();

		let newLines = [
			...lines,
			...Object.entries(tree),
		].reduce((newLines, line) => {

			if (typeof line === 'string')
			{
				newLines.push(line);
			}
			else if (this.#options.disableEscape)
			{
				newLines.push(line as string[]);
			}
			else
			{
				newLines.push([line[0], escape(line[1] as string)]);
			}

			return newLines
			}, [] as Line[])
		;

		return stringify(newLines, {
			lineWidth: null,
			...(options || {}),
		})
	}

	save(opts?: {
		file?: string,
		options?: StringifyOptions
	})
	{
		writeFileSync(opts?.file ?? this.file, this.stringify(opts?.options))

		return this;
	}

}

export function escape(str: string)
{
	return str.replace(/([^\x00-\xFF])/ug, ($0, $1: string) => {
		return '\\u' + $1.codePointAt(0).toString(16)
	});
}

export default DotProperties
