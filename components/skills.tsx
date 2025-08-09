"use client"

import type React from "react"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Database, Globe, Server, Cpu } from "lucide-react"

type Skill = {
  name: string
  proficiency: number
}

type SkillCategory = {
  name: string
  icon: React.ReactNode
  skills: Skill[]
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      name: "Frontend",
      icon: <Globe className="h-6 w-6" />,
      skills: [
        { name: "Vue.js", proficiency: 90 },
        { name: "Nuxt.js", proficiency: 85 },
        { name: "React", proficiency: 75 },
        { name: "Next.js", proficiency: 75 },
        { name: "Tailwind CSS", proficiency: 85 },
        { name: "HTML/CSS", proficiency: 98 },
      ],
    },
     {
      name: "Bases de Datos",
      icon: <Database className="h-6 w-6" />,
      skills: [
        { name: "PostgreSQL", proficiency: 84 },
        { name: "MongoDB", proficiency: 70 },
        { name: "MySQL", proficiency: 75 },
        { name: "SQL Server", proficiency: 80 },
        { name: "Redis", proficiency: 50 },
        { name: "Firebase", proficiency: 83 },
      ],
    },
    {
      name: "Backend",
      icon: <Server className="h-6 w-6" />,
      skills: [
        { name: "Node.js", proficiency: 70 },
        { name: "Express", proficiency: 64 },
        { name: "Laravel", proficiency: 87 },
        { name: "GraphQL", proficiency: 40 },
        { name: "REST API", proficiency: 90 },
      ],
    },
    {
      name: "DevOps",
      icon: <Cpu className="h-6 w-6" />,
      skills: [
        { name: "Docker", proficiency: 38 },
        { name: "CI/CD", proficiency: 70 },
        { name: "Git", proficiency: 85 },
        { name: "Servidores", proficiency: 68 },
        { name: "GCP", proficiency: 65 },

      ],
    },
  ]

  return (
    <section id="skills" className="py-20 px-4 md:px-6 lg:px-8 bg-muted/50 scroll-mt-16">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Habilidades Técnicas</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Mi conjunto de herramientas técnicas abarca toda la pila de desarrollo, lo que me permite construir soluciones completas.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-full bg-primary/10 text-primary">{category.icon}</div>
                    <h3 className="text-xl font-semibold">{category.name}</h3>
                  </div>

                  <div className="space-y-4">
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{skill.name}</span>
                          <span className="text-xs text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${skill.proficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
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
