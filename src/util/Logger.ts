/// <reference path="../reference.ts" />

namespace alm {

	export enum LoggerLevel {
		Verbose = 0,
		Trace = 1,
		Warn = 2,
		Error = 3,
		Silent = 4,
	}

	export class Logger {

		public static level: number = LoggerLevel.Verbose;

		public static verbose(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Verbose) console.log.apply(console, Array.prototype.slice.call(messages));
		}

		public static trace(...messages:any[]): void {
			if (Logger.level <= LoggerLevel.Trace) console.log.apply(console, Array.prototype.slice.call(messages));
		}

		public static warn(target:any, message:string, condition:boolean = true): void {
			if (Logger.level <= LoggerLevel.Warn && condition) {
				trace("[WARNING] " + message + " : ", target);
			}
		}

		public static error(target:any, message: string, condition:boolean = true): void {
			if (Logger.level <= LoggerLevel.Error && condition) {
				trace(target);
				throw new Error("[ERROR] " + message);
			}
		}
	}
}

function trace(...messages:any[]):void {
	alm.Logger.trace.apply(trace.caller, arguments);
}

function throwWarn(target:any, message:string, condition:boolean = true):void {
	alm.Logger.warn.apply(null, arguments);
}

function throwError(target:any, message:string, condition:boolean = true):void {
	alm.Logger.error.apply(null, arguments);
}