// process.stdin.resume();
// process.stdin.setEncoding("utf-8");
// let input = "";
// process.stdin.on("data", (data) => {
//     input += data;
// });

// process.stdin.on("end", () => {
   
// });
// let inputArray = input.split("\n");
let inputArray = `2(A2(N))
A3322A33P20BB
`.split("\n");
let syntax = inputArray[0].trim();
let string = inputArray[1].trim();
console.log("解析语法:", syntax);
console.log("待解析字符串:", string);

// 定义函数用于匹配单个数字
function match_N(string) {
    if (string && !isNaN(string[0])) {
        return string[0], string.substring(1);
    }
    return null;
}

// 定义函数用于匹配单个字母
function match_A(string) {
    if (string && string[0].match(/[a-zA-Z]/)) {
        return string[0], string.substring(1);
    }
    return null;
}

// 定义函数用于匹配一个分组
function match_n0(string) {
    // 匹配分组中的语法元素
    let group = "";
    while (string) {
        // 尝试匹配数字
        let digit = match_N(string);
        if (digit) {
            group += digit;
            string = digit[1];
            continue;
        }

        // 尝试匹配字母
        let letter = match_A(string);
        if (letter) {
            group += letter;
            string = letter[1];
            continue;
        }

        // 如果分组中没有匹配到合法的语法元素，则退出循环
        break;
    }

    // 返回匹配到的分组和剩余的字符串
    return group;
}

// 定义函数用于解析字符串
function parse_syntax(syntax, string) {
    let result = ""; // 用于存储解析结果
    let syntaxIndex = 0; // 用于追踪解析到的语法元素的位置
    let stringIndex = 0; // 用于追踪解析到的字符串的位置

    while (syntaxIndex < syntax.length) {
        let currentSyntax = syntax[syntaxIndex];

        if (currentSyntax === "n") {
            // 匹配一个分组
            let num = ""; // 用于存储重复次数
            syntaxIndex++;
            while (syntaxIndex < syntax.length && !isNaN(syntax[syntaxIndex])) {
                num += syntax[syntaxIndex];
                syntaxIndex++;
            }

            // 执行重复次数的匹配
            let group = "";
            while (num > 0 && stringIndex < string.length) {
                let matchedGroup = match_n0(string.substring(stringIndex));
                if (matchedGroup) {
                    group += matchedGroup;
                    num--;
                }
                stringIndex += matchedGroup.length;
            }

            result += group;
        } else if (currentSyntax === "N") {
            // 匹配单个数字
            let [matchedNum, remainingString] = match_N(string.substring(stringIndex));
            if (matchedNum) {
                result += matchedNum;
                stringIndex += matchedNum.length;
            }
        } else if (currentSyntax === "A") {
            // 匹配单个字母
            let [matchedLetter, remainingString] = match_A(string.substring(stringIndex));
            if (matchedLetter) {
                result += matchedLetter;
                stringIndex += matchedLetter.length;
            }
        }

        // 移动到下一个语法元素
        syntaxIndex++;
    }

    return result;
}
// 解析字符串
let result = parse_syntax(syntax, string);
console.log("解析结果:", result);