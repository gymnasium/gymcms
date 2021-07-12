---
layout: take5-raw
course_ID: GYM-5045
permalink: /courses/take5/gym-5045
---

Clarissa Peterson: Forms often cause accessibility problems on websites. There are many things you can do to make your forms more accessible. In this tutorial, you’ll learn how to use required fields, validation, and placeholder text, as well as learn why you need to make sure your form doesn’t time out. (Best Practice) **Users need to be able to easily tell which fields they are required to complete before submitting a form. It’s common to use color for this purpose, but since some users are color blind, you can’t rely on color alone. Instead perhaps use color plus an asterisk to mark required fields.**

This form clearly shows which field is required with an asterisk plus color so it stands out. You can also include a notation as text in the field’s label, such as here, where they use the word required in addition to an asterisk. That makes it very clear to users. There’s something else you can do to make it easy for them to tell which fields are required before submitting. For the required fields, add the attribute `aria-required` with a value of `true`. The screen reader software will then specifically tell users that those fields are required.

```markup
<input type="text" aria-required="true" name="name">
```

Screen Reader: “First Name” **required**.

Clarissa Peterson: (Big Idea) **Validation is really important for forms. This is when the browser or the server checks to see if the user has filled out all the required fields and entered data in the correct format and then lets the user know if something is wrong.** You not only need to tell users when they made an error, you also need to make sure they understand how to fix their error. Here, it doesn’t just say my entry was invalid. It tells me why. For each field that has an error, be specific in explaining what is wrong.

(Best Practice) **Try to give users as much time as they need to complete a form. Don’t set your form to time out unless it’s really necessary.** You sometimes may need to set a form to time out after a certain amount of time. For example, if you’re selling tickets, you want to be able to release the tickets if a user abandons the checkout process. But users with disabilities may need extra time. And also, make sure to give them adequate warning when the form is about to time out and the ability to extend the time if possible.

There is a design trend these days to use the `placeholder` attribute instead of the `label` element to label form fields. This looks neat visually. The label is inside the form field. But unfortunately, the placeholder text may not be available on all assistive technology. This means some users won’t be getting the labels at all. Placeholders can also be a problem for users with low vision as the gray text may not have enough contrast with the background color.

```markup
<input type="password" id="pw" placeholder="Password">
```

One other note on placeholders as labels — they will disappear as soon as someone starts typing in the field. This may be a problem for someone with a cognitive disability or anyone who wants to go back and check their answers before submitting. This is probably okay on a short form like this with only a couple fields, but you wouldn’t want this to happen on a longer form.

You can use JavaScript to get around this, like on this forum from PayPal that shows the label above your field entry after you start typing. But most of the time, your best option is just to use the `label` element. Sometimes it doesn’t make sense to display a label on the screen because it’s obvious in context, such as the search box at the top of this page. In that case, you can use a special attribute on the `input` element called `aria-label` to make a label that’s only available to screen readers.

```markup
<input type="search" name="search" aria-label="Search">
```

Here, the screen reader user would be told the label is **Search**, but it’s not visible on the screen.

Screen Reader: **search text field Search** — You are currently on a text field. To enter text in this field, type.

Clarissa Peterson: You can do lots of really awesome things that JavaScript on a website, but you can also use it to do awful things, like making a form inaccessible. This is surprisingly common. (Best Practice) **If you have something like a calendar widget that’s not part of standard HTML, you should test it thoroughly to make sure it’s available to screen reader users, keyboard only users, and other assistive technology.** If you’re using JavaScript to do anything affecting a form, such as changing form elements, changing the focus, or manipulating data, you need to do thorough testing to make sure you haven’t messed anything up accessibility-wise.

For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1] as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/courses/take5
[2]: https://thegymnasium.com/courses
