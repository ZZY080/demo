let a="123金点";
console.log(a.slice(0,a.search("金点")))
// let str = "{\"count\":24,\"list\":[{\"id\":\"690033\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463415922925.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690034\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463417236522.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690035\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463419519291.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690036\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463420335337.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690037\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463421860840.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690038\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463423442745.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690039\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463425216780.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690040\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463425970631.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690041\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463426615487.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690042\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463426743961.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690043\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463428575798.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690044\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463429312526.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690045\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463429324121.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690046\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463431270675.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690047\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463432850466.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690048\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463433612097.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690049\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463433190232.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690050\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463435833752.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690051\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463435979261.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690052\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463436140927.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690053\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463437172652.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690054\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463438143893.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690055\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463439271430.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"},{\"id\":\"690056\",\"imgurl\":\"http:\\\/\\\/small.justeasy.cn\\\/uploads\\\/case\\\/20180516\\\/1526463440687576.jpg\",\"title\":\"\\u676d\\u5dde\\u666f\\u745e\\u5929\\u8d4b\\u4f1a\\u6240 | INNEST\\u610f\\u5de2\\u8bbe\\u8ba1\"}]}";
// let s = JSON.parse(str);
// console.log(s);


function htmlToWXML(html) {
    // 将HTML字符串转换为WXML节点数组的逻辑
    // 这里使用正则表达式来进行基本的转换
    const wxmlNodes = [];
  
    // 匹配HTML标签的正则表达式
    const tagRegExp = /<\s*([a-z]+)([^>]*)>/g;
  
    let lastIndex = 0;
    let match;
  
    while ((match = tagRegExp.exec(html)) !== null) {
      const tagName = match[1];
      const attributes = match[2];
  
      // 提取标签之间的内容
      const contentStartIndex = match.index + match[0].length;
      const contentEndIndex = html.indexOf(`</${tagName}>`, contentStartIndex);
  
      if (contentEndIndex !== -1) {
        const tagContent = html.substring(contentStartIndex, contentEndIndex);
        const wxmlNode = `<${tagName}${attributes}>${tagContent}</${tagName}>`;
        wxmlNodes.push(wxmlNode);
        lastIndex = contentEndIndex + tagName.length + 3; // 3 is for "</>"
      }
    }
  
    // 将未匹配的部分也作为文本节点添加到节点数组
    if (lastIndex < html.length) {
      const text = html.substring(lastIndex);
      wxmlNodes.push(text);
    }
  
    return wxmlNodes;
}
const htmlContent = '<p>This is <b>bold</b> text.</p>';
const wxmlNodes = htmlToWXML(htmlContent);
const wxmlString = wxmlNodes.join('');
console.log(wxmlString); // 输出转换后的WXML字符串

  