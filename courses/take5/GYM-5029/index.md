---
layout: take5-raw
course_ID: GYM-5029
permalink: /courses/take5/gym-5029
---

Microinteractions are the small everyday events in digital products that can be a great way to enhance the overall experience for your users. Examples include what happens when you favorite a tweet or the way an app updates its interface after a task is completed.

In this tutorial, I’m going to show you exactly how to prototype a microinteraction in Figma. You’ll learn how to make this animation, for when a user hovers over the star and then clicks or taps on it. Now, I know it might not look like much, but that’s actually the whole point. **Microinteractions are supposed to be useful, but not intrusive.**

Now, if you want to follow along, [this is a URL where you can download the project file][1] and this link is also available in the **Resources** section for this video.

So first, let’s examine the **Star-Default** frame, and that has two layers — the star itself, and behind it, **Star-Bg**, a circle that currently has a fill of 0%.

Duplicate the frame by <kbd>Option</kbd> (or <kbd>Alt</kbd> on Windows) clicking it and drag it outside the navbar (**Botton-Nav**), and it’s going to be a little hard to see. But let’s rename this **Star-Hover**. Select the star, change the **Stroke** color to **D0D24B**, which is a bright yellow. Then click on the **Star-Bg** layer, which has that same yellow as a fill, and bring the **Opacity** up to **20%**, and you’ll see the faint yellow circle appear.

Now you want this outline to turn yellow when a cursor is hovering over it. So click on **Star-Default**, click on the **Prototype** tab, and then click and drag this handle to **Star-Hover**. For **Interaction**, you want to change this from **On Click** to **While Hovering** and instead of **Navigate To**, you want **Open Overlay**.

By default, overlays are set to centered, but if you click on this menu (in the **Overlay** panel) and choose **Manual**, the frame of the **Hover-Star** will appear on top of the frame of the **Default-Star**. Let’s test this by playing the prototype. And sure enough, when you hover, the effect appears.

So let’s go back to the project. And for this next behavior, when the user clicks or taps, the star will scale down, fill with yellow, and then scale back up to the original size. So duplicate **Star-Hover** and rename it **Star-Down**. Select the star, go back to **Design** mode and change the **Fill** to **100%**, then click on the **Star-Bg** layer. And for this fill, click the **Eyedropper**, and then click anywhere to get the color of the background.

Next, duplicate this frame and rename it **Star-Focused**. Go back to **Star-Down**, select the star and scale it smaller and from the center by pressing <kbd><kbd>Option</kbd>+<kbd>Shift</kbd></kbd> (or <kbd><kbd>Alt</kbd>+<kbd>Shift</kbd></kbd> on Windows) at the same time, and then click and drag until you get to about a width of **20** (pixels).

Now, all that’s left to do is to hook up all these interactions and set the animations.

So make sure you’re in **Prototype** mode and then drag this handle from **Star-Hover** to **Star-Down**. The **Interaction** should remain **On Click**, but instead of **Navigate To** the behavior should be **Swapped With**. The **Animation** model should be **Smart Animate**, and that’s going to compare the size of the two stars in these two frames and automatically transition between them.

So set the **Easing** to **Ease Out** in the **Time** to **300ms**. Next, drag this handle from **Star-Down** to **Star-Up**. The **Interaction** will be **After Delay** and then **Swap With** — **Star-Focused**. Now it’s important to understand there’s actually two animations here. The first is the delay before the animation starts, and the second is the speed of the animation itself.

And help you visualize them. I’m going to make these a little bit long, so the delay is going to be **800ms** and then **300ms** for the animation. Now, we have one more interaction to add, so click on this handle for **Star-Focused** and drag it to the **Bottom-Nav** frame. The **Interaction** here should be **On Click** and change the **Animation** to **Instant**.

Let’s press **Play** to preview and then click on the empty star. Notice how it shrinks, and then scales back up, filled with yellow, and when you click on it again, it switches back to the default state. So that’s *pretty cool*. However, obviously the animation is way too long. You need your microinteractions to feel snappy or else the user is going to get frustrated.

So back in the project, go ahead and change all of your animation speeds to **50 milliseconds**. And now during preview, this interaction feels very quick and responsive. That motion is almost subliminal, but users are going to sense it, so it’s really worth taking the time to get these things right.

*Thanks* and don’t forget to [watch our other Take 5 video tutorials][2] and [check out the entire course catalog at Gymnasium][3].

[1]: https://gymnasium.github.io/take5/gym-5029.zip
[2]: https://thegymnasium.com/courses/take5
[3]: https://thegymnasium.com/courses
