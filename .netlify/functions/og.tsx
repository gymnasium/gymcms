import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts';
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

// TODO: Change URL before release
const domain = 'https://staging.thegymcms.com';

const brandonReg = new URL(`${domain}/fonts/brandon_reg-webfont.woff`, import.meta.url);

const font = fetch(brandonReg).then(
  (res) => res.arrayBuffer(),
);

async function loadMetaTitle(url: string) {
  const resp = await fetch(url);
  const html = await resp.text();
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(html, 'text/html');
  const metaTitle = htmlDoc.querySelector('[property="og:title"]').getAttribute('content');
  return metaTitle;
}

export default async function handler(req: Request) {
  const fontData = await font;
  // Get the query parameters from the request
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const color = params.get('color') ?? '222';
  const courseNum: any = params.get('courseNum') ?? false;
  const offset = params.get('offset') ?? 0;
  const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath: any;
  let metaPath: any;
  let courseType: any;
  let defaultTitle: string;

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

  if (metaPath === undefined) {
    defaultTitle = 'Welcome to Gymnasium';
  } else {
    defaultTitle = await loadMetaTitle(`${domain}${metaPath}`);
  }

  // Allow override of title via url params
  let title = params.get('title') ?? defaultTitle;

  const imgUrl = `${domain}${imgPath}`;

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
    fontSize: 40,
    fontWeight: '900',
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
    backgroundColor: `#${color}`,
    // backgroundSize: 'auto',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
  }

  // If we have an image, use these settings
  if (!!imgPath) {
    CONFIG_IMG['background'] = `url(${imgUrl})`;
    CONFIG_IMG['backgroundPosition'] = `${offset}px 0`;
    CONFIG_IMG['backgroundRepeat'] = 'no-repeat';
  }

  let CONFIG_TEXT = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    order: 2,
    flexGrow: 1,
    flexShrink: 0,
    padding: '2rem',
    position: 'absolute',
    left: '320px',
    top: 0,
    backgroundColor: '#' + color,
    width: '880px',
    height: '100%',
    zIndex: 3,
  }

  // Generate the open graph image
  return new ImageResponse(
    (
      <div style={CONFIG_WRAPPER}>
        <figure style={CONFIG_IMG}>
        </figure>
        <section style={CONFIG_TEXT}>
          <img src='https://thegymcms.com/img/brand/svg/gymnasium-logo-white.svg' width='300' />
          <h1>{title}</h1>
          <div>{pubDate}</div>
          <div style={{color: '#ff5f14'}}>thegymnasium.com</div>
        </section>
      </div>
    ),
    {
      width: 1200,
      height: 628,
      fonts: [
        {
          name: 'brandon-grotesque',
          data: fontData,
          style: 'normal'
        }
      ]
    }
  );
}
