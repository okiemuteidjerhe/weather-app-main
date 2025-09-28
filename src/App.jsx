import Layout from "./Wrapper/Layout"
import MainContent from "./components/MainContent"
import WeatherContextProvider from "./context/WeatherContext"


function App() {

  return (
    <>
    <WeatherContextProvider>
      <Layout>
        <MainContent/>
      </Layout>
    </WeatherContextProvider>  
    </>
  )
}

export default App
