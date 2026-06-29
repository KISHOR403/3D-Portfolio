import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatusStrip from './components/StatusStrip'
import TestPlan from './components/TestPlan'
import Education from './components/Education'
import CoverageReport from './components/CoverageReport'
import PipelineRuns from './components/PipelineRuns'
import QualityGates from './components/QualityGates'
import Deploy from './components/Deploy'
import PipelineGridBg from './components/PipelineGridBg'

export default function App() {
  return (
    <>
      <PipelineGridBg />
      <Navbar />
      <main style={{ position: 'relative', zIndex: 1 }}>
        <Hero />
        <StatusStrip />
        <TestPlan />
        <Education />
        <CoverageReport />
        <PipelineRuns />
        <QualityGates />
        <Deploy />
      </main>
    </>
  )
}

