namespace alm {

	// var hoge:Hash<number> = {};
	// hoge["a"] = 100;
	// hoge["b"] = 200;
	// hoge["c"] = 300;
	export interface Hash<T> { [key: string]: T; }
}