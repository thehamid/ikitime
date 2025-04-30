import './App.css'
import CurrencyDisplay from './components/currencies/price'
import FullCalendar from './components/date/fullCalendar'
import Footer from './components/footer/footer'
import Navbar from './components/navbar/navbar'
import MediaSlider from './components/slider/MediaSlider'
import {Time}  from './components/time/time'
import WeatherDisplay from './components/weather/weather'





function App() {



  const API_ENDPOINT = 'https://ikitime.ir/medias/list_media.php';


  return (
    <>
        <Navbar />
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-2 p-4 min-h-svh  z-0">
        <div className="col-span-1 justify-items-center p-4">
        <Time />
        <FullCalendar/>
         
          </div>
       
        <div className="lg:col-span-2 col-span-1 justify-items-center ">
        
        <MediaSlider apiUrl={API_ENDPOINT} imageDuration={20000} />

        </div>
         

        <div className="col-span-1 justify-self-center p-4">
        <WeatherDisplay/>
        <CurrencyDisplay/>

        </div>
          
        
        </main>
       
        <Footer />
    </>
  )
}

export default App
