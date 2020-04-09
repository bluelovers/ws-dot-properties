/**
 * Created by user on 2020/4/10.
 */

import DotProperties from '../index';
import { join, basename } from 'path';

describe('load utf8', () => {

	const dp = new DotProperties({
		file: join(__dirname, './res/example.properties')
	})

	it('should chinese', function ()
	{
		expect(dp.get('kkk2')).toStrictEqual('公審開始')
		expect(dp.get('kkk3')).toStrictEqual('公審開始')
	});

	it('should 德語：Deutsch', function ()
	{
		expect(dp.get('kkk4')).toStrictEqual('Geländesprung')
	});

	it('should jp', function ()
	{
		expect(dp.get('kkk5')).toStrictEqual('実は俺、最強でした？ ～転生直後はどん底スタート、でも万能魔法で逆転人生を上昇中！～')
	});

	it('should MatchSnapshot', function ()
	{
		expect(dp.tree).toMatchSnapshot();
		expect(dp.lines).toMatchSnapshot();
		expect(dp.stringify()).toMatchSnapshot();
	});

});

describe('load', () => {

	testFile(join(__dirname, 'res', 'ActionsBundle.properties'));

	testFile(join(__dirname, 'res', 'AjJpsBundle.properties'));

	testFile(join(__dirname, 'res', 'test.properties'));

	testFile(join(__dirname, 'res', 'example.properties'))

});

function testFile(file: string)
{
	it(basename(file), function ()
	{
		const dp = new DotProperties({
			file
		})

		dp.save({
			file: file + '.tmp.1.properties',
		})

		dp.save({
			file: file + '.tmp.2.properties',
			options: {
				latin1: false,
			}
		})

		expect(dp.tree).toMatchSnapshot();
		expect(dp.lines).toMatchSnapshot();
		expect(dp.stringify()).toMatchSnapshot();

	});
}
