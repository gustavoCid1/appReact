import React, { useState } from 'react';

const Login = () => {
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://3.135.189.237/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, contraseña })
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje(`Bienvenido, ${data.usuario}`);
        // aquí podrías guardar token o redirigir
      } else {
        setMensaje(data.mensaje);
      }
    } catch (err) {
      setMensaje('Error de conexión');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-xl font-bold mb-4">Iniciar Sesión</h2>
        <input
          type="email"
          placeholder="Correo"
          className="w-full p-2 border mb-3 rounded"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border mb-3 rounded"
          value={contraseña}
          onChange={(e) => setContraseña(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Entrar
        </button>
        {mensaje && <p className="mt-3 text-sm text-center">{mensaje}</p>}
      </form>
    </div>
  );
};

export default Login;
