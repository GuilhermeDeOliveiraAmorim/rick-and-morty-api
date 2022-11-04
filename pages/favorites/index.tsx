import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios, { AxiosResponse } from "axios";
import { api_url } from "../api/api_url";
import { useEffect, useState } from "react";

interface ILocation {
  name: string;
}

interface ILocation {
  name: string;
}

interface IEpisodeNumber {
  length: number;
}

interface IOrigin {
  name: string;
}

interface ICharacter {
  episode: IEpisodeNumber;
  gender: string;
  id: number;
  image: string;
  location: ILocation;
  name: string;
  origin: IOrigin;
  species: string;
  status: string;
  type: string;
}

const Favorites: NextPage = () => {

  const [yourFavorites, setYourFavorites] = useState<ICharacter[] | any>();

  useEffect(() => {
    fetch(`${api_url}rick-and-morty/${"3407fd6b-b4d3-476d-9365-56867b61ae7e"}`)
      .then(response => response.json())
      .then(data => {
        setYourFavorites(data);
      });
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 sm:p-10 lg:p-10 bg-green-700 text-white text-2xl">
        <span>Rick and Morty</span>
        <div className="p-2 bg-white rounded">
          <Link href="/">
            <Button className="text-black">Back</Button>
          </Link>
        </div>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right" className="uppercase">name</TableCell>
                <TableCell align="right" className="uppercase">
                  species
                </TableCell>
                <TableCell align="right" className="uppercase">
                  status
                </TableCell>
                <TableCell align="right" className="uppercase">
                  type
                </TableCell>
                <TableCell align="right" className="uppercase">
                  location
                </TableCell>
                <TableCell align="right" className="uppercase">
                  episodes
                </TableCell>
                <TableCell align="right" className="uppercase">
                  gender
                </TableCell>
                <TableCell align="right" className="uppercase">
                  origin
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yourFavorites?.map((row: any) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <img src={row.image} alt={row.name} className="h-20" />
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.species}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.episode}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.origin}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default Favorites;
