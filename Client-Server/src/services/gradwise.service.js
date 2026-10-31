import axios from 'axios'
import { BackendURL } from '../config/config.js'

// Thin wrappers around the GradWise API. Every method returns the payload (`res.data.data`)
// and lets errors propagate, so pages can show them with `errorMessage(err)`.
const api = axios.create({ baseURL: BackendURL, withCredentials: true })

const data = (promise) => promise.then((res) => res.data.data)

export const errorMessage = (err, fallback = 'Something went wrong. Please try again.') =>
    err?.response?.data?.error || err?.response?.data?.message || fallback

const gradwiseService = {
    // profile + dashboard
    getMe: () => data(api.get('/student/me')),
    getDashboard: () => data(api.get('/student/dashboard')),

    // skills: [{ name, level }]
    getSkills: () => data(api.get('/student/skills-student')),
    saveSkills: (skills) => data(api.post('/student/skills-student', skills)),

    // academics: { semesters, cgpa }; addAcademic(semester, [{ name, grade, credits }])
    getAcademics: () => data(api.get('/student/academics')),
    addAcademic: (semester, subjects) => data(api.post('/student/academics', { semester, subjects })),
    deleteAcademic: (id) => data(api.delete(`/student/academics/${id}`)),

    // certifications: { title, issuer, issueDate, credentialUrl }
    getCertifications: () => data(api.get('/student/certifications')),
    addCertification: (cert) => data(api.post('/student/certifications', cert)),
    deleteCertification: (id) => data(api.delete(`/student/certifications/${id}`)),

    // projects: { githubRepo, status, summary, techStack[], domain }
    getProjects: () => data(api.get('/student/projects')),
    addProject: (project) => data(api.post('/student/projects', project)),
    updateProject: (id, project) => data(api.put(`/student/projects/${id}`, project)),
    deleteProject: (id) => data(api.delete(`/student/projects/${id}`)),

    // courses: { courseLink, title, platform, difficulty, duration, summary, tags[] }
    getCourses: () => data(api.get('/student/course')),
    addCourse: (course) => data(api.post('/student/course', course)),
    deleteCourse: (id) => data(api.delete(`/student/course/${id}`)),

    // roadmap: { name, year, branch, roadmap: string[], roadmapDone: number[] }
    getRoadmap: (regenerate = false) => data(api.post('/ai/api/test', { regenerate })),
    saveRoadmapProgress: (done) => data(api.put('/student/roadmap/progress', { done })),
    // skill gap: { role, missingSkills: string[], resources: [{ skill, title, platform }] }
    getSkillGap: (role) => data(api.post('/ai/api/skill-gap', { role })),

    // internships: { source, internships: [{ title, company, location, stipend, link, matchedSkills[] }] }
    getInternships: () => data(api.post('/internship/list')),

    // resume: downloads the PDF for the logged-in student
    downloadResume: async () => {
        const res = await api.get('/api/resume', { responseType: 'blob' })
        const url = URL.createObjectURL(res.data)
        const a = document.createElement('a')
        a.href = url
        a.download = 'GradWise_Resume.pdf'
        a.click()
        URL.revokeObjectURL(url)
    },
}

export default gradwiseService
