import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { BookOpen, Compass, Award, BarChart2, Calendar, Check, Star, Brain } from 'lucide-react';

const progressData = [
  { name: 'Sem 1', gpa: 7.2, skills: 30 },
  { name: 'Sem 2', gpa: 7.5, skills: 45 },
  { name: 'Sem 3', gpa: 8.1, skills: 65 },
  { name: 'Sem 4', gpa: 8.3, skills: 75 },
  { name: 'Sem 5', gpa: 8.7, skills: 85 },
  { name: 'Sem 6', gpa: 9.0, skills: 90 },
];

const testimonials = [
  {
    id: 1,
    content: "GradWise helped me identify skill gaps in my resume and suggested courses that employers in my field actually value. My interview callbacks increased by 70%!",
    name: "Priya S.",
    year: "Final Year, CSE"
  },
  {
    id: 2,
    content: "The personalized roadmap feature saved me from taking courses that wouldn't help my career goals. The AI recommendations were spot-on for my interests in ML.",
    name: "Rahul K.",
    year: "3rd Year, ECE"
  },
  {
    id: 3,
    content: "I was struggling with time management until GradWise analyzed my schedule and study habits. My GPA improved from 7.2 to 8.5 in just one semester!",
    name: "Aditya M.",
    year: "2nd Year, IT"
  }
];

const features = [
  {
    icon: <Brain className="w-10 h-10 text-blue-500" />,
    title: "AI-Powered Analysis",
    description: "Our advanced AI analyzes your academic performance, skills, and career goals to provide personalized guidance."
  },
  {
    icon: <BarChart2 className="w-10 h-10 text-blue-500" />,
    title: "Progress Tracking",
    description: "Visualize your academic progress, skill development, and goal completion in easy-to-understand dashboards."
  },
  {
    icon: <Compass className="w-10 h-10 text-blue-500" />,
    title: "Career Roadmaps",
    description: "Get customized career roadmaps based on your strengths, interests, and industry demands."
  },
  {
    icon: <BookOpen className="w-10 h-10 text-blue-500" />,
    title: "Course Recommendations",
    description: "Discover courses and resources that align with your career goals and fill skill gaps in your profile."
  }
];

const FAQs = [
  {
    question: "How does GradWise use AI to help BTech students?",
    answer: "GradWise uses AI to analyze your academic performance, extracurricular activities, and career goals to create personalized recommendations for courses, projects, and skill development opportunities."
  },
  {
    question: "Is my data secure with GradWise?",
    answer: "Absolutely! We employ industry-standard encryption and security measures. Your data is only used to provide personalized recommendations and is never shared with third parties."
  },
  {
    question: "Can GradWise help me prepare for placements?",
    answer: "Yes! GradWise analyzes current industry requirements and helps you build a targeted skill set that aligns with your desired roles, including resume building and interview preparation tips."
  }
];

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0 lg:pr-10">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Navigate Your BTech Journey with
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"> GradWise</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              AI-powered progress tracking and personalized guidance to help you excel in your BTech degree and prepare for your dream career.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                Get Started — It's Free
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-lg transition-colors duration-300">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Academic Progress</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={progressData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="gpa" stroke="#3b82f6" activeDot={{ r: 8 }} name="GPA" />
                    <Line yAxisId="right" type="monotone" dataKey="skills" stroke="#8b5cf6" name="Skills %" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 flex items-center">
                <div className="flex items-center mr-6">
                  <div className="h-3 w-3 rounded-full bg-blue-500 mr-2"></div>
                  <span className="text-sm text-gray-600">GPA</span>
                </div>
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-500 mr-2"></div>
                  <span className="text-sm text-gray-600">Skills Mastery</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-600 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">92%</p>
              <p className="text-lg opacity-80">Students Improved GPA</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">78%</p>
              <p className="text-lg opacity-80">Higher Placement Rates</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">10K+</p>
              <p className="text-lg opacity-80">BTech Students</p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold mb-2">250+</p>
              <p className="text-lg opacity-80">College Partners</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How GradWise Transforms Your BTech Journey</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides personalized guidance to help you make the most of your college years and prepare for a successful career.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-100">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How GradWise Works</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A simple three-step process to revolutionize your academic journey and career preparation.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Connect Your Data</h3>
              <p className="text-gray-600">
                Link your academic records, interests, and career aspirations to create your personalized profile.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Get AI Analysis</h3>
              <p className="text-gray-600">
                Our AI analyzes your performance and generates personalized recommendations tailored to your goals.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-blue-600 font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Follow Your Roadmap</h3>
              <p className="text-gray-600">
                Access your personalized dashboard with actionable steps to improve your skills and achieve your goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What Students Say</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Hear from BTech students who transformed their academic journey with GradWise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.year}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Get answers to common questions about GradWise.
            </p>
          </div>
          <div className="space-y-6">
            {FAQs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your BTech Journey?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have improved their academic performance and career readiness with GradWise.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Get Started For Free
            </button>
            <button className="border border-white text-white hover:bg-blue-700 font-medium py-3 px-8 rounded-lg transition-colors duration-300 text-lg">
              Schedule a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      
    </div>
  );
};

export default Home;