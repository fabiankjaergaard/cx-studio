'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  CheckCircleIcon,
  AlertTriangleIcon,
  HeadphonesIcon,
  Users2Icon,
  ClipboardListIcon,
  BarChart3Icon,
  BookOpenIcon,
  LightbulbIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MessageSquareIcon,
  PlayIcon,
  FileTextIcon
} from 'lucide-react'
import Link from 'next/link'

const steps = [
  { id: 'overview', title: 'Overview', description: 'What are user interviews and when to use them?' },
  { id: 'types', title: 'Interview Types', description: 'Exploratory, usability, and evaluative interviews' },
  { id: 'best-practices', title: 'Best Practices', description: 'How to conduct effective interviews' },
  { id: 'questions', title: 'Question Framework', description: 'Proven question types and templates' },
  { id: 'next-steps', title: 'Next Steps', description: 'Start creating your interview guide' }
]

export default function InterviewGuidePage() {
  const [currentStep, setCurrentStep] = useState(0)

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (stepIndex: number) => {
    setCurrentStep(stepIndex)
  }

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title="Guide: Learn to Interview"
        description={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}
      />

      <div className="flex-1 p-6 overflow-auto pb-32" style={{background: 'transparent'}}>

        {/* Step Content */}
        <div className="space-y-8">
          {currentStep === 0 && (
            <>
              <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <HeadphonesIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        What are user interviews?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        User interviews are structured conversations with your target audience to uncover deep insights about their needs, behaviors, motivations, and pain points. Unlike surveys that tell you "what" and "how many", interviews reveal the "why" behind user behavior.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">30-60 min</div>
                          <div className="text-sm text-gray-600">Optimal interview length</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">5-8</div>
                          <div className="text-sm text-gray-600">Interviews per research round</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">85%</div>
                          <div className="text-sm text-gray-600">Of insights discovered in first 5</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>

              {/* When to Use / When Not to Use */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-0 bg-white rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <CheckCircleIcon className="h-4 w-4 text-slate-600" />
                      </div>
                      <span>Use interviews when you want to:</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Understand user motivations and decision-making",
                        "Discover unmet needs and pain points",
                        "Explore complex workflows and contexts",
                        "Get detailed feedback on concepts or prototypes",
                        "Understand emotional responses to your product",
                        "Generate ideas for new features or improvements"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                        <AlertTriangleIcon className="h-4 w-4 text-slate-600" />
                      </div>
                      <span>Avoid interviews for:</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Statistical validation or quantitative data",
                        "Testing specific UI interactions (use usability testing)",
                        "Simple yes/no questions (use surveys)",
                        "Price sensitivity research (use quantitative methods)",
                        "Large-scale trend analysis",
                        "Quick feedback on minor design changes"
                      ].map((item, index) => (
                        <li key={index} className="flex items-start text-sm">
                          <AlertTriangleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>

              {/* Benefits */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Why interviews are powerful</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Rich, contextual insights</h4>
                      <p className="text-sm text-gray-600 mb-3">Uncover the full story behind user behavior, including environmental factors, workarounds, and hidden motivations that surveys can't capture.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Flexibility and depth</h4>
                      <p className="text-sm text-gray-600 mb-3">Follow interesting leads in real-time, dig deeper into unexpected insights, and adapt questions based on what you're learning.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Human connection</h4>
                      <p className="text-sm text-gray-600 mb-3">Build empathy with your users, understand their world, and create products that truly solve their problems.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Cost-effective validation</h4>
                      <p className="text-sm text-gray-600 mb-3">Catch major issues early in the design process, before expensive development begins.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 1 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Choose the Right Interview Type</CardTitle>
                  <p className="text-gray-600">Different research goals require different interview approaches. Here are the three main types and when to use them.</p>
                </CardHeader>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-300">
                        <Users2Icon className="h-6 w-6 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Exploratory</h3>
                        <p className="text-sm text-slate-600 font-medium">Understand needs & context</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Open conversations to understand users' world, goals, and challenges
                    </p>
                    <div className="text-lg font-bold text-slate-600 mb-2">When: Early in process</div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">• Before design begins</p>
                      <p className="text-sm text-gray-600">• To define the problem</p>
                      <p className="text-sm text-gray-600">• Discover unknown needs</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-300">
                        <ClipboardListIcon className="h-6 w-6 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Usability</h3>
                        <p className="text-sm text-slate-600 font-medium">Test & improve</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Observe users while they perform tasks in your product
                    </p>
                    <div className="text-lg font-bold text-slate-600 mb-2">When: During development</div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">• Test prototypes</p>
                      <p className="text-sm text-gray-600">• Identify usability issues</p>
                      <p className="text-sm text-gray-600">• Validate design decisions</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="group border-0 bg-white rounded-xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-slate-100 transition-colors duration-300">
                        <BarChart3Icon className="h-6 w-6 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Evaluative</h3>
                        <p className="text-sm text-slate-600 font-medium">Measure & optimize</p>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">
                      Gather feedback on existing product and identify improvement areas
                    </p>
                    <div className="text-lg font-bold text-slate-600 mb-2">When: After launch</div>
                    <div className="space-y-1">
                      <p className="text-sm text-gray-600">• Evaluate existing product</p>
                      <p className="text-sm text-gray-600">• Measure satisfaction and performance</p>
                      <p className="text-sm text-gray-600">• Plan next iteration</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Detailed comparison */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg">Interview Type Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Aspect</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Exploratory</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Usability</th>
                          <th className="text-left py-3 px-4 font-semibold text-gray-900">Evaluative</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900">Duration</td>
                          <td className="py-3 px-4 text-gray-600">45-60 minutes</td>
                          <td className="py-3 px-4 text-gray-600">60-90 minutes</td>
                          <td className="py-3 px-4 text-gray-600">30-45 minutes</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900">Structure</td>
                          <td className="py-3 px-4 text-gray-600">Very flexible</td>
                          <td className="py-3 px-4 text-gray-600">Task-focused</td>
                          <td className="py-3 px-4 text-gray-600">Semi-structured</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900">Participants</td>
                          <td className="py-3 px-4 text-gray-600">Target users</td>
                          <td className="py-3 px-4 text-gray-600">Actual users</td>
                          <td className="py-3 px-4 text-gray-600">Current customers</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium text-gray-900">Output</td>
                          <td className="py-3 px-4 text-gray-600">User stories, personas</td>
                          <td className="py-3 px-4 text-gray-600">Usability issues</td>
                          <td className="py-3 px-4 text-gray-600">Satisfaction insights</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* When to combine types */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <MessageSquareIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Combining Interview Types</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Discovery → Validation → Optimization</h4>
                      <p className="text-sm text-gray-600">Start with exploratory interviews to understand the problem space, then use usability interviews to test solutions, and finally evaluative interviews to measure success and identify improvements.</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Hybrid Interviews</h4>
                      <p className="text-sm text-gray-600">You can combine elements - start an interview exploratory to understand context, then move to usability testing of specific features, and end with evaluative questions about overall satisfaction.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 2 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Interview Best Practices</CardTitle>
                  <p className="text-gray-600">Master the art of conducting insightful interviews through preparation, execution, and analysis</p>
                </CardHeader>
              </Card>

              {/* Preparation Phase */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <ClipboardListIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Preparation Phase</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Research Planning</h4>
                      <ul className="space-y-2">
                        {[
                          "Define clear research objectives and key questions",
                          "Identify target participant criteria and behavior patterns",
                          "Create hypotheses to test (but stay open to surprises)",
                          "Plan for 5-8 participants for pattern recognition",
                          "Budget 45-60 minutes per interview plus prep time"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technical & Logistics</h4>
                      <ul className="space-y-2">
                        {[
                          "Test recording equipment and video tools in advance",
                          "Prepare backup recording methods (phone, multiple devices)",
                          "Choose quiet, comfortable environment for participant",
                          "Have consent forms ready and explain recording clearly",
                          "Prepare materials, prototypes, or screens to share"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Execution Phase */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <PlayIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>During the Interview</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Building Rapport</h4>
                      <ul className="space-y-2">
                        {[
                          "Start with easy, personal questions to build comfort",
                          "Explain that you're learning from them (they're the expert)",
                          "Reassure that there are no wrong answers",
                          "Show genuine curiosity and interest in their responses",
                          "Use their language and terminology, not yours"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Advanced Techniques</h4>
                      <ul className="space-y-2">
                        {[
                          "Use the 'think aloud' method for task-based sessions",
                          "Ask for specific stories: 'Tell me about last time you...'",
                          "Follow the energy - dig deeper when they seem excited/frustrated",
                          "Use silence strategically - let them fill the pause",
                          "Mirror their language and emotional tone"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Phase */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Analysis & Synthesis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Immediate Post-Interview</h4>
                      <ul className="space-y-2">
                        {[
                          "Write key insights and surprises within 30 minutes",
                          "Note emotional reactions and non-verbal cues",
                          "Identify quotes that capture important sentiments",
                          "Record your own hypotheses and assumptions that were challenged",
                          "Plan any follow-up questions for next interviews"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Pattern Recognition</h4>
                      <ul className="space-y-2">
                        {[
                          "Look for themes across multiple interviews",
                          "Create affinity maps or journey maps from insights",
                          "Identify pain points, motivations, and unmet needs",
                          "Note behaviors that contradict what people say they do",
                          "Transform insights into actionable design opportunities"
                        ].map((tip, index) => (
                          <li key={index} className="flex items-start text-sm text-gray-600">
                            <CheckCircleIcon className="w-4 h-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                            {tip}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Common Pitfalls */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <AlertTriangleIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Common Pitfalls to Avoid</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        mistake: "Leading questions that suggest the answer",
                        example: "Instead of 'Don't you think this is confusing?' ask 'How did that feel to you?'",
                        impact: "Biases responses toward what you want to hear"
                      },
                      {
                        mistake: "Focusing on solutions instead of problems",
                        example: "Instead of 'Would you use this feature?' ask 'Tell me about how you currently handle this task'",
                        impact: "Misses the real underlying needs and context"
                      },
                      {
                        mistake: "Interrupting or rushing through silence",
                        example: "Let participants think for 5-10 seconds before helping them",
                        impact: "Cuts off deeper, more thoughtful responses"
                      },
                      {
                        mistake: "Not asking for specific examples",
                        example: "Follow up general statements with 'Can you walk me through the last time that happened?'",
                        impact: "Gets only surface-level, theoretical responses"
                      }
                    ].map((pitfall, index) => (
                      <div key={index} className="bg-slate-50 p-4 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <AlertTriangleIcon className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900 mb-1">{pitfall.mistake}</h5>
                            <p className="text-sm text-gray-600 mb-2 italic">"{pitfall.example}"</p>
                            <p className="text-sm text-slate-600"><strong>Impact:</strong> {pitfall.impact}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 3 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Question Framework & Templates</CardTitle>
                  <p className="text-gray-600">Master the art of asking the right questions at the right time to uncover deep insights</p>
                </CardHeader>
              </Card>

              {/* Interview Structure */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <FileTextIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Interview Structure Template</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border-l-4 border-l-slate-200 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Opening (5-10 minutes)</h4>
                      <p className="text-sm text-gray-600 mb-2">Build rapport and set expectations</p>
                      <ul className="space-y-1">
                        {[
                          "\"Thank you for your time. I'm [name] and I'm here to learn from your experience.\"",
                          "\"There are no right or wrong answers - I'm genuinely curious about your perspective.\"",
                          "\"Feel free to think out loud, and let me know if anything is unclear.\"",
                          "\"Tell me a bit about yourself and your role at [company].\"",
                          "\"How did you first hear about/start using [product/service]?\""
                        ].map((question, index) => (
                          <li key={index} className="text-sm text-gray-700 italic">• {question}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-l-4 border-l-slate-200 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Main Discussion (35-40 minutes)</h4>
                      <p className="text-sm text-gray-600 mb-2">Dive deep into their experience and context</p>
                      <ul className="space-y-1">
                        {[
                          "\"Walk me through a typical [workflow/day/process] for you.\"",
                          "\"Tell me about the last time you [specific task/challenge].\"",
                          "\"What's the most challenging part of your current process?\"",
                          "\"How do you currently solve [specific problem]?\"",
                          "\"What would an ideal solution look like to you?\""
                        ].map((question, index) => (
                          <li key={index} className="text-sm text-gray-700 italic">• {question}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-l-4 border-l-slate-200 pl-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Wrap-up (10-15 minutes)</h4>
                      <p className="text-sm text-gray-600 mb-2">Clarify insights and explore missed topics</p>
                      <ul className="space-y-1">
                        {[
                          "\"What haven't I asked that you think is important?\"",
                          "\"If you could wave a magic wand and fix one thing, what would it be?\"",
                          "\"Who else do you think I should talk to about this?\"",
                          "\"Any final thoughts or questions for me?\"",
                          "\"Thank you - your insights are incredibly valuable.\""
                        ].map((question, index) => (
                          <li key={index} className="text-sm text-gray-700 italic">• {question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question Types */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <Card className="border-0 bg-white rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Exploratory Questions</CardTitle>
                    <p className="text-gray-600 text-sm">Uncover needs, motivations, and context</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { question: "Tell me about...", purpose: "Get detailed stories and context" },
                        { question: "Walk me through...", purpose: "Understand process and workflow" },
                        { question: "How do you currently...?", purpose: "Learn existing solutions" },
                        { question: "What's most important when...?", purpose: "Identify priorities and values" },
                        { question: "What would you expect to happen if...?", purpose: "Understand mental models" }
                      ].map((item, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 text-sm mb-1">"{item.question}"</p>
                          <p className="text-xs text-gray-600">{item.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-white rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-lg">Follow-up Questions</CardTitle>
                    <p className="text-gray-600 text-sm">Dig deeper into responses</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {[
                        { question: "Why is that important to you?", purpose: "Uncover underlying motivations" },
                        { question: "Can you give me a specific example?", purpose: "Get concrete details" },
                        { question: "How did that make you feel?", purpose: "Understand emotional response" },
                        { question: "What would happen if...?", purpose: "Explore consequences" },
                        { question: "Help me understand...", purpose: "Clarify complex concepts" }
                      ].map((item, index) => (
                        <div key={index} className="bg-slate-50 p-3 rounded-lg">
                          <p className="font-medium text-gray-900 text-sm mb-1">"{item.question}"</p>
                          <p className="text-xs text-gray-600">{item.purpose}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Advanced Techniques */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Advanced Question Techniques</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">The Five Whys</h4>
                      <div className="bg-slate-50 p-4 rounded-lg mb-3">
                        <p className="text-sm text-gray-700 mb-2"><strong>User:</strong> "I don't like this interface."</p>
                        <p className="text-sm text-gray-700 mb-2"><strong>You:</strong> "Why don't you like it?" → Too cluttered</p>
                        <p className="text-sm text-gray-700 mb-2"><strong>You:</strong> "Why does clutter bother you?" → Hard to find things</p>
                        <p className="text-sm text-gray-700 mb-2"><strong>You:</strong> "Why is finding things important?" → Time pressure</p>
                        <p className="text-sm text-gray-700 mb-2"><strong>You:</strong> "Tell me about that time pressure..." → Root cause!</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Comparison Questions</h4>
                      <ul className="space-y-2">
                        {[
                          "How does this compare to [alternative solution]?",
                          "What's different about how you handle this at work vs. home?",
                          "How has your approach changed over time?",
                          "If you had to choose between X and Y, which would you pick and why?"
                        ].map((question, index) => (
                          <li key={index} className="text-sm text-gray-700 bg-slate-50 p-2 rounded">
                            "{question}"
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Question Mistakes */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <AlertTriangleIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Questions to Avoid</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        bad: "Don't you think this design is confusing?",
                        good: "How did you feel when you first saw this design?",
                        why: "Leading questions bias the response"
                      },
                      {
                        bad: "Would you use this feature?",
                        good: "Tell me about how you currently handle this task.",
                        why: "Hypothetical questions get unreliable answers"
                      },
                      {
                        bad: "Do you like using our app?",
                        good: "Walk me through the last time you used our app.",
                        why: "Yes/no questions don't provide insights"
                      },
                      {
                        bad: "What features do you want?",
                        good: "What's the most frustrating part of your current workflow?",
                        why: "Focus on problems, not solutions"
                      }
                    ].map((item, index) => (
                      <div key={index} className="border border-slate-200 rounded-lg p-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-red-700 mb-1">❌ Avoid:</h5>
                            <p className="text-sm text-gray-700 italic">"{item.bad}"</p>
                          </div>
                          <div>
                            <h5 className="font-medium text-green-700 mb-1">✅ Try instead:</h5>
                            <p className="text-sm text-gray-700 italic">"{item.good}"</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-600 mt-2 border-t border-slate-200 pt-2">
                          <strong>Why:</strong> {item.why}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {currentStep === 4 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-xl">Ready to Start Interviewing?</CardTitle>
                  <p className="text-gray-600">Follow this checklist to plan and execute your first interview study</p>
                </CardHeader>
              </Card>

              {/* Pre-Interview Checklist */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <ClipboardListIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Pre-Interview Checklist</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Research Setup</h4>
                      <ul className="space-y-2">
                        {[
                          "Define your research questions and objectives",
                          "Identify your target participant criteria",
                          "Recruit 5-8 participants from your target audience",
                          "Schedule 60-90 minute time slots with buffer time",
                          "Prepare consent forms and recording permissions"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <div className="w-4 h-4 border border-slate-300 rounded-sm mr-2 mt-0.5 flex-shrink-0 bg-white"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technical Preparation</h4>
                      <ul className="space-y-2">
                        {[
                          "Test your recording equipment (Zoom, Loom, etc.)",
                          "Prepare backup recording methods",
                          "Set up a quiet, distraction-free environment",
                          "Have materials ready (prototypes, wireframes)",
                          "Create a simple note-taking template"
                        ].map((item, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <div className="w-4 h-4 border border-slate-300 rounded-sm mr-2 mt-0.5 flex-shrink-0 bg-white"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Study Planning */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <FileTextIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Interview Study Planning</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Sample Study Timeline</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Week 1:</span>
                          <span className="text-gray-600">Plan study, recruit participants, create interview guide</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Week 2:</span>
                          <span className="text-gray-600">Conduct 5-8 interviews (2-3 per day maximum)</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Week 3:</span>
                          <span className="text-gray-600">Analyze findings, identify patterns, create insights report</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-medium">Week 4:</span>
                          <span className="text-gray-600">Share findings, plan next steps, implement changes</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-2">Budget Considerations</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Participant incentives: $50-150 per interview (depending on target audience)</li>
                        <li>• Recording tools: $0-50/month (Zoom, Loom, or similar)</li>
                        <li>• Analysis tools: $0-100/month (Miro, Dovetail, or similar)</li>
                        <li>• Time investment: 2-3 hours per interview (including prep and analysis)</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Analysis Framework */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Post-Interview Analysis</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Immediate Actions (After Each Interview)</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start"><span className="text-slate-600 mr-2">1.</span>Write down key insights within 30 minutes</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">2.</span>Note surprising findings or contradictions</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">3.</span>Capture important quotes verbatim</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">4.</span>Update your interview guide if needed</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">5.</span>Plan follow-up questions for next interviews</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Final Analysis (After All Interviews)</h4>
                      <ul className="space-y-2 text-sm text-gray-600">
                        <li className="flex items-start"><span className="text-slate-600 mr-2">1.</span>Create an affinity map of all insights</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">2.</span>Identify patterns and themes across interviews</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">3.</span>Prioritize insights by frequency and impact</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">4.</span>Create actionable recommendations</li>
                        <li className="flex items-start"><span className="text-slate-600 mr-2">5.</span>Present findings to stakeholders</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Items */}
              <Card className="border-0 bg-white rounded-xl overflow-hidden">
                <CardContent className="p-6">
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      Start Your Interview Study Today
                    </h3>
                    <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                      You now have all the knowledge needed to conduct effective user interviews. Choose your next step below to begin your research journey.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
                      <Link href="/insights/interview-builder?tab=create">
                        <div className="bg-slate-50 hover:bg-slate-100 transition-colors p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-slate-200">
                          <LightbulbIcon className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900 mb-1">Create Interview Guide</h4>
                          <p className="text-sm text-gray-600">Build a structured guide for your interviews</p>
                        </div>
                      </Link>
                      <Link href="/insights/research-planner">
                        <div className="bg-slate-50 hover:bg-slate-100 transition-colors p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-slate-200">
                          <ClipboardListIcon className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900 mb-1">Plan Research Study</h4>
                          <p className="text-sm text-gray-600">Organize your entire research project</p>
                        </div>
                      </Link>
                      <Link href="/insights/focus-groups">
                        <div className="bg-slate-50 hover:bg-slate-100 transition-colors p-4 rounded-lg cursor-pointer border-2 border-transparent hover:border-slate-200">
                          <Users2Icon className="h-8 w-8 text-slate-600 mx-auto mb-2" />
                          <h4 className="font-semibold text-gray-900 mb-1">Compare Methods</h4>
                          <p className="text-sm text-gray-600">Learn about focus groups and other methods</p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-center">
          {/* Center - Back button, Progress indicator and Next button */}
          <div className="flex items-center space-x-6">
            {/* Back button - only show if not on first step */}
            {currentStep > 0 && (
              <Button
                variant="outline"
                onClick={prevStep}
                className="flex items-center space-x-2 px-4 py-2"
              >
                <ChevronLeftIcon className="h-4 w-4" />
                <span>Back</span>
              </Button>
            )}

            {/* Progress indicator */}
            <span className="text-sm text-gray-600 font-medium">
              {currentStep + 1}/{steps.length}
            </span>
            <div className="w-48 bg-gray-200 rounded-full h-2">
              <div
                className="bg-slate-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>

            {/* Next button */}
            {currentStep < steps.length - 1 ? (
              <Button
                variant="primary"
                onClick={nextStep}
                className="flex items-center space-x-2 px-6 py-2"
              >
                <span>Next</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Link href="/insights/interview-builder?tab=create">
                <Button variant="primary" className="flex items-center space-x-2 px-6 py-2">
                  <span>Get Started</span>
                  <PlayIcon className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}