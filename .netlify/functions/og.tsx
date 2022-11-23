import React from "https://esm.sh/react@18.2.0";
import { ImageResponse } from "https://deno.land/x/og_edge@0.0.4/mod.ts";

const brandonReg = new URL('../../fonts/brandon_reg-webfont.woff', import.meta.url);

console.log('brandonReg: ', brandonReg);

const font = fetch(brandonReg).then(
  (res) => res.arrayBuffer(),
);

export default async function handler(req: Request) {
  const fontData = await font;
  // Get the query parameters from the request
  const url = new URL(req.url);
  const params = new URLSearchParams(url.search);
  const title = params.get("title") ?? "Welcome to Gymnasium";
  const pubDate = params.get("pubDate") ?? new Date().toISOString();
  // Generate the open graph image
  return new ImageResponse(
    (
      <div
        style={{
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
          padding: '1rem',
          position: 'relative'
        }}
      >
        <section
          style={{
            order: 1,
            flexGrow: 1,
            flexShrink: 0,
            alignSelf: 'center',
            justifyContent: 'center',
            width: '40%',
            background: '#2C9959',
          }}
        >
          <img src="https://thegymcms.com/img/course-artwork/svg/gym-001.svg" alt="" width="200" />
        </section>
        <section
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            alignSelf: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            order: 2,
            flexGrow: 1,
            flexShrink: 0,
          }}
        >
          <img src="https://thegymcms.com/img/brand/svg/gymnasium-logo-white.svg" width="300" />
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
