/// <reference path="../reference.ts" />

namespace alm {

	export class ScrollWatcherEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static SCROLL:string = "scroll";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, jqueryEvent:JQueryEventObject = null) {
			super(eventType, bubbles, cancelable);
			this.jqueryEvent = jqueryEvent;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ScrollWatcherEvent {
			return new ScrollWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent);
		}

		public toString():string {
			return "[ScrollWatcherEvent (type=" + this.type + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQueryEventObject;
	}
}