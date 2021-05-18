var tslib_1 = require("tslib");
var JSONStorage, KEY_FOR_EMPTY_STRING, LocalStorage, MetaKey, QUOTA_EXCEEDED_ERR, StorageEvent, _emptyDirectory, _escapeKey, _rm, createMap, dirname, events, fs, path, writeSync;
path = require('path');
dirname = path.dirname;
fs = require('fs');
events = require('events');
writeSync = require('write-file-atomic').sync;
KEY_FOR_EMPTY_STRING = '---.EMPTY_STRING.---'; // Chose something that no one is likely to ever use
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
    if (!fs.existsSync(dirname(target))) {
        fs.mkdirSync(dirname(target));
    }
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
QUOTA_EXCEEDED_ERR = /** @class */ (function (_super) {
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
StorageEvent = /** @class */ (function () {
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
MetaKey = /** @class */ (function () {
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
    var LocalStorage = /** @class */ (function (_super) {
        tslib_1.__extends(LocalStorage, _super);
        function LocalStorage(_location, quota) {
            if (quota === void 0) { quota = 5 * 1024 * 1024; }
            var _this = this;
            var handler;
            _this = _super.call(this) || this;
            _this._location = _location;
            _this.quota = quota;
            // super(_location, quota)
            // @_location = _location
            // @quota = quota
            if (!(_this instanceof LocalStorage)) {
                return new LocalStorage(_this._location, _this.quota);
            }
            _this._location = path.resolve(_this._location);
            if (instanceMap[_this._location] != null) {
                return instanceMap[_this._location];
            }
            _this.length = 0; // !TODO: Maybe change this to a property with __defineProperty__
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
            // else it'll return this
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
                // At this point, it exists and is definitely a directory. So read it.
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
                // If it errors, that might mean it didn't exist, so try to create it
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
JSONStorage = /** @class */ (function (_super) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYWxTdG9yYWdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vbGlicy9zcmMvbm9kZS1sb2NhbHN0b3JhZ2UvZGlzdC9Mb2NhbFN0b3JhZ2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLElBQUksV0FBVyxFQUFFLG9CQUFvQixFQUFFLFlBQVksRUFBRSxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBRWxMLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFFdkIsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7QUFFdkIsRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVuQixNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRTNCLFNBQVMsR0FBRyxPQUFPLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFFOUMsb0JBQW9CLEdBQUcsc0JBQXNCLENBQUMsQ0FBQyxvREFBb0Q7QUFFbkcsZUFBZSxHQUFHLFVBQVMsTUFBTTtJQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUM7SUFDNUIsR0FBRyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNiLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQzFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDWCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcs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