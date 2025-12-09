// Вопросы для теста (проверяют понимание и применение, а не только запоминание)
const questions = [
    {
        id: 1,
        type: 'single',
        question: 'Что означает аббревиатура QA?',
        answers: [
            'Quality Assurance - обеспечение качества',
            'Quick Analysis - быстрый анализ',
            'Question Answering - ответы на вопросы',
            'Quality Analysis - анализ качества'
        ],
        correct: 0
    },
    {
        id: 2,
        type: 'single',
        question: 'Чем отличается работа QA от работы разработчика?',
        answers: [
            'QA проверяет функциональность, разработчик создает функциональность',
            'QA пишет код, разработчик тестирует',
            'QA и разработчик делают одно и то же',
            'QA работает только с багами, разработчик только с кодом'
        ],
        correct: 0
    },
    {
        id: 3,
        type: 'single',
        question: 'Чем отличается Bug от Issue?',
        answers: [
            'Bug - это ошибка в программе, Issue - более широкое понятие, включающее баги, задачи, улучшения',
            'Bug и Issue - это одно и то же',
            'Bug используется только для критических ошибок',
            'Issue используется только для новых функций'
        ],
        correct: 0
    },
    {
        id: 4,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы нашли проблему в форме регистрации - поле "Email" принимает некорректный формат (например, "test@" проходит валидацию). Какой тип Issue вы создадите?',
        answers: [
            'Bug - это ошибка в коде, которую нужно исправить',
            'Feature Request - это новая функция',
            'Improvement - это улучшение существующей функции',
            'Task - это техническая задача'
        ],
        correct: 0,
        explanation: 'Это ошибка в валидации email - программа работает не так, как ожидалось. Это Bug.'
    },
    {
        id: 5,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Пользователь предложил добавить возможность входа через социальные сети. Какой тип Issue вы создадите?',
        answers: [
            'Bug - это ошибка в коде',
            'Feature Request - это запрос на новую функциональность',
            'Improvement - это улучшение существующей функции',
            'Task - это техническая задача'
        ],
        correct: 1,
        explanation: 'Это запрос на новую функциональность, которой еще нет в системе. Это Feature Request.'
    },
    {
        id: 6,
        type: 'single',
        question: 'Что такое тест-кейс?',
        answers: [
            'Документированная последовательность шагов для проверки конкретной функциональности',
            'Список задач для тестирования',
            'План тестирования всего проекта',
            'Отчет о найденных багах'
        ],
        correct: 0
    },
    {
        id: 7,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы хотите проверить, что форма обратной связи отправляется с валидными данными. Что вы составите?',
        answers: [
            'Тест-кейс - детальная последовательность шагов для проверки',
            'Чек-лист - краткий список пунктов без детального описания',
            'Тест-план - стратегия тестирования всего проекта',
            'Баг-репорт - отчет о найденной ошибке'
        ],
        correct: 0,
        explanation: 'Для проверки конкретной функциональности (отправка формы) нужен тест-кейс с детальными шагами.'
    },
    {
        id: 8,
        type: 'single',
        question: 'Что такое чек-лист?',
        answers: [
            'Краткий список пунктов для проверки без детального описания шагов',
            'Детальная инструкция с пошаговыми действиями',
            'План тестирования проекта',
            'Список найденных багов'
        ],
        correct: 0
    },
    {
        id: 9,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы хотите быстро проверить основные элементы формы (кнопки, поля, ссылки) перед детальным тестированием. Что вы используете?',
        answers: [
            'Тест-кейс - детальная последовательность шагов',
            'Чек-лист - краткий список пунктов для быстрой проверки',
            'Тест-план - стратегия тестирования',
            'Баг-репорт - отчет об ошибке'
        ],
        correct: 1,
        explanation: 'Для быстрой проверки основных элементов используется чек-лист - краткий список без детальных шагов.'
    },
    {
        id: 10,
        type: 'multiple',
        question: 'Что включает в себя структура тест-кейса? (выберите все подходящие)',
        answers: [
            'ID и название',
            'Шаги выполнения',
            'Ожидаемый результат',
            'Стоимость разработки'
        ],
        correct: [0, 1, 2]
    },
    {
        id: 11,
        type: 'single',
        question: 'В чем основное отличие Manual QA от Automation QA?',
        answers: [
            'Manual QA тестирует вручную, Automation QA пишет код для автоматизации тестов',
            'Manual QA работает только с веб-приложениями',
            'Automation QA не находит баги, только автоматизирует',
            'Нет различий, это одно и то же'
        ],
        correct: 0
    },
    {
        id: 12,
        type: 'single',
        question: 'Какой опыт обычно требуется для уровня Junior QA?',
        answers: [
            '0-1 год',
            '1-3 года',
            '3+ лет',
            '5+ лет'
        ],
        correct: 0
    },
    {
        id: 13,
        type: 'single',
        question: 'Какой опыт обычно требуется для уровня Middle QA?',
        answers: [
            '1-3 года',
            '0-1 год',
            '3+ лет',
            '5+ лет'
        ],
        correct: 0
    },
    {
        id: 14,
        type: 'case',
        question: 'ПРАКТИЧЕСКИЙ КЕЙС: Вы нашли баг - кнопка "Отправить" не работает при нажатии. Какие характеристики бага вы опишете в баг-репорте?',
        answers: [
            'Только название бага',
            'Ожидаемое поведение, фактическое поведение, шаги воспроизведения',
            'Только скриншот',
            'Только приоритет'
        ],
        correct: 1,
        explanation: 'В баг-репорте нужно описать ожидаемое поведение (кнопка должна работать), фактическое поведение (кнопка не работает) и шаги воспроизведения (как найти баг).'
    },
    {
        id: 15,
        type: 'single',
        question: 'Какая основная цель QA специалиста?',
        answers: [
            'Обеспечение качества программного обеспечения',
            'Написание кода приложения',
            'Управление проектом',
            'Дизайн интерфейса'
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
