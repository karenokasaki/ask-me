import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
   ArrowRightIcon,
   ChatBubbleLeftEllipsisIcon,
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
         const response = await axios.post(
            "https://webdev103.cyclic.app/questions",
            form
         );

         setReload(!reload);
         setForm({
            question: "",
            answers: [],
            user: "",
         });
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <div className="flex flex-col items-center">
         <form className="border m-4 p-5 rounded w-full shadow-md">
            <textarea
               type="text"
               name="question"
               value={form.question}
               onChange={handleChange}
               placeholder="Escreva sua pergunta..."
               className="border-none w-full p-2 focus:outline-none resize-none"
            />

            <div className="flex">
               <input
                  type="text"
                  name="user"
                  value={form.user}
                  onChange={handleChange}
                  placeholder="Seu nome..."
                  className="p-2 border-none focus:outline-none w-full"
               />

               <button
                  onClick={handleSubmit}
                  className="bg-accent px-6 focus:outline-none hover:bg-black hover:text-white"
               >
                  <ArrowRightIcon className="h-6 w-6" />
               </button>
            </div>
         </form>

         <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10 mt-7">
            {questions.map((question) => {
               return (
                  <div
                     key={question._id}
                     className="p-4 bg-white rounded-lg shadow border-none min-h-[50px]"
                  >
                     <Link to={`/questions/${question._id}`}>
                        <p>{question.question}</p>
                     </Link>
                     <div className="flex justify-between mt-2 bg-slate-100 p-2">
                        <p className="text-sm">./{question.user}</p>
                        <p className="flex ">
                           {question.answers.length > 0 ? (
                              <span className="flex gap-1">
                                 {`${question.answers.length}`}
                                 <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mt-0.5" />
                              </span>
                           ) : (
                              <span className="flex gap-1">
                                 -
                                 <ChatBubbleLeftEllipsisIcon className="h-5 w-5 mt-0.5" />
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
