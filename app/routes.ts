import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
export default [
	layout("layouts/loginLayout.tsx", [route("login", "routes/login.tsx"), route("register", "routes/register.tsx")]),

	layout("layouts/index.tsx", [index("routes/home.tsx")]),
] satisfies RouteConfig;
