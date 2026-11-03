import React, { useState } from 'react';
import './App.css';

function App() {
  const [miBlob, setMiBlob] = useState<Blob | null>(null);

  const crearBlobTexto = () => {
    const contenidoTexto = "Este es el contenido generado para el Trabajo Práctico N° 5 de Lenguaje IV.";
    const nuevoBlob = new Blob([contenidoTexto], { type: 'text/plain' });
    setMiBlob(nuevoBlob);
    alert("Blob creado. Tamaño: " + nuevoBlob.size + " bytes.");
  };

  const descargarArchivo = () => {
    if (!miBlob) {
      alert("Error: Primero debes crear el Blob de texto.");
      return;
    }
    const urlBlob = URL.createObjectURL(miBlob);
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = urlBlob;
    enlaceDescarga.download = 'TP5_Archivo.txt';
    document.body.appendChild(enlaceDescarga);
    enlaceDescarga.click();
    document.body.removeChild(enlaceDescarga);
    URL.revokeObjectURL(urlBlob);
  };

  const utilizarSlice = async () => {
    if (!miBlob) {
      alert("Error: Primero debes crear el Blob de texto.");
      return;
    }
    const blobCortado = miBlob.slice(0, 15, 'text/plain');
    const textoCortado = await blobCortado.text();
    alert(`Contenido original extraído con Slice (primeros 15 caracteres): "${textoCortado}"`);
  };

  return (
    <div className="contenedor-principal">
      <h1>Ejemplo de uso de Blobs</h1>
      <div className="grupo-botones">
        <button className="btn-verde" onClick={crearBlobTexto}>Crear Blob de texto</button>
        <button className="btn-verde" onClick={descargarArchivo}>Descargar Este</button>
        <button className="btn-verde" onClick={utilizarSlice}>Usar Slice</button>
      </div>
    </div>
  );
}

export default App;