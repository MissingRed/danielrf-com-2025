"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function About() {
  return (
    <section id="about" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Sobre Mí</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <p className="text-lg mb-4">
                  Soy un apasionado desarrollador full-stack con experiencia en la creación de aplicaciones web modernas. Con una sólida base en tecnologías frontend y backend, creo experiencias fluidas y centradas en el usuario que resuelven problemas del mundo real.
                </p>
                <p className="text-lg mb-4">
                  Mi enfoque combina principios de código limpio con soluciones innovadoras, asegurando que las aplicaciones no solo sean funcionales, sino también mantenibles y escalables.
                </p>
                <div className="flex flex-wrap gap-2 mt-6">
                  <Badge variant="outline" className="text-sm">
                    Solucionador de Problemas
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Código Limpio
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    Optimizador de Rendimiento
                  </Badge>
                  <Badge variant="outline" className="text-sm">
                    UX/UI
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="relative h-[400px] md:h-[400px] rounded-lg overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-primary/10 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src="./avatar.jpeg"
                    alt="Avatar"
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">Daniel Rodríguez</span>
                    <span className="text-sm font-light">Desarrollador Full-Stack</span>
                  </div>
                </div>

                <div className="text-center p-6">
                  <h3 className="text-2xl font-bold mb-4">Mi Misión</h3>
                  <p className="text-lg">
                    Crear aplicaciones web elegantes, eficientes y accesibles que ofrezcan experiencias de usuario
                    excepcionales mientras resuelven complejos desafíos técnicos.
                  </p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
