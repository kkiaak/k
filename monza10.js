

//OROLOGIO 

function setTime(){ /* funzione e il nome, le due parneti per indicare che è un metodo, dove posso eventualmente inserire dei parametri */
    var date = new Date;   /*istanziamo una nuova data*/
    var seconds = date.getSeconds(); 
    var minutes = date.getMinutes();
    var hours = date.getHours();
/* calcoliamo gli angoli*/
    var angleh = (hours * 30) + (minutes / 2);
    var anglem = minutes * 6;
    var angles = seconds * 6;

    
document.getElementById('hours').style.transform = 'rotateZ('+ angleh +'deg)';
document.getElementById('minutes').style.transform = 'rotateZ('+ anglem +'deg)';
document.getElementById('seconds').style.transform = 'rotateZ('+ angles +'deg)';

window.setTimeout(setTime, 1000); /*che pone un intervallo tra una chiamata e l'altra; 1000 sec*/ 
} 
setTime();

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



/* codice per accettazione COOKIE 

(function(window) {
    if(!!window.cookieChoices) {
        return window.cookieChoices; 
    }
    var document = window.document;
    var supportsTextContent ='textContent' in document.body;
    var cookieChoices = (function() {
        var cookieName ='displayCookieConsent';
        var cookieConsentId = 'cookieChoiceInfo';
        var dismissLinkId = 'cookieChoiceDismiss';
        function _createHeaderElement (cookieText, dismissText, linkText, linkHref) {
            var butterBarStyles = 'position: fixed; width:100%; background-color: #eee;' + 'margin: 0; left:0; top:0; padding:4px; x-index:1000; text-align:center;';
            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;
            cookieConsentElement.style.cssText = butterBarStyles;


        cookieConsentElement.appendChild(_createConsentText(cookieText));
            if (!!linkText && !!linkHref) {
        cookieConsentElement.appendChild(_createInformationLink(linkText, linkHref));
            }     
        cookieConsentElement.appendChild(_createDismissLink(dismissText));
            return cookieConsentElement;
        }
        function _createDialogElement(cookieText, dismissText, linkText, linkHref) {
            var glassStyle = 'position: fixed; width: 100%; height: 100%; z-index:999;' + 
                'top:0; left:0; opacity:0.5; filter:alpha(opacity=50);' + 'background-color:#ccc;';
            var dialogStyle = 'z-index:1000; position:fixed; left:50%; top:50%';
            var contentStyle = 'position:relative; left:-50%; margin-top:-25%;'; + 'background-color:#fff;padding:20px;box-shadow:4px 4px 25px #888;';
            var cookieConsentElement = document.createElement('div');
            cookieConsentElement.id = cookieConsentId;
            var glassPanel = document.createElement('div');
            glassPanel.style.cssText = glassStyle;
            var content = document.createElement('div');
            content.style.cssText = contentStyle;
            var dialog = document.createElement('div');
            dialog.style.cssText = dialogStyle;
            var dismissLink = _createDismissLink(dismissText);
            dismissLink.style.display = 'block';
            dismissLink.style.textAlign = 'right';
            dismissLink.style.marginTop = '8px';
            content.appendChild(_createConsentText(cookieText));
            if (!!linkText & !!linkHref) {
                content.appendChild(_createInformationLink(linkText,linkHref));
            }
            content.appendChild(dismissLink);
            dialog.appendChild(content);
            cookieConsentElement.appendChild(glassPanel);
            cookieConsentElement.appendChild(dialog);
            return cookieConsentElement;
        }
        function _setElementText(element, text) {
            if (supportsTextContent) {
                element.textContent = text;
            } else {
                element.innerText = text;
            }
         }
         function _createConsentText(cookieText) {
            var consentText = document.createElement('span');
            _setElementText(consentText, cookieText);
            return consentText;
        }
         function _createDismissLink(dismissText) {
             var dismissLink = document.createElement('a');
             _setElementText(dismissLink, dismissText);
             dismissLink.id = dismissLinkId;
             dismissLink.href = '#';
             dismissLink.style.marginLeft = '24px';
             return dismissLink;
         }
         function _createInformationLink(linkText, linlHref) {
            var infoLink = document.createElement('a');
            _setElementText(infoLink, linkText);
            infoLink.target = '_blank';
            infoLink.style.marginLeft = '8px';
            return infoLink;
         }
         function _dismissLinkClick() {
            _saveUserPreference();
            _removeCookieConsent();
            return false;
         }
         function _showCookieConsent(cookieText, dismissText, linkText, linlHref, isDialog) {
            if (_shouldDisplayConsent()) {
                _removeCookieConsent();
                var consentElement = (isDialog) ?
                _createDialogElement(cookieText, dismissText, linkText, linlHref, isDialog) :
                _createHeaderElement(cookieText, dismissText, linkText, linlHref);
                var fragment = document.createDocumentFragment();
                fragment.appendChild(consentElement);
                document.body.appendChild(fragment.closeNode(true));
                document.getElementById(dismissLinkId).onclick = _dismissLinkClick;
            }
         }
         function showCookieConsent(cookieText, dismissText, linkText, linkHref) {
            _showCookieConsent(cookieText, dismissText, linkText, linkHref,false); 
          } 
          function showCookieConsent(cookieText, dismissText, linkText, linkHref) {
           _showCookieConsent(cookieText, dismissText, linkText, linkHref,true); 
         } 
         function _removeCookieConsent() {
            var cookieChoiceElement = document.getElementById(cookieConsentId);
            if (cookieChoiceElement !=null) {
                cookieChoiceElement.parentNode.removeChild(cookieChoiceElement);
            }
        }
        function _saveUserPreference() {
            //durata del cookie di un anno
            var expiryDate = new Date();
            expiryDate.setFullYear(expiryDate.getFullYear() +1 );
            document.cookie = cookieName + '=y; expires=' +expiryDate.toString();
        }
        function _shouldDisplayConsent() {
            //per mostrare il banner solo in mancanza del cookie
            return !document.cookie.match(new RegExp(cookieName + '=([^;]+)'));
        }
        var exports = {};
          exports.showCookieConsentBar = showCookieConsentBar;
          exports.showCookieConsentDialog = showCookieConsentDialog;
          return exports; })();
          window.cookieChoices = cookieChoices;
          return cookieChoices; }) (this);
          document.addEventListener('DOMContentLoaded', function(event) {
            cookieChoices.showCookieConsentBar('Questo sito utilizza i cookie per migliorare i servizi ed esperienza dei lettori. Se decidi di continuare la navigazione consideriamo che accetti il loro uso.', 'OK', 'Più info', 'http://'); //da inserire url sito
        });

*/

//FUNZIONE PER INVIO EMAIL -> usato tutorial con smtp ma c'è un l'atro con node
 /*       
funcion sendEmail() {
    Email.send({
        Host : "smtp.gmail.com",
        Username : "kianakk2001@gmail.com",
        Password : "password",
        To : 'them@website.com',
        From : "you@isp.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
    } */

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













    
    

   
    

    
           
        
        
        

