import Layout from "./Wrapper/Layout"
import MainContent from "./components/MainContent"
import UnitContextProvider from "./context/UnitContext"


function App() {

  return (
    <>
    <UnitContextProvider>
      <Layout>
        <MainContent/>
      </Layout>
    </UnitContextProvider>  
    </>
  )
}

export default App
