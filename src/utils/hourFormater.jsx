export default function hourFormater(data) {
   const dataObj = new Date(data);

   const hora = dataObj.getHours().toString().padStart(2, "0");
   const minutos = dataObj.getMinutes().toString().padStart(2, "0");

   return `${hora}:${minutos}`;
}
