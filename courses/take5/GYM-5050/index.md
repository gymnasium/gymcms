---
layout: take5-raw
course_ID: GYM-5050
permalink: /courses/take5/gym-5050
---

Jeremy Osborn: Auto Layout in Figma is a feature that allows you to create frames or components that reflow as their contents change. And it’s incredibly useful for prototyping.

Now, you can follow along with me by going to this [URL on Figma Community][1]{: target="_blank" rel="noopener"} , where you can duplicate this project. And you can also find this link in the [**Resources**](#tutorial-resources) section for this video.

Let’s start by creating an Auto Layout button. Choose the Type (Text) tool. Type the word **Upgrade**. Then click anywhere in the canvas and use the keyboard shortcut for applying Auto Layout, <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd>. Figma notifies you that Auto Layout has been applied.

Go ahead and click the plus sign (+) in the **Fill** section to apply a white background for the button. Now, to see Auto Layout in action, double-click on that type layer. And at the end, type the word **Now**. Notice that the button width expands automatically and the text remains centered.

*Very cool.* But what happened here exactly? Applying Auto Layout to the text layer actually created a parent frame. And that leads us to our big idea, which is **Auto Layout only works on frames.**

Now, if you happen to apply it to an object not in the frame, Figma will generate one for you. And that’s exactly what happened with our button. Let’s dig a little deeper and look at how you can control some of the properties of Auto Layout.

In the left side bar, click on the second page [**Auto Layout (exploring properties)**]. And notice that we have two frames. The top one has Auto Layout, and this bottom one does not. Click on that top frame. And then over to the right, in the **Auto layout** controls, you’ll be examining direction, spacing, and padding.

Let’s start with direction, which is currently set to vertical. Click on the right-facing arrow (→) to apply **Horizontal direction**. And all of the objects are reordered horizontally. And this leads to another important point.

(Big Idea) **Auto Layout only works in one direction at a time, either horizontally or vertically.** To build more complex designs that use both directions, like this component, for example, that’s going to require nested frames, something we cover in a different video.

Up next is **Spacing between items**. Currently, a value of 24 — go ahead and type **0**. Press <kbd>Return</kbd> or <kbd>Enter</kbd>. And now there’s no spacing. All those objects are as close as possible to each other.

Padding is the space between these items and the surrounding frame. So go ahead and type **0**. And notice that the space collapses. Now type **48**. And you can see that the space is added on all four sides equally.

Now, this last property is padding and alignment combined. And we’re going to come back to that in a minute. But first, I want to cover resizing.

So go ahead and click on the frame below this one (**icons/stars without Auto-Layout**). Remember, this does not have Auto Layout. But you’re going to edit now by clicking the plus sign (+) or use that <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd> shortcut. Huh, expecting that?

This behavior is due to a feature in the **Resizing** section called **Hug contents**, which removes any extra space around the child objects in a frame. And it works for both horizontal and vertical space.

To test this, click and drag the bottom right corner of the frame. Note the resizing values here switch to **Fixed width** and **Fixed height**. And that’s because you just, essentially, created an override. Now, click on each menu in turn and choose **Hug contents** for both to collapse that space.

And finally, what if you want to add or remove items to a frame that has Auto Layout applied? Well, let’s click back on that top frame. Press <kbd>T</kbd> for the type (Text) tool. And then click right here above the top left star and type the phrase **Five Star Review**.

Now, there’s two problems. One is the spacing. And the other is the alignment. After all, it’d be really nice to have this text centered horizontally between those stars, right? No problem.

Click back on the parent frame, if you need to, to select it. And let’s look at the spacing, which was 0 from earlier. Go ahead and type **16**. Press <kbd>Return</kbd> or <kbd>Enter</kbd>. And there we go, much better.

Now, the last property is **Alignment and padding**. And the padding values here actually allow you to adjust top, right, bottom, or left padding individually. And that actually doesn’t help us here.

However, this icon in the middle represents alignment, which, by default, is set to the top left and explains why the text is aligned in this way. Go ahead and click in the middle. And that adjusts the contents to center alignment. And *voila*.

This is looking almost complete. But there’s just one more thing. We’ve got six stars for a five-star review. So click on that first star. Press <kbd>Delete</kbd>. Note how that frame automatically collapses to fit. And that’s another convenient benefit of Auto Layout.

*That’s it for now.* Be sure to check out the [**Resources**](#tutorial-resources) section for links to other tutorials and videos. And be sure to check out the entire [course catalog][2] at Gymnasium.

[1]: https://bit.ly/3x880Tu
[2]: https://thegymnasium.com/courses
