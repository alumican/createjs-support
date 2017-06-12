/// <reference path="../reference.ts" />

namespace alm {

	class SingletonEnforcer {
	}

	export class AssetLoader {

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

			this.isLoading = false;
			this.isLoaded = false;
			this.isCanceled = false;

			this.loader = new createjs.LoadQueue();

			this.eventDispatcher = new createjs.EventDispatcher();
		}

		public static load():void {
			if (this.isLoading || this.isLoaded) return;
			this.isLoading = true;

			this.initialize();
			console.log("[AssetLoader] load");

			this.setListener();
			this.loader.load();
		}

		public static addFile(filePath:string, id:string = null):void {
			this.initialize();
			if (id) {
				this.loader.loadFile({ id: id, src: filePath });
			} else {
				this.loader.loadFile(filePath);
			}
		}

		public static addFiles(files:({id:string,src:string}|string)[]):void {
			this.initialize();
			this.loader.loadManifest(files);
		}

		public static addManifest(jsonPath:string):void {
			this.initialize();
			this.loader.loadManifest(jsonPath);
		}

		public static cancel():void {
			if (!this.isLoading) return;
			this.isLoading = false;
			this.isCanceled = true;

			this.initialize();
			console.log("[AssetLoader] cancel");

			this.loader.cancel();
		}

		public static close():void {
			if (!this.isLoading && !this.isCanceled) return;
			this.isLoading = false;
			this.isCanceled = false;

			this.initialize();
			console.log("[AssetLoader] close");

			this.loader.close();
		}

		public static clear():void {
			this.initialize();
			console.log("[AssetLoader] clear");

			this.clearListener();
			this.loader.destroy();
			this.loader = new createjs.LoadQueue();
		}





		public static addEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener, useCapture);
		}

		public static removeEventListener(eventType:string, listener:(event:ResizeWatcherEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.removeEventListener(eventType, listener, useCapture);
		}





		private static setListener():void {
			this.loader.addEventListener("fileload", this.loaderFileLoadHandler);
			this.loader.addEventListener("fileerror", this.loaderFileErrorHandler);
			this.loader.addEventListener("progress", this.loaderProgressHandler);
			this.loader.addEventListener("error", this.loaderErrorHandler);
			this.loader.addEventListener("complete", this.loaderCompleteHandler);
		}

		private static clearListener():void {
			this.loader.removeEventListener("fileload", this.loaderFileLoadHandler);
			this.loader.removeEventListener("fileerror", this.loaderFileErrorHandler);
			this.loader.removeEventListener("progress", this.loaderProgressHandler);
			this.loader.removeEventListener("error", this.loaderErrorHandler);
			this.loader.removeEventListener("complete", this.loaderCompleteHandler);
		}





		private static loaderFileLoadHandler = (event:createjs.Event):void => {
			console.log("[AssetLoader] file load : progress = " + event.progress, " (" + event.loaded + " / " + event.total);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.FILE_LOAD, false, false, event.progress, event.loaded, event.total, event.result));
		};

		private static loaderErrorHandler = (event:createjs.ErrorEvent):void => {
			console.log("[AssetLoader] error : title = " + event.title + ", message = " + event.message);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.ERROR));
		};

		private static loaderProgressHandler = (event:createjs.ProgressEvent):void => {
			console.log("[AssetLoader] progress : progress = " + event.progress, " (" + event.loaded + " / " + event.total);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.PROGRESS, false, false, event.progress, event.loaded, event.total));
		};

		private static loaderFileErrorHandler = (event:createjs.Event):void => {
			console.log("[AssetLoader] file error : " + event.error);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.FILE_ERROR, false, false, event.progress, event.loaded, event.total));
		};

		private static loaderCompleteHandler = (event:createjs.Event):void => {
			console.log("[AssetLoader] complete");
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.COMPLETE, false, false, event.progress, event.loaded, event.total));
		};





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public static getIsLoading():boolean { return this.isLoading; }
		private static isLoading:boolean;

		public static getIsLoaded():boolean { return this.isLoaded; }
		private static isLoaded:boolean;

		public static getIsCanceled():boolean { return this.isCanceled; }
		private static isCanceled:boolean;

		private static loader:createjs.LoadQueue;

		private static isInitialized:boolean = false;
		private static eventDispatcher:createjs.EventDispatcher = null;
	}
}