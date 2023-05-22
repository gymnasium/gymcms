---
layout: take5-raw
course_id: GYM-5032
permalink: /courses/take5/gym-5032
---

Ethan Marcotte: When was the last time you listened to a web page?

Screen Reader: “Carol McKinney Highsmith (born Carol Louise McKinney on May 18, 1946).”

Ethan Marcotte: I just used a screen reader to navigate through this page here. There are many kinds of screen readers, which use synthesized speech to, well, read aloud the text that appears on a computer screen. Screen readers are incredibly helpful for people with a wide range of vision impairments, allowing them to more easily use their computers and to browse the web.

In this tutorial, I’ll teach you the basics of using VoiceOver, a popular screen reader for macOS, so that you can more comfortably use it to test your web pages. VoiceOver is available on iOS and on macOS, but we’ll be focusing on macOS for this lesson. And while VoiceOver works well in both Chrome and Safari, let’s stick to using Safari for this video.

Let’s get started. In Safari, click on the menu labeled **Safari**, choose **Preference**, and then click **Advanced**. In the **Accessibility** section, click the “Press Tab to highlight each item on a web page” checkbox.

Now, let’s open our page in Safari by browsing to [this URL][1]{: target="_blank" rel="noopener"} on CodePen. Let’s turn on VoiceOver. Press <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd>. Your Mac may expect you to hold the <kbd>Fn</kbd> (Function) key before pressing the <kbd>F5</kbd> key.

Screen Reader: **VoiceOver on Safari**, “CodePen - An Introduction to VoiceOver”, **window**, “CodePen - An Introduction to VoiceOver”, web content has keyboard focus.

Ethan Marcotte: You just heard VoiceOver announce that Safari was open, and then read the name of the page we were on. Now, let’s turn VoiceOver off by pressing <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd> again.

Screen Reader: *VoiceOver off*.

Ethan Marcotte: That’s right, the same shortcut is used to turn VoiceOver on and off. Now, let’s turn on VoiceOver with <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd>, then (Tip, Number 1) press <kbd><kbd>Control</kbd>+<kbd>Option</kbd>+<kbd>A</kbd></kbd> and listen to VoiceOver read the page.

Screen Reader: **Heading level 1** “A few words about Carol Highsmith” — “by” **link**, “Photography Fan”.

Ethan Marcotte: After listening for a bit, (Tip, Number 2) press the <kbd>Control</kbd> key to pause VoiceOver.

Screen Reader: “February 4, 20…”

Ethan Marcotte: Then press <kbd>Control</kbd> to resume.

Screen Reader: “…2020. Carol McKinney Highsmith (born Carol Louise McKinney on May 18, 1946)”. *VoiceOver off*.

Ethan Marcotte: After listening for a bit, press <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd> again. Now as VoiceOver reads, you might have noticed that it announces important information.

Screen Reader: **heading level 2** “Early career” — **heading level 3** “broadcasting” — “In 1976, Highsmith moved to Washington, DC, and spent six years as a senior account executive for radio station” **link**, “WMAL while taking classes at American University.” *VoiceOver off*.

Ethan Marcotte: This is how VoiceOver communicates the structure of the page and lets the listener know what they can interact with. Start VoiceOver again with <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd> and start tabbing through different items on the page with the <kbd>Tab</kbd> key. (Tip, Number 3) <kbd>Tab</kbd> all the way to the bottom of the page and then turn off VoiceOver with <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd>.

Screen Reader: **link**, “Oktoberfest” — “Your name:” **edit text**, “Sign up for our newsletter” — “Your email (required):” — “Subscribe” **button**, “Sign up for our newsletter.” You are…  — **link**, “Soviet Union” **main**. *VoiceOver off*.

Ethan Marcotte: As you saw in the example, VoiceOver reads out the text for all hyperlinks, as well as the input field and button name for the form. (Best Practice) **That’s why it’s so important to use descriptive text for links and good names for your form elements.** A link called **Click Here** or button named **Button 1** will not be helpful to anyone and especially confusing to people who might be using a screen reader.

Now let’s try out an incredibly powerful VoiceOver feature, the **rotor**, which lets the user quickly jump to specific page elements. Let’s try it out. Start VoiceOver with <kbd><kbd>Command</kbd>+<kbd>F5</kbd></kbd>. And then open the rotor with <kbd><kbd>Control</kbd>+<kbd>Option</kbd>+<kbd>U</kbd></kbd>.

Screen Reader: No items in, **Articles** menu.

Ethan Marcotte: You can select different categories in the rotor by pressing the <kbd>←</kbd> or <kbd>→</kbd> (Left or Right Arrows) on your keyboard. For example, browse <kbd>←</kbd> or <kbd>→</kbd> until you reach the **Headings** menu.

Screen Reader: **Links** menu. **Headings** menu.

Ethan Marcotte: Now browse left or right until you reach the **Landmarks** menu.

Screen Reader: **Form Controls** menu. No items in, **Web Spots** menu. **Landmarks** menu.

Ethan Marcotte: Developers and designers can [use landmarks][2]{: target="_blank" rel="noopener"} to help identify the different kinds of content on a web page, like the main content area, the search form, and so on. Now press the <kbd>↓</kbd> (Down Arrow) to select the first **complementary** item and press <kbd>Return</kbd>.

Screen Reader: **main** — **complementary** — You are currently in a group.

Ethan Marcotte: You’ve landed on the newsletter form. It’s marked up with an `aside` element, which is why it’s listed as **complementary** in VoiceOver’s rotor. Now open the rotor again with <kbd><kbd>Control</kbd>+<kbd>Option</kbd>+<kbd>U</kbd></kbd>.

Screen Reader: **Landmarks** menu.

Ethan Marcotte: Press <kbd>↓</kbd> to select **Page footer content information**.

Screen Reader: **main** — **complementary** — **Page footer content information**.

Ethan Marcotte: Then press <kbd>Return</kbd>.

Screen Reader: You are currently on a content information, inside of web content.

Ethan Marcotte: Now you’ve jumped down to the footer. The rotor is an incredibly powerful way to quickly jump between different parts of a page’s structure. Once you get more comfortable with VoiceOver and with testing your designs in it, you’ll be equipped to make your designs more accessible and beautiful for many more people.

Thanks so much for watching. Don’t forget to check out [the other Take 5 videos][3], as well as the entire [course catalog][4] here at Gymnasium.

[1]: https://cdpn.io/eYpGVvJ
[2]: https://a11yproject.com/posts/aria-landmark-roles/
[3]: https://thegymnasium.com/courses/take5
[4]: https://thegymnasium.com/courses
