/// <reference path="../reference.ts" />

namespace alm {

	export class AnimateUtil {


		public static getChildByName(parent:createjs.Container, childName:string):createjs.DisplayObject {
			return <createjs.DisplayObject>parent[childName];
		}

		public static getNominalBounds(target:createjs.DisplayObject):createjs.Rectangle {
			return target["nominalBounds"];
		}

		public static getLinkageMovieClip(linkageId:string):createjs.MovieClip {
			return new (this.getLib()[linkageId])();
		}

		public static getManifest():{src:string,id:string}[] {
			return this.getLib()["properties"]["manifest"];
		}

		public static getLib():any {
			if (this.lib) return this.lib;
			return this.lib = AnimateUtil.getComposition().getLibrary();
		}

		public static getImages():Hash<HTMLImageElement> {
			if (this.images) return this.images;
			return this.images = AnimateUtil.getComposition().getImages();
		}

		public static getComposition():any {
			if (this.composition) return this.composition;
			const compositions:any = window["AdobeAn"]["compositions"];
			for (let key in compositions) {
				this.composition = compositions[key];
			}
			return this.composition;
		}

		private static composition:any = null;
		private static lib:any = null;
		private static images:any = null;
	}
}