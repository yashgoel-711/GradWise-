import React, { useState, useEffect } from 'react';
import { Camera, Edit2, Save } from 'lucide-react';
import { useSelector } from 'react-redux';

const StudentProfile = () => {
  // Get student data from Redux with proper fallback
  const studentData = useSelector((state) => state.trackAuth?.studentData);
  const student = studentData?.student || {};

  const [profile, setProfile] = useState({
    name: '',
    college: '',
    year: '',
    contact: '',
    domain: '',
    branch: '',
    avatar: 'https://via.placeholder.com/150'
  });

  const [skills, setSkills] = useState([]);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);

  // Initialize with default values and update when student data is available
  useEffect(() => {
    // Always set default values first to ensure fields aren't empty
    const defaultProfile = {
      name: 'Yash Goel',
      college: 'ABES Enginnering College',
      year: '2nd Year',
      contact: 'yashgoel711@gmail.com',
      branch: 'Computer Science',
      domain: 'Software Engineering',
      avatar: 'https://via.placeholder.com/150'
    };
    
    // Merge with any available student data
    setProfile({
      ...defaultProfile,
      ...(student.name && { name: student.name }),
      ...(student.college && { college: student.college }),
      ...(student.year && { year: student.year }),
      ...(student.contact && { contact: student.contact }),
      ...(student.domain && { domain: student.domain }),
      ...(student.branch && { branch: student.branch }),
      ...(student.avatar && { avatar: student.avatar })
    });

    // Set default skills if none are available
    const defaultSkills = [
      { id: 1, name: 'JavaScript', level: 85 },
      { id: 2, name: 'React', level: 75 },
      { id: 3, name: 'Node.js', level: 70 },
      { id: 4, name: 'CSS', level: 80 }
    ];
    
    setSkills(Array.isArray(student.skills) && student.skills.length > 0 ? student.skills : defaultSkills);
  }, [student]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const saveProfileChanges = () => {
    setEditingProfile(false);
    // Here you would typically make an API call to save changes
    console.log("Profile saved:", profile);
  };

  const saveSkillsChanges = () => {
    setEditingSkills(false);
    // Here you would typically make an API call to save changes
    console.log("Skills saved:", skills);
  };

  const handleSkillNameChange = (id, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, name: value } : skill
    ));
  };

  const handleSkillLevelChange = (id, value) => {
    setSkills(skills.map(skill => 
      skill.id === id ? { ...skill, level: value } : skill
    ));
  };

  const renderProfileSection = () => {
    if (editingProfile) {
      return (
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 mb-6 backdrop-blur-sm border border-white border-opacity-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">Edit Profile</h2>
            <button
              onClick={saveProfileChanges}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
              <div className="relative group">
                {/* profile pic part */}
              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <span className="font-medium text-white">
                {profile.name ? profile.name.charAt(0) : "U"}
              </span>
            </div>
                <button
                  className="absolute bottom-2 right-2 bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 shadow-lg transition-all transform group-hover:scale-110"
                >
                  <Camera size={16} />
                </button>
              </div>
              <span className="text-sm text-indigo-500 mt-3 font-medium">Click camera to change</span>
            </div>
            <div className="flex-1 space-y-5">
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-700 mb-1">College</label>
                <input
                  type="text"
                  name="college"
                  value={profile.college}
                  onChange={handleProfileChange}
                  className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                />
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Year</label>
                  <input
                    type="text"
                    name="year"
                    value={profile.year}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Contact</label>
                  <input
                    type="text"
                    name="contact"
                    value={profile.contact}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
              <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Branch</label>
                  <input
                    type="text"
                    name="branch"
                    value={profile.branch}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-indigo-700 mb-1">Domain</label>
                  <input
                    type="text"
                    name="domain"
                    value={profile.domain}
                    onChange={handleProfileChange}
                    className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all"
                  />
                </div>
            
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 mb-6 backdrop-blur-sm border border-white border-opacity-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
        <button
          onClick={() => setEditingProfile(true)}
          className="absolute top-4 right-4 bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 hover:text-indigo-700 transition-all"
        >
          <Edit2 size={18} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center mb-6 md:mb-0 md:mr-8">
            <div className="relative">
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-36 h-36 rounded-full object-cover border-4 border-indigo-200 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-green-500 w-6 h-6 rounded-full border-2 border-white"></div>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1 text-indigo-800">{profile.name}</h1>
            <p className="text-lg text-indigo-600 mb-4">{profile.college}</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 mb-4">
              <div className="bg-indigo-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-indigo-500 block">Year</span>
                <p className="text-gray-800 font-medium">{profile.year}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-indigo-500 block">Contact</span>
                <p className="text-gray-800 font-medium">{profile.contact}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-indigo-500 block">Domain</span>
                <p className="text-gray-800 font-medium">{profile.domain}</p>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg">
                <span className="text-sm font-medium text-indigo-500 block">Branch</span>
                <p className="text-gray-800 font-medium">{profile.branch}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSkillsSection = () => {
    if (editingSkills) {
      return (
        <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-white border-opacity-20">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-indigo-700">Edit Skills</h2>
            <button
              onClick={saveSkillsChanges}
              className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save size={18} className="mr-2" />
              Save
            </button>
          </div>
          <div className="space-y-5">
            {skills.map(skill => (
              <div key={skill.id} className="space-y-2 bg-indigo-50 p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => handleSkillNameChange(skill.id, e.target.value)}
                    className="flex-1 p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-indigo-500 outline-none transition-all mr-3"
                  />
                  <span className="w-12 text-sm text-right font-medium text-indigo-700">{skill.level}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={skill.level}
                  onChange={(e) => handleSkillLevelChange(skill.id, parseInt(e.target.value))}
                  className="w-full h-2 bg-indigo-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                />
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white bg-opacity-90 rounded-2xl shadow-lg p-8 backdrop-blur-sm border border-white border-opacity-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400"></div>
        <button
          onClick={() => setEditingSkills(true)}
          className="absolute top-4 right-4 bg-indigo-100 text-indigo-600 p-2 rounded-full hover:bg-indigo-200 hover:text-indigo-700 transition-all"
        >
          <Edit2 size={18} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">Skills</h2>
        <div className="space-y-6">
          {skills.map(skill => (
            <div key={skill.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">{skill.name}</span>
                <span className="text-sm font-medium px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-indigo-800 mb-3">Student Profile</h1>
          <p className="text-lg text-indigo-600">View and update your academic journey</p>
        </div>
        {renderProfileSection()}
        {renderSkillsSection()}
      </div>
    </div>
  );
};

export default StudentProfile;