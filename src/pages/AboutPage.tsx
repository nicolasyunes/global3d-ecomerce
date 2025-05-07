
import { Helmet } from "react-helmet-async";

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Global3D</title>
        <meta name="description" content="Conocé nuestra historia, misión y visión en Global3D" />
      </Helmet>
      <div className="container py-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Sobre Nosotros</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg mb-4">
            ¡Hola! Somos el equipo de Global3D, tu aliado en la creación de objetos únicos con tecnología 3D. Desde hace más de 3 años, venimos transformando ideas en realidades tangibles para emprendedores, hogares y empresas de toda Argentina.
          </p>
          
          
          <p className="mb-4">
            Con más de 1.500 modelos impresos en nuestro haber, nos especializamos en dar vida a objetos personalizados con la mejor calidad y atención cercana que nos caracteriza. Ya sea que necesites un prototipo para tu emprendimiento, una pieza única decorativa, o un pedido mayorista para tu negocio, estamos para acompañarte en cada paso.
          </p>
          
          <h2 className="text-2xl font-semibold my-5">Nuestra Misión</h2>
          <p className="mb-6">
            Transformar ideas en objetos tangibles con impresión 3D totalmente personalizada y atención cercana, garantizando calidad y entregas confiables a hogares y negocios.
          </p>
          
          <h2 className="text-2xl font-semibold my-5">Nuestra Visión</h2>
          <p className="mb-6">
            Ser la referencia latinoamericana en manufactura digital, empoderando miles de emprendimientos con soluciones 3D ágiles, sostenibles y mayoristas.
          </p>
          
          <h2 className="text-2xl font-semibold my-5">¿Por qué elegirnos?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li>Más de 3 años de experiencia en el mercado argentino</li>
            <li>Más de 1.500 modelos impresos con éxito</li>
            <li>Servicio mayorista para toda la región</li>
            <li>Atención personalizada y asesoramiento técnico</li>
            <li>Materiales de primera calidad</li>
          </ul>
          
          <p>
            Nos apasiona lo que hacemos y nuestro objetivo es convertir tus ideas en objetos reales que inspiren, resuelvan problemas o simplemente te hagan sonreír. ¡Animate a crear con nosotros!
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
