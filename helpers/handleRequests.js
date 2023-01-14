
module.exports = {
    returnError: (res, err, statusCode) => {
        console.log(err);
        res.status(statusCode || 500).send({
            apiStatus: false,
            data: err[0] === "#" ? err : "#1.1.1"
        });
    },
    returnSuccess: (res, data) => {
        res.status(200).send({
            apiStatus: true,
            data: data
        });
    }
}