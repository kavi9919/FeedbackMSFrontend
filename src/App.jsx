import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About, Navbar } from "./components";
import { ApplicationCanvas, HomeCanvas, SubscriptionCanvas } from "./components/canvas";
import { styles } from "./styles"; 
import Feedback from "./components/feedback/Feedback";


export default function App() {

  return (
    <BrowserRouter>
      {/* <div className={`${styles.primaryBg} w-full h-full`}>
        <div className="w-full h-full bg-cover bg-no-repeat bg-center">
          <Navbar />
          <HomeCanvas />
        </div>
        <div className={`bg-custom-radial w-full h-full bg-cover bg-no-repeat bg-center`}>
        <About />
        </div>
        <div className={`${styles.primaryBg} w-full h-full bg-cover bg-no-repeat bg-center`}>
        <ApplicationCanvas />
        </div>
        <div className={`bg-gradient-light-a w-full h-full bg-cover bg-no-repeat bg-center`}>
        <SubscriptionCanvas />
        </div>
      
      </div>  */}
      <Routes>
        <Route path="/" element={<HomeCanvas />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>  
    
    </BrowserRouter>
  )
}