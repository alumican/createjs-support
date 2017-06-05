/// <reference path="../../reference.ts" />

module alm {

	export class Num {

		public static map(value:number, srcMin:number, srcMax:number, dstMin:number, dstMax:number):number
		{
			if (srcMin == srcMax) return dstMin;
			if (srcMin < srcMax) {
				value = value < srcMin ? srcMin : value > srcMax ? srcMax : value;
			} else {
				value = value < srcMax ? srcMax : value > srcMin ? srcMin : value;
			}
			return (value - srcMin) * (dstMax - dstMin) / (srcMax - srcMin) + dstMin;
		}

		public static random(min:number = 0, max:number = 1):number
		{
			return min + (max - min) * Math.random();
		}





		// --------------------------------------------------
		//
		// CONST
		//
		// --------------------------------------------------

		public static PI:number = Math.PI;
		public static PI2:number = Num.PI * 2;
		public static PI_2:number = Num.PI / 2;
		public static PI_3:number = Num.PI / 3;
		public static PI_4:number = Num.PI / 4;
		public static PI_6:number = Num.PI / 6;

		public static RAD2DEG:number = 180 / Num.PI;
		public static DEG2RAD:number = Num.PI / 180;
	}
}