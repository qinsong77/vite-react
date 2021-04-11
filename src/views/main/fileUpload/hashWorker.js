import SparkMD5 from 'spark-md5'
// self.importScripts('/spark-md5.js')
// 生成文件 hash
self.onmessage = e => {
	const { fileChunkList } = e.data;
	const spark = new SparkMD5.ArrayBuffer();
	let percentage = 0;
	let count = 0;
	const loadNext = index => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(fileChunkList[index].file);
		reader.onload = e => {
			count++;
			spark.append(e.target.result);
			if (count === fileChunkList.length) {
				// @ts-ignore
				self.postMessage({
					percentage: 100,
					hash: spark.end()
				});
				self.close();
			} else {
				percentage += 100 / fileChunkList.length;
				// @ts-ignore
				self.postMessage({
					percentage
				});
				loadNext(count);
			}
		};
	};
	loadNext(0);
};
