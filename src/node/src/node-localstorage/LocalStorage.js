var tslib_1 = require("tslib");
(function () {
    var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, events, fs, path, writeSync;
    path = require('path');
    fs = require('fs');
    events = require('events');
    writeSync = require('write-file-atomic').sync;
    KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---';
    _emptyDirectory = function (target) {
        var i, len, p, ref, results;
        ref = fs.readdirSync(target);
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
            p = ref[i];
            results.push(_rm(path.join(target, p)));
        }
        return results;
    };
    _rm = function (target) {
        if (fs.statSync(target).isDirectory()) {
            _emptyDirectory(target);
            return fs.rmdirSync(target);
        }
        else {
            return fs.unlinkSync(target);
        }
    };
    _escapeKey = function (key) {
        var newKey;
        if (key === '') {
            newKey = KEY_FOR_EMPTY_STRING;
        }
        else {
            newKey = key.toString();
        }
        return newKey;
    };
    QUOTA_EXCEEDED_ERR = (function (_super) {
        tslib_1.__extends(QUOTA_EXCEEDED_ERR, _super);
        function QUOTA_EXCEEDED_ERR(message) {
            if (message === void 0) { message = 'Unknown error.'; }
            var _this = _super.call(this) || this;
            _this.message = message;
            if (Error.captureStackTrace != null) {
                Error.captureStackTrace(_this, _this.constructor);
            }
            _this.name = _this.constructor.name;
            return _this;
        }
        QUOTA_EXCEEDED_ERR.prototype.toString = function () {
            return this.name + ": " + this.message;
        };
        return QUOTA_EXCEEDED_ERR;
    }(Error));
    StorageEvent = (function () {
        function StorageEvent(key1, oldValue1, newValue1, url, storageArea) {
            if (storageArea === void 0) { storageArea = 'localStorage'; }
            this.key = key1;
            this.oldValue = oldValue1;
            this.newValue = newValue1;
            this.url = url;
            this.storageArea = storageArea;
        }
        return StorageEvent;
    }());
    MetaKey = (function () {
        function MetaKey(key1, index1) {
            this.key = key1;
            this.index = index1;
            if (!(this instanceof MetaKey)) {
                return new MetaKey(this.key, this.index);
            }
        }
        return MetaKey;
    }());
    createMap = function () {
        var Map;
        Map = function () { };
        Map.prototype = Object.create(null);
        return new Map();
    };
    LocalStorage = (function () {
        var instanceMap;
        var LocalStorage = (function (_super) {
            tslib_1.__extends(LocalStorage, _super);
            function LocalStorage(_location, quota) {
                if (quota === void 0) { quota = 5 * 1024 * 1024; }
                var _this = this;
                var handler;
                _this = _super.call(this) || this;
                _this._location = _location;
                _this.quota = quota;
                if (!(_this instanceof LocalStorage)) {
                    return new LocalStorage(_this._location, _this.quota);
                }
                _this._location = path.resolve(_this._location);
                if (instanceMap[_this._location] != null) {
                    return instanceMap[_this._location];
                }
                _this.length = 0;
                _this._bytesInUse = 0;
                _this._keys = [];
                _this._metaKeyMap = createMap();
                _this._eventUrl = "pid:" + process.pid;
                _this._init();
                _this._QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
                if (typeof Proxy !== "undefined" && Proxy !== null) {
                    handler = {
                        set: function (receiver, key, value) {
                            if (_this[key] != null) {
                                return _this[key] = value;
                            }
                            else {
                                return _this.setItem(key, value);
                            }
                        },
                        get: function (receiver, key) {
                            if (_this[key] != null) {
                                return _this[key];
                            }
                            else {
                                return _this.getItem(key);
                            }
                        }
                    };
                    instanceMap[_this._location] = new Proxy(_this, handler);
                    return instanceMap[_this._location];
                }
                instanceMap[_this._location] = _this;
                return instanceMap[_this._location];
            }
            LocalStorage.prototype._init = function () {
                var _MetaKey, _decodedKey, _keys, e, i, index, k, len, stat;
                try {
                    stat = fs.statSync(this._location);
                    if ((stat != null) && !stat.isDirectory()) {
                        throw new Error("A file exists at the location '" + this._location + "' when trying to create/open localStorage");
                    }
                    this._bytesInUse = 0;
                    this.length = 0;
                    _keys = fs.readdirSync(this._location);
                    for (index = i = 0, len = _keys.length; i < len; index = ++i) {
                        k = _keys[index];
                        _decodedKey = decodeURIComponent(k);
                        this._keys.push(_decodedKey);
                        _MetaKey = new MetaKey(k, index);
                        this._metaKeyMap[_decodedKey] = _MetaKey;
                        stat = this._getStat(k);
                        if ((stat != null ? stat.size : void 0) != null) {
                            _MetaKey.size = stat.size;
                            this._bytesInUse += stat.size;
                        }
                    }
                    this.length = _keys.length;
                }
                catch (error) {
                    e = error;
                    if (e.code !== "ENOENT") {
                        throw e;
                    }
                    try {
                        fs.mkdirSync(this._location, {
                            recursive: true
                        });
                    }
                    catch (error) {
                        e = error;
                        if (e.code !== "EEXIST") {
                            throw e;
                        }
                    }
                }
            };
            LocalStorage.prototype.setItem = function (key, value) {
                var encodedKey, evnt, existsBeforeSet, filename, hasListeners, metaKey, oldLength, oldValue, valueString, valueStringLength;
                hasListeners = events.EventEmitter.listenerCount(this, 'storage');
                oldValue = null;
                if (hasListeners) {
                    oldValue = this.getItem(key);
                }
                key = _escapeKey(key);
                encodedKey = encodeURIComponent(key);
                filename = path.join(this._location, encodedKey);
                valueString = value.toString();
                valueStringLength = valueString.length;
                metaKey = this._metaKeyMap[key];
                existsBeforeSet = !!metaKey;
                if (existsBeforeSet) {
                    oldLength = metaKey.size;
                }
                else {
                    oldLength = 0;
                }
                if (this._bytesInUse - oldLength + valueStringLength > this.quota) {
                    throw new QUOTA_EXCEEDED_ERR();
                }
                writeSync(filename, valueString, 'utf8');
                if (!existsBeforeSet) {
                    metaKey = new MetaKey(encodedKey, (this._keys.push(key)) - 1);
                    metaKey.size = valueStringLength;
                    this._metaKeyMap[key] = metaKey;
                    this.length += 1;
                    this._bytesInUse += valueStringLength;
                }
                if (hasListeners) {
                    evnt = new StorageEvent(key, oldValue, value, this._eventUrl);
                    return this.emit('storage', evnt);
                }
            };
            LocalStorage.prototype.getItem = function (key) {
                var filename, metaKey;
                key = _escapeKey(key);
                metaKey = this._metaKeyMap[key];
                if (!!metaKey) {
                    filename = path.join(this._location, metaKey.key);
                    if (fs.existsSync(filename)) {
                        return fs.readFileSync(filename, 'utf8');
                    }
                    else {
                        return false;
                    }
                }
                else {
                    return null;
                }
            };
            LocalStorage.prototype._getStat = function (key) {
                var filename;
                key = _escapeKey(key);
                filename = path.join(this._location, encodeURIComponent(key));
                try {
                    return fs.statSync(filename);
                }
                catch (error) {
                    return null;
                }
            };
            LocalStorage.prototype.removeItem = function (key) {
                var evnt, filename, hasListeners, k, meta, metaKey, oldValue, ref, v;
                key = _escapeKey(key);
                metaKey = this._metaKeyMap[key];
                if (!!metaKey) {
                    hasListeners = events.EventEmitter.listenerCount(this, 'storage');
                    oldValue = null;
                    if (hasListeners) {
                        oldValue = this.getItem(key);
                    }
                    delete this._metaKeyMap[key];
                    this.length -= 1;
                    this._bytesInUse -= metaKey.size;
                    filename = path.join(this._location, metaKey.key);
                    this._keys.splice(metaKey.index, 1);
                    ref = this._metaKeyMap;
                    for (k in ref) {
                        v = ref[k];
                        meta = this._metaKeyMap[k];
                        if (meta.index > metaKey.index) {
                            meta.index -= 1;
                        }
                    }
                    _rm(filename);
                    if (hasListeners) {
                        evnt = new StorageEvent(key, oldValue, null, this._eventUrl);
                        return this.emit('storage', evnt);
                    }
                }
            };
            LocalStorage.prototype.key = function (n) {
                var rawKey;
                rawKey = this._keys[n];
                if (rawKey === KEY_FOR_EMPTY_STRING) {
                    return '';
                }
                else {
                    return rawKey;
                }
            };
            LocalStorage.prototype.clear = function () {
                var evnt;
                _emptyDirectory(this._location);
                this._metaKeyMap = createMap();
                this._keys = [];
                this.length = 0;
                this._bytesInUse = 0;
                if (events.EventEmitter.listenerCount(this, 'storage')) {
                    evnt = new StorageEvent(null, null, null, this._eventUrl);
                    return this.emit('storage', evnt);
                }
            };
            LocalStorage.prototype._getBytesInUse = function () {
                return this._bytesInUse;
            };
            LocalStorage.prototype._deleteLocation = function () {
                delete instanceMap[this._location];
                _rm(this._location);
                this._metaKeyMap = {};
                this._keys = [];
                this.length = 0;
                return this._bytesInUse = 0;
            };
            return LocalStorage;
        }(events.EventEmitter));
        ;
        instanceMap = {};
        return LocalStorage;
    }).call(this);
    JSONStorage = (function (_super) {
        tslib_1.__extends(JSONStorage, _super);
        function JSONStorage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        JSONStorage.prototype.setItem = function (key, value) {
            var newValue;
            newValue = JSON.stringify(value);
            return _super.prototype.setItem.call(this, key, newValue);
        };
        JSONStorage.prototype.getItem = function (key) {
            return JSON.parse(_super.prototype.getItem.call(this, key));
        };
        return JSONStorage;
    }(LocalStorage));
    exports.LocalStorage = LocalStorage;
    exports.JSONStorage = JSONStorage;
    exports.QUOTA_EXCEEDED_ERR = QUOTA_EXCEEDED_ERR;
}).call(this);
//# sourceMappingURL=LocalStorage.js.map