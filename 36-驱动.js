const { chromium } = require('playwright');

(async () => {
  // 启动浏览器
  const browser = await chromium.launch( { executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe'});
 
  // 创建一个新页面
  const page = await browser.newPage();

  // 导航到网址
  await page.goto('https://www.example.com');

  // 执行操作，例如点击按钮、填写表单等
  await page.click('#myButton');
  await page.fill('#myInput', 'Hello, World!');

  // 截图
  await page.screenshot({ path: 'example.png' });

  // 关闭浏览器
  await browser.close();
})();
