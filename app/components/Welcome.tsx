import { useQuery } from "@tanstack/react-query";
import { Avatar, Skeleton } from "antd";
import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { getProfile } from "~/services/profile";
import type { UserState } from "~/types/login";

import Profile from "../assets/images/Profile Photo.png";
import Background from "../assets/images/Background Saldo.png";
import { getBalance } from "~/services/transaction";
import { decimalFormat } from "~/helper";

const Welcome = () => {
	const [valueUser] = useLocalStorage<UserState | null>("user", null);

	const [saldoVisible, setSaldoVisible] = useState(false);

	const { data: dataProfile, isLoading: isLoadingProfile } = useQuery({
		queryKey: ["profile", valueUser?.memberCode],
		queryFn: getProfile,
		staleTime: Infinity,
	});

	const { data: dataBalance } = useQuery({
		queryKey: ["balance", valueUser?.memberCode],
		queryFn: getBalance,
		staleTime: Infinity,
	});

	return (
		<div className="flex flex-col gap-8">
			<div className="flex flex-col items-start justify-center gap-2 md:flex-row md:items-center">
				<div className="flex w-2/6 flex-col gap-3">
					{isLoadingProfile ? (
						<>
							<Skeleton.Avatar active />
							<Skeleton paragraph={{ rows: 1 }} />
						</>
					) : (
						<>
							<Avatar
								size={64}
								src={!dataProfile?.data?.profile_image.includes("null") ? dataProfile?.data?.profile_image : Profile}
							></Avatar>
							<div className="flex flex-col">
								<span className="">Selamat datang, </span>
								<span className="text-xl font-bold">{dataProfile?.data?.first_name}</span>
							</div>
						</>
					)}
				</div>

				<div
					className="h-full w-full"
					style={{ backgroundImage: `url(${Background})`, backgroundRepeat: "no-repeat", backgroundSize: "100% 100%" }}
				>
					<div className="flex flex-col gap-10 px-[1.3rem] py-[2.6rem] text-white">
						<span>Saldo anda</span>
						<span className="text-3xl font-bold">
							RP{" "}
							{saldoVisible ? (
								decimalFormat((dataBalance?.data?.balance as number) ?? 0)
							) : (
								<span>&middot; &middot; &middot; &middot; &middot; &middot; &middot;</span>
							)}
						</span>
						<button className="cursor-pointer text-left" onClick={() => setSaldoVisible(!saldoVisible)}>
							{!saldoVisible ? "Lihat Saldo" : "Tutup Saldo"}
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Welcome;
