/**
 * Execute an AJAX request.
 *
 * @param {string} method The HTTP method to use.
 * @param {string} url The URL to send teh request to.
 * @param {object=} params Key-value paris of query string parameters.
 * @param {*=} data The request body.
 * @returns {Promise}
 */
function http({ method, url, params, data }) {
    return new Promise((resolve, reject) => {
        let client = new XMLHttpRequest();
        let uri = url;

        if(params) {
            let queryString = '';
            for(let key in params) {
                if(!params.hasOwnProperty(key)) continue;
                let symbol = queryString ? '&' : '?';
                let s = `${symbol}${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`;
                queryString += s;
            }
            uri += queryString;
        }

        client.open(method, uri);

        if(data && (method == 'POST' || method == 'PUT')) {
            client.send(data);
        } else {
            client.send();
        }

        client.onload = function() {
            if(this.status >= 200 && this.status < 300) {
                resolve(this.response);
            } else {
                reject(this.statusText);
            }
        };

        client.onerror = function() {
            reject(this.statusText)
        };
    })
}

/**
 * Executes a GET request to the specified location.
 *
 * @param {string} url The URL to send the request to.
 * @param {object=} params Key-value pairs of query string parameters.
 * @returns {Promise}
 */
http['get'] = (url, params) => http({
    url,
    params,
    method: 'GET'
});

/**
 * Executes a POST request to the specified location.
 *
 * @param {string} url The URL to send the request to.
 * @param {*=} data The request body.
 * @param {Object=} params Key-value paris of query string parameters.
 * @returns {Promise}
 */
http['post'] = (url, data, params) => http({
    url,
    data,
    params,
    method: 'POST'
});

export default http;