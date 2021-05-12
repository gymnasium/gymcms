---
layout: take5-raw
course_ID: GYM-5004
permalink: /courses/take5/gym-5004
---

In today’s Take 5, <cite>Working with CSS Feature Queries</cite>, you’re going to learn how to use cutting edge CSS features for modern browsers while simultaneously making sure that older browsers have a decent visual fallback.

[This is the project on CodePen][1]{: target="_blank" rel="noopener"} you’ll be working with. And [here’s the URL][1]{: target="_blank" rel="noopener"}, which you can also find linked within the **Resources** section for this video. In the HTML, there is an `h1` tag with the class of `clip`. And in the CSS, you have the styles for this heading as well as the `clip` class.

Now the CSS uses `-webkit-background-clip` and `-webkit-text-fill-color` to create this cool effect where we see the background image being clipped by the word(s), **Feature Queries**. However, this tutorial isn’t about making that effect. It’s about testing whether a browser supports these two WebKit features, which are relatively new.

So here’s this page in IE9, and I think you’ll agree this is not a good look. The fallback appearance here is pretty bad, in fact, almost unreadable. Back in our code, we can see why. IE9 is fine with all the styles inside the `h1`, but when it hits the `clip` class selector, it freaks out and simply ignores it. So just to be clear, older versions of Chrome, Firefox, Safari will all have similar problems, not just IE.

Enter the Feature Query, which works like this. First, it tests whether a browser supports a specific feature or features. And then if the feature or features are supported, specific CSS rules are applied.

So now you’re going to write one. Immediately above the `clip` class selector, *type* the following: `@supports (-webkit-background-clip: text) and (-webkit-text-fill-color: transparent)`. You’ll also need to *type* a left curly brace like so: `@supports (-webkit-background-clip: text) and (-webkit-text-fill-color: transparent) {`. If your code editor automatically adds one, simply cut and paste it to the very end. And now your original style is nested inside a feature query. *Congratulations, you are almost done.*

The syntax can be interpreted like so. If the support for both this feature and this feature are true, then go ahead and apply whatever CSS styles are inside. And yet if you tested this page right now, it would still look like this because the `h1` has a background image style applied to it. You simply need to cut and paste this style into your feature query, and it will be ignored by a browser that does not support these features or simply doesn’t understand what a feature query is.

So if you’re using a modern browser, absolutely nothing has changed visually at this point. Awesome tutorial, right? You’ve done nothing. Well, actually, you have. Notice that I put this background style before the two WebKit styles. But if I were to put it here at the end, I’m in a world of hurt. My text, in effect, disappears. That’s because your background style is now overriding these two, which you don’t want. So go ahead and put it back.

**The big idea here is that cascade and inheritance is still important inside your feature query, so pay attention to the order of your style rules.** The real test is to see how this works in an older browser. I’m using an online browser testing service, of which there are many out there. However, you shouldn’t test your CodePen. I recommend putting your code into standard HTML and host that elsewhere. CodePen is great. It’s not really designed for cross-browser testing.

Here’s the original HTML and CSS, and here is the final HTML and CSS, which uses the feature query. In this final version, sure, the IE9 user does not get that fancy background clip effect. However, the feature query version is much more readable, and the color of the heading would still `,` (comma) fit into the page design.

So you might be wondering where else feature queries come in useful. One popular use at the moment is for CSS Grid Layout. In this scenario, you could test to see if a browser supports `display: grid`. If it does, then go ahead and use all this cool new grid code. If the browser doesn’t support `display: grid`, then use the fallback.

*So that’s it.* **CSS Feature Queries** will likely become more and more useful as the web continues to become more complex. I hope you learned a little bit about how they worked. If you like this video and want to learn more stuff, be sure to [check out our other Take 5 videos][1] as well as [the rest of the course catalog at Gymnasium][2].

[1]: https://codepen.io/josborn/pen/WWzBwO
[2]: https://thegymnasium.com/take5
[3]: https://thegymnasium.com/courses
