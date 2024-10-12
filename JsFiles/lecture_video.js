document.getElementById('lecture-video').addEventListener('ended', function() {
    generateQuiz();
});

function generateQuiz() {
    const topic = "{{ topic }}";  // Get the topic from the template context
    const course = "{{ course }}";  // Get the course from the template context

    // Make an AJAX request to your Django view to generate the quiz
    fetch(`/generate_quiz/${course}/${topic}/`)
        .then(response => response.json())
        .then(data => {
            if (data.quiz) {
                document.getElementById('quiz-content').innerHTML = `
                    <p>${data.quiz}</p>
                `;
                // Show the quiz popup immediately
                document.getElementById('quiz-container').classList.remove('hidden');
                startTimer(10); // Start 10-minute timer
            } else if (data.error) {
                alert(data.error);  // Show error if any
            }
        })
        .catch(error => {
            console.error('Error generating quiz:', error);
        });
}

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const timeDisplay = document.getElementById('time');

    const interval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        timeDisplay.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            clearInterval(interval);
            // Automatically submit the quiz and show marks and remarks
            submitQuiz();
        }
    }, 1000);
}

function submitQuiz() {
    // Logic to calculate marks and show remarks
    // For demonstration purposes, we'll show fixed marks and remarks
    const marks = Math.floor(Math.random() * 100);  // Random marks for demonstration
    const remarks = marks >= 50 ? "Good job!" : "Please review the material.";
    
    // Hide quiz container
    document.getElementById('quiz-container').classList.add('hidden');

    // Show marks and remarks
    alert(`Your marks: ${marks}\nRemarks: ${remarks}`);
}
