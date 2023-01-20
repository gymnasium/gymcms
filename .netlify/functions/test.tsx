import React from "https://esm.sh/react";
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts'
import { Context } from "https://edge.netlify.com";

function Uint8ArrayToArrayBuffer(array: Uint8Array): ArrayBuffer {
  return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
}

export default async (req: Request, context: Context) => {
  try {
    const url = new URL(req.url);
    const params:any = new URLSearchParams(url.search);
    let fontData:any;

    try {
      fontData = await fetch(`${url.origin}/fonts/brandon_bld-webfont.woff`).then(
        (res) => res.arrayBuffer(),
      );
    } catch(e:any) {
      console.log(`${e.message}`);
      return new Response(`Failed to get font`, {
        status: 500,
      });
    }
    

    // const font = await Deno.readFile(`./fonts/brandon_bld-webfont.woff`);
    // const buffer = Uint8ArrayToArrayBuffer(font);


    // ?title=<title>
    const hasTitle = params.has("title");
    const title = hasTitle
      ? params.get("title") : "Testing Playground";

    return new ImageResponse(
      <div
        style={{
          backgroundColor: "black",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt="Circle"
            height={200}
            src="data:image/svg+xml,%3Csvg viewBox='0 0 100 100' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='50' cy='50' r='50' /%3E%3C/svg%3E"
            style={{ margin: "0 30px" }}
            width={200}
          />
        </div>
        <div
          style={{
            fontFamily: 'brandon-grotesque',
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "white",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        >
          {title}
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: 'brandon-grotesque',
            data: fontData,
            style: 'normal',
          }
        ],
      },
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
