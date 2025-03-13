"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface SkillBadgeProps {
  name: string
}

export default function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.1, rotate: [-1, 1, -1, 0] }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Badge
        variant="secondary"
        className="px-3 py-1 text-sm bg-gradient-to-r from-primary/20 to-secondary/20 hover:from-primary/30 hover:to-secondary/30 transition-all duration-300"
      >
        {name}
      </Badge>
    </motion.div>
  )
}

