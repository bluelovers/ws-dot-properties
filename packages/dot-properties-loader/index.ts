/**
 * Created by user on 2020/4/9.
 */
import { ITSRequireAtLeastOne } from 'ts-type';
import { readFileSync, realpathSync, writeFileSync } from 'fs';
import { parse, ITree, stringify, IStringifyOptions, ILine, parseLines } from 'dot-properties2';

export class DotProperties
{
	file: string;
	#source: Buffer;
	#tree: ITree;
	#lines: ILine[];
	#options: {};

	constructor(options: ITSRequireAtLeastOne<{
		file?: string,
		source?: string | Buffer,
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

		this.#options = {}
	}

	get tree()
	{
		return this.#tree
	}

	get lines()
	{
		return this.#lines
	}

	get(key: string, defaultValue?: string)
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

	stringify(options?: IStringifyOptions)
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
			else
			{
				newLines.push(line as string[]);
			}

			return newLines
			}, [] as ILine[])
		;

		return stringify(newLines, {
			lineWidth: null,
			...(options || {}),
		})
	}

	save(opts?: {
		file?: string,
		options?: IStringifyOptions
	})
	{
		writeFileSync(opts?.file ?? this.file, this.stringify(opts?.options))

		return this;
	}

}

export default DotProperties
