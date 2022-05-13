import React from 'react'
import Carousel from '../Carousel/reactCarousel';
import Imagen from '../../17010.jpg';
import Imagen2 from '../../ola-de-colores-6815.jpg';
import MainSection from '../CardSection';
const banners = [
  {
    titulo: "Lear Music Reader",
    descripcion: "A PDF Reader specially designed for musicians.",
    fecha: "2022-02-02",
    lugar: "Medellin",
    image: Imagen,
    linkEvento: 'EventosFinalizados'
  },
  {
    titulo: "Viernes de descuentos",
    descripcion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod hendrerit neque quis dapibus. Proin ultricies est eget fringilla efficitur. Aliquam mattis felis vel mi aliquet placerat. Quisque velit turpis, gravida vitae mi nec, fringilla tempus sem. Sed congue pretium imperdiet. Etiam sapien leo, vestibulum nec erat a, iaculis dapibus orci.",
    fecha: "2022-04-04",
    lugar: "Bogota xd",
    image: Imagen2,
    linkEvento: 'EventosFinalizados'
  },
];
function Inicio() {
  return (
    <div>
      <Carousel banners={banners} />
      <MainSection />
    </div>
  )
}
export default Inicio