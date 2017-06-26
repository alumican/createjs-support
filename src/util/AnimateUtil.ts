/// <reference path="../reference.ts" />

namespace alm {

	export class AnimateUtil {

		public static getLinkageMovieClip(linkageId:string):createjs.MovieClip {
			return new (this.getLib()[linkageId])();
		}

		public static getChildByName(parent:createjs.Container, childName:string):createjs.DisplayObject {
			return <createjs.DisplayObject>parent[childName];
		}

		public static getNominalBounds(target:createjs.DisplayObject):createjs.Rectangle {
			return target["nominalBounds"];
		}

		public static getManifest():{src:string,id:string}[] {
			return this.getLib()["properties"]["manifest"];
		}

		private static getLib():any {
			if (this.lib) return this.lib;
			const compositions:any = window["AdobeAn"]["compositions"];
			for (let key in compositions) {
				this.lib = compositions["key"].getLibrary();
			}
			return this.lib;
		}

		private static lib:any = null;
	}
}