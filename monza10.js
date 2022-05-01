/*SCORRIMENTO IMMAGINI */
let slideIndex = 1;
          showSlides(slideIndex);
          
          function plusSlides(n) {
            showSlides(slideIndex += n);
          }
          
          function currentSlide(n) {
            showSlides(slideIndex = n);
          }
          
          function showSlides(n) {
            let i;
            let slides = document.getElementsByClassName("mySlides");
            let dots = document.getElementsByClassName("demo");
            let captionText = document.getElementById("caption");
            if (n > slides.length) {slideIndex = 1}
            if (n < 1) {slideIndex = slides.length}
            for (i = 0; i < slides.length; i++) {
              slides[i].style.display = "none";
            }
            for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
            }
            slides[slideIndex-1].style.display = "block";
            dots[slideIndex-1].className += " active";
            captionText.innerHTML = dots[slideIndex-1].alt;
          }

//INVIO EMAIL , lato client
//prendo il form 
const form = document.getElementById("contact-form")   

//creo il listener di eventi per quando l'utente invia il modulo
const formEvent = form.addEventListener("submit", (event) => {
    event.preventDefault();
    //quando evento viene attivato, creo oggetto FormData chiamato in base ai valori e ai relativi attributi nel form
    let mail = new FormData(form);
    //funzione chiamata e utilizza API Fetch per inviare URL 
    sendMail(mail);
});

//specifico f. sendMail()
const sendMail = (mail) => {
    //fornisco url di base per il fetch
    fetch("/send", {
        method: "post",   //specifico metodo perchè stiamo inviando dati, non ottenendo
        body : mail,       //specifico il corpo perchè stiamo inviato i dati nella richiesta mail
    }).then((response) => {
        return response.json();
    });
};

/*
function sendEmail() {
    Email.send({
        secureToken : "ce7ed4a1-b52e-45a9-96a0-539f8892250d",
        To : 'kkianakaviani@gmail.com',
        From : document.getElementById("email").nodeValue,
        Subject : "Nuova richiesta di contatto",
        Body : "Nome: " + document.getElementById("name").value 
              + "<br> Email: " + document.getElementById("email").value
              + "<br> Telefono: " + document.getElementById("phone").value
              + "<br> Il messaggio: " + document.getElementById("message").value
    }).then(
      message => alert("Messaggio inviato con successo")
    );
} 
   */ 
/* INVIO MAIL TRAMITE MODULO DI NODE : NODEMAILER
   const nodemailer = require ('nodemailer');
   
   const transporter = nodemailer.createTransport ( {
       service : "gmail",
       auth: {
           user: "kkianakaviani@gmail.com",
           pass: "meM0riaPienA"
       }
   });

   const options = {
       from: "kkianakaviani@gmail.com",
       to: "kiana.kavianikowsarkhizi@studenti.unimi.it",
       subject: "sending email with node.js",
       text: "that is simple"
   };

   transporter.sendMail(options,  function (err, info) {
       if(err)  {
           consle.log(err);
           return;
       }
       console.log("Sent: " + info.response);
   })

   */











    
    

   
    

    
           
        
        
        

