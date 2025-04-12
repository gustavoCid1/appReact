import React, { useEffect, useState } from 'react';

const App = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editando, setEditando] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', apellido: '', correo: '' });

  const obtenerUsuarios = async () => {
    const res = await fetch('http://3.135.189.237/usuarios');
    const data = await res.json();
    setUsuarios(data);
  };

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const eliminarUsuario = async (id) => {
    const confirm = window.confirm('¿Estás seguro de eliminar este usuario?');
    if (confirm) {
      await fetch(`http://3.135.189.237/usuarios/${id}`, {
        method: 'DELETE'
      });
      obtenerUsuarios();
    }
  };

  const abrirEdicion = (usuario) => {
    setEditando(usuario.id);
    setFormData({
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo
    });
  };

  const guardarEdicion = async () => {
    await fetch(`http://3.135.189.237/usuarios/${editando}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setEditando(null);
    obtenerUsuarios();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Usuarios Registrados</h2>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Nombre</th>
            <th className="p-2 border">Correo</th>
            <th className="p-2 border">Apellido</th>
            <th className="p-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id} className="hover:bg-gray-100">
              <td className="p-2 border">{u.id}</td>
              <td className="p-2 border">{u.nombre}</td>
              <td className="p-2 border">{u.correo}</td>
              <td className="p-2 border">{u.apellido}</td>
              <td className="p-2 border">
                <button
                  onClick={() => abrirEdicion(u)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Editar
                </button>
                <button
                  onClick={() => eliminarUsuario(u.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de edición */}
      {editando && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Editar Usuario</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={formData.apellido}
              onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="email"
              placeholder="Correo"
              value={formData.correo}
              onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="flex justify-end">
              <button
                onClick={() => setEditando(null)}
                className="mr-2 px-4 py-1 border rounded"
              >
                Cancelar
              </button>
              <button
                onClick={guardarEdicion}
                className="bg-blue-600 text-white px-4 py-1 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
