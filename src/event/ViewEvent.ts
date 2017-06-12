/// <reference path="../reference.ts" />

namespace alm {

	export class ViewEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static INIT:string = "init";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false) {
			super(eventType, bubbles, cancelable);
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ViewEvent {
			return new ViewEvent(this.type, this.bubbles, this.cancelable);
		}

		public toString():string {
			return "[ViewEvent (type=" + this.type + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------
	}
}