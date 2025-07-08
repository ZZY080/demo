#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const chalk = require('chalk');

// 工具函数
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getMethodVerb(action) {
  const methodMap = {
    list: 'GET',
    detail: 'GET',
    create: 'POST',
    update: 'PUT',
    delete: 'DELETE',
    cancel: 'POST'
  };
  return methodMap[action] || 'GET';
}

// 模块配置
const MODULES = {
  user: { path: '/users', methods: ['list', 'detail', 'create', 'update', 'delete'] },
  order: { path: '/orders', methods: ['list', 'detail', 'cancel'] }
};

// 生成API函数
function generateApiCode(module, action) {
  const verb = getMethodVerb(action);
  const funcName = `${verb.toLowerCase()}${capitalize(module)}${capitalize(action)}Request`;
  const pathVar = action === 'detail' || action === 'update' || action === 'delete' 
    ? `\`${MODULES[module].path}/\${id}\``
    : `'${MODULES[module].path}'`;

  return `
// ${verb} ${MODULES[module].path}${action === 'detail' ? '/:id' : ''}
export const ${funcName} = (${action === 'create' || action === 'update' ? 'data' : 'params'}) =>
  request.${verb.toLowerCase()}(${pathVar}${action === 'create' ? ', data' : action !== 'list' ? '' : ', { params }'});`;
}

// 交互式选择
async function selectModule() {
  const { module } = await inquirer.prompt({
    type: 'list',
    name: 'module',
    message: '请选择模块',
    choices: Object.keys(MODULES)
  });

  const { methods } = await inquirer.prompt({
    type: 'checkbox',
    name: 'methods',
    message: '选择需要生成的方法',
    choices: MODULES[module].methods.map(m => ({
      name: `${m} (${getMethodVerb(m)})`,
      value: m
    }))
  });

  // 生成文件
  const content = methods.map(m => generateApiCode(module, m)).join('\n');
  const outputPath = path.join(__dirname, `../apis/${module}.api.ts`);
  
  fs.writeFileSync(outputPath, `// Auto-generated at ${new Date().toISOString()}\nimport { request } from '../utils/request';\n${content}`);
  console.log(chalk.green(`✅ 成功生成 ${module} 模块API: ${outputPath}`));
}

// 执行
selectModule().catch(err => {
  console.error(chalk.red('❌ 生成失败:'), err);
  process.exit(1);
});