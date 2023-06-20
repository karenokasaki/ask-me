import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
   const [questions, setQuestions] = useState([]);

   useEffect(() => {
      async function fetchQuestions() {
         const response = await axios.get(
            "https://webdev103.cyclic.app/questions"
         );
         setQuestions(response.data);
      }

      fetchQuestions();
   }, []);

   return (
      <div>
         <h1>Home</h1>

         <div>
            {questions.map((question) => {
               return (
                  <div key={question._id}>
                     <Link to={`/questions/${question._id}`}>
                        <p>{question.question}</p>
                        <p>{question.user}</p>
                     </Link>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
