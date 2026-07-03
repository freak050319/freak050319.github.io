# 刘一飞 / freEak 个人作品集

这是一个静态个人作品集网站，可以直接部署到 GitHub Pages、Vercel 或 Netlify。当前版本适合先投放占位内容，后续逐步替换为真实项目。

## 修改内容

主要修改 scripts/content.js：

- site.name 和 site.handle：你的名字与昵称。
- site.title：你的身份描述。
- contact.methods：邮箱、GitHub、作品集 PDF、社交账号等。
- profile：关于我、经历、教育、技能。
- projects：项目标题、封面、标签、项目详情。

替换简历时，把真实 PDF 放到 assets/ 里，然后修改 site.resumeUrl。例如：resumeUrl: "assets/resume.pdf"。

## 访问统计  

当前预留了 Plausible 的接入位置。部署后如果你有域名，可以把 scripts/content.js 里的 plausibleDomain: "" 改成你的域名，比如 plausibleDomain: "your-domain.com"。

如果先用 GitHub Pages 免费域名，也可以之后再加统计。

## 低成本部署建议

推荐顺序：

1. GitHub Pages：免费，适合纯静态作品集。
2. Vercel：免费额度够用，上传或连接 GitHub 后自动部署。
3. Netlify：免费额度够用，也适合静态网站。

没有域名也可以上线，会得到一个平台提供的网址。之后想更正式，再买域名绑定。

## 后台

第一版没有做后台。对作品集来说，先用 scripts/content.js 管理内容会更简单稳定。等项目内容稳定后，可以再接免费的 CMS，让你在网页表单里更新项目。
