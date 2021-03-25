---
layout: take5-raw
course_ID: GYM-5036
permalink: /static/take5/gym-5036
---

Ethan Marcotte: You’ve probably seen many drop caps on the web, those big beautiful letters that appear at the beginnings of articles, essays, or blog posts. Let’s explore a common way for creating drop caps, discuss their strengths and weaknesses. And then we’ll look at a more robust approach to creating compelling and accessible drop caps on the web. Here’s our sample design. If you want to follow along, you can use [this URL][1]{: target="_blank" rel="noopener"} on CodePen. And if you’d like to skip ahead to the [finished version][2]{: target="_blank" rel="noopener"}, that’s available on CodePen, too.

Let’s add a drop cap to the very first paragraph. To start add a class of `has-dropcap` to that paragraph.

```markup
<p class="has-dropcap">
```

With that class in place, we can use the `:first-letter` pseudo-selector to style, you guessed it, the first letter of the paragraph. Let’s start small. Add these style rules to your page. Pretty immediate change, right?

```css
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
```

Your `:first-letter` rule turned that first letter of that `has-dropcap` paragraph into a great big *C* styled in a nice sans serif typeface. To complete the effect, add a few more lines to that rule. These additional lines complete our drop cap effect. The big bold letters floated off to the left, and some em-based margins provide a little spacing between it and the surrounding text.

```css
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  float: left;
  margin: 0.1em 0.1em 0.2em 0;
```

Now you might notice that the letter is a little lower in Chrome or Safari than it is in Firefox. This is because in the font, there’s actually some space reserved above and below each letter for ascenders and descenders. One way of closing up that gap involves reducing the `line-height` on the drop cap. It looks a bit better, doesn’t it?

```css
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  float: left;
  margin: 0.1em 0.1em 0.2em 0;
  line-height: 0.65;
```

However, what if you wanted to add a background color to your drop cap? Sadly, that’s broken the illusion. Our background color shows that while the height looks similar, they’re not the same. Firefox has a nice uniform padding all around the letter, but it’s misaligned in Chrome and Safari. It’s possible that these browsers might get patched in the future and properly render our drop caps.

```css
.has-dropcap:first-letter {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  float: left;
  margin: 0.1em 0.1em 0.2em 0;
  line-height: 0.65;
  background-color: #303030;
  color: #FDF9F2;
  padding: 0.1em;
```

But right now, if you need a truly uniform layout across all three browsers a simple tweak of the line height won’t cut it. At this point, let’s explore a different approach. Remove the class from your drop cap paragraph and wrap the first letter of your paragraph in a `span` with the class of `dropcap` like so.

```markup
<p><span class="dropcap">C</span>arol McKinney Highsmith…</p>
```

And then update your `.dropcap` selector to match.

```css
.dropcap {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  float: left;
  margin: 0.1em 0.1em 0.2em 0;
  line-height: 0.65;
  background-color: #303030;
  color: #FDF9F2;
  padding: 0.1em;
```

That’s interesting. By styling a span instead of `:first-letter`, your drop caps are now consistently sized across the three browsers. They’re still too tall, though, but we can clean that up. First, since we’re not using line height to shorten the drop cap anymore, we can set the `line-height` on our `span` element back to **1**.

```css
.dropcap {
  font-family: "Source Sans Pro", Arial, Helvetica, sans-serif;
  font-size: 6rem;
  float: left;
  margin: 0.1em 0.1em 0.2em 0;
  line-height: 1;
  background-color: #303030;
  color: #FDF9F2;
  padding: 0.1em;
```

Now, let’s add some new rules targeting the drop caps `:before` and `:after` pseudo-selectors.

```css
.dropcap:before,
.dropcap:after {
  content: "";
  display: block;
}

.dropcap:before {
  margin-top: -0.2em;
}

.dropcap:after {
  margin-bottom: -0.15em;
}
```

These rules draw the `span` closer to the outer edges of the box, erasing the extra spaces. And you’re done. OK, not quite. Let’s check out what this design sounds like.

Screen Reader: C, arol McKinney Highsmith (born Carol Louise McKinney on 18th, 1946).

Ethan Marcotte: What you just heard was Apple’s VoiceOver screen reader speaking the first word of your article, *Carol*, as if it was two words, *C* followed by *arol*. This is because the screen reader sees that `span` element and treats it as a separate word. To fix this, we’ll need to bolster our design a bit. First, drop this into your CSS.

```css
.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```

Now, go to the HTML for your design and change your drop cap to this.

```markup
<p>
  <span aria-hidden="true">
    <span class="dropcap">C</span>arol
  </span>
  <span class="sr-only">Carol</span> McKinney Highsmith…
</p>
```

*Wow*, yeah. That looks like a lot. But really, there are just two things happening here. First, your drop cap is surrounded with a `span` that has an `aria-hidden` attribute set to `true`. That basically tells assistive technology like screen readers to ignore it. That’ll keep the split word from being read aloud.

```markup
<span aria-hidden="true">
  <span class="dropcap">C</span>arol
</span>
```

The second word has a class of `sr-only` which visually hides the text. But it will be accessible to screen readers, ensuring that they don’t hear *C* followed by *Carol*. They simply read *Carol*.

```markup
<span class="sr-only">Carol</span> McKinney Highsmith…
```

Screen Reader: Carol McKinney Highsmith (born Carol Louise McKinney on 18th, 1946).

Ethan Marcotte: And now, our design’s finished. It looks as good as it sounds. By the way, the [completed project][2]{: target="_blank" rel="noopener"} here on CodePen has both variations I covered in this video, so you can compare, contrast, and experiment with the code on your own. And these are just two different approaches for creating drop caps on the web. Most of the time, `:first-letter` will be all you’ll need for your designs.

But whatever approach you choose, (Big Idea) **it’s important to remember that everyone browses the web differently, and our designs have to be beautiful for them, too.** For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][3] as well as the entire [course catalog][4] here at Gymnasium.

[1]: https://cdpn.io/zYvEWLL
[2]: https://cdpn.io/QWjqmZg
[3]: https://thegymnasium.com/take5
[4]: https://thegymnasium.com/courses
