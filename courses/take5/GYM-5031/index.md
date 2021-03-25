---
layout: take5-raw
course_ID: GYM-5031
permalink: /courses/take5/gym-5031
---

Charts, diagrams, and visualizations can all help people understand large sets of data at a glance. When these are interactive, they can allow users to explore data in a meaningful and even personal way. And if you’re curious to learn what it takes, enroll in our free class on information design and data visualization [located here at Gymnasium][1].

But sometimes, all you want to do is make a simple chart and put it on your website. So in this tutorial, I’m going to show you how to do exactly that with Google Charts. And if you want to examine the completed project, [here is the URL for that][2]{: target="_blank" rel="noopener"}, although this link is also available in the **Resources** section for the video. And to get started, you’ll need two things — one, a completely blank CodePen like I have here, and two, to have this page from the Google Charts Quick Start guide open.

Now the fastest way to get there is to search for [Google Charts Quick Start][3]{: target="_blank" rel="noopener"}. Google Charts is a third-party JavaScript library that allows you to make all sorts of impressive charts and graphs and other visualizations, although it does come at a cost of 153 kilobytes to your page size. Now on this page, there’s sample code that you’ll be basing your chart upon, and if you’re working in a text editor, you could just copy this entire code block, put it into an HTML page, and you’d be all set.

But since we’re working in CodePen, it’s going to take you three steps to get this chart working.

**Step One: Add a reference link to the Google Chart library and CodePen.** To do this copy, just add the URL to the library here.

`https://www.gstatic.com/charts/loader.js`

And then in CodePen, go to your **Settings** and then **JS** and then paste the URL into this section for **External Scripts**. **Save** and close it. And now behind the scenes CodePen is referencing this library, allowing you to use all the many features of Google Charts on this page.

**Step Two: Load the Google Chart library and data to CodePen’s JavaScript panel.** Back in Google Charts copy all of the JavaScript between the script tags. In CodePen, paste this code into your **JavaScript** (**JS**) panel, and this is going to load the library as well as the sample data for the chart, which you can see here.

```javascript
// Load the Visualization API and the corechart package.
google.charts.load('current', {'packages':['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.charts.setOnLoadCallback(drawChart);

// Callback that creates and populates a data table,
// instantiates the pie chart, passes in the data and
// draws it.
function drawChart() {

// Create the data table.
var data = new google.visualization.DataTable();
data.addColumn('string', 'UI Tools');
data.addColumn('number', 'Responses');
data.addRows([
  ['Sketch', 1911],
  ['Figma', 1178],
  ['Adobe XD', 660],
  ['Photoshop', 365],
  ['Illustrator', 365]
]);

// Set chart options
var options = {'title':'Which Tools Do You Use For Interface Design?',
               'width':800,
               'height':400};

// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
chart.draw(data, options);
}
```

**Step Three: Add an HTML `div` to hold the chart.** So the last step is to copy this HTML from the Google Chart example and paste it into the **HTML** panel in CodePen.

```markup
<!--Div that will hold the pie chart-->
  <div id="chart_div"></div>
```

And if you did everything right, you should be seeing a pie chart appear for someone who just ate a lot of pizza. And so now if you hover over your graph, you’re going to see the interactivity. In this case, showing the number of slices and the equivalent percentage of the pizza.

Now, let’s customize this graph for our purposes. And let’s imagine we have some data from a survey of over 3,000 designers answering the question, "Which tools do you use for interface design?". And by the way, this example is based on a real survey and data by the fine folks at [UX Tools][4]{: target="_blank" rel="noopener"}.

So what if you wanted your graph to be a column chart instead? In your JavaScript, locate this last section here.

```javascript
// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
chart.draw(data, options);
```

And change this visualization type to **ColumnChart** like so, and you’ll see the chart update.

```javascript
// Instantiate and draw our chart, passing in some options.
var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
chart.draw(data, options);
```

So this is great, but notice this label here is cut off, and that means you probably need to change the dimensions of the chart. Try a `width` of **800** and `height` of **400**, and now we get our label back.

Now you’ll be changing the data table for the chart by hand. But I do want to mention that there are other, more rigorous ways to do this using spreadsheets and other methods, but we simply don’t have the time to explore them here. So first, update the title and, and make that, **Which Tools Do You Use For Interface Design?**.

Next, modify the data table itself. So in this row, add the top five responses from the survey in order — so **Sketch**, **Adobe XD**, **Photoshop**, and **Illustrator**. And then the equivalent number of responses for each one – so **1911**, **1178**, **660**, **365**, and then **365** again.

And the last thing to do here is change any remaining values that don’t make sense. For example, the label here still reads **Slices** from the original graph. And there’s another one as well, and it’s not as obvious. So let’s take a look, and you can see here that there’s a column set to a string called **Topping**. So in our example, that should actually be **UI Tools**. And then for the second one, again, change this to **Responses** and notice that the label has been updated.

```javascript
// Create the data table.
var data = new google.visualization.DataTable();
data.addColumn('string', 'UI Tools');
data.addColumn('number', 'Responses');
data.addRows([
  ['Sketch', 1911],
  ['Figma', 1178],
  ['Adobe XD', 660],
  ['Photoshop', 365],
  ['Illustrator', 365]
]);
```

So again, let’s check out our final interactivity. And you can see that as you hover over the columns, and this interactive tooltip appears with the exact number of responses as well as the name of the tool. And the great thing is you get all of this for free with the Google Chart library.

*That’s it.* Thanks for watching, and don’t forget to [watch our other Take 5 video tutorials][5] and [check out our entire course catalog at Gymnasium][6].

[1]: https://thegymnasium.com/courses/GYM/106/0/about
[2]: https://codepen.io/josborn/pen/abOLorN
[3]: https://developers.google.com/chart/interactive/docs/quick_start
[4]: https://uxtools.co/survey-2019/
[5]: https://thegymnasium.com/take5
[6]: https://thegymnasium.com/courses
