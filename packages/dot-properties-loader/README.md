# README.md

   load / save java.util.Properties.

## install

```bash
yarn add dot-properties-loader
yarn-tool add dot-properties-loader
yt add dot-properties-loader
```

## demo

```properties
# You are reading the ".properties" entry.
! The exclamation mark can also mark text as comments.
# The key characters =, and : should be written with a preceding
# backslash to ensure that they are properly loaded. However, there
# is no need to precede the value characters =, and : by a backslash.
website = https://en.wikipedia.org/
language = English

# The backslash below tells the application to continue reading
# the value onto the next line.
message = Welcome to \
          Wikipedia!

# Add spaces to the key
key\ with\ spaces = This is the value that could be looked up with \
                    the key "key with spaces".

# Unicode
tab : \u0009

# If you want your property to include a backslash, it should be
# escaped by another backslash
path c:\\wiki\\templates
# However, some editors will handle this automatically

tab1 : \u0009
tab1.a : \u0009
tab1.b : \u0009

kkk2: \u516c\u5be9\u958b\u59cb
kkk3: 公審開始
```

```typescript
import DotProperties from '../index';

let dp = new DotProperties({
	file: './res/example.properties'
})

console.log(dp.tree)
console.log(dp.lines)

dp.set('kkk', '公審開始');

console.log(
	dp.stringify({
	latin1: true,
}))
```

```properties
# You are reading the ".properties" entry.
# The exclamation mark can also mark text as comments.
# The key characters =, and : should be written with a preceding
# backslash to ensure that they are properly loaded. However, there
# is no need to precede the value characters =, and : by a backslash.
website = https://en.wikipedia.org/
language = English

# The backslash below tells the application to continue reading
# the value onto the next line.
message = Welcome to Wikipedia!

# Add spaces to the key
key\ with\ spaces = This is the value that could be looked up with the key "key with spaces".

# Unicode
tab = \t

# If you want your property to include a backslash, it should be
# escaped by another backslash
path = c:\\wiki\\templates
# However, some editors will handle this automatically

tab1 = \t
tab1.a = \t
tab1.b = \t

kkk2 = \\u516c\\u5be9\\u958b\\u59cb
kkk3 = \\u516c\\u5be9\\u958b\\u59cb
kkk = \\u516c\\u5be9\\u958b\\u59cb
```
