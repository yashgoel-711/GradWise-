import React, { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import { Award, ExternalLink, Trash2, Loader2 } from 'lucide-react'
import { toast } from 'react-toastify'
import gradwiseService, { errorMessage } from '../../services/gradwise.service.js'

const emptyForm = { title: '', issuer: '', issueDate: '', credentialUrl: '' }

const Certifications = () => {
  const [certs, setCerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    try {
      setCerts(await gradwiseService.getCertifications())
      setError('')
    } catch (err) {
      setError(errorMessage(err, 'Could not load your certifications.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await gradwiseService.addCertification(form)
      toast.success('Certification added')
      setForm(emptyForm)
      await load()
    } catch (err) {
      toast.error(errorMessage(err))
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (cert) => {
    if (!window.confirm(`Delete "${cert.title}"?`)) return
    try {
      await gradwiseService.deleteCertification(cert._id)
      toast.success('Certification deleted')
      await load()
    } catch (err) {
      toast.error(errorMessage(err))
    }
  }

  const inputClass = 'block w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400'

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Certifications</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Add certification</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input name="title" required value={form.title} onChange={handleChange} placeholder="AWS Cloud Practitioner" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issuer</label>
            <input name="issuer" required value={form.issuer} onChange={handleChange} placeholder="Amazon Web Services" className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Issue date</label>
            <input name="issueDate" type="date" value={form.issueDate} onChange={handleChange} className={inputClass} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Credential URL (optional)</label>
            <input name="credentialUrl" type="url" value={form.credentialUrl} onChange={handleChange} placeholder="https://..." className={inputClass} />
          </div>
        </div>
        <button type="submit" disabled={saving} className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-60">
          {saving ? 'Adding...' : 'Add certification'}
        </button>
      </form>

      {loading && <Loader2 className="w-8 h-8 animate-spin text-indigo-500 mx-auto mt-10" />}

      {!loading && error && (
        <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 text-red-700">{error}</div>
      )}

      {!loading && !error && certs.length === 0 && (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No certifications yet. Add your first one above.
        </div>
      )}

      {!loading && !error && certs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {certs.map((cert) => (
            <div key={cert._id} className="bg-white rounded-xl shadow p-6 flex flex-col">
              <div className="flex justify-between items-start mb-3">
                <div className="bg-yellow-100 text-yellow-500 p-3 rounded-full">
                  <Award className="w-6 h-6" />
                </div>
                <button onClick={() => handleDelete(cert)} className="text-gray-400 hover:text-red-500" aria-label="Delete certification">
                  <Trash2 size={18} />
                </button>
              </div>
              <h3 className="text-lg font-semibold text-gray-800">{cert.title}</h3>
              <p className="text-sm text-gray-600">{cert.issuer}</p>
              {cert.issueDate && (
                <p className="text-xs text-gray-500 mt-1">Issued {format(new Date(cert.issueDate), 'MMM yyyy')}</p>
              )}
              {cert.credentialUrl && (
                <a
                  href={cert.credentialUrl} target="_blank" rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-sm text-indigo-600 hover:underline"
                >
                  View credential <ExternalLink size={14} />
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Certifications
