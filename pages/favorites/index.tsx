import { Button, TextField } from "@mui/material";
import { NextPage } from "next";
import Link from "next/link";
import myData from "../../data/data.json";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

interface ILocation {
  name: string;
}

interface ICharacter {
  id: string;
  name: string;
  species: string;
  status: string;
  type: string;
  location: ILocation;
  episode: string;
}

const Favorites: NextPage = () => {
  return (
    <div>
      {" "}
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
                <TableCell className="uppercase">name</TableCell>
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
                  episode
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {myData?.map((row: ICharacter) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.species}</TableCell>
                  <TableCell align="right">{row.status}</TableCell>
                  <TableCell align="right">{row.type}</TableCell>
                  <TableCell align="right">{row.location.name}</TableCell>
                  <TableCell align="right">{row.episode.length}</TableCell>
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
