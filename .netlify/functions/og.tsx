import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge@0.0.4/mod.ts';
import { DOMParser } from 'https://deno.land/x/deno_dom/deno-dom-wasm.ts';

const domain = window.Location[0];

console.log(domain);

const brandonReg = new URL('https://thegymcms.com/fonts/brandon_reg-webfont.woff', import.meta.url);

const font = fetch(brandonReg).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: Request) {
  const fontData = await font;
  // Get the query parameters from the request
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const type = params.get('type') ?? 'default';
  const color = params.get('color') ?? '222';
  const courseNum = params.get('courseNum') ?? '000';
  const pubDate = params.get('pubDate') ?? new Date().toISOString();
  let imgPath;
  let ext;
  let metaPath;
  let metaTitle;
  if (type === 'take5') {
    imgPath = '/img/take5/posters/gym-';
    ext = '.jpg';
    metaPath = '/courses/take5/gym-' + courseNum + '/meta/index.html';
  } else {
    imgPath = '/img/course-artwork/svg/gym-';
    ext = '.svg';
    metaPath = false;
  }

  async function loadMeta() {
    const resp = await fetch('http://localhost:8888' + metaPath);
    const html = await resp.text();
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(html, 'text/html');
    metaTitle = htmlDoc.querySelector('[name="og:title"]').getAttribute('content');
    return metaTitle;
  }

  let title = await loadMeta();

  const fullUrl = 'https://thegymcms.com' + imgPath + courseNum + ext;

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
    backgroundColor: '#' + color,
    backgroundImage: 'url(' + fullUrl + ')',
    backgroundOrigin: '0 0',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 2,
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
