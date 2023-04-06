import mongoose from "mongoose";

let connection: mongoose.Connection;

mongoose.connection.on("connected", () => {
  console.log("mongodb connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log("mongodb error:", err);
});

const connect = async (): Promise<mongoose.Connection> => {
  console.log("mongodb connecting ⏱️");
  if (!connection)
    connection = (await mongoose.connect(process.env.DB as string, {}))
      .connection;
  return connection;
};

export default {
  connect,
};
