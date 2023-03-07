# Netlify Edge Functions
Below is a list of the edge functions we currently have.

## OG Image Generator

Path: `/og-image`

Accepted parameters:
 - `?id=gym-100`
 - `?path=courses/take5`

The parameters are used in turn to look up entries in the `/feeds/data.json` file, which provides everything we need to render content specific to each course.

### Layouts
Most layouts are automatically determined by the id or path passed in.

#### Logo only
Visiting `/og-image` without any parameters will display the single column logo only layout.

#### Two-Column Layouts
All courses use a two-column layout. 

##### Full & Short Course Layouts
Standard course layouts use a course icon/badge and a hex color value to color the background area behind the icon.

##### Take 5 Tutorial Layouts
Take 5 tutorials are visually different from course layouts, utilizing a custom image and an image offset.

### Additional Documentation
- [Satori](https://github.com/vercel/satori) - documentation on the Satori library, by Vercel. Of particular interest should be the section on permissible CSS.
