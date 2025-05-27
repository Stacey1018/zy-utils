import { basename } from "path"
import type { DefaultTheme } from "vitepress"
import { defineConfig } from "vitepress"
import fg from "fast-glob"
interface IndexTree {
  [index: string]: {
    link: string
    items?: IndexTree
  }
}

// 目录标题去除utils.前缀
function resolveTitle(title: string) {
  return title === "tools" ? title : title.replace("tools.", "")
}

// 将md文档列表转为树结构
function getTree(file: string, prefix: string, tree = {}) {
  const [cur, ...rest] = file.replace(".md", "").split(".")
  const curPath =  cur
  if (!tree[curPath]) {
    tree[curPath] = {
      link: prefix + cur + ".md",
    }
  }
  if (rest.length > 0) {
    if (!tree[curPath].items) {
      tree[curPath].items = {}
    }
    getTree(rest.join("."), curPath + ".", tree[curPath].items)
  }
}

// 将树结构转为目录数组
function treeToItems(tree: IndexTree) {
  const items: DefaultTheme.SidebarItem[] = []
  Object.keys(tree).forEach((key) => {
    const item: DefaultTheme.SidebarItem = {
      text: resolveTitle(key),
      link: tree[key].link,
    }
    if (tree[key].items) {
      if (!item.items) {
        item.items = []
      }
      item.items.push(...treeToItems(tree[key].items!))
    }
    items.push(item)
  })
  return items
}

const tree = fg
  .sync(["./docs/markdown/*.md"])
  .map((path) => basename(path))
  .reduce((tree, file) => {
    getTree(file, "", tree)
    return tree
  }, {})

  const functionTree =  fg
  .sync(["./docs/markdown/functions/*.md"])
  .map((path) => basename('1'+path))
  .reduce((tree, file) => {
    getTree(file, "/functions/", tree)
    return tree
  }, {})

  const classTree =  fg
  .sync(["./docs/markdown/classes/*.md"])
  .map((path) => basename('1'+path))
  .reduce((tree, file) => {
    getTree(file, "/classes/", tree)
    return tree
  }, {})
  

const treeList : DefaultTheme.SidebarItem[] = treeToItems(tree)
const functionTreeList : DefaultTheme.SidebarItem[] = treeToItems(functionTree)
const classTreeList : DefaultTheme.SidebarItem[] = treeToItems(classTree)

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "zy-utils",
  description: "A VitePress Site",
  srcDir:'./docs/markdown', // 注意文件源目录
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'api', link: '/globals' }
    ],

    sidebar: [
      ...treeList,
      {
        text: 'functions',
        items:[
          ...functionTreeList
        ]
      },
      {
        text: 'classes',
        items:[
          ...classTreeList
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
