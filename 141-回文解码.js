const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void async function () {
    // Write your code here
    while (line = await readline()) {
        let lineNumber = parseInt(await readline());
        for (let i = 0; i < lineNumber; i++) {
            let sub = await readline();
            let arr=sub.split(" ");
            let p = parseInt(arr[0]);
            let i = parseInt(arr[1]);
            let newStr = (line.substr(p, i)).split("").reverse().join("");
            let front = line.slice(0, p + i);
            let backend = line.slice(p + i);
            line = line.slice(0, p + i) + newStr + line.slice(p + i);


           

        }

        console.log(line);
    }
}()

