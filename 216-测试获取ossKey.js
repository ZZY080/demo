const getOssKey = (url) => {
  // url合法性
  let parsed;
  try {
    parsed = new URL(url);
  } catch (e) {
    throw new Error("非法url");
  }
  console.log(parsed);
  const host = parsed.hostname;
  // 验证是否是阿里云url
  if (!host.endsWith("aliyuncs.com")) {
    throw new Error("不是阿里云 OSS 域名");
  }
  // return url.replace(/^https?:\/\/[^\/]+\//, "");
  return parsed.pathname;
};
const url =
  "https://sh-01-bucket-lvc-dev-private.oss-cn-shanghai.aliyuncs.com/a/b/c/demo.mp4?Expires=1754892385&OSSAccessKeyId=TMP.3KotHr4fiKV4gqrHh7fiETvCHLSysjfaAa15LBBCfXnd4v7ECehYQz6WTqmRX1T7vvUgFUTNxE7WZ53Uaznt1mFYzhCjWt&Signature=Kv8SJ9pMpKQx1pwL%2BFquhj%2FMy4o%3D";
const ossKey = getOssKey(url);
console.log(ossKey);
