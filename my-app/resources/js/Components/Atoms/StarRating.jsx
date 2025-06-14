import { StarIcon } from "@chakra-ui/icons";
import { HStack } from "@chakra-ui/react";
import React from "react";

export default function StarRating({ rating }) {
	return (
		<HStack>
			{Array(5)
				.fill("")
				.map((_, i) => (
					<StarIcon
						key={i}
						color={i < rating ? "yellow.500" : "gray.300"}
					/>
				))}
		</HStack>
	);
}
