module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [
      2,
      "always",
      ["feat", "fix", "docs", "style", "refactor", "test", "chore", "revert"], // 只允许这些类型
    ],
    "type-case": [2, "always", "lower-case"], // 类型必须小写
    "type-empty": [2, "never"], // 禁止类型为空
    "subject-empty": [2, "never"], // 禁止描述为空
    "subject-min-length": [2, "always", 5], // 描述至少5个字符
    "subject-max-length": [2, "always", 100], // 描述最多100个字符
    "body-leading-blank": [1, "always"], // body前需空行
    "footer-leading-blank": [1, "always"], // footer前需空行
  },
};
