const _ = require("lodash");
const util = require("util");
const request = util.promisify(require("request"));

const { APIKEY } = process.env;
const LP_ACTIVITY = `/activities/v2/reports/landing-pages/total`;

exports.main = ({ params }, sendResponse) => {
  const defaultParams = {
    hapikey: APIKEY,
    sort: "rawViews",
    useForeignIndex: true,
    sortDir: "DESC",
    ...params
  };

  const fetchTopPerformingLPs = async (limit = 5) => {
    const { statusCode, body } = await request({
      baseUrl: "https://api.hubspot.com",
      json: true,
      uri: LP_ACTIVITY,
      qs: {
        ...defaultParams,
        limit
      }
    });
    if (statusCode != 200) {
      sendResponse({
        statusCode: 500,
        body: { message: body.message }
      });
    }
    return body.breakdowns;
  };

  (async () => {
    try {
      const lpData = await fetchTopPerformingLPs(5);
      sendResponse({
        body: {
          pages: _.map(
            lpData,
            ({ metadata: { HTML_TITLE, URL }, rawViews }) => {
              return {
                HTML_TITLE,
                URL,
                rawViews
              };
            }
          )
        },
        statusCode: 200
      });
    } catch (e) {
      sendResponse({
        statusCode: 500,
        body: {
          message: "There was a problem fetching page data for this portal",
          error: e.message
        }
      });
    }
  })();
};
