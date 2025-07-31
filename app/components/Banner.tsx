import { useQuery } from "@tanstack/react-query";
import { Image, Skeleton } from "antd";
import { getBanner } from "~/services/service";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Banner = () => {
	const { data, isLoading } = useQuery({
		queryKey: ["banners"],
		queryFn: getBanner,
	});

	const responsive = {
		superLargeDesktop: {
			breakpoint: { max: 4000, min: 1600 },
			items: 4,
		},
		desktop: {
			breakpoint: { max: 1600, min: 1024 },
			items: 3,
		},
		tablet: {
			breakpoint: { max: 1024, min: 464 },
			items: 2,
		},
		mobile: {
			breakpoint: { max: 464, min: 0 },
			items: 1,
		},
	};

	return (
		<div className="h-full w-full">
			{isLoading ? (
				<Skeleton title={false} paragraph={{ rows: 1 }} className="w-full" />
			) : (
				<Carousel responsive={responsive} ssr centerMode={true}>
					{data?.data?.map((banner: any, index: number) => (
						<Image key={index} src={banner?.banner_image} className="h-full w-full" />
					))}
				</Carousel>
			)}
		</div>
	);
};

export default Banner;
