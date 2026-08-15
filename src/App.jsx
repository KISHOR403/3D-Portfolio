import { useState } from 'react'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatusStrip from './components/StatusStrip'
import TestPlan from './components/TestPlan'
import BeyondTheConsole from './components/BeyondTheConsole'
import Education from './components/Education'
import CoverageReport from './components/CoverageReport'
import PipelineRuns from './components/PipelineRuns'
import QualityGates from './components/QualityGates'
import Deploy from './components/Deploy'
import PipelineGridBg from './components/PipelineGridBg'
import ResumeModal from './components/ResumeModal'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false)

  const openResumeModal = () => setIsResumeModalOpen(true)
  const closeResumeModal = () => setIsResumeModalOpen(false)

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      <PipelineGridBg />
      <Navbar onOpenResume={openResumeModal} />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero onOpenResume={openResumeModal} />
        <StatusStrip />
        <TestPlan onOpenResume={openResumeModal} />
        <BeyondTheConsole />
        <Education />
        <CoverageReport />
        <PipelineRuns />
        <QualityGates />
        <Deploy />
      </main>
      <ResumeModal isOpen={isResumeModalOpen} onClose={closeResumeModal} />
    </>
  )
}
