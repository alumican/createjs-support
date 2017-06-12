/// <reference path="../reference.ts" />

module alm {

	export class AnimateUtil {

		public static getLinkageMovieClip(linkageId:string):createjs.MovieClip {
			return new window["lib"][linkageId]();
		}

		public static getChildByName(parent:createjs.Container, childName:string):createjs.DisplayObject {
			return <createjs.DisplayObject>parent[childName];
		}
	}
}