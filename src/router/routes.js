export default [
  {
    name: "Master",
    path: "/",
    component: import('./../pages/layout/master'),
    redirect: '/dashboard',
    children: [
      {
        name: 'dashboard',
        path: '/dashboard',
        component: import('./../pages/dashboard'),
      },
      {
        name: 'addcourse',
        path: '/addcourse',
        component: import('./../pages/addcourse'),
      },
      {
        name: 'addsubcourse',
        path: '/addsubcourse',
        component: import('./../pages/addsubcourse'),
      },
      {
        name: 'listcourse',
        path: '/listcourse',
        component: import('./../pages/listcourse'),
      },
      {
        name: 'listsubcourse',
        path: '/listsubcourse',
        component: import('./../pages/listsubcourse'),
      },
      {
        name: 'editcourse',
        path: '/editcourse',
        component: import('./../pages/editcourse'),
      }
    ]
    },

]