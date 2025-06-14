import React from "react";
import ReviewItem from "../Molecules/ReviewItem";
import { Box, Text } from "@chakra-ui/react";

export default function ReviewList({ reviews }) {
	return (
		<Box>
			{reviews.length === 0 && (
				<Text color="gray.400">レビューはまだありません</Text>
			)}
			{reviews.map((review) => (
				<ReviewItem key={review.id} review={review}/>
			))}
		</Box>
	);
}
