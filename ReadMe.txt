For Installations guide:
FIRST: there should be installed at the system machine ( Node.js, python [>3.9], pip )

SECOND: Follow the following steps to fully run the whole system:

1- open the terminal at the base directory of the project folder
2- Type down these scripts:

-----------------------------------------
cd .\backend\
pip install -r requirements.txt
python -m spacy download en_core_web_sm
cd ..
-----------------------------------------

3- So, now the Backend server is ready to run.
4- Now the Frontend installations, write these scrips as follows:

-----------------------------------------
cd .\frontend\
npm install
cd ..
-----------------------------------------

5- Now we can run the frontend server and backend server individually separately on two different terminals.
6- type down these scripts on the first terminal to run the react js app server:

-----------------------------------------
cd .\frontend\
npm start
-----------------------------------------

7- Now Open a new terminal tap at the base directory of the project as well,
 and type down these scripts on the second terminal to run the fastapi server:


-----------------------------------------
cd .\backend\
python -m uvicorn main:app --reload
-----------------------------------------

8- Now both the Frontend & the Backend server are running at the same time, then they can send and receive requests.