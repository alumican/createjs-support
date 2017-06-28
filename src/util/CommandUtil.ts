/// <reference path="../reference.ts" />

namespace alm {

	export class CommandUtil {

		public static stop(command:cmd.Command):any {
			if (command) command.interrupt();
			return null;
		}

		public static sequence(execute:boolean, ...commands:(cmd.Command|Function)[]):cmd.Serial {
			const c:cmd.Serial = new cmd.Serial();
			c.addCommand(...commands);
			if (execute) c.execute();
			return c;
		}

		public static fadeToCreatejs(target:createjs.DisplayObject, opacity:number, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			const tween:cmd.Tween = new cmd.Tween(target, { alpha: opacity }, null, duration, easing, ():void => {
				if (opacity > 0) target.visible = true;
			}, null, ():void => {
				if (opacity <= 0) target.visible = false;
			});
			if (execute) tween.execute();
			return tween;
		}

		public static fadeInCreatejs(target:createjs.DisplayObject, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeToCreatejs(target, 1, duration, easing, execute);
		}

		public static fadeOutCreatejs(target:createjs.DisplayObject, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeToCreatejs(target, 0, duration, easing, execute);
		}

		public static fadeToJquery(target:JQuery, opacity:number, duration:number, easing:cmd.EasingFunction, switchDisplayTo:string = "", switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			let o:Object = { value: parseInt(target.css("opacity")) };
			const tween:cmd.Tween = new cmd.Tween(o, { value: opacity }, null, duration, easing, ():void => {
				if (opacity > 0) {
					if (switchDisplayTo != "") target.css("display", switchDisplayTo);
					if (switchVisibility) target.css("visibility", "visible");
				}
			}, (progressTime:number, progressValue:number):void => {
				trace(progressTime, progressValue);
				target.css("opacity", progressValue);
			}, ():void => {
				if (opacity <= 0) {
					if (switchDisplayTo != "") target.css("display", "none");
					if (switchVisibility) target.css("visibility", "hidden");
				}
			});
			if (execute) tween.execute();
			return tween;
		}

		public static fadeInJquery(target:JQuery, duration:number, easing:cmd.EasingFunction, switchDisplayTo:string = "", switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeToJquery(target, 1, duration, easing, switchDisplayTo, switchVisibility, execute);
		}

		public static fadeOutJquery(target:JQuery, duration:number, easing:cmd.EasingFunction, switchDisplayTo:string = "", switchVisibility:boolean = false, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeToJquery(target, 0, duration, easing, switchDisplayTo, switchVisibility, execute);
		}
	}
}