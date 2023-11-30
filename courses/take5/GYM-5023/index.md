---
layout: take5-raw
id: GYM-5023
permalink: /courses/take5/gym-5023
---

In this tutorial, you’re going to use the **HSL color system** in order to create a unique and harmonious color scheme. You’re going to [start with this drab design here][1]{: target="_blank" rel="noopener"} and [end up with the more colorful one as seen here][2]{: target="_blank" rel="noopener"}. Now [here’s the URL to a CodePen project][1]{: target="_blank" rel="noopener"} where you can follow along, although that link is also available in the **Resources** section for this video. And to begin, here is **the magic number 30**. If you forget everything else about this tutorial, just remember that number, and you’re going to see why shortly.

In your CSS, first *find* the `.card` style on **line 20**, then the `background-color` property on **line 23**. Then *replace* that hexadecimal value with the following syntax for an HSL color in CSS: `hsl` parenthesis `210` for the **hue**, then *add* a comma, `100%` for the **saturation**, comma and then `50%` for the **lightness**, being sure to *add* a closing parenthesis if needed.

For example:

```css
background-color: hsl(210,100%,50%);
```

And the result, here we have a nice vibrant blue background.

To explain, let’s begin with a color wheel representing all of the **hue values** in the HSL color system. If you start at **0 degrees**, you get **red**, and as you go around the wheel, you’ll hit all the other colors of the spectrum until you end up back at **red** at **360 degrees**. Dividing the wheel equally by six gives you complementary colors, so 180 degrees from red is pure cyan, magenta and green are also opposites, as are blue and yellow. Dividing these six sections in half gives us 12, and how many degrees would you guess this section is. Yes, you know it, **30**, *our magic number*.

So it turns out *adding* or *subtracting* **30 degrees** will always shift the value to a different color on the spectrum. So **your shade of blue** at **210**, for example, is exactly 30 degrees between pure blue and cyan. Next, **saturation**, which ranges from **0**, completely desaturated to **100%**, the most intense version of your color. And to see this, *reduce* your **saturation** by **30%** to a value of **70%** and then *reduce* it again by **30%** to **40** for a more subdued color.

Now onto **lightness**, which is the amount of white or black mixed in with the color. So **0%** is always going to be **black** and **100%** is always going to be **white**. 50% is going to be the normal or base color. Now here’s an example of how to use **lightness**. So running a color contrast test reveals that white text on this blue background fails when small text is being used, so it’s going to be too hard for some people to read. However, changing the **lightness value** from **50%** to **45%** creates enough contrast to pass. Yay. So this is an example of how HSL color is intuitive. When you separate **hue**, **saturation**, and **lightness** everything becomes easier to understand and control.

Now, by the way, just be sure to *update* this new **lightness value** of **45%** in your code. **The magic number 30** also allows you to create pleasing color combinations. Start with your primary color **210**, and then *find* the two colors 30 degrees to each side, **180** and **240**, and you’ve just entered the world of *color theory*. This is an **analogous color scheme**, which is just fancy talk for saying these three colors work well together. Now there’s entire books written about **color theory** and **color schemes**, so go to the **Resources** section for this video to learn more.

Back in your project, *copy* the HSL color value here, *scroll* down to **line 82** and *replace*s the hexadecimal color for the button. And remember, you have two numbers to choose from. So let’s try **240** first, and I can’t say I love it, so let’s try **180**. Ah, much better. I can work with this, but let’s go ahead and *change* the gray border around the image to see how all three colors work together.

*Scroll* to **line 53** and *replace* this value with your HSL color, and let’s go ahead and use the *240* value that we tried earlier for the button, and although the purple does harmonize, I feel like it could also be improved, and that’s where **saturation** and **lightness** come in. So I’m going to try **25% saturation**, and then *change* the **lightness value** to **65%**. And I feel like that’s in a pretty good place, but you can feel free to experiment on your own.

*That’s it.* If you like this video, be sure to [check out our other Take 5 tutorials][3], as well as [the rest of our course catalog, at Gymnasium][4].

[1]: https://codepen.io/josborn/pen/QWwbxyM
[2]: https://codepen.io/josborn/pen/JjooGVQ
[3]: https://thegymnasium.com/courses/take5
[4]: https://thegymnasium.com/courses
