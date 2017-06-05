/// <reference path="../../reference.ts" />

namespace alm {

	class SingletonEnforcer {
	}

	export class KeyWatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(pvt:SingletonEnforcer) {
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		private static initialize():void {
			if (this.isInitialized) return;
			this.isInitialized = true;

			this.eventDispatcher = new createjs.EventDispatcher();
		}

		public static start():void {
			if (this.isRunning) return;
			this.isRunning = true;

			this.initialize();
			console.log("[KeyWatcher] start");

			const $window:JQuery = jQuery(window);
			$window.on("keydown", this.windowKeyDownHandler);
			$window.on("keyup", this.windowKeyUpHandler);
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			console.log("[KeyWatcher] stop");

			const $window:JQuery = jQuery(window);
			$window.off("keydown", this.windowKeyDownHandler);
			$window.off("keyup", this.windowKeyUpHandler);
		}





		public static addEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener, useCapture);
		}

		public static removeEventListener(eventType:string, listener:(event:KeyWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
		}





		private static windowKeyDownHandler = (event:JQueryKeyEventObject):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] == null) {
				KeyWatcher.isKeyPressedByKeyCode[keyCode] = true;
				++KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_DOWN, false, false, event));
			}
		};

		private static windowKeyUpHandler = (event:JQueryKeyEventObject):void => {
			const keyCode:number = event.keyCode;
			if (KeyWatcher.isKeyPressedByKeyCode[keyCode] != null) {
				delete KeyWatcher.isKeyPressedByKeyCode[keyCode];
				--KeyWatcher.pressedKeyCount;
				KeyWatcher.eventDispatcher.dispatchEvent(new KeyWatcherEvent(KeyWatcherEvent.KEY_UP, false, false, event));
			}
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getIsAnyKeyPressed():boolean { return this.pressedKeyCount > 0; }
		private static pressedKeyCount:number = 0;

		public static getIsKeyPressed(keyCode:number):boolean { return this.isKeyPressedByKeyCode[keyCode] != null; }
		private static isKeyPressedByKeyCode:Hash<boolean> = {};

		private static isInitialized:boolean = false;
		private static eventDispatcher:createjs.EventDispatcher = null;
	}
}