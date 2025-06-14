import MainLayout from "@/Layouts/MainLayout";
import { CloseIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	IconButton,
	Image,
	Input,
	Link,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { Link as InertiaLink, router, useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Edit(props) {
	const existingImages = props.shop.images
		? props.shop.images.map((image) => ({
				id: image.id,
				file_name: image.file_name,
				file_path: image.file_path,
				image_url: image.image_url,
		  }))
		: [];

	const { data, setData, post, errors } = useForm({
		id: props.shop.id,
		name: props.shop.name,
		location: props.shop.location,
		description: props.shop.description,
		images: [],
		existingImages: existingImages,
	});
	const toast = useToast();

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		if (files.length + data.existingImages.length > 5) {
			toast({
				position: "top",
				title: "画像は5つまで選択可能です",
				status: "error",
				isClosable: true,
			});
			e.target.value = "";
			return;
		}
		setData("images", files);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("shop.update"), {
			forceFormData: true,
		});
	};

	const handleDelete = () => {
		if (confirm("本当に削除しますか？")) {
			router.post(route("shop.destroy", { shop: props.shop.id }));
		}
	};

	const handleRemoveImage = (index, type) => {
		if (type === "existing") {
			const images = data.existingImages;
			// index番目の要素を削除し、その後の要素を詰める
			images.splice(index, 1);
			setData("existingImages", images);
		} else {
			const images = data.images;
			images.splice(index, 1);
			setData("images", images);

			const dataTransfer = new DataTransfer();
			const imageFiles = document.getElementById("images").files;

			Array.from(imageFiles).forEach((file, i) => {
				if (i !== index) {
					dataTransfer.items.add(file);
				}
			});
			document.getElementById("images").files = dataTransfer.files;
		}
	};

	return (
		<Box p={4} m={4} w={{ base: "90%", md: 700 }}>
			<Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
				店舗編集
			</Heading>
			<form onSubmit={handleSubmit}>
				<FormControl isRequired>
					<FormLabel htmlFor="name" fontWeight="bold">
						店舗名
					</FormLabel>
					<Input
						type="text"
						id="name"
						name="name"
						value={data.name}
						onChange={(e) => setData("name", e.target.value)}
					></Input>
				</FormControl>
				<FormControl isRequired>
					<FormLabel htmlFor="location" fontWeight="bold">
						住所
					</FormLabel>
					<Input
						type="text"
						id="location"
						name="location"
						value={data.location}
						onChange={(e) => setData("location", e.target.value)}
						isRequired
					></Input>
				</FormControl>
				<FormControl id="description" isRequired>
					<FormLabel htmlFor="description" fontWeight="bold">
						詳細
					</FormLabel>
					<Textarea
						name="description"
						value={data.description}
						onChange={(e) => setData("description", e.target.value)}
					/>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="images" fontWeight="bold">
						画像
					</FormLabel>
					{/* プレビュー */}
					<HStack bg="gray.200" p={2}>
						{data.existingImages.length > 0 && (
							<>
								{data.existingImages.map((image, index) => (
									<Box position="relative" key={index}>
										<Image
											src={
												image.image_url
											}
											alt={`プレビュー画像 ${index + 1}`}
											boxSize="100px"
											objectFit="cover"
										/>
										<IconButton
											isRound={true}
											position="absolute"
											top={-2}
											right={-2}
											size="xs"
											variant="solid"
											colorScheme="red"
											aria-label="Done"
											fontSize="10px"
											zIndex={10}
											icon={<CloseIcon />}
											onClick={() => handleRemoveImage(index, "existing")}
										/>
									</Box>
								))}
							</>
						)}

						{data.images.length > 0 && (
							<>
								{data.images.map((image, index) => (
									<Box position="relative" key={index}>
										<Image
											src={URL.createObjectURL(image)}
											alt={`プレビュー画像 ${index + 1}`}
											boxSize="100px"
											objectFit="cover"
										/>
										<IconButton
											isRound={true}
											position="absolute"
											top={-2}
											right={-2}
											size="xs"
											variant="solid"
											colorScheme="gray"
											aria-label="Done"
											fontSize="10px"
											zIndex={10}
											icon={<CloseIcon />}
											onClick={() => handleRemoveImage(index, "")}
										/>
									</Box>
								))}
							</>
						)}
					</HStack>
					<Input
						type="file"
						id="images"
						name="images"
						accept="image/*"
						onChange={handleImageChange}
						multiple
					></Input>
				</FormControl>
				<Box
					mx="auto"
					w="100%"
					display="flex"
					justifyContent="space-evenly"
					mt={4}
				>
					<Button type="submit" colorScheme="teal">
						更新
					</Button>
					<Button type="button" colorScheme="red" onClick={handleDelete}>
						削除
					</Button>
				</Box>
			</form>
		</Box>
	);
}

Edit.layout = (page) => <MainLayout children={page} title={"店舗編集"} />;
