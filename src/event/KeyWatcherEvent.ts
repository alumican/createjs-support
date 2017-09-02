/// <reference path="../reference.ts" />

namespace alm {

	export class KeyWatcherEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		static KEY_LONG_PRESS:string = "keyLongPress";
		static KEY_UP:string = "keyUp";
		static KEY_DOWN:string = "keyDown";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, jqueryEvent:JQuery.Event = null) {
			super(eventType, bubbles, cancelable);
			this.jqueryEvent = jqueryEvent;
			this.key = this.jqueryEvent.key;
			this.keyCode = this.jqueryEvent.keyCode;
			this.altKey = this.jqueryEvent.altKey;
			this.ctrlKey = this.jqueryEvent.ctrlKey;
			this.shiftKey = this.jqueryEvent.shiftKey;
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
			return "[KeyWatcherEvent (type=" + this.type + " key=" + this.key + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public jqueryEvent:JQuery.Event;
		public key:string;
		public keyCode:number;
		public altKey:boolean;
		public ctrlKey:boolean;
		public shiftKey:boolean;
	}
}