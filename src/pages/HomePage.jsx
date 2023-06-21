import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HomePage() {
   const [questions, setQuestions] = useState([]);
   const [form, setForm] = useState({
      question: "",
      answers: [],
      user: "",
   });
   const [reload, setReload] = useState(false);
   const [showForm, setShowForm] = useState(false);

   useEffect(() => {
      async function fetchQuestions() {
         const response = await axios.get(
            "https://webdev103.cyclic.app/questions"
         );
         setQuestions(response.data);
      }

      fetchQuestions();
   }, [reload]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();
      try {
         const response = await axios.post(
            "https://webdev103.cyclic.app/questions",
            form
         );

         setReload(!reload);
         setForm({
            question: "",
            asnswers: [],
            user: "",
         });
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div>
         <h1>Ask Me!</h1>

         <button onClick={() => setShowForm(!showForm)}>
            Faça uma pergunta!
         </button>

         {showForm === true && (
            <form>
               <label>Pergunta</label>
               <textarea
                  type="text"
                  name="question"
                  value={form.question}
                  onChange={handleChange}
               />

               <label>Nome</label>
               <input
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
               />

               <button onClick={handleSubmit}>Perguntar!</button>
            </form>
         )}

         <div>
            {questions.map((question) => {
               return (
                  <div key={question._id}>
                     <Link to={`/questions/${question._id}`}>
                        <p>{question.question}</p>
                        <p>{question.user}</p>
                        <p>
                           {question.answers.length > 0
                              ? `${question.answers.length} respostas`
                              : "Ainda não teve resposta"}
                        </p>
                     </Link>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
