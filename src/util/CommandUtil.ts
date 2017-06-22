/// <reference path="../reference.ts" />

namespace alm {

	export class CommandUtil {

		public static stop(command:cmd.Command):any {
			if (command) command.interrupt();
			return null;
		}

		public static fadeTo(target:createjs.DisplayObject, opacity:number, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			const tween:cmd.Tween = new cmd.Tween(target, { alpha: opacity }, null, duration, easing, ():void => {
				if (opacity > 0) target.visible = true;
			}, null, ():void => {
				if (opacity <= 0) target.visible = false;
			});
			if (execute) tween.execute();
			return tween;
		}

		public static fadeIn(target:createjs.DisplayObject, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeTo(target, 1, duration, easing, execute);
		}

		public static fadeOut(target:createjs.DisplayObject, duration:number, easing:cmd.EasingFunction, execute:boolean = true):cmd.Tween {
			return CommandUtil.fadeTo(target, 0, duration, easing, execute);
		}
	}
}