import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StatusStrip from './components/StatusStrip'
import TestPlan from './components/TestPlan'
import CoverageReport from './components/CoverageReport'
import PipelineRuns from './components/PipelineRuns'
import QualityGates from './components/QualityGates'
import Deploy from './components/Deploy'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatusStrip />
        <TestPlan />
        <CoverageReport />
        <PipelineRuns />
        <QualityGates />
        <Deploy />
      </main>
    </>
  )
}
