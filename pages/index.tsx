import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import Link from "next/link";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";
import { api } from "./api/api_url";
import { parseCookies } from "nookies";

interface ILocation {
  name: string;
}

interface IOrigin {
  name: string;
}

interface ICharacter {
  episode: [];
  gender: string;
  id: number;
  image: string;
  location: ILocation;
  name: string;
  origin: IOrigin;
  species: string;
  status: string;
  type: string;
  rating: number;
}

/**
 * Adicionar o valor do like no back-end e, mudar o botão para deslike, estrelinha
 */

const Home: NextPage = () => {
  const cookies = parseCookies();
  const idUser = cookies.ACCESS_TOKEN_KEY;

  const [page, setPage] = useState<any>(1);
  const [info, setInfo] = useState<ICharacter>();
  const [characterId, setCharacterId] = useState(1);

  const [openModal, setOpenModal] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const [value, setValue] = useState<string>();
  const [favorite, setFavorite] = useState(1);

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

  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenToast(false);
  };

  async function addToFavorites(id: any) {
    const myCharacter = await axios.get<ICharacter>(
      `https://rickandmortyapi.com/api/character/${id}`
    );

    const episode = myCharacter.data?.episode.length;
    const gender = myCharacter.data?.gender;
    const id_api = myCharacter.data?.id;
    const image = myCharacter.data?.image;
    const location = myCharacter.data?.location.name;
    const name = myCharacter.data?.name;
    const origin = myCharacter.data?.origin.name;
    const species = myCharacter.data?.species;
    const status = myCharacter.data?.status;
    const type = myCharacter.data?.type;
    const rating = 1;
    const userId = idUser;

    await api
      .post("add/favorite", {
        episode,
        gender,
        id_api,
        image,
        location,
        name,
        origin,
        species,
        status,
        type,
        rating,
        userId
      })
      .then(function (response) {
        if (response.data.status === "Error") {
          setValue(`${name} has already been added!`);
          setOpenToast(true);
        } else {
          setValue(`${name} added!`);
          setOpenToast(true);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleFavorite = (id: number) => {
    setFavorite(id);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row lg:flex-row justify-between items-center p-2 sm:p-10 lg:p-10 bg-green-700 text-white text-2xl">
        <img src="logo.png" alt="Rick & Morty" className="w-52" />
        <div className="flex justify-between sm:flex lg:flex gap-2 w-full sm:w-auto lg:w-auto">
          <div className="p-2 bg-white rounded w-1/2">
            <TextField
              label="Search"
              variant="outlined"
              className="text-white"
            />
          </div>
          <Link
            href={`/my/favorites`}
            className="p-2 bg-white rounded flex w-1/2 justify-center items-center"
          >
            <Button className="text-black">Favorites</Button>
          </Link>
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
            <div
              key={character.id}
              className="w-1/2 sm:w-1/3 lg:w-1/4 p-1 sm:p-4 lg:p-5"
            >
              <Card
                className="hover:drop-shadow-2xl"
                onClick={() => getCharacterId(character.id)}
              >
                <div>
                  <CardMedia
                    component="img"
                    image={character.image}
                    alt={character.name}
                    onClick={handleOpenModal}
                    className="cursor-pointer"
                  />
                  <CardContent>
                    <Typography
                      className="flex justify-center items-center text-lg"
                      paddingBottom={0}
                    >
                      {character.name}
                    </Typography>
                  </CardContent>
                </div>
                <BottomNavigation
                  value={favorite}
                  onChange={(event, newValue) => {
                    handleFavorite(character.id);
                  }}
                >
                  <BottomNavigationAction
                    icon={<FavoriteIcon />}
                    onClick={() => addToFavorites(character.id)}
                  />
                </BottomNavigation>
              </Card>
            </div>
          ))}
        </div>
        <Dialog open={openModal} onClose={handleCloseModal} className="w-full">
          <DialogContent className="w-[400px] sm:w-[500px] lg:w-[500px] bg-gray-900">
            <div>
              <h1 className="text-gray-300 text-2xl mb-1">{info?.name}</h1>
              <ul className="flex flex-col flex-wrap justify-between gap-2">
                <li className="bg-green-500 rounded-lg p-2">
                  <b>Species</b>: {info?.species}
                </li>
                <li className="bg-green-500 rounded-lg p-2">
                  <b>Status</b>: {info?.status}
                </li>
                <li className="bg-green-500 rounded-lg p-2">
                  <b>Type</b>: {info?.type === "" ? "unknown" : info?.type}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={openToast}
        autoHideDuration={2000}
        onClose={handleCloseToast}
        message={value}
      />
    </div>
  );
};

export default Home;
