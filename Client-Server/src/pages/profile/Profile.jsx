import React, { useState, useEffect } from 'react';
import { Camera, X, Edit2, PlusCircle, Save } from 'lucide-react';
import { useSelector } from 'react-redux';
import skillsService from '../../services/skills.service.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentProfile = () => {
  const { user } = useSelector((state) => state.trackAuth.studentData);

  const [profile, setProfile] = useState({
    name: '',
    title: '',
    university: '',
    about: '',
    profilePic: '/api/placeholder/150/150',
  });

  const [skills, setSkills] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [editingSkills, setEditingSkills] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        title: user.title || '',
        university: user.university || '',
        about: user.about || '',
        profilePic: user.profilePic || '/api/placeholder/150/150',
      });
    }

    const fetchSkills = async () => {
      try {
        const response = await skillsService.getSkills();
        if (Array.isArray(response.data)) {
          const formattedSkills = response.data.map((skill, index) => ({
            id: index + 1,
            name: skill.name || skill,
            level: skill.level || 50,
          }));
          setSkills(formattedSkills);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
        toast.error("Failed to load skills.");
      }
    };

    fetchSkills();
  }, [user]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleProfilePicChange = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setProfile(prev => ({
      ...prev,
      profilePic: `/api/placeholder/150/150?id=${randomId}`,
    }));
  };

  const handleSkillLevelChange = (id, newLevel) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, level: newLevel } : skill
    ));
  };

  const handleSkillNameChange = (id, newName) => {
    setSkills(skills.map(skill =>
      skill.id === id ? { ...skill, name: newName } : skill
    ));
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim() === '') return;
    const newId = Math.max(0, ...skills.map(s => s.id)) + 1;
    setSkills([...skills, { ...newSkill, id: newId }]);
    setNewSkill({ name: '', level: 50 });
  };

  const handleRemoveSkill = (id) => {
    setSkills(skills.filter(skill => skill.id !== id));
  };

  const saveProfileChanges = () => {
    setEditingProfile(false);
  };

  const saveSkillsChanges = async () => {
    setIsSaving(true);
    try {
      const skillNames = skills.map(skill => skill.name);
      const response = await skillsService.updateSkills(skillNames);
      toast.success("Skills updated successfully!");
    } catch (error) {
      console.error("Error updating skills:", error);
      toast.error("Failed to update skills.");
    } finally {
      setIsSaving(false);
    }
  };

  const renderProfileSection = () => {
    if (editingProfile) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Profile</h2>
            <button
              onClick={saveProfileChanges}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Save size={18} className="mr-1" />
              Save
            </button>
          </div>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6">
              <div className="relative">
                <img
                  src={profile.profilePic}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
                />
                <button
                  onClick={handleProfilePicChange}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                >
                  <Camera size={16} />
                </button>
              </div>
              <span className="text-sm text-gray-500 mt-2">Click camera to change</span>
            </div>
            <div className="flex-1">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={profile.title}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">University</label>
                <input
                  type="text"
                  name="university"
                  value={profile.university}
                  onChange={handleProfileChange}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
                <textarea
                  name="about"
                  value={profile.about}
                  onChange={handleProfileChange}
                  rows="4"
                  className="w-full p-2 border border-gray-300 rounded"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 relative">
        <button
          onClick={() => setEditingProfile(true)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <Edit2 size={18} />
        </button>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-col items-center mb-4 md:mb-0 md:mr-6">
            <img
              src={profile.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
            <p className="text-lg text-gray-600 mb-1">{profile.title}</p>
            <p className="text-md text-gray-500 mb-4">{profile.university}</p>
            <h3 className="text-lg font-semibold mb-2">About</h3>
            <p className="text-gray-700">{profile.about}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSkillsSection = () => {
    if (editingSkills) {
      return (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Edit Skills</h2>
            <button
              onClick={saveSkillsChanges}
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <Save size={18} className="mr-1" />
              Save
            </button>
          </div>
          <div className="space-y-4 mb-6">
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center space-x-3">
                <button
                  onClick={() => handleRemoveSkill(skill.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={18} />
                </button>
                <input
                  type="text"
                  value={skill.name}
                  onChange={(e) => handleSkillNameChange(skill.id, e.target.value)}
                  className="flex-1 p-2 border border-gray-300 rounded"
                />
                <div className="flex items-center space-x-2 w-48">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.level}
                    onChange={(e) => handleSkillLevelChange(skill.id, parseInt(e.target.value))}
                    className="flex-1"
                  />
                  <span className="w-8 text-sm">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
          <div className="pt-4 border-t border-gray-200">
            <h3 className="text-lg font-semibold mb-2">Add New Skill</h3>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={newSkill.name}
                onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                placeholder="Skill name"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              <div className="flex items-center space-x-2 w-48">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={newSkill.level}
                  onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="w-8 text-sm">{newSkill.level}%</span>
              </div>
              <button
                onClick={handleAddSkill}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 flex-shrink-0"
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <button
          onClick={() => setEditingSkills(true)}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <Edit2 size={18} />
        </button>
        <h2 className="text-xl font-bold mb-4">Skills</h2>
        <div className="space-y-4">
          {skills.map(skill => (
            <div key={skill.id} className="space-y-1">
              <div className="flex justify-between">
                <span className="font-medium">{skill.name}</span>
                <span className="text-sm text-gray-500">{skill.level}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full"
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
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Student Profile</h1>
        <p className="text-center text-gray-600">Update your profile information and showcase your skills</p>
      </div>
      {renderProfileSection()}
      {renderSkillsSection()}
    </div>
  );
};

export default StudentProfile;
