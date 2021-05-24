import {Navbar} from "./components/navbar/Navbar";
import {LandingPage} from "./components/LandingPage/LandingPage";


function App() {
  return (
    <div>
      <Navbar />
      <div style={{marginTop: "2em"}}>
          <LandingPage />
            <a href='https://www.freepik.com/vectors/people' style={{display:"none"}}>People vector created by pikisuperstar - www.freepik.com</a>
      </div>
  </div>
  );
}

export default App;
