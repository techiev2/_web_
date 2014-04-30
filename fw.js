(function (w, d) {

    "use strict";

    function Field () {

    }

    function Model () {

        var key,
            val;

        this.init = function () {
            console.log("Initialized model!");
        };

        this.init();
    }

    /*Model.prototype = {
        get: function (key, function () {
            var _ = this[key];
            if (!_) {
                return _;
            }
            return _.__value;
        },
        set: function (key, function (val) {
            var _ = this[key];
            if (_ !== undefined) {
                if (val === null) {
                    if (!(_.nullable)) {
                        throw "Null value is not allowed";
                    } else {
                        _.__value = val;
                    }
                } else {
                    _.__value = val;
                }
            }
            return _;
        }
    };*/

    Model.constructor.prototype.get = function (key) {
        var _ = this[key];
        return _.__value;
    };
    Model.constructor.prototype.set = function (key, value) {
        var _ = this[key];
        if (_) {
            _['__value'] = value;
            return this;
        }
    };

    w.Model = Model;

}(window, window.document))