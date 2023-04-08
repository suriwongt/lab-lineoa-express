export const searckMarketMessage = (
  title: string,
  replyText: Array<string>
) => {
  const message = {
    type: "text",
    text: title,
    quickReply: {
      items: replyText.map((p) => ({
        type: "action",
        action: {
          type: "message",
          label: p,
          text: p,
        },
      })),
    },
  };
  return message;
};
