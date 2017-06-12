/// <reference path="../reference.ts" />

namespace alm {

	export class ResizeWatcherEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static RESIZE:string = "resize";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, jqueryEvent:JQueryEventObject = null, stageWidth:number = 0, stageHeight:number = 0) {
			super(eventType, bubbles, cancelable);
			this.jqueryEvent = jqueryEvent;
			this.stageWidth = stageWidth;
			this.stageHeight = stageHeight;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ResizeWatcherEvent {
			return new ResizeWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent, this.stageWidth, this.stageHeight);
		}

		public toString():string {
			return "[ResizeWatcherEvent (type=" + this.type + " stageWidth=" + this.stageWidth + " stageHeight=" + this.stageHeight + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQueryEventObject;

		public stageWidth:number;
		public stageHeight:number;
	}
}