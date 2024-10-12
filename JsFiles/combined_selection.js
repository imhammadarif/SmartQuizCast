// Populate courses based on selected level
const coursesByLevel = {
    '9': ['Mathematics', 'Physics', 'Chemistry'],
    '10': ['Biology', 'Computer Science', 'Economics']
};

// Populate topics based on selected course
const topicsByCourse = {
    'Mathematics': ['Algebra', 'Geometry', 'Trigonometry'],
    'Physics': ['Motion', 'Forces', 'Energy'],
    'Chemistry': ['Atoms', 'Bonding', 'Reactions'],
    'Biology': ['Cell Structure', 'Genetics', 'Evolution'],
    'Computer Science': ['Programming', 'Data Structures', 'Algorithms'],
    'Economics': ['Supply and Demand', 'Market Structures', 'Economic Theories']
};

// Event listener for level selection
document.addEventListener('DOMContentLoaded', function() {
    const levelSelect = document.getElementById('level');
    const courseSection = document.getElementById('course-section');
    const courseSelect = document.getElementById('course');
    const topicSection = document.getElementById('topic-section');
    const topicSelect = document.getElementById('topic');

    // Level selection event
    levelSelect.addEventListener('change', function() {
        const selectedLevel = this.value;

        // Reset course and topic selection
        courseSelect.innerHTML = '<option value="none" selected disabled>Select Course</option>';
        topicSelect.innerHTML = '<option value="none" selected disabled>Select Topic</option>';
        topicSection.style.display = 'none';

        // Populate courses based on selected level
        if (coursesByLevel[selectedLevel]) {
            coursesByLevel[selectedLevel].forEach(course => {
                const option = document.createElement('option');
                option.value = course;
                option.textContent = course;
                courseSelect.appendChild(option);
            });
            courseSection.style.display = 'block'; // Show course section
        } else {
            courseSection.style.display = 'none'; // Hide if no valid level selected
        }
    });

    // Course selection event
    courseSelect.addEventListener('change', function() {
        const selectedCourse = this.value;

        // Reset topic selection
        topicSelect.innerHTML = '<option value="none" selected disabled>Select Topic</option>';

        // Populate topics based on selected course
        if (topicsByCourse[selectedCourse]) {
            topicsByCourse[selectedCourse].forEach(topic => {
                const option = document.createElement('option');
                option.value = topic;
                option.textContent = topic;
                topicSelect.appendChild(option);
            });
            topicSection.style.display = 'block'; // Show topic section
        } else {
            topicSection.style.display = 'none'; // Hide if no valid course selected
        }
    });

    // Topic selection event
    topicSelect.addEventListener('change', function() {
        const selectedTopic = this.value;
        if (selectedTopic !== 'none') {
            // Redirect to lecture video page after topic selection
            window.location.href = `/lecture_video/${selectedTopic}`;
        }
    });
});
