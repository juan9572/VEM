import React from 'react'
import Carousel from '../Carousel/reactCarousel';
import Imagen from '../../17010.jpg';
import Imagen2 from '../../ola-de-colores-6815.jpg';
import MainSection from '../CardSection';
import axios from 'axios';

function Inicio() {
  const [banners,setBanners] = React.useState([]);
  React.useEffect(() => { //Toma todos los eventos que hay
    const getData = async () => {
        try {
            const banner = await axios.get("/api/publicitarios/getBanners");
            let eventos = [];
            banner.data.forEach(evento => eventos.push({
              titulo:evento.title,
              descripcion:evento.description,
              fecha:evento.fechaInicio.substring(0, 10),
              lugar:evento.sitio,
              image:process.env.PUBLIC_URL +`/img/${evento.imgBanner}`,
              linkEvento: `EventosFinalizados/${evento.title}`
            }));
            setBanners(eventos);
        } catch (err) {
            console.log(err);
        }
    }
    getData();
});
  return (
    <div>
      <Carousel banners={banners} />
      <MainSection />
    </div>
  )
}
export default Inicio