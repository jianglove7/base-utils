/**
 * 
 * 
 */

function ajax({
    url,
    method = 'GET',
    data = {},
    async = true,
    headers = {},
    resType = 'json',
    timeout = 5000
}) {

    /**
     * 声明变量
     */
    let dataArr = [];
    let dataStr = "";
    let formData = new FormData();

    /**
     * 数据格式化
     * */
    method = method.toUpperCase()

    //错误判断 url为必填项
    if (!url || url === '') {
        throw new Error('请求地址不能为空');
    }

    //拼query参数
    if (['GET', 'DELETE', 'HEAD'].includes(method.toUpperCase()) && data) {
        for (let item in data) {
            dataArr.push(`${item}=${data[item]}`)
        }
        if (dataArr&&dataArr.length) {
            if (~url.indexOf('?')) {
                dataStr = '&' + dataArr.join('&');
            } else {
                dataStr = '?' + dataArr.join('&');
            }

        }
    } else if (['POST', 'PUT'].includes(method)) {
        if (data) {
            for (let item in data) {
                formData.append(item, data[item])
            }
        }

    } else {
        throw new Error('不是合法请求类型');
    }


    /**
     * 设置参数
     * */
    let xhr = new XMLHttpRequest();

    //设置返回数据格式            
    if (typeof async ==='boolean' && async) { //如果设置了同步就不能设置返回数据格式
        if (typeof resType === 'string') {
            xhr.responseType = resType;
        } else {
            throw new Error('设置返回数据格式时，请使用字符串类型');
        }
    }

    if (typeof timeout === 'number') {
        xhr.timeout = timeout
    } else {
        throw new Error('设置超时时间，请使用数值类型');
    }

     //打开
     if (['GET', 'DELETE', 'HEAD'].includes(method)) {
        xhr.open(method, url + dataStr, async);
    } else if (['POST', 'PUT'].includes(method)) {
        xhr.open(method, url, async);
    }

    // 设置header
    if (typeof headers === 'object' && Object.keys(headers).length > 0) {
        for (let key in headers) {
            xhr.setRequestHeader(key, headers[key])
        }
    }

    return new Promise((resolve, reject) => {
        xhr.onreadystatechange = function () {

            if (xhr.readyState !== 4) return
            if (xhr.status === 0) return

            let responseData = !xhr.responseType || xhr.responseType === 'text' ? xhr.responseText : xhr.response;

            resolve(responseData);
        }

        xhr.onerror = (err) => {
            reject(err)
        }

        xhr.send(formData)
    })

}