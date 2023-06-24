import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
   ArrowRightIcon,
   CalendarIcon,
   ChatBubbleLeftEllipsisIcon,
   ClockIcon,
   MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import dateFormater from "../utils/dateFormater";
import hourFormater from "../utils/hourFormater";

export default function HomePage() {
   const [questions, setQuestions] = useState([]);
   const [form, setForm] = useState({
      question: "",
      answers: [],
      user: "",
   });
   const [reload, setReload] = useState(false);
   const [search, setSearch] = useState("");
   const [filterType, setFilterType] = useState("all");

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

   console.log(filterType);

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

         {/* botões de filtro */}
         <div className="flex gap-4 mb-4 ">
            <button
               onClick={() => setFilterType("all")}
               className="bg-primary-button px-4 py-2 rounded shadow hover:bg-slate-600 hover:text-white"
            >
               Todas
            </button>
            <button
               onClick={() => setFilterType("answered")}
               className="bg-primary-button  px-4 py-2 rounded shadow hover:bg-slate-600 hover:text-white"
            >
               Respondidas
            </button>
            <button
               onClick={() => setFilterType("unanswered")}
               className="bg-primary-button  px-4 py-2 rounded shadow hover:bg-slate-600 hover:text-white"
            >
               Seja o primeiro
            </button>
         </div>

         {/* Search bar */}
         <div className="w-2/3 flex items-center">
            <MagnifyingGlassIcon className="h-6 w-6 text-accent absolute ml-2" />
            <input
               type="search"
               name="search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               className="p-2 border-none focus:outline-none w-full shadow pl-10"
            />
         </div>

         <div className="flex flex-col gap-4 sm:grid sm:grid-cols-2 sm:gap-10 mt-7">
            {questions
               .filter((question) => {
                  if (filterType === "all") {
                     return true;
                  }
                  if (filterType === "answered") {
                     return question.answers.length > 0;
                  }
                  if (filterType === "unanswered") {
                     return question.answers.length === 0;
                  }
               })
               .filter((question) => {
                  return (
                     question.question
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                     question.user.toLowerCase().includes(search.toLowerCase())
                  );
               })
               .map((question) => {
                  return (
                     <div
                        key={question._id}
                        className="p-4 bg-white rounded-lg shadow border-none min-h-[50px] flex flex-col justify-between"
                     >
                        <Link to={`/questions/${question._id}`}>
                           <div className="text-xs text-gray-400 flex justify-end mt-1 gap-2">
                              <div className="flex">
                                 <CalendarIcon className="h-4 w-6" />
                                 {dateFormater(question.createdAt)}
                              </div>
                              <div className="flex">
                                 <ClockIcon className="h-4 w-6" />
                                 {hourFormater(question.createdAt)}
                              </div>
                           </div>
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
