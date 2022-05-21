module.exports = {
    failure: function (statusCode, errorMessage) {
        return {
            status: statusCode,
            error: {
                message: errorMessage
            }
        }
    },
    success: function (statusCode, value) {
        return {
            status: statusCode,
            data: value
        }
    }

}