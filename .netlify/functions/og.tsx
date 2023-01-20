import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';
import { basename, dirname } from 'https://deno.land/std/path/mod.ts';
import { Buffer } from "https://deno.land/std/io/buffer.ts";
import { readableStreamFromReader } from "https://deno.land/std@0.140.0/streams/conversion.ts";

// import { ProfanityEngine } from 'npm:@coffeeandfun/google-profanity-words';

import {
  // parse as yamlParse,
  parseAll as yamlParseAll,
  // stringify as yamlStringify,
} from 'https://deno.land/std/encoding/yaml.ts';


// $gym-green: #2c9959;
// $gym-magenta: #d73158;
// $gym-purple: #764c9f;
// $gym-teal: #5ca5a0;

const __dirname = new URL('.', import.meta.url).pathname;
const __root = `${__dirname}../../`;

const fontUrl = new URL(`${__root}fonts/brandon_bld-webfont.woff`, import.meta.url);

const font = fetch(fontUrl).then(
  (res) => res.arrayBuffer(),
);

// Get a full file name if we only have the first part
async function getFileName(currentPath: string, fileFragment: string) {

  try {
    for await (const dirEntry of Deno.readDir(currentPath)) {
      // console.log(dirEntry);
      const fileName = dirEntry.name.startsWith(fileFragment) &&  dirEntry.isFile ? dirEntry.name : false;
      
      if (fileName) {
        console.log(fileName);
        return fileName;
      }
    }
  } catch(err) {
    console.error(err);
  }
}

// Parse YAML data file!
async function loadDataFile(id: string) {
  // TODO: process incoming ID and determine data file path based on ID
  const lowerId = id.toLowerCase();
  const upperId = id.toUpperCase();
  let pathFragment:any = '';
  let fullPath:string = '';

  if (lowerId.startsWith('gym')) {

    const checkId = id.match(/\d+/);
    const numericId = checkId !== null ? parseInt(checkId, 10) : ()=> {return false};

    if (numericId < 700) {
      pathFragment = 'courses';
    } else if (numericId >= 700 && numericId < 800) {
      pathFragment = 'workshops';
    } else if (numericId >= 5000) {
      pathFragment = 'take5';
    }

    fullPath = `${pathFragment}/${upperId}.yml`;

  } else if (lowerId.startsWith('web')) {
    let fileName = await getFileName('./_data/webinars/', lowerId);
    fullPath = `webinars/${fileName}`;
  }

  try {
    const yaml = yamlParseAll(await Deno.readTextFile(`./_data/${fullPath}`));
    const data = yaml[0];
    const title = data['title'] ?? null;
    const topic = data['topic'] ?? null;
    const type = data['course_type'] ?? null;
    const imgBgColor = data['img_bg_color'] ?? null;
    const bgColor = data['bg_color'] ?? null;
    const img = data['poster_art'] ?? 'none';
    
    // console.log(data);

    return {title, topic, imgBgColor, bgColor, img, type};

  } catch(e: any) {
    console.warn(`${e.message}`);
    return new Response(`Failed loading data file.`, {
      status: 500,
    });
  }
}

