// Элементы формы
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const messageInput = document.getElementById('message');
const agreeCheckbox = document.getElementById('agree');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');
const successMessage = document.getElementById('success-message');

// Преднамеренные баги для обучения (только 3 простых бага):
// 1. Валидация email принимает некорректный формат (например, "test@" проходит)
// 2. Телефон может принимать буквы
// 3. Пароль не проверяет минимальную длину корректно

// Валидация email (БАГ #1: принимает некорректный формат)
function validateEmail(email) {
    // Преднамеренный баг: проверка слишком простая, принимает "test@" как валидный
    const emailRegex = /^[^\s@]+@/; // Должно быть: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

// Валидация телефона (БАГ #2: может принимать буквы)
function validatePhone(phone) {
    // Преднамеренный баг: regex включает буквы
    const phoneRegex = /^[+]?[0-9\s\-\(\)a-zA-Z]+$/; // БАГ: добавлены буквы a-zA-Z
    const digitsOnly = phone.replace(/\D/g, '').length;
    // БАГ: проверяет минимум 5 цифр, но позволяет буквы
    return phoneRegex.test(phone) && digitsOnly >= 5;
}


// Валидация пароля (БАГ #3: не проверяет минимальную длину корректно)
function validatePassword(password) {
    // Преднамеренный баг: проверяет только если меньше 3, а не меньше 8
    if (password && password.length > 0 && password.length < 3) {
        return { valid: false, message: 'Пароль должен содержать минимум 8 символов' };
    }
    // БАГ: если пароль длиной от 3 до 7 символов, валидация проходит
    return { valid: true };
}


// Валидация имени
function validateName(name) {
    if (name.trim().length < 2) {
        return { valid: false, message: 'Имя должно содержать минимум 2 символа' };
    }
    if (name.trim().length > 50) {
        return { valid: false, message: 'Имя не должно превышать 50 символов' };
    }
    return { valid: true };
}

// Валидация сообщения
function validateMessage(message) {
    if (message.trim().length < 10) {
        return { valid: false, message: 'Сообщение должно содержать минимум 10 символов' };
    }
    // БАГ #3: максимальная длина может не работать корректно
    // В HTML указано maxlength="500", но проверка здесь может быть некорректной
    if (message.length > 500) {
        return { valid: false, message: 'Сообщение не должно превышать 500 символов' };
    }
    return { valid: true };
}

// Показ ошибки
function showError(input, errorElement, message) {
    input.classList.add('error');
    input.classList.remove('success');
    errorElement.textContent = message;
}

// Показ успеха
function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.textContent = '';
}

// Валидация в реальном времени
nameInput.addEventListener('blur', function() {
    const result = validateName(nameInput.value);
    const errorElement = document.getElementById('name-error');
    if (!result.valid) {
        showError(nameInput, errorElement, result.message);
    } else {
        showSuccess(nameInput, errorElement);
    }
});

emailInput.addEventListener('blur', function() {
    const errorElement = document.getElementById('email-error');
    if (!emailInput.value.trim()) {
        showError(emailInput, errorElement, 'Email обязателен для заполнения');
    } else if (!validateEmail(emailInput.value)) {
        // БАГ #1: валидация может пропускать некорректные форматы
        showError(emailInput, errorElement, 'Введите корректный email адрес');
    } else {
        showSuccess(emailInput, errorElement);
    }
});

messageInput.addEventListener('input', function() {
    // Обновление счетчика символов
    charCount.textContent = messageInput.value.length;
    
    // Ограничение максимальной длины
    if (messageInput.value.length > 500) {
        messageInput.value = messageInput.value.substring(0, 500);
        charCount.textContent = '500';
    }
    
    const errorElement = document.getElementById('message-error');
    const result = validateMessage(messageInput.value);
    if (!result.valid && messageInput.value.trim()) {
        showError(messageInput, errorElement, result.message);
    } else if (messageInput.value.trim()) {
        showSuccess(messageInput, errorElement);
    } else {
        messageInput.classList.remove('error', 'success');
        errorElement.textContent = '';
    }
});

