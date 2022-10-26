import {
	BottomNavigation,
	BottomNavigationAction,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Pagination,
	Snackbar,
	TextField,
	Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';

const Home: NextPage = () => {
	const [page, setPage] = useState<any>(1);

	const router = useRouter();

	const { data } = useQuery(
		["characters", page],
		async () =>
			await fetch(
				`https://rickandmortyapi.com/api/character/?page=${page}`
			).then((result) => result.json()),
		{
			keepPreviousData: true,
		}
	);

	function handlePaginationChange(
		e: any,
		value: SetStateAction<string | string[] | undefined | number>
	) {
		setPage(value);
	}

	useEffect(() => {
		if (router.query.page) {
			setPage(router.query.page);
		}
	}, [router.query.page]);

	const [openModal, setOpenModal] = useState(false);
	const [openToast, setOpenToast] = useState(false);
	const [selectedValue, setSelectedValue] = useState("opa");
	const [value, setValue] = useState(1);

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = (value: string) => {
		setOpenModal(false);
		setSelectedValue(value);
	};

	const handleOpenToast = () => {
		setOpenToast(true);
	};

	const handleCloseToast = (event: React.SyntheticEvent | Event, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenToast(false);
	};

	return (
		<div>
			<Stack className="flex flex-row justify-between align-middle items-center p-10 bg-green-700 text-white text-2xl">
				<span>Rick and Morty</span>
				<TextField label="Search" variant="outlined" className="text-white" />
			</Stack>
			<div>
				<Stack className="flex align-middle items-center p-5 bg-white">
					<Pagination
						count={data?.info.pages}
						variant="outlined"
						color="primary"
						className="pagination"
						page={page}
						onChange={handlePaginationChange}
					/>
				</Stack>
				<div className="flex flex-row flex-wrap p-5 bg-green-500">
					{data?.results?.map((character: any) => (
						<div key={character.id} className="w-1/4 p-5">
							<Card className="hover:drop-shadow-2xl">
								<div>
									<CardMedia
										component="img"
										image={character.image}
										alt={character.name}
										onClick={handleOpenModal}
										className="cursor-pointer"
									/>
									<CardContent>
										<Typography className="flex justify-center items-center text-lg" paddingBottom={0}>
											{character.name}
										</Typography>
									</CardContent>
								</div>
								<BottomNavigation
									value={value}
									onChange={(event, newValue) => {
										setValue(newValue);
									}}
									onClick={handleOpenToast}
								>
									<BottomNavigationAction icon={<FavoriteIcon />} />
									<BottomNavigationAction icon={<ShareIcon />} />
								</BottomNavigation>
							</Card>
						</div>
					))}
				</div>
				<Dialog open={openModal} onClose={handleCloseModal}>
					<DialogTitle id="responsive-dialog-title">
						{"Use Google's location service?"}
					</DialogTitle>
					<DialogContent>
						<DialogContentText>
							Let Google help apps determine location. This means sending
							anonymous location data to Google, even when no apps are running.
						</DialogContentText>
					</DialogContent>
				</Dialog>
				<Stack className="flex align-middle items-center p-5 bg-white">
					<Pagination
						count={data?.info.pages}
						variant="outlined"
						color="primary"
						className="pagination"
						page={page}
						onChange={handlePaginationChange}
					/>
				</Stack>
			</div>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
				open={openToast}
				autoHideDuration={6000}
				onClose={handleCloseToast}
				message="Note archived"
				action={"action"}
			/>
		</div>
	);
};

export default Home;
