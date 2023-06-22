import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
   ChatBubbleLeftEllipsisIcon,
   QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

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
         await axios.post("https://webdev103.cyclic.app/questions", form);

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
      <div className="flex flex-col items-center justify-center">
         {/* <button
            onClick={() => setShowForm(!showForm)}
            className="bg-white p-5 font-bold text-xl border-2 tracking-wide border-black hover:bg-[#F0E4F2]"
         >
            Faça sua pergunta
         </button> */}

         <form className="m-4 border border-slate-200 p-5 shadow-md rounded w-full">
            <textarea
               type="text"
               name="question"
               value={form.question}
               onChange={handleChange}
               className="border-none w-full h-24 resize-none p-2 shadow focus:outline-none  "
               placeholder="Faça sua pergunta aqui..."
               required
            />

            <div className="flex justify-center items-center mt-4">
               <input
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  className="border-none w-full h-10 resize-none p-2 shadow focus:outline-none  "
                  placeholder="Seu nome..."
                  required
               />

               <button
                  onClick={handleSubmit}
                  className="
                     bg-primary-button
                     text-white
                     font-bold
                     py-2
                     px-6
                     tracking-wide
                     flex
                     gap-2
                  "
               >
                  <QuestionMarkCircleIcon className="h-6 w-6 text-black" />
               </button>
            </div>
         </form>

         <div className="flex flex-col gap-10 mt-7 sm:grid sm:grid-cols-2 ">
            {questions.map((question) => {
               return (
                  <div
                     key={question._id}
                     className="border p-4 flex flex-col gap-4 justify-between rounded bg-secondary-button shadow-sm border-none hover:bg-primary-button "
                  >
                     <Link to={`/questions/${question._id}`} className="p-2">
                        <p>{question.question}</p>
                     </Link>
                     <div className="flex justify-between bg-slate-100 p-1 ">
                        <p className="text-sm">./{question.user}</p>
                        <p>
                           {question.answers.length > 0 ? (
                              <span className="flex gap-2">
                                 {question.answers.length}
                                 <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-purple-500 mt-0.5" />{" "}
                              </span>
                           ) : (
                              <span className="flex gap-2">
                                 -
                                 <ChatBubbleLeftEllipsisIcon className="h-5 w-5 text-purple-500 mt-0.5" />
                              </span>
                           )}
                        </p>
                     </div>
                  </div>
               );
            })}
         </div>
      </div>
   );
}
