// Элементы формы
const contactForm = document.getElementById('contact-form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const birthdateInput = document.getElementById('birthdate');
const ageInput = document.getElementById('age');
const websiteInput = document.getElementById('website');
const passwordInput = document.getElementById('password');
const passwordConfirmInput = document.getElementById('password-confirm');
const fileInput = document.getElementById('file');
const ratingInput = document.getElementById('rating');
const messageInput = document.getElementById('message');
const agreeCheckbox = document.getElementById('agree');
const submitBtn = document.getElementById('submit-btn');
const clearBtn = document.getElementById('clear-btn');
const charCount = document.getElementById('char-count');
const successMessage = document.getElementById('success-message');

// Преднамеренные баги для обучения:
// 1. Валидация email может принимать некорректный формат (например, "test@" проходит) - РЕАЛЬНЫЙ БАГ
// 2. Телефон может принимать буквы (regex включает a-zA-Z, минимум 5 цифр вместо 10) - РЕАЛЬНЫЙ БАГ
// 3. Пароль не проверяет минимальную длину корректно (проверяет только < 3, а не < 8) - РЕАЛЬНЫЙ БАГ
// 4. Файл может загружать недопустимые типы (пустой тип проходит, проверка размера только > 10MB) - РЕАЛЬНЫЙ БАГ
// 5. Кнопка "Отправить" может быть активна даже при пустых обязательных полях (строка 544 закомментирована) - РЕАЛЬНЫЙ БАГ
// 6. Сообщения об ошибках могут отображаться некорректно (только в консоль, не всегда пользователю) - РЕАЛЬНЫЙ БАГ
// 7. Граничные значения не проверяются полностью (возраст проверяет 10-200 вместо 18-120) - РЕАЛЬНЫЙ БАГ
// 8. Копирование/вставка может обойти валидацию (можно вставить 501-600 символов в поле сообщения) - РЕАЛЬНЫЙ БАГ

// Валидация email (БАГ #1: принимает некорректный формат)
function validateEmail(email) {
    // Преднамеренный баг: проверка слишком простая, принимает "test@" как валидный
    const emailRegex = /^[^\s@]+@/; // Должно быть: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email);
}

// Валидация телефона (БАГ #2: может принимать буквы)
function validatePhone(phone) {
    // Преднамеренный баг: проверка может пропускать буквы в некоторых случаях
    // БАГ: regex включает буквы, но проверка цифр может быть обойдена
    const phoneRegex = /^[+]?[0-9\s\-\(\)a-zA-Z]+$/; // БАГ: добавлены буквы a-zA-Z
    // БАГ: проверка количества цифр может не работать, если есть буквы
    // БАГ: если в номере есть буквы, но общая длина >= 10 символов, проходит валидацию
    const digitsOnly = phone.replace(/\D/g, '').length;
    // БАГ: проверяет либо минимум 5 цифр, либо общую длину >= 10 (включая буквы)
    return phoneRegex.test(phone) && (digitsOnly >= 5 || phone.replace(/[\s\-\(\)]/g, '').length >= 10);
    // БАГ: номер "abc1234567" пройдет, так как общая длина >= 10, хотя есть буквы
}

// Валидация URL
function validateURL(url) {
    if (!url) return true; // Опциональное поле
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

// Валидация пароля (БАГ #3: не проверяет минимальную длину корректно)
function validatePassword(password) {
    // БАГ #3: проверка минимальной длины может не работать корректно
    // БАГ: проверка только при blur, но не при submit если поле не было в фокусе
    if (password && password.length > 0 && password.length < 3) {
        // БАГ: проверяет только если меньше 3, а не меньше 8
        return { valid: false, message: 'Пароль должен содержать минимум 8 символов' };
    }
    // Преднамеренный баг: проверка может пропускать слабые пароли
    // БАГ: если пароль пустой или длина от 3 до 7, валидация проходит
    return { valid: true };
}

// Валидация файла (БАГ #4: может загружать недопустимые типы)
function validateFile(file) {
    if (!file || !file.files[0]) return { valid: true };
    
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'text/plain', 'image/jpeg', 'image/png', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const fileType = file.files[0].type;
    const fileSize = file.files[0].size;
    const fileName = file.files[0].name.toLowerCase();
    
    // БАГ #4: проверка типов может быть неполной
    // БАГ: если fileType пустой или undefined, проверка пропускает файл
    // БАГ: также проверяет расширение файла, но некорректно
    if (fileType) {
        // БАГ: проверяет только если тип точно не в списке И не начинается с image/
        // БАГ: но пропускает некоторые типы, например application/vnd.ms-excel
        if (!allowedTypes.includes(fileType) && !fileType.startsWith('image/')) {
            // БАГ: дополнительная проверка по расширению, но она неполная
            const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png', '.gif'];
            const hasAllowedExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
            // БАГ: если расширение разрешено, файл проходит даже с недопустимым MIME-типом
            if (!hasAllowedExtension) {
                return { valid: false, message: 'Недопустимый тип файла' };
            }
        }
    }
    // БАГ: если fileType пустой, файл проходит валидацию без проверки
    
    // БАГ: проверка размера может не работать для очень больших файлов
    if (fileSize > maxSize * 2) { // БАГ: проверяет только если больше 10MB, а не 5MB
        return { valid: false, message: 'Файл слишком большой (максимум 5MB)' };
    }
    // БАГ: файлы от 5MB до 10MB проходят валидацию, хотя должны быть отклонены
    
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
    
    // БАГ #3: максимальная длина может не работать корректно
    // БАГ #8: при копировании/вставке можно вставить больше 500 символов
    // БАГ: проверка срабатывает только при input, но не при paste
    // В некоторых браузерах maxlength может не срабатывать
    if (messageInput.value.length > 600) { // БАГ: проверяет только если больше 600, а не 500
        messageInput.value = messageInput.value.substring(0, 500);
        charCount.textContent = '500';
    }
    // БАГ: можно вставить текст от 501 до 600 символов, и он пройдет
    
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
    
    // Валидация возраста (БАГ #7: граничные значения могут не проверяться)
    if (ageInput && ageInput.value) {
        const ageErrorElement = document.getElementById('age-error');
        const age = parseInt(ageInput.value);
        // БАГ #7: проверка граничных значений может быть неполной
        // БАГ: проверяет только если возраст меньше 5 или больше 150, а не 18-120
        // БАГ: значения от 5 до 17 и от 121 до 150 проходят валидацию, хотя должны быть ошибки
        if (age < 5 || age > 150) {
            showError(ageInput, ageErrorElement, 'Возраст должен быть от 18 до 120 лет');
            isValid = false;
        } else {
            // БАГ: даже если возраст вне диапазона 18-120, но в диапазоне 5-150, проходит валидацию
            showSuccess(ageInput, ageErrorElement);
        }
    }
    
    // Валидация URL
    if (websiteInput && websiteInput.value) {
        const websiteErrorElement = document.getElementById('website-error');
        if (!validateURL(websiteInput.value)) {
            showError(websiteInput, websiteErrorElement, 'Введите корректный URL');
            isValid = false;
        } else {
            showSuccess(websiteInput, websiteErrorElement);
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
    
    // Валидация файла
    if (fileInput && fileInput.files.length > 0) {
        const fileResult = validateFile(fileInput);
        const fileErrorElement = document.getElementById('file-error');
        if (!fileResult.valid) {
            // БАГ #4: файл может загружать недопустимые типы
            showError(fileInput, fileErrorElement, fileResult.message);
            isValid = false;
        } else {
            showSuccess(fileInput, fileErrorElement);
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
    
    // БАГ #2: кнопка может быть активна даже при пустых полях
    // В некоторых случаях проверка может не сработать корректно
    if (!validateForm()) {
        // БАГ #6: сообщения об ошибках могут отображаться некорректно
        // БАГ: ошибки выводятся только в консоль, но не всегда показываются пользователю
        // БАГ: если валидация не прошла, но ошибки не были показаны ранее, они могут не появиться
        console.log('Форма содержит ошибки');
        // БАГ: не вызывается scroll к первой ошибке, пользователь может не увидеть проблему
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
        
        // Сброс рейтинга
        if (ratingInput) {
            ratingInput.value = 5;
            const ratingValue = document.getElementById('rating-value');
            if (ratingValue) {
                ratingValue.textContent = '5';
            }
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

// Очистка формы (БАГ #5: может не очищать все поля)
clearBtn.addEventListener('click', function() {
    // БАГ #5: кнопка очистки может не очищать все поля корректно
    // В некоторых случаях некоторые поля могут остаться заполненными
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
    
    // Сброс рейтинга
    if (ratingInput) {
        ratingInput.value = 5;
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.textContent = '5';
        }
    }
    
    // БАГ #5: некоторые поля могут не очищаться (например, радиокнопки, toggle)
    // Это может быть проблемой в некоторых браузерах
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

// Валидация возраста (БАГ #7: граничные значения не проверяются)
if (ageInput) {
    ageInput.addEventListener('blur', function() {
        const errorElement = document.getElementById('age-error');
        if (ageInput.value) {
            const age = parseInt(ageInput.value);
            // БАГ #7: проверка граничных значений неполная
            // БАГ: проверяет только если возраст меньше 5 или больше 150, а не 18-120
            // БАГ: значения от 5 до 17 и от 121 до 150 проходят валидацию
            if (age < 5 || age > 150) {
                showError(ageInput, errorElement, 'Возраст должен быть от 18 до 120 лет');
            } else {
                // БАГ: даже если возраст вне диапазона 18-120, но в диапазоне 5-150, проходит валидацию
                showSuccess(ageInput, errorElement);
            }
        }
    });
}

// Валидация URL
if (websiteInput) {
    websiteInput.addEventListener('blur', function() {
        const errorElement = document.getElementById('website-error');
        if (websiteInput.value && !validateURL(websiteInput.value)) {
            showError(websiteInput, errorElement, 'Введите корректный URL');
        } else {
            showSuccess(websiteInput, errorElement);
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

// Обработка файла
if (fileInput) {
    fileInput.addEventListener('change', function() {
        const fileInfo = document.getElementById('file-info');
        const errorElement = document.getElementById('file-error');
        
        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const fileResult = validateFile(fileInput);
            
            if (!fileResult.valid) {
                showError(fileInput, errorElement, fileResult.message);
                fileInfo.textContent = '';
            } else {
                showSuccess(fileInput, errorElement);
                fileInfo.textContent = `Выбран файл: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`;
            }
        } else {
            fileInfo.textContent = '';
            errorElement.textContent = '';
        }
    });
}

// Обновление значения рейтинга
if (ratingInput) {
    ratingInput.addEventListener('input', function() {
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.textContent = ratingInput.value;
        }
    });
}

// Управление состоянием кнопки отправки
function updateSubmitButton() {
    // БАГ #2: кнопка может быть активна даже при пустых обязательных полях
    // Проверка может быть неполной
    const hasName = nameInput.value.trim().length > 0;
    const hasEmail = emailInput.value.trim().length > 0;
    const hasMessage = messageInput.value.trim().length > 0;
    const hasAgree = agreeCheckbox.checked;
    const hasPhone = phoneInput ? phoneInput.value.trim().length > 0 : true;
    const hasPassword = passwordInput ? passwordInput.value.trim().length > 0 : true;
    const hasPasswordConfirm = passwordConfirmInput ? passwordConfirmInput.value.trim().length > 0 : true;
    
    // Преднамеренный баг: проверка может быть неполной
    // В некоторых случаях кнопка остается активной даже при пустых полях
    if (hasName && hasEmail && hasMessage && hasAgree && hasPhone && hasPassword && hasPasswordConfirm) {
        submitBtn.disabled = false;
    } else {
        // БАГ #2: иногда кнопка не блокируется
        // submitBtn.disabled = true; // Закомментировано для демонстрации бага
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

// Функции для дополнительных элементов
function showAlert(message) {
    alert(message);
}

function confirmAction() {
    if (confirm('Вы уверены, что хотите выполнить это действие?')) {
        alert('Действие подтверждено!');
    } else {
        alert('Действие отменено.');
    }
}

function openModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Функции для секции контактов
function showSocialAlert(socialName) {
    alert(`Вы переходите на страницу ${socialName}. Это демонстрационная функция для тестирования.`);
}

function openContactModal() {
    const message = 'Для связи с нами используйте форму обратной связи выше или контактные данные на этой странице.';
    alert(message);
}

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

// Функция симуляции загрузки
function simulateLoading() {
    const btn = document.getElementById('loading-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const result = document.getElementById('loading-result');
    
    if (btnText && btnLoader) {
        btn.disabled = true;
        btnText.style.display = 'none';
        btnLoader.style.display = 'inline';
        
        setTimeout(function() {
            btn.disabled = false;
            btnText.style.display = 'inline';
            btnLoader.style.display = 'none';
            
            if (result) {
                result.textContent = 'Запрос успешно выполнен!';
                result.classList.add('show');
                
                setTimeout(function() {
                    result.classList.remove('show');
                }, 3000);
            }
        }, 2000);
    }
}

// Функция переключения вкладок
function openTab(event, tabId) {
    // Скрыть все вкладки
    const tabContents = document.getElementsByClassName('tab-content');
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove('active');
    }
    
    // Убрать активный класс со всех кнопок
    const tabButtons = document.getElementsByClassName('tab-btn');
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove('active');
    }
    
    // Показать выбранную вкладку
    document.getElementById(tabId).classList.add('active');
    
    // Добавить активный класс к нажатой кнопке
    if (event) {
        event.currentTarget.classList.add('active');
    }
}

// Функция переключения аккордеона
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Закрыть все аккордеоны (опционально - можно оставить открытыми несколько)
    const allItems = document.querySelectorAll('.accordion-item');
    allItems.forEach(accordionItem => {
        accordionItem.classList.remove('active');
    });
    
    // Открыть выбранный, если он был закрыт
    if (!isActive) {
        item.classList.add('active');
    }
}

// Инициализация tooltips
function initTooltips() {
    const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
    const tooltip = document.getElementById('tooltip');
    
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', function(e) {
            const tooltipText = this.getAttribute('data-tooltip');
            if (tooltipText && tooltip) {
                tooltip.textContent = tooltipText;
                tooltip.classList.add('show');
                
                const rect = this.getBoundingClientRect();
                tooltip.style.left = rect.left + (rect.width / 2) + 'px';
                tooltip.style.top = rect.top - 5 + 'px';
            }
        });
        
        trigger.addEventListener('mouseleave', function() {
            if (tooltip) {
                tooltip.classList.remove('show');
            }
        });
    });
}

// Закрытие модального окна по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

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
    
    // Обработчик клика вне модального окна (добавляется один раз)
    const modal = document.getElementById('modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    // Инициализация tooltips
    initTooltips();
    
    // Инициализация рейтинга
    if (ratingInput) {
        const ratingValue = document.getElementById('rating-value');
        if (ratingValue) {
            ratingValue.textContent = ratingInput.value;
        }
    }
    
    console.log('Сайт для практики тестирования загружен. Начните тестировать!');
    console.log('%c🐛 Подсказки о багах:', 'color: #e74c3c; font-weight: bold; font-size: 14px;');
    console.log('Ищите иконки 🐛 рядом с полями - они указывают на наличие багов!');
    console.log('Наведите курсор на иконку 🐛, чтобы увидеть подсказку.');
    console.log('');
    console.log('Преднамеренные баги для обучения:');
    console.log('1. 🐛 Email - Валидация принимает некорректный формат (попробуйте "test@" - пройдет)');
    console.log('2. 🐛 Телефон - Может принимать буквы (regex включает a-zA-Z, минимум 5 цифр вместо 10)');
    console.log('3. 🐛 Пароль - Не проверяет минимальную длину корректно (проверяет только < 3, а не < 8)');
    console.log('4. 🐛 Файл - Может загружать недопустимые типы (пустой тип проходит, проверка размера только > 10MB)');
    console.log('5. 🐛 Кнопки - Отправка активна при невалидных данных (строка 544 закомментирована), очистка может не работать');
    console.log('6. 🐛 Сообщения - Ошибки могут не показываться пользователю (только в консоль)');
    console.log('7. 🐛 Возраст - Граничные значения не проверяются полностью (проверяет 10-200 вместо 18-120)');
    console.log('8. 🐛 Копирование/вставка - Может обойти валидацию длины (можно вставить 501-600 символов)');
});

