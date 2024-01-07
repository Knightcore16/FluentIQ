// main.js
/**
* Template Name: iPortfolio
* Updated: Nov 17 2023 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
    "use strict";
  
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim()
      if (all) {
        return [...document.querySelectorAll(el)]
      } else {
        return document.querySelector(el)
      }
    }
  
    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      let selectEl = select(el, all)
      if (selectEl) {
        if (all) {
          selectEl.forEach(e => e.addEventListener(type, listener))
        } else {
          selectEl.addEventListener(type, listener)
        }
      }
    }
  
    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener)
    }
  
    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
      let position = window.scrollY + 200
      navbarlinks.forEach(navbarlink => {
        if (!navbarlink.hash) return
        let section = select(navbarlink.hash)
        if (!section) return
        if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
          navbarlink.classList.add('active')
        } else {
          navbarlink.classList.remove('active')
        }
      })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)
  
    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
      let elementPos = select(el).offsetTop
      window.scrollTo({
        top: elementPos,
        behavior: 'smooth'
      })
    }
  
    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
      const toggleBacktotop = () => {
        if (window.scrollY > 100) {
          backtotop.classList.add('active')
        } else {
          backtotop.classList.remove('active')
        }
      }
      window.addEventListener('load', toggleBacktotop)
      onscroll(document, toggleBacktotop)
    }
  
    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function(e) {
      select('body').classList.toggle('mobile-nav-active')
      this.classList.toggle('bi-list')
      this.classList.toggle('bi-x')
    })
  
    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function(e) {
      if (select(this.hash)) {
        e.preventDefault()
  
        let body = select('body')
        if (body.classList.contains('mobile-nav-active')) {
          body.classList.remove('mobile-nav-active')
          let navbarToggle = select('.mobile-nav-toggle')
          navbarToggle.classList.toggle('bi-list')
          navbarToggle.classList.toggle('bi-x')
        }
        scrollto(this.hash)
      }
    }, true)
  
    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
      if (window.location.hash) {
        if (select(window.location.hash)) {
          scrollto(window.location.hash)
        }
      }
    });

    
  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  })()



  // JavaScript to toggle between login and sign-up forms
  document.addEventListener("DOMContentLoaded", function () {
    // Get references to the login, signup links, and forms
    var loginLink = document.getElementById("loginLink");
    var signupLink = document.getElementById("signupLink");
    var loginForm = document.getElementById("loginForm");
    var signupForm = document.getElementById("signupForm");

    // Toggle between login and sign-up forms on link click
    loginLink.addEventListener("click", function (event) {
      event.preventDefault();
      loginForm.style.display = loginForm.style.display === "none" ? "block" : "none";
      signupForm.style.display = "none";
    });

    signupLink.addEventListener("click", function (event) {
      event.preventDefault();
      signupForm.style.display = signupForm.style.display === "none" ? "block" : "none";
      loginForm.style.display = "none";
    });
  });



document.addEventListener('DOMContentLoaded', function () {
    // Simulated flashcard data
    const flashcards = [
        { term: 'Hello', definition: 'A common greeting in English.' },
        { term: 'Goodbye', definition: 'A common farewell in English.' }
    ];

    // Display flashcards
    const flashcardContainer = document.getElementById('flashcard-container');
    flashcards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('col-md-6', 'mb-3');
        cardDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${card.term}</h5>
                    <p class="card-text">${card.definition}</p>
                </div>
            </div>
        `;
        flashcardContainer.appendChild(cardDiv);
    });

    // Fetch quiz questions from Open Trivia Database
    const quizContainer = document.getElementById('quiz-container');
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
        .then(response => response.json())
        .then(data => displayQuizzes(data.results));
});

// Function to display quizzes
function displayQuizzes(questions) {
    const quizContainer = document.getElementById('quiz-container');
    questions.forEach((question, index) => {
        const quizDiv = document.createElement('div');
        quizDiv.classList.add('col-md-6', 'mb-3');
        quizDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Question ${index + 1}</h5>
                    <p class="card-text">${question.question}</p>
                    <ul>
                        ${question.incorrect_answers.map(answer => `<li>${answer}</li>`).join('')}
                    </ul>
                    <p>Correct Answer: ${question.correct_answer}</p>
                </div>
            </div>
        `;
        quizContainer.appendChild(quizDiv);
    });
}
