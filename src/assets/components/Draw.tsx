import React, { useState, useEffect } from "react";

const Draw = () => {
  // Estado para el color actual seleccionado
  const [currentColor, setCurrentColor] = useState<string>("#FFFFFF");
  // Estado para almacenar los colores de cada cuadro
  const [currentNameColors, setCurrentNameColors] = useState<string[]>([]);
  // Estado para controlar si el botón del mouse está presionado
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Inicialización de los colores al inicio de la aplicación
  useEffect(() => {
    const initialColors = Array.from({ length: 1000 }, () => "");
    setCurrentNameColors(initialColors);
  }, []);

  // Función para manejar el cambio de color seleccionado por el usuario
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentColor(event.target.value);
  }

  // Función para manejar el clic en un cuadro para cambiar su color
  function handleClick(index: number) {
    const newColors = [...currentNameColors];
    newColors[index] = currentColor;
    setCurrentNameColors(newColors);
  }

  // Función para manejar el clic derecho en un cuadro para borrar su color
  function handleRightClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    e.preventDefault(); // Previene el menú contextual del navegador
    const newColors = [...currentNameColors];
    newColors[index] = "";
    setCurrentNameColors(newColors);
  }

  // Función para manejar el movimiento del mouse sobre un cuadro mientras se mantiene presionado
  function handleMouseOver(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) {
    if (isMouseDown) {
      const newColors = [...currentNameColors];
      // Si el botón derecho del mouse está presionado, borra el color del cuadro
      // De lo contrario, establece el color actualmente seleccionado
      newColors[index] = e.buttons === 2 ? "" : currentColor;
      setCurrentNameColors(newColors);
    }
  }

  // Función para manejar el evento de presionar el botón del mouse
  function handleMouseDown() {
    setIsMouseDown(true);
  }

  // Función para manejar el evento de soltar el botón del mouse
  function handleMouseUp() {
    setIsMouseDown(false);
  }

  return (
    <>
      <div className="container">
        {/* Renderiza los cuadros coloreados dinámicamente */}
        {currentNameColors.map((bgColor, index) => (
          <div
            key={index}
            className="square"
            style={{ backgroundColor: bgColor }}
            // Evento para cambiar el color al hacer clic en un cuadro
            onClick={() => handleClick(index)}
            // Evento para borrar el color al hacer clic derecho en un cuadro
            onContextMenu={(e) => handleRightClick(e, index)}
            // Eventos para manejar el movimiento del mouse sobre un cuadro mientras se mantiene presionado
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseOver={(e) => handleMouseOver(e, index)}
            // Deshabilita la propiedad "draggable" para evitar conflictos con el arrastre
            draggable={false}
          ></div>
        ))}
      </div>

      {/* Selector de color para elegir el color actual */}
      <div className="color-select">
        <h2>Color</h2>
        <input type="color" value={currentColor} onChange={handleChange} />
      </div>
    </>
  );
};

export default Draw;
