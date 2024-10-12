from django.db import models

# Model for Course Level (e.g., 9th Class, 10th Class)
class CourseLevel(models.Model):
    level_name = models.CharField(max_length=50)  # e.g., "9th Class", "10th Class"

    def __str__(self):
        return self.level_name

# Model for Course (e.g., Mathematics, Science)
class Course(models.Model):
    level = models.ForeignKey(CourseLevel, on_delete=models.CASCADE, related_name='courses')
    course_name = models.CharField(max_length=100)  # e.g., "Mathematics"

    def __str__(self):
        return f"{self.course_name} ({self.level.level_name})"

# Model for Topic (e.g., Algebra, Geometry)
class Topic(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='topics')
    topic_name = models.CharField(max_length=100)  # e.g., "Algebra"
    
    # Store the YouTube video ID related to this topic
    video_id = models.CharField(max_length=50)  # e.g., YouTube video ID

    def __str__(self):
        return f"{self.topic_name} ({self.course.course_name})"
