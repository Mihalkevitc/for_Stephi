// Функция для проверки ответа на конкретное задание
        function checkAnswer(taskId, correctAnswer, taskCardId) {
            const userAnswer = document.getElementById(taskId).value.trim();
            const taskCard = document.getElementById(taskCardId);

            if (userAnswer == ''){
                taskCard.classList.remove('incorrect');
                taskCard.classList.remove('correct');
                return;
            }

            const classCard = taskCard.className;
            const resultSpan = document.getElementById(taskCardId + '-result');


            // Сохраняем введённый ответ в localStorage (Если это не пустая строка - пользователь должен что-то ввести!)
                localStorage.setItem(taskId, userAnswer);
                localStorage.setItem(taskId + '-correct', correctAnswer);

            // Проверка правильности ответа
            if (userAnswer === correctAnswer) {
                taskCard.classList.remove('incorrect');
                taskCard.classList.add('correct');

                if (resultSpan) {
                    resultSpan.textContent = '✔️';
                }

            } else {
                taskCard.classList.remove('correct');
                taskCard.classList.add('incorrect');

                if (resultSpan) {
                    resultSpan.textContent = '❌';
                }

            }

        }


        const listOfCorrectAnswers = {
            'mini-task1': '6x + 12',
            'mini-task2': '4a^2 + 12a',
            'mini-task3': '15y^2 - 10y',
            'mini-task4': '2x^3 + 10x^2 - 6x',
            'mini-task5': '-3m^2 + 12m',
            'mini-task6': '6z^3 + 12z^2 + 6z',
            'mini-task7': '-4p^3 - 12p^2 + 4p',
            'mini-task8': '14x^3 + 7x^2 - 28x',
            'mini-task9': '-6a^3 - 10a^2 + 4a',
            'mini-task10': '8b^3 - 32b^2 + 48b',

            'mini-task11': '128',
            'mini-task12': '3x^6',
            'mini-task13': '5x',
            'mini-task14': 'x^10',
            'mini-task15': '6x^6',
            'mini-task16': 'x^1 * y^1',
            'mini-task17': '4x^6',
            'mini-task18': 'x^-2 * y^2',
            'mini-task19': '12x^8',
            'mini-task20': '10x^1',

            'task1': '6x^7 - 15x^6 + 12x^5 - 3x^4 + 21x^3',
            'task2': '-12y^6 + 8y^5 - 4y^4 + 28y^3 - 16y^2 + 4y',

            'task3': '20, 25, 15',
            'task4': '420',
            'task5': '20',

            'mini-task21': '2 * (x + 2)',
            'mini-task22': '3 * (x + 2)',
            'mini-task23': '5 * (x + 2)',
            'mini-task24': '2 * (x + 3y)',
            'mini-task25': '4x * (x + 2)',
            'mini-task26': '3x^2 * (2x + 3)',
            'mini-task27': '3 * (a + 3b)',
            'mini-task28': '2x * (x + 2)',
            'mini-task29': '6 * (x^2 + 2x - 3)',
            'mini-task30': '5x * (x^2 + 3x - 2)',
            'mini-task31': '4b^2 - 22b + 28'
        };


        // Привязка событий к кнопкам для проверки
        Object.keys(listOfCorrectAnswers).forEach(taskId => {
            const buttonId = `check-${taskId}`;

            if (!buttonId.includes("mini")){
                // Для обычных задач
                document.getElementById(buttonId).addEventListener("click", () => checkAnswer(taskId, listOfCorrectAnswers[taskId], `${taskId}-card`));
            } else {
                // Для задач типа min
                document.getElementById(buttonId).addEventListener("click", () => checkAnswer(`${taskId}-input`, listOfCorrectAnswers[taskId], taskId));
            }
        });

        // Функция для загрузки предыдущих ответов из localStorage
        function loadPreviousAnswers() {
            Object.keys(listOfCorrectAnswers).forEach(taskId => {

                if (taskId.includes("mini")){
                    taskId = `${taskId}-input`
                }

                const savedAnswer = localStorage.getItem(taskId);
                if (savedAnswer) {
                    document.getElementById(taskId).value = savedAnswer;
                }
            });
        }

        loadPreviousAnswers();

        // Функция для проверки всех заданий при загрузке страницы
        function checkAllAnswers() {
            Object.keys(listOfCorrectAnswers).forEach(taskId => {
                if (!taskId.includes("mini")){
                // Для обычных задач
                    checkAnswer(taskId, listOfCorrectAnswers[taskId], `${taskId}-card`);
                } else {
                    // Для задач типа mini
                    checkAnswer(`${taskId}-input`, listOfCorrectAnswers[taskId], taskId);
                }

            });
        }

        // Загрузка предыдущих ответов при загрузке страницы и проверка
        window.onload = function () {
                loadPreviousAnswers();
                checkAllAnswers(); // Проверка всех заданий после загрузки
        };
