---
layout: take5-raw
course_id: GYM-5048
permalink: /courses/take5/gym-5048
---

Clarissa Peterson: In this tutorial, you’ll learn how to hide animations from users who don’t want them and how animations can cause serious problems for certain users with epilepsy. The good news is there’s something in CSS that will help — the **prefers-reduced-motion media query**. It’s available in most major browsers already.

In many operating systems, users have the ability to turn on a reduced motion option in their settings. This is what you’d see on a Mac. In your settings (**System Preferences**), go to **Accessibility**, then **Display**. Click the box for **Reduced motion**. Then on your website, you can do a media query to offer different page styles with less animation to the users who checked that box. In the query part of the media query, you’re using `prefers-reduced-motion: reduce`. Then any code inside the media query is targeted to people who want less motion.

```css
@media (prefers-reduced-motion: reduce) {
  /* turn off animation with CSS here */
}
```

So you’ll use this media query to cancel out animations that are above it in the CSS files or just have animations with less motion. For example, if you use the animation property to style a button earlier in your CSS, you can simply put button animation colon none in your media query, and anyone who has reduced motion turned on will get a nonanimated button. Or if there is something moving on the page, have it move a smaller distance or with less repetition.

```css
@media (prefers-reduced-motion: reduce) {
  button {
    animation: none;
  }
}
```

There is another group of people who can be adversely affected by motion on a web page. And that’s the people who have a type of epilepsy called [photosensitive epilepsy][1]{: target="_blank" rel="noopener"}. (Big Idea) **For people who have this, light that flashes in a certain way, for example, like a strobe light, can cause them to have a seizure. Although some seizures are small and do not cause major problems, other seizures can be life-threatening.**

Just to be clear, most animations and such that you find on the web do not fall into this category. Here’s what you need to look for — if the animation flashes more than three times per second, if the flashing is sufficiently large, which means a large area on the screen flashing is more dangerous than a small area that’s flashing.

Also, it can be worse if there’s a lot of contrast between the colors, or if one of the colors is red. An example might be a banner ad that flashes on and off very quickly to get attention, which I see often. But look at anything on your page that is animated that has motion. And make sure it doesn’t flash that fast. If so, so slow it down or remove it.

The rule is actually [a bit more specific][2]{: target="_blank" rel="noopener"}. So if you have a flashing element you’re unsure of, check out the [**Resources**](#tutorial-resources) section to learn more. (Best Practice) **If you have flashing in a video that you really want to show on the site, you should add a warning at the beginning of the video to warn users that there will be flashing that could possibly trigger seizures. Make sure the video doesn’t autoplay as then it would be easy to miss the warning. Don’t put the warning right before the flashing sequence as the user may not have enough time to stop the video.**

(Big Idea) **Now, I’m not saying don’t use animations at all. I’m just saying you should do it responsibly by using animations when they provide an actual benefit to the user and are unlikely to cause harm.** Animations can do a lot of good things like directing a user’s attention to a certain part of the screen, letting them know something has happened, or showing relationships between things. You can even add animations just to make the site a little more fun as long as they are small, nonrepetitive, and you don’t have too many of them.

For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][3], as well as the entire [course catalog][4] here at Gymnasium.

[1]: https://epilepsy.com/learn/triggers-seizures/photosensitivity-and-seizures
[2]: https://w3.org/tr/understanding-wcag20/seizure-does-not-violate.html
[3]: https://thegymnasium.com/courses/take5
[4]: https://thegymnasium.com/courses
