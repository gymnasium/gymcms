---
layout: take5-raw
id: GYM-5039
permalink: /courses/take5/gym-5039
---

Clarissa Peterson: Tables are the best way to display certain types of data, but if you don’t ensure that your tables are accessible, screen reader users won’t be able to make sense of the data. In this tutorial, you’ll learn what you need to do to make tables more accessible.

You may have heard that you should avoid using tables for layout and that’s absolutely true. For newer developers, you may not even know that in the early days of the web, HTML tables were an easy way to layout sections of the page, especially when doing columns. Once CSS came along, it was no longer necessary, but you still sometimes see it on older web sites. This creates a lot of problems, so just don’t do it. (Best Practice) **But there are times when it is appropriate to use tables, and that’s when you have data that is best displayed in tabular form — that is, in rows and columns.**

For example, you may have something like this cafeteria menu which may be easiest to understand in a table with a row for each day and then each day has a lunch and dinner option. For accessibility, you need to tell the browser which cells are row or column headers. This will be very important when a screen reader is reading the table to a user.

```markup
<tr>
  <td>Day</td>
  <td>Lunch</td>
  <td>Dinner</td>
</tr>
```

This is the first row with the cells for **Day**, **Lunch**, and **Dinner**. Instead of those cells being `td` for **table data**, they should be `th` which stands for **table header**. I’m changing each of these from `td` to `th`, then I’m going to save and go back to the browser and refresh.

```markup
<tr>
  <th>Day</th>
  <th>Lunch</th>
  <th>Dinner</th>
</tr>
```

Screen Reader: **table 3 columns, 6 rows** — You are currently on a table, inside of web content. To navigate the cells within this table, press <kbd><kbd>Control</kbd>+<kbd>Option</kbd></kbd>, and then <kbd>↑</kbd>, <kbd>↓</kbd>, <kbd>→</kbd>, or <kbd>←</kbd>. “Day”, **column 1 of 3** — “Lunch”, **column 2 of 3** — “Dinner”, **column 3 of 3**

Clarissa Peterson: You need to go a step further, though, and tell the browser what each header cell is the header for. (Best Practice) **You do this with scope. So each `th` element will get an attribute of scope.** In this case, the value of `scope` would be `col` for **column** because the header is applied to the cells in the same column.

```markup
<tr>
  <th scope="col">Day</th>
  <th scope="col">Lunch</th>
  <th scope="col">Lunch</th>
</tr>
```

So I’m going to save, go back to the browser and refresh, and nothing changed, because the scope doesn’t do anything that’s visible in the browser, but for a screen reader user, the information in the table will be presented in a different way and the user will better be able to understand the table.

Screen Reader: “Day”, **column 1 of 3** — “Lunch”, **column 2 of 3**. “Dinner”, **column 3 of 3** — **row 2 of 6** “Day”, “Monday”, **column 1 of 3** — “Lunch”, “Soup”, **column 2 of 3** — “Dinner”, “Meatloaf”, **column 3 of 3** — You are currently on a text element, inside of a cell.

Clarissa Peterson: Looking at it again, in the next row, **Monday** would be a header and it would get a scope of row as it applies to the other table cells in the row. So I’m going to take this first row with three cells and change only the first cell in that row to `th` — that’s **Monday**, and then add a `scope` of `row`.

```markup
<tr>
  <th scope="row">Monday</th>
  <td>Soup</td>
  <td>Meatloaf</td>
</tr>
```

And then I’m going to do the same for the other days of the week which are the table headers for their respective rows. So now that those are all `th`, I’m going to copy the `scope` and paste that in each one of them. And then save, and go back to the browser and refresh. So this is how it looks in the browser.

```markup
<table>
  <tr>
    <th scope="col">Day</th>
    <th scope="col">Lunch</th>
    <th scope="col">Dinner</th>
  </tr>
  <tr>
    <th scope="row">Monday</th>
    <td>Soup</td>
    <td>Meatloaf</td>
  </tr>
  <tr>
    <th scope="row">Tuesday</th>
    <td>Sandwiches</td>
    <td>Steak</td>
  </tr>
  <tr>
    <th scope="row">Wednesday</th>
    <td>Tacos</td>
    <td>Chicken</td>
  </tr>
  <tr>
    <th scope="row">Thursday</th>
    <td>Tofurkey</td>
    <td>Roast Beef</td>
  </tr>
  <tr>
    <th scope="row">Friday</th>
    <td>Burgers</td>
    <td>Pizza</td>
  </tr>
</table>
```

(Best Practice) **Another thing you need to do for accessibility is add a caption to the table.** This makes it easy for the screen reader user to know what content is in the table. The caption goes first thing right after the opening `table` tag but before the first row. And it’s just the `caption` element in HTML, and I’m going to add what I want the caption to be inside of it — **This week’s menu**. And then save and go back to the browser and refresh.

```markup
<table>
  <caption>This week's menu</caption>
  <tr>
    <th scope="col">Day</th>
    <th scope="col">Lunch</th>
    <th scope="col">Dinner</th>
  </tr>
```

Without formatting, it just appear centered above the top row of the table. Again, you can use CSS to change the formatting of any of this. But now, screen reader users will find it easier to understand the table.

Screen Reader: “THIS WEEK’S MENU” **table**, **3 columns, 6 rows**

Clarissa Peterson: For more tips, check out our [**Resources**](#tutorial-resources) section for links to articles and other tutorials that can help you expand on the concepts we’ve covered here. *Thanks so much for watching.* Don’t forget to check out [the other Take 5 videos][1] as well as the entire [course catalog][2] here at Gymnasium.

[1]: https://thegymnasium.com/courses/take5
[2]: https://thegymnasium.com/courses
