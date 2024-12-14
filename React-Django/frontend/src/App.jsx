import { WebLayout } from "./Components/Utilities/WebLayout";
import ContentArea from "./Components/Pages/ContentArea";
import { Navbar } from "./Components/Utilities/Navbar";

function App() {
  return (
    <>
      <WebLayout navbar={<Navbar />} contentArea={<ContentArea />} />
    </>
  );
}

export default App;
