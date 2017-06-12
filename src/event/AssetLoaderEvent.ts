/// <reference path="../reference.ts" />

namespace alm {

	export class AssetLoaderEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static FILE_LOAD:string = "fileload";
		static FILE_ERROR:string = "fileerror";
		static PROGRESS:string = "progress";
		static COMPLETE:string = "complete";
		static ERROR:string = "error";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, progress:number = 0, loadedCount:number = 0, totalCount:number = 0, content:any = null) {
			super(eventType, bubbles, cancelable);
			this.progress = progress;
			this.loadedCount = loadedCount;
			this.totalCount = totalCount;
			this.content = content;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():AssetLoaderEvent {
			return new AssetLoaderEvent(this.type, this.bubbles, this.cancelable, this.progress, this.loadedCount, this.totalCount, this.content);
		}

		public toString():string {
			return "[AssetLoaderEvent (type=" + this.type + " progress=" + this.progress + "loadedCount=" + this.loadedCount + " totalCount=" + this.totalCount + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public progress:number;
		public loadedCount:number;
		public totalCount:number;
		public content:any;
	}
}