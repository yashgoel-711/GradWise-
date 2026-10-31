import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Mail, Phone, School, BookOpen, Calendar, Briefcase, Plus, X, Save, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import gradwiseService, { errorMessage } from '../../services/gradwise.service.js'

const StudentProfile = () => {
  const storedStudent = useSelector((state) => state.trackAuth.studentData)

  const [student, setStudent] = useState(storedStudent)
  const [skills, setSkills] = useState([])
  const [loadingSkills, setLoadingSkills] = useState(true)
  const [saving, setSaving] = useState(false)
  const [dirty, setDirty] = useState(false)
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 })

  useEffect(() => {
    // Refresh the profile and skills; the stored login data can be stale
    gradwiseService.getMe().then(setStudent).catch(() => {})
    gradwiseService
      .getSkills()
      .then(setSkills)
      .catch((err) => toast.error(errorMessage(err, 'Failed to load skills.')))
      .finally(() => setLoadingSkills(false))
  }, [])

  const updateSkills = (next) => {
    setSkills(next)
    setDirty(true)
  }

  const addSkill = (e) => {
    e.preventDefault()
    const name = newSkill.name.trim()
    if (!name) return
    if (skills.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
      toast.info(`${name} is already in your skills`)
      return
    }
    updateSkills([...skills, { name, level: Number(newSkill.level) }])
    setNewSkill({ name: '', level: 50 })
  }

  const saveSkills = async () => {
    setSaving(true)
    try {
      setSkills(await gradwiseService.saveSkills(skills))
      setDirty(false)
      toast.success('Skills saved')
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  if (!student) return null

  const hasPhoto = typeof student.avatar === 'string' && student.avatar.startsWith('http')
  const details = [
    { icon: Mail, label: 'Email', value: student.email },
    { icon: Phone, label: 'Contact', value: student.contact },
    { icon: School, label: 'College', value: student.college },
    { icon: BookOpen, label: 'Branch', value: student.branch },
    { icon: Calendar, label: 'Year', value: student.year },
    { icon: Briefcase, label: 'Domain', value: student.domain },
  ].filter((d) => d.value)

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Profile</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Identity */}
        <div className="bg-white rounded-xl shadow p-6 text-center lg:text-left">
          {hasPhoto ? (
            <img src={student.avatar} alt={student.name} className="h-28 w-28 rounded-full object-cover mx-auto lg:mx-0 mb-4" />
          ) : (
            <div className="h-28 w-28 rounded-full bg-indigo-500 flex items-center justify-center mx-auto lg:mx-0 mb-4">
              <span className="text-4xl font-medium text-white">{student.name?.charAt(0)?.toUpperCase()}</span>
            </div>
          )}
          <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
          <p className="text-sm text-gray-500 mb-5">{student.branch} · Year {student.year}</p>

          <ul className="space-y-3 text-left">
            {details.map(({ icon, label, value }) => (
              <li key={label} className="flex items-center gap-3 text-sm">
                {React.createElement(icon, { className: 'w-4 h-4 text-indigo-500 shrink-0' })}
                <span className="text-gray-500 w-16 shrink-0">{label}</span>
                <span className="text-gray-800 break-all">{value}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Skills */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Skills</h2>
            <button
              onClick={saveSkills} disabled={!dirty || saving}
              className="flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              <Save size={16} /> {saving ? 'Saving...' : 'Save skills'}
            </button>
          </div>

          <form onSubmit={addSkill} className="flex flex-wrap items-center gap-3 mb-6">
            <input
              type="text" value={newSkill.name} placeholder="e.g. React"
              onChange={(e) => setNewSkill((prev) => ({ ...prev, name: e.target.value }))}
              className="flex-grow min-w-40 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <input
                type="range" min="0" max="100" value={newSkill.level}
                onChange={(e) => setNewSkill((prev) => ({ ...prev, level: e.target.value }))}
                className="accent-indigo-500"
              />
              <span className="w-10">{newSkill.level}%</span>
            </div>
            <button type="submit" className="flex items-center gap-1 border border-indigo-300 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50">
              <Plus size={16} /> Add
            </button>
          </form>

          {loadingSkills ? (
            <Loader2 className="w-6 h-6 animate-spin text-indigo-500 mx-auto" />
          ) : skills.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">No skills yet. Add your first one above.</p>
          ) : (
            <div className="space-y-5">
              {skills.map((skill, index) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-gray-700">{skill.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-500">{skill.level}%</span>
                      <button
                        onClick={() => updateSkills(skills.filter((_, i) => i !== index))}
                        className="text-gray-400 hover:text-red-500" aria-label={`Remove ${skill.name}`}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${skill.level}%` }}></div>
                  </div>
                  <input
                    type="range" min="0" max="100" value={skill.level}
                    onChange={(e) =>
                      updateSkills(skills.map((s, i) => (i === index ? { ...s, level: Number(e.target.value) } : s)))
                    }
                    className="w-full accent-indigo-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StudentProfile
