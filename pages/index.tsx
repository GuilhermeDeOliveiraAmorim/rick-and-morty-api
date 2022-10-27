import {
	BottomNavigation,
	BottomNavigationAction,
	Card,
	CardContent,
	CardMedia,
	Dialog,
	DialogContent,
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
import axios from "axios";

interface ILocation {
	name: string;
}
interface ICharacter {
	name: string;
	species: string;
	status: string;
	type: string;
	location: ILocation;
	episode: string;
}

const Home: NextPage = () => {
	const [page, setPage] = useState<any>(1);
	const [info, setInfo] = useState<ICharacter>();
	const [characterId, setCharacterId] = useState(1);

	const [openModal, setOpenModal] = useState(false);
	const [openToast, setOpenToast] = useState(false);

	const [value, setValue] = useState();

	const router = useRouter();

	useEffect(() => {
		const fetchData = async () => {

			var uri = `https://rickandmortyapi.com/api/character/${characterId}`;

			const response = await axios(uri);
			setInfo(response.data);
		};
		fetchData();
	}, [characterId]);

	const getCharacterId = (characterId: any) => {
		setCharacterId(characterId);
	};

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

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = (value: string) => {
		setOpenModal(false);
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
			<div className="flex flex-row items-center justify-between p-2 sm:p-10 lg:p-10 bg-green-700 text-white text-2xl">
				<span>Rick and Morty</span>
				<div className="p-2 bg-white rounded">
					<TextField label="Search" variant="outlined" className="text-white" />
				</div>
			</div>
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
				<div className="flex flex-row flex-wrap p-1 sm:p-4 lg:p-5 bg-green-500">
					{data?.results?.map((character: any) => (
						<div key={character.id} className="w-1/2 sm:w-1/3 lg:w-1/4 p-1 sm:p-4 lg:p-5">
							<Card className="hover:drop-shadow-2xl" onClick={() => getCharacterId(character.id)}>
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
				<Dialog open={openModal} onClose={handleCloseModal} className="w-full">
					<DialogContent className="w-[400px] sm:w-[500px] lg:w-[500px] bg-gray-900">
						<div>
							<h1 className="text-gray-300 text-2xl mb-1">
								{info?.name}
							</h1>
							<ul className="flex flex-col flex-wrap justify-between gap-2">
								<li className="bg-green-500 rounded-lg p-2">
									<b>Species</b>: {info?.species}
								</li>
								<li className="bg-green-500 rounded-lg p-2">
									<b>Status</b>: {info?.status}
								</li>
								<li className="bg-green-500 rounded-lg p-2">
									<b>Type</b>: {(info?.type === "") ? "unknown" : info?.type}
								</li>
								<li className="bg-green-500 rounded-lg p-2">
									<b>Last known location</b>: {info?.location.name}
								</li>
								<li className="bg-green-500 rounded-lg p-2">
									<b>Number of episodes</b>: {info?.episode.length}
								</li>
							</ul>
						</div>
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
		</div >
	);
};

export default Home;
