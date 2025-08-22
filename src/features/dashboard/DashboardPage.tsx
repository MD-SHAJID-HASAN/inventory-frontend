import ChartSection from "./ChartSection"
import StatsGrid from "./StatsGrid"
import TableSection from "./TableSection"

function DashboardPage() {
  return (
    <div>
      <StatsGrid></StatsGrid>
      <ChartSection></ChartSection>
      <TableSection></TableSection>
    </div>
  )
}

export default DashboardPage