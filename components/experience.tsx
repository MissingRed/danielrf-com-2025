"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Experience = {
  company: string
  position: string
  period: string
  description: string
  technologies: string[]
  responsibilities: string[]
}

export default function Experience() {
  const experiences: Experience[] = [
    {
      company: "Centro Comercial Unico Outlet",
      position: "Ingeniero de Software",
      period: "Junio 2022 - Actualidad",
      description: "Desarrollé y mantuve una plataforma de comercio electrónico de alta disponibilidad para un centro comercial, mejorando la experiencia del usuario y aumentando las ventas en línea.",
      technologies: ["Vue.js", "Nuxt.js", "Laravel", "PostgreSQL", "GCP"],
      responsibilities: [
        "Arquitectura e implementación de una arquitectura de microservicios escalable",
        "Lideré un equipo de 2 desarrolladores utilizando metodologías ágiles",
        "Optimicé el rendimiento de la aplicación, reduciendo los tiempos de carga en un 40%",
        "Implementé pipelines de CI/CD con GitHub Actions y AWS",
        "Colaboré con diseñadores UX para crear interfaces de usuario intuitivas",
      ],
    },
    {
      company: "Mes de Occidente",
      position: "Gestor de activos",
      period: "Feb 2021 - Abril 2022",
      description: "Gestioné la infraestructura tecnológica y los activos informáticos de la empresa, asegurando su óptimo funcionamiento y continuidad operativa.",
      technologies: ["IT Asset Management", "Infrastructure Management", "User Support"],
      responsibilities: [
        "Gestioné de forma integral la infraestructura y los equipos informáticos, asegurando su funcionamiento óptimo y continuidad operativa",
        "Administré inventarios de hardware y software, controlando el stock, seguimiento y actualización de activos tecnológicos.",
        "Implemented authentication and authorization systems",
        "Creé y gestioné cuentas de usuario, otorgando permisos, configuraciones y soporte según las políticas de la organización.",
      ],
    },
    // {
    //   company: "WebSphere Innovations",
    //   position: "Frontend Developer",
    //   period: "Jun 2018 - Feb 2020",
    //   description: "Created interactive web applications for e-commerce and media clients.",
    //   technologies: ["React", "Redux", "JavaScript", "SASS", "Webpack", "Jest"],
    //   responsibilities: [
    //     "Developed responsive and accessible user interfaces",
    //     "Implemented state management with Redux and Context API",
    //     "Created reusable component libraries",
    //     "Wrote unit and integration tests with Jest and React Testing Library",
    //     "Collaborated with backend developers to integrate APIs",
    //   ],
    // },
  ]

  return (
    <section id="experience" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experiencia Laboral</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi trayectoria profesional construyendo aplicaciones del mundo real
          </p>
        </motion.div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${index}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                    <CardTitle className="text-xl">{exp.position}</CardTitle>
                    <Badge variant="outline" className="md:ml-auto w-fit">
                      {exp.period}
                    </Badge>
                  </div>
                  <div className="text-lg font-medium text-primary">{exp.company}</div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4">{exp.description}</p>

                  <div className="mb-4">
                    <h4 className="text-sm font-semibold mb-2">Tecnologías:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold mb-2">Responsabilidades:</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
