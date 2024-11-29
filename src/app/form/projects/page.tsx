'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
import { ThemeToggle } from '@/components/theme-toggle'
import Link from 'next/link'

export default function ProjectsForm() {
  const router = useRouter()
  const [projects, setProjects] = useState([{ name: '', link: '', description: '' }])

  useEffect(() => {
    const savedData = localStorage.getItem('portfolioProjects')
    if (savedData) {
      setProjects(JSON.parse(savedData))
    }
  }, [])

  const handleProjectChange = (index: number, field: string, value: string) => {
    const newProjects = [...projects]
    newProjects[index] = { ...newProjects[index], [field]: value }
    setProjects(newProjects)
  }

  const addProject = () => {
    setProjects([...projects, { name: '', link: '', description: '' }])
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    localStorage.setItem('portfolioProjects', JSON.stringify(projects))
    router.push('/portfolio')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-foreground">
      <header className="sticky top-0 z-40 w-full border-b border-gray-800 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Portfolio Builder
              </span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
            <nav className="flex items-center">
              <Link href="/portfolio">
                <Button className="gradient-button text-white">
                  <span>View Portfolio</span>
                </Button>
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <Card className="glass">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {projects.map((project, index) => (
                <div key={index} className="space-y-2 mb-4 p-4 border rounded border-gray-700">
                  <Input
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="Project Name"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                  <Input
                    value={project.link}
                    onChange={(e) => handleProjectChange(index, 'link', e.target.value)}
                    placeholder="Project Link"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                  <Textarea
                    value={project.description}
                    onChange={(e) => handleProjectChange(index, 'description', e.target.value)}
                    placeholder="Project Description"
                    className="bg-gray-800 text-white border-gray-700"
                  />
                </div>
              ))}
              <Button type="button" onClick={addProject} className="gradient-button text-white">
                <span>Add Project</span>
              </Button>
              <div className="flex justify-between">
                <Link href="/form/experience">
                  <Button className="gradient-button text-white">
                    <span>Back to Experience</span>
                  </Button>
                </Link>
                <Button type="submit" className="gradient-button text-white">
                  <span>Save and View Portfolio</span>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

