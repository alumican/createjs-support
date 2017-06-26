/// <reference path="../reference.ts" />

namespace alm {

	export class AssetLoader {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		private constructor() {
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

			this.animateImages = AnimateUtil.getImages() || {};
		}

		public static load():void {
			if (this.isLoading || this.isLoaded) return;
			this.isLoading = true;

			this.initialize();
			Logger.verbose("[AssetLoader] load " + this.loader.getItems(false).length + " files");

			this.setListener();
			this.loader.load();
		}

		public static addFile(filePath:string, id:string = null):void {
			this.initialize();
			if (id) {
				this.loader.loadFile({ id: id, src: filePath });
			} else {
				this.loader.loadFile(filePath, false);
			}
		}

		public static addFiles(files:({id:string,src:string}|string)[]):void {
			this.initialize();
			this.loader.loadManifest(files, false);
		}

		public static addManifest(jsonPath:string):void {
			this.initialize();
			this.loader.loadManifest(jsonPath, false);
		}

		public static addAnimateAsset(basePath:string):void {
			this.initialize();
			const manifest:Object = this.getAnimateManifest(basePath);
			if (manifest) {
				Logger.verbose("[AssetLoader] addAnimateAsset : basePath = " + basePath);
				Logger.verbose(manifest);
				this.loader.loadManifest(manifest, false);
			} else {
				Logger.verbose("[AssetLoader] manifest file is not found");
			}
		}

		public static cancel():void {
			if (!this.isLoading) return;
			this.isLoading = false;
			this.isCanceled = true;

			this.initialize();
			Logger.verbose("[AssetLoader] cancel");

			this.loader.cancel();
		}

		public static close():void {
			if (!this.isLoading && !this.isCanceled) return;
			this.isLoading = false;
			this.isCanceled = false;

			this.initialize();
			Logger.verbose("[AssetLoader] close");

			this.loader.close();
		}

		public static clear():void {
			this.initialize();
			Logger.verbose("[AssetLoader] clear");

			this.clearListener();
			this.loader.destroy();
			this.loader = new createjs.LoadQueue();
		}

		public static getResult(idOrPath:string):any {
			return this.loader.getResult(idOrPath);
		}





		public static addEventListener(eventType:string, listener:(event:AssetLoaderEvent) => void, useCapture:boolean = false):void {
			this.initialize();
			this.eventDispatcher.addEventListener(eventType, listener, useCapture);
		}

		public static removeEventListener(eventType:string, listener:(event:AssetLoaderEvent) => void, useCapture:boolean = false):void {
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





		private static getAnimateManifest(basePath:string = ""):object {
			const manifest:{src:string,id:string}[] = AnimateUtil.getManifest();
			if (manifest == null) return null;
			if (basePath != "") {
				if (basePath.substr(-1, 1) != "/") {
					basePath = basePath + "/";
				}
				const updated:{src:string,id:string}[] = [];
				const numFiles:number = manifest.length;
				let file:{src:string,id:string};
				for (let i:number = 0; i < numFiles; ++i) {
					file = manifest[i];
					updated.push({ src: basePath + file.src, id: file.id });
				}
				return updated;
			} else {
				return manifest;
			}
		}





		private static loaderFileLoadHandler = (event:createjs.Event):void => {
			Logger.verbose("[AssetLoader] file load");
			const itemId:string = event.item.id;
			const result:HTMLImageElement = event.result;
			if (itemId) AssetLoader.animateImages[itemId] = result;
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.FILE_LOAD, false, false, event.progress, event.loaded, event.total, result));
		};

		private static loaderErrorHandler = (event:createjs.ErrorEvent):void => {
			Logger.verbose("[AssetLoader] error : title = " + event.title + ", message = " + event.message);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.ERROR));
		};

		private static loaderProgressHandler = (event:createjs.ProgressEvent):void => {
			Logger.verbose("[AssetLoader] progress : progress = " + event.progress, " (" + event.loaded + " / " + event.total + ")");
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.PROGRESS, false, false, event.progress, event.loaded, event.total));
		};

		private static loaderFileErrorHandler = (event:createjs.Event):void => {
			Logger.verbose("[AssetLoader] file error : " + event.error);
			AssetLoader.eventDispatcher.dispatchEvent(new AssetLoaderEvent(AssetLoaderEvent.FILE_ERROR, false, false, event.progress, event.loaded, event.total));
		};

		private static loaderCompleteHandler = (event:createjs.Event):void => {
			Logger.verbose("[AssetLoader] complete");
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

		private static isInitialized:boolean = false;
		private static eventDispatcher:createjs.EventDispatcher = null;
		private static loader:createjs.LoadQueue;
		private static animateImages:Hash<HTMLImageElement>;
	}
}