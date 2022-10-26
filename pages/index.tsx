import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Pagination,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useQuery } from "@tanstack/react-query";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";

const Home: NextPage = () => {
  const [page, setPage] = useState<number | undefined>(1);

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
    value: SetStateAction<number | undefined>
  ) {
    setPage(value);
  }

  useEffect(() => {
    if (router.query.page) {
      setPage(router.query.page);
    }
  }, [router.query.page]);

  console.log(data?.results);

  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("opa");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Stack className="flex flex-row justify-between align-middle items-center p-5 bg-green-700 text-white text-2xl">
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
            <div className="w-1/4 p-5">
              <Card onClick={handleClickOpen} className="cursor-pointer">
                <CardMedia
                  component="img"
                  image={character.image}
                  alt={character.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {character.name}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        <Dialog open={open} onClose={handleClose}>
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
    </div>
  );
};

export default Home;
