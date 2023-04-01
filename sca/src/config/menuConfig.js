/**
 * icon:菜单项图标
 * roles:标明当前菜单项在何种角色下可以显示，如果不写此选项，表示该菜单项完全公开，在任何角色下都显示
 */
const menuList = [
  {
    title: "统计面板",
    path: "/dashboard",
    icon: "icon-shouye",
    roles:["admin","editor","guest"]
  },
  {
    title: "系统状态",
    path: "/sysStatus",
    icon: "icon-zhexiantu",
    roles:["admin","editor","guest"]
  },
  {
    title: "成分分析",
    path: "/analysis",
    icon: "icon-a-bianzu13-01",
    roles:["admin","editor","guest"],
    children: [
      
          {
            title: "分析执行",
            path: "/analysis/execute",
            roles:["admin"],
            icon:'icon-shujufenxi-liuliangfenxi'
          },
          {
            title: "检测历史",
            path: "/analysis/history",
            roles:["admin"],
            icon:'icon-lishihangcheng'
          },
        ]
  },
  {
    title: "知识库",
    path: "/loophole",
    icon: "icon-database1",
    roles:["admin","editor","guest"],
    children: [
      
          {
            title: "漏洞数据库",
            path: "/loophole/loopholedatabse",
            roles:["admin"],
            icon:'icon-shujufenxi-liuliangfenxi'
          },
          {
            title: "知识图谱",
            path: "/loophole/knowledge",
            roles:["admin"],
            icon:'icon-qiyetupu'
          },
        ]
  },
  {
    title: "系统管理",
    path: "/sysManage",
    icon: "icon-a-bianzu13-33",
    roles:["admin","editor","guest"],
    children: [
      {
        title: "角色管理",
        path: "/sysManage/role",
        roles:["admin"],
        icon:'icon-adduser',
      },
      {
        title: "用户管理",
        path: "/sysManage/user",
        roles:["admin"],
        icon:'icon-user',
      },
      {
        title: "系统日志",
        path: "/sysManage/log",
        roles:["admin"],
        icon:'icon-rizhi',
      },
    ]
  },

];
export default menuList;
