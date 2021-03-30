const resultSuccess = (data) => {
    return {
        hasError: false,
        errorMessage: '',
        data
    }
}

const resultError = (errorMessage) => {
    return {
        hasError: true,
        errorMessage,
        data: null
    }
}

module.exports = {
    resultSuccess,
    resultError
}
