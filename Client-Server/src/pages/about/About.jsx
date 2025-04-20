import React from 'react';
import { CheckCircle, Users, Award, Code, Lightbulb, Heart } from 'lucide-react';

const teamMembers = [
  {
    name: "Aarav Sharma",
    role: "Team Lead & AI Specialist",
    image: "/api/placeholder/150/150",
    bio: "Final year BTech student with expertise in machine learning and educational technology. Passionate about using AI to solve real-world problems in education."
  },
  {
    name: "Priya Patel",
    role: "Frontend Developer",
    image: "/api/placeholder/150/150",
    bio: "Creative developer with a knack for UI/UX design. Dedicated to building intuitive interfaces that make complex data easily understandable."
  },
  {
    name: "Rahul Kapoor",
    role: "Backend Engineer",
    image: "/api/placeholder/150/150",
    bio: "Systems architect specializing in scalable solutions. Brings experience from previous internships at leading tech companies."
  },
  {
    name: "Zara Khan",
    role: "Data Scientist",
    image: "/api/placeholder/150/150",
    bio: "Academic researcher focused on educational analytics and predictive modeling. Combines technical expertise with a deep understanding of student needs."
  }
];

const milestones = [
  {
    year: "2024",
    title: "GradWise Hackathon Project",
    description: "Developed as an innovative solution for the National Student Hackathon, addressing the challenges faced by BTech students in tracking progress and planning careers."
  },
  {
    year: "2024",
    title: "Partnership with 5 Universities",
    description: "Signed pilot programs with leading technical universities to test and refine the platform with real student data and feedback."
  },
  {
    year: "2024",
    title: "AI Algorithm Development",
    description: "Created proprietary recommendation algorithms based on analysis of curriculum requirements and industry skill demands."
  },
  {
    year: "2025",
    title: "Future Vision",
    description: "Expanding to serve students across all engineering disciplines and developing additional features for post-graduation career planning."
  }
];

const About = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-blue-900 text-white">
        <div className="container mx-auto max-w-6xl text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About GradWise</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            We're on a mission to transform how BTech students navigate their academic journey and prepare for successful careers.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <img 
                src="/api/placeholder/600/400" 
                alt="GradWise Team Brainstorming" 
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                GradWise was born from a shared frustration among BTech students: despite spending four critical years pursuing their degree, many graduate feeling unprepared for the job market and unsure if they've developed the right skills.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                As a team of final-year engineering students, we experienced this challenge firsthand. We noticed that students often lack visibility into how their academic choices align with career goals, and how to strategically build skills that employers value.
              </p>
              <p className="text-lg text-gray-600">
                We created GradWise as the solution we wished we had from day one - an AI-powered platform that provides personalized guidance, tracks progress, and helps BTech students make informed decisions throughout their academic journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16">
            To empower BTech students with AI-driven insights and personalized guidance that bridges the gap between academic achievement and career readiness.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Personalized Guidance</h3>
              <p className="text-gray-600">
                We believe every student's journey is unique. Our AI analyzes individual strengths, interests, and goals to provide tailored recommendations.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Data-Driven Decisions</h3>
              <p className="text-gray-600">
                We transform complex educational and career data into actionable insights that help students make informed choices at every stage.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Career Readiness</h3>
              <p className="text-gray-600">
                We bridge the gap between academia and industry by aligning students' skill development with current market demands and future trends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Values</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            The principles that guide everything we do at GradWise.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Student-Centered</h3>
                <p className="text-gray-600">
                  We put students first in everything we build. Our platform is designed to adapt to the unique needs and goals of each individual.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Code className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Technical Excellence</h3>
                <p className="text-gray-600">
                  We're committed to building robust, reliable technology that students can depend on throughout their academic journey.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Award className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Continuous Improvement</h3>
                <p className="text-gray-600">
                  We're constantly learning and evolving, just like our users. We regularly update our platform based on feedback and emerging trends.
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full p-3 mr-4">
                <Heart className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Empathy & Support</h3>
                <p className="text-gray-600">
                  We understand the challenges of BTech education and design our solutions with genuine care for students' wellbeing and success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Team */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Meet Our Team</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            The passionate minds behind GradWise who are committed to improving the BTech experience.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="w-full h-48 object-cover object-center"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-1 text-gray-800">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                  <p className="text-gray-600">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Journey */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-16 text-center">
            From hackathon idea to comprehensive student platform - key milestones in our development.
          </p>
          
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex flex-col md:flex-row">
                <div className="md:w-1/4 mb-4 md:mb-0">
                  <div className="bg-blue-600 text-white text-center py-2 px-4 rounded-lg inline-block md:mr-6">
                    {milestone.year}
                  </div>
                </div>
                <div className="md:w-3/4">
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Mission</h2>
          <p className="text-xl mb-8 opacity-90">
            Help us transform the BTech experience and prepare students for successful careers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Get Started
            </button>
            <button className="border border-white text-white hover:bg-blue-700 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;