// Проверка согласия
agreeCheckbox.addEventListener('change', function() {
    const errorElement = document.getElementById('agree-error');
    if (!agreeCheckbox.checked) {
        errorElement.textContent = 'Необходимо согласие для отправки формы';
    } else {
        errorElement.textContent = '';
    }
});

// Проверка формы перед отправкой
function validateForm() {
    let isValid = true;
    
    // Валидация имени
    const nameResult = validateName(nameInput.value);
    if (!nameResult.valid) {
        showError(nameInput, document.getElementById('name-error'), nameResult.message);
        isValid = false;
    } else {
        showSuccess(nameInput, document.getElementById('name-error'));
    }
    
    // Валидация email
    const emailErrorElement = document.getElementById('email-error');
    if (!emailInput.value.trim()) {
        showError(emailInput, emailErrorElement, 'Email обязателен для заполнения');
        isValid = false;
    } else if (!validateEmail(emailInput.value)) {
        // БАГ #1: валидация может пропускать некорректные форматы
        showError(emailInput, emailErrorElement, 'Введите корректный email адрес');
        isValid = false;
    } else {
        showSuccess(emailInput, emailErrorElement);
    }
    
    // Валидация телефона
    if (phoneInput) {
        const phoneErrorElement = document.getElementById('phone-error');
        if (!phoneInput.value.trim()) {
            showError(phoneInput, phoneErrorElement, 'Телефон обязателен для заполнения');
            isValid = false;
        } else if (!validatePhone(phoneInput.value)) {
            // БАГ #2: валидация может пропускать буквы
            showError(phoneInput, phoneErrorElement, 'Введите корректный номер телефона');
            isValid = false;
        } else {
            showSuccess(phoneInput, phoneErrorElement);
        }
    }
    
    // Валидация пароля
    if (passwordInput) {
        const passwordErrorElement = document.getElementById('password-error');
        if (!passwordInput.value.trim()) {
            showError(passwordInput, passwordErrorElement, 'Пароль обязателен для заполнения');
            isValid = false;
        } else {
            const passwordResult = validatePassword(passwordInput.value);
            if (!passwordResult.valid) {
                // БАГ #3: проверка минимальной длины может не работать
                showError(passwordInput, passwordErrorElement, passwordResult.message);
                isValid = false;
            } else {
                showSuccess(passwordInput, passwordErrorElement);
            }
        }
    }
    
    // Валидация подтверждения пароля
    if (passwordConfirmInput && passwordInput) {
        const passwordConfirmErrorElement = document.getElementById('password-confirm-error');
        if (!passwordConfirmInput.value.trim()) {
            showError(passwordConfirmInput, passwordConfirmErrorElement, 'Подтвердите пароль');
            isValid = false;
        } else if (passwordConfirmInput.value !== passwordInput.value) {
            showError(passwordConfirmInput, passwordConfirmErrorElement, 'Пароли не совпадают');
            isValid = false;
        } else {
            showSuccess(passwordConfirmInput, passwordConfirmErrorElement);
        }
    }
    
    // Валидация сообщения
    const messageResult = validateMessage(messageInput.value);
    if (!messageResult.valid) {
        showError(messageInput, document.getElementById('message-error'), messageResult.message);
        isValid = false;
    } else {
        showSuccess(messageInput, document.getElementById('message-error'));
    }
    
    // Проверка согласия
    const agreeErrorElement = document.getElementById('agree-error');
    if (!agreeCheckbox.checked) {
        agreeErrorElement.textContent = 'Необходимо согласие для отправки формы';
        isValid = false;
    } else {
        agreeErrorElement.textContent = '';
    }
    
    return isValid;
}

// Обработка отправки формы
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (!validateForm()) {
        // Прокрутка к первой ошибке
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return;
    }
    
    // Имитация отправки формы
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    setTimeout(function() {
        successMessage.style.display = 'block';
        contactForm.reset();
        charCount.textContent = '0';
        
        // Сброс стилей
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
        });
        
        const errorMessages = contactForm.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
        });
        
        // Сброс информации о файле
        const fileInfo = document.getElementById('file-info');
        if (fileInfo) {
            fileInfo.textContent = '';
        }
        
        // Сброс паролей (если они были видны)
        if (passwordInput && passwordInput.type === 'text') {
            passwordInput.type = 'password';
        }
        if (passwordConfirmInput && passwordConfirmInput.type === 'text') {
            passwordConfirmInput.type = 'password';
        }
        
        submitBtn.disabled = false;
        submitBtn.textContent = 'Отправить';
        
        // Прокрутка к сообщению об успехе
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Скрытие сообщения через 5 секунд
        setTimeout(function() {
            successMessage.style.display = 'none';
        }, 5000);
    }, 1000);
});

