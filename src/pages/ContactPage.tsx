
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Helmet } from "react-helmet-async";
import { Phone, Mail, Clock, Instagram, Facebook, Send } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado:", formData);
    // Aquí iría la lógica para enviar el formulario
    alert("¡Gracias por tu mensaje! Te responderemos a la brevedad.");
  };

  return (
    <>
      <Helmet>
        <title>Contacto | Global3D</title>
        <meta
          name="description"
          content="Contactanos para consultas, presupuestos o para conocer más sobre nuestros servicios de impresión 3D"
        />
      </Helmet>
      <div className="container py-10 px-4 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Contacto</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulario de contacto */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Escribinos</h2>
            <p className="text-muted-foreground mb-6">
              Estamos para ayudarte con tus proyectos de impresión 3D. Completá el formulario y te responderemos lo antes posible, o comunicate por nuestros canales directos.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">
                  Nombre
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-1">
                  Mensaje
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  required
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <Button type="submit" className="w-full">
                Enviar Consulta <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            {/* Información de contacto */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
              <h2 className="text-xl font-semibold mb-4">Información de contacto</h2>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:contacto@global3d.com.ar" className="text-primary hover:underline">
                      contacto@global3d.com.ar
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Phone className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">WhatsApp</p>
                    <a href="https://wa.me/5491155555555" className="text-primary hover:underline">
                      +54 9 11 5555-5555
                    </a>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-3 text-primary" />
                  <div>
                    <p className="font-medium">Horario de atención</p>
                    <p>Lunes a Viernes: 9:00 a 18:00 (GMT-3)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Redes sociales */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4">Seguinos en redes</h2>

              <div className="flex gap-4">
                <a
                  href="https://instagram.com/global3d.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-br from-purple-600 to-pink-500 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Instagram className="h-5 w-5" />
                </a>

                <a
                  href="https://facebook.com/global3d.ar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white p-3 rounded-full hover:opacity-90 transition-opacity"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactPage;
