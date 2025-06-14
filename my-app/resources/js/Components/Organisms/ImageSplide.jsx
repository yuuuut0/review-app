import { Image } from "@chakra-ui/react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React from "react";

export default function ImageSplide({ images }) {
	return (
		<>
			<Splide>
				{images.map((image) => (
					<SplideSlide key={image.id}>
						<Image
							boxSize="100%"
							objectFit="contain"
							src={import.meta.env.VITE_APP_PATH + "/" + image.file_path}
							mb={4}
						/>
					</SplideSlide>
				))}
			</Splide>
		</>
	);
}
