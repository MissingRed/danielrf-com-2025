"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Github, Linkedin, Mail, MessageSquare, PhoneCall } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
// ...existing code...
// Importar el chat flotante si es necesario

export default function Contact() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "Thank you for reaching out. I'll get back to you soon.",
    })

    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)
  }

  return (
    <section id="contact" className="py-20 px-4 md:px-6 lg:px-8 scroll-mt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Contáctame</h2>
          <div className="h-1 w-20 bg-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            ¿Tienes un proyecto en mente o quieres discutir oportunidades? Me encantaría saber de ti.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={0.8}
                  stroke="currentColor"
                  className="w-14 h-14 mb-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 2v2m6 2a2 2 0 012 2v6a8 8 0 11-16 0V6a2 2 0 012-2h12zm-9 10h.01M15 14h.01"
                  />
                </svg>
                <Button
                  className="w-full"
                  onClick={() => {
                    // Abrir el chat flotante y escribir el mensaje automáticamente
                    if (typeof window !== "undefined") {
                      const event = new CustomEvent("openFloatingChat", {
                        detail: {
                          presetMessage: "Quiero contactar a Daniel",
                        }
                      });
                      window.dispatchEvent(event);
                    }
                  }}
                >
                  Contactar a Daniel por Chat IA
                </Button>
                <p className="mt-4 text-center text-muted-foreground text-sm">Al hacer clic, se abrirá el chat flotante y podrás enviar tu mensaje directamente a Daniel.</p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-6">Contacta Conmigo</h3>

                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <a
                        href="mailto:contact@example.com"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        rodriguezdaniel048@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Github className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">GitHub</h4>
                      <a
                        href="https://github.com/username"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        github.com/missingred
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <a
                        href="https://linkedin.com/in/daniel-rodríguez-33481815b"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        linkedin.com/in/daniel-rodríguez
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Celular</h4>
                      <div className="relative group flex items-center gap-2">
                        <img
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Colombia.svg/1920px-Flag_of_Colombia.svg.png"
                          alt="Bandera de Colombia"
                          className="w-5 h-3"
                        />
                        <span className="select-none">+57</span>
                        <span className="blur-sm select-none"> 305 39075217</span>
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black text-white text-xs rounded px-3 py-2 shadow-lg whitespace-nowrap">
                          Solicítalo por el chat de IA
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-primary/10 text-primary">
                      <MessageSquare className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Disponibilidad</h4>
                      <p className="text-sm text-muted-foreground">Abierto a oportunidades freelance y a tiempo completo</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
