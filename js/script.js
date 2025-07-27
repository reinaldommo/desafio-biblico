        // PWA Service Worker Registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('sw.js')
                    .then((registration) => {
                        console.log('SW registered: ', registration);
                    })
                    .catch((registrationError) => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }

        // PWA Install Prompt
        let deferredPrompt;
        const installBanner = document.getElementById('installBanner');
        const installBtn = document.getElementById('installBtn');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBanner.style.display = 'block';
        });

        installBtn.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the install prompt');
                        installBanner.style.display = 'none';
                    }
                    deferredPrompt = null;
                });
            }
        });

        // Hide install banner if already installed
        window.addEventListener('appinstalled', () => {
            installBanner.style.display = 'none';
            console.log('PWA was installed');
        });

        // Seu código JavaScript original aqui...


        let availableQuestions = {
            easy: [...questions.easy],
            medium: [...questions.medium],
            hard: [...questions.hard]
        };

        let currentQuestion = null;
        let eliminateUsed = false;
        let pastorUsed = false;
        let skipsRemaining = 3;
        let eliminatedOptions = [];
        let questionAnswered = false;

        function updateStats() {
            document.getElementById('easyCount').textContent = availableQuestions.easy.length + availableQuestions.medium.length;
            document.getElementById('hardCount').textContent = availableQuestions.hard.length;
            
            const eliminateStatus = document.getElementById('eliminateStatus');
            const pastorStatus = document.getElementById('pastorStatus');
            const skipStatus = document.getElementById('skipStatus');
            
            eliminateStatus.className = eliminateUsed ? 'help-counter used' : 'help-counter';
            pastorStatus.className = pastorUsed ? 'help-counter used' : 'help-counter';
            skipStatus.textContent = `⏭️ Pular (${skipsRemaining} restantes)`;
            skipStatus.className = skipsRemaining === 0 ? 'help-counter used' : 'help-counter';
        }

        function drawQuestion(difficulty) {
            let questionPool;
            
            if (difficulty === 'easy') {
                questionPool = [...availableQuestions.easy, ...availableQuestions.medium];
            } else {
                questionPool = availableQuestions.hard;
            }

            if (questionPool.length === 0) {
                alert(difficulty === 'easy' ? 
                    '🎉 Parabéns! Todas as perguntas fáceis e médias foram sorteadas!' : 
                    '🎉 Parabéns! Todas as perguntas difíceis foram sorteadas!');
                return;
            }

            const randomIndex = Math.floor(Math.random() * questionPool.length);
            currentQuestion = questionPool[randomIndex];
            
            if (difficulty === 'easy') {
                if (availableQuestions.easy.includes(currentQuestion)) {
                    availableQuestions.easy = availableQuestions.easy.filter(q => q !== currentQuestion);
                } else {
                    availableQuestions.medium = availableQuestions.medium.filter(q => q !== currentQuestion);
                }
            } else {
                availableQuestions.hard = availableQuestions.hard.filter(q => q !== currentQuestion);
            }

            eliminatedOptions = [];
            questionAnswered = false;
            displayQuestion();
            updateStats();
        }

        function displayQuestion() {
            const display = document.getElementById('questionDisplay');
            const difficultyClass = getDifficultyClass(currentQuestion);
            const difficultyText = getDifficultyText(currentQuestion);
            
            let optionsHtml = '';
            currentQuestion.options.forEach((option, index) => {
                const isEliminated = eliminatedOptions.includes(index);
                optionsHtml += `
                    <div class="option ${isEliminated ? 'eliminated' : ''}" 
                         onclick="${isEliminated || questionAnswered ? '' : `selectOption(${index})`}">
                        ${String.fromCharCode(65 + index)}) ${option}
                    </div>
                `;
            });
            
            display.innerHTML = `
                <div class="difficulty-badge ${difficultyClass}">${difficultyText}</div>
                <div class="question-text">${currentQuestion.q}</div>
                
                <div class="help-buttons">
                    <button class="help-btn help-eliminate" 
                            onclick="useEliminate()" 
                            ${eliminateUsed || eliminatedOptions.length > 0 || questionAnswered ? 'disabled' : ''}>
                        ❌ Eliminar 2 Opções
                    </button>
                    <button class="help-btn help-pastor" 
                            onclick="usePastor()" 
                            ${pastorUsed || questionAnswered ? 'disabled' : ''}>
                        🙏 Perguntar ao Pastor
                    </button>
                    <button class="help-btn help-skip" 
                            onclick="useSkip()" 
                            ${skipsRemaining === 0 ? 'disabled' : ''}>
                        ⏭️ Pular (${skipsRemaining})
                    </button>
                </div>
                
                <div class="options-container">
                    ${optionsHtml}
                </div>
                
                <div class="answer-section" style="display: none;" id="answerSection">
                    <div class="answer-text" id="answerText"></div>
                </div>
            `;
        }

        function selectOption(selectedIndex) {
            if (questionAnswered) return;
            
            questionAnswered = true;
            const options = document.querySelectorAll('.option');
            const answerSection = document.getElementById('answerSection');
            const answerText = document.getElementById('answerText');
            
            options.forEach((option, index) => {
                option.classList.add('selected');
                if (index === selectedIndex) {
                    if (index === currentQuestion.correct) {
                        option.classList.add('correct');
                    } else {
                        option.classList.add('wrong');
                    }
                } else if (index === currentQuestion.correct) {
                    option.classList.add('correct');
                }
            });
            
            if (selectedIndex === currentQuestion.correct) {
                answerText.innerHTML = `
                    <h4>🎉 CORRETO!</h4>
                    <p>Resposta: ${currentQuestion.options[currentQuestion.correct]}</p>
                    <p><strong>Referência:</strong> ${currentQuestion.ref}</p>
                `;
                answerText.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            } else {
                answerText.innerHTML = `
                    <h4>❌ INCORRETO!</h4>
                    <p>Resposta correta: ${currentQuestion.options[currentQuestion.correct]}</p>
                    <p><strong>Referência:</strong> ${currentQuestion.ref}</p>
                `;
                answerText.style.background = 'linear-gradient(135deg, #F44336, #D32F2F)';
            }
            
            answerSection.style.display = 'block';
        }

        function useEliminate() {
            if (eliminateUsed || eliminatedOptions.length > 0 || questionAnswered) return;
            
            eliminateUsed = true;
            const wrongOptions = [];
            
            for (let i = 0; i < currentQuestion.options.length; i++) {
                if (i !== currentQuestion.correct) {
                    wrongOptions.push(i);
                }
            }
            
            while (eliminatedOptions.length < 2 && wrongOptions.length > 0) {
                const randomIndex = Math.floor(Math.random() * wrongOptions.length);
                eliminatedOptions.push(wrongOptions[randomIndex]);
                wrongOptions.splice(randomIndex, 1);
            }
            
            displayQuestion();
            updateStats();
        }

        function usePastor() {
            if (pastorUsed || questionAnswered) return;
            
            pastorUsed = true;
            const display = document.getElementById('questionDisplay');
            const pastorHints = [
                "Lembrem-se do que estudamos na última pregação...",
                "Essa resposta está relacionada com os fundamentos da fé...",
                "Pensem no que a Bíblia ensina sobre esse assunto...",
                "Vocês já ouviram isso nos estudos bíblicos...",
                "A resposta está nos ensinamentos básicos da igreja..."
            ];
            
            const randomHint = pastorHints[Math.floor(Math.random() * pastorHints.length)];
            
            const pastorSection = document.createElement('div');
            pastorSection.className = 'pastor-section';
            pastorSection.innerHTML = `
                <h4>💬 Dica do Pastor:</h4>
                <p>"${randomHint}"</p>
            `;
            
            const helpButtons = display.querySelector('.help-buttons');
            helpButtons.parentNode.insertBefore(pastorSection, helpButtons.nextSibling);
            
            updateStats();
        }

        function useSkip() {
            if (skipsRemaining === 0) return;
            
            if (confirm('Tem certeza que deseja pular esta pergunta? Você tem ' + skipsRemaining + ' pulos restantes.')) {
                skipsRemaining--;
                const display = document.getElementById('questionDisplay');
                display.innerHTML = `
                    <div class="welcome-message">
                        <h3>⏭️ Pergunta Pulada!</h3>
                        <p>Pergunta #${currentQuestion.num} foi pulada.</p>
                        <p>Você ainda tem <strong>${skipsRemaining} pulos</strong> restantes.</p>
                        <br>
                        <p>Clique em um dos botões acima para sortear uma nova pergunta!</p>
                    </div>
                `;
                updateStats();
            }
        }

        function getDifficultyClass(question) {
            if (questions.easy.find(q => q.num === question.num)) return 'difficulty-easy';
            if (questions.medium.find(q => q.num === question.num)) return 'difficulty-medium';
            return 'difficulty-hard';
        }

        function getDifficultyText(question) {
            if (questions.easy.find(q => q.num === question.num)) return 'FÁCIL';
            if (questions.medium.find(q => q.num === question.num)) return 'MÉDIA';
            return 'DIFÍCIL';
        }

        function resetQuestions() {
            if (confirm('🔄 Tem certeza que deseja resetar o jogo? Todas as perguntas e ajudas voltarão a estar disponíveis.')) {
                availableQuestions = {
                    easy: [...questions.easy],
                    medium: [...questions.medium],
                    hard: [...questions.hard]
                };
                
                eliminateUsed = false;
                pastorUsed = false;
                skipsRemaining = 3;
                eliminatedOptions = [];
                questionAnswered = false;
                currentQuestion = null;
                
                document.getElementById('questionDisplay').innerHTML = `
                    <div class="welcome-message">
                        <h3>🎯 Jogo Resetado!</h3>
                        <p><strong>📋 Como jogar:</strong></p>
                        <p>• Sortear perguntas fáceis/médias ou difíceis</p>
                        <p>• Usar as 3 ajudas disponíveis quando necessário</p>
                        <p>• Responder escolhendo uma das 4 alternativas</p>
                        <br>
                        <p><strong>🎁 Ajudas disponíveis:</strong></p>
                        <p>❌ <strong>Eliminar 2 Opções:</strong> Remove 2 alternativas erradas</p>
                        <p>🙏 <strong>Perguntar ao Pastor:</strong> O pastor dá uma dica</p>
                        <p>⏭️ <strong>Pular:</strong> Passa para próxima pergunta (3 vezes)</p>
                        <br>
                        <p>📊 <strong>Total:</strong> 30 perguntas disponíveis</p>
                    </div>
                `;
                
                updateStats();
            }
        }

        // Inicializar stats
        updateStats();