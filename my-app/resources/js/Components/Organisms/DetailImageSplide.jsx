import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { useRef, useEffect } from "react";
import { Box, Image } from "@chakra-ui/react";

export default function DetailImageSplide({ images }) {
	const mainRef = useRef();
	const thumbsRef = useRef();

	useEffect(() => {
		if (
			mainRef.current &&
			thumbsRef.current &&
			thumbsRef.current.splide
		) {
			mainRef.current.sync(thumbsRef.current.splide);
		}
	}, []);

	return (
		<>
			<Box my={4}>
				<Splide
					options={{
						type: "fade",
						heightRatio: 0.4,
						pagination: false,
						arrows: false,
						breakpoints: {
							640: {
								heightRatio: 0.6
							},
						},
					}}
					ref={mainRef}
					aria-labelledby="thumbnail-slider-example"
				>
					{images.map((image) => (
						<SplideSlide key={image.id}>
							<Image
								boxSize="100%"
								objectFit="contain"
								src={image.image_url}
								mb={4}
								
							/>
						</SplideSlide>
					))}
				</Splide>
			</Box>

			<Box mb={4}> 
				<Splide
					options={{
						rewind: true,
						fixedWidth: 104,
						fixedHeight: 58,
						isNavigation: true,
						gap: 10,
						focus: "center",
						pagination: false,
						cover: true,
						trimSpace: true,
						breakpoints: {
							640: {
								fixedWidth: 77,
								fixedHeight: 52,
							},
						},
					}}
					ref={thumbsRef}
					aria-label="The carousel with thumbnails. Selecting a thumbnail will change the main carousel"
				>
					{images.map((image) => (
						<SplideSlide key={image.id}>
							<Image
								boxSize="100%"
								objectFit="contain"
								src={image.image_url}
							/>
						</SplideSlide>
					))}
				</Splide>
			</Box>
		</>
	);
}
