import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import QuestionDetail from "./pages/QuestionDetail";

function App() {
   return (
      <div>
         <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/questions/:id" element={<QuestionDetail />} />
         </Routes>
      </div>
   );
}

export default App;
