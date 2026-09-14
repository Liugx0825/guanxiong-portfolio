# 刘冠雄 · 建筑与景观作品集

可直接发布到 **GitHub Pages** 的完整静态网站，包含首页、11个独立项目页、图片与图纸资源，以及中文／英文切换、项目搜索、分类筛选、图片放大等交互。

导出日期：2026-09-14。内容对应作品集网站第11版。

采用原生 HTML、CSS、JavaScript，无需安装 Node.js、运行 npm 或配置后台服务。

## 发布到 Cloudflare Pages

此仓库可以直接连接 Cloudflare Pages。网站首页 `index.html` 位于仓库根目录。

1. 登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，进入 **Workers & Pages → Create application → Pages → Connect to Git**（部分界面显示 **Import an existing Git repository**）。
2. 选择 GitHub，授权 Cloudflare Workers & Pages 访问 `Liugx0825/guanxiong-portfolio`，选择该仓库并点击 **Begin setup**。
3. 按下表填写，点击 **Save and Deploy**。

| 设置项 | 值 |
| --- | --- |
| Project name | `guanxiong-portfolio`；名称被占用时可另取名字 |
| Production branch | `main` |
| Framework preset | `None` |
| Build command | `exit 0` |
| Build output directory | `.` |
| Root directory | 留空，使用仓库根目录 |
| Environment variables | 无需添加 |

输出目录 `.` 表示当前仓库根目录，不填写 `dist` 或 `build`。本项目不需要 `npm install` 或 `npm run build`。

部署成功后，在 Cloudflare 项目中复制实际显示的 `*.pages.dev` 生产网址。无需购买域名或配置自定义域名；后续向 `main` 推送更新即可自动重新部署。无需先启用 GitHub Pages。

上线后检查：首页、11个项目页面、图片放大、中英文切换、搜索和分类筛选。Cloudflare Pages 可能把带 `.html` 的页面地址跳转为不带扩展名的地址，这是平台的正常行为。

