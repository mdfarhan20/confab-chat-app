
const errorHandler = (err, req, res, next) => {
    res.json({ title: "Error", msg: err.message, stackTrace: err.stack })
};

module.exports = errorHandler;