import Loadable from "react-loadable";
import Loading from "@/components/Loading";
const Dashboard = Loadable({
  loader: () => import(/*webpackChunkName:'Dashboard'*/ "@/views/dashboard"),
  loading: Loading,
});

const SysBoard = Loadable({
  loader: () => import("@/views/sysStatus"),
  loading: Loading,
});

const ContentAnalysis = Loadable({
  loader: () => import("@/views/analysis/execute"),
  loading: Loading,
});

const History = Loadable({
  loader: () => import("@/views/analysis/history"),
  loading: Loading,
});

const Error404 = Loadable({
  loader: () => import(/*webpackChunkName:'Error404'*/ "@/views/error/404"),
  loading: Loading,
});
const User = Loadable({
  loader: () => import(/*webpackChunkName:'User'*/ "@/views/user"),
  loading: Loading,
});

const LooholeDataBase=Loadable({
  loader: () => import(/*webpackChunkName:'User'*/ "@/views/loophole"),
  loading: Loading,
})



export default [
  {
    path: "/dashboard",
    component: Dashboard,
    roles: ["admin", "editor", "guest"],
  },
  { path: "/sysStatus", component: SysBoard, roles: ["admin", "editor"] },
  { path: "/analysis/execute", component: ContentAnalysis, roles: ["admin", "editor"]},
  { path: "/analysis/history", component: History, roles: ["admin", "editor"]},
  { path: "/loophole/loopholedatabse", component: LooholeDataBase, roles: ["admin", "editor"]},
 
  { path: "/user", component: User, roles: ["admin"] },
  { path: "/error/404", component: Error404 },
];
