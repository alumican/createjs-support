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

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, jqueryEvent:JQuery.Event = null, scrollTop:number = 0, scrollBottom:number = 0, windowHeight:number = 0) {
			super(eventType, bubbles, cancelable);
			this.jqueryEvent = jqueryEvent;
			this.scrollTop = scrollTop;
			this.scrollBottom = scrollBottom;
			this.windowHeight = windowHeight;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ScrollWatcherEvent {
			return new ScrollWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent, this.scrollTop, this.scrollBottom, this.windowHeight);
		}

		public toString():string {
			return "[ScrollWatcherEvent (type=" + this.type + " scrollTop=" + this.scrollTop + " scrollBottom=" + this.scrollBottom + " windowHeight=" + this.windowHeight + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public scrollTop:number;
		public scrollBottom:number;
		public windowHeight:number;
	}
}