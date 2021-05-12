---
layout: take5-raw
course_ID: GYM-5030
permalink: /courses/take5/gym-5030
---

In Figma, overlays are a feature that allow you to place one form of content on top of another. In prototyping, this is typically used to display extra information on the screen, such as a confirmation message, tooltip, or a menu. In this tutorial, you’ll learn the basics of overlays as well as a few advanced tips. If you want to follow along, [this is a URL where you can download the project file][1]. And this link is also available in the **Resources** section for this video.

Now, in the project, I’ve already set up the three frames you’ll be using for a specific interaction. And that interaction is: when the user clicks or taps this **Share** icon, you want this menu to appear. And then when they click **Copy link to image**, you want this confirmation message to appear and then fade out after a few seconds.

Now, quick note. **Whenever you use overlays, you should really be using frames which all three of these objects are.** So go ahead and click down into this top item to select the **Share-Menu-Default** icon, and then click on the **Prototype** tab, and select the **Interaction** menu, and choose **On Click** for the **Trigger** and then **Open Overlay** for the **Behavior**.

Now, by default, this overlay will appear in the center of the frame, which looks like this in the preview. Now, although there are other presets besides centered, by choosing **Manual**, you can click and drag an overlay wherever you want, such as above the **Share** icon here.

Now, you’ll add some advanced options. Go ahead and select **Close while clicking outside** (**Close when clicking outside**), and then select **Add background behind overlay**. And for this option, note that the default color is black (**000000**) at an opacity of **25%**.

Now, let’s **Play** this to preview it and press the letter <kbd>z</kbd> to scale the entire frame to your screen if necessary. And now when the **Share** icon is clicked, the menu appears with a dark overlay. And of course, clicking anywhere outside will close it which is a nice interaction.

Back in the project, click on the **Share-Menu-Default** frame, and then click down into the **Copy link to image** icon. And drag the connection handle to **Share-Menu-Hover**. Now, over here, choose **While Hovering**, and then click on the menu below, and choose **Swap With**. So what this does is with the menu items set to a lighter shade of green, when the user hovers, the frames will instantly swap, giving you this illusion of a menu highlight.

Now, you’ll add the last interaction. Select the **Copy link** frame. And what you want is after the user clicks on this menu item, you want to it to close. And simultaneously, you want the **Copied to clipboard** confirmation to appear. So to do this, drag the handle from the menu item to the confirmation message. Now, choose **Swap With**. And when you preview, *this looks pretty good*.

Now, you need to make this confirmation message automatically fade out. So back in the project, duplicate this frame. Rename it, and then go into **Design** mode and set the **Opacity** to **0**. Go back to **Prototype** mode and drag the handle to the second frame. And the **Interaction** here will be **After Delay**. Let’s use **2000ms**, which is the same as two seconds. And for the **Animation**, choose **Dissolve**.

Let’s preview this one more time. And now after clicking the **Share** icon and choosing **Copy link**, the menu disappears. The confirmation appears. And then it fades out. *Nice.*

But there’s still one more issue to take care of. Remember that semitransparent overlay you originally added? Well, it’s still here making the whole screen darker than it should be. So go back to the faded confirmation message. And the **Interaction** here will be **After Delay**.

But let’s change the behavior to **Close Overlay**. And we want that delay to be super quick. So let’s go back up and change this to **10ms**. As a result, in preview, when that confirmation message fades out, we end up on our original screen. *That’s it.* Thank you, and don’t forget to [watch our other Take 5 video tutorials][2] and [check out our entire course catalog at Gymnasium][3].

[1]: https://gymnasium.github.io/take5/gym-5030.zip
[2]: https://thegymnasium.com/take5
[3]: https://thegymnasium.com/courses
