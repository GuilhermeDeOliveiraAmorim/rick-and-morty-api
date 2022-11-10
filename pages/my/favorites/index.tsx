import { Button } from "@mui/material";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { api } from "../../api/api_url";
import { parseCookies } from "nookies";

interface ICharacter {
  episode: [];
  gender: string;
  id: number;
  image: string;
  location: string;
  name: string;
  origin: string;
  species: string;
  status: string;
  type: string;
  rating: number;
}

const Favorites: NextPage = () => {
  const cookies = parseCookies();

  const idUser = cookies.ACCESS_TOKEN_KEY;

  const [yourFavorites, setYourFavorites] = useState<ICharacter[] | any[]>([]);

  const getFavoritesById = async () => {
    const response = await api.get(`get/favorites/${idUser}`);
    const data: ICharacter[] = response.data;
    setYourFavorites(data);
  }

  useEffect(() => {
    getFavoritesById()
  }, []);

  return (
    <div>
      <div className="flex flex-row items-center justify-between p-2 sm:p-10 lg:p-10 bg-green-700 text-white text-2xl">
        <span>Rick and Morty</span>
        <div className="flex gap-2 p-2 bg-white rounded">
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
                <TableCell align="right" className="uppercase">
                  rating
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {yourFavorites.map((row: ICharacter) => (
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
                  <TableCell align="right">{(row.type === "" || row.type === null) ? "unknown" : row.type}</TableCell>
                  <TableCell align="right">{row.location}</TableCell>
                  <TableCell align="right">{row.episode}</TableCell>
                  <TableCell align="right">{row.gender}</TableCell>
                  <TableCell align="right">{row.origin}</TableCell>
                  <TableCell align="right">{row.rating}</TableCell>
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
