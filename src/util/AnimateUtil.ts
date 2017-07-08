/// <reference path="../reference.ts" />

namespace alm {

	export class AnimateUtil {

		/**
		 * MovieClipの子要素を取得する
		 * 配列のインデックスが大きいほど手前にある
		 * @param parent 親要素
		 * @returns {createjs.MovieClip[]} 子要素の配列
		 */
		public static getChildren(parent:createjs.MovieClip):createjs.MovieClip[] {
			let children:createjs.MovieClip[] = [];
			const tweens:any[] = parent["timeline"]["_tweens"];
			const numTweens:number = tweens.length;
			let tween:any;
			let tweenChildren:createjs.MovieClip[];
			let target:any;
			for (let i:number = 0; i < numTweens; ++i) {
				tween = tweens[i];
				tweenChildren = AnimateUtil.getMovieClipsFromStateList(tween["_curQueueProps"]["state"]);
				if (tweenChildren.length == 0) {
					target = tween["_target"];
					if (target["timeline"]) {
						tweenChildren = [target];
					}
				}
				children = children.concat(tweenChildren);
			}
			return children;
		}

		/**
		 * getChildrenの内部関数
		 */
		private static getMovieClipsFromStateList(stateList:any[]):createjs.MovieClip[] {
			if (stateList) {
				const clips:createjs.MovieClip[] = [];
				const numClips:number = stateList.length;
				for (let i:number = 0; i < numClips; ++i) {
					clips.push(stateList[i]["t"]);
				}
				return clips;
			} else {
				return [];
			}
		}

		/**
		 * MovieClipの子要素を名前で取得する
		 * @param parent 親要素
		 * @param childName 子要素の名前
		 * @returns {createjs.DisplayObject} 子要素
		 */
		public static getChildByName(parent:createjs.Container, childName:string):createjs.DisplayObject {
			return <createjs.DisplayObject>parent[childName];
		}

		/**
		 * MovieClipの変形前領域を取得する
		 * @param target 領域を取得したいMovieClip
		 * @returns {createjs.Rectangle} 領域
		 */
		public static getNominalBounds(target:createjs.DisplayObject):createjs.Rectangle {
			return target["nominalBounds"];
		}

		/**
		 * ライブラリ内のシンボルをインスタンス化する
		 * @param linkageId リンケージID
		 * @returns {createjs.MovieClip} インスタンス化したMovieClip
		 */
		public static getLinkageMovieClip(linkageId:string):createjs.MovieClip {
			return new (this.getLib()[linkageId])();
		}

		/**
		 * Preload.jsのためのマニフェストを取得する
		 * @returns {src:string,id:string}[] マニフェストオブジェクト
		 */
		public static getManifest():{src:string,id:string}[] {
			return this.getLib()["properties"]["manifest"];
		}

		/**
		 * libオブジェクトを取得する
		 * @returns {any} libオブジェクト
		 */
		public static getLib():any {
			if (this.lib) return this.lib;
			return this.lib = AnimateUtil.getComposition().getLibrary();
		}

		/**
		 * 画像を格納するハッシュを取得する
		 * @returns {Hash<HTMLImageElement>} 画像格納ハッシュ
		 */
		public static getImages():Hash<HTMLImageElement> {
			if (this.images) return this.images;
			return this.images = AnimateUtil.getComposition().getImages();
		}

		/**
		 * compositionオブジェクトを取得する
		 * @returns {any} compositionオブジェクト
		 */
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