const Boom = require('boom')

class responseSend {

   

   static  sendSuccess(headers, response) {
    const statusCode = (response && response.statusCode) || 200;

    //const message = (response && response.message) || configs.MessageConfiguration.get('/lang', { locale: headers['content-language'], message: 'SUCCESS' });
    const message = 'SUCCESS'
        if(response && response.ops && response.ops.length > 0){
            response = response.ops[0]
        }
    const data = response || null;
    return { statusCode, message, data };
   };

static  sendError(errorData) {
        let error
        if(errorData.isBoom){
            error = errorData
        } else {
             error = Boom.badRequest(errorData.errmsg)
        }
        console.log("errorDataerrorDataerrorDataerrorData",errorData)

        let customErrorMessage = '';
        if (error.output.payload.message.indexOf('[') > -1) {
            customErrorMessage = error.output.payload.message.substr(error.output.payload.message.indexOf('['));
        } else {
            customErrorMessage = error.output.payload.message;
        }

        customErrorMessage = customErrorMessage.replace(/"/g, '');
        customErrorMessage = customErrorMessage.replace('[', '');
        customErrorMessage = customErrorMessage.replace(']', '');
        error.output.payload.message = customErrorMessage;

        return error.output.payload

    }

}


module.exports = responseSend