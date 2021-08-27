import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// css
import "./Search.css";

// sweetalert2
import Swal from "sweetalert2";

// mui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";

function Search() {
  const dispatch = useDispatch();
  const history = useHistory();
  const allMovies = useSelector((store) => store.allMovies);

  const getAllMovies = () => {
    dispatch({
      type: "GET_ALL_MOVIES",
    });
  }; // end getAllMovies

  useEffect(() => {
    getAllMovies();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  console.log("allMovies: ", allMovies);
  // console.log('movies from store after search query: ', movies);

  const handleFeature = (movieId) => {
    console.log(`movie id: ${movieId}`);
    dispatch({
      type: "FEATURE_MOVIE",
      payload: movieId,
    });
    history.push(`/movie/${movieId}`);
  }; // end handleFeature

  const handleSave = (event, movie) => {
    event.preventDefault();

    Swal.fire({
      title: `Save ${movie.title} to your catalog?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "I simply must have it for my collection!",
      cancelButtonText: "No, no... perhaps not today...",
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(movie);

        // dispatch
        dispatch({
          type: "ADD_TO_CATALOG",
          payload: movie,
        });

        Swal.fire(
          "Saved!",
          `${movie.title} has been added to your catalog.`,
          "success"
        );
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          "Cancelled",
          "Maybe you meant to save a different movie...?",
          "error"
        );
      }
    });
  }; // end handleSave

  return (
    <div className="searchPage">
      <h2 className="componentTitle">SEARCH</h2>

      <Paper className="search-paper">

        <div className="search-container">
          <h3 className="">
            Search by Title, Director, Release Date, Genre, or Tags
          </h3>
          <div className="search-wrapper">
            <TextField
              id="filled-basic"
              label={<SearchIcon />}
              variant="filled"
              onChange={(event) => setSearchQuery(event.target.value)}
            />
          </div>
        </div>

        <TableContainer className="search-paper-container">
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Director</TableCell>
                <TableCell>Release Date</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell>Save</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {allMovies
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .filter((movie) => {
                  if (searchQuery == "") {
                    return movie;
                  } else if (
                    movie?.title
                      .toLowerCase()
                      .includes(searchQuery?.toLowerCase())
                  ) {
                    return movie;
                  } else if (
                    movie?.director
                      .toLowerCase()
                      .includes(searchQuery?.toLowerCase())
                  ) {
                    return movie;
                  } else if (
                    movie?.release_date
                      .toLowerCase()
                      .includes(searchQuery?.toLowerCase())
                  ) {
                    return movie;
                  } else if (
                    movie?.genre
                      .toLowerCase()
                      .includes(searchQuery?.toLowerCase())
                  ) {
                    return movie;
                  } else if (
                    movie?.tags
                      .toLowerCase()
                      .includes(searchQuery?.toLowerCase())
                  ) {
                    return movie;
                  }
                })
                .map((movie) => {
                  return (
                    <TableRow key={movie?.id}>
                      <TableCell
                        className="title"
                        onClick={() => handleFeature(movie?.id)}
                      >
                        {movie?.title}
                      </TableCell>
                      <TableCell>{movie?.director}</TableCell>
                      <TableCell>{movie?.release_date.slice(0, 10)}</TableCell>
                      <TableCell>{movie?.genre}</TableCell>
                      <TableCell className="center">{movie?.tags}</TableCell>
                      <TableCell>
                        <Button onClick={(event) => handleSave(event, movie)}>
                          Save
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={allMovies?.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  ); // end return
} // end Search fn

export default Search;
