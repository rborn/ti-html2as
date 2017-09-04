# HTML to Attributed String

[![Dependencies](https://david-dm.org/fokkezb/ti-html2as/status.svg?style=flat-square)](https://david-dm.org/fokkezb/ti-html2as#info=dependencies)
[![Dev Dependencies](https://david-dm.org/fokkezb/ti-html2as/dev-status.svg?style=flat-square)](https://david-dm.org/fokkezb/ti-html2as#info=devDependencies) [![Build Status](https://travis-ci.org/FokkeZB/ti-html2as.svg?branch=master)](https://travis-ci.org/FokkeZB/ti-html2as)

HTML to [Ti.UI.AttributedString](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.AttributedString) parser for [Titanium](http://appcelerator.com/titanium).

## Screencast

![screencast](screencast.gif)

## Usage
A packaged *CommonJS* module can be found via [Releases](https://github.com/fokkezb/ti-html2as/releases). Follow the guide on [Using a Module](http://docs.appcelerator.com/titanium/latest/#!/guide/Using_a_Module) or use gitTio:

	gittio install nl.fokkezb.html2as

The module exports a single function that takes an HTML string and a callback to receive an error or [Ti.UI.AttributedString](http://docs.appcelerator.com/platform/latest/#!/api/Titanium.UI.AttributedString) object.

```
var html2as = require('nl.fokkezb.html2as');

html2as(
	'<font size="17" face="AmericanTypewriter">Hello <b>Bold</b> <a href="http://tidev.io">World</a></font>',
	function(err, as) {

		if (err) {
			console.error(err);

		} else {

			var label = Titanium.UI.createLabel({
				attributedString: as
			});

			label.addEventListener('link', function(e) {
				alert('Longtap on link to: ' + e.url);
			});

			view.add(label);
		}
	}
);
```

### Alloy

In Alloy you can use the [XP.UI](https://github.com/FokkeZB/UTiL/blob/master/docs/xp.ui.md#tag-label) CommonJS module to emulate the `html` attribute Android has for `<Label />`:

```
<Alloy>
	<Window>
		<Label module="xp.ui" html="<font size=17>Hello <b>Bold</b> <font color=#FF0000>World!</font></font>" />
	</Window>
</Alloy>
```

Or you can use the [Widget](https://github.com/FokkeZB/nl.fokkezb.html2as.widget), which has the advantage that you can set the `html` property in a later stage as well:

```
<Alloy>
	<Window>
		<Widget src="nl.fokkezb.html2as.widget" html="<font size=17>Hello <b>Bold</b> <font color=#FF0000>World!</font></font>" />
	</Window>
</Alloy>
```

## Supported tags and attributes

Standard (old) HTML:

* `<strong>`, `<b>`
* `<u>`
* `<em>`, `<i>`
* `<strike>`, `<del>`, `<s>`
* `<font face="Arial" size="12" color="red">`
* `<a href="http://appcelerator.com">`

Hyperlink color:

* `<a color="red" href="http://appcelerator.com">`

Adding html to strings.xml with CDATA:

* `<string name="intro"><![CDATA[<a color="#FFFFFF" href="https://github.com/FokkeZB/ti-html2as">html2as</a>.]]></string>`

Non-standard:

* `<effect>` (letterpress-style)
* `<kern value="10">` (spacing between characters)
* `<expansion value="0.5">` (stretch text horizontally)

## Custom matcher
The optional custom matcher allows parsing of non-standard tags and attributes.

The function needs to return an object containing two properties:

* `parameters` {Object} the parameters property passed into the function with any additions
* `continue` {Boolean} whether to continue through the default matchers

### Custom matcher example
To style H1 tags:

```
var customMatcher = function(node, parameters, outerFont, offset, length, ns) {
  if (node.type === 'tag' && node.name && node.name === 'h1') {
    parameters.attributes.unshift({
      type: ns.ATTRIBUTE_FOREGROUND_COLOR,
      value: Alloy.CFG.h1Color,
      range: [offset, length]
    });
    parameters.attributes.unshift({
      type: ns.ATTRIBUTE_FONT,
      value: {
        fontSize: Alloy.CFG.h1FontSize,
        fontFamily: Alloy.CFG.h1FontFamily
      },
      range: [offset, length]
    });
  }

  return {
    parameters: parameters,
    continue: true
  };
}

var html2as = require('nl.fokkezb.html2as');

html2as(
	'<h1>Hello World</h1>',
	function(err, as) {

		if (err) {
			console.error(err);
		} else {
			view.add(Titanium.UI.createLabel({
				attributedString: as
			}));
		}
	},
	customMatcher
);
```

## Example
The [example](example) folder includes a Titanium project demonstrating the module. To build the module and then run the example project use the included grunt tasks:

```
npm install
grunt
```

## Changelog

* 1.3.1: Fixes #21
* 1.3.0: Adds support for `Ti.UI.AttributedString`, backwards compatible with `Ti.UI.iOS.AttributedString`.
* 1.2.0: Adds [support for HTML entities](https://github.com/FokkeZB/ti-html2as/pull/5)
* 1.1.0: Updated for Titaniumifier 1.0.0
* 1.0.0: Initial version

## Issues

Please report issues and features requests in the repo's [issue tracker](https://github.com/fokkezb/ti-html2as/issues).


## Credits

* [@patrickknaap](https://github.com/patrickknaap) for adding support of HTML entities
* [@fb55](https://github.com/fb55) for [htmlparser2](https://github.com/fb55/htmlparser2)
* [@smclab](https://github.com/smclab/titaniumifier) for [titaniumifier](https://github.com/smclab/titaniumifier)


## License

See [LICENSE](LICENSE).
