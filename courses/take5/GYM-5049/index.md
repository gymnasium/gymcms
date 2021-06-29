---
layout: take5-raw
course_ID: GYM-5049
permalink: /courses/take5/gym-5049
---

Jeremy Osborn: Variants are a feature in Figma that allow anyone to add a component to a page, browse through multiple variations, and then choose the one they want. This is a huge benefit because it cuts down the number of components you need to create and makes it easy for anyone working with this project to find what they need.

You can follow along with me by going to this [URL on Figma Community][1]{: target="_blank" rel="noopener"}, where you can duplicate this project. You can also find that link in the [**Resources**](#tutorial-resources) section for this video. To begin, we have a gray frame with two text layers grouped inside. Select that and then choose **Object** > **Create component** or <kbd><kbd>Command</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd></kbd> on the Mac or <kbd><kbd>Control</kbd>+<kbd>Shift</kbd>+<kbd>K</kbd></kbd> on the PC.

When you click on the **Assets** panel, you can see the component here and could drag it onto the page and reuse it throughout the project. However, you’ll be doing that later. So click back on the **Layers** panel. Next, rename this component **Feedback-block/AccountStatus/Success**.

This naming convention is really important to follow and I’ll be explaining it further in just a moment.

Click on that component to make sure it’s selected. Next, in the right panel, click the plus sign (+) on the right side of the **Variants** section and a duplicate of your component appears. *Congratulations*, you’ve made your first variant. This purple dashed frame that appeared is Figma’s way of visually identifying that this is a group of variants, technically called a Components set.

And you may have noticed this purple square with the plus sign (+) on the bottom right. Go ahead and click that and a third variant will appear. At this point, you could keep on clicking and add more variants, but we’re going to stop here at three.

So let’s examine what happened. Click the top-level component named **Feedback-block**. And where did this name come from and also where did these layer names **AccountStatus, Success** come from? Well, you guessed it.

These properties were directly generated from the component name I had you type in earlier. When you use the special syntax, any text before the first slash is turned into the component name. And then for every extra forward slash, Figma creates a new property and value.

(Variants: Properties) **So what are those? Well, properties are the different characteristics of a component. Examples include type, size, color, or state, although the exact name and number is completely up to you.** If you don’t name any properties, Figma will give you default ones. And actually, back in our project, that’s exactly what happened. We have Property 1 and Property 2.

So let’s give these better names. Click in the **Property 1** field and type the word, **Type**. And then in the **Property 2** field, type the word, **Message**.

(Variants: Values) **Next, we have values, which are the options available for each property. Examples here might include large, small, red, green, off, on, and so forth.** So back in your project, the value for the **Type** property is **AccountStatus** and the value for the **Message** property is **Success**. Now, remember, these values came from that layer name syntax I gave you.

Currently, you can see a conflict warning here in the **Variants** panel.

> Some variants have the same property values applied. Change the values of these to resolve this.

This means Figma is a little annoyed at the fact that all three variants are exactly the same. We don’t want Figma to be annoyed. So let’s fix that.

Click on the first variant. Click **Fill** and choose the light green color swatch. Click on that text field and type, **Success!**. Next, click on the second variant, click on the property value and rename this **Warning**.

Choose **Fill**. And this time, select the light orange color swatch. Click the second text field and type, **Your credit card will expire soon!** Now for this last variant, I want you to notice what happens to this conflict notification. Click on the property value and type, **Error**.

See how that conflict disappears? That’s because all three variants are now unique and Figma is happy. Choose **Fill** and select the red swatch. Click the second text field and type, **Your credit card has expired. We tried to warn you!**

Cool. We’re done. So let’s just take a quick look at how you or a team member would now use these variants in a real-world situation. In the left sidebar, click on the mockup page (Mockup of Payment Information page). Next, click on the **Assets** panel and drag the **Feedback-block** component and place it below the header.

Now go over to the **Variants** section, click on this menu, and choose each of those three options in turn. Notice how they change. And that’s the benefit of variants. *Very cool, very convenient.*

*That’s it for now.* Be sure to check out the [**Resources**](#tutorial-resources) section for links to other tutorials and videos. And be sure to check out the entire [course catalog][2] at Gymnasium.

[1]: https://bit.ly/3bPt3C4
[2]: https://thegymnasium.com/courses
