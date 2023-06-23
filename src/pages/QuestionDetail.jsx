import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";

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
      <div className="p-4">
         <h1 className="text-2xl font-bold mb-2">{question.question}</h1>
         <p className="mb-4">Autor: {question.user}</p>

         <button className=" font-bold py-2 px-4 rounded mb-4 flex gap-2 ">
            <span className="underline text-[#0180C8]">Editar</span>
            <PencilSquareIcon
               className="w-6 h-6 text-[#0180C8]"
               alt="Editar pergunta"
            />{" "}
         </button>

         <div>
            {question.answers &&
               question.answers.map((answer) => {
                  return (
                     <div
                        key={answer.answer}
                        className="mb-4 bg-gray-100 p-4 rounded-lg"
                     >
                        <p className="text-gray-800">{answer.answer}</p>
                        <p className="text-gray-500">Dev: {answer.user}</p>
                     </div>
                  );
               })}
         </div>

         <form className="mb-4">
            <label className="block mb-2 font-bold">Resposta</label>
            <textarea
               className="border border-gray-300 p-2 w-full border-none focus:outline-none"
               rows={5}
               name="answer"
               value={form.answer}
               onChange={handleChange}
               placeholder="Ajude o dev..."
            />

            <div className="flex">
               <input
                  className="p-2 border-none focus:outline-none w-full"
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  placeholder="Seu nome..."
               />

               <button
                  onClick={handleSubmit}
                  className="bg-accent px-6 focus:outline-none hover:bg-black hover:text-white"
               >
                  <ArrowRightIcon className="h-6 w-6" />
               </button>
            </div>
         </form>
      </div>
   );
}
