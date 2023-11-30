---
layout: take5-raw
id: GYM-5035
permalink: /courses/take5/gym-5035
---

Ethan Marcotte: You’ve probably worked with a variety of units in your design. **Pixels**, **percentages**, maybe even the odd **em** or **rem**. In this lesson, we’re going to look at the **viewport units**, `vw` and `vh`, and explore the ways in which they can spice up our designs. If you want to follow along, you can use [this URL][1]{: target="_blank" rel="noopener"} on CodePen. And if you’d like to skip ahead to the [finished version][2]{: target="_blank" rel="noopener"}, that’s available on CodePen, too.

To begin, click on **Change View** and then choose **Full Page View**. Now you see the entire page in your browser. Scroll down to the gallery and resize your browser window a bit. As you can see, we’ve got a flexible, CSS grid-driven layout, and the images scale proportionately as the width of the browser window realizes. But if we make our browser window vertically shorter or taller, those lovely images remain fixed.

Let’s introduce some viewport units to change that. Viewport units are relative to the width or height of the viewport. They’re percentage-based measurements of how tall or how wide your browser window might be. In your CSS, add the following lines.

```css
.gallery-link {
  height: 50vh;
}

.gallery-img {
  object-fit: cover;
}
```

The `object-fit` property tells the images to fully cover the width and height of their containers, the links, and that’s handy because the `height: 50vh;` you’ve just added tells the links they should be 50% the height of the viewport.

Now, if you resize the design vertically, you should see that the gallery is always maintaining a pleasing prominence within the design, no matter how short or tall the window happens to be. Now, you’ll add an `object-position` property to the images, allowing you to maintain a specific focal point. As the image of scale. `object-position` is a very handy property when used in concert with `object-fit`. Feel free to experiment with different values to see what feels best to you.

```css
.gallery-link {
  height: 50vh;
}

.gallery-img {
  object-fit: cover;
  object-position: 50% 30%;
}
```

You might have noticed that the links get too small on shorter viewports. To prevent that, add a `min-height` to the links.

```css
.gallery-link {
  height: 50vh;
  min-height: 20em;
}

.gallery-img {
  object-fit: cover;
  object-position: 50% 30%;
}
```

Now, our viewport units will always have a minimum height of 20 ems, ensuring they’re never unusably small. (Big Idea) **Viewport units aren’t just handy for layout, they can be used for text sizing too.** Take a look at the article headline at the very top of our sample design.

Currently, it’s sized with the rems and a straightforward media query. This provides a nice bump in font size as the screen gets wider.


```css
h1 {
  font-size: 2.5em;
}

@media (min-width: 40em) {

  h1 {
    font-size: 4em;
  }

}
```

Let’s experiment with viewport aware font sizing. Replace those `h1` styles with this. Now, if you resize the design, you’ll see that the typeface is scaling completely fluidly. That’s because the `font size: 5vw;` sets our title’s size to 5% of the viewport width.


```css
h1 {
  font-size: 5vw;
}
```

You may have noticed the title gets too small at narrower widths. While you could introduce a media query to manage this, let’s instead add a `calc` to the mix. Change your font size rule to this. The `calc` looks at very complicated, but in plain language, it says that your headline should be sized at 1.5 rems plus 3% of the viewport’s width.

```css
h1 {
  font-size: calc ( 1.5rem + 3vw );
}
```

In other words, it ensures that your headline has a minimum font size of 1.5 rem. So, on smaller screens, they’re still a lovely, readable title at the top of your design. Let’s turn to the body font sizing now and see if viewport units can be helpful there, too. Start by adding this to your CSS.

```css
body {
  font-size: calc ( 1rem + 0.25vw );
}

h1 {
  font-size: calc ( 1.5rem + 3vw );
}
```
This is a variation on what we introduced to the `h1`, a minimum font-size of 1 rem with a quarter of a percentage of the viewport width added to it. Now we’ve got scaling text throughout our design, but unfortunately, doesn’t feel quite right. It’s a little too ungainly on wider screens and the transition from small screen to widescreen feels a little awkward. Here, let’s turn to a more robust set of constraints, a more advanced technique called **CSS locks**.

(Best Practice) **CSS locks are a technique you can use to create fluid behavior within specific constraints of your page layout.** Let’s take a look at how they work. Add this rule to your CSS. *Yikes*. I realize this looks like a robot just ran through your code there are just two things happening here. 18 pixels in 14 pixels are the maximum and minimum font sizes we’ll be scaling between.

```css
body {
  font-size: calc( 14px + ( 18 - 14 ) * ( ( 100vw - 300px ) / ( 1400 - 300 ) ) );
}

h1 {
  font-size: calc( 1.5rem + 3vw );
}
```

1,400 pixels and 300 pixels are the maximum and minimum viewport sizes. The font size will start scaling at a viewport width of 300 pixels and stop scaling at 1,400 pixels. And now, with our CSS locks in place, we have a nice, gradual transition for a document’s font size. It begins at a minimum width of 14 pixels and scales gently up to 18 pixels as the screen gets wider.

We’ve covered a lot of ground in this lesson, showing different techniques for tuning our designs to the width or height of the viewport. I’m sure you’ll uncover new and exciting ways in your own responsive designs. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][3] as well as the entire [course catalog][4] here at Gymnasium.

[1]: https://cdpn.io/ExVwEop
[2]: https://cdpn.io/WNQZzJR
[3]: https://thegymnasium.com/courses/take5
[4]: https://thegymnasium.com/courses
