import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatusStrip from './components/StatusStrip'
import TestPlan from './components/TestPlan'
import BeyondTheConsole from './components/BeyondTheConsole'
import Education from './components/Education'
import CoverageReport from './components/CoverageReport'
import PipelineRuns from './components/PipelineRuns'
import QALab from './components/QALab'
import QualityGates from './components/QualityGates'
import Deploy from './components/Deploy'
import PipelineGridBg from './components/PipelineGridBg'
import ResumeModal from './components/ResumeModal'
import TestSuiteModal from './components/TestSuiteModal'
import RecruiterView from './components/RecruiterView'
import Sidebar from './components/Sidebar'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)
  const [isRecruiterViewOpen, setIsRecruiterViewOpen] = useState(false)
  const [testSuiteProject, setTestSuiteProject] = useState(null)

  const openResumeModal = () => setIsResumeModalOpen(true)
  const closeResumeModal = () => setIsResumeModalOpen(false)

  const openRecruiterView = () => setIsRecruiterViewOpen(true)
  const closeRecruiterView = () => setIsRecruiterViewOpen(false)

  const openTestSuite = (projectTitle) => setTestSuiteProject(projectTitle)
  const closeTestSuite = () => setTestSuiteProject(null)

  const handlePreloaderComplete = () => {
    setIsLoading(false)
    setShowContent(true)
  }

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <Preloader key="preloader" onComplete={handlePreloaderComplete} />
        )}
      </AnimatePresence>

      {/* Main content with smooth entrance animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showContent ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <PipelineGridBg active={showContent} />
        <Sidebar />
        <Navbar
          onOpenResume={openResumeModal}
          onOpenRecruiterView={openRecruiterView}
        />
        <motion.main
          style={{ position: 'relative', zIndex: 1 }}
          initial={{ opacity: 0, y: 20 }}
          animate={showContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Hero onOpenResume={openResumeModal} />
          <StatusStrip />
          <TestPlan onOpenResume={openResumeModal} />
          <BeyondTheConsole />
          <Education />
          <CoverageReport />
          <PipelineRuns onViewTestSuite={openTestSuite} />
          <QALab />
          <QualityGates />
          <Deploy />
        </motion.main>
        <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
        <TestSuiteModal
          isOpen={!!testSuiteProject}
          onClose={closeTestSuite}
          projectTitle={testSuiteProject || ''}
        />
        <RecruiterView
          isOpen={isRecruiterViewOpen}
          onClose={closeRecruiterView}
          onOpenResume={openResumeModal}
        />
      </motion.div>
    </>
  )
}
