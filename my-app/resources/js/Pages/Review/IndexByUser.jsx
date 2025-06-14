import ReviewList from "@/Components/Organisms/ReviewList";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Heading } from "@chakra-ui/react";
import React from "react";

export default function IndexByUser(props) {
	return (
		<>
			<Box p={4}>
				<Heading fontSize={{ base: "24", md: "36" }} mb={3}>
					{props.user.name}のレビュー一覧
				</Heading>
				{props.reviews.length > 0 ? (
					
					<ReviewList reviews={props.reviews} />
				) : (
					<Heading fontSize="md" mt={3} color="gray.500">レビューはまだありません</Heading>
				)}
			</Box>
		</>
	);
}

IndexByUser.layout = (page) => (
	<MainLayout children={page} title="ユーザーレビュー一覧" />
);
