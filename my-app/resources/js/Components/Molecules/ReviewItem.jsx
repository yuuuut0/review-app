import React from "react";
import StarRating from "../Atoms/StarRating";
import UserName from "../Atoms/UserName";
import { Box, Button, Heading, Link, Text } from "@chakra-ui/react";
import { Link as InertiaLink, usePage } from "@inertiajs/react";

export default function ReviewItem({ review }) {
	const { auth } = usePage().props;
	return (
		<Box
			p={4}
			mb={4}
			borderWidth="1px"
			borderRadius="lg"
			overflow="hidden"
			boxShadow="lg"
		>
			{review.shop && (
				<Heading fontSize="md" color="gray.500" mb={2}>
					<Link
						as={InertiaLink}
						href={route("shop.detail", { id: review.shop.id })}
					>
						{review.shop.name}
					</Link>
				</Heading>
			)}
			<Text style={{ whiteSpace: "pre-wrap" }}>{review.comment}</Text>
			<UserName user={review.user} />
			<StarRating rating={review.rating} />
			{auth.user?.id === review.user_id && (
			<Box mt={3} w="100%" display="flex" justifyContent="flex-end">
				<Link href={route("review.edit", { id: review.id })}>
					<Button colorScheme="blue" fontSize="14px">
						編集
					</Button>
				</Link>
			</Box>
			)}
		</Box>
	);
}
