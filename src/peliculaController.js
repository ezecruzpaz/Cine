import pool from "./db.js";

// Agregar una nueva película
export const agregarPelicula = async ({ nombre_sala, sinopsis, duracion, genero, estado, imagen, precio }) => {
  try {
    await pool.query(
      "INSERT INTO Peliculas (nombre_sala, sinopsis, duracion, genero, estado, imagen, precio) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre_sala, sinopsis, duracion, genero, estado, imagen, precio]
    );
  } catch (error) {
    throw { status: 500, message: "Error al agregar la película" };
  }
};

// Obtener todas las películas
export const listarPeliculas = async () => {
  try {
    const [rows] = await pool.query("SELECT * FROM Peliculas");
    return rows;
  } catch (error) {
    throw { status: 500, message: "Error al obtener películas" };
  }
};

// Obtener detalles de una película por ID
export const obtenerDetallesPelicula = async (id) => {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM Peliculas WHERE id_sala = ?",
      [id]
    );

    if (rows.length === 1) {
      const pelicula = rows[0];
      return pelicula;
    } else {
      throw { status: 404, message: "Película no encontrada" };
    }
  } catch (error) {
    console.error(error);
    throw { status: 500, message: "Error al obtener detalles de la película" };
  }
};

// Actualizar una película por ID
export const actualizarPelicula = async (
  id,
  { nombre_sala, sinopsis, duracion, genero, estado, imagen, precio }
) => {
  try {
    await pool.query(
      "UPDATE Peliculas SET nombre_sala = ?, sinopsis = ?, duracion = ?, genero = ?, estado = ?, imagen = ?, precio = ? WHERE id_sala = ?",
      [nombre_sala, sinopsis, duracion, genero, estado, imagen, precio, id]
    );
  } catch (error) {
    throw {
      status: 500,
      message: `Error al actualizar la película con ID ${id}`,
    };
  }
};

// Eliminar una película por ID
export const eliminarPelicula = async (id) => {
  try {
    await pool.query("DELETE FROM Peliculas WHERE id_sala = ?", [id]);
  } catch (error) {
    throw {
      status: 500,
      message: `Error al eliminar la película con ID ${id}`,
    };
  }
};
