import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { getServices } from "~/services/service";

const Service = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["services"],
		queryFn: getServices,
	});

	return (
		<div className="flex w-full gap-2 overflow-hidden">
			{isLoading ? (
				<Skeleton title={false} paragraph={{ rows: 1 }} className="w-full" />
			) : (
				data?.data?.map((service: any, index: number) => (
					<div key={index} className="flex h-full w-full flex-col items-center justify-center gap-2">
						<img src={service.service_icon} alt={`service-${index}`} className="h-12 w-12" />
						<span className="text-center text-xs font-light">{service.service_name}</span>
					</div>
				))
			)}
		</div>
	);
};

export default Service;
