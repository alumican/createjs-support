var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var alm;
(function (alm) {
    var Num = (function () {
        function Num() {
        }
        Num.map = function (value, srcMin, srcMax, dstMin, dstMax, clamp) {
            if (clamp === void 0) { clamp = true; }
            if (srcMin == srcMax)
                return dstMin;
            if (clamp) {
                if (srcMin < srcMax) {
                    if (value < srcMin)
                        value = srcMin;
                    else if (value > srcMax)
                        value = srcMax;
                }
                else {
                    if (value < srcMax)
                        value = srcMax;
                    else if (value > srcMin)
                        value = srcMin;
                }
            }
            return (value - srcMin) * (dstMax - dstMin) / (srcMax - srcMin) + dstMin;
        };
        Num.random = function (min, max) {
            if (min === void 0) { min = 0; }
            if (max === void 0) { max = 1; }
            return min + (max - min) * Math.random();
        };
        Num.clamp = function (value, min, max) {
            return value < min ? min : (value > max ? max : value);
        };
        Num.dist = function (x1, y1, x2, y2, squared) {
            if (squared === void 0) { squared = false; }
            var dx = x2 - x1;
            var dy = y2 - y1;
            return squared ? (dx * dx + dy * dy) : Math.sqrt(dx * dx + dy * dy);
        };
        Num.radToDeg = function (radian) {
            return radian * Num.RAD2DEG;
        };
        Num.degToRad = function (degree) {
            return degree * Num.DEG2RAD;
        };
        Num.turn = function (from, to, radian) {
            if (radian === void 0) { radian = true; }
            return radian ? ((to - from + Num.PI3) % Num.PI2 - Math.PI) : ((to - from + 540) % 360 - 180);
        };
        return Num;
    }());
    Num.PI2 = Math.PI * 2;
    Num.PI3 = Math.PI * 3;
    Num.PI4 = Math.PI * 4;
    Num.PI5 = Math.PI * 5;
    Num.PI6 = Math.PI * 6;
    Num.PI_2 = Math.PI / 2;
    Num.PI_3 = Math.PI / 3;
    Num.PI_4 = Math.PI / 4;
    Num.PI_6 = Math.PI / 6;
    Num.RAD2DEG = 180 / Math.PI;
    Num.DEG2RAD = Math.PI / 180;
    alm.Num = Num;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var Arr = (function () {
        function Arr() {
        }
        Arr.unique = function (list) {
            return list.filter(function (x, i, self) {
                return self.indexOf(x) === i;
            });
        };
        Arr.duplicated = function (list, unique) {
            if (unique === void 0) { unique = false; }
            if (unique) {
                return list.filter(function (x, i, self) {
                    return self.indexOf(x) !== self.lastIndexOf(x);
                });
            }
            else {
                return list.filter(function (x, i, self) {
                    return (self.indexOf(x) === i) && (self.lastIndexOf(x) !== i);
                });
            }
        };
        return Arr;
    }());
    alm.Arr = Arr;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var CommandUtil = (function () {
        function CommandUtil() {
        }
        CommandUtil.stop = function (command) {
            if (command)
                command.interrupt();
            return null;
        };
        CommandUtil.sequence = function (execute) {
            var commands = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                commands[_i - 1] = arguments[_i];
            }
            var c = new cmd.Serial();
            c.addCommand.apply(c, commands);
            if (execute)
                c.execute();
            return c;
        };
        CommandUtil.fadeToCreatejs = function (target, opacity, duration, easing, execute) {
            if (execute === void 0) { execute = true; }
            var tween = new cmd.Tween(target, { alpha: opacity }, null, duration, easing, function () {
                if (opacity > 0)
                    target.visible = true;
            }, null, function () {
                if (opacity <= 0)
                    target.visible = false;
            });
            if (execute)
                tween.execute();
            return tween;
        };
        CommandUtil.fadeInCreatejs = function (target, duration, easing, execute) {
            if (execute === void 0) { execute = true; }
            return CommandUtil.fadeToCreatejs(target, 1, duration, easing, execute);
        };
        CommandUtil.fadeOutCreatejs = function (target, duration, easing, execute) {
            if (execute === void 0) { execute = true; }
            return CommandUtil.fadeToCreatejs(target, 0, duration, easing, execute);
        };
        CommandUtil.fadeToJquery = function (target, opacity, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            var o = { value: parseInt(target.css("opacity")) };
            var tween = new cmd.Tween(o, { value: opacity }, null, duration, easing, function () {
                if (opacity > 0) {
                    if (switchDisplayTo != "")
                        target.css("display", switchDisplayTo);
                    if (switchVisibility)
                        target.css("visibility", "visible");
                }
            }, function (progressTime, progressValue) {
                target.css("opacity", progressValue);
            }, function () {
                if (opacity <= 0) {
                    if (switchDisplayTo != "")
                        target.css("display", "none");
                    if (switchVisibility)
                        target.css("visibility", "hidden");
                }
            });
            if (execute)
                tween.execute();
            return tween;
        };
        CommandUtil.fadeInJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            return CommandUtil.fadeToJquery(target, 1, duration, easing, switchDisplayTo, switchVisibility, execute);
        };
        CommandUtil.fadeOutJquery = function (target, duration, easing, switchDisplayTo, switchVisibility, execute) {
            if (switchDisplayTo === void 0) { switchDisplayTo = ""; }
            if (switchVisibility === void 0) { switchVisibility = false; }
            if (execute === void 0) { execute = true; }
            return CommandUtil.fadeToJquery(target, 0, duration, easing, switchDisplayTo, switchVisibility, execute);
        };
        return CommandUtil;
    }());
    alm.CommandUtil = CommandUtil;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var AnimateUtil = (function () {
        function AnimateUtil() {
        }
        AnimateUtil.getLinkageMovieClip = function (linkageId) {
            return new window["lib"][linkageId]();
        };
        AnimateUtil.getChildByName = function (parent, childName) {
            return parent[childName];
        };
        return AnimateUtil;
    }());
    alm.AnimateUtil = AnimateUtil;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var Align;
    (function (Align) {
        Align[Align["Top_Left"] = 0] = "Top_Left";
        Align[Align["Top_Center"] = 1] = "Top_Center";
        Align[Align["Top_Right"] = 2] = "Top_Right";
        Align[Align["Middle_Left"] = 3] = "Middle_Left";
        Align[Align["Middle_Center"] = 4] = "Middle_Center";
        Align[Align["Middle_Right"] = 5] = "Middle_Right";
        Align[Align["Bottom_Left"] = 6] = "Bottom_Left";
        Align[Align["Bottom_Center"] = 7] = "Bottom_Center";
        Align[Align["Bottom_Right"] = 8] = "Bottom_Right";
    })(Align = alm.Align || (alm.Align = {}));
    var ScaleMode;
    (function (ScaleMode) {
        ScaleMode[ScaleMode["ExactFit"] = 0] = "ExactFit";
        ScaleMode[ScaleMode["ShowAll"] = 1] = "ShowAll";
        ScaleMode[ScaleMode["NoBorder"] = 2] = "NoBorder";
        ScaleMode[ScaleMode["NoScale"] = 3] = "NoScale";
    })(ScaleMode = alm.ScaleMode || (alm.ScaleMode = {}));
    var Boxer = (function () {
        function Boxer() {
        }
        Boxer.resize = function (target, bounds, scaleMode, align) {
            if (scaleMode === void 0) { scaleMode = ScaleMode.ShowAll; }
            if (align === void 0) { align = Align.Middle_Center; }
            var tx = target.x;
            var ty = target.y;
            var tw = target.width;
            var th = target.height;
            var bx = bounds.x;
            var by = bounds.y;
            var bw = bounds.width;
            var bh = bounds.height;
            switch (scaleMode) {
                case ScaleMode.ShowAll:
                case ScaleMode.NoBorder:
                    var ratioW = bw / tw;
                    var ratioH = bh / th;
                    var ratio = scaleMode == ScaleMode.ShowAll ? (ratioW < ratioH ? ratioW : ratioH) : (ratioW > ratioH ? ratioW : ratioH);
                    tw *= ratio;
                    th *= ratio;
                    break;
                case ScaleMode.ExactFit:
                    return new createjs.Rectangle(bx, by, bw, bh);
            }
            tx = bx + ((align == Align.Top_Left || align == Align.Middle_Left || align == Align.Bottom_Left) ? 0 :
                (align == Align.Top_Right || align == Align.Middle_Right || align == Align.Bottom_Right) ? (bw - tw) : (bw - tw) / 2);
            ty = by + ((align == Align.Top_Left || align == Align.Top_Center || align == Align.Top_Right) ? 0 :
                (align == Align.Bottom_Left || align == Align.Bottom_Center || align == Align.Bottom_Right) ? (bh - th) : (bh - th) / 2);
            return new createjs.Rectangle(tx, ty, tw, th);
        };
        return Boxer;
    }());
    alm.Boxer = Boxer;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var LoggerLevel;
    (function (LoggerLevel) {
        LoggerLevel[LoggerLevel["Verbose"] = 0] = "Verbose";
        LoggerLevel[LoggerLevel["Trace"] = 1] = "Trace";
        LoggerLevel[LoggerLevel["Warn"] = 2] = "Warn";
        LoggerLevel[LoggerLevel["Error"] = 3] = "Error";
        LoggerLevel[LoggerLevel["Silent"] = 4] = "Silent";
    })(LoggerLevel = alm.LoggerLevel || (alm.LoggerLevel = {}));
    var Logger = (function () {
        function Logger() {
        }
        Logger.verbose = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Verbose)
                console.log.apply(console, Array.prototype.slice.call(messages));
        };
        Logger.trace = function () {
            var messages = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                messages[_i] = arguments[_i];
            }
            if (Logger.level <= LoggerLevel.Trace)
                console.log.apply(console, Array.prototype.slice.call(messages));
        };
        Logger.warn = function (target, message, condition) {
            if (condition === void 0) { condition = true; }
            if (Logger.level <= LoggerLevel.Warn && condition) {
                trace("[WARNING] " + message + " : ", target);
            }
        };
        Logger.error = function (target, message, condition) {
            if (condition === void 0) { condition = true; }
            if (Logger.level <= LoggerLevel.Error && condition) {
                trace(target);
                throw new Error("[ERROR] " + message);
            }
        };
        return Logger;
    }());
    Logger.level = LoggerLevel.Verbose;
    alm.Logger = Logger;
})(alm || (alm = {}));
function trace() {
    var messages = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        messages[_i] = arguments[_i];
    }
    alm.Logger.trace.apply(trace.caller, arguments);
}
function throwWarn(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.Logger.warn.apply(null, arguments);
}
function throwError(target, message, condition) {
    if (condition === void 0) { condition = true; }
    alm.Logger.error.apply(null, arguments);
}
var alm;
(function (alm) {
    var DeviceInfo = (function () {
        function DeviceInfo() {
        }
        DeviceInfo.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            var u = window.navigator.userAgent.toLowerCase();
            this.isTablet = (u.indexOf("windows") != -1 && u.indexOf("touch") != -1)
                || u.indexOf("ipad") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
                || u.indexOf("kindle") != -1
                || u.indexOf("silk") != -1
                || u.indexOf("playbook") != -1;
            this.isMobile = (u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
                || u.indexOf("iphone") != -1
                || u.indexOf("ipod") != -1
                || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
                || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
                || u.indexOf("blackberry") != -1;
            this.isDesktop = !this.isTablet && !this.isMobile;
        };
        DeviceInfo.getIsDesktop = function () {
            this.initialize();
            return this.isDesktop;
        };
        DeviceInfo.getIsTablet = function () {
            this.initialize();
            return this.isTablet;
        };
        DeviceInfo.getIsMobile = function () {
            this.initialize();
            return this.isMobile;
        };
        return DeviceInfo;
    }());
    DeviceInfo.isInitialized = false;
    alm.DeviceInfo = DeviceInfo;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var Timer = (function (_super) {
        __extends(Timer, _super);
        function Timer(interval, repeatCount) {
            if (interval === void 0) { interval = 1000; }
            if (repeatCount === void 0) { repeatCount = 0; }
            var _this = _super.call(this) || this;
            _this.timerHandler = function () {
                _this.tStartTime = _this.getCurrentTime();
                ++_this.elapsedCount;
                var isCompleted = false;
                if (_this.repeatCount > 0 && _this.elapsedCount >= _this.repeatCount) {
                    isCompleted = true;
                    _this.stop();
                }
                else if (_this.tInterval != _this.interval) {
                    _this.startInterval(_this.interval);
                }
                _this.dispatch(alm.TimerEvent.TICK);
                if (isCompleted) {
                    _this.dispatch(alm.TimerEvent.COMPLETE);
                }
            };
            _this.interval = interval;
            _this.repeatCount = repeatCount;
            _this.isRunning = false;
            _this.tId = -1;
            _this.reset();
            return _this;
        }
        Timer.prototype.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.tStartTime = this.getCurrentTime();
            this.startInterval(this.tRestTime != -1 ? this.tRestTime : this.interval);
        };
        Timer.prototype.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.tRestTime = this.getCurrentTime() - this.tStartTime;
            this.stopInterval();
        };
        Timer.prototype.reset = function () {
            this.stop();
            this.elapsedCount = 0;
            this.tRestTime = -1;
        };
        Timer.prototype.restart = function () {
            this.reset();
            this.start();
        };
        Timer.prototype.getCurrentTime = function () {
            return new Date().valueOf();
        };
        Timer.prototype.startInterval = function (interval) {
            this.stopInterval();
            this.tInterval = interval;
            this.tId = window.setInterval(this.timerHandler, this.tInterval);
        };
        Timer.prototype.stopInterval = function () {
            if (this.tId != -1) {
                clearInterval(this.tId);
                this.tId = -1;
            }
        };
        Timer.prototype.dispatch = function (eventType) {
            this.dispatchEvent(new alm.TimerEvent(eventType, false, false, this.elapsedCount, this.repeatCount, this.getRestCount()));
        };
        Timer.prototype.getIsRunning = function () { return this.isRunning; };
        Timer.prototype.getInterval = function () { return this.interval; };
        Timer.prototype.setInterval = function (interval) { this.interval = interval; };
        Timer.prototype.getElapsedTime = function () { return this.getCurrentTime() - this.tStartTime; };
        Timer.prototype.getRestTime = function () { return this.interval - this.getElapsedTime(); };
        Timer.prototype.getElapsedCount = function () { return this.elapsedCount; };
        Timer.prototype.getRepeatCount = function () { return this.repeatCount; };
        Timer.prototype.setRepeatCount = function (count) { this.repeatCount = count; };
        Timer.prototype.getRestCount = function () { return this.repeatCount - this.elapsedCount; };
        return Timer;
    }(createjs.EventDispatcher));
    alm.Timer = Timer;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var TimerEvent = (function (_super) {
        __extends(TimerEvent, _super);
        function TimerEvent(eventType, bubbles, cancelable, elapsedCount, repeatCount, restCount) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (elapsedCount === void 0) { elapsedCount = 0; }
            if (repeatCount === void 0) { repeatCount = 0; }
            if (restCount === void 0) { restCount = 0; }
            var _this = _super.call(this, eventType, bubbles, cancelable) || this;
            _this.elapsedCount = elapsedCount;
            _this.repeatCount = repeatCount;
            _this.restCount = restCount;
            return _this;
        }
        TimerEvent.prototype.clone = function () {
            return new TimerEvent(this.type, this.bubbles, this.cancelable, this.elapsedCount, this.repeatCount, this.restCount);
        };
        TimerEvent.prototype.toString = function () {
            return "[TimerEvent (type=" + this.type + " elapsedCount=" + this.elapsedCount + " repeatCount=" + this.repeatCount + " restCount=" + this.restCount + ")]";
        };
        return TimerEvent;
    }(createjs.Event));
    TimerEvent.TICK = "tick";
    TimerEvent.COMPLETE = "complete";
    alm.TimerEvent = TimerEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var KeyWatcher = (function () {
        function KeyWatcher() {
        }
        KeyWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new createjs.EventDispatcher();
        };
        KeyWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[KeyWatcher] start");
            var $window = jQuery(window);
            $window.on("keydown", this.windowKeyDownHandler);
            $window.on("keyup", this.windowKeyUpHandler);
        };
        KeyWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[KeyWatcher] stop");
            var $window = jQuery(window);
            $window.off("keydown", this.windowKeyDownHandler);
            $window.off("keyup", this.windowKeyUpHandler);
        };
        KeyWatcher.addEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener, useCapture);
        };
        KeyWatcher.removeEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
        };
        KeyWatcher.getIsRunning = function () { return this.isRunning; };
        KeyWatcher.getIsAnyKeyPressed = function () { return this.pressedKeyCount > 0; };
        KeyWatcher.getIsKeyPressed = function (keyCode) { return this.isKeyPressedByKeyCode[keyCode] != null; };
        return KeyWatcher;
    }());
    KeyWatcher.windowKeyDownHandler = function (event) {
        var keyCode = event.keyCode;
        if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
            KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
            ++KeyWatcher.pressedKeyCount;
            KeyWatcher.eventDispatcher.dispatchEvent(new alm.KeyWatcherEvent(alm.KeyWatcherEvent.KEY_DOWN, false, false, event));
        }
    };
    KeyWatcher.windowKeyUpHandler = function (event) {
        var keyCode = event.keyCode;
        if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
            delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
            --KeyWatcher.pressedKeyCount;
            KeyWatcher.eventDispatcher.dispatchEvent(new alm.KeyWatcherEvent(alm.KeyWatcherEvent.KEY_UP, false, false, event));
        }
    };
    KeyWatcher.isRunning = false;
    KeyWatcher.pressedKeyCount = 0;
    KeyWatcher.isKeyPressedByKeyCode = {};
    KeyWatcher.isInitialized = false;
    KeyWatcher.eventDispatcher = null;
    alm.KeyWatcher = KeyWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var KeyWatcherEvent = (function (_super) {
        __extends(KeyWatcherEvent, _super);
        function KeyWatcherEvent(eventType, bubbles, cancelable, jqueryEvent) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            var _this = _super.call(this, eventType, bubbles, cancelable) || this;
            _this.jqueryEvent = jqueryEvent;
            _this.key = _this.jqueryEvent.key;
            _this.keyCode = _this.jqueryEvent.keyCode;
            _this.altKey = _this.jqueryEvent.altKey;
            _this.ctrlKey = _this.jqueryEvent.ctrlKey;
            _this.shiftKey = _this.jqueryEvent.shiftKey;
            return _this;
        }
        KeyWatcherEvent.prototype.clone = function () {
            return new KeyWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent);
        };
        KeyWatcherEvent.prototype.toString = function () {
            return "[KeyWatcherEvent (type=" + this.type + " key=" + this.key + ")]";
        };
        return KeyWatcherEvent;
    }(createjs.Event));
    KeyWatcherEvent.KEY_UP = "keyUp";
    KeyWatcherEvent.KEY_DOWN = "keyDown";
    alm.KeyWatcherEvent = KeyWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var KeyCode;
    (function (KeyCode) {
        KeyCode[KeyCode["Backspace"] = 8] = "Backspace";
        KeyCode[KeyCode["Tab"] = 9] = "Tab";
        KeyCode[KeyCode["Enter"] = 13] = "Enter";
        KeyCode[KeyCode["Shift"] = 16] = "Shift";
        KeyCode[KeyCode["Ctrl"] = 17] = "Ctrl";
        KeyCode[KeyCode["Alt"] = 18] = "Alt";
        KeyCode[KeyCode["PauseBreak"] = 19] = "PauseBreak";
        KeyCode[KeyCode["CapsLock"] = 20] = "CapsLock";
        KeyCode[KeyCode["Escape"] = 27] = "Escape";
        KeyCode[KeyCode["Space"] = 32] = "Space";
        KeyCode[KeyCode["PageUp"] = 33] = "PageUp";
        KeyCode[KeyCode["PageDown"] = 34] = "PageDown";
        KeyCode[KeyCode["End"] = 35] = "End";
        KeyCode[KeyCode["Home"] = 36] = "Home";
        KeyCode[KeyCode["LeftArrow"] = 37] = "LeftArrow";
        KeyCode[KeyCode["UpArrow"] = 38] = "UpArrow";
        KeyCode[KeyCode["RightArrow"] = 39] = "RightArrow";
        KeyCode[KeyCode["DownArrow"] = 40] = "DownArrow";
        KeyCode[KeyCode["Insert"] = 45] = "Insert";
        KeyCode[KeyCode["Delete"] = 46] = "Delete";
        KeyCode[KeyCode["Key0"] = 48] = "Key0";
        KeyCode[KeyCode["Key1"] = 49] = "Key1";
        KeyCode[KeyCode["Key2"] = 50] = "Key2";
        KeyCode[KeyCode["Key3"] = 51] = "Key3";
        KeyCode[KeyCode["Key4"] = 52] = "Key4";
        KeyCode[KeyCode["Key5"] = 53] = "Key5";
        KeyCode[KeyCode["Key6"] = 54] = "Key6";
        KeyCode[KeyCode["Key7"] = 55] = "Key7";
        KeyCode[KeyCode["Key8"] = 56] = "Key8";
        KeyCode[KeyCode["Key9"] = 57] = "Key9";
        KeyCode[KeyCode["ClosedParen"] = 48] = "ClosedParen";
        KeyCode[KeyCode["ExclamationMark"] = 49] = "ExclamationMark";
        KeyCode[KeyCode["AtSign"] = 50] = "AtSign";
        KeyCode[KeyCode["PoundSign"] = 51] = "PoundSign";
        KeyCode[KeyCode["Hash"] = 51] = "Hash";
        KeyCode[KeyCode["DollarSign"] = 52] = "DollarSign";
        KeyCode[KeyCode["PercentSign"] = 53] = "PercentSign";
        KeyCode[KeyCode["Caret"] = 54] = "Caret";
        KeyCode[KeyCode["Hat"] = 54] = "Hat";
        KeyCode[KeyCode["Ampersand"] = 55] = "Ampersand";
        KeyCode[KeyCode["Star"] = 56] = "Star";
        KeyCode[KeyCode["Asterik"] = 56] = "Asterik";
        KeyCode[KeyCode["OpenParen"] = 57] = "OpenParen";
        KeyCode[KeyCode["A"] = 65] = "A";
        KeyCode[KeyCode["B"] = 66] = "B";
        KeyCode[KeyCode["C"] = 67] = "C";
        KeyCode[KeyCode["D"] = 68] = "D";
        KeyCode[KeyCode["E"] = 69] = "E";
        KeyCode[KeyCode["F"] = 70] = "F";
        KeyCode[KeyCode["G"] = 71] = "G";
        KeyCode[KeyCode["H"] = 72] = "H";
        KeyCode[KeyCode["I"] = 73] = "I";
        KeyCode[KeyCode["J"] = 74] = "J";
        KeyCode[KeyCode["K"] = 75] = "K";
        KeyCode[KeyCode["L"] = 76] = "L";
        KeyCode[KeyCode["M"] = 77] = "M";
        KeyCode[KeyCode["N"] = 78] = "N";
        KeyCode[KeyCode["O"] = 79] = "O";
        KeyCode[KeyCode["P"] = 80] = "P";
        KeyCode[KeyCode["Q"] = 81] = "Q";
        KeyCode[KeyCode["R"] = 82] = "R";
        KeyCode[KeyCode["S"] = 83] = "S";
        KeyCode[KeyCode["T"] = 84] = "T";
        KeyCode[KeyCode["U"] = 85] = "U";
        KeyCode[KeyCode["V"] = 86] = "V";
        KeyCode[KeyCode["W"] = 87] = "W";
        KeyCode[KeyCode["X"] = 88] = "X";
        KeyCode[KeyCode["Y"] = 89] = "Y";
        KeyCode[KeyCode["Z"] = 90] = "Z";
        KeyCode[KeyCode["LeftWindowKey"] = 91] = "LeftWindowKey";
        KeyCode[KeyCode["RightWindowKey"] = 92] = "RightWindowKey";
        KeyCode[KeyCode["SelectKey"] = 93] = "SelectKey";
        KeyCode[KeyCode["Numpad0"] = 96] = "Numpad0";
        KeyCode[KeyCode["Numpad1"] = 97] = "Numpad1";
        KeyCode[KeyCode["Numpad2"] = 98] = "Numpad2";
        KeyCode[KeyCode["Numpad3"] = 99] = "Numpad3";
        KeyCode[KeyCode["Numpad4"] = 100] = "Numpad4";
        KeyCode[KeyCode["Numpad5"] = 101] = "Numpad5";
        KeyCode[KeyCode["Numpad6"] = 102] = "Numpad6";
        KeyCode[KeyCode["Numpad7"] = 103] = "Numpad7";
        KeyCode[KeyCode["Numpad8"] = 104] = "Numpad8";
        KeyCode[KeyCode["Numpad9"] = 105] = "Numpad9";
        KeyCode[KeyCode["Multiply"] = 106] = "Multiply";
        KeyCode[KeyCode["Add"] = 107] = "Add";
        KeyCode[KeyCode["Subtract"] = 109] = "Subtract";
        KeyCode[KeyCode["DecimalPoint"] = 110] = "DecimalPoint";
        KeyCode[KeyCode["Divide"] = 111] = "Divide";
        KeyCode[KeyCode["F1"] = 112] = "F1";
        KeyCode[KeyCode["F2"] = 113] = "F2";
        KeyCode[KeyCode["F3"] = 114] = "F3";
        KeyCode[KeyCode["F4"] = 115] = "F4";
        KeyCode[KeyCode["F5"] = 116] = "F5";
        KeyCode[KeyCode["F6"] = 117] = "F6";
        KeyCode[KeyCode["F7"] = 118] = "F7";
        KeyCode[KeyCode["F8"] = 119] = "F8";
        KeyCode[KeyCode["F9"] = 120] = "F9";
        KeyCode[KeyCode["F10"] = 121] = "F10";
        KeyCode[KeyCode["F11"] = 122] = "F11";
        KeyCode[KeyCode["F12"] = 123] = "F12";
        KeyCode[KeyCode["NumLock"] = 144] = "NumLock";
        KeyCode[KeyCode["ScrollLock"] = 145] = "ScrollLock";
        KeyCode[KeyCode["SemiColon"] = 186] = "SemiColon";
        KeyCode[KeyCode["Equals"] = 187] = "Equals";
        KeyCode[KeyCode["Comma"] = 188] = "Comma";
        KeyCode[KeyCode["Dash"] = 189] = "Dash";
        KeyCode[KeyCode["Period"] = 190] = "Period";
        KeyCode[KeyCode["UnderScore"] = 189] = "UnderScore";
        KeyCode[KeyCode["PlusSign"] = 187] = "PlusSign";
        KeyCode[KeyCode["ForwardSlash"] = 191] = "ForwardSlash";
        KeyCode[KeyCode["Tilde"] = 192] = "Tilde";
        KeyCode[KeyCode["GraveAccent"] = 192] = "GraveAccent";
        KeyCode[KeyCode["OpenBracket"] = 219] = "OpenBracket";
        KeyCode[KeyCode["ClosedBracket"] = 221] = "ClosedBracket";
        KeyCode[KeyCode["Quote"] = 222] = "Quote";
    })(KeyCode = alm.KeyCode || (alm.KeyCode = {}));
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ResizeWatcher = (function () {
        function ResizeWatcher() {
        }
        ResizeWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new createjs.EventDispatcher();
        };
        ResizeWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[ResizeWatcher] start");
            jQuery(window).on("resize", this.windowResizeHandler);
            this.apply();
        };
        ResizeWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[ResizeWatcher] stop");
            jQuery(window).off("resize", this.windowResizeHandler);
        };
        ResizeWatcher.apply = function () {
            var $window = jQuery(window);
            ResizeWatcher.stageWidth = $window.width();
            ResizeWatcher.stageHeight = $window.height();
            var $body = jQuery("body");
            ResizeWatcher.contentWidth = $body.width();
            ResizeWatcher.contentHeight = $body.height();
        };
        ResizeWatcher.addEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener, useCapture);
        };
        ResizeWatcher.removeEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
        };
        ResizeWatcher.getIsRunning = function () { return this.isRunning; };
        ResizeWatcher.getStageWidth = function () { return this.stageWidth; };
        ResizeWatcher.getStageHeight = function () { return this.stageHeight; };
        ResizeWatcher.getContentWidth = function () { return this.contentWidth; };
        ResizeWatcher.getContentHeight = function () { return this.contentHeight; };
        return ResizeWatcher;
    }());
    ResizeWatcher.windowResizeHandler = function (event) {
        ResizeWatcher.apply();
        ResizeWatcher.eventDispatcher.dispatchEvent(new alm.ResizeWatcherEvent(alm.ResizeWatcherEvent.RESIZE, false, false, event, ResizeWatcher.stageWidth, ResizeWatcher.stageHeight));
    };
    ResizeWatcher.isRunning = false;
    ResizeWatcher.stageWidth = 0;
    ResizeWatcher.stageHeight = 0;
    ResizeWatcher.contentWidth = 0;
    ResizeWatcher.contentHeight = 0;
    ResizeWatcher.isInitialized = false;
    ResizeWatcher.eventDispatcher = null;
    alm.ResizeWatcher = ResizeWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ResizeWatcherEvent = (function (_super) {
        __extends(ResizeWatcherEvent, _super);
        function ResizeWatcherEvent(eventType, bubbles, cancelable, jqueryEvent, stageWidth, stageHeight) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            if (stageWidth === void 0) { stageWidth = 0; }
            if (stageHeight === void 0) { stageHeight = 0; }
            var _this = _super.call(this, eventType, bubbles, cancelable) || this;
            _this.jqueryEvent = jqueryEvent;
            _this.stageWidth = stageWidth;
            _this.stageHeight = stageHeight;
            return _this;
        }
        ResizeWatcherEvent.prototype.clone = function () {
            return new ResizeWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent, this.stageWidth, this.stageHeight);
        };
        ResizeWatcherEvent.prototype.toString = function () {
            return "[ResizeWatcherEvent (type=" + this.type + " stageWidth=" + this.stageWidth + " stageHeight=" + this.stageHeight + ")]";
        };
        return ResizeWatcherEvent;
    }(createjs.Event));
    ResizeWatcherEvent.RESIZE = "resize";
    alm.ResizeWatcherEvent = ResizeWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ScrollWatcher = (function () {
        function ScrollWatcher() {
        }
        ScrollWatcher.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.eventDispatcher = new createjs.EventDispatcher();
        };
        ScrollWatcher.start = function () {
            if (this.isRunning)
                return;
            this.isRunning = true;
            this.initialize();
            trace("[ScrollWatcher] start");
            jQuery(window).on("resize", this.windowScrollHandler);
            jQuery(window).on("scroll", this.windowScrollHandler);
            this.apply();
        };
        ScrollWatcher.stop = function () {
            if (!this.isRunning)
                return;
            this.isRunning = false;
            this.initialize();
            trace("[ScrollWatcher] stop");
            jQuery(window).off("resize", this.windowScrollHandler);
            jQuery(window).off("scroll", this.windowScrollHandler);
        };
        ScrollWatcher.apply = function () {
            var $window = jQuery(window);
            this.windowHeight = $window.height();
            this.scrollTop = $window.scrollTop();
            this.scrollBottom = this.scrollTop + this.windowHeight;
        };
        ScrollWatcher.addEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener, useCapture);
        };
        ScrollWatcher.removeEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
        };
        ScrollWatcher.calcScrolledPosition = function (y) {
            return y - this.scrollTop;
        };
        ;
        ScrollWatcher.calcScrolledPositionRatio = function (y) {
            return this.calcScrolledPosition(y) / this.windowHeight;
        };
        ScrollWatcher.getIsRunning = function () { return this.isRunning; };
        ScrollWatcher.getScrollTop = function () { return this.scrollTop; };
        ScrollWatcher.getScrollBottom = function () { return this.scrollBottom; };
        ScrollWatcher.getWindowHeight = function () { return this.windowHeight; };
        return ScrollWatcher;
    }());
    ScrollWatcher.windowScrollHandler = function (event) {
        ScrollWatcher.apply();
        ScrollWatcher.eventDispatcher.dispatchEvent(new alm.ScrollWatcherEvent(alm.ScrollWatcherEvent.SCROLL, false, false, event));
    };
    ScrollWatcher.windowResizeHandler = function (event) {
        ScrollWatcher.apply();
    };
    ScrollWatcher.isRunning = false;
    ScrollWatcher.windowHeight = 0;
    ScrollWatcher.isInitialized = false;
    ScrollWatcher.eventDispatcher = null;
    alm.ScrollWatcher = ScrollWatcher;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var ScrollWatcherEvent = (function (_super) {
        __extends(ScrollWatcherEvent, _super);
        function ScrollWatcherEvent(eventType, bubbles, cancelable, jqueryEvent) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (jqueryEvent === void 0) { jqueryEvent = null; }
            var _this = _super.call(this, eventType, bubbles, cancelable) || this;
            _this.jqueryEvent = jqueryEvent;
            return _this;
        }
        ScrollWatcherEvent.prototype.clone = function () {
            return new ScrollWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent);
        };
        ScrollWatcherEvent.prototype.toString = function () {
            return "[ScrollWatcherEvent (type=" + this.type + ")]";
        };
        return ScrollWatcherEvent;
    }(createjs.Event));
    ScrollWatcherEvent.SCROLL = "scroll";
    alm.ScrollWatcherEvent = ScrollWatcherEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var AssetLoader = (function () {
        function AssetLoader() {
        }
        AssetLoader.initialize = function () {
            if (this.isInitialized)
                return;
            this.isInitialized = true;
            this.isLoading = false;
            this.isLoaded = false;
            this.isCanceled = false;
            this.loader = new createjs.LoadQueue();
            this.eventDispatcher = new createjs.EventDispatcher();
            this.windowImages = window["images"] = window["images"] || {};
        };
        AssetLoader.load = function () {
            if (this.isLoading || this.isLoaded)
                return;
            this.isLoading = true;
            this.initialize();
            alm.Logger.verbose("[AssetLoader] load");
            this.setListener();
            this.loader.load();
        };
        AssetLoader.addFile = function (filePath, id) {
            if (id === void 0) { id = null; }
            this.initialize();
            if (id) {
                this.loader.loadFile({ id: id, src: filePath });
            }
            else {
                this.loader.loadFile(filePath, false);
            }
        };
        AssetLoader.addFiles = function (files) {
            this.initialize();
            this.loader.loadManifest(files, false);
        };
        AssetLoader.addManifest = function (jsonPath) {
            this.initialize();
            this.loader.loadManifest(jsonPath, false);
        };
        AssetLoader.addAnimateAsset = function (basePath) {
            this.initialize();
            var manifest = this.getAnimateManifest(basePath);
            if (manifest) {
                alm.Logger.verbose("[AssetLoader] addAnimateAsset : basePath = " + basePath);
                alm.Logger.verbose(manifest);
                this.loader.loadManifest(manifest, false);
            }
            else {
                alm.Logger.verbose("[AssetLoader] manifest file is not found");
            }
        };
        AssetLoader.cancel = function () {
            if (!this.isLoading)
                return;
            this.isLoading = false;
            this.isCanceled = true;
            this.initialize();
            alm.Logger.verbose("[AssetLoader] cancel");
            this.loader.cancel();
        };
        AssetLoader.close = function () {
            if (!this.isLoading && !this.isCanceled)
                return;
            this.isLoading = false;
            this.isCanceled = false;
            this.initialize();
            alm.Logger.verbose("[AssetLoader] close");
            this.loader.close();
        };
        AssetLoader.clear = function () {
            this.initialize();
            alm.Logger.verbose("[AssetLoader] clear");
            this.clearListener();
            this.loader.destroy();
            this.loader = new createjs.LoadQueue();
        };
        AssetLoader.getResult = function (idOrPath) {
            return this.loader.getResult(idOrPath);
        };
        AssetLoader.addEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.addEventListener(eventType, listener, useCapture);
        };
        AssetLoader.removeEventListener = function (eventType, listener, useCapture) {
            if (useCapture === void 0) { useCapture = false; }
            this.initialize();
            this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
        };
        AssetLoader.setListener = function () {
            this.loader.addEventListener("fileload", this.loaderFileLoadHandler);
            this.loader.addEventListener("fileerror", this.loaderFileErrorHandler);
            this.loader.addEventListener("progress", this.loaderProgressHandler);
            this.loader.addEventListener("error", this.loaderErrorHandler);
            this.loader.addEventListener("complete", this.loaderCompleteHandler);
        };
        AssetLoader.clearListener = function () {
            this.loader.removeEventListener("fileload", this.loaderFileLoadHandler);
            this.loader.removeEventListener("fileerror", this.loaderFileErrorHandler);
            this.loader.removeEventListener("progress", this.loaderProgressHandler);
            this.loader.removeEventListener("error", this.loaderErrorHandler);
            this.loader.removeEventListener("complete", this.loaderCompleteHandler);
        };
        AssetLoader.getAnimateManifest = function (basePath) {
            if (basePath === void 0) { basePath = ""; }
            var lib = window["lib"];
            if (lib == null)
                return null;
            var properties = lib["properties"];
            if (properties == null)
                return null;
            var manifest = properties["manifest"];
            if (manifest == null)
                return null;
            if (basePath != "") {
                if (basePath.substr(-1, 1) != "/") {
                    basePath = basePath + "/";
                }
                var updated = [];
                var numFiles = manifest.length;
                var file = void 0;
                for (var i = 0; i < numFiles; ++i) {
                    file = manifest[i];
                    updated.push({ src: basePath + file.src, id: file.id });
                }
                return updated;
            }
            else {
                return manifest;
            }
        };
        AssetLoader.getIsLoading = function () { return this.isLoading; };
        AssetLoader.getIsLoaded = function () { return this.isLoaded; };
        AssetLoader.getIsCanceled = function () { return this.isCanceled; };
        return AssetLoader;
    }());
    AssetLoader.loaderFileLoadHandler = function (event) {
        alm.Logger.verbose("[AssetLoader] file load");
        var itemId = event.item.id;
        var result = event.result;
        if (itemId)
            AssetLoader.windowImages[itemId] = result;
        AssetLoader.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.FILE_LOAD, false, false, event.progress, event.loaded, event.total, result));
    };
    AssetLoader.loaderErrorHandler = function (event) {
        alm.Logger.verbose("[AssetLoader] error : title = " + event.title + ", message = " + event.message);
        AssetLoader.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.ERROR));
    };
    AssetLoader.loaderProgressHandler = function (event) {
        alm.Logger.verbose("[AssetLoader] progress : progress = " + event.progress, " (" + event.loaded + " / " + event.total + ")");
        AssetLoader.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.PROGRESS, false, false, event.progress, event.loaded, event.total));
    };
    AssetLoader.loaderFileErrorHandler = function (event) {
        alm.Logger.verbose("[AssetLoader] file error : " + event.error);
        AssetLoader.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.FILE_ERROR, false, false, event.progress, event.loaded, event.total));
    };
    AssetLoader.loaderCompleteHandler = function (event) {
        alm.Logger.verbose("[AssetLoader] complete");
        AssetLoader.eventDispatcher.dispatchEvent(new alm.AssetLoaderEvent(alm.AssetLoaderEvent.COMPLETE, false, false, event.progress, event.loaded, event.total));
    };
    AssetLoader.isInitialized = false;
    AssetLoader.eventDispatcher = null;
    alm.AssetLoader = AssetLoader;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var AssetLoaderEvent = (function (_super) {
        __extends(AssetLoaderEvent, _super);
        function AssetLoaderEvent(eventType, bubbles, cancelable, progress, loadedCount, totalCount, content) {
            if (bubbles === void 0) { bubbles = false; }
            if (cancelable === void 0) { cancelable = false; }
            if (progress === void 0) { progress = 0; }
            if (loadedCount === void 0) { loadedCount = 0; }
            if (totalCount === void 0) { totalCount = 0; }
            if (content === void 0) { content = null; }
            var _this = _super.call(this, eventType, bubbles, cancelable) || this;
            _this.progress = progress;
            _this.loadedCount = loadedCount;
            _this.totalCount = totalCount;
            _this.content = content;
            return _this;
        }
        AssetLoaderEvent.prototype.clone = function () {
            return new AssetLoaderEvent(this.type, this.bubbles, this.cancelable, this.progress, this.loadedCount, this.totalCount, this.content);
        };
        AssetLoaderEvent.prototype.toString = function () {
            return "[AssetLoaderEvent (type=" + this.type + " progress=" + this.progress + "loadedCount=" + this.loadedCount + " totalCount=" + this.totalCount + ")]";
        };
        return AssetLoaderEvent;
    }(createjs.Event));
    AssetLoaderEvent.FILE_LOAD = "fileload";
    AssetLoaderEvent.FILE_ERROR = "fileerror";
    AssetLoaderEvent.PROGRESS = "progress";
    AssetLoaderEvent.COMPLETE = "complete";
    AssetLoaderEvent.ERROR = "error";
    alm.AssetLoaderEvent = AssetLoaderEvent;
})(alm || (alm = {}));
var alm;
(function (alm) {
    var View = (function (_super) {
        __extends(View, _super);
        function View(view) {
            if (view === void 0) { view = null; }
            var _this = _super.call(this) || this;
            _this.view = view;
            _this.isInitializing = false;
            _this.isInitialized = false;
            _this.isReady = false;
            _this.isShowing = false;
            _this.isShown = true;
            _this.isHiding = false;
            _this.autoHideWithInit = true;
            _this.name = "";
            return _this;
        }
        View.prototype.initialize = function () {
            if (this.isInitializing || this.isInitialized)
                return;
            this.isInitializing = true;
            this.view = this.implInitialize();
            throwError(this.name || this, "view is null", !this.view);
            this.hide(false);
            this.isInitializing = false;
            this.isInitialized = true;
        };
        View.prototype.ready = function () {
            if (this.isReady)
                return;
            throwError(this.name || this, "ready() was called without being initialized", !this.isInitialized);
            this.implReady();
            this.isReady = true;
        };
        View.prototype.finalize = function () {
            this.implFinalize();
        };
        View.prototype.show = function (useTransition) {
            if (useTransition === void 0) { useTransition = true; }
            if (this.isShown)
                return;
            this.getShowCommand(useTransition).execute();
        };
        View.prototype.hide = function (useTransition) {
            if (useTransition === void 0) { useTransition = true; }
            if (!this.isShown)
                return;
            this.getHideCommand(useTransition).execute();
        };
        View.prototype.getShowCommand = function (useTransition) {
            var _this = this;
            if (useTransition === void 0) { useTransition = true; }
            var command = new cmd.Serial();
            command.addCommand(new cmd.Func(function () {
                if (_this.isShown)
                    return;
                throwError(_this.name || _this, "getShowCommand() was called without being initialized", !_this.isInitialized);
                throwWarn(_this.name || _this, "getShowCommand() was called without being ready", !_this.isReady);
                _this.isShown = true;
                _this.isShowing = true;
                _this.isHiding = false;
                if (_this.hideCommand) {
                    _this.hideCommand.interrupt();
                    _this.hideCommand = null;
                }
                _this.showCommand = command;
                command.insertCommand(_this.implShow(_this.view, useTransition), new cmd.Func(function () {
                    _this.showCommand = null;
                    _this.isShowing = false;
                }));
            }));
            return command;
        };
        View.prototype.getHideCommand = function (useTransition) {
            var _this = this;
            if (useTransition === void 0) { useTransition = true; }
            var command = new cmd.Serial();
            command.addCommand(new cmd.Func(function () {
                if (!_this.isShown)
                    return;
                if (!_this.isInitializing) {
                    throwError(_this.name || _this, "getHideCommand() was called without being initialized", !_this.isInitialized);
                    throwWarn(_this.name || _this, "getHideCommand() was called without being ready", !_this.isReady);
                }
                _this.isShown = false;
                _this.isShowing = false;
                _this.isHiding = true;
                if (_this.showCommand) {
                    _this.showCommand.interrupt();
                    _this.showCommand = null;
                }
                _this.hideCommand = command;
                command.insertCommand(_this.implHide(_this.view, useTransition), new cmd.Func(function () {
                    _this.hideCommand = null;
                    _this.isHiding = false;
                }));
            }));
            return command;
        };
        View.prototype.getIsInitializing = function () { return this.isInitializing; };
        View.prototype.getIsInitialized = function () { return this.isInitialized; };
        View.prototype.getIsReady = function () { return this.isReady; };
        View.prototype.getIsShowing = function () { return this.isShowing; };
        View.prototype.getIsShown = function () { return this.isShown; };
        View.prototype.getIsHiding = function () { return this.isHiding; };
        View.prototype.getIsHidden = function () { return !this.isShown; };
        View.prototype.getView = function () { return this.view; };
        View.prototype.getAutoHideWithInit = function () { return this.autoHideWithInit; };
        View.prototype.setAutoHideWithInit = function (value) { this.autoHideWithInit = value; };
        View.prototype.getName = function () { return this.name; };
        View.prototype.setName = function (value) { this.name = value; };
        return View;
    }(createjs.EventDispatcher));
    alm.View = View;
})(alm || (alm = {}));

//# sourceMappingURL=createjs-support.js.map
