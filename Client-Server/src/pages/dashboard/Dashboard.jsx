import React from 'react'
import { useState, useEffect } from 'react'
import { useOutletContext } from 'react-router'
import WelcomeBanner from '../../components/auth/dashboard/WelcomeBanner'
import {NotificationBell} from '../../components/auth/dashboard/NotificationBell'
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from "react-redux";
const Dashboard = () => {
  const dispatch = useDispatch();
  const notificationslol = useSelector((state) => state.notification.notifications);
  const today = new Date();
  function getTodayWithSuffix() {
    const date = new Date();
    const day = date.getDate();
  
    // Add suffix (st, nd, rd, th)
    let suffix = "th";
    if (day === 1 || day === 21 || day === 31) suffix = "st";
    else if (day === 2 || day === 22) suffix = "nd";
    else if (day === 3 || day === 23) suffix = "rd";
  
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    return `${month} ${day}${suffix}, ${year}`;
  }
  const todayString = getTodayWithSuffix()
  console.log(notificationslol)
  const Navigate = useNavigate()
  const [stats, setStats] = useState({
    courses: 5,
    assignments: 12,
    upcomingDeadlines: 3,
    completionRate: 68
  })
 
  const notifications = [
    { id: 1, message: "Your assignment was graded", time: "2 mins ago", read: false },
    { id: 2, message: "New course added: AI Ethics", time: "1 hour ago", read: true },
    { id: 3, message: "You’ve earned a badge for 7-day streak!", time: "Yesterday", read: false }
  ];
  const todayNotifications = notificationslol.filter((notif) => {
    return notif.message.includes(todayString);
  });
  console.log("today notification ",todayNotifications)
  const allNotifications = [...notifications, ...todayNotifications];
  console.log(allNotifications)


  
  
  const [recentActivities, setRecentActivities] = useState([
    { id: 1, type: 'assignment', title: 'Research Paper Submission', course: 'Advanced Research Methods', date: '2025-04-18' },
    { id: 2, type: 'grade', title: 'Mid-term Exam', course: 'Data Structures', grade: 'A-', date: '2025-04-15' },
    { id: 3, type: 'enrollment', title: 'Course Enrollment', course: 'Machine Learning Fundamentals', date: '2025-04-10' },
    { id: 4, type: 'feedback', title: 'Project Feedback', course: 'Software Engineering', date: '2025-04-08' }
  ])

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className='flex justify-between'>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
      {/* <div className="bg-white rounded-lg shadow p-6 flex items-center space-x-4">
    <img src="../../../public/Chatbot.png" alt="Chatbot" className="w-16 h-16" />
  <div>
    <h3 className="text-lg font-semibold">Need Help?</h3>
    <p className="text-sm text-gray-600">I’m your friendly assistant!</p>
  </div>
</div> */}
      <NotificationBell notifications = {allNotifications}/>
      </div>
      {/* chatbot */}
      <img
      onClick={()=>{Navigate("/GradWise/OpenAI-Help")}}
    src="../../../public/Chatbot.png"
    alt="Chatbot"
    className="fixed bottom-6 right-6 w-30 h-30 cursor-pointer hover:scale-105 transition-transform z-50"
  />

  
        <WelcomeBanner  className="w-full"/>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard title="Active Courses" value={stats.courses} icon="books" color="blue" />
        <StatCard title="Pending Assignments" value={stats.assignments} icon="document" color="yellow" />
        <StatCard title="Upcoming Deadlines" value={stats.upcomingDeadlines} icon="calendar" color="red" />
        <StatCard title="Completion Rate" value={`${stats.completionRate}%`} icon="chart" color="green" />
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="w-[77vw] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Course Progress */}
  <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Course Progress</h2>
    <div className="space-y-4">
      <CourseProgress course="Data Structures" progress={75} />
      <CourseProgress course="Advanced Research Methods" progress={60} />
      <CourseProgress course="Software Engineering" progress={90} />
      <CourseProgress course="Machine Learning Fundamentals" progress={30} />
      <CourseProgress course="Academic Writing" progress={85} />
    </div>
  </div>

  {/* Recent Activity */}
  <div className="bg-white rounded-lg shadow p-6">
    <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
    <div className="space-y-4">
      {recentActivities.map(activity => (
        <ActivityItem key={activity.id} activity={activity} />
      ))}
    </div>
  </div>
</div>
        
      </div>
      
      {/* Upcoming Deadlines */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Upcoming Deadlines</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Final Project</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Software Engineering</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 25, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">In Progress</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Research Paper</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Advanced Research Methods</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Apr 30, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Not Started</span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Final Exam</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Data Structures</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">May 05, 2025</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Upcoming</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

// Helper Components
const StatCard = ({ title, value, icon, color }) => {
  const getIcon = () => {
    switch (icon) {
      case 'books':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'document':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case 'chart':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const getColorClass = () => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-500';
      case 'yellow': return 'bg-yellow-100 text-yellow-500';
      case 'red': return 'bg-red-100 text-red-500';
      case 'green': return 'bg-green-100 text-green-500';
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className={`${getColorClass()} p-3 rounded-full mr-4`}>
        {getIcon()}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );
};

const CourseProgress = ({ course, progress }) => {
  return (
    <div>
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{course}</span>
        <span className="text-sm font-medium text-gray-500">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
};

const ActivityItem = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'assignment':
        return (
          <div className="bg-blue-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
        );
      case 'grade':
        return (
          <div className="bg-green-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'enrollment':
        return (
          <div className="bg-purple-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
        );
      case 'feedback':
        return (
          <div className="bg-yellow-100 p-2 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
  };

  return (
    <div className="flex items-center">
      {getIcon(activity.type)}
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-900">{activity.title}</p>
        <div className="flex items-center">
          <p className="text-sm text-gray-500">{activity.course}</p>
          {activity.grade && (
            <>
              <span className="mx-1 text-gray-500">•</span>
              <span className="text-sm font-medium text-green-600">{activity.grade}</span>
            </>
          )}
          <span className="mx-1 text-gray-500">•</span>
          <p className="text-sm text-gray-500">{formatDate(activity.date)}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard
