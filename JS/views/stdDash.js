import * as User from '../models/UserModel.js';
import * as View from '../components/CourseCard.js'

export function renderDash(){
    let lUser = User.getUserLogged();
    
    if (!lUser) {
        console.error("No user logged in");
        window.location.href = "/";
    }

    //Render user
    let gretSection = document.getElementById("greeting-section");
    gretSection.innerHTML = `
    <h1 class="text-xl font-extrabold text-gray-900 mb-2">Olá, ${lUser.name}!</h1>
    <p class="text-gray-600 text-md">Este é o seu painel de controle.</p>
    `;

    //render courses
    let cardContainer = document.getElementById("card-container"); // Verifique se o ID está correto
       if (!cardContainer) {
           console.error("Card container not found");
           return; // Adicione um return se o container não for encontrado
       }

    let cardsData = [
        { 
      icon: '📚', 
      title: 'My Sessions', 
      tutorCount: User.getUserLogged().sessions.length // Número de sessões do usuário
    },
    { 
      icon: '🌐', 
      title: 'Community', 
      tutorCount: User.getUserLogged().community.length // Número de comunidades do usuário
    },
    { 
      icon: '📈', 
      title: 'Progress', 
      tutorCount: User.getUserLogged().progress.length // Número de itens de progresso do usuário
    }
    ];

    cardsData.forEach(cardInfo =>{
        if (cardInfo.tutorCount > 0) {
            let card = View.createCourseCard(cardInfo);
            cardContainer.appendChild(card);
        }
    });

    //se nao houver dados
    if (cardContainer.children.length === 0) {
        let noDataMessage = document.createElement('p');
        noDataMessage.className = 'text-gray-500 text-sm';
        noDataMessage.textContent = 'Nenhum dado disponível.';
        cardContainer.appendChild(noDataMessage);
    }
}

renderDash();

document.addEventListener('DOMContentLoaded', renderDash);