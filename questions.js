document.addEventListener('DOMContentLoaded', () => {
  const btnOpenQuiz = document.getElementById('btnOpenQuiz');
  const modalQuiz = document.getElementById('modalQuiz');
  const closeModal = document.querySelector('.close');
  const questionTitle = document.getElementById('questionTitle');
  const formAnswers = document.getElementById('formAnswers');
  const nextButton = document.getElementById('next');
  const prevButton = document.getElementById('prev');
  const sendButton = document.getElementById('send');

  const questions = [
    {
      question: "Якого кольору бургер?",
      answers: [
        { title: 'Стандарт', url: './image/burger.png' },
        { title: 'Чорний', url: './image/burgerBlack.png' }
      ],
      type: 'radio'
    },
    {
      question: "З якого м'яса котлета?",
      answers: [
        { title: 'Курка', url: './image/chickenMeat.png' },
        { title: 'Яловичина', url: './image/beefMeat.png' },
        { title: 'Свинина', url: './image/porkMeat.png' }
      ],
      type: 'radio'
    },
    {
      question: "Додаткові інгредінти ?",
      answers: [
        { title: 'Помідор', url: './image/tomato.png' },
        { title: 'Огірок', url: './image/cucumber.png' },
        { title: 'Салат', url: './image/salad.png' },
        { title: 'Цибуля', url: './image/onion.png' }
      ],
      type: 'checkbox'
    },
    {
      question: "Додати соус?",
      answers: [
        { title: 'Часниковий', url: './image/sauce1.png' },
        { title: 'Томатний', url: './image/sauce2.png' },
        { title: 'Гірчичний', url: './image/sauce3.png' }
      ],
      type: 'radio'
    }
  ];

  btnOpenQuiz.addEventListener('click', () => {
    modalQuiz.classList.add('d-block', 'show');
    playTest();
  });

  closeModal.addEventListener('click', () => {
    modalQuiz.classList.remove('d-block', 'show');
  });

  const playTest = () => {
    const finalAnswers = [];
    let numberQuestion = 0;

    const renderAnswers = (index) => {
      questions[index].answers.forEach((answer) => {
        const answerItem = document.createElement('div');
        answerItem.classList.add('answers-item', 'd-flex', 'flex-column');

        answerItem.innerHTML = `
          <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value="${answer.title}">
          <label for="${answer.title}" class="d-flex flex-column justify-content-between">
            <img class="answerImg" src="${answer.url}" alt="burger">
            <span>${answer.title}</span>
          </label>
        `;

        formAnswers.appendChild(answerItem);
      });
    };

    const renderQuestions = (indexQuestion) => {
      formAnswers.innerHTML = '';

      switch (true) {
        case (numberQuestion === 0):
          prevButton.classList.add('d-none');
          nextButton.classList.remove('d-none');
          sendButton.classList.add('d-none');
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          break;

        case (numberQuestion > 0 && numberQuestion <= questions.length - 1):
          prevButton.classList.remove('d-none');
          nextButton.classList.remove('d-none');
          sendButton.classList.add('d-none');
          questionTitle.textContent = `${questions[indexQuestion].question}`;
          renderAnswers(indexQuestion);
          break;

        case (numberQuestion === questions.length):
          questionTitle.textContent = '';
          prevButton.classList.add('d-none');
          nextButton.classList.add('d-none');
          sendButton.classList.remove('d-none');
          formAnswers.innerHTML = `
            <div class="form-group w-75 mx-auto text-center">
              <label for="numberPhone">Введіть номер телефону</label>
              <input type="phone" class="form-control" id="numberPhone" placeholder="+380...">
            </div>
          `;
          break;

        case (numberQuestion === questions.length + 1):
          questionTitle.textContent = '';
          prevButton.classList.add('d-none');
          nextButton.classList.add('d-none');
          sendButton.classList.add('d-none');
          formAnswers.innerHTML = `
            <div class="text-center py-4">
              <h4>Дякуємо! Наш менеджер з вами зв'яжеться.</h4>
            </div>
          `;
          setTimeout(() => {
            modalQuiz.classList.remove('d-block', 'show');
          }, 2000);
          break;
      }
    };

    renderQuestions(numberQuestion);

    const checkAnswer = () => {
      const obj = {};
      const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');

      inputs.forEach((input, index) => {
        if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
          obj[`${index}_${questions[numberQuestion].question}`] = input.value;
        }
        if (numberQuestion === questions.length) {
          obj['Номер телефону'] = input.value;
        }
      });

      finalAnswers.push(obj);
    };

    nextButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
    };

    prevButton.onclick = () => {
      numberQuestion--;
      renderQuestions(numberQuestion);
    };

    sendButton.onclick = () => {
      checkAnswer();
      numberQuestion++;
      renderQuestions(numberQuestion);
      console.log(finalAnswers);
    };
  };
});