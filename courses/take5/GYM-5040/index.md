---
layout: take5-raw
course_id: GYM-5040
permalink: /courses/take5/gym-5040
---

Clarissa Peterson: In this tutorial, you’ll learn what alt text is and when to use or omit alt text. Users who are blind can’t see images, so you need to provide the same content to those users in a different way so that it can be read by their screen reader. (Best Practice) **For most images, the best way to make the information available to screen reader users is to provide a text equivalent.** That means you are providing text to the screen reader software in place of the image, and that text needs to have an equivalent meaning to whatever information is provided visually through the image.

Screen Reader: “Vanilla soft serve ice cream in a waffle cone.”

```markup
<img src="image.png" alt="Alternative text goes here.">
```

Clarissa Peterson: We do this by adding the `alt` attribute to the `img` element. The `alt` is short for **alternative text**, but it is most commonly called **alt text**. (Big Idea) **There are many different ways you can describe any given image, and you need to think about what information is being conveyed visually by the image in the specific context it is used in.** Here’s an example. This web page is about the **Gasoline Alley Museum**, which is what you see in the picture. The current alt text is just “Gasoline Alley Museum”, which is accurate, but doesn’t provide any useful information to a screen reader user.

```markup
<img src="image.png" alt="Gasoline Alley Museum">
```

Screen Reader: “Gasoline Alley Museum”, **image**. You are currently on an image.

Clarissa Peterson: Instead, think about what the image tells them. The first thing I see when I visit this page is an image that tells me the museum is a large, airy room filled with antique cars, trucks, and carriages. Neon and other signs hang from the ceiling, the logos of various old gas station brands. At the side I see old gas pumps from the early 1900s. All of that should be in your alt text, especially if what’s in the photo is not described elsewhere on the page. When writing the alt text, you want to make sure the screen reader user knows all the things that you know from looking at the picture.

(Best Practice) **When writing alt text, tell the users everything they need to know, but also try to keep it short and straightforward.** But generally you should try to keep it under 125 characters, as some screen readers will divide longer alt text into multiple chunks. (Best Practice) **Alt text should always end with a period, even if it’s not a complete sentence, because this ensures that the screen reader will pause at the end of it.**

```markup
<img src="image.png" alt="A large hall filled with antique cars, trucks, carriages, and gas pumps. Old neon signs with gas station logos hang from the ceiling.">
```

Screen Reader: “A large hall filled with antique cars, trucks, carriages, and gas pumps. Old neon signs with gas station logos hang from the ceiling.”, **image**.

Clarissa Peterson: (Best Practice) **Decorative images should not have alt text.** Sometimes a photo will be on a page to add visual interest, but it doesn’t supply any actual information to the user. It might be something like the picture of the moose and tree on this page. If the picture was meant to illustrate a specific location, then it would be supplying information and you’d need alt text. But in this context, on a site talking about **Alberta’s Wilderness**, it’s really just a generic moose and tree that could be anywhere and it doesn’t add any information to the page. So you wouldn’t add alt text for this image.

Compare this to further down the page, where you have a picture of a sage-grouse. It’s clear in this context that you are introducing the sage-grouse to an audience that may not be familiar with them. So in this case, you would describe what the sage-grouse looks like, `alt="A small plump bird with brown feathers and a white breast with a tail that looks like a fan of brown feathers."` For many images, it will be obvious to you whether you need alt text or should leave it out, but for other images it’s not going to be so clear. Sometimes it’s really just a judgment call as to whether alt text is needed. (Best Practice) **If you’re ever unsure of whether an image should get alt text, you should go ahead and add it to be safe.**

If you have chosen not to provide alt text for an image, you can’t just leave out the `alt` attribute entirely. If you leave the `alt` attribute out entirely, the screen reader will instead read the file name of the image, which is not helpful to the screen reader user.

```markup
<img src="moose.png">
```

Screen Reader: “moose.png”, **image**.

Clarissa Peterson: You need to include the `alt` attribute, but with nothing between the quotation marks, not even an empty space. The empty `alt` attribute signals to the screenwriter software that it should just ignore the image.

```markup
<img src="moose.png" alt="">
```

Screen Reader: **Alt tag**, web content content is empty.

Clarissa Peterson: (Best Practice) **So either way, every `img` element needs to have an `alt` attribute. It can either contain alternative text or be empty.** For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1], as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/courses/take5
[2]: https://thegymnasium.com/courses
