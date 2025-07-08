#!/bin/bash

# 允许提交的白名单用户（区分大小写）
ALLOWED_USERS=("admin" "developer1" "developer2","kenny")
ALLOWED_EMAILS=("admin@company.com" "dev1@company.com" "dev2@company.com","2916363651@qq.com")

# 获取当前 Git 配置
CURRENT_NAME=$(git config user.name)
CURRENT_EMAIL=$(git config user.email)

# 校验函数
function validate_user() {
  local name="$1"
  local email="$2"
  
  # 检查用户名是否在白名单
  name_valid=false
  for allowed_name in "${ALLOWED_USERS[@]}"; do
    if [[ "$name" == "$allowed_name" ]]; then
      name_valid=true
      break
    fi
  done

  # 检查邮箱是否在白名单
  email_valid=false
  for allowed_email in "${ALLOWED_EMAILS[@]}"; do
    if [[ "$email" == "$allowed_email" ]]; then
      email_valid=true
      break
    fi
  done

  # 返回校验结果
  if $name_valid && $email_valid; then
    return 0
  else
    return 1
  fi
}

# 执行校验
if ! validate_user "$CURRENT_NAME" "$CURRENT_EMAIL"; then
  echo -e "\033[31m❌ 提交被拒绝！\033[0m"
  echo -e "当前用户: \033[33m$CURRENT_NAME <$CURRENT_EMAIL>\033[0m"
  echo -e "允许的用户: \033[32m${ALLOWED_USERS[*]}\033[0m"
  echo -e "允许的邮箱: \033[32m${ALLOWED_EMAILS[*]}\033[0m"
  echo -e "\n请配置正确的 Git 用户信息："
  echo -e "  git config user.name \"your_name\""
  echo -e "  git config user.email \"your_email@company.com\""
  exit 1
fi

exit 0