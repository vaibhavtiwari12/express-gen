const url = require('url');

getQueryParams = (req) => {
    const url_parts = url.parse(req.url, true);
    return url_parts.query;
}

module.exports = {getQueryParams}; 
