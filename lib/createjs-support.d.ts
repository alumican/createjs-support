// /// <reference path="../dependency/jquery/jquery.d.ts" />
// /// <reference path="../dependency/createjs/createjs.d.ts" />
// /// <reference path="../dependency/command/lib/command.d.ts" />
declare namespace alm {
    interface Hash<T> {
        [key: string]: T;
    }
}
declare module alm {
    class Num {
        static map(value: number, srcMin: number, srcMax: number, dstMin: number, dstMax: number): number;
        static random(min?: number, max?: number): number;
        static PI: number;
        static PI2: number;
        static PI_2: number;
        static PI_3: number;
        static PI_4: number;
        static PI_6: number;
        static RAD2DEG: number;
        static DEG2RAD: number;
    }
}
declare module alm {
    class CommandUtil {
        static stop(command: cmd.Command): any;
        static fadeTo(target: createjs.DisplayObject, opacity: number, duration: number, easing: cmd.EasingFunction, execute?: boolean): cmd.Tween;
        static fadeIn(target: createjs.DisplayObject, duration: number, easing: cmd.EasingFunction, execute?: boolean): cmd.Tween;
        static fadeOut(target: createjs.DisplayObject, duration: number, easing: cmd.EasingFunction, execute?: boolean): cmd.Tween;
    }
}
declare module alm {
    class AnimateUtil {
        static getLinkageMovieClip(linkageId: string): createjs.MovieClip;
        static getChildByName(parent: createjs.Container, childName: string): createjs.DisplayObject;
    }
}
declare module alm {
    enum Align {
        Top_Left = 0,
        Top_Center = 1,
        Top_Right = 2,
        Middle_Left = 3,
        Middle_Center = 4,
        Middle_Right = 5,
        Bottom_Left = 6,
        Bottom_Center = 7,
        Bottom_Right = 8,
    }
    enum ScaleMode {
        ExactFit = 0,
        ShowAll = 1,
        NoBorder = 2,
        NoScale = 3,
    }
    class Boxer {
        static resize(target: createjs.Rectangle, bounds: createjs.Rectangle, scaleMode?: ScaleMode, align?: Align): createjs.Rectangle;
    }
}
declare namespace alm {
    enum LoggerLevel {
        Verbose = 0,
        Trace = 1,
        Warn = 2,
        Error = 3,
        Silent = 4,
    }
    class Logger {
        static level: number;
        static verbose(...messages: any[]): void;
        static trace(...messages: any[]): void;
        static warn(target: any, message: string, condition?: boolean): void;
        static error(target: any, message: string, condition?: boolean): void;
    }
}
declare function trace(...messages: any[]): void;
declare function throwWarn(target: any, message: string, condition?: boolean): void;
declare function throwError(target: any, message: string, condition?: boolean): void;
declare namespace alm {
    class Timer extends createjs.EventDispatcher {
        constructor(interval?: number, repeatCount?: number);
        start(): void;
        stop(): void;
        reset(): void;
        restart(): void;
        private getCurrentTime();
        private startInterval(interval);
        private stopInterval();
        private dispatch(eventType);
        private timerHandler;
        getIsRunning(): boolean;
        private isRunning;
        getInterval(): number;
        setInterval(interval: number): void;
        private interval;
        getElapsedTime(): number;
        getRestTime(): number;
        getElapsedCount(): number;
        private elapsedCount;
        getRepeatCount(): number;
        setRepeatCount(count: number): void;
        private repeatCount;
        getRestCount(): number;
        private tStartTime;
        private tRestTime;
        private tInterval;
        private tId;
    }
}
declare namespace alm {
    class TimerEvent extends createjs.Event {
        static TICK: string;
        static COMPLETE: string;
        constructor(eventType: string, bubbles?: boolean, cancelable?: boolean, elapsedCount?: number, repeatCount?: number, restCount?: number);
        clone(): TimerEvent;
        toString(): string;
        elapsedCount: number;
        repeatCount: number;
        restCount: number;
    }
}
declare namespace alm {
    class KeyWatcher {
        private constructor();
        private static initialize();
        static start(): void;
        static stop(): void;
        static addEventListener(eventType: string, listener: (event: KeyWatcherEvent) => void, useCapture?: boolean): void;
        static removeEventListener(eventType: string, listener: (event: KeyWatcherEvent) => void, useCapture?: boolean): void;
        private static windowKeyDownHandler;
        private static windowKeyUpHandler;
        static getIsRunning(): boolean;
        private static isRunning;
        static getIsAnyKeyPressed(): boolean;
        private static pressedKeyCount;
        static getIsKeyPressed(keyCode: number): boolean;
        private static isKeyPressedByKeyCode;
        private static isInitialized;
        private static eventDispatcher;
    }
}
declare namespace alm {
    class KeyWatcherEvent extends createjs.Event {
        static KEY_UP: string;
        static KEY_DOWN: string;
        constructor(eventType: string, bubbles?: boolean, cancelable?: boolean, jqueryEvent?: JQueryKeyEventObject);
        clone(): KeyWatcherEvent;
        toString(): string;
        jqueryEvent: JQueryKeyEventObject;
        key: string;
        keyCode: number;
        altKey: boolean;
        ctrlKey: boolean;
        shiftKey: boolean;
    }
}
declare namespace alm {
    enum KeyCode {
        Backspace = 8,
        Tab = 9,
        Enter = 13,
        Shift = 16,
        Ctrl = 17,
        Alt = 18,
        PauseBreak = 19,
        CapsLock = 20,
        Escape = 27,
        Space = 32,
        PageUp = 33,
        PageDown = 34,
        End = 35,
        Home = 36,
        LeftArrow = 37,
        UpArrow = 38,
        RightArrow = 39,
        DownArrow = 40,
        Insert = 45,
        Delete = 46,
        Key0 = 48,
        Key1 = 49,
        Key2 = 50,
        Key3 = 51,
        Key4 = 52,
        Key5 = 53,
        Key6 = 54,
        Key7 = 55,
        Key8 = 56,
        Key9 = 57,
        ClosedParen = 48,
        ExclamationMark = 49,
        AtSign = 50,
        PoundSign = 51,
        Hash = 51,
        DollarSign = 52,
        PercentSign = 53,
        Caret = 54,
        Hat = 54,
        Ampersand = 55,
        Star = 56,
        Asterik = 56,
        OpenParen = 57,
        A = 65,
        B = 66,
        C = 67,
        D = 68,
        E = 69,
        F = 70,
        G = 71,
        H = 72,
        I = 73,
        J = 74,
        K = 75,
        L = 76,
        M = 77,
        N = 78,
        O = 79,
        P = 80,
        Q = 81,
        R = 82,
        S = 83,
        T = 84,
        U = 85,
        V = 86,
        W = 87,
        X = 88,
        Y = 89,
        Z = 90,
        LeftWindowKey = 91,
        RightWindowKey = 92,
        SelectKey = 93,
        Numpad0 = 96,
        Numpad1 = 97,
        Numpad2 = 98,
        Numpad3 = 99,
        Numpad4 = 100,
        Numpad5 = 101,
        Numpad6 = 102,
        Numpad7 = 103,
        Numpad8 = 104,
        Numpad9 = 105,
        Multiply = 106,
        Add = 107,
        Subtract = 109,
        DecimalPoint = 110,
        Divide = 111,
        F1 = 112,
        F2 = 113,
        F3 = 114,
        F4 = 115,
        F5 = 116,
        F6 = 117,
        F7 = 118,
        F8 = 119,
        F9 = 120,
        F10 = 121,
        F11 = 122,
        F12 = 123,
        NumLock = 144,
        ScrollLock = 145,
        SemiColon = 186,
        Equals = 187,
        Comma = 188,
        Dash = 189,
        Period = 190,
        UnderScore = 189,
        PlusSign = 187,
        ForwardSlash = 191,
        Tilde = 192,
        GraveAccent = 192,
        OpenBracket = 219,
        ClosedBracket = 221,
        Quote = 222,
    }
}
declare namespace alm {
    class ResizeWatcher {
        private constructor();
        private static initialize();
        static start(): void;
        static stop(): void;
        static apply(): void;
        static addEventListener(eventType: string, listener: (event: ResizeWatcherEvent) => void, useCapture?: boolean): void;
        static removeEventListener(eventType: string, listener: (event: ResizeWatcherEvent) => void, useCapture?: boolean): void;
        private static windowResizeHandler;
        static getIsRunning(): boolean;
        private static isRunning;
        static getStageWidth(): number;
        private static stageWidth;
        static getStageHeight(): number;
        private static stageHeight;
        static getContentWidth(): number;
        private static contentWidth;
        static getContentHeight(): number;
        private static contentHeight;
        private static isInitialized;
        private static eventDispatcher;
    }
}
declare namespace alm {
    class ResizeWatcherEvent extends createjs.Event {
        static RESIZE: string;
        constructor(eventType: string, bubbles?: boolean, cancelable?: boolean, jqueryEvent?: JQueryEventObject, stageWidth?: number, stageHeight?: number);
        clone(): ResizeWatcherEvent;
        toString(): string;
        jqueryEvent: JQueryEventObject;
        stageWidth: number;
        stageHeight: number;
    }
}
declare namespace alm {
    class ScrollWatcher {
        private constructor();
        private static initialize();
        static start(): void;
        static stop(): void;
        static apply(): void;
        static addEventListener(eventType: string, listener: (event: ScrollWatcherEvent) => void, useCapture?: boolean): void;
        static removeEventListener(eventType: string, listener: (event: ScrollWatcherEvent) => void, useCapture?: boolean): void;
        static calcScrolledPosition(y: number): number;
        static calcScrolledPositionRatio(y: number): number;
        private static windowScrollHandler;
        private static windowResizeHandler;
        static getIsRunning(): boolean;
        private static isRunning;
        static getScrollTop(): number;
        private static scrollTop;
        static getScrollBottom(): number;
        private static scrollBottom;
        static getWindowHeight(): number;
        private static windowHeight;
        private static isInitialized;
        private static eventDispatcher;
    }
}
declare namespace alm {
    class ScrollWatcherEvent extends createjs.Event {
        static SCROLL: string;
        constructor(eventType: string, bubbles?: boolean, cancelable?: boolean, jqueryEvent?: JQueryEventObject);
        clone(): ScrollWatcherEvent;
        toString(): string;
        jqueryEvent: JQueryEventObject;
    }
}
declare namespace alm {
    class AssetLoader {
        private constructor();
        private static initialize();
        static load(): void;
        static addFile(filePath: string, id?: string): void;
        static addFiles(files: ({
            id: string;
            src: string;
        } | string)[]): void;
        static addManifest(jsonPath: string): void;
        static addAnimateAsset(basePath: string): void;
        static cancel(): void;
        static close(): void;
        static clear(): void;
        static getResult(idOrPath: string): any;
        static addEventListener(eventType: string, listener: (event: AssetLoaderEvent) => void, useCapture?: boolean): void;
        static removeEventListener(eventType: string, listener: (event: AssetLoaderEvent) => void, useCapture?: boolean): void;
        private static setListener();
        private static clearListener();
        private static getAnimateManifest(basePath?);
        private static loaderFileLoadHandler;
        private static loaderErrorHandler;
        private static loaderProgressHandler;
        private static loaderFileErrorHandler;
        private static loaderCompleteHandler;
        static getIsLoading(): boolean;
        private static isLoading;
        static getIsLoaded(): boolean;
        private static isLoaded;
        static getIsCanceled(): boolean;
        private static isCanceled;
        private static isInitialized;
        private static eventDispatcher;
        private static loader;
        private static windowImages;
    }
}
declare namespace alm {
    class AssetLoaderEvent extends createjs.Event {
        static FILE_LOAD: string;
        static FILE_ERROR: string;
        static PROGRESS: string;
        static COMPLETE: string;
        static ERROR: string;
        constructor(eventType: string, bubbles?: boolean, cancelable?: boolean, progress?: number, loadedCount?: number, totalCount?: number, content?: any);
        clone(): AssetLoaderEvent;
        toString(): string;
        progress: number;
        loadedCount: number;
        totalCount: number;
        content: any;
    }
}
declare namespace alm {
    abstract class View<T extends createjs.DisplayObject> extends createjs.EventDispatcher {
        constructor(view?: T);
        initialize(): void;
        ready(): void;
        finalize(): void;
        show(useTransition?: boolean): void;
        hide(useTransition?: boolean): void;
        getShowCommand(useTransition?: boolean): cmd.Command;
        getHideCommand(useTransition?: boolean): cmd.Command;
        protected abstract implInitialize(): T;
        protected abstract implReady(): void;
        protected abstract implFinalize(): void;
        protected abstract implShow(view: T, useTransition: boolean): cmd.Command;
        protected abstract implHide(view: T, useTransition: boolean): cmd.Command;
        getIsInitializing(): boolean;
        private isInitializing;
        getIsInitialized(): boolean;
        private isInitialized;
        getIsReady(): boolean;
        private isReady;
        getIsShowing(): boolean;
        private isShowing;
        getIsShown(): boolean;
        private isShown;
        getIsHiding(): boolean;
        private isHiding;
        getIsHidden(): boolean;
        getView(): T;
        private view;
        getAutoHideWithInit(): boolean;
        setAutoHideWithInit(value: boolean): void;
        private autoHideWithInit;
        getName(): string;
        setName(value: string): void;
        private name;
        private showCommand;
        private hideCommand;
    }
}
