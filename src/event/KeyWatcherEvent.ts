/// <reference path="../reference.ts" />

namespace alm {

	export class KeyWatcherEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static KEY_UP:string = "keyUp";
		static KEY_DOWN:string = "keyDown";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, jqueryEvent:JQueryKeyEventObject = null) {
			super(eventType, bubbles, cancelable);
			this.jqueryEvent = jqueryEvent;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():KeyWatcherEvent {
			return new KeyWatcherEvent(this.type, this.bubbles, this.cancelable, this.jqueryEvent);
		}

		public toString():string {
			return "[KeyWatcherEvent (type=" + this.type + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQueryKeyEventObject;
	}
}