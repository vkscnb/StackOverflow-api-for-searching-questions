### Setup Step:
This is a Guide for setup for this application.

1. Installing Git

        $ sudo apt install git

2. Create directory "/opt/teamwork" and give full permission.

        $ sudo mkdir /opt/teamwork
        $ sudo chmod a+rwx /opt/teamwork
        
3. Go to "/opt/teamwork/" and Clone Repository:

        $ cd /opt/teamwork
        $ git clone https://github.com/cpsln/stack-api-searching-questions.git 

4. Install and Setup virtualenv (Also includes setup for workon)

        First we need to install python-pip in order to be able to use pip
       
        $ sudo apt install python3-pip
        
        Once done, we can now install virtualenv
        
        $ sudo pip3 install virtualenv
        $ sudo pip3 install virtualenvwrapper
        

        $ vi ~/.bashrc
        
        Add these lines end of file:
        
            export VIRTUALENVWRAPPER_PYTHON=/usr/bin/python3
            export VIRTUALENVWRAPPER_VIRTUALENV=/usr/local/bin/virtualenv
            export WORKON_HOME=/opt/teamwork/stack-api-searching-questions/venv
            export PROJECT_HOME=/home/cpsln/projects
            source /usr/local/bin/virtualenvwrapper.sh

        > Restart the terminal to get the changes       

5. Create a new virtualenv for "teamwork"

       $ mkvirtualenv teamwork
       $ workon teamwork
        
6. Go to the cloned directory ,Location of this is supposed to be "/opt/teamwork/stack-api-searching-questions"

        $ cd frontend
        $ npm i
        $ npm run build
        
7. Go to "/opt/teamwork/stack-api-searching-questions/backend"

        $ pip install -r requirments.txt
        $ python manage.py runserver