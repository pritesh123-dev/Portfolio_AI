"use client"

import { motion } from "framer-motion"
import { Briefcase } from "lucide-react"
import SkillBadge from "./skill-badge"

interface TimelineItemProps {
  title: string
  company: string
  period: string
  description: string
  skills: string[]
  isLast?: boolean
}

function TimelineItem({ title, company, period, description, skills, isLast = false }: TimelineItemProps) {
  return (
    <div className="relative pl-10 pb-10">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-4 top-4 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
        <Briefcase className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="glass-card p-4 rounded-lg">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="text-gradient-static font-medium">{company}</p>
        <p className="text-sm text-muted-foreground mb-2">{period}</p>
        <p className="mb-4">{description}</p>

        {/* Skills used in this role */}
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <SkillBadge name={skill} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

interface ExperienceTimelineProps {
  experiences: {
    title: string
    company: string
    period: string
    description: string
    skills: string[]
  }[]
  allSkills?: string[] // Add this prop for all skills
}

export default function ExperienceTimeline({ experiences, allSkills = [] }: ExperienceTimelineProps) {
  // Get unique skills from all experiences if allSkills is not provided
  const uniqueSkills = allSkills.length > 0 ? allSkills : [...new Set(experiences.flatMap((exp) => exp.skills))]

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="mt-8">
      {/* Skills Section */}
      {/* {uniqueSkills.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-6 rounded-lg mb-12"
        >
          <h3 className="text-xl font-bold mb-4">Skills & Technologies</h3>
          <div className="flex flex-wrap gap-2">
            {uniqueSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03 }}
              >
                <SkillBadge name={skill} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )} */}

      {/* Experience Timeline */}
      {experiences.map((experience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <TimelineItem {...experience} isLast={index === experiences.length - 1} />
        </motion.div>
      ))}
    </motion.div>
  )
}

