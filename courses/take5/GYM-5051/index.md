---
layout: take5-raw
course_id: GYM-5051
permalink: /courses/take5/gym-5051
---

Jeremy Osborn: Creating complex responsive interfaces in Figma can be done very quickly using Auto Layout. But it does require a solid understanding of alignment, distribution, resizing, and nesting, all of which I’ll be covering in this video.

You can follow along with me by going to this [URL on Figma Community][1]{: target="_blank" rel="noopener"}, where you can duplicate the project. You can also find this link in the [**Resources**](#tutorial-resources) section for this video.

This project has two frames, both of which already have Auto Layout. You’re going to start with these two frames (**activity-meta** and **activity-content**) and then use nesting and Auto Layout to create a responsive activity feed that looks something like this.

Let’s begin by looking at the Auto Layout properties. Click on the first frame (**activity-meta**). Notice it has **Vertical direction**. And there are 18 pixels of space between the timestamp and the icon. There’s no padding. But to make sure the icon is centered below the timestamp, I set the alignment to the center over here.

The second frame (**activity-content**) has 0 padding, 0 spacing, and a default alignment of top left. And finally, the resizing options for both frames are set to **Hug contents**.

Now, if any of the terms I just used seem unfamiliar, you might want to check out another video of ours called [Working with Auto Layout in Figma][2].

To begin, <kbd>Shift</kbd>-click both of these frames and then press <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd> to create a new Auto Layout frame. Then click on that frame and rename it **activity-list** here in the **Layers** list.

And in the controls, notice that Figma figured out that this direction of the frame should be horizontal. And in addition, the spacing between those two frames was calculated as 30. And of course, you could always change that, if desired, by using this **Spacing between items** control.

Next, click on the plus sign (+) in the **Fill** section to give this frame a white background for a unified look. Then click on the padding control (**Padding around items**) and type **16** to add equal amounts of space between the content and the frame.

So this is actually looking pretty good. But try clicking and dragging the width of this frame to somewhere around **500** pixels.

Now, the fact that this text block doesn’t move as the frame width changes could be a problem if your design calls for a more responsive layout. So let’s take care of that.

Click on the alignment option (**Alignment and padding**). And let’s examine this menu currently set to **Packed**. Now, the two options in this menu control the distribution of objects within the frame. And as the name suggests, a value of **Packed** will keep all the objects as close together as possible.

Go ahead and choose **Space between**. And you’ll see the **activity-content** shift to the right. And if you expand the width of the parent frame now, the content block moves with it, exactly what we want.

So using **Space between** has other effects worth looking at. Duplicate the **activity-meta** block twice. Notice how that space between the duplicates is equal. And this is actually more obvious if you stretched the width of that frame further. The **Space between** feature simply distributes everything equally, no matter what.

Now, this was just for demonstration. So go ahead and delete those two duplicate icons and resize the frame back to approximately **400**.

Now, there’s one more step to make our activity feed. Make sure the parent frame is selected. And then press and hold the <kbd>Option</kbd> key and drag downwards to duplicate it.

Repeat that process until you have four frames in total. Click and drag across all those four frames to select them. And press <kbd><kbd>Shift</kbd>+<kbd>A</kbd></kbd> to apply Auto Layout.

Go ahead and rename this new frame **activity-feed**. And also, click the plus sign (+) in the **Fill** section to add our customary white background.

So now you have an Auto Layout parent frame with four Auto Layout frames nested inside of it. And inside each of those frames, there’s two nested Auto Layout frames, *all* the nesting.

Now, to see the flexibility this gives you, click on one of the email text fields and duplicate it a couple of times and see how all that content readjusts or go ahead and delete one of those items entirely and notice how the entire frame collapses to fit.

Now, in most layout scenarios, you’d be done here. But there is one more thing I want to show you. Click the bottom of the **activity-feed** frame and drag it up or down. What if your design required a layout where all this content was supposed to adapt or shift based on the height of the frame? *Not a problem.*

Click on the alignment control (**Alignment and padding**). And remember this distribution menu you used earlier? Well, it’s going to work here as well. Click on **Space between**. And you’ll see the three **activity-list** items shift position. And now, if you change the height of the frame, they will all adapt accordingly – *very useful, very cool.*

*And that’s it.* Be sure to check out the [**Resources**](#tutorial-resources) section for links to other tutorials and videos. And be sure to check out the entire [course catalog][3] at Gymnasium.

[1]: https://bit.ly/3wNuwkK
[2]: https://thegymnasium.com/courses/take5/working-with-auto-layout-in-figma
[3]: https://thegymnasium.com/courses
