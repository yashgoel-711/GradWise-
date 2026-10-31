import React, { useState, useEffect, useCallback } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { GraduationCap, Plus, Trash2, X, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import gradwiseService, { errorMessage } from '../../services/gradwise.service.js'

const GRADES = ['O', 'A+', 'A', 'B+', 'B', 'C', 'D', 'F']
const emptySubject = () => ({ name: '', grade: 'A', credits: 3 })

const Academics = () => {
  const [semesters, setSemesters] = useState([])
  const [cgpa, setCgpa] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [semester, setSemester] = useState('')
  const [subjects, setSubjects] = useState([emptySubject()])
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    try {
      const result = await gradwiseService.getAcademics()
      setSemesters(result.semesters)
      setCgpa(result.cgpa)
      setError('')
    } catch (err) {
      setError(errorMessage(err, 'Could not load your academic records.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const updateSubject = (index, field, value) =>
    setSubjects((prev) => prev.map((s, i) => (i === index ? { ...s, [field]: value } : s)))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await gradwiseService.addAcademic(
        Number(semester),
        subjects.map((s) => ({ ...s, credits: Number(s.credits) }))
      )
      toast.success(`Semester ${semester} saved`)
      setSemester('')
      setSubjects([emptySubject()])
      await load()
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (record) => {
    if (!window.confirm(`Delete Semester ${record.semester}?`)) return
    try {
      await gradwiseService.deleteAcademic(record._id)
      toast.success(`Semester ${record.semester} deleted`)
      await load()
    } catch (err) {
      toast.error(errorMessage(err))
    }
  }

  const chartData = semesters.filter((s) => s.sgpa != null).map((s) => ({ semester: `Sem ${s.semester}`, sgpa: s.sgpa }))

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Academics</h1>

      {loading && <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mt-16" />}

      {!loading && error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 text-red-700">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow p-6 flex items-center">
              <div className="bg-green-100 text-green-500 p-3 rounded-full mr-4">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Overall CGPA</p>
                <p className="text-3xl font-bold text-gray-900">{cgpa ?? '-'}</p>
                <p className="text-xs text-gray-500">{semesters.length} semester{semesters.length === 1 ? '' : 's'} recorded</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">SGPA per Semester</h2>
              {chartData.length > 0 ? (
                <div className="h-56">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="semester" />
                      <YAxis domain={[0, 10]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="sgpa" name="SGPA" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <p className="py-12 text-center text-sm text-gray-500">Add a semester below to see your trend.</p>
              )}
            </div>
          </div>

          {/* Add semester */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-1">Add semester</h2>
            <p className="text-sm text-gray-500 mb-4">Adding a semester that already exists replaces it.</p>

            <div className="mb-4 max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-1">Semester number</label>
              <input
                type="number" min="1" max="12" required value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="space-y-3 mb-4">
              {subjects.map((subject, index) => (
                <div key={index} className="grid grid-cols-12 gap-3 items-center">
                  <input
                    type="text" required placeholder="Subject name" value={subject.name}
                    onChange={(e) => updateSubject(index, 'name', e.target.value)}
                    className="col-span-12 sm:col-span-6 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <select
                    value={subject.grade} onChange={(e) => updateSubject(index, 'grade', e.target.value)}
                    className="col-span-5 sm:col-span-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
                  </select>
                  <input
                    type="number" min="1" max="10" required placeholder="Credits" value={subject.credits}
                    onChange={(e) => updateSubject(index, 'credits', e.target.value)}
                    className="col-span-5 sm:col-span-3 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                  <button
                    type="button" disabled={subjects.length === 1}
                    onClick={() => setSubjects((prev) => prev.filter((_, i) => i !== index))}
                    className="col-span-2 sm:col-span-1 text-gray-400 hover:text-red-500 disabled:opacity-30 flex justify-center"
                    aria-label="Remove subject"
                  >
                    <X size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                type="button" onClick={() => setSubjects((prev) => [...prev, emptySubject()])}
                className="flex items-center gap-1 border border-indigo-300 text-indigo-600 py-2 px-4 rounded-lg hover:bg-indigo-50"
              >
                <Plus size={16} /> Add subject
              </button>
              <button
                type="submit" disabled={saving}
                className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60"
              >
                {saving ? 'Saving...' : 'Save semester'}
              </button>
            </div>
          </form>

          {/* Semester cards */}
          {semesters.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
              No semesters yet. Use the form above to add your first one.
            </div>
          ) : (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {semesters.map((record) => (
                <div key={record._id} className="bg-white rounded-xl shadow p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Semester {record.semester}</h3>
                      <p className="text-sm text-gray-500">{record.totalCredits} credits</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                        SGPA {record.sgpa ?? '-'}
                      </span>
                      <button onClick={() => handleDelete(record)} className="text-gray-400 hover:text-red-500" aria-label="Delete semester">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className="text-left text-xs uppercase text-gray-500 border-b">
                        <th className="py-2">Subject</th>
                        <th className="py-2">Grade</th>
                        <th className="py-2 text-right">Credits</th>
                      </tr>
                    </thead>
                    <tbody>
                      {record.subjects.map((s, i) => (
                        <tr key={i} className="border-b last:border-0">
                          <td className="py-2 text-gray-800">{s.name}</td>
                          <td className="py-2 text-gray-600">{s.grade}</td>
                          <td className="py-2 text-gray-600 text-right">{s.credits}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Academics
