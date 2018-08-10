/// <reference path="ext-theme-neptune.js" />
var Ext = Ext || window['Ext'] || {};

if (Ext.log) {
    Ext.log({ msg: "Initializing ", level: "info", stack: false }, "in extjs_config.js");
}

Ext.__isDevelopment = (function () {
    var localhostTests = [
        /^localhost$/,
        /\b(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(:\d{1,5})?\b/ // IP v4
    ],
    host = window.location.hostname,
    isDevelopment = null,
    queryString = window.location.search,
    test, i, ln;

    if (queryString.match('(\\?|&)debug') !== null) {
        isDevelopment = true;
    }
    else if (queryString.match('(\\?|&)nodebug') !== null) {
        isDevelopment = false;
    }

    if (isDevelopment === null) {
        for (i = 0, ln = localhostTests.length; i < ln; i++) {
            test = localhostTests[i];

            if (host.search(test) !== -1) {
                isDevelopment = true;
                break;
            }
        }
    }

    if (isDevelopment === null && window.location.protocol === 'file:') {
        isDevelopment = true;
    }

    return isDevelopment;
})();

Ext.__homeUrl = (function () {
    return window.location.protocol + "//" + window.location.host + "/";
})();

Ext.__baseUrl = (function () {
    var scripts = document.getElementsByTagName('script'),
        path, i, ln, scriptSrc, match, homeUrl = Ext.__homeUrl;

    for (i = 0, ln = scripts.length; i < ln; i++) {
        scriptSrc = scripts[i].src;

        match = scriptSrc.match(/extjs_config\.js$/);

        if (match) {
            path = scriptSrc.substring(0, scriptSrc.length - match[0].length);
            break;
        }
    }
    return path;
})();

Ext.__applicationBaseUrl = (function (ExtjsBaseUrl) {
    var path = ExtjsBaseUrl;
    return path.substring(0, path.lastIndexOf('extjs', path.length - 2));
})(Ext.__baseUrl);

Ext.__virtualDirectory = (function (appBaseUrl, homeUrl) {
    var path = appBaseUrl.substring(homeUrl.length);
    return path.substring(0, path.indexOf('/'));
})(Ext.__applicationBaseUrl, Ext.__homeUrl);

Ext.__isInframe = function () {
    try {
        return window.self !== window.top;
    } catch (e) {
        return true;
    }
};

Ext.__popupWindow = function (url) {
    url = Ext.__applicationBaseUrl + url;
    var width = screen.width * 0.75;
    var height = screen.height * 0.75;
    var left = (screen.width - width) / 2;
    var top = (screen.height - height) / 2 - 50;
    var params = 'width=' + width + ', height=' + height;
    params += ', top=' + top + ', left=' + left;
    params += ', directories=no';
    params += ', location=no';
    params += ', menubar=no';
    params += ', resizable=no';
    params += ', scrollbars=no';
    params += ', status=no';
    params += ', toolbar=no';
    newwin = window.open(url, '', params);
    if (window.focus) { newwin.focus() }
    return false;
};

(function () {
    Ext.Loader.setConfig({    	
        //Whether or not to enable the dynamic dependency loading feature. Defaults to: false
        enabled: true,
        //Appends current timestamp to script files to prevent caching. Defaults to: true
        disableCaching: !Ext.__isDevelopment,
        paths: {
            //Ext: '.'
            //'Ext.ux': Ext.__baseUrl + 'src/ux',
            'Commom': Ext.__applicationBaseUrl + 'Commom'
        }
    });

    if (Ext.BLANK_IMAGE_URL.substr(0, 4) != "data") {
        Ext.BLANK_IMAGE_URL = Ext.__baseUrl + "resources/images/s.gif"
    }

    Ext.log({ msg: "Ext.require Begin ", level: "info", stack: false }, "in extjs_config.js");

    Ext.require('Ext.ux.TreePicker');
    Ext.require('Commom.toolbar.Paging');

    Ext.log({ msg: "Ext.require End ", level: "info", stack: false }, "in extjs_config.js");

    Ext.Error.handle = function (err) {
        Ext.log({ msg: "Global Error Handle: ", level: "error", stack: false });
        return false;
    };

    // The timeout in milliseconds to be used for requests. Defaults to 30000
    Ext.Ajax.timeout = 1000 * 60 * 5; // 5Min

    Ext.Ajax.on("beforerequest", function (conn, options, eOpts) {
        return true;
    });

    Ext.Ajax.on("requestcomplete", Ext.Ajax.ResponseWrapper.deserializeResponse);

    Ext.Ajax.on("requestexception", Ext.Ajax.ResponseWrapper.deserializeResponse);

    Ext.direct.Manager.on('exception', function (event, eOpts) {
        var text = "An exception occured in method " + event.action + "." + event.method + ".\r\nMessage: " + event.message + "\r\nDetail: " + event.where;
        Ext.log({ msg: "Remote Exception: \r\n", level: "error", stack: false }, text);

        var content = Ext.String.format('<b>Call {0}.{1} failed with message:</b><pre>{2}</pre>',
                    event.action, event.method,
                    Ext.util.Format.nl2br(Ext.String.htmlEncode(event.message)));
        Ext.MessageBox.show({
            title: 'ERROR',
            msg: content,
            buttons: Ext.MessageBox.OK,
            icon: Ext.MessageBox.ERROR
        });
    });


    Ext.onReady(function () {
        Ext.log({ msg: "Ext.onReady ", level: "info", stack: false }, "in extjs_config.js");
    });
    document.write('<script type="text/javascript" charset="UTF-8" src="' + Ext.__baseUrl + 'ext-theme-neptune.js"></script>');
    document.write('<script type="text/javascript" charset="UTF-8" src="' + Ext.__baseUrl + 'locale/ext-lang-zh_CN.js"></script>');
    document.write('<script type="text/javascript" charset="UTF-8" src="' + Ext.__baseUrl + 'patches/datepicker.js"></script>');
//    document.write('<script type="text/javascript" charset="UTF-8" src="' + Ext.__applicationBaseUrl + 'rpc"></script>');
})();


//EXT扩展
Ext.util.Format.percent = function (value) {
    if (!Number(value))
        return '参数错误,不是数字';
    value = Math.abs(value);
    return (value < 1 ? value * 100 : value) + '%';
}


//window扩展
//获取浏览器Url参数的值
//{name}是参数的名字
//青格勒 2015-04-28
(function (window) {
    window.getUrlParameterByName = function (name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(window.location.search);
        if (results == null)
            return "";
        else
            return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}(window));