// TODO: get meta data file from path (for static pages without data files)
async function loadMetaData(path: string) {

  if (path) {
    path = path.replace(/['"]+/g, '');
    const metaPath = `${path}meta.md`;
    console.log(`metaPath: ${metaPath}`);
    try {
      const yaml = yamlParseAll(await Deno.readTextFile(`.${metaPath}`));
      const data = yaml[0];
      const title = data['og_title'] ?? null;
      const topic = data['topic'] ?? null;
      const type = 'static';
      const imgBgColor = data['img_bg_color'] ?? null;
      const bgColor = data['bg_color'] ?? null;
      const img = data['poster_art'] ?? null;
      
      console.log(data);
  
      return {title, topic, imgBgColor, bgColor, img, type};
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Failed loading meta file.`, {
        status: 500,
      });
    }
  }
}

// async function loadMetaTitle(url: string) {
//   // const resp = await fetch(url);
//   const resp = await Deno.readFile(`./${url}`);
//   const html = await resp.text();
//   const parser = new DOMParser();
//   const htmlDoc = parser.parseFromString(html, 'text/html');
//   const metaTitle = htmlDoc.querySelector('[property="og:title"]');
//   const ogTitle = metaTitle.getAttribute('content');
//   const topic = metaTitle.getAttribute('data-topic');
//   return {ogTitle, topic};
// }

// Calculate aspect ratio of a resized image, assuming one knows the initial dimensions
function aspectRatio(width:number, height:number, newWidth:number) {
  let ratio = height/width;

  return newWidth * ratio; 
}

export default async function handler(req: Request) {
  const fontData = await font;

  // Get the query parameters from the request
  const url = new URL(req.url);
  const params:any = new URLSearchParams(url.search);
  const id = params.get('id') ?? null;
  const metaPath = params.get('metapath') ?? null;
  let bgColor = params.get('bg') ?? '222';
  let imgBgColor = params.get('imgbg') ?? '222';
  const courseNum: any = params.get('courseNum') ?? false;
  const imgOffset:any = Math.abs(params.get('offset')) ?? 0;
  let titleFontSize = 50;
  let footerText = params.get('footer') ?? 'thegymnasium.com';
  // const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath: any;
  let title: any;
  let type: any;
  let metaData: any;
  let hideFooter: boolean = false;
  let debug: boolean = false;

  if (params.has('debug')) {
    debug = true;
    params.delete('debug');
  }

  // Are there any URL parameters (other than debug [see above]) attached? If not, hide the footer too. This is to display only the Gymnasium logo when visiting /og-image
  if (params && params.toString().length === 0) {
    hideFooter = true;
  }

  // TODO: refactor courseNum to use id
  // If we have a course number, grab specific data
  if (courseNum) {
    // if (courseNum < 100) {
    //   type = 'gym-shorts';
    //   imgPath = `/img/course-artwork/svg/gym-${courseNum}.svg`;
    // } else if (courseNum >= 100 && courseNum < 700) {
    //   type = 'full';
    //   imgPath = `/img/course-artwork/svg/gym-${courseNum}.svg`;
    // } else if (courseNum >= 700 && courseNum < 800) {
    //   type = 'workshops';
    //   imgPath = null;
    // } else if (courseNum >= 5000) {
    //   type = 'take5';
    //   imgPath = `/img/take5/posters/gym-${courseNum}.jpg`;
    // }

    // metaPath = `/courses/${type}/GYM-${courseNum}/meta.md`;

    try {
      metaData = await loadDataFile(`gym-${courseNum}`);
      imgPath = metaData.img;
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid course number (course data not found)`, {
        status: 500,
      });
    }
  }

  // TODO: refactor courseNum to use id
  if (id) {
    try {
      metaData = await loadDataFile(id);      
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid id (data file not found)`, {
        status: 500,
      });
    }
  }

  if (metaPath) {
    try {
      metaData = await loadMetaData(metaPath);     
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid meta path (file not found)`, {
        status: 500,
      });
    }
  }

  if (metaData) {
    if (metaData.img) {
      imgPath = metaData.img;
    }
    if (metaData.imgBgColor) {
      imgBgColor = metaData.imgBgColor;
    }
    if (metaData.bgColor) {
      bgColor = metaData.bgColor;
    }
    if (metaData.type) {
      type = metaData.type;
    }
    if (metaData.title) {
      title = metaData.title;
    }
  }

  // defaults
  const wrapperWidth = 1200;
  const wrapperHeight = 628;
  let imgDisplay = 'none';
  let imgWidth = 0;
  let bgImg = '';
  let bgSize = '';
  let bgPos = '0 0';
  let contentAlign = 'center';
  let contentJustify = 'center';
  let footerCase = 'initial';
  let footerColor = 'ff5f14';
  let footerDisplay = 'flex';
  let logoDisplay = 'flex';
  let logoWidth = 834;
  let headerDisplay = 'none';
  let headerText = '';
  let wrapperAlign = 'center';
  let wrapperJustify = 'center';

  // Permit hiding the footer (?footer=false)
  if (hideFooter === true) {
    footerDisplay = 'none';
  }

  let imgUrl;

  if (imgPath) {
    imgUrl = `file://${__root}${imgPath}`;
  }
  
  if (params.get('title')) {
    title = params.get('title')
  }
  
  if (imgUrl) {
    // General defaults + some take 5 settings
    bgImg = `url(${imgUrl})`;
    bgSize = 'initial';
    wrapperJustify = 'flex-start';
    wrapperAlign = 'flex-start';
    imgDisplay = 'flex';
    contentAlign = 'flex-start';
    logoWidth = 300;

    if (type === 'take5') {
      imgWidth = 320;
      titleFontSize = 90;
      footerColor = 'ccc';
      contentJustify = 'space-between';
      bgPos = `-${imgOffset}px 0px`;
      footerCase = 'uppercase';
      logoDisplay = 'none';
      headerDisplay = 'flex';
      headerText = 'Take 5';
      if (metaData.topic) {
        footerText = metaData.topic;
      }
    } else {
      // calculate aspect ratio for proportional resizing
      const iconWidth = 516;
      let iconHeight = aspectRatio(574,488,iconWidth);
      bgSize = `${iconWidth}px ${iconHeight}px`;
      const iconVOffset = (wrapperHeight - iconHeight)/2;

      imgWidth = iconWidth;
      bgPos = `0px ${iconVOffset}px`;
      titleFontSize = 70;
      contentJustify = 'center';
    }
  }

  let contentWidth = wrapperWidth - imgWidth;

  let CONFIG_WRAPPER = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: `${wrapperJustify}`,
    // alignContent: 'stretch',
    alignItems: `${wrapperAlign}`,
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '50px',
    fontWeight: 'bold',
    fontFamily: 'brandon-grotesque',
    position: 'relative',
    zIndex: 1,
    lineHeight: 1,
  }

  let CONFIG_IMG = {
    display: `${imgDisplay}`,
    order: 1,
    flexGrow: 0,
    flexShrink: 0,
    alignSelf: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    backgroundImage: `${bgImg}`,
    backgroundColor: `#${imgBgColor}`,
    backgroundOrigin: 'border-box',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: `${bgPos}`,
    backgroundSize: `${bgSize}`,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  }

  let CONFIG_CONTENT = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: `${contentJustify}`,
    alignItems: `${contentAlign}`,
    padding: '60px',
    marginLeft: `${imgWidth}px`,
    backgroundColor: `#${bgColor}`,
    width: `${contentWidth}px`,
    height: '100%',
  }

  let CONFIG_TITLE = {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: titleFontSize,
  }

  let CONFIG_HEADER = {
    color: '#000',
    display: `${headerDisplay}`,
  }

  let CONFIG_LOGO = {
    display: `${logoDisplay}`,
    width: `${logoWidth}`,
  }

  let CONFIG_FOOTER = {
    color: `#${footerColor}`,
    textTransform: `${footerCase}`,
    display: `${footerDisplay}`,
  }

  if (debug) {
    console.log(
      'URL parameters: ',
      params.toString(), '\n',
      'CONFIG_WRAPPER =',
      CONFIG_WRAPPER, '\n',
      'CONFIG_IMG =',
      CONFIG_IMG, '\n',
      'CONFIG_CONTENT =',
      CONFIG_CONTENT, '\n',
      'CONFIG_HEADER =',
      CONFIG_HEADER, '\n',
      'CONFIG_LOGO =',
      CONFIG_LOGO, '\n',
      'CONFIG_TITLE =',
      CONFIG_TITLE, '\n',
      'CONFIG_FOOTER =',
      CONFIG_FOOTER, '\n',
    );
  }

  // Generate the open graph image
  return new ImageResponse(
    (
      <div style={CONFIG_WRAPPER}>
        <figure style={CONFIG_IMG}></figure>
        <section style={CONFIG_CONTENT}>
          <header style={CONFIG_HEADER}>{headerText}</header>
          <img style={CONFIG_LOGO} src='https://thegymcms.com/img/brand/svg/gymnasium-logo-white.svg' />
          <h1 style={CONFIG_TITLE}>{title}</h1>
          <div style={CONFIG_FOOTER}>{footerText}</div>
        </section>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      debug: debug,
      fonts: [
        {
          name: 'brandon-grotesque',
          data: fontData,
          style: 'normal',
        }
      ],
    }
  );
}
