---
layout: take5-raw
id: GYM-5034
permalink: /courses/take5/gym-5034
---

Ethan Marcotte: Using CSS to set the size of our text is one of the most important fundamental web design skills, and it’s probably one of the first things you learned how to do. However, it turns out that one of the most popular ways to set font sizes has some pretty significant drawbacks for our users. Let’s explore why, and then I’ll help you learn an alternative way to create web pages that are more readable and accessible for all.

In this example, you can see me experimenting with a few treatments of the headlines in this article. As you can see, all the text sizes are set in pixels. This is pretty common as pixels are familiar units of measurement. They’re easy for designers to visualize, but they have a pretty sizeable drawback.

If a user wants to bump up the font size in their browser, (Big Idea) **any type set in pixels might not change**. Here, I’m increasing the base font size in Firefox to make a page more readable. But as you can see, the demo page I’ve created doesn’t budge, and that’s because all the text has been typeset with pixels.

Now let’s compare that with another web page. Just as before, I’m resizing my browser’s base font size to make the design more readable, and the design scales its font sizes up or down proportionally. This is important because some users may prefer larger (or smaller) text. Additionally, any users who have vision impairments will benefit.

So, let’s make your sample design more user-friendly. To do that, you’re going to replace your pixel based font sizes with proportional font sizes, specifically the `rem` unit. If you want to follow along, you can use [this URL][1]{: target="_blank" rel="noopener"} on CodePen. And if you’d like to skip ahead to the [finished version][2]{: target="_blank" rel="noopener"}, that’s available on CodePen, too. Both of these links are also available in the [**Resources**](#tutorial-resources) section for this video.

Let’s start by swapping out your body’s font size for something more proportional, try setting the font size to **100%** nothing visibly changed, or did it? Now, when you change your browser’s font size, all of the body text — everything except your headlines and drop caps — scales along with whatever you’ve set in the browser. *Neat.* Basically, font size 100% ensures that your designs will have a baseline font size that matches whatever the user sets in their browser.

With that in place, you need a way to convert the pixel values and the rest of your design to something more flexible. Instead of picking random numbers, let’s use a handy little formula. Specifically, that’s **target divided by context equals result** (Target ÷ Context = Result). You want to take your current pixel values and treat them as a target you want to aim for. You can then divide that target by the font size of its container or context, and that will give you the proportional result you can drop into your CSS. Let’s give it a shot.

Let’s start with your `h1`, which is the headline at the top of the article. It starts at 40 pixels on smaller screens and then jumps up to 64 pixels on wider ones. Those are your target pixel values. Now all modern browsers and devices start with a default baseline font size preference of 16 pixels. That’s the context.

```css
h1 {
  font-size: 40px;
}

@media (min-width: 40em) {

  h1 {
    font-size: 64px;
  }

}
```

So, if we plug those values into your formula, we get **2.5** and **4** are your proportional results, which you can drop directly into your CSS, replacing those pixel-based font sizes with rem units.


```css
h1 {
  font-size: 2.5rem;
}

@media (min-width: 40em) {

  h1 {
    font-size: 4rem;
  }

}
```

The `rem` unit works by setting type relative to the browser’s default font size. If your browser has a default size of 16 pixels, then 1 rem equals 16 pixels, 2 rems is 32 pixels, and so on. As you can see, your headline looks exactly the same as before with the browser’s default font size. But if you change your preferences, then the headline’s font size scales proportionately. *Neat*.

Now that you converted the `h1`, you can update the rest of your text with the exact same conversion approach. Here are the current pixel-driven font sizes for your headline and your footer. As before, these are the target pixel values. And just as before, you’ll divide them against the base font size, 16 pixels, which is the context. And that’ll give you the proportional results we need.

```css
h2 {
  font-size: 24px;
}

h3 {
  font-size: 20px;
}

h4 {
  font-size: 16px;
}

.drop {
  font-size: 96px;
}

.gallery,
.article-body {
  margin: 64px 0;
}

footer {
  font-size: 12px;
  padding: 48px 16px;
}
```

Having gotten the math out of the way, let’s drop those values into your CSS as rem units. With those in place, you’ve got all of your text — the headlines, and your footer — scaling along with your users’ preferences.

```css
h2 {
  font-size: 1.5rem;
}

h3 {
  font-size: 1.25rem;
}

h4 {
  font-size: 1rem;
}

.drop {
  font-size: 6rem;
}

footer {
  font-size: 0.75rem;
  padding: 48px 16px;
}
```

Throughout this lesson, you’ve been focused on proportional font sizes, but this kind of flexible thinking can apply to other parts of your designs too. For example, you’ve got some pretty significant margins, paddings, and widths in your design.

```css
.gallery,
.article-body {
  margin: 64px 0;
}

footer {
  font-size: 12px;
  padding: 48px 16px;
}

footer p {
  max-width: 480px;
}
```

As before, with a little quick math, you can drop those rems into your design.

```css
.gallery,
.article-body {
  margin: 4rem 0;
}

footer {
  font-size: 0.75rem;
  padding: 3rem 1rem;
}

footer p {
  max-width: 40rem;
}
```

And now you’ve got a responsive layout that’s built not just with flexible grids but with flexible user-friendly type sizes as well.

*Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][3] as well as the entire [course catalog][4] here at Gymnasium.

[1]: https://cdpn.io/ZEbXxeX
[2]: https://cdpn.io/bGVovRp
[3]: https://thegymnasium.com/courses/take5
[4]: https://thegymnasium.com/courses
