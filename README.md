# 刘一飞 / freEak 个人网站

这是一个用于整理个人作品、项目尝试与阶段记录的静态网站，可以直接部署到 GitHub Pages、Vercel 或 Netlify。

## 内容维护

主要内容集中在 `scripts/content.js`：

- `site.name` 和 `site.handle`：名字与昵称。
- `site.title` 和 `site.coverLead`：首页说明。
- `contact.methods`：公开联系方式与个人链接。
- `profile`：关于页介绍与关注内容。
- `projects`：项目标题、封面、标签与详情。

页面结构分别位于：

- `index.html`：首页。
- `works.html`：作品与记录。
- `project.html`：单项详情。
- `about.html`：关于页。
- `contact.html`：联系页。

## 访问统计

项目预留了 Plausible 的接入位置。需要启用时，在 `scripts/content.js` 中填写 `plausibleDomain`。

## 部署

当前仓库通过 GitHub Pages 发布。也可以连接 Vercel 或 Netlify 自动部署。

网站暂未接入内容后台，所有公开内容直接通过仓库文件维护。
