import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";
export default [
	layout("layouts/loginLayout.tsx", [route("login", "routes/login.tsx"), route("register", "routes/register.tsx")]),

	layout("layouts/index.tsx", [
		index("routes/home.tsx"),
		route("topup", "routes/topup.tsx"),
		route("transaction", "routes/transaction.tsx"),
		route("account", "routes/account.tsx"),
		route("bill/:service", "routes/bill.tsx"),
	]),
] satisfies RouteConfig;
