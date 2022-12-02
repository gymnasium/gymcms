import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts';
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// $gym-green: #2c9959;
// $gym-magenta: #d73158;
// $gym-purple: #764c9f;
// $gym-teal: #5ca5a0;

// TODO: Change URL before release
const domain = 'https://staging.thegymcms.com';

const brandon = new URL(`../../fonts/brandon_bld-webfont.woff`, import.meta.url);

const font = fetch(brandon).then(
  (res) => res.arrayBuffer(),
);

async function loadMetaTitle(url: string) {
  const resp = await fetch(url);
  const html = await resp.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, 'text/html');
  const metaTitle = htmlDoc.querySelector('[property="og:title"]');
  const ogTitle = metaTitle.getAttribute('content');
  const topic = metaTitle.getAttribute('data-topic');
  return {ogTitle, topic};
}

// Calculate aspect ratio of a resized image, assuming one knows the initial dimensions
function aspectRatio(width:number, height:number, newWidth:number) {
  let ratio = height/width;

  return newWidth * ratio; 
}

export default async function handler(req: Request) {
  const fontData = await font;
  // Get the query parameters from the request
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const bgColor = params.get('bg') ?? '222';
  const imgBgColor = params.get('imgbg') ?? '222';
  const courseNum: any = params.get('courseNum') ?? false;
  const offset = params.get('offset') ?? 0;
  let footerText = params.get('footer') ?? 'thegymnasium.com';
  // const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath: any;
  let metaPath: any;
  let courseType: any;
  let metaData: any;

  // If we have a course number, grab specific data
  if (courseNum) {
    if (courseNum < 100) {
      courseType = 'gym-shorts';
      imgPath = `/img/course-artwork/svg/gym-${courseNum}.svg`;
    } else if (courseNum >= 100 && courseNum < 700) {
      courseType = 'full';
      imgPath = `/img/course-artwork/svg/gym-${courseNum}.svg`;
    } else if (courseNum >= 700 && courseNum < 800) {
      courseType = 'workshops';
      imgPath = null;
    } else if (courseNum >= 5000) {
      courseType = 'take5';
      imgPath = `/img/take5/posters/gym-${courseNum}.jpg`;
    }

    metaPath = `/courses/${courseType}/gym-${courseNum}/meta/index.html`;
  }

  console.log(metaPath);
  if (!metaPath) {
    metaData = '';
  } else {
    metaData = await loadMetaTitle(`http://localhost:8888/${metaPath}`);
  }

  // Allow override of title via url params
  let title = params.get('title') ?? metaData.ogTitle;

  const imgUrl = `${domain}${imgPath}`;

  // defaults
  const wrapperWidth = 1200;
  const wrapperHeight = 628;
  let imgWidth = 0;
  let bgImg = '';
  let bgSize = '';
  let bgPos = '0 0';
  let titleFontSize = 50;
  let footerColor = 'ff5f14';
  let footerCase = 'initial';
  let contentJustify = 'space-around';
  let logoDisplay = 'flex';
  let headerDisplay = 'none';
  let headerText = '';

  if (!!imgPath) {
    // General defaults + some take 5 settings
    bgImg = `url(${imgUrl})`;
    bgSize = 'initial';

    if (courseType === 'take5') {
      imgWidth = 320;
      titleFontSize = 90;
      footerColor = 'ccc';
      contentJustify = 'space-between';
      bgPos = `-${offset}px 0px`;
      footerCase = 'uppercase';
      logoDisplay = 'none';
      headerDisplay = 'flex';
      headerText = 'Take 5';
      if (metaData.topic) {
        footerText = metaData.topic;
      }
    } else {
      const iconSize = 300;
      bgSize = `${iconSize}px ${aspectRatio(574,488,iconSize)}px`;

      imgWidth = 516;
      bgPos = `10% 40%`;
      titleFontSize = 80;
      contentJustify = 'space-around';
    }
  }

  let contentWidth = wrapperWidth - imgWidth;

  let CONFIG_WRAPPER = {
    height: '100%',
    width: '100%',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'stretch',
    alignItems: 'flex-start',
    backgroundColor: '#222',
    color: '#fff',
    fontSize: '50px',
    fontWeight: 'bold',
    fontFamily: 'brandon-grotesque',
    position: 'relative',
    zIndex: 1,
  }

  let CONFIG_IMG = {
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
    padding: '60px',
    marginLeft: `${imgWidth}px`,
    backgroundColor: `#${bgColor}`,
    width: `${contentWidth}px`,
    height: '100%',
  }

  let CONFIG_TITLE = {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: `${titleFontSize}px`,
    lineHeight: 1,
  }

  let CONFIG_FOOTER = {
    color: `#${footerColor}`,
    textTransform: `${footerCase}`,
  }

  // Generate the open graph image
  return new ImageResponse(
    (
      <div style={CONFIG_WRAPPER}>
        <figure style={CONFIG_IMG}></figure>
        <section style={CONFIG_CONTENT}>
          <header style={
            {
              color: '#000',
              display: `${headerDisplay}`,
            }
          }>{headerText}</header>
          <img style={
            {
              display: `${logoDisplay}`,
            }
          } src='https://thegymcms.com/img/brand/svg/gymnasium-logo-white.svg' width='300' />
          <h1 style={CONFIG_TITLE}>{title}</h1>
          <div style={CONFIG_FOOTER}>{footerText}</div>
        </section>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      debug: true,
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
