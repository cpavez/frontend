import { createRouter, createWebHistory } from "vue-router";
const Error404 = () =>
  import(/* webpackChunkName: "Error404" */ "../views/Error404.vue");
const Index = () =>
  import(/* webpackChunkName: "Index" */ "../views/Index.vue");
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../views/Login.vue");
const CreateCase = () =>
  import(/* webpackChunkName: "CreateCase" */ "../views/CreateCase.vue");
const SolveCase = () =>
  import(/* webpackChunkName: "CreateCase" */ "../views/SolveCase.vue");
const Dermatologia = () =>
  import(/* webpackChunkName: "Dermatologia" */ "../views/Dermatologia.vue");
const Resolve = () =>
  import(/* webpackChunkName: "Resolve" */ "../views/Resolve.vue");
const TrackingCase = () =>
  import(/* webpackChunkName: "TrackingCase" */ "../views/TrackingCase.vue");
const MyCases = () =>
  import(/* webpackChunkName: "MyCases" */ "../views/MyCases.vue");
const ResolveComplete = () =>
  import(
    /* webpackChunkName: "ResolveComplete" */ "../views/ResolveComplete.vue"
  );
const Nefrologia = () =>
  import(/* webpackChunkName: "Nefrologia" */ "../views/Nefrologia.vue");
const MainLayout = () =>
  import(/* webpackChunkName: "MainLayout" */ "../layouts/MainLayout.vue");
const Landing = () =>
  import(/* webpackChunkName: "Landing" */ "../views/Landing.vue");

const routes = [
  {
    path: "/",
    component: MainLayout,
    children: [{ path: "", name: "home", component: Index }],
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/create-case",
    component: MainLayout,
    children: [
      { path: "", name: "createCase", component: CreateCase },
      {
        path: "dermatologia/:id?",
        name: "dermatologia",
        component: Dermatologia,
      },
      { path: "nefrologia/:id?", name: "nefrologia", component: Nefrologia },
    ],
  },
  {
    path: "/tracking-case",
    component: MainLayout,
    children: [
      { path: "", name: "trackingCase", component: TrackingCase },
      {
        path: "view/:id?/:url?",
        name: "trackingCaseView",
        component: ResolveComplete,
      },
      {
        path: "edit/:id?/:celula?/:paciente?/:url?",
        name: "trackingCaseEdit",
        component: Landing,
      },
    ],
  },
  {
    path: "/solve-case",
    component: MainLayout,
    children: [
      { path: "", name: "solveCase", component: SolveCase },
      { path: "solveCase/:id?", name: "solveCaseId", component: Resolve },
    ],
  },
  {
    path: "/my-cases",
    component: MainLayout,
    children: [
      { path: "", name: "myCases", component: MyCases },
      {
        path: "myCases/:id?",
        name: "mySolveCaseId",
        component: ResolveComplete,
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: Error404,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
