var child_process = require('child_process');
var iconv = require('iconv-lite');
var encoding = 'cp936';
var binaryEncoding = 'binary';

child_process.exec('ipconfig', { encoding: binaryEncoding },(err, stdout, stderr)=> {
    const stdouts = iconv.decode(Buffer.from(stdout, binaryEncoding), encoding);
    const stderrs = iconv.decode(Buffer.from(stderr, binaryEncoding), encoding);
    console.log(stdouts);
    // console.log(stderrs);
});