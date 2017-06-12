/// <reference path="../reference.ts" />

namespace alm {

	class SingletonEnforcer {
	}

	export class ResizeWatcher {

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
			console.log("[ResizeWatcher] start");

			jQuery(window).on("resize", this.windowResizeHandler);
			this.apply();
		}


		public static stop():void {
			if (!this.isRunning) return;
			this.isRunning = false;

			this.initialize();
			console.log("[ResizeWatcher] stop");

			jQuery(window).off("resize", this.windowResizeHandler);
		}

		public static apply():void {
			const $window:JQuery = jQuery(window);
			ResizeWatcher.stageWidth = $window.width();
			ResizeWatcher.stageHeight = $window.height();

			const $body:JQuery = jQuery("body");
			ResizeWatcher.contentWidth = $body.width();
			ResizeWatcher.contentHeight = $body.height();
		}

		public static addEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener, useCapture);
		}

		public static removeEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
		}





		private static windowResizeHandler = (event:JQueryEventObject):void => {
			ResizeWatcher.apply();
			ResizeWatcher.eventDispatcher.dispatchEvent(new ResizeWatcherEvent(ResizeWatcherEvent.RESIZE, false, false, event, ResizeWatcher.stageWidth, ResizeWatcher.stageHeight));
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsRunning():boolean { return this.isRunning; }
		private static isRunning:boolean = false;

		public static getStageWidth():number { return this.stageWidth; }
		private static stageWidth:number = 0;

		public static getStageHeight():number { return this.stageHeight; }
		private static stageHeight:number = 0;

		public static getContentWidth():number { return this.contentWidth; }
		private static contentWidth:number = 0;

		public static getContentHeight():number { return this.contentHeight; }
		private static contentHeight:number = 0;

		private static isInitialized:boolean = false;
		private static eventDispatcher:createjs.EventDispatcher = null;
	}
}