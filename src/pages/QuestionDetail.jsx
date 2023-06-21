import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function QuestionDetail() {
   const params = useParams();

   const [question, setQuestion] = useState({});
   const [form, setForm] = useState({
      answer: "",
      user: "",
   });
   //state que vai dar o trigger no useEffect para rodar novamente e pegar as informações atualizadas
   const [reload, setReload] = useState(false);

   useEffect(() => {
      async function fetchQuestion() {
         const response = await axios.get(
            `https://webdev103.cyclic.app/questions/${params.id}`
         );
         setQuestion(response.data);
      }

      fetchQuestion();
   }, [reload]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         const response = await axios.put(
            `https://webdev103.cyclic.app/questions/${params.id}`,
            { answers: [...question.answers, form] }
         );
         //pedir para o useEffect rodar novamente
         setReload(!reload);
         //deixar o form vazio depois da resposta
         setForm({
            answer: "",
            user: "",
         });
      } catch (error) {
         console.log(error);
      }
   }

   console.log(question);

   return (
      <div>
         <h1>{question.question}</h1>
         <p>Autor: {question.user}</p>
         <button>Editar pergunta</button>

         <div>
            {question.answers &&
               question.answers.map((answer) => {
                  return (
                     <div key={answer.answer}>
                        <p>{answer.answer}</p>
                        <p>{answer.user}</p>
                     </div>
                  );
               })}
         </div>

         <form>
            <label>Resposta</label>
            <textarea
               type="text"
               rows={5}
               name="answer"
               value={form.answer}
               onChange={handleChange}
            />

            <label>Nome</label>
            <input
               type="text"
               name="user"
               value={form.user}
               onChange={handleChange}
            />

            <button onClick={handleSubmit}>Salvar Resposta</button>
         </form>
      </div>
   );
}
