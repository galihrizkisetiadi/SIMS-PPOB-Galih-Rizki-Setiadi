import { Outlet } from "react-router";
import type { Route } from "../+types/root";

import Img from "../assets/images/Illustrasi Login.png";

export default function IndexLayout({ loaderData }: Route.ComponentProps) {
	return (
		<div className="flex h-screen">
			<Outlet context={loaderData} />
			<img src={Img} alt="Illustrasi Login" className="hidden lg:block" />
		</div>
	);
}
