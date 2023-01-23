import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// $gym-green: #2c9959;
// $gym-magenta: #d73158;
// $gym-purple: #764c9f;
// $gym-teal: #5ca5a0;

// TODO: Change URL to production before release
const domain = 'https://deploy-preview-851--thegymcms.netlify.app';

const brandon = new URL(`${domain}/fonts/brandon_bld-webfont.woff`, import.meta.url);

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
  const params:any = new URLSearchParams(url.search);
  const bgColor = params.get('bg') ?? '222';
  const imgBgColor = params.get('imgbg') ?? '222';
  const courseNum: any = params.get('courseNum') ?? false;
  const imgOffset:any = Math.abs(params.get('offset')) ?? 0;
  let titleFontSize = 50;
  let footerText = params.get('footer') ?? 'thegymnasium.com';
  // const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath: any;
  let metaPath: any;
  let courseType: any;
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

  if (!metaPath) {
    metaData = '';
  } else {
    metaData = await loadMetaTitle(`${domain}/${metaPath}`);
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

  // Allow override of title via url params
  let title = params.get('title') ?? metaData.ogTitle;

  // Permit hiding the footer (?footer=false)
  if (hideFooter === true) {
    footerDisplay = 'none';
  }

  const imgUrl = `${domain}${imgPath}`;

  if (!!imgPath) {
    // General defaults + some take 5 settings
    bgImg = `url(${imgUrl})`;
    bgSize = 'initial';
    wrapperJustify = 'flex-start';
    wrapperAlign = 'flex-start';
    imgDisplay = 'flex';
    contentAlign = 'flex-start';
    logoWidth = 300;

    if (courseType === 'take5') {
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
