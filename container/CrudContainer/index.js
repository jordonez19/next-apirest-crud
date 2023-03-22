import axios from "axios";
import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import {
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";

const style = {
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexDirection: "column",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  height: "50vh",
  width: "auto",
  bgcolor: "#fff",
  border: "2px solid #000",
  borderRadius: "15px",
  boxShadow: 24,
  p: 4,
};

const CrudContainer = () => {
  const baseUrl = "https://jsonplaceholder.typicode.com/users";
  const [data, setData] = useState([]);
  const [openModalInsertar, setOpenModalInsertar] = useState(false);
  const [openModalEditar, setOpenModalEditar] = useState(false);
  const [openModalEliminar, setOpenModalEliminar] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    username: "",
    website: "",
  });

  useEffect(() => {
    axios({ url: baseUrl })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setData]);

  /* handleChange para update and create */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  /* handleChange para update and create */

  /* modales cerrar abrir */
  const abrirCerrarModalInsertar = () => {
    setOpenModalInsertar(!openModalInsertar);
  };
  const abrirCerrarModalEditar = () => {
    setOpenModalEditar(!openModalEditar);
  };
  const abrirCerrarModalEliminar = () => {
    setOpenModalEliminar(!openModalEliminar);
  };
  /* end modales cerrar abrir */

  /* seleccionando by id */
  const seleccionarConsolaSlug = async (user, caso) => {
    setForm(user);
      caso === "Editar" ? abrirCerrarModalEditar() : abrirCerrarModalEliminar();
      console.log('user.form' , form)
  };
  /* end seleccionando by id */

  /* peticiones http */
  const peticionPost = async () => {
    await axios.post(baseUrl, form).then((response) => {
      setData(data.concat(response.data)), abrirCerrarModalInsertar();
    });
  };

  const peticionPut = async () => {
    await axios.put(baseUrl + "/" + form.id, form).then((response) => {
      var dataNueva = data;
      dataNueva.map((user) => {
        if (form.id === user.id) {
          user.name = form.name;
          user.phone = form.phone;
          user.username = form.username;
          user.website = form.website;
        }
      });

      setData(dataNueva);
      abrirCerrarModalEditar();
      console.log("dataNueva", dataNueva);
    });
  };

  const peticionDelete = async () => {
    await axios.put(baseUrl + "/" + form.id, form).then((response) => {
      setData(data.filter((user) => user.id !== form.id));
    });
    abrirCerrarModalEliminar();
  };
  /* end peticiones http */

  return (
    <>
      <Grid width={"100%"} textAlign={"end"}>
        <Button variant="contained" onClick={() => abrirCerrarModalInsertar()}>
          crear
        </Button>
      </Grid>
      <Grid>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow className="fontHeader">
                <TableCell>name</TableCell>
                <TableCell>phone</TableCell>
                <TableCell>username</TableCell>
                <TableCell>website</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((user) => (
                <>
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.website}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => seleccionarConsolaSlug(user, "Editar")}
                      >
                        editar
                      </Button>{" "}
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => seleccionarConsolaSlug(user, "Eliminar")}
                      >
                        eliminar
                      </Button>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      {/* crear */}
      <Modal
        open={openModalInsertar}
        onClose={() => abrirCerrarModalInsertar()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <Typography variant="h6">Nuevo User</Typography>
            <TextField
              onChange={handleChange}
              className="inputMaterial"
              name="name"
              label={"name"}
            >
              name
            </TextField>
            <TextField
              onChange={handleChange}
              className="inputMaterial"
              name="phone"
              label={"phone"}
            >
              phone
            </TextField>
            <TextField
              onChange={handleChange}
              className="inputMaterial"
              name="username"
              label={"username"}
            >
              username
            </TextField>
            <TextField
              onChange={handleChange}
              className="inputMaterial"
              name="website"
              label={"website"}
            >
              website
            </TextField>
            <Button
              className="inputMaterial"
              variant="contained"
              onClick={() => peticionPost()}
            >
              Insertar
            </Button>
            <Button
              className="inputMaterial"
              variant="contained"
              color="secondary"
              onClick={() => abrirCerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </>
        </Box>
      </Modal>
      {/* editar */}
      <Modal
        open={openModalEditar}
        onClose={() => abrirCerrarModalEditar()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography variant="h6">Editar User</Typography>
          <TextField
            onChange={handleChange}
            className="inputMaterial"
            name="name"
            label={"name"}
            value={form && form.name}
          >
            name
          </TextField>
          <TextField
            onChange={handleChange}
            className="inputMaterial"
            name="phone"
            label={"phone"}
            value={form && form.phone}
          >
            phone
          </TextField>
          <TextField
            onChange={handleChange}
            className="inputMaterial"
            name="username"
            label={"username"}
            value={form && form.username}
          >
            username
          </TextField>
          <TextField
            onChange={handleChange}
            className="inputMaterial"
            name="website"
            label={"website"}
            value={form && form.website}
          >
            website
          </TextField>
          <Button
            className="inputMaterial"
            variant="contained"
            onClick={() => peticionPut()}
          >
            Insertar
          </Button>
          <Button
            className="inputMaterial"
            variant="contained"
            color="secondary"
            onClick={() => abrirCerrarModalEditar()}
          >
            Cancelar
          </Button>
        </Box>
      </Modal>
      {/* eliminar */}
      <Modal
        open={openModalEliminar}
        onClose={() => abrirCerrarModalEliminar()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <>
            <Typography variant="h6">
              Estas seguro q deseas eliminar el usuario {form && form.name} ?{" "}
            </Typography>
            <Box>
              <Button
                className="inputMaterial"
                variant="contained"
                onClick={() => peticionDelete()}
              >
                eliminar
              </Button>{" "}
              <Button
                className="inputMaterial"
                variant="contained"
                color="secondary"
                onClick={() => abrirCerrarModalEliminar()}
              >
                Cancelar
              </Button>
            </Box>
          </>
        </Box>
      </Modal>
    </>
  );
};

export default CrudContainer;
