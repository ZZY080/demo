module.exports = {
  rules: {
    "api-naming": {
      meta: {
        messages: {
          invalidName: "API函数名必须符合 [method][Module][Action]Request 格式",
        },
      },
      create(context) {
        return {
          VariableDeclarator(node) {
            if (!/^(get|post|put|delete)[A-Z]\w+Request$/.test(node.id?.name)) {
              context.report({ node, messageId: "invalidName" });
            }
          },
        };
      },
    },
  },
};
