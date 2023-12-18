
const errorHandler = (err, req, res, next) => {
    res.json({ title: "Error", message: err.message });
};

module.exports = errorHandler;