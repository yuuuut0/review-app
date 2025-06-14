import MainLayout from "@/Layouts/MainLayout";
import { StarIcon } from "@chakra-ui/icons";
import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Spinner,
	Text,
	Textarea,
	useDisclosure,
} from "@chakra-ui/react";
import { router } from "@inertiajs/react";
import React, { useRef, useState } from "react";

export default function Create(props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const cancelRef = useRef();
	const [loading, setLoading] = useState(false);
	const [hoverRating, setHoverRating] = useState(0);
	const [values, setValues] = useState({
		shop_id: props.shop.id,
		rating: 0,
		comment: "",
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setLoading(true);
		e.target.disabled = true;
		router.post(route("review.store"), values);
	};

	const handleConfirm = (e) => {
		e.preventDefault();
		if (values.rating === 0 || values.comment.trim() === "") {
			alert("評価とコメントを入力してください");
			return;
		}
		onOpen();
	};

	return (
		<Box
			p={4}
			m={4}
			mx="auto"
			bg="gray.100"
			borderRadius="md"
			boxShadow="md"
			w={{ base: "90%", md: 700 }}
		>
			<Heading as="h2" size="md" mb={4} color="blue.900">
				レビューを投稿
			</Heading>
			<Text fontSize="xl" color="gray.500" mb={2}>
				{props.shop.name}
			</Text>
			<form>
				<FormControl isRequired mb={5}>
					<FormLabel fontWeight="bold">評価</FormLabel>
					<HStack spacing={0} mb={4}>
						{Array(5)
							.fill("")
							.map((_, i) => (
								<Box
									key={i}
									px={1}
									onMouseEnter={() => setHoverRating(i + 1)}
									onMouseLeave={() => setHoverRating(0)}
									onClick={() =>
										setValues((prev) => ({ ...prev, rating: i + 1 }))
									}
								>
									<StarIcon
										color={
											i < values.rating || i < hoverRating
												? "yellow.500"
												: "gray.300"
										}
									/>
								</Box>
							))}
					</HStack>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="comment" fontWeight="bold">
						コメント
					</FormLabel>
					<Textarea id="comment" name="comment" onChange={handleChange} />
				</FormControl>
				<Button type="button" colorScheme="blue" onClick={handleConfirm} mt={4}>
					投稿
				</Button>
			</form>

			<AlertDialog
				isOpen={isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
			>
				<AlertDialogOverlay>
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							確認
						</AlertDialogHeader>

						<AlertDialogBody>この内容で投稿しますか？</AlertDialogBody>

						<AlertDialogFooter>
							<Button ref={cancelRef} onClick={onClose}>
								Cancel
							</Button>
							<Button colorScheme="blue" onClick={handleSubmit} ml={3}>
								{loading ? <Spinner /> : "投稿"}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</Box>
	);
}

Create.layout = (page) => <MainLayout children={page} title="レビュー投稿" />;
