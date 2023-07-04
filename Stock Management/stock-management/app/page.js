import Image from 'next/image'
import Header from '@/components/Header'
export default function Home() {
  return (
  <>
    <Header/>
     {/* Display current Stock */}
     <div className="container bg-red-50 mx-auto">
      <h1>Current Stock</h1>
     </div>

  </>
  )
    
}
