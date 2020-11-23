function getErrorMessage(field) {
    var response = {
        success: false,
        data: null,
        message: field + ' field is missing or Invalid in the request'
    };
    return response;
}

module.exports = getErrorMessage;