export const searckMarketMessage = (replyText: Array<string>) => {
  const message = {
    type: "text",
    text: "โปรดเลือกจังหวัด",
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
