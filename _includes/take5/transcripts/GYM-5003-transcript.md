
In this tutorial, you're going to add a gradient overlay to an image that starts like this and ends like this, using only CSS. In the past, you can only do this sort of thing in an image editor such as Photoshop. But the ability to do this in CSS is faster, easier to update, and more suitable for responsive layouts, such as this one seen here. 


This is the project on CodePen you'll be working with. Here is the URL, which you can also find linked within the resources section for this video. 


Currently, this text is styled white, and it's not very readable. So you're going to add a gradient to darken the background, but allow the image to remain visible. So in your HTML, you have a div with the class of container, and then there's this nested div named content. To add the gradient, you're going to use the container style, which has a background image of palm trees that are centered and covered using these two styles here. 


Notice this duplicate background image property and value here. This is not a mistake. I put this line in to save you some time. 


So the code you're about to write will be for modern browsers that support CSS gradients. This first background image style will serve as a fallback for older browsers that don't support gradients. But at least the user gets an image. 


So place your cursor before the word url and press Return twice. Now, in the empty line above, type the following. And be sure to pause the video if you need to. Again, be sure to add that last comma, and let's talk about the syntax. 


So a simple gradient needs a minimum of two color stops, a start color and an end color. A gradient is simply the transition the browser draws between them. So here, the first color stop is pink, as defined by an HSLA color, which I'll explain in a second. And then there's a comma, and then the second color stop is defined by the color keyword black. 


The image is currently hidden, because the gradient is not transparent, and you're going to fix that in a second. Let's add a color hint, which is another word for midpoint. And to see this, type 10% after the first color, type a comma to separate this value from the second color. Now, this sets the midpoint 10% of the way from the top, so you get a tiny sliver of pink, and then the rest is all the black gradient. 


So go ahead and change that value to 50%, which is the default value you started with. You'll be returning to midpoints in just a second, but now you'll take a look at transparency. Change that last value to zero. The top half is fully transparent and then gradually becomes more opaque. 


But notice there's no pink left. That's because the full transparency is overriding it. To bring some color back, type 0.5 for alpha. Now, you can get more colorful by changing the second color stop from black to coral, which is a color keyword. 


Now remember that color hint from earlier. Change that 50% value to 90%, and that pushes the midpoint almost all the way to the bottom of your graphic. 


So these colors are looking good, but the readability is getting lost. So change the lightness value to 20%, the saturation value to 80%, and reduce the transparency of everything to 0.7. Personally, I like this result, but your own tastes may vary, so feel free to experiment. 


Lastly, if you want more control over that bottom color, you could always use another HSLA color or any other value you like. If you prefer RGB, use that, or hexadecimal color is fine. Personally, I do like HSLA, and there's a great tool I use called hslapicker.com that allows you to choose a color by eye, get an HSLA value, and then copy and paste that into your CSS. Now you have the same sort of control and can change any of the values as needed. 


That's it. Thank you for watching. If you like this Take 5 video, be sure to check out the rest of the series and our entire course catalog at Gymnasium. 

