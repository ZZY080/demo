// 内燃机在点火时开始使用传感器对燃气缸温度进行采集 然后实时计算热补偿
const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;

// 假设有一个周期性的热信号   signal 必须为 2 的指数
const signalLength = 64; // 信号长度(采样个数)
const frequency = 3000; // 假设信号的频率为 5  采样率会影响热传导计算的精度

// 生成周期性热信号
function generateHeatSignal(signalLength, frequency) {
  const signal = [];
  for (let i = 0; i < signalLength; i++) {
    const temperature = 1000 * Math.sin(2 * Math.PI * frequency * i / signalLength);
    // const temperature =-30+ Math.random(0,1)*1000
    signal.push(temperature);
  }
  return signal;
}

// 生成周期性热信号
const heatSignal = generateHeatSignal(signalLength, frequency);
console.log("傅里叶变换前：", heatSignal);
// 进行傅里叶变换
const phasors = fft(heatSignal);

// 将变换结果转换为频谱
const frequencies = fftUtil.fftFreq(phasors, 1);
const magnitudes = fftUtil.fftMag(phasors);

console.log(`热补偿 频率:`, frequencies);
console.log(`热补偿 振幅:`, magnitudes);
