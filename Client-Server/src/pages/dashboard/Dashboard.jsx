import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { formatDistanceToNow } from 'date-fns'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import {
  GraduationCap, Brain, FolderGit2, Award, Map, Sparkles, Plus, Target,
  BookOpen, CircleAlert, RefreshCw
} from 'lucide-react'
import { NotificationBell } from '../../components/auth/dashboard/NotificationBell'
import ChatBot from '../../components/chatbot/ChatBot'
import gradwiseService, { errorMessage } from '../../services/gradwise.service.js'

const ACTIVITY_STYLE = {
  project: { icon: FolderGit2, color: 'bg-blue-100 text-blue-500' },
  certification: { icon: Award, color: 'bg-yellow-100 text-yellow-500' },
  course: { icon: BookOpen, color: 'bg-purple-100 text-purple-500' },
  academic: { icon: GraduationCap, color: 'bg-green-100 text-green-500' },
}

const Dashboard = () => {
  const isNavExpanded = useSelector((state) => state.navbar.isExpanded)
  const reduxNotifications = useSelector((state) => state.notification.notifications)

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      setData(await gradwiseService.getDashboard())
    } catch (err) {
      setError(errorMessage(err, 'Could not load your dashboard.'))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const containerClass = isNavExpanded
    ? 'p-6 bg-gray-100 min-h-screen transition-all duration-300'
    : 'p-6 bg-gray-100 min-h-screen transition-all duration-300 ml-0'
  const contentClass = isNavExpanded
    ? 'w-full transition-all duration-300'
    : 'w-full transition-all duration-300 pl-16'

  const notifications = [...reduxNotifications]
    .reverse()
    .map((n) => ({ message: n.message, time: n.time ?? '', read: n.read ?? false }))

  return (
    <div className={containerClass}>
      <div className={contentClass}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
          <NotificationBell notifications={notifications} />
        </div>

        <ChatBot />

        {loading && <DashboardSkeleton />}

        {!loading && error && (
          <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 flex items-center justify-between">
            <div className="flex items-center gap-3 text-red-700">
              <CircleAlert className="w-6 h-6" />
              <span>{error}</span>
            </div>
            <button
              onClick={load}
              className="flex items-center gap-2 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              <RefreshCw size={16} /> Retry
            </button>
          </div>
        )}

        {!loading && !error && data && <DashboardContent data={data} />}
      </div>
    </div>
  )
}

