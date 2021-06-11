---
layout: take5-raw
course_ID: GYM-5050
permalink: /courses/take5/gym-5050
---

Jeremy Osborn: Auto Layout in Figma is a feature that allows you to create frames or components that reflow as their contents change, and is incredibly useful for prototyping.

You can follow along with me by going to this [URL on Figma Community][1] where you can duplicate the project. You can also find this link in the [**Resources**](#tutorial-resources) section for this video.

Let’s start by creating an Auto Layout button. Choose the type (Text) tool and type the word **Upgrade**. Click anywhere in the canvas and then use the keyboard shortcut for applying Auto Layout: <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd> and Figma notifies you that Auto Layout has been applied.

Click the plus sign (+) in the fill section to apply a white background for the button. To see Auto Layout in action, double-click on that type layer and at the end, type the word **Now**. Notice the button width expands automatically and the text remains centered.

*Very cool*, but what happened exactly? Let’s go to the instant replay.

Interesting, applying Auto Layout to the text layer actually created a parent frame, which leads us to our big idea:

(Big Idea) **Auto Layout only works on frames.** If you apply it to an object not in a frame, Figma will generate one for you, which is exactly what happened with the button

Next, lets look at the properties of Auto Layout that you can control. In the left sidebar, click on this second page [Auto Layout (exploring properties)] and we have two frames: the top one has Auto Layout and this bottom one does not.

Click on the top frame (icons/stars with Auto-Layout) and then over to the right in the Auto Layout controls you’ll be examining: **Direction**, **Spacing** and **Padding**. Let’s start with **Direction**, which is currently set to **Vertical**.

**Vertical direction** means that the objects in that frame flow, well vertically or on the Y axis.

Click on the right-facing arrow (→) to apply **Horizontal direction** and all of the objects are reordered horizontally, or on the X axis. This leads to an important point:

(Big Idea) **Auto Layout only works in one direction at a time, either horizontally or vertically.** To build more complex designs that use both directions, like this component for example, will require nested frames, something we cover in a different video.

Next is **Spacing between items**, currently a value of 24, type **0** and press <kbd>Return</kbd> and now there’s no spacing, all the objects are as close as possible to each other.

**Padding between items** is next, with a current value of 16. Padding is the space between these items and the surrounding frame, so if you type **0**, that space collapses, now type **48** and you can see that the space is added on all four sides equally.

This last property is padding and alignment combined, which we’ll come back to in a minute. But first, I want to cover **Resizing**.

Click on the frame below this one (icons/stars without Auto-Layout), and then click the plus sign (+) for Auto Layout or use that <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd> shortcut. Were you expecting that?

This behavior is due to a feature in the **Resizing** section called **Hug Contents** which removes any extra space around the child objects in a frame and it works for both horizontal and vertical space. To test this, click and drag the bottom-right corner of the frame and note the resizing values switch to **Fixed Width** and **Fixed Height**, because you just created an override. Now click on each menu in turn, and choose **Hug Contents** to collapse that space.

FInally, what if you want to add or remove items to a frame with Auto Layout? Click on the top frame, press <kbd>T</kbd> for the type (Text) tool, and then click right here above the top left star and type **Five Star Review**. Two problems: one is the spacing, the other is the alignment, it would be nice to have this text centered horizontally between your stars, right? No problem! Click back on the parent frame which still has zero spacing from earlier, type **16**, press <kbd>Return</kbd> and that’s much better.

This last property is **Alignment and padding**, these values would allow you to adjust top, right, bottom, or left padding individually, but this doesn’t help us here. However, this icon in the middle represents alignment which by default is set to top left, and explains why your text is aligned this way. Click in the middle to adjust the contents to center alignment and *voila!* This is looking almost complete.

One more thing, we’ve got 6 stars for a 5 star review, click on that first star and press <kbd>Delete</kbd>, and note how the frame automatically collapses to fit, another convenient benefit of Auto Layout.

*That’s it for now.* Be sure to check out the [**Resources**](#tutorial-resources) section for links to other tutorials and videos. And be sure to check out the entire [course catalog][2] at Gymnasium.

[1]: https://bit.ly/3x880Tu
[2]: https://thegymnasium.com/courses
