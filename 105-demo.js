const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("请输入您的姓名：", function (inputString) {
    for (let i = 0; i < inputString.length; i++) {
        let asciicode = (inputString[i].charCodeAt()) + "";
        let length = 0;
        for (let j = 0; j < asciicode.length; j++) {
            length += parseInt(asciicode[j]);
        }
        let addstring = "";
        for (let k = 0; k < length; k++) {
            addstring += inputString[i];
        }
        console.log(addstring);

    }

    rl.close();
});

