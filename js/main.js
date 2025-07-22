// js/main.js

import QuizQuestions from './modules/quizQuestions.js';
import { shuffleArray, GuardiasApp } from './modules/utils.js';

/**
 * Guardiãs das Águas - Quiz System
 * Interactive educational quiz about water resources and sanitation
 */

class GuardiasQuiz {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.timeLeft = 30;
        this.timer = null;
        this.difficulty = null;
        this.questions = [];
        this.startTime = null;
        this.endTime = null;
        
        // Atribui QuizQuestions e GuardiasApp ao escopo da classe ou globalmente se necessário
        // Para este setup com ES Modules, eles serão importados diretamente.
        // Se você precisa que sejam acessíveis globalmente fora deste módulo (como seu código original),
        // considere atribuí-los a window.
        window.QuizQuestions = QuizQuestions; // Torna globalmente acessível
        window.GuardiasApp = GuardiasApp;     // Torna globalmente acessível
        
        this.initializeQuiz();
    }
    
    initializeQuiz() {
        this.bindEvents();
        this.setupDifficultySelection();
        this.setupAccessibility();
    }
    
    bindEvents() {
        // Difficulty selection
        const difficultyButtons = document.querySelectorAll('.difficulty-btn');
        difficultyButtons.forEach(btn => {
            btn.addEventListener('click', () => this.selectDifficulty(btn));
        });
        
        // Start quiz button
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            startBtn.addEventListener('click', () => this.startQuiz());
        }
        
        // Quiz navigation buttons
        const nextBtn = document.getElementById('nextBtn');
        const skipBtn = document.getElementById('skipBtn');
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => this.nextQuestion());
        }
        
        if (skipBtn) {
            skipBtn.addEventListener('click', () => this.skipQuestion());
        }
        
        // Feedback modal
        const closeFeedbackBtn = document.getElementById('closeFeedbackBtn');
        if (closeFeedbackBtn) {
            closeFeedbackBtn.addEventListener('click', () => this.closeFeedback());
        }
        
        // Results actions
        const playAgainBtn = document.getElementById('playAgainBtn');
        const shareResultsBtn = document.getElementById('shareResultsBtn');
        
        if (playAgainBtn) {
            playAgainBtn.addEventListener('click', () => this.resetQuiz());
        }
        
        if (shareResultsBtn) {
            shareResultsBtn.addEventListener('click', () => this.openShareModal());
        }
        
        // Share modal
        this.setupShareModal();
    }
    
    setupDifficultySelection() {
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            startBtn.disabled = true;
        }
    }
    
    selectDifficulty(button) {
        // Remove selection from other buttons
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Select current button
        button.classList.add('selected');
        button.setAttribute('aria-pressed', 'true');
        
        this.difficulty = button.dataset.difficulty;
        
        // Enable start button
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            startBtn.disabled = false;
        }
        
        // Load questions for selected difficulty
        this.loadQuestions();
        
        // Announce to screen readers
        window.GuardiasApp.announceToScreenReader(`Dificuldade ${this.difficulty} selecionada`);
    }
    
    loadQuestions() {
        // QuizQuestions é importado e já está acessível no módulo
        // window.QuizQuestions é apenas para compatibilidade se outros scripts esperarem isso globalmente
        const allQuestions = QuizQuestions[this.difficulty] || QuizQuestions.facil;
        
        // Shuffle and select 10 questions
        this.questions = shuffleArray([...allQuestions]).slice(0, 10);
        
        console.log(`Loaded ${this.questions.length} questions for difficulty: ${this.difficulty}`);
    }
    
    startQuiz() {
        if (!this.difficulty || this.questions.length === 0) {
            alert('Por favor, selecione uma dificuldade primeiro.');
            return;
        }
        
        this.startTime = new Date();
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        
        this.showScreen('gameScreen');
        this.displayQuestion();
        this.updateProgress();
        this.startTimer();
        
        // Announce quiz start
        window.GuardiasApp.announceToScreenReader('Quiz iniciado');
    }
    
    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        if (!question) return;
        
        // Update question info
        document.getElementById('currentQuestion').textContent = this.currentQuestion + 1;
        document.getElementById('totalQuestions').textContent = this.questions.length;
        document.getElementById('questionCategory').textContent = question.category;
        document.getElementById('questionText').textContent = question.question;
        
        // Create answer options
        const answersContainer = document.getElementById('answersContainer');
        answersContainer.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'answer-option';
            answerDiv.setAttribute('role', 'radio');
            answerDiv.setAttribute('aria-checked', 'false');
            answerDiv.setAttribute('tabindex', '0');
            answerDiv.dataset.index = index;
            
            answerDiv.innerHTML = `
                <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                <span class="option-text">${option}</span>
            `;
            
            answerDiv.addEventListener('click', () => this.selectAnswer(index));
            answerDiv.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.selectAnswer(index);
                }
            });
            
            answersContainer.appendChild(answerDiv);
        });
        
        // Reset timer
        this.timeLeft = 30;
        this.updateTimer();
        
        // Reset next button
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.disabled = true;
        }
    }
    
    selectAnswer(selectedIndex) {
        // Remove previous selections
        document.querySelectorAll('.answer-option').forEach(option => {
            option.classList.remove('selected');
            option.setAttribute('aria-checked', 'false');
        });
        
        // Mark selected answer
        const selectedOption = document.querySelector(`[data-index="${selectedIndex}"]`);
        if (selectedOption) {
            selectedOption.classList.add('selected');
            selectedOption.setAttribute('aria-checked', 'true');
        }
        
        // Store answer
        this.answers[this.currentQuestion] = selectedIndex;
        
        // Enable next button (though auto-advance is used here)
        const nextBtn = document.getElementById('nextBtn');
        if (nextBtn) {
            nextBtn.disabled = false;
        }
        
        // Auto-advance after short delay
        setTimeout(() => {
            this.processAnswer(selectedIndex);
        }, 500);
    }
    
    processAnswer(selectedIndex) {
        const question = this.questions[this.currentQuestion];
        const isCorrect = selectedIndex === question.correct;
        
        // Stop timer
        this.stopTimer();
        
        // Calculate points
        let points = 0;
        if (isCorrect) {
            // Base points + time bonus
            const basePoints = 100;
            const timeBonus = Math.floor((this.timeLeft / 30) * 50);
            points = basePoints + timeBonus;
            this.score += points;
        }
        
        // Show correct/incorrect states
        this.showAnswerStates(question.correct, selectedIndex);
        
        // Show feedback
        this.showFeedback(isCorrect, question, points);
        
        // Update score display
        this.updateScore();
    }
    
    showAnswerStates(correctIndex, selectedIndex) {
        const options = document.querySelectorAll('.answer-option');
        
        options.forEach((option, index) => {
            option.classList.add('disabled');
            
            if (index === correctIndex) {
                option.classList.add('correct');
            } else if (index === selectedIndex && index !== correctIndex) {
                option.classList.add('incorrect');
            }
        });
    }
    
    showFeedback(isCorrect, question, points) {
        const modal = document.getElementById('feedbackModal');
        const icon = document.getElementById('feedbackIcon');
        const title = document.getElementById('feedbackTitle');
        const text = document.getElementById('feedbackText');
        
        if (isCorrect) {
            icon.innerHTML = '<i class="bi bi-check-circle-fill correct"></i>';
            title.textContent = 'Resposta Correta!';
            title.className = 'correct';
            text.textContent = `Parabéns! Você ganhou ${points} pontos. ${question.explanation}`;
        } else {
            icon.innerHTML = '<i class="bi bi-x-circle-fill incorrect"></i>';
            title.textContent = 'Resposta Incorreta';
            title.className = 'incorrect';
            text.textContent = `A resposta correta é: ${question.options[question.correct]}. ${question.explanation}`;
        }
        
        modal.classList.remove('hidden');
        
        // Auto-close after 4 seconds
        setTimeout(() => {
            this.closeFeedback();
        }, 4000);
    }
    
    closeFeedback() {
        const modal = document.getElementById('feedbackModal');
        modal.classList.add('hidden');
        
        // Move to next question or show results
        setTimeout(() => {
            if (this.currentQuestion < this.questions.length - 1) {
                this.currentQuestion++;
                this.displayQuestion();
                this.updateProgress();
                this.startTimer();
            } else {
                this.showResults();
            }
        }, 500);
    }
    
    nextQuestion() {
        this.closeFeedback();
    }
    
    skipQuestion() {
        // Mark as skipped
        this.answers[this.currentQuestion] = -1;
        
        // Stop timer
        this.stopTimer();
        
        // Show correct answer
        const question = this.questions[this.currentQuestion];
        this.showAnswerStates(question.correct, -1);
        
        // Show feedback for skipped question
        this.showFeedback(false, question, 0);
        
        // Announce skip
        window.GuardiasApp.announceToScreenReader('Pergunta pulada');
    }
    
    startTimer() {
        this.timeLeft = 30;
        this.updateTimer();
        
        this.timer = setInterval(() => {
            this.timeLeft--;
            this.updateTimer();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    stopTimer() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    
    updateTimer() {
        const timerText = document.getElementById('timerText');
        const timerProgress = document.getElementById('timerProgress');
        
        if (timerText) {
            timerText.textContent = this.timeLeft;
            
            // Update timer appearance based on time left
            timerText.className = 'timer-text';
            if (timerProgress && timerProgress.setAttribute) {
                timerProgress.setAttribute('class', 'timer-progress');
            }
            
            if (this.timeLeft <= 5) {
                timerText.classList.add('danger');
                if (timerProgress && timerProgress.classList) {
                    timerProgress.classList.add('danger');
                }
            } else if (this.timeLeft <= 10) {
                timerText.classList.add('warning');
                if (timerProgress && timerProgress.classList) {
                    timerProgress.classList.add('warning');
                }
            }
        }
        
        if (timerProgress) {
            const progress = (this.timeLeft / 30) * 157; // 157 is the circle circumference
            timerProgress.style.strokeDashoffset = 157 - progress;
        }
    }
    
    timeUp() {
        this.stopTimer();
        
        // Mark as timed out
        this.answers[this.currentQuestion] = -1;
        
        const question = this.questions[this.currentQuestion];
        this.showAnswerStates(question.correct, -1);
        this.showFeedback(false, question, 0);
        
        // Announce timeout
        window.GuardiasApp.announceToScreenReader('Tempo esgotado');
    }
    
    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        const progressFill = document.getElementById('progressFill');
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
            progressFill.classList.add('updated');
            
            setTimeout(() => {
                progressFill.classList.remove('updated');
            }, 600);
        }
        
        // Update progress bar aria-value
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.setAttribute('aria-valuenow', progress);
        }
    }
    
    updateScore() {
        const scoreDisplay = document.getElementById('currentScore');
        if (scoreDisplay) {
            scoreDisplay.textContent = this.score;
            scoreDisplay.classList.add('updated');
            
            setTimeout(() => {
                scoreDisplay.classList.remove('updated');
            }, 400);
        }
    }
    
    showResults() {
        this.endTime = new Date();
        const timeTaken = Math.round((this.endTime - this.startTime) / 1000);
        
        this.showScreen('resultsScreen');
        
        // Calculate results
        const correctAnswers = this.answers.filter((answer, index) => 
            answer === this.questions[index].correct
        ).length;
        
        const accuracy = Math.round((correctAnswers / this.questions.length) * 100);
        
        // Determine performance level
        let performanceLevel = 'poor';
        let badge = 'poor';
        let message = '';
        
        if (accuracy >= 90) {
            performanceLevel = 'excellent';
            badge = 'excellent';
            message = 'Excelente! Você demonstrou um conhecimento excepcional sobre recursos hídricos e saneamento básico. Continue sendo uma guardiã das águas!';
        } else if (accuracy >= 70) {
            performanceLevel = 'good';
            badge = 'good';
            message = 'Muito bom! Você tem um bom conhecimento sobre o tema. Continue estudando para se tornar uma expert em recursos hídricos!';
        } else if (accuracy >= 50) {
            performanceLevel = 'average';
            badge = 'average';
            message = 'Você está no caminho certo! Estude nossos materiais educativos para aprimorar seus conhecimentos sobre água e saneamento.';
        } else {
            performanceLevel = 'poor';
            badge = 'poor';
            message = 'Não desanime! Use nossos recursos educativos para aprender mais sobre a importância da água e do saneamento básico.';
        }
        
        // Update results display
        document.getElementById('finalScore').textContent = this.score;
        document.getElementById('correctAnswers').textContent = correctAnswers;
        document.getElementById('accuracy').textContent = `${accuracy}%`;
        
        const resultsBadge = document.getElementById('resultsBadge');
        const resultsTitle = document.getElementById('resultsTitle');
        const resultsSubtitle = document.getElementById('resultsSubtitle');
        const resultsMessage = document.getElementById('resultsMessage');
        
        if (resultsBadge) {
            resultsBadge.className = `results-badge ${badge}`;
            resultsBadge.innerHTML = '<i class="bi bi-award-fill"></i>';
        }
        
        if (resultsTitle) {
            resultsTitle.textContent = 'Quiz Concluído!';
        }
        
        if (resultsSubtitle) {
            resultsSubtitle.textContent = `Você acertou ${correctAnswers} de ${this.questions.length} perguntas`;
        }
        
        if (resultsMessage) {
            resultsMessage.innerHTML = `<p>${message}</p>`;
            resultsMessage.className = `results-message ${performanceLevel}`;
        }
        
        // Save results to localStorage
        this.saveResults({
            score: this.score,
            correctAnswers,
            totalQuestions: this.questions.length,
            accuracy,
            difficulty: this.difficulty,
            timeTaken,
            date: new Date().toISOString()
        });
        
        // Announce results
        window.GuardiasApp.announceToScreenReader(
            `Quiz concluído. Você acertou ${correctAnswers} de ${this.questions.length} perguntas com ${accuracy}% de precisão.`
        );
    }
    
    saveResults(results) {
        try {
            const savedResults = JSON.parse(localStorage.getItem('guardiasQuizResults') || '[]');
            savedResults.push(results);
            
            // Keep only last 10 results
            if (savedResults.length > 10) {
                savedResults.splice(0, savedResults.length - 10);
            }
            
            localStorage.setItem('guardiasQuizResults', JSON.stringify(savedResults));
        } catch (error) {
            console.error('Could not save quiz results:', error);
        }
    }
    
    resetQuiz() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.difficulty = null;
        this.questions = [];
        this.stopTimer();
        
        // Reset difficulty selection
        document.querySelectorAll('.difficulty-btn').forEach(btn => {
            btn.classList.remove('selected');
            btn.setAttribute('aria-pressed', 'false');
        });
        
        // Disable start button
        const startBtn = document.getElementById('startQuizBtn');
        if (startBtn) {
            startBtn.disabled = true;
        }
        
        this.showScreen('welcomeScreen');
        
        // Announce reset
        window.GuardiasApp.announceToScreenReader('Quiz reiniciado');
    }
    
    showScreen(screenId) {
        // Hide all screens
        document.querySelectorAll('.quiz-screen').forEach(screen => {
            screen.classList.add('hidden');
        });
        
        // Show target screen
        const targetScreen = document.getElementById(screenId);
        if (targetScreen) {
            targetScreen.classList.remove('hidden');
            
            // Focus management
            const firstFocusable = targetScreen.querySelector(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (firstFocusable) {
                setTimeout(() => firstFocusable.focus(), 100);
            }
        }
    }
    
    setupShareModal() {
        const shareModal = document.getElementById('shareModal');
        const closeShareModal = document.getElementById('closeShareModal');
        const shareModalOverlay = document.getElementById('shareModalOverlay');
        
        // Close modal events
        if (closeShareModal) {
            closeShareModal.addEventListener('click', () => this.closeShareModal());
        }
        
        if (shareModalOverlay) {
            shareModalOverlay.addEventListener('click', () => this.closeShareModal());
        }
        
        // Share buttons
        const shareWhatsapp = document.getElementById('shareWhatsapp');
        const shareTwitter = document.getElementById('shareTwitter');
        const shareFacebook = document.getElementById('shareFacebook');
        const copyLink = document.getElementById('copyLink');
        
        if (shareWhatsapp) {
            shareWhatsapp.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareResult('whatsapp');
            });
        }
        
        if (shareTwitter) {
            shareTwitter.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareResult('twitter');
            });
        }
        
        if (shareFacebook) {
            shareFacebook.addEventListener('click', (e) => {
                e.preventDefault();
                this.shareResult('facebook');
            });
        }
        
        if (copyLink) {
            copyLink.addEventListener('click', () => this.copyQuizLink());
        }
    }
    
    openShareModal() {
        const modal = document.getElementById('shareModal');
        if (modal) {
            modal.classList.remove('hidden');
            
            // Update share URLs
            this.updateShareUrls();
        }
    }
    
    closeShareModal() {
        const modal = document.getElementById('shareModal');
        if (modal) {
            modal.classList.add('hidden');
        }
    }
    
    updateShareUrls() {
        const correctAnswers = this.answers.filter((answer, index) => 
            answer === this.questions[index].correct
        ).length;
        
        const accuracy = Math.round((correctAnswers / this.questions.length) * 100);
        const url = window.location.origin + window.location.pathname;
        const text = `Acabei de fazer o Quiz Guardiãs das Águas e acertei ${correctAnswers}/${this.questions.length} perguntas (${accuracy}%)! Teste seus conhecimentos sobre recursos hídricos:`;
        
        // Update share button URLs
        const shareWhatsapp = document.getElementById('shareWhatsapp');
        const shareTwitter = document.getElementById('shareTwitter');
        const shareFacebook = document.getElementById('shareFacebook');
        
        if (shareWhatsapp) {
            shareWhatsapp.href = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
        }
        
        if (shareTwitter) {
            shareTwitter.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        }
        
        if (shareFacebook) {
            shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        }
    }
    
    shareResult(platform) {
        const correctAnswers = this.answers.filter((answer, index) => 
            answer === this.questions[index].correct
        ).length;
        
        const accuracy = Math.round((correctAnswers / this.questions.length) * 100);
        const url = window.location.origin + window.location.pathname;
        const text = `Acabei de fazer o Quiz Guardiãs das Águas e acertei ${correctAnswers}/${this.questions.length} perguntas (${accuracy}%)! Teste seus conhecimentos sobre recursos hídricos:`;
        
        window.GuardiasApp.shareOnSocial(platform, url, text);
        
        this.closeShareModal();
    }
    
    copyQuizLink() {
        const url = window.location.origin + window.location.pathname;
        
        window.GuardiasApp.copyToClipboard(url);
        
        this.closeShareModal();
    }
    
    setupAccessibility() {
        // Keyboard navigation for answer options
        document.addEventListener('keydown', (e) => {
            if (document.getElementById('gameScreen').classList.contains('hidden')) {
                return;
            }
            
            const options = document.querySelectorAll('.answer-option');
            const currentFocus = document.activeElement;
            const currentIndex = Array.from(options).indexOf(currentFocus);
            
            if (currentIndex !== -1) {
                let nextIndex = currentIndex;
                
                switch (e.key) {
                    case 'ArrowDown':
                    case 'ArrowRight':
                        e.preventDefault();
                        nextIndex = (currentIndex + 1) % options.length;
                        break;
                    case 'ArrowUp':
                    case 'ArrowLeft':
                        e.preventDefault();
                        nextIndex = (currentIndex - 1 + options.length) % options.length;
                        break;
                }
                
                if (nextIndex !== currentIndex) {
                    options[nextIndex].focus();
                }
            }
        });
    }
}

// Initialize quiz when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.quiz-container')) {
        window.guardiasQuiz = new GuardiasQuiz();
    }
});
