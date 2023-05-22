---
layout: take5-raw
id: GYM-5005
permalink: /courses/take5/gym-5005
---

What’s up, cool cats? Welcome to a very special edition of our Take 5 tutorials, where you’re going to have a gas. *Chill out.* Turn this grayscale image of the famous jazz musician Thelonious Monk into a duotone. Now, in honor of Monk, we’re recording this in our favorite hangout spot. I encourage you to get a refreshing beverage of your own and follow along as we *blow your mind*.

The CSS `mix-blend-mode`s — blend modes are something you might be familiar with from Photoshop, where two layers can be blended together to create a new image. This method is similar but uses straight-ahead HTML and CSS. No software required, you dig?

[This is the project on CodePen][1]{: target="_blank" rel="noopener"} you’ll be working with. And my workspace, well, it looks a little different because I’m using the **DuoTone Dark** theme, which our mean daddy-o at <cite>CodePen</cite>, Chris Coyier, has conveniently added for us.

So thank you, Chris. And [here is the URL][1]{: target="_blank" rel="noopener"} so you can follow along. You can also find the project link in the **Resources** section for this video.

Now, unlike Photoshop, in CSS you don’t have layers. So you’ll see the images nested in the `div`, in the class of duotone. The styles for that class and the image declare the width of the `div` to 600px by 600px. The image is 100% width.

I’ve grouped these styles together for you — `.duotone::before` and `.duotone::after`. These are pseudo elements — special selectors that allow you to insert content into a page using CSS. Typically, you would insert content inside these quotes. But you are leaving it blank. And the rest of this code fills the entire width and height of your `div` with an empty style so you can add a color to it.

The first color will be the highlight of your duotone. So *type* the following. Pause the video if you need to, because *there ain’t no rush, baby*. So check it out. In HSLA, the value 164 is a blue green hue. The first 50% is the saturation. The second 50% is the luminance. And this 1, well, that’s the transparency. This color now covers your image, and you’re going to blend it by typing: `mix-blend-mode: darken;`. Can you dig it, man? That is crazy. It’s all about the maths, my friends. The Darken blend-mode checks to see if the pixels in your color are darker than the ones in the image. If they are darker, then they stay. You see what I’m saying?

So try changing the effect with the luminance value. Try **20%** luminance and your color affects more of the highlights. Now try **80%** and your color affects less. But just go ahead and put that luminance back to the original **50%**. And you can always mess around with it later.

I want you to turn off this effect temporarily by cutting the last bit of commenting code, and pasting it here at the end of this line. You’re going to add a second color by typing the following.

Now, 291 is just a purple-pink kind of color. The saturation and lightness are both 50%. Alpha remains 1. And now go ahead and *type*: `mix-blend-mode: lighten;`. This is the opposite effect. Here, all the pixels in your color that are lighter than the background are retained, which means the color primarily affects the shadows.

Now, what you’re about to do is really something else, man. Cut and paste this comment and go back to the first line, and you’ll see both colors and blend modes interacting with each other. There’s your duotone, and now you’re swinging.

Try changing the lightness value of your highlight from **50%** to **76%**. Out of sight, right? If that’s too much, you can bring the lightness of your shadows down to **25%** for a more chill duotone. It’s all up to you. Just do your thing.

One more thing you’ve got to do, which is kind of a drag — we’ve got to add some browser support for browsers that don’t support this cool effect. *Type* the following line above your highlight code: `@supports (mix-blend-mode: lighten) {`. Be sure to add that closing curly brace `}` at the very end.

And then for the second one, *type* the following: `@supports (mix-blend-mode: darken) {`. And again, be sure to add that closing curly brace `}`. All this does is give browsers that don’t support CSS `mix-blend-mode`s, the original grayscale image. Yeah, it’s a bit of a *bummer*. But at least they’ll get something, right?

*Thanks for watching.* If you like this video and want to learn more, well, [check out our other Take 5 videos][2] as well as [the rest of our gig at Gymnasium][3]

[1]: https://codepen.io/josborn/pen/bydwJo
[2]: https://thegymnasium.com/courses/take5
[3]: https://thegymnasium.com/courses
