const { totalCount } = require("../controllers/admin");
const { getWeather } = require("../services/openWeatherApi");

async function getTotalCount(req, res) {
  try {
    const result = await totalCount(req.query);
    res.status(result.statusCode || 200);
    res.send(result.message || result);
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
}

async function getWeatherAPI(req, res) {
  try {
    const result = await getWeather(req.query.city);
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
}

module.exports = exports = {
  getTotalCount,
  getWeatherAPI,
};
