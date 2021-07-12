---
layout: take5-raw
course_ID: GYM-5044
permalink: /courses/take5/gym-5044
---

Clarissa Peterson: Forms are often a cause of accessibility problems on websites. There are a few things you need to do to make sure that everyone is able to complete the forms on your site. In this tutorial, you’ll learn how to make a form easy to understand and easy to navigate through, as well as the proper use of the `label` element.

(Big Idea) **The first thing you should be thinking about when creating a form is whether it is easy for the user to fill out.** For example, this form you see here, you don’t really need to collect all of this information just to send out a newsletter. In contrast, this website only asks for your email address. Only ask the questions you really need to know. The longer the form is, the less likely users are to fill it out.

(Best Practice) **Also think about how the specific questions you’re asking may cause problems for users with disabilities, such as making the phone number field on a contact form required.** Users who are deaf or hard-of-hearing don’t necessarily have phones. Many will have a cell phone. But if they give you the number, there needs to be a way they can tell you it’s only for text messages and not calls.

Don’t make phone number required, and add another question to ask if they prefer to be contacted by phone, email, or text message. Even many users who aren’t disabled would appreciate being given a choice of how to be contacted.

(Best Practice) **It’s a good idea to tell people upfront any unusual information they need to complete a form.** People can easily enter the basics like their own name and address. But if you ask for something like a driver’s license number, they might not have it handy. This form is especially complicated, and it tells users what information they need right upfront.

In the **Getting Ready** section, there’s a link to an entire separate page that explains exactly what the applicant will be asked to provide, as far as medical records, job history, and other personal information. Then under **Apply & Complete**, it tells them how long it will take to complete the form — one to two hours — and that they can save their information as they go.

(Big Idea) **On long forms, the ability to save as you go will increase usability for everybody.** But it’s especially important for people with physical or cognitive disabilities who may take longer than usual to complete the form. It’s incredibly frustrating when a form times out and loses all your information. The ability to save means users won’t have to worry about that.

(Best Practice) **Make sure the form fields are in a logical order in the HTML, because that is the order that a keyboard-only user will use to tab through the fields or that a screen reader will read the fields to a user.** On this form, when you tab, it goes left to right in each row of fields.

Generally, this won’t be a problem for most forms. But if you use CSS to rearrange fields visually on a page, a non-intuitive tabbing order could cause confusion for anyone who is tabbing through the form fields. (Best Practice) **Make sure that fields are clearly highlighted when tabbing through the form so that users can see which field they are typing in.**

The browser will give selected fields a style by default, but adding a more visible style like this will make it easier for keyboard-only users to see where they are on the page. (Best Practice) **Labels are very important for web forms because they tell the user what to enter in each field. Be as specific as possible, but also try to keep them short.**

This form has very straightforward labels that are easy to understand. Don’t make users guess what they need to enter. If you want them to create a password, tell them upfront whether it must have or can’t have certain symbols, numbers, et cetera, as this form does. If there are other fields with specific requirements, let the user know.

(Best Practice) **For screen reader users, one of the most important things for accessibility is to make sure each `label` element is properly associated with the field it corresponds to.** Just having them next to each other visually on the screen isn’t enough, since screen reader users can’t see that.

Screen Reader: “Please fill out the following information to receive our newsletter.” “First Name” **edit text blank** — “Last Name” **edit text blank** — “Email Address” **edit text blank** — “Send” **button**

Clarissa Peterson: If you don’t associate them using code, users may not be able to figure out which `label` goes with which field. First, use the `for` attribute to tell the screen reader that a `label` goes with a certain `input`. The for value on the `label` should match the ID value on the `input` element.

```markup
<label for="firstname">First Name</label>
<input type="text" id="firstname" name="firstname">
```

Screen Reader: **First Name** group — “First Name” — **First Name** — **edit text** — **Last Name** group — “Last Name” — **Last Name** — **edit text**

Clarissa Peterson: For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1], as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/courses/take5
[2]: https://thegymnasium.com/courses
