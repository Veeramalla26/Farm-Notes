const { totalCount } = require('../controllers/admin')


async function getTotalCount(req, res) {
    try {
        const result = await totalCount(req.query);
        res.status(result.statusCode || 200);
        res.send(result.message || result);
    } catch (error) {
        res.statusCode = 400;
        res.send({
            error: error.message
        })
    }
}

module.exports = exports = {
    getTotalCount
};