require("dotenv").config();

module.exports = function () {
  return {
    DNAPI_APPID: process.env.DNAPI_APPID,
    DNAPI_URI: process.env.DNAPI_URI
  };
};
