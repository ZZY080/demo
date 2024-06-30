const fft = require('fft-js').fft,
      fftUtil = require('fft-js').util;

// 示例信号数据
const signal = [1, 2, 3, 4, 5, 6, 7, 8];

// 进行傅里叶变换
const phasors = fft(signal);

// 将变换结果转换为频谱
const frequencies = fftUtil.fftFreq(phasors, 1); // 1 是采样率
const magnitudes = fftUtil.fftMag(phasors);

console.log('频率:', frequencies);
console.log('振幅:', magnitudes);