配置依据：[Git 连接指南](https://developers.cloudflare.com/pages/get-started/git-integration/)、[静态 HTML 发布指南](https://developers.cloudflare.com/pages/framework-guides/deploy-anything/)、[页面路由规则](https://developers.cloudflare.com/pages/configuration/serving-pages/)。

## 快速发布

### 1. 解压代码包

进入解压后的 `guanxiong-portfolio` 文件夹。`index.html`、其他 HTML 文件、CSS／JS 文件、`assets` 文件夹和 `.nojekyll` 文件需要一起上传。

**上传解压后的文件，不要只上传 ZIP 压缩包。仓库首页必须能直接看到 `index.html`，不能再套一层 `guanxiong-portfolio` 文件夹。**

### 2. 上传到 GitHub（推荐 GitHub Desktop）

1. 在 GitHub 创建一个名为 `portfolio` 的新仓库，选择 **Public**。使用空仓库，不勾选添加 README、`.gitignore` 或许可证文件。
2. 打开已登录的 GitHub Desktop，选择 **File → Clone Repository → URL**，填写新仓库的网址并克隆到电脑。
3. 把代码包中 `guanxiong-portfolio` 文件夹内的全部内容复制到刚克隆的仓库文件夹，确保包含 `.nojekyll` 文件。
4. 回到 GitHub Desktop，在 Summary 中填写 `Add portfolio website`，提交全部文件，然后点击 **Push origin**。默认分支建议使用 `main`。

操作参考：[克隆仓库](https://docs.github.com/en/desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop)、[提交并推送更改](https://docs.github.com/en/desktop/making-changes-in-a-branch/committing-and-reviewing-changes-to-your-project-in-github-desktop)。

图片资源较多，使用 GitHub Desktop 可以一次提交整个文件夹。如果使用网页的 **Add file → Upload files**，请分批上传并保持 `assets/` 路径。GitHub 网页单次最多上传100个文件、单个文件上限25 MiB；本包内所有单个文件均低于此上限。[GitHub 文件上传说明](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository)

### 3. 启用 GitHub Pages

在 GitHub 仓库中打开 **Settings → Pages**，按下表设置：

| 设置项 | 选择 |
| --- | --- |
| Source | Deploy from a branch |
| Branch | main（或你实际上传代码的分支） |
| Folder | /(root) |

点击 **Save**。部署完成后，Pages 设置页会显示可访问的网址。后续向同一发布分支推送更新，网站会自动重新发布。[GitHub Pages 官方配置说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

如果仓库名为 `portfolio`，网址通常是 `https://你的GitHub用户名.github.io/portfolio/`，以 Pages 设置页显示的网址为准。仓库名可自定，站内相对路径无需随仓库名称修改。

无需填写任何构建命令，也无需新增 GitHub Actions 工作流；本包的 `.nojekyll` 用于按静态文件发布。

## 页面与文件

| 页面文件 | 内容 |
| --- | --- |
| [index.html](index.html) | 个人介绍、教育与工作经历、项目目录 |
| [furnace-warehouse.html](furnace-warehouse.html) | 炉·仓——工业遗产更新 |
| [oak-bay.html](oak-bay.html) | 唐山橡树湾 A03 |
| [nanyuan.html](nanyuan.html) | 城建南苑——立面控制 |
| [cr-research.html](cr-research.html) | 华润示范区——空间模块研究 |
| [shunyi-apartments.html](shunyi-apartments.html) | 北京顺义青年公寓 |
| [peace-elite.html](peace-elite.html) | 和平精英联名艺术展陈 |
| [modular-market.html](modular-market.html) | 魔方——可变模块集市 |
| [nautical-museum.html](nautical-museum.html) | 航海微型博物馆 |
| [taihu-wilderness.html](taihu-wilderness.html) | 城市荒野——太湖湿地 |
| [hanguang-gallery.html](hanguang-gallery.html) | 含光——儿童艺术长廊 |
| [other-designs.html](other-designs.html) | 其他设计合集 |

| 文件／目录 | 用途 |
| --- | --- |
| `assets/` | 完整图片、效果图及原始展板资源 |
| `style.css`、`portfolio-layout.css` | 全站基础样式、首页和项目页布局 |
| `portfolio-chapters.css`、`shunyi.css`、`peace-elite.css` | 特定项目的补充样式 |
| `app.js` | 语言切换、通用导航与图片查看 |
| `portfolio-index.js` | 首页搜索、分类及筛选状态 |
| 其他 `.js` 文件 | 各项目的专用交互 |
| `.nojekyll` | GitHub Pages 静态发布配置 |
| `.gitignore` | 忽略本地缓存及配置文件 |

## 本地查看

如果电脑已安装 Python，在包含 `index.html` 的文件夹中打开终端，运行：

```bash
python -m http.server 8000 --bind 127.0.0.1
```

然后在浏览器打开 [本地预览](http://127.0.0.1:8000)。Windows 也可使用 `py -m http.server 8000 --bind 127.0.0.1`。退出时按 `Ctrl+C`。

也可使用编辑器的本地静态服务器功能。推荐通过本地服务器查看，以便完整使用搜索状态、页面地址等交互。

## 后续修改

- **个人资料和项目目录：** 编辑 `index.html`。
- **项目内容：** 编辑对应的 HTML 文件。
- **中英文文案：** 同时修改元素的 `data-zh`、`data-en` 和默认显示文字；页面标题也有中英文属性。
- **搜索词：** 修改首页项目卡片的 `data-search`；项目名称、位置、年份等可同时填写中英文。
- **图片：** 在 `assets/` 中替换文件，或更新 HTML 的 `src`／`data-full`。更换尺寸时同步修改 `width`、`height`，保留正确比例。
- **新增项目：** 新建 HTML 页，在首页增加项目卡片，并更新相邻项目的前后导航和显示编号。

继续使用 `assets/图片文件.webp` 和 `项目文件.html` 这样的相对路径。不要改为 `/assets/...` 这种以斜杠开头的路径，否则在带仓库名称的 GitHub Pages 网址下可能找不到资源。

此代码包是导出时的独立快照。之后修改这个 GitHub 仓库与修改原网站，需要分别更新，不会自动互相同步。

## 常见问题

**发布后显示404：** 确认 `index.html` 在仓库根目录、Pages 选择了实际上传的分支和 `/(root)`，并查看仓库 Actions 中的部署状态。

**图片显示不全：** 确认完整上传 `assets/`，且路径、文件名大小写与 HTML 一致。

**修改后没有变化：** 确认已推送到 Pages 使用的分支，并等待部署完成后刷新浏览器。

## 可选：使用 Git 命令上传

如果熟悉 Git，可替代 GitHub Desktop。先在 GitHub 创建空仓库，在解压后包含 `index.html` 的文件夹内运行以下命令。将 `YOUR_USERNAME` 和仓库名替换成你自己的值：

```bash
git init -b main
git add .
git commit -m "Add portfolio website"
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```

完成后，仍需按上面的第3步启用 GitHub Pages。
