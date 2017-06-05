/// <reference path="../../reference.ts" />

namespace alm {

	export class TimerEvent extends createjs.Event {

		// --------------------------------------------------
		//
		// EVENT
		//
		// --------------------------------------------------

		public static TICK:string = "tick";
		public static COMPLETE:string = "complete";





		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(eventType:string, bubbles:boolean = false, cancelable:boolean = false, elapsedCount:number = 0, repeatCount:number = 0, restCount:number = 0) {
			super(eventType, bubbles, cancelable);
			this.elapsedCount = elapsedCount;
			this.repeatCount = repeatCount;
			this.restCount = restCount;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public clone():ViewEvent {
			return new TimerEvent(this.type, this.bubbles, this.cancelable, this.elapsedCount, this.repeatCount, this.restCount);
		}

		public toString():string {
			return "[TimerEvent (type=" + this.type + " elapsedCount=" + this.elapsedCount + " repeatCount=" + this.repeatCount + " restCount=" + this.restCount + ")]";
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public elapsedCount:number;
		public repeatCount:number;
		public restCount:number;
	}
}