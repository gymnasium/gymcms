---
layout: take5-raw
course_id: GYM-5037
permalink: /courses/take5/gym-5037
---

Clarissa Peterson: How you use HTML, CSS, and JavaScript on a web page has a big effect on the page’s accessibility. In this tutorial, you’ll learn the purpose of HTML, CSS and JavaScript along with when it’s okay to use document types other than regular web pages and how they affect accessibility. To start out, (Big Idea) **you need to remember that not everybody’s going to view a web page in the same way that you do.** Screen reading software only gets the content it reads from the HTML, not the CSS, so you can’t rely on the CSS to communicate with users.

Screen Reader: “ANIMALS” — **You are currently on a text element.** “1870” — **You are currently on a text element.** “heading level 2 Animals Arrive” — **You are currently on a heading level 2.**

Clarissa Peterson: When you learned how to code, you probably heard this description of the differences between HTML, CSS, and JavaScript. HTML is for content. CSS is for design and layout. And JavaScript is for the behavior of elements and for interaction. You may have also heard that (Best Practice) **you shouldn’t use JavaScript where CSS would do the same job, and also you shouldn’t use CSS where HTML would do the same job.** This is very good advice that will help make your site more accessible. There may be times when it’s appropriate to break this rule. But it’s always the best place to start.

HTML by itself has a lot of accessibility features built-in. For example, HTML forms are quite accessible if coded properly. But many websites use JavaScript to make forms more flashy or interesting without even realizing that the extra code has made the form inaccessible for some users. To check this out on an existing site, just turn off CSS using your browser (developer) tools.

Look at the page. Is everything in an order that makes sense? Does everything still work properly? The content should still be easy to read and navigate.

Of course, some of your site’s interactive features may only be possible with CSS or JavaScript. (Best Practice) **You should try to make most of the features, or at least the important ones, work with basic HTML.** For example, if you need JavaScript for a fancy dropdown menu, make sure that the menu exists in the HTML first so that users who are using assistive technology or other users without JavaScript will be able to navigate the site. Then you can add on some JavaScript to make it do all the fancy dropdown stuff.

Not everything on the web is actually a web page. You’ll often see other document types included in or linked to from websites, such as PDFs or Microsoft Word documents. Generally, a well-written HTML page is going to be more accessible than other document types.

(Best Practice) **You should generally put all of your content on actual web pages unless you have a good reason why another document type is more appropriate.** And if you do use another document type, you’ll have to do some work to make it accessible, just as you would for a web page. PDFs are meant to be printed. So use that format only for those things that will be printed, such as a flyer that’s meant to be posted or a form that needs to be mailed in. Keep in mind that if someone is viewing a PDF on a phone, it will be too small to read. So that content should also be available on a regular web page.

Of course, HTML pages can be printed. So you may not need a PDF at all. (Best Practice) **If you do have to post a PDF, you’ll have to make sure that the PDF document itself is accessible.**

We won’t cover that here, but check out the [**Resources**](#tutorial-resources) section for more information. Try to avoid proprietary formats, like Microsoft Word or Excel, as not everyone will have the correct software on their computer to even open the files.

For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1] as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/courses/take5
[2]: https://thegymnasium.com/courses
