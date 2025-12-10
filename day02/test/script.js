// Вопросы для теста (проверяют понимание и применение, а не только запоминание)
const questions = [
    {
        id: 1,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы нашли баг: кнопка "Отправить" не работает. Какой заголовок баг-репорта будет правильным?',
        answers: [
            'Ошибка',
            'Кнопка не работает',
            'Кнопка "Отправить" не работает на странице формы обратной связи',
            'Форма не отправляется'
        ],
        correct: 2,
        explanation: 'Заголовок должен быть конкретным - указать что сломалось (кнопка) и где (страница формы).'
    },
    {
        id: 2,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: В баг-репорте указаны шаги: 1. Открыть сайт 2. Найти форму 3. Заполнить форму 4. Нажать кнопку. Что не так с этими шагами?',
        answers: [
            'Шаги правильные',
            'Шаги слишком общие, не указано что именно заполнять',
            'Не хватает скриншота',
            'Не указан приоритет'
        ],
        correct: 1,
        explanation: 'Шаги должны быть конкретными - указать какие поля заполнять, какими данными, чтобы другой человек мог точно повторить.'
    },
    {
        id: 3,
        type: 'single',
        question: 'Почему важно указывать ожидаемый результат в баг-репорте?',
        answers: [
            'Чтобы показать, что вы знаете, как должно работать',
            'Чтобы разработчик понял, что нужно исправить',
            'Чтобы было понятно, что именно сломалось',
            'Все вышеперечисленное'
        ],
        correct: 3
    },
    {
        id: 4,
        type: 'single',
        question: 'Какие статусы есть в жизненном цикле дефекта?',
        answers: [
            'New, Open, Fixed, Closed, Reopened',
            'Найден, Исправлен, Закрыт',
            'Критичный, Высокий, Средний, Низкий',
            'Новый, Старый, Исправленный'
        ],
        correct: 0
    },
    {
        id: 5,
        type: 'single',
        question: 'Что означает статус "New" в жизненном цикле дефекта?',
        answers: [
            'Баг найден, создан баг-репорт',
            'Разработчик взял баг в работу',
            'Разработчик исправил баг',
            'QA проверил, что баг исправлен'
        ],
        correct: 0
    },
    {
        id: 6,
        type: 'single',
        question: 'Что означает статус "Fixed" в жизненном цикле дефекта?',
        answers: [
            'Баг найден, создан баг-репорт',
            'Разработчик взял баг в работу',
            'Разработчик исправил баг',
            'QA проверил, что баг исправлен'
        ],
        correct: 2
    },
    {
        id: 7,
        type: 'single',
        question: 'Что означает статус "Reopened" в жизненном цикле дефекта?',
        answers: [
            'Баг исправлен',
            'Баг не исправлен, нужно вернуть разработчику',
            'Баг закрыт',
            'Баг в работе'
        ],
        correct: 1
    },
    {
        id: 8,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы нашли баг - кнопка "Войти" не работает, пользователь не может войти в систему. Какой приоритет у этого бага?',
        answers: [
            'Высокий - блокирует работу пользователя, критичная функция не работает',
            'Средний - функция работает неправильно, но есть обходной путь',
            'Низкий - косметическая проблема',
            'Не важно'
        ],
        correct: 0,
        explanation: 'Кнопка "Войти" не работает - это блокирует основную функциональность (вход в систему). Это Высокий приоритет.'
    },
    {
        id: 9,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы нашли баг - опечатка в сообщении об ошибке ("Ошбка" вместо "Ошибка"). Какой приоритет у этого бага?',
        answers: [
            'Высокий - блокирует работу пользователя',
            'Средний - функция работает неправильно',
            'Низкий - косметическая проблема, не влияет на функциональность',
            'Не важно'
        ],
        correct: 2,
        explanation: 'Опечатка в тексте - это косметическая проблема, которая не влияет на функциональность. Это Низкий приоритет.'
    },
    {
        id: 10,
        type: 'multiple',
        question: 'Что должно быть в структуре баг-репорта? (выберите все подходящие)',
        answers: [
            'Заголовок',
            'Описание',
            'Шаги воспроизведения',
            'Стоимость разработки'
        ],
        correct: [0, 1, 2]
    },
    {
        id: 11,
        type: 'single',
        question: 'Зачем нужны скриншоты в баг-репорте?',
        answers: [
            'Чтобы было красиво',
            'Чтобы показать проблему визуально и помочь разработчику быстрее понять проблему',
            'Чтобы скриншот был больше',
            'Скриншоты не нужны'
        ],
        correct: 1
    },
    {
        id: 12,
        type: 'single',
        question: 'Что такое ретест в жизненном цикле дефекта?',
        answers: [
            'Повторное тестирование исправленного бага QA',
            'Повторное тестирование всех функций',
            'Тестирование новой функции',
            'Проверка кода разработчиком'
        ],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let userAnswers = {};
let totalQuestions = questions.length;

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('total-questions').textContent = totalQuestions;
    document.getElementById('total-questions-counter').textContent = totalQuestions;
    
    document.getElementById('start-btn').addEventListener('click', startTest);
    document.getElementById('next-btn').addEventListener('click', nextQuestion);
    document.getElementById('prev-btn').addEventListener('click', prevQuestion);
    document.getElementById('finish-btn').addEventListener('click', finishTest);
    document.getElementById('restart-btn').addEventListener('click', restartTest);
});

