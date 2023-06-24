import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
   ArrowRightIcon,
   PencilSquareIcon,
   TrashIcon,
   XMarkIcon,
} from "@heroicons/react/24/outline";

export default function QuestionDetail() {
   const params = useParams();
   const navigate = useNavigate();

   const [question, setQuestion] = useState({});
   const [form, setForm] = useState({
      answer: "",
      user: "",
   });
   //state que vai dar o trigger no useEffect para rodar novamente e pegar as informações atualizadas
   const [reload, setReload] = useState(false);
   const [showFormEdit, setShowFormEdit] = useState(false);
   const [formEdit, setFormEdit] = useState({
      question: "",
   });

   useEffect(() => {
      async function fetchQuestion() {
         const response = await axios.get(
            `https://webdev103.cyclic.app/questions/${params.id}`
         );
         setQuestion(response.data);
         setFormEdit({ question: response.data.question });
      }

      fetchQuestion();
   }, [reload]);

   function handleChange(e) {
      setForm({ ...form, [e.target.name]: e.target.value });
   }
   function handleChangeEdit(e) {
      setFormEdit({ ...formEdit, [e.target.name]: e.target.value });
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

   async function handleSubmitEdit(e) {
      e.preventDefault();

      try {
         await axios.put(
            `https://webdev103.cyclic.app/questions/${params.id}`,
            formEdit
         );
         setShowFormEdit(false);
         setReload(!reload);
      } catch (error) {
         console.log(error);
      }
   }

   function handleShowFormEdit(e) {
      e.preventDefault();
      setShowFormEdit(false);
   }

   async function handleDelete(e) {
      e.preventDefault();

      try {
         await axios.delete(
            `https://webdev103.cyclic.app/questions/${params.id}`
         );

         navigate("/");
      } catch (error) {
         console.log(error);
      }
   }

   console.log(question);

   return (
      <div className="p-4">
         <div className="">
            <h1 className="text-2xl font-bold mb-2">{question.question}</h1>
            <p className="mb-4">Autor: {question.user}</p>
         </div>

         <button
            className=" font-bold py-2 px-4 rounded mb-4 flex gap-2"
            onClick={() => setShowFormEdit(true)}
         >
            <span className="underline text-[#0180C8]">Editar</span>
            <PencilSquareIcon
               className="w-6 h-6 text-[#0180C8]"
               alt="Editar pergunta"
            />{" "}
         </button>

         {showFormEdit && (
            <form className="fixed inset-0 z-50 flex flex-col justify-center items-center rounded w-full shadow-md bg-gray-300 bg-opacity-50">
               <div className="bg-white p-4 rounded shadow-lg w-2/3 ">
                  <button
                     className="w-full flex justify-end mb-2"
                     onClick={handleShowFormEdit}
                  >
                     <XMarkIcon
                        className="h-6 w-6 bg-accent  hover:bg-black hover:text-white"
                        title="Fechar"
                     />
                  </button>

                  <textarea
                     type="text"
                     name="question"
                     value={formEdit.question}
                     onChange={handleChangeEdit}
                     placeholder="Escreva sua pergunta..."
                     className="border w-full p-2 focus:outline-none resize-none"
                  />

                  <div className="flex justify-between items-center">
                     <button
                        onClick={handleSubmitEdit}
                        className="bg-accent px-6 focus:outline-none hover:bg-black hover:text-white"
                        title="Enviar alteração"
                     >
                        <ArrowRightIcon className="h-6 w-6" />
                     </button>
                     <TrashIcon
                        className="h-4 w-4 cursor-pointer hover:bg-red-400 hover:text-white"
                        title="Excluir pergunta"
                        onClick={handleDelete}
                     />
                  </div>
               </div>
            </form>
         )}

         <div className="border-b-2 mb-4 border-primary-button w-full m-auto"></div>

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

            {question.answers && !question.answers.length && (
               <p className="text-gray-400 text-center">
                  Pergunta sem resposta ainda...
               </p>
            )}
         </div>

         <div className="border-b-2 my-4 border-primary-button w-full m-auto"></div>

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
