import React from "react";
import ReviewItem from "../Molecules/ReviewItem";
import { Box, Text } from "@chakra-ui/react";
import Pagination from "../Molecules/Pagination";

export default function PaginatedReviewList({ reviews, query = {} }) {
	return (
		<Box>
			{reviews.data.length === 0 && (
				<Text color="gray.400" m={4}>
					レビューはまだありません
				</Text>
			)}
			{reviews.data.map((review) => (
				<ReviewItem key={review.id} review={review} />
			))}
			{reviews.data.length > 0 && <Pagination items={reviews} query={query} />}
		</Box>
	);
}
