"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ExperienceItemProps {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
}

export default function ExperienceItem({ title, company, period, description, skills }: ExperienceItemProps) {
  return (
    <Card className="overflow-hidden border-none glass-card">
      <CardContent className="p-6">
        <div className="grid md:grid-cols-[1fr_2fr] gap-4">
          <div>
            <h3 className="text-xl font-bold">{title}</h3>
            <p className="text-gradient-static font-medium">{company}</p>
            <p className="text-sm text-muted-foreground">{period}</p>
          </div>
          <div>
            <p className="mb-4">{description}</p>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Badge variant="outline" className="bg-primary/10 hover:bg-primary/20 transition-colors">
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

