import React from 'react'
import ModeToggle from './ModeToggle'

const Editor = () => {
  return (
    <div className='flex min-h-full'>
        <div
        className='py-6 px-4 min-w-48'
        >
            
            <div 
            className='pb-12 text-center'
            >
              {/* tombol toggle  */}
              <ModeToggle />
            </div>

            <div
            className='flex flex-col gap-4'
            >
              {/* active layer nya */}
            </div>
            
        </div>
    </div>
  )
}

export default Editor