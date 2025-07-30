import { useQuery } from "@tanstack/react-query";
import { Avatar, Skeleton } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocalStorage } from "usehooks-ts";
import { getProfile } from "~/services/profile";
import type { UserState } from "~/types/login";

import Profile from "../assets/images/Profile Photo.png";

const Home = () => {
	const navigate = useNavigate();
	const [valueUser] = useLocalStorage<UserState | null>("user", null);

	useEffect(() => {
		if (!valueUser) {
			navigate("/login", { replace: true });
		}
	}, []);

	const { data, isLoading } = useQuery({
		queryKey: ["profile", valueUser?.memberCode],
		queryFn: getProfile,
	});

	return (
		<div className="flex w-full justify-between">
			<div className="flex w-full flex-col gap-3">
				{isLoading ? (
					<>
						<Skeleton.Avatar active />
						<Skeleton paragraph={{ rows: 1 }} />
					</>
				) : (
					<>
						<Avatar
							size={64}
							src={!data?.data?.profile_image.includes("null") ? data?.data?.profile_image : Profile}
						></Avatar>
						<div className="flex flex-col">
							<span className="">Selamat datang, </span>
							<span className="text-lg font-bold">{data?.data?.first_name}</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Home;