// Очистка формы
clearBtn.addEventListener('click', function() {
    contactForm.reset();
    charCount.textContent = '0';
    
    // Сброс стилей
    const inputs = contactForm.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.classList.remove('error', 'success');
    });
    
    const errorMessages = contactForm.querySelectorAll('.error-message');
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    successMessage.style.display = 'none';
    
    // Очистка информации о файле
    const fileInfo = document.getElementById('file-info');
    if (fileInfo) {
        fileInfo.textContent = '';
    }
    
});

// Валидация телефона в реальном времени
if (phoneInput) {
    phoneInput.addEventListener('blur', function() {
        const errorElement = document.getElementById('phone-error');
        if (!phoneInput.value.trim()) {
            showError(phoneInput, errorElement, 'Телефон обязателен для заполнения');
        } else if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, errorElement, 'Введите корректный номер телефона');
        } else {
            showSuccess(phoneInput, errorElement);
        }
    });
}

// Валидация пароля
if (passwordInput) {
    passwordInput.addEventListener('blur', function() {
        const errorElement = document.getElementById('password-error');
        if (!passwordInput.value.trim()) {
            showError(passwordInput, errorElement, 'Пароль обязателен для заполнения');
        } else {
            const passwordResult = validatePassword(passwordInput.value);
            if (!passwordResult.valid) {
                showError(passwordInput, errorElement, passwordResult.message);
            } else {
                showSuccess(passwordInput, errorElement);
            }
        }
    });
}

// Валидация подтверждения пароля
if (passwordConfirmInput) {
    passwordConfirmInput.addEventListener('blur', function() {
        const errorElement = document.getElementById('password-confirm-error');
        if (!passwordConfirmInput.value.trim()) {
            showError(passwordConfirmInput, errorElement, 'Подтвердите пароль');
        } else if (passwordInput && passwordConfirmInput.value !== passwordInput.value) {
            showError(passwordConfirmInput, errorElement, 'Пароли не совпадают');
        } else {
            showSuccess(passwordConfirmInput, errorElement);
        }
    });
}

// Управление состоянием кнопки отправки (без багов)
function updateSubmitButton() {
    const hasName = nameInput.value.trim().length > 0;
    const hasEmail = emailInput.value.trim().length > 0;
    const hasMessage = messageInput.value.trim().length > 0;
    const hasAgree = agreeCheckbox.checked;
    const hasPhone = phoneInput ? phoneInput.value.trim().length > 0 : true;
    const hasPassword = passwordInput ? passwordInput.value.trim().length > 0 : true;
    const hasPasswordConfirm = passwordConfirmInput ? passwordConfirmInput.value.trim().length > 0 : true;
    
    if (hasName && hasEmail && hasMessage && hasAgree && hasPhone && hasPassword && hasPasswordConfirm) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Отслеживание изменений для обновления кнопки
nameInput.addEventListener('input', updateSubmitButton);
emailInput.addEventListener('input', updateSubmitButton);
messageInput.addEventListener('input', updateSubmitButton);
agreeCheckbox.addEventListener('change', updateSubmitButton);
if (phoneInput) phoneInput.addEventListener('input', updateSubmitButton);
if (passwordInput) passwordInput.addEventListener('input', updateSubmitButton);
if (passwordConfirmInput) passwordConfirmInput.addEventListener('input', updateSubmitButton);


// Функция переключения видимости пароля
function togglePassword(fieldId) {
    const field = document.getElementById(fieldId);
    if (field) {
        if (field.type === 'password') {
            field.type = 'text';
        } else {
            field.type = 'password';
        }
    }
}


// Плавная прокрутка для навигационных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    updateSubmitButton();
    
    console.log('Сайт для практики тестирования загружен. Начните тестировать!');
    console.log('Тестируйте форму интуитивно, как обычный пользователь.');
});

