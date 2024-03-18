import express from "express";
import {
  agregarPelicula,
  listarPeliculas,
  eliminarPelicula,
  actualizarPelicula,
  obtenerDetallesPelicula,
} from "./peliculaController.js";

const peliculasRouter = express.Router();

// Ruta para listar todas las películas
peliculasRouter.get("/lista-peliculas", async (req, res) => {
  try {
    const peliculas = await listarPeliculas();
    res.render("pages/For_usuarios2", { peliculas });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Agregar una nueva película
peliculasRouter.post("/peliculas", async (req, res) => {
  const { nombre_sala, sinopsis, duracion, genero, estado, imagen, precio } = req.body;

  try {
    await agregarPelicula({ nombre_sala, sinopsis, duracion, genero, estado, imagen, precio });
    res.redirect("/lista-peliculas");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Detalles de la película
peliculasRouter.get("/detalles-pelicula/:id", async (req, res) => {
  const peliculaId = req.params.id;

  try {
    const pelicula = await obtenerDetallesPelicula(peliculaId);
    res.render("pages/detalles_pelicula", { pelicula });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Mostrar formulario para actualizar una película
peliculasRouter.get("/formulario-actualizar-pelicula/:id", async (req, res) => {
  const peliculaId = req.params.id;

  try {
    const pelicula = await obtenerDetallesPelicula(peliculaId);
    res.render("pages/update_pelicula", { pelicula });
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para actualizar una película por ID
peliculasRouter.post("/actualizar-pelicula/:id", async (req, res) => {
  const { nombre_sala, sinopsis, duracion, genero, estado, imagen, precio } = req.body;
  const id = req.params.id;

  try {
    await actualizarPelicula(id, { nombre_sala, sinopsis, duracion, genero, estado, imagen, precio });
    res.redirect("/lista-peliculas");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

// Ruta para borrar una película por ID
peliculasRouter.post("/borrar-pelicula/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await eliminarPelicula(id);
    res.redirect("/lista-peliculas");
  } catch (error) {
    const { status, message } = error;
    res.status(status || 500).json({ error: message });
  }
});

export default peliculasRouter;

