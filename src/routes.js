/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Index from "views/Index.js";
import Compare from "views/examples/Compare.js";
import Login from "views/examples/Login.js";
import Search from "views/examples/Search.js";
import Response from "views/examples/Response.js";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    protected: true,
  },
  {
    path: "/response",
    name: "Response",
    icon: "ni ni-chat-round text-blue",
    component: <Response />,
    layout: "/admin",
    protected: true,
  },
  {
    path: "/compare",
    name: "Compare Brands",
    icon: "ni ni-single-copy-04 text-orange",
    component: <Compare />,
    layout: "/admin",
    protected: false,
  },
  {
    path: "/search",
    name: "Search Brands",
    icon: "fas fa-search text-yellow",
    component: <Search />,
    layout: "/admin",
    protected: false,
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: <Login />,
    layout: "/auth",
    protected: false,
  },
];
export default routes;

