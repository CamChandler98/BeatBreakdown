import os

os.system("pipenv lock -r > requirements.txt")
os.system("heroku container:push web -a benchmarket-sfa")
os.system("heroku container:release web -a benchmarket-sfa"
)
os.system("heroku run -a benchmarket-sfa flask db upgrade")
os.system("heroku run -a benchmarket-sfa flask seed undo")
os.system("heroku run -a benchmarket-sfa flask seed all")
