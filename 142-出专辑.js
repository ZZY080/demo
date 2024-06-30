const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while (line = await readline()) {
        let arr = line.split(" ");
        let n=parseInt(arr[0]);
        let s=parseInt(arr[1]);
        let l=parseInt(arr[2]);

        // 每个CD有x首歌
        let x = Math.floor((l+1)/(s+1));
        if(x%13==0){
            x=x-1;
        }
        let n2=Math.trunc(n/x)+Math.ceil(n/x-Math.trunc(n/x));
        console.log(n2);
       
    }
}()

