/// <reference path="../reference.ts" />

namespace alm {

	export abstract class View<T extends createjs.DisplayObject> extends createjs.EventDispatcher {

		// --------------------------------------------------
		//
		// CONSTRUCTOR
		//
		// --------------------------------------------------

		constructor(view:T = null) {
			super();
			this.view = view;
			this.isInitializing = false;
			this.isInitialized = false;
			this.isReady = false;
			this.isShowing = false;
			this.isShown = true;
			this.isHiding = false;
			this.autoHideWithInit = true;
		}





		// --------------------------------------------------
		//
		// METHOD
		//
		// --------------------------------------------------

		public initialize():void {
			if (this.isInitializing || this.isInitialized) return;
			this.isInitializing = true;
			this.view = this.implInitialize();
			this.throwError("view is null", !this.view);
			this.hide(false);
			this.isInitializing = false;
			this.isInitialized = true;
		}

		public ready():void {
			this.throwError("ready() was called without being initialized", !this.isInitialized);
			this.implReady();
			this.isReady = true;
		}

		public finalize():void {
			this.implFinalize();
		}

		public show(useTransition:boolean = true):void {
			if (this.isShown) return;
			this.getShowCommand(useTransition).execute();
		}

		public hide(useTransition:boolean = true):void {
			if (!this.isShown) return;
			this.getHideCommand(useTransition).execute();
		}

		public getShowCommand(useTransition:boolean = true):JPP.Command {
			const command:JPP.Serial = new JPP.Serial();
			command.addCommand(
				new JPP.Func(():void => {
					if (this.isShown) return;
					this.throwError("getShowCommand() was called without being initialized", !this.isInitialized);
					this.throwError("getShowCommand() was called without being ready", !this.isReady);
					this.isShown = true;
					this.isShowing = true;
					if (this.hideCommand) this.hideCommand.interrupt();
					this.showCommand = command;
					command.insertCommand(
						this.implShow(this.view, useTransition),
						new JPP.Func(():void => {
							this.showCommand = null;
							this.isShowing = false;
						})
					);
				})
			);
			return command;
		}

		public getHideCommand(useTransition:boolean = true):JPP.Command {
			const command:JPP.Serial = new JPP.Serial();
			command.addCommand(
				new JPP.Func(():void => {
					if (!this.isShown) return;
					if (!this.isInitializing) {
						this.throwError("getHideCommand() was called without being initialized", !this.isInitialized);
						this.throwError("getHideCommand() was called without being ready", !this.isReady);
					}
					this.isShown = false;
					this.isHiding = true;
					if (this.showCommand) this.showCommand.interrupt();
					this.hideCommand = command;
					command.insertCommand(
						this.implHide(this.view, useTransition),
						new JPP.Func(():void => {
							this.hideCommand = null;
							this.isHiding = false;
						})
					);
				})
			);
			return command;
		}

		protected abstract implInitialize():T;
		protected abstract implReady():void;
		protected abstract implFinalize():void;
		protected abstract implShow(view:T, useTransition:boolean):JPP.Command;
		protected abstract implHide(view:T, useTransition:boolean):JPP.Command;





		private throwError(message:string, condition:boolean = true):void {
			if (condition) {
				throw new Error("[View] ERROR : " + message);
			}
		}





		// --------------------------------------------------
		//
		// MEMBER
		//
		// --------------------------------------------------

		public getIsInitializing():boolean { return this.isInitializing; }
		private isInitializing:boolean;

		public getIsInitialized():boolean { return this.isInitialized; }
		private isInitialized:boolean;

		public getIsReady():boolean { return this.isReady; }
		private isReady:boolean;

		public getIsShowing():boolean { return this.isShowing; }
		private isShowing:boolean;

		public getIsShown():boolean { return this.isShown; }
		private isShown:boolean;

		public getIsHiding():boolean { return this.isHiding; }
		private isHiding:boolean;

		public getIsHidden():boolean { return !this.isShown; }

		public getView():T { return this.view; }
		private view:T;

		public getAutoHideWithInit():boolean { return this.autoHideWithInit; }
		public setAutoHideWithInit(value:boolean):void { this.autoHideWithInit = value; }
		private autoHideWithInit:boolean;

		private showCommand:JPP.Command;
		private hideCommand:JPP.Command;
	}
}