function startTest() {
    document.getElementById('intro-screen').classList.remove('active');
    document.getElementById('test-screen').classList.add('active');
    currentQuestionIndex = 0;
    userAnswers = {};
    showQuestion();
}

function showQuestion() {
    const question = questions[currentQuestionIndex];
    const container = document.getElementById('question-container');
    
    // Обновляем счетчик
    document.getElementById('current-question').textContent = currentQuestionIndex + 1;
    
    // Обновляем прогресс
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Определяем тип вопроса
    let questionTypeLabel = '';
    if (question.type === 'single') {
        questionTypeLabel = 'Выбор одного ответа';
    } else if (question.type === 'multiple') {
        questionTypeLabel = 'Множественный выбор';
    } else if (question.type === 'case') {
        questionTypeLabel = 'Практический кейс';
    }
    
    // Создаем HTML для вопроса
    let html = `<div class="question">
        <span class="question-type">${questionTypeLabel}</span>
        <div>${question.question}</div>
    </div>`;
    
    html += '<ul class="answers">';
    question.answers.forEach((answer, index) => {
        const inputType = question.type === 'multiple' ? 'checkbox' : 'radio';
        const inputName = question.type === 'multiple' ? `question-${question.id}-${index}` : `question-${question.id}`;
        const checked = userAnswers[question.id] && 
            (question.type === 'multiple' 
                ? userAnswers[question.id].includes(index)
                : userAnswers[question.id] === index) ? 'checked' : '';
        
        html += `
            <li class="answer-item">
                <label class="answer-label">
                    <input type="${inputType}" name="${inputName}" value="${index}" ${checked}>
                    <span class="answer-text">${answer}</span>
                </label>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    
    // Добавляем обработчики событий
    const inputs = container.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', function() {
            saveAnswer();
            updateNavigationButtons();
        });
    });
    
    updateNavigationButtons();
}

function saveAnswer() {
    const question = questions[currentQuestionIndex];
    const inputs = document.querySelectorAll(`input[name^="question-${question.id}"]`);
    
    if (question.type === 'multiple') {
        const selected = [];
        inputs.forEach(input => {
            if (input.checked) {
                selected.push(parseInt(input.value));
            }
        });
        userAnswers[question.id] = selected.length > 0 ? selected : null;
    } else {
        inputs.forEach(input => {
            if (input.checked) {
                userAnswers[question.id] = parseInt(input.value);
            }
        });
    }
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const finishBtn = document.getElementById('finish-btn');
    
    prevBtn.disabled = currentQuestionIndex === 0;
    
    if (currentQuestionIndex === totalQuestions - 1) {
        nextBtn.style.display = 'none';
        finishBtn.style.display = 'inline-block';
    } else {
        nextBtn.style.display = 'inline-block';
        finishBtn.style.display = 'none';
    }
}

function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function finishTest() {
    saveAnswer();
    showResults();
}

function showResults() {
    document.getElementById('test-screen').classList.remove('active');
    document.getElementById('results-screen').classList.add('active');
    
    let correctCount = 0;
    const resultsDetails = document.getElementById('results-details');
    let detailsHTML = '';
    
    questions.forEach((question, index) => {
        const userAnswer = userAnswers[question.id];
        let isCorrect = false;
        
        if (question.type === 'multiple') {
            if (userAnswer && Array.isArray(userAnswer)) {
                const userSet = new Set(userAnswer.sort());
                const correctSet = new Set(question.correct.sort());
                isCorrect = userSet.size === correctSet.size && 
                           [...userSet].every(val => correctSet.has(val));
            }
        } else {
            isCorrect = userAnswer === question.correct;
        }
        
        if (isCorrect) {
            correctCount++;
        }
        
        detailsHTML += `<div class="result-item ${isCorrect ? 'correct' : 'incorrect'}">`;
        detailsHTML += `<div class="result-question">${index + 1}. ${question.question}</div>`;
        
        if (question.type === 'multiple') {
            const correctAnswersText = question.correct.map(idx => question.answers[idx]).join(', ');
            const userAnswersText = userAnswer && userAnswer.length > 0
                ? userAnswer.map(idx => question.answers[idx]).join(', ')
                : 'Не отвечено';
            
            detailsHTML += `<div class="result-answer">`;
            detailsHTML += `<span class="correct-answer">✓ Правильные ответы: ${correctAnswersText}</span>`;
            if (!isCorrect) {
                detailsHTML += `<span class="user-answer">✗ Ваши ответы: ${userAnswersText}</span>`;
            } else {
                detailsHTML += `<span class="correct-answer">✓ Вы ответили правильно!</span>`;
            }
            detailsHTML += `</div>`;
        } else {
            const correctAnswerText = question.answers[question.correct];
            const userAnswerText = userAnswer !== undefined && userAnswer !== null 
                ? question.answers[userAnswer] 
                : 'Не отвечено';
            
            detailsHTML += `<div class="result-answer">`;
            detailsHTML += `<span class="correct-answer">✓ Правильный ответ: ${correctAnswerText}</span>`;
            if (!isCorrect) {
                detailsHTML += `<span class="user-answer">✗ Ваш ответ: ${userAnswerText}</span>`;
            } else {
                detailsHTML += `<span class="correct-answer">✓ Вы ответили правильно!</span>`;
            }
            
            // Добавляем объяснение для практических кейсов
            if (question.type === 'case' && question.explanation) {
                detailsHTML += `<div class="explanation">💡 <strong>Объяснение:</strong> ${question.explanation}</div>`;
            }
            
            detailsHTML += `</div>`;
        }
        
        detailsHTML += `</div>`;
    });
    
    resultsDetails.innerHTML = detailsHTML;
    
    // Обновляем счет
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    document.getElementById('score-percentage').textContent = percentage;
    document.getElementById('correct-answers').textContent = correctCount;
    document.getElementById('total-answers').textContent = totalQuestions;
    
    // Сохраняем результат в localStorage
    localStorage.setItem('lastTestScore', percentage);
    localStorage.setItem('lastTestDate', new Date().toLocaleString('ru-RU'));
}

function restartTest() {
    document.getElementById('results-screen').classList.remove('active');
    document.getElementById('intro-screen').classList.add('active');
    currentQuestionIndex = 0;
    userAnswers = {};
}

