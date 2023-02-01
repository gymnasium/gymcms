import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';

// Parse Data File
async function getData(domain: string, id:any, path:any) {
  try {
    const JSON = await fetch(`${domain}/feeds/data.json`);
    const data = await JSON.json();
    id = id ? id.toLowerCase(): null;
    path = path ? `/${path.toLowerCase()}/meta/`: null;
    let itemData: any;
    let type: any;

    if (id) {
      if (id.startsWith('web')) {
        type = 'webinars';
      } else if (id.startsWith('gym-')) {
        type = 'courses';
      }
  
      Object.entries(data[type]).map(obj => {
        const item:any = obj[1];

        if (id === item['id'].toLowerCase()) {
          itemData = item;
        }
      });

    } else if (path) {
      type = 'static';
      
      Object.entries(data[type]).map(obj => {
        const item:any = obj[1];

        if (path === item['path'].toLowerCase()) {
          itemData = item;
        }
      });
    }

    return itemData;
  } catch(e:any) {
    console.warn(`${e.message}`);
    return new Response(`Couldn't find matching id!`, {
      status: 500,
    });
  }
}

// Calculate aspect ratio of a resized image, assuming one knows the initial dimensions
async function aspectRatio(width:number, height:number, dimension:{type: string,value: number}) {
  let ratio: any;

  try {
    if (dimension.type === 'width') {
      // return a width
      ratio = width/height;
    } else if (dimension.type === 'height') {
      // return a height
      ratio = height/width;
    } else {
      throw new Error('dimension.type must be `width` or `height`!');
    }
  } catch(e:any) {
    console.warn(`${e.message}`);
    return new Response(`Failed to calculate aspect ratio.`, {
      status: 500,
    });
  }
  return dimension.value * ratio; 
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
  const path = params.get('path') ?? null;
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

  // have id?
  if (id) {
    try {
      metaData = await getData(domain, id, null);
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid id (data file not found)`, {
        status: 500,
      });
    }
  }

  // have path?
  if (path) {
    try {
      metaData = await getData(domain, null, path);
    } catch(e: any) {
      console.warn(`${e.message}`);
      return new Response(`Invalid path (data not found)`, {
        status: 500,
      });
    }
  }

  if (metaData) {
    if (metaData.img) {
      imgPath = metaData.img;
    }
    if (metaData.img_bg_color) {
      imgBgColor = metaData.img_bg_color;

      if (!imgBgColor.includes('#')) {
        imgBgColor = `#${imgBgColor}`;
      }
    }
    if (metaData.img_offset) {
      imgOffset = metaData.img_offset;
    }
    if (metaData.bg_color) {
      bgColor = metaData.bg_color;

      if (!bgColor.includes('#')) {
        bgColor = `#${bgColor}`;
      }
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
  let contentBorderLeft = 'none';
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

  // TODO: something to calculate number of words to apply font size adjustments?
  let numWords:number;

  if (title) {
    numWords = title.split(' ').length;
  }

  if (path) {
    contentAlign = 'flex-start';
    contentJustify = 'space-between';
    wrapperJustify = 'space-between';
    logoWidth = 400;
  }
  
  if (imgUrl) {
    // General defaults + some take 5 settings
    bgImg = `url('${imgUrl}')`;
    bgSize = 'contain';
    wrapperJustify = 'flex-start';
    wrapperAlign = 'flex-start';
    imgDisplay = 'flex';
    contentAlign = 'flex-start';
    logoWidth = 300;

    if (type === 'take5') {
      // let iconWidth = await newImgWidth(1920,1080,wrapperHeight);
      let iconWidth = await aspectRatio(1920,1080,{type:'width',value:wrapperHeight});

      bgSize = `${iconWidth}px ${wrapperHeight}px`;
      titleFontSize = 80;
      contentBorderLeft = '2px solid #ccc';
      imgWidth = 320;
      footerColor = 'ccc';
      contentAlign = 'flex-start';
      contentJustify = 'flex-start';
      bgPos = imgOffset ? `-${imgOffset}px 0px` : '0 0';
      footerCase = 'uppercase';
      logoDisplay = 'none';
      headerDisplay = 'flex';
      headerText = 'Take 5';
      if (topic) {
        footerText = topic;
      }

      // TODO: improve logic for font size, based on sentence length
      if (title.length >= 50) {
        titleFontSize = titleFontSize * 0.80;
      } else if (title.length >= 40) {
        titleFontSize = titleFontSize * 0.90;
      } else {
        titleFontSize = titleFontSize;
      }
    } else {
      // calculate aspect ratio for proportional resizing
      const iconWidth = 516;
      let iconHeight:any = await aspectRatio(574,488,{type:'height',value:iconWidth});
      const iconVOffset = (wrapperHeight - iconHeight)/2;

      bgSize = `${iconWidth}px ${iconHeight}px`;
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
    backgroundColor: `${imgBgColor}`,
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
    borderLeft: `${contentBorderLeft}`,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: `${contentJustify}`,
    alignItems: `${contentAlign}`,
    padding: '60px',
    marginLeft: `${imgWidth}px`,
    backgroundColor: `${bgColor}`,
    width: `${contentWidth}px`,
    height: '100%',
    lineHeight: 1,
  }

  let CONFIG_TITLE = {
    color: '#fff',
    textTransform: 'uppercase',
    fontSize: titleFontSize,
    lineHeight: 1,
  }

  let CONFIG_HEADER = {
    color: '#000',
    display: `${headerDisplay}`,
    lineHeight: 1,
  }

  let CONFIG_LOGO = {
    display: `${logoDisplay}`,
    width: `${logoWidth}`,
  }

  let CONFIG_FOOTER = {
    color: `#${footerColor}`,
    textTransform: `${footerCase}`,
    display: `${footerDisplay}`,
    lineHeight: 1,
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

  const layout1 = (
    <div style={CONFIG_WRAPPER}>
      <figure style={CONFIG_IMG}></figure>
      <section style={CONFIG_CONTENT}>
        <header style={CONFIG_HEADER}>{headerText}</header>
        <img style={CONFIG_LOGO} src='https://thegymcms.com/img/brand/svg/gymnasium-logo-white.svg' />
        <h1 style={CONFIG_TITLE}>{title}</h1>
        <div style={CONFIG_FOOTER}>{footerText}</div>
      </section>
    </div>
  );


  // Generate the open graph image
  return new ImageResponse(layout1,
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
