import MainLayout from "@/Layouts/MainLayout";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	HStack,
	Image,
	Input,
	Textarea,
	useToast,
} from "@chakra-ui/react";
import { useForm } from "@inertiajs/react";
import React, { useEffect } from "react";

export default function Create() {
	const { data, setData, post, errors } = useForm({
		name: "",
		location: "",
		description: "",
		images: [],
	});
	const toast = useToast();

	const handleImageChange = (e) => {
		const files = Array.from(e.target.files);
		if (files.length > 5) {
			toast({
				position: "top",
				title: "画像は5つまで選択可能です",
				status: "error" ,
				isClosable: true,
			});
			e.target.value = "";
			return;
		}
		setData("images", files);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		post(route("shop.store"), {
			forceFormData: true,
		});
	};


	return (
		<Box p={4} m={4} w={{ base: "90%", md: 700 }}>
			<Heading as="h2" fontSize={{ base: 18, md: 24 }} mb={6}>
				店舗新規作成
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
						onChange={(e) => setData("description", e.target.value)}
					></Textarea>
				</FormControl>
				<FormControl>
					<FormLabel htmlFor="images" fontWeight="bold">
						画像
					</FormLabel>
					{/* プレビュー */}
					{data.images.length > 0 && (
						<HStack bg="gray.200" p={2}>
							{data.images.map((image, index) => (
								<Image
									key={index}
									src={URL.createObjectURL(image)}
									alt={`プレビュー画像 ${index + 1}`}
									boxSize="100px"
									objectFit="cover"
								/>
							))}
						</HStack>
					)}
					<Input
						type="file"
						id="images"
						name="images"
						accept="image/*"
						onChange={handleImageChange}
						multiple
					></Input>
				</FormControl>
				<Button type="submit" colorScheme="teal" mt={4}>
					作成
				</Button>
			</form>
		</Box>
	);
}

Create.layout = (page) => <MainLayout children={page} title={"店舗新規作成"} />;