const DashboardContent = ({ data }) => {
  const { student, stats, gpaSeries, topSkills, roadmap, activity } = data

  return (
    <>
      {/* Welcome banner */}
      <div className="rounded-2xl shadow-md bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold mb-2">Welcome back, {student.name}! 🎓</h2>
        <p className="text-sm md:text-base opacity-90">
          {student.branch} · Year {student.year} · {student.college}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-6">
        <StatCard title="CGPA" value={stats.cgpa ?? '-'} icon={GraduationCap} color="green" />
        <StatCard title="Skills" value={stats.skills} icon={Brain} color="blue" />
        <StatCard title="Projects" value={stats.projects} icon={FolderGit2} color="purple" />
        <StatCard title="Certifications" value={stats.certifications} icon={Award} color="yellow" />
        <StatCard title="Roadmap" value={`${stats.roadmapPercent}%`} icon={Map} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* GPA chart */}
        <div className="bg-white rounded-xl shadow p-6 lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">GPA Trend</h3>
          {gpaSeries.length > 0 ? (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={gpaSeries}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="semester" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sgpa" name="SGPA" stroke="#4f46e5" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState text="No semesters recorded yet.">
              <Link to="/GradWise/academics" className="text-indigo-600 hover:underline font-medium">
                Add your first semester
              </Link>
            </EmptyState>
          )}
        </div>

        {/* Top skills */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Skills</h3>
          {topSkills.length > 0 ? (
            <div className="space-y-4">
              {topSkills.map((skill) => (
                <ProgressBar key={skill.name} label={skill.name} value={skill.level} />
              ))}
            </div>
          ) : (
            <EmptyState text="No skills added yet.">
              <Link to="/GradWise/profile" className="text-indigo-600 hover:underline font-medium">
                Add skills in your profile
              </Link>
            </EmptyState>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Roadmap */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-800">Career Roadmap</h3>
            <Link to="/GradWise/progress" className="text-sm text-indigo-600 hover:underline">View all</Link>
          </div>
          {roadmap.total > 0 ? (
            <>
              <ProgressBar label={`${roadmap.done} of ${roadmap.total} steps done`} value={stats.roadmapPercent} />
              {roadmap.next.length > 0 ? (
                <ul className="mt-4 space-y-2">
                  {roadmap.next.map((step) => (
                    <li key={step.index} className="flex gap-3 text-sm text-gray-700">
                      <Target className="w-4 h-4 mt-0.5 text-indigo-500 shrink-0" />
                      <span>{step.text}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-4 text-sm text-green-600">All steps completed. Great work!</p>
              )}
            </>
          ) : (
            <EmptyState text="You don't have a roadmap yet.">
              <Link to="/GradWise/progress" className="text-indigo-600 hover:underline font-medium">
                Generate one with AI
              </Link>
            </EmptyState>
          )}
        </div>

        {/* Recent activity */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {activity.length > 0 ? (
            <ul className="space-y-4">
              {activity.map((item, idx) => {
                const { icon: Icon, color } = ACTIVITY_STYLE[item.type] ?? ACTIVITY_STYLE.project
                return (
                  <li key={idx} className="flex items-center gap-3">
                    <div className={`${color} p-2 rounded-full`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{item.text}</p>
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(item.at), { addSuffix: true })}
                      </p>
                    </div>
                  </li>
                )
              })}
            </ul>
          ) : (
            <EmptyState text="Nothing here yet. Add a project, certification or semester to get started." />
          )}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <QuickLink to="/GradWise/OpenAI-Help" icon={Sparkles} label="Ask AI Mentor" className="bg-purple-600 hover:bg-purple-700" />
        <QuickLink to="/GradWise/portfolio" icon={Plus} label="Add a project" className="bg-blue-600 hover:bg-blue-700" />
        <QuickLink to="/GradWise/certifications" icon={Plus} label="Add a certification" className="bg-indigo-600 hover:bg-indigo-700" />
      </div>
    </>
  )
}

const COLOR_CLASSES = {
  blue: 'bg-blue-100 text-blue-500',
  yellow: 'bg-yellow-100 text-yellow-500',
  red: 'bg-red-100 text-red-500',
  green: 'bg-green-100 text-green-500',
  purple: 'bg-purple-100 text-purple-500',
}

const StatCard = ({ title, value, icon, color }) => (
  <div className="bg-white rounded-xl shadow p-6 flex items-center">
    <div className={`${COLOR_CLASSES[color]} p-3 rounded-full mr-4`}>
      {React.createElement(icon, { className: 'h-7 w-7' })}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  </div>
)

const ProgressBar = ({ label, value }) => (
  <div>
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-500">{value}%</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${value}%` }}></div>
    </div>
  </div>
)

const EmptyState = ({ text, children }) => (
  <div className="py-8 text-center text-sm text-gray-500">
    <p className="mb-1">{text}</p>
    {children}
  </div>
)

const QuickLink = ({ to, icon, label, className }) => (
  <Link to={to} className={`${className} text-white rounded-xl shadow py-3 px-4 flex items-center justify-center gap-2 font-medium`}>
    {React.createElement(icon, { size: 18 })} {label}
  </Link>
)

const DashboardSkeleton = () => (
  <div className="animate-pulse space-y-6">
    <div className="h-28 bg-gray-200 rounded-2xl"></div>
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="h-24 bg-gray-200 rounded-xl"></div>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="h-72 bg-gray-200 rounded-xl lg:col-span-2"></div>
      <div className="h-72 bg-gray-200 rounded-xl"></div>
    </div>
  </div>
)

export default Dashboard
