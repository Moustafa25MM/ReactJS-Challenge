import { BackToHome } from "../App";
import React, { useState, useEffect } from "react";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";
import styles from "./ChallengeTwo.module.scss";
import ClipLoader from "react-spinners/ClipLoader";

import { Box, styled } from "@mui/system";
import { Modal } from "@mui/base/Modal";
import Fade from "@mui/material/Fade";
import { TextField, Button } from "@mui/material";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const TransitionsModal = ({
  open,
  handleClose,
  editData,
  setEditData,
  handleSave
}) => {
  return (
    <StyledModal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
    >
      <Fade in={open}>
        <Box
          sx={{
            bgcolor: "background.paper",
            outline: "none",
            padding: "2em",
            width: "300px"
          }}
        >
          <h2 id="transition-modal-title">Edit User</h2>
          <TextField
            label="Name"
            value={editData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={editData.phone}
            onChange={(e) =>
              setEditData({ ...editData, phone: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Nationality"
            value={editData.nat}
            onChange={(e) => setEditData({ ...editData, nat: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Gender"
            value={editData.gender}
            onChange={(e) =>
              setEditData({ ...editData, gender: e.target.value })
            }
            fullWidth
            margin="normal"
          />

          <Button
            color="secondary"
            onClick={handleClose}
            style={{ margin: "1em 0" }}
          >
            Close
          </Button>
          <Button
            color="primary"
            onClick={() => {
              handleSave();
              handleClose();
            }}
            style={{ margin: "1em 0" }}
          >
            Save Changes
          </Button>
        </Box>
      </Fade>
    </StyledModal>
  );
};
const ChallengeTwo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    phone: "",
    nat: "",
    gender: ""
  });

  const fetchData = () => {
    fetch(
      `https://randomuser.me/api/?seed=dexi-interview&page=${page}&results=5`
    )
      .then((response) => response.json())
      .then((data) => {
        setData((prevData) => [...prevData, ...data.results]);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleEdit = (user) => {
    setEditUser(user);
    setEditData({
      name: `${user.name.title} ${user.name.first} ${user.name.last}`,
      phone: user.phone,
      nat: user.nat,
      gender: user.gender
    });
    handleModalOpen();
  };
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => {
    setModalOpen(false);
    setEditUser(null);
  };

  const handleSave = () => {
    const newData = [...data];
    const index = data.indexOf(editUser);
    newData[index].name.title = editData.name.split(" ")[0];
    newData[index].name.first = editData.name.split(" ")[1];
    newData[index].name.last = editData.name.split(" ")[2];
    newData[index].phone = editData.phone;
    newData[index].nat = editData.nat;
    newData[index].gender = editData.gender;
    setData(newData);
    setEditUser(null);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 2</h1>
      <h2 className="subtitle has-text-grey-lighter">
        Fetch 5 users from the public api
        <code>https://randomuser.me/api/?seed=dexi-interview</code> and display
        them in a table.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        <code>table-example.png</code> has been provided just for the{" "}
        <code>required</code>
        styling, feel free to choose which data to show if any of the coulmns in
        the example is missing.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        Pay close attention to empty and loading states
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The <code>Edit</code> button in the table should open a pop up of your
        style choice that has the fields in the table and can be edited and
        after editing and comfirming the record should change in the Table too
      </h2>
      <h2>
        <code>Note:</code>the edit will only affect your local state , that
        means we will not call an api to edit , we just want it to change on the
        client side and show the new values in the table , then on page reload
        fields will go back to the api original values)
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The table should also have a <code>Load More</code> button that fetches
        the next page of the API and appends the results to the existing users
        whenever it's clicked.
      </h2>
      <div className={styles.container}>
        <MDBTable className={`mt-3 ${styles.table}`} responsive>
          <MDBTableHead>
            <tr>
              <th scope="col">Picture</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Nationality</th>
              <th scope="col">Gender</th>
              <th scope="col">Actions</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {data.map((user, index) => (
              <tr key={index}>
                <td>
                  <img
                    src={user.picture.thumbnail}
                    style={{ width: "45px", height: "45px" }}
                    className="rounded-circle"
                    alt=""
                  />
                </td>
                <td>{`${user.name.title} ${user.name.first} ${user.name.last}`}</td>
                <td>{user.phone}</td>
                <td>{user.nat}</td>
                <td>{user.gender}</td>
                <td>
                  <MDBBtn
                    color="link"
                    rounded
                    size="sm"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </MDBBtn>
                </td>
              </tr>
            ))}
          </MDBTableBody>
        </MDBTable>

        <MDBBtn
          color="primary"
          className={styles.loadMore}
          onClick={handleLoadMore}
        >
          Load More
        </MDBBtn>

        <TransitionsModal
          open={modalOpen}
          handleClose={handleModalClose}
          editData={editData}
          setEditData={setEditData}
          handleSave={handleSave}
        />

        {loading && <ClipLoader color="#ffffff" loading={loading} size={50} />}
      </div>
    </>
  );
};

export default ChallengeTwo;
