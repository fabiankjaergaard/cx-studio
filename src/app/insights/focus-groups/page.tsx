'use client'

import { useState } from 'react'
import { Header } from '@/components/dashboard/Header'
import { useLanguage } from '@/contexts/LanguageContext'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import {
  UsersIcon,
  ClockIcon,
  LightbulbIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  UserCheckIcon,
  MessageSquareIcon,
  TargetIcon,
  PlayIcon,
  PauseIcon,
  RecordIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from 'lucide-react'
import Link from 'next/link'

const getFocusGroupPhases = (t: (key: string) => string) => [
  {
    phase: t('focusGroups.planningPhase'),
    duration: t('focusGroups.planningDuration'),
    icon: TargetIcon,
    tasks: [
      "Define purpose and research questions",
      "Recruit participants (6-8 people per group)",
      "Book venue and technical equipment",
      "Create discussion guide",
      "Prepare materials and prototypes"
    ]
  },
  {
    phase: t('focusGroups.implementationPhase'),
    duration: t('focusGroups.implementationDuration'),
    icon: PlayIcon,
    tasks: [
      "Welcome participants and introduction",
      "Conduct discussion according to guide",
      "Moderate and maintain focus",
      "Record (with permission)",
      "End with thanks and compensation"
    ]
  },
  {
    phase: t('focusGroups.analysisPhase'),
    duration: t('focusGroups.analysisDuration'),
    icon: LightbulbIcon,
    tasks: [
      "Transcribe recordings",
      "Identify themes and patterns",
      "Analyze group dynamics",
      "Compile key insights",
      "Create report with recommendations"
    ]
  }
]

const bestPractices = [
  {
    category: "Recruitment",
    icon: UserCheckIcon,
    color: "text-slate-600 bg-slate-100",
    practices: [
      {
        title: "Homogeneous but not too similar",
        description: "Participants should have similar backgrounds but different perspectives",
        tips: ["Same target group/segment", "Varying opinions/experiences", "Avoid extremely different backgrounds", "6-8 participants per group"]
      },
      {
        title: "Right incentives",
        description: "Compensation that motivates participation without distorting answers",
        tips: ["Cash compensation or gift cards", "Fair payment for time", "Avoid excessive amounts", "Clear communication about compensation"]
      }
    ]
  },
  {
    category: "Moderation",
    icon: MessageSquareIcon,
    color: "text-slate-600 bg-slate-100",
    practices: [
      {
        title: "Neutral but engaged leadership",
        description: "Guide the conversation without influencing the answers",
        tips: ["Ask open questions", "Encourage everyone to participate", "Manage dominant participants", "Follow up with 'Why?'"]
      },
      {
        title: "Manage group dynamics",
        description: "Ensure all voices are heard and groupthink is avoided",
        tips: ["Rotate who starts answering", "Separate rounds before discussion", "Handle conflicts professionally", "Observe body language"]
      }
    ]
  },
  {
    category: "Analysis",
    icon: LightbulbIcon,
    color: "text-slate-600 bg-slate-100",
    practices: [
      {
        title: "Separate individual vs group opinions",
        description: "Understand what are personal opinions vs group-influenced",
        tips: ["Note who said what", "Identify groupthink", "Compare between groups", "Look at changes during session"]
      },
      {
        title: "Qualitative thematic analysis",
        description: "Find patterns and themes in the discussions",
        tips: ["Code statements", "Group similar themes", "Count frequency of themes", "Include quotes in the report"]
      }
    ]
  }
]

const commonMistakes = [
  {
    mistake: "Too many questions in the discussion guide",
    impact: "Superficial treatment of important topics",
    solution: "Focus on 3-5 main topics max. Depth before breadth."
  },
  {
    mistake: "Mixing existing and potential customers",
    impact: "Different reference frames create confusion",
    solution: "Separate groups for different customer segments."
  },
  {
    mistake: "Too large groups (9+ people)",
    impact: "Some don't get a chance to speak, difficult to moderate",
    solution: "Keep groups at 6-8 participants for optimal dynamics."
  },
  {
    mistake: "No backup plan for no-shows",
    impact: "Too small groups or cancelled sessions",
    solution: "Book 10-12 participants to get 6-8 who show up."
  },
  {
    mistake: "Trying to quantify qualitative data",
    impact: "Misleading conclusions from small samples",
    solution: "Focus on insights and understanding, not percentages."
  }
]

const discussionGuideTemplate = [
  {
    section: "Warm-up (10 min)",
    questions: [
      "Introduce yourself briefly - name and something fun",
      "How long have you known about [company/product]?",
      "What's your first association with [brand/category]?"
    ]
  },
  {
    section: "Main discussion (60-70 min)",
    questions: [
      "Tell us about the last time you used [product/service]",
      "What works well? What works less well?",
      "If you could change one thing, what would it be?",
      "Show [prototype/concept] - what are your first impressions?",
      "How would this change your behavior?",
      "What concerns or questions do you have?"
    ]
  },
  {
    section: "Closing (10 min)",
    questions: [
      "Summary: what's the most important thing we've talked about?",
      "Anything we forgot to ask about?",
      "Final comments or reflections?"
    ]
  }
]

const steps = [
  {
    id: 'overview',
    title: 'Overview',
    description: 'What are focus groups and when to use them?'
  },
  {
    id: 'planning',
    title: 'Planning',
    description: 'Recruitment, preparation and setup'
  },
  {
    id: 'execution',
    title: 'Execution',
    description: 'Moderation and best practices during sessions'
  },
  {
    id: 'analysis',
    title: 'Analysis',
    description: 'Interpreting results and report writing'
  },
  {
    id: 'templates',
    title: 'Templates & Tips',
    description: 'Discussion guides and common mistakes'
  }
]

export default function FocusGroupsPage() {
  const { t } = useLanguage()
  const focusGroupPhases = getFocusGroupPhases(t)
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

  return (
    <div className="h-full flex flex-col grid-background">
      <Header
        title="Guide: Focus Groups"
        description={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].title}`}
      />

      <div className="flex-1 p-6 overflow-auto pb-32" style={{background: 'transparent'}}>
        {/* Step Content */}
        <div className="space-y-8">
          {/* Step 1: Overview */}
          {currentStep === 0 && (
            <>
              <Card className="mb-8 border-0 bg-white rounded-xl overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <UsersIcon className="h-6 w-6 text-slate-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        What are focus groups?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Focus groups are moderated discussions with 6-8 participants from your target audience.
                        They provide deep insights into attitudes, motivations and group thinking, but require
                        skillful moderation to avoid bias and group influences.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">6-8</div>
                          <div className="text-sm text-gray-600">Optimal number of participants</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">90-120 min</div>
                          <div className="text-sm text-gray-600">Typical session length</div>
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl">
                          <div className="text-lg font-semibold text-slate-600">2-4 groups</div>
                          <div className="text-sm text-gray-600">For pattern validation</div>
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
                      <span>Use focus groups when you want to:</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Explore new product concepts or ideas",
                        "Understand group influences on decisions",
                        "Generate creative solutions together",
                        "Test marketing messages",
                        "Understand cultural dynamics and social norms",
                        "Observe spontaneous reactions in groups"
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
                      <span>Avoid focus groups for:</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {[
                        "Sensitive or personal topics",
                        "When you need quantifiable results",
                        "Statistical representation of a population",
                        "Detailed usability testing",
                        "B2B decisions (use individual interviews)",
                        "Validation of specific design choices"
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
            </>
          )}

          {/* Step 2: Planning */}
          {currentStep === 1 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <TargetIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Planning & Preparations</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Define purpose and research questions",
                      "Recruit participants (6-8 people per group)",
                      "Book venue and technical equipment",
                      "Create discussion guide",
                      "Prepare materials and prototypes"
                    ].map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <UserCheckIcon className="h-4 w-4 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Recruitment</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {bestPractices[0].practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-base">{practice.title}</CardTitle>
                        <p className="text-sm text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1">
                          {practice.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 3: Execution */}
          {currentStep === 2 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <PlayIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Conducting Sessions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Welcome participants and introduction",
                      "Conduct discussion according to guide",
                      "Moderate and maintain focus",
                      "Record (with permission)",
                      "End with thanks and compensation"
                    ].map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <MessageSquareIcon className="h-4 w-4 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Moderation</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {bestPractices[1].practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-base">{practice.title}</CardTitle>
                        <p className="text-sm text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1">
                          {practice.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 4: Analysis */}
          {currentStep === 3 && (
            <>
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                      <LightbulbIcon className="h-4 w-4 text-slate-600" />
                    </div>
                    <span>Analysis & Reporting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {[
                      "Transcribe recordings",
                      "Identify themes and patterns",
                      "Analyze group dynamics",
                      "Compile key insights",
                      "Create report with recommendations"
                    ].map((task, taskIndex) => (
                      <li key={taskIndex} className="flex items-start text-sm text-gray-600">
                        <CheckCircleIcon className="h-4 w-4 text-slate-500 mr-2 mt-0.5 flex-shrink-0" />
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="space-y-6">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center">
                    <LightbulbIcon className="h-4 w-4 text-slate-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Analysis</h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {bestPractices[2].practices.map((practice, practiceIndex) => (
                    <Card key={practiceIndex} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardHeader>
                        <CardTitle className="text-base">{practice.title}</CardTitle>
                        <p className="text-sm text-gray-600">{practice.description}</p>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-1">
                          {practice.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="flex items-start text-sm text-gray-600">
                              <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                              {tip}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Step 5: Templates & Tips */}
          {currentStep === 4 && (
            <>
              {/* Discussion Guide Template */}
              <Card className="mb-6 border-0 bg-white rounded-xl overflow-hidden">
                <CardHeader>
                  <CardTitle>Discussion Guide Template</CardTitle>
                  <p className="text-gray-600">Adapt the questions to your specific topic and purpose</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {discussionGuideTemplate.map((section, index) => (
                      <div key={index} className="border-l-4 border-l-slate-200 pl-4">
                        <h4 className="font-semibold text-gray-900 mb-3">{section.section}</h4>
                        <ul className="space-y-2">
                          {section.questions.map((question, questionIndex) => (
                            <li key={questionIndex} className="text-sm text-gray-700">
                              • {question}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangleIcon className="h-5 w-5 text-slate-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h5 className="font-medium text-slate-800 mb-1">Moderator Tips</h5>
                        <p className="text-sm text-slate-700">
                          Always have follow-up questions ready: "Can you elaborate on that?", "What makes you feel that way?",
                          "Does everyone agree?". Let silence do its job - wait after questions and more answers will come.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Common Mistakes */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Common mistakes to avoid</h3>
                <div className="space-y-4">
                  {commonMistakes.map((mistake, index) => (
                    <Card key={index} className="border-0 bg-white rounded-xl overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertTriangleIcon className="h-4 w-4 text-slate-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-base font-semibold text-gray-900 mb-2">{mistake.mistake}</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Impact:</h5>
                                <p className="text-gray-600">{mistake.impact}</p>
                              </div>
                              <div>
                                <h5 className="font-medium text-gray-900 mb-1">Solution:</h5>
                                <p className="text-gray-600">{mistake.solution}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Call to Action - shown on all steps */}
        <Card className="border-0 bg-white rounded-xl overflow-hidden mt-8">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Plan your first focus group
              </h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Remember that focus groups provide insights about "why" and "how", not "what" or "how many".
                Always complement with other methods for a comprehensive picture.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/insights/getting-started">
                  <Button variant="primary">
                    Getting Started Guide
                  </Button>
                </Link>
                <Link href="/insights/interviews">
                  <Button variant="outline">
                    Compare with interviews
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

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
                <Link href="/insights">
                  <Button variant="primary" className="flex items-center space-x-2 px-6 py-2">
                    <span>Done</span>
                    <CheckCircleIcon className="h-4 w-4" />
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}