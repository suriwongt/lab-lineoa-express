export const flexUser = (
  displayName: string,
  images: string,
  hn_no: string,
  gender: string,
  name: string
) => ({
  type: "flex",
  altText: `ยินดีต้อนรับคุณ ${displayName}`,
  contents: {
    type: "bubble",
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "image",
              url: "https://www.praram9.com/wp-content/uploads/2021/07/Praram9Logo-1.png",
              size: "5xl",
              aspectMode: "fit",
              aspectRatio: "2:1",
              gravity: "center",
            },
          ],
        },
        {
          type: "box",
          layout: "horizontal",
          contents: [
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "image",
                  url: images,
                  aspectMode: "cover",
                  size: "full",
                },
              ],
              cornerRadius: "100px",
              width: "72px",
              height: "72px",
            },
            {
              type: "box",
              layout: "vertical",
              contents: [
                {
                  type: "text",
                  contents: [
                    {
                      type: "span",
                      text: `HN:${hn_no}`,
                      weight: "bold",
                      color: "#000000",
                    },
                  ],
                  size: "sm",
                  wrap: true,
                },
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "text",
                      text: `ชื่อ:${name}`,
                      size: "sm",
                      color: "#bcbcbc",
                    },
                  ],
                  spacing: "sm",
                  margin: "md",
                },
                {
                  type: "box",
                  layout: "baseline",
                  contents: [
                    {
                      type: "text",
                      text: `เพศ:${gender}`,
                      size: "sm",
                      color: "#bcbcbc",
                    },
                  ],
                  spacing: "sm",
                  margin: "md",
                },
              ],
            },
          ],
          spacing: "xl",
          paddingAll: "20px",
          borderWidth: "1px",
          borderColor: "#42BEAB",
        },
      ],
      paddingAll: "0px",
    },
    footer: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "button",
          action: {
            type: "uri",
            label: "คลิกดูรายละเอียด",
            uri: "https://liff.line.me/1660839837-qmMLVLaA",
          },
          style: "primary",
          color: "#42BEAB",
        },
      ],
      paddingTop: "15px",
    },
  },
});
