---
layout: take5-raw
course_ID: GYM-5041
permalink: /courses/take5/gym-5041
---

Clarissa Peterson: There are a few scenarios where alt text can be tricky. In this tutorial, you’ll learn what to do when there is text in an image, when you have graphs or charts, or when an image is a link.

Sometimes, web sites use images as a way to display heavily stylized text, like the text you see on this page. This was more common years ago, when you couldn’t really add much style to text using code. But with CSS advancements that let you load any fonts you want onto a web page, it’s no longer necessary most of the time.

(Best Practice) **The best way to put text on a web page is with actual text in HTML.** Then you don’t have to worry about alt text. The text will look ok regardless of screen magnification, and doing this also reduces the amount of files that the browser needs to download, speeding up the page.

Sometimes, you’ll have an image that’s too complicated to describe with alt text. In that case, you should add the text and other information in the body of the page. If something is important enough to include in an image, it’s important enough to ensure that everyone can access that information, so don’t leave anything out.

Screen Reader: **In image**, “Leaders of the August 23, 1963 Civil Rights March in Washington, D.C. lead a crowd of marchers holding signs down the street. A sign reading ‘We demand decent housing now!’ is prominently displayed.”

Clarissa Peterson: (Best Practice) **One time that it does make sense to use an image for text is when you have logos and stylized brand names.** You can do those as images. The alt text should just use the text on the image. You don’t need to describe the design of the logo.

If you have an image of a graph or a chart on a web page, it can get complicated. This is also more information than can be conveyed through alt text. (Best Practice) **The best option is to make sure the information in the graph or chart is included in the text on the page.**

For a chart like this, I would create a data table to display the list of categories and percentages, or maybe even a bulleted list for something this simple. If you’re providing all the information as text, you may not need to have any alt text on the image, but think about the flow of the entire page. If you’re referring to the graph from elsewhere on the page, you might have alt text for the image, such as `alt="Graph of capital budget funding, detailed data provided below."` Then the screen reader user knows that there’s a graph on the page, but they’ll get the same information further down.

```markup
<img src="graph.jpg" alt="Graph of capital budget funding, detailed data provided below.">
```

(Big Idea) **Duplicating the content on the page not only benefits the screen reader users, it also helps visual users who might have trouble understanding the chart and would understand it better if the information was presented in a different way.**

In some cases, an image will also have a function. For example, an image that is also a link, an image that is a button on a form, or an image that performs some other action using JavaScript. For this type of image, the alt text needs to let the user know the function of the image.

At the top left in many pages like this one, you have the web site’s logo as a link back to the home page of the site. The important thing is leading the screen reader user know where the link is going, not describing the image. So for the logo at the top left, it might be best to use the word home as your alt text.

```markup
<img src="sitelogo.svg" alt="Home.">
```

Screen Reader: **visited**, **link**, “Home”

Clarissa Peterson: Sometimes you’ll have both an image and text within the same link. Here, you have icons next to links, but the icons don’t add any additional information. Since there’s already text for the link, you don’t also need to add a description or any other words for the icon. That would just add verbal clutter to what the screen reader user is hearing. So here, the icons should have an empty `alt` attribute.

```markup
<svg width="48" height="48" alt="">
```

Screen Reader: **SVG with empty alt tag**, web content — “Arts and culture”

(Best Practice) **I’ll also note that if you do have an image and text next to each other linking to the same place, it’s best to have them part of the same link, that is, in the same `a` element.** If they were separate links placed next to each other, a screen reader user who is going through a list of the links on the page would have to hear the link repeated.

```markup
<a href="/arts-culture.aspx">
  <svg width="48" height="48" alt="">
  Arts and Culture
</a>
```

For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1], as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/take5
[2]: https://thegymnasium.com/courses
