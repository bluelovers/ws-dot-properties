import fs from 'fs';
import path from 'path';
import { parse, parseLines, stringify } from '..';

function testCase({
	name,
	root,
	srcPath,
	tgtPath,
	options: { parsePath = false } = {},
})
{
	test(name, () =>
	{
		const src = fs.readFileSync(path.resolve(root, srcPath), 'utf8')
		const tgt = fs.readFileSync(path.resolve(root, tgtPath), 'utf8')
		const exp = JSON.parse(tgt)

		// parse(string): object
		const res = parse(src, parsePath)
		expect(res).toMatchObject(exp)

		// stringify(object): string
		const src2 = stringify(res)
		const res2 = parse(src2, parsePath)
		expect(res2).toMatchObject(exp)

		// parseLines(string, true): Node[]
		const ast = parseLines(src, true)
		const res3 = parse(ast, parsePath)
		expect(res3).toMatchObject(exp)

		// stringify(Node[])
		const src3 = stringify(ast)
		const res4 = parse(src3, parsePath)
		expect(res4).toMatchObject(exp)

		expect(res).toMatchSnapshot()
		expect(res2).toMatchSnapshot()
		expect(res3).toMatchSnapshot()
		expect(res4).toMatchSnapshot()
	})
}

describe('@js.properties', () =>
{
	const root = path.resolve(__dirname, '@js.properties')
	const tests = fs.readdirSync(root).filter(name => /\.properties$/.test(name))
	tests.forEach(name =>
	{
		testCase({
			name,
			root,
			srcPath: name,
			tgtPath: name + '.json',
		})
	})

	testCase({
		name: 'namespaced properties with path',
		root,
		srcPath: 'namespaced.properties',
		tgtPath: 'namespaced.properties.namespaced.json',
		options: { parsePath: true },
	})
})

describe('node-properties-parser', () =>
{
	testCase({
		name: 'test',
		root: path.resolve(__dirname, 'node-properties-parser'),
		srcPath: 'test.properties',
		tgtPath: 'test.json',
	})
})
