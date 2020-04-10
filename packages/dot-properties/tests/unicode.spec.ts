/**
 * Created by user on 2020/4/10.
 */

import { stringify } from '..';

test('zh', () => {

	testUnicode('选择运行/调试配置', '\\u9009\\u62e9\\u8fd0\\u884c/\\u8c03\\u8bd5\\u914d\\u7f6e')

})

test('ja', () => {

	testUnicode('実は俺、最強でした？ ～転生直後はどん底スタート、でも万能魔法で逆転人生を上昇中！～', '\\u5b9f\\u306f\\u4ffa\\u3001\\u6700\\u5f37\\u3067\\u3057\\u305f\\uff1f \\uff5e\\u8ee2\\u751f\\u76f4\\u5f8c\\u306f\\u3069\\u3093\\u5e95\\u30b9\\u30bf\\u30fc\\u30c8\\u3001\\u3067\\u3082\\u4e07\\u80fd\\u9b54\\u6cd5\\u3067\\u9006\\u8ee2\\u4eba\\u751f\\u3092\\u4e0a\\u6607\\u4e2d\\uff01\\uff5e')

})

function testUnicode(source: string, expected: string)
{
	const res0 = stringify([['', source]], {
		keySep: '',
		lineWidth: null,
	})
	const res1 = stringify([['', source]], {
		latin1: false,
		keySep: '',
		lineWidth: null,
	})

	expect(res0).toStrictEqual(expected)
	expect(res0).not.toStrictEqual(res1)

	expect(res0).toMatchSnapshot()
	expect(res1).toMatchSnapshot()
}
