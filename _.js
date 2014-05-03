(function (w, d) {

    "use strict";

    var _addEvent = function (elem, evt, handler) {
        var _type = elem._type,
            _elems,
            i = 0,
            _elem;
        if (w.addEventListener) {
            if (_type && _type === "ResultSet") {
                _elems = elem;
                for(; i < elem.length; i += 1) {
                    _elem = _elems[i];
                    _elem.addEventListener(evt, handler, false);
                }
            } else {
                elem.addEventListener(evt, handler, false);
            }
        }
        if (w.attachEvent) {
            if (_type && _type === "ResultSet") {
                _elems = elem;
                for(; i < elem.length; i += 1) {
                    _elem = _elems[i];
                    _elem.attachEvent("on" + evt, handler, false);
                }
            } else {
                elem.attachEvent("on" + evt, handler, false);
            }

        }
    };

    var _addEventHelper = function (elem, evt, handler) {
        var _type = elem._type,
            i = 0,
            _elem,
            _elems;
        if (_type && _type === "ResultSet") {
            _elems = elem;
            for(; i < elem.length; i += 1) {
                _elem = _elems[i];
                _addEvent(_elem, "click", handler);
            }
        } else {
            _addEvent(elem, "click", handler);
        }
    };

    var helpers = {
        on: function (evt, handler) {
            var _type = this._type,
                i = 0,
                _elem,
                _elems;
            if (_type && _type === "ResultSet") {
                _elems = this;
                for(; i < this.length; i += 1) {
                    _elem = _elems[i];
                    _addEvent(_elem, evt, handler);
                }
            } else {
                _addEvent(this, evt, handler);
            }
        },
        click: function (handler) {
            _addEvent(this, "click", handler);
        },
        hover: function (inHandler, outHandler) {
            _addEvent(this, "mouseenter", inHandler);
            _addEvent(this, "mouseleave", outHandler);
        },
        mouseover: function (handler) {
            _addEvent(this, "mouseover", handler);
        },
        hide: function (speed, callback) {
            var timing,
                type,
                _elem,
                _elems,
                _style,
                i = 0,
                len,
                isVisible,
                timeObj = {
                    slow: 5000,
                    normal: 2500,
                    fast: 500
                };
            timing = timeObj[speed] || timeObj.fast;
            type = this._type;
            if (type && type === "ResultSet") {
                _elems = this;
                len = _elems.length;
                for (; i < len; i += 1) {
                    _elem = _elems[i];
                    _style = w.getComputedStyle(_elem);
                    isVisible = _elem.offsetParent !== null;
                    if (isVisible) {
                        console.log(_elem);
                    }
                }
            }
        },
        hasClass: function (cls) {
            var _type,
                i = 0,
                len,
                count = 0,
                _elems,
                _elem;
            _type = this._type;
            if (_type && _type === "ResultSet") {
                _elems = this;
                len = this.length;
                for (; i < len; i += 1) {
                    _elem = _elems[i];
                    if (_elem.classList.contains(cls)) {
                        count += 1;
                    }
                }
                return count === len;
            } else {
                return this.classList.contains(cls);
            }
        },
        addClass: function (cls) {
            var classes = cls.split(" "),
                i = 0,
                j = 0,
                clsLen = classes.length,
                _cls,
                len,
                _elems,
                _elem,
                _type = this._type;
            if (_type && _type == "ResultSet") {
                _elems = this;
                len = this.length;
                for (; i < len; i += 1) {
                    _elem = _elems[i];
                    for (; j < clsLen; j += 1) {
                        _cls = classes[j];
                        if (!_elem.classList.contains(_cls)) {
                            _elem.classList.add(_cls);
                        }
                    }
                }
            } else {
                for (; j < clsLen; j += 1) {
                    _cls = classes[j];
                    if (!this.classList.contains(_cls)) {
                        this.classList.add(_cls);
                    }
                }
            }
            return _elems;
        },
        removeClass: function (cls) {
            var classes = cls.split(" "),
                i = 0,
                j = 0,
                clsLen = classes.length,
                _cls,
                len,
                _elems,
                _elem,
                _type = this._type;
            if (_type && _type == "ResultSet") {
                _elems = this;
                len = this.length;
                for (; i < len; i += 1) {
                    _elem = _elems[i];
                    for (; j < clsLen; j += 1) {
                        _cls = classes[j];
                        if (_elem.classList.contains(_cls)) {
                            _elem.classList.remove(_cls);
                        }
                    }
                }
            } else {
                for (; j < clsLen; j += 1) {
                    _cls = classes[j];
                    if (this.classList.contains(_cls)) {
                        this.classList.remove(_cls);
                    }
                }
            }
            return _elems;
        },
        attr: function (attr, val) {
            var _type = this._type,
                i = 0,
                len = this.length,
                _elems,
                _elem;
            if (_type && _type === "ResultSet") {
                _elems = this;
                for (; i < len; i += 1) {
                    _elem = _elems[i];
                    if (attr && val) {
                        _elem.setAttribute(attr, val);
                    } else {
                        return _elem.getAttribute(attr);
                    }
                }
                return _elems;
            }
        },
        ajax: function (construct) {
            var xhr = new XMLHttpRequest();
        },
        focus: function () {
            if (this._type && this._type === "ResultSet") {
                // To figure the first focusable element and focus?
                // Overkill? Fuck this.
                this[0].focus();
            } else {
                this.focus();
            }
        },
        val: function (value) {
            return $$(this).attr("value", value);
        },
        html: function (value) {
            var _elem,
                _;
            _elem = $$(this);
            if (!value) {
                if (_elem && _elem.length > 0) {
                    return _elem[0].innerHTML;
                }
                return undefined;
            }
            for (var i = 0; i < _elem.length; i += 1) {
                _ = _elem[i];
                _.innerHTML = value;
            }
            return _elem;
        },
        text: function (value) {
            var _elem;
            _elem = $$(this);
            if (_elem && _elem.length > 0) {
                return _elem[0].innerText || _elem[0].innerHTML;
                // Weirdly, some Firefox versions return undefined
            }
            return undefined;
        }
    };

    var ResultSet = function (nodeList) {
        var ret = {
                length: 0,
                _type: "ResultSet",
            },
            key,
            _resp = [],
            i = 0,
            len;
        if (nodeList && nodeList.length) {
            len = nodeList.length;
            for (; i < len; i += 1) {
                ret[i] = nodeList[i];
                ret.length += 1;
            }
        }

        for (key in helpers) {
            if (helpers.hasOwnProperty(key)) {
                ret[key] = helpers[key];
            }
        }

        ret.each = function (callee) {
            for (i = 0; i < ret.length; i += 1) {
                _resp.push(callee(this));
            }
            return _resp;
        };

        return ret;
    };

    var plugin = function (selector) {
        var retVal,
            usableSelector,
            docNodes = ["body", "html", "document"],
            plainIdSearch,
            plainClassSearch,
            nodeIdSearch,
            nodeClassSearch,
            splitter = /\.|\#/,
            nodeName,
            i = 0,
            len,
            _buffer,
            _elem;

        selector = selector || "";

        if (selector.nodeName) {
            retVal = [selector];
        } else {


            if (selector._type && selector._type === "ResultSet") {
                return selector;
            }

            plainIdSearch = selector.indexOf("#") === 0;
            plainClassSearch = selector.indexOf(".") === 0;

            nodeIdSearch = selector.indexOf("#") > 0;
            nodeClassSearch = selector.indexOf(".") > 0;

            if (docNodes.indexOf(selector.toLowerCase()) !== -1) {
                retVal = [d.body];
            } else {
                if (selector === "*") {
                    retVal = document.body.children;
                } else {
                    if (plainIdSearch || plainClassSearch) {
                        usableSelector = selector.substr(1, selector.length);
                        if (plainIdSearch) {
                            retVal = d.getElementById(usableSelector);
                            retVal = retVal ? [retVal] : [];
                        }

                        if (plainClassSearch) {
                            retVal = d.getElementsByClassName(usableSelector);
                        }
                    }

                    if (nodeIdSearch || nodeClassSearch) {
                        usableSelector = selector.split(splitter);
                        nodeName = usableSelector[0];
                        usableSelector = usableSelector[1];
                        if (nodeIdSearch) {
                            retVal = d.getElementById(usableSelector);
                            if (retVal) {
                                retVal = retVal.nodeName.toLowerCase() === nodeName ? retVal : undefined;
                            }
                        }
                        if (nodeClassSearch) {
                            _buffer = d.getElementsByClassName(usableSelector);
                            len = _buffer.length;
                            retVal = [];
                            for (; i < len; i += 1) {
                                _elem = _buffer[i];
                                if (_elem.nodeName.toLowerCase() === nodeName) {
                                    retVal.push(_elem);
                                }
                            }
                            if (!(retVal.length > 0)) {
                                retVal = undefined;
                            }
                        }
                    }
                }
            }

            if (!retVal) {
                retVal = d.getElementsByTagName(selector);
            }

        }

        retVal = retVal || [];

        retVal = ResultSet(retVal);
        retVal.selector = selector;

        return retVal;
    };

    plugin.ready = function (readyHandler) {
        var _listener;
        _listener = setInterval(function () {
            if (d.readyState === "complete") {
                clearInterval(_listener);
                readyHandler();
            }
        }, 1);
    };

    w.$$ = plugin;

}(window, window.document));


function modelDataBinder() {
    var i = 0,
        _elem,
        len,
        _elems,
        source;

    _elems = $$("*");
    len = _elems.length;

    for (; i < len; i += 1) {
        _elem = _elems[i];
        source = $$(_elem).attr("x-model-bind");
        if (source) {
            source = $$(source);
            if (source.length) {
                source.on("keyup", function (evt) {
                    var _key = (evt.keyCode || evt.which);
                    if (_key !== 13) {
                        _elem.value = evt.target.value;
                    }
                });
            }
        }
    }
}



$$.ready(function () {

    modelDataBinder();

});