const moment = require("moment");

exports.main = ({ params }, sendResponse) => {
  const { name } = params;
  const humanReadableTime = moment().format("MM-DD-YYYY hh:mm:ss");
  sendResponse({
    body: {
      greeting: `Hello, ${name || "World"}!`,
      humanReadableTime,
      statusCode: 200,
    },
  });
};
