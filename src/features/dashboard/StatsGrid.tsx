import React from 'react'

function StatsGrid() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4'>
        <div className='bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 border border-slate-200/20 dark:hover:shadow-slate-900/20'></div>
    </div>
  )
}

export default StatsGrid