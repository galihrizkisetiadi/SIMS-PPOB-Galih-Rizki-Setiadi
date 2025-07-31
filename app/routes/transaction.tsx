import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button, Skeleton } from "antd";

import { getHistory } from "~/services/transaction";

import { dateFormatter, decimalFormat } from "~/helper";

import Welcome from "~/components/Welcome";

export function meta() {
	return [{ title: "SIMS PPOB-Galih Rizki Setiadi - Transaksi" }];
}

const Transaction = () => {
	const [params, setParams] = useState({ limit: 5, offset: 0 });
	const [history, setHistory] = useState<Array<any>>([]);

	const { data, isLoading, refetch } = useQuery({
		queryKey: ["history", params],
		queryFn: () => getHistory({ limit: params.limit, offset: params.offset }),
		staleTime: Infinity,
	});

	useEffect(() => {
		if (data?.data?.records) {
			if (history.length) {
				setHistory((h) => h.concat(data.data.records));
			} else {
				setHistory(() => data.data.records);
			}
		}
	}, [isLoading]);

	return (
		<div className="flex flex-col gap-8">
			<Welcome />

			<div className="flex flex-col gap-4">
				<span className="text-lg">Semua Transaksi</span>

				{history.length < 0 ? (
					<Skeleton />
				) : (
					<div className="flex flex-col gap-3">
						<div className="flex flex-col gap-2">
							{history?.map((record: any, index: number) => (
								<div key={index} className="flex justify-between rounded-md border border-gray-300 px-4 py-2">
									<div className="flex flex-col">
										<span
											className={`text-md flex font-semibold ${record?.transaction_type === "TOPUP" ? "text-green-400" : "text-primary"} `}
										>
											{record?.transaction_type === "TOPUP" ? "+" : "-"}
											{" Rp." + decimalFormat(record?.total_amount as number)}
										</span>
										<span className="text-xs text-gray-400">{dateFormatter(record?.created_on as Date)}</span>
									</div>

									<span className="text-sm font-semibold text-gray-600">{record?.description}</span>
								</div>
							))}
						</div>

						<Button
							color="primary"
							variant="link"
							className="!p-0"
							onClick={async () => {
								setParams((p) => ({ ...p, offset: p.offset + p.limit }));
								await refetch();
							}}
						>
							Show more
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Transaction;
