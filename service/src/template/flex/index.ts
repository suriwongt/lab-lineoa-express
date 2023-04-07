export const broadcastMarket = (
  image: string,
  market_name: string,
  description: string,
  url: string
) => ({
  type: "flex",
  altText: `ด่วน!! ล๊อคว่างให้เช่า จองเลย 🔥`,
  contents: {
    type: "carousel",
    contents: [
      {
        type: "bubble",
        hero: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "image",
              url: image,
              size: "full",
              aspectRatio: "3:2",
            },
          ],
        },
        body: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "text",
              text: "ล๊อคว่างให้เช่า จองเลย",
              size: "18px",
              weight: "bold",
              color: "#1D1E19",
              contents: [
                {
                  type: "span",
                  text: "ล๊อคว่างให้เช่า",
                },
                {
                  type: "span",
                  text: market_name,
                  color: "#00ab4f",
                },
              ],
              margin: "4px",
              wrap: true,
            },
            {
              type: "text",
              size: "16px",
              weight: "regular",
              wrap: true,
              contents: [
                {
                  type: "span",
                  text: description,
                },
              ],
              margin: "8px",
            },
          ],
        },
        footer: {
          type: "box",
          layout: "vertical",
          contents: [
            {
              type: "button",
              action: {
                type: "uri",
                label: "สนใจจองล๊อค !",
                uri: url,
              },
              margin: "12px",
              style: "primary",
              color: "#24a859",
            },
          ],
        },
      },
    ],
  },
});
