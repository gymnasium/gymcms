import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'

// $gym-green: #2c9959;
// $gym-magenta: #d73158;
// $gym-purple: #764c9f;
// $gym-teal: #5ca5a0;

// Parse Data File
async function getData(domain: string, id:string) {
  try {
    const JSON = await fetch(`${domain}/feeds/data.json`);
    const data = await JSON.json();
    let itemData: any;

    let type = 'courses';
    // console.log(Object.entries(data));

    if (id.toLowerCase().startsWith('web')) {
      type = 'webinars';
    }

    Object.entries(data[type]).map(obj => {
      const item:any = obj[1];

      if (id.toLowerCase() === item['id'].toLowerCase()) {
        itemData = item;
      }
    });

    return itemData;
  } catch(e:any) {
    console.warn(`${e.message}`);
    return new Response(`Couldn't find matching id!`, {
      status: 500,
    });
  }
}

// Calculate aspect ratio of a resized image, assuming one knows the initial dimensions
async function aspectRatio(width:number, height:number, newWidth:number) {
  let ratio = height/width;

  return newWidth * ratio; 
}

export default async function handler(req: Request) {
  const url = new URL(req.url);
  const domain = url.origin;

  // load webfont
  const fontData = await fetch(`${domain}/fonts/brandon_bld-webfont.woff`).then(
    (res) => res.arrayBuffer(),
  );

  // Get the query parameters from the request
  const params:any = new URLSearchParams(url.search);
  const id = params.get('id') ?? null;
  let bgColor = params.get('bg') ?? '222';
  let imgBgColor = params.get('imgbg') ?? '222';
  let imgOffset:any = Math.abs(params.get('offset')) ?? 0;
  let titleFontSize = 50;
  let footerText = params.get('footer') ?? 'thegymnasium.com';
  // const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath: any;
  let title: any;
  let topic: any;
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
  if (id) {
    try {
      metaData = await getData(domain, id);
      console.log(metaData);
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid id (data file not found)`, {
        status: 500,
      });
    }
  }

  if (metaData) {
    if (metaData.img) {
      imgPath = metaData.img;
      console.log(imgPath);
    }
    if (metaData.img_bg_color) {
      imgBgColor = metaData.img_bg_color;
    }
    if (metaData.img_offset) {
      imgOffset = metaData.img_offset;
    }
    if (metaData.bg_color) {
      bgColor = metaData.bg_color;
    }
    if (metaData.type) {
      type = metaData.type;
    }
    if (metaData.title) {
      title = metaData.title;
    }
    if (metaData.topic) {
      topic = metaData.topic;
    }
  }

  // defaults
  const wrapperWidth = 1200;
  const wrapperHeight = 628;
  let imgDisplay = 'none';
  let imgWidth = 0;
  let bgImg = 'none';
  let bgSize = 'contain';
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

  let imgUrl:any;

  if (imgPath) {
    imgUrl = `${domain}${imgPath}`;
  }

  if (params.get('title')) {
    title = params.get('title')
  }
  
  if (imgUrl) {
    // General defaults + some take 5 settings
    bgImg = `url('${imgUrl}')`;
    bgSize = '100%';
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
      if (topic) {
        footerText = topic;
      }
    } else {
      // calculate aspect ratio for proportional resizing
      const iconWidth = 516;
      let iconHeight = await aspectRatio(574,488,iconWidth);
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
