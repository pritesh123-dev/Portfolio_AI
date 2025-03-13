"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

interface SkillBarProps {
  name: string
  percentage: number
  color: string
}

function SkillBar({ name, percentage, color }: SkillBarProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start({
        width: `${percentage}%`,
        transition: { duration: 1, ease: "easeOut" },
      })
    }
  }, [controls, inView, percentage])

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{percentage}%</span>
      </div>
      <div className="h-3 bg-muted/50 rounded-full overflow-hidden" ref={ref}>
        <motion.div
          initial={{ width: 0 }}
          animate={controls}
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </div>
  )
}

interface SkillsChartProps {
  skills: {
    name: string
    percentage: number
    color: string
  }[]
}

export default function SkillsChart({ skills }: SkillsChartProps) {
  return (
    <div className="space-y-1">
      {skills.map((skill, index) => (
        <SkillBar key={index} name={skill.name} percentage={skill.percentage} color={skill.color} />
      ))}
    </div>
  )
}

