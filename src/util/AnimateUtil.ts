/// <reference path="../reference.ts" />

namespace alm {

	export class AnimateUtil {

		public static getLinkageMovieClip(linkageId:string):createjs.MovieClip {
			return new window["lib"][linkageId]();
		}

		public static getChildByName(parent:createjs.Container, childName:string):createjs.DisplayObject {
			return <createjs.DisplayObject>parent[childName];
		}

		public static getNominalBounds(target:createjs.DisplayObject):createjs.Rectangle {
			return target["nominalBounds"];
		}
	}
}