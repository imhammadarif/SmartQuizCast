from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.models import Group
from django.contrib import messages
from django.http import JsonResponse

# Welcome page view
def welcome(request):
    return render(request, "quizcast/welcome.html")

#student_dashboard view:

def combined_selection(request):
    if request.user.is_authenticated and request.user.groups.filter(name='Students').exists():
        return render(request, 'quizcast/combined_selection.html')
    else:
        return redirect('login')  

def lecture_video(request, topic):
    if topic:
        # Generate lecture notes using ChatGPT API
        lecture_notes = generate_lecture_notes(topic)  # Mock function to get lecture notes
        return render(request, 'quizcast/lecture_video.html', {
            'topic': topic,
            'lecture_notes': lecture_notes,
        })
    return redirect('topic_selection')  # If no topic is selected, redirect back

def generate_lecture_notes(topic):
    # Mock function to simulate lecture notes generation
    return f"Lecture notes for {topic}:\n\n1. Key Concept 1\n2. Key Concept 2\n3. Key Concept 3"

def download_lecture_notes(request, topic):
    lecture_notes = generate_lecture_notes(topic)
    response = JsonResponse({"notes": lecture_notes})
    response['Content-Disposition'] = f'attachment; filename="{topic}_lecture_notes.txt"'
    return response

# User login view
def login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            
            if user is not None:
                auth_login(request, user)
                
                # Check if the user is in the 'Students' group
                if user.groups.filter(name='Students').exists():
                    return redirect('combined_selection')  # Redirect to student dashboard
                else:
                    return redirect('welcome')  # Redirect other users to a different page
                
    else:
        form = AuthenticationForm()
    
    return render(request, 'quizcast/login.html', {'form': form}) 

# User registration view
def register(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            user = form.save()

            # Add user to 'Students' group
            students_group, created = Group.objects.get_or_create(name='Students')
            students_group.user_set.add(user)

            return redirect('login')  # Redirect to login page after successful registration
        else:
            # Print errors for debugging purposes
            print(form.errors)  # You can remove this later

    else:
        form = UserCreationForm()

    return render(request, 'quizcast/register.html', {'form': form})

   