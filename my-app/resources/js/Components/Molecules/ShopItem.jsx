import { Box, Heading, HStack, Image, Link, Text, VStack } from "@chakra-ui/react";
import { Link as InertiaLink } from "@inertiajs/react";
import React from "react";

export default function ShopItem({shop}) {
	return (
		<Link
			as={InertiaLink}
			href={`/shop/${shop.id}/detail`}
			_hover={{ color: "gray.500" }}
		>
			<Box
				p={4}
				borderWidth={"1px"}
				borderRadius={"lg"}
				overflow={"hidden"}
				boxShadow={"lg"}
			>
				<HStack spacing={4}>
					{shop.images.length === 0 ? (
						<Image
							boxSize="100px"
							objectFit="cover"
							src="https://placehold.jp/100x100.png"
							alt={shop.name}
						/>
					):(
						<Image
							boxSize="100px"
							objectFit="cover"
							src={shop.images[0].image_url}
							alt={shop.name}
						/>
					)}
					<VStack align={"start"}>
						<Heading as={"h3"} size={"md"}>
							{shop.name}
						</Heading>
						<Text>{shop.description}</Text>

						<Text>
							レビュー平均:{" "}
							{shop.reviews_avg_rating
								? shop.reviews_avg_rating.toFixed(2)
								: "評価なし"}
							({shop.reviews_count})
						</Text>
					</VStack>
				</HStack>
			</Box>
		</Link>
	);
}
