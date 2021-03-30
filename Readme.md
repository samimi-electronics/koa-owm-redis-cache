# Open weather map API with redis cache
This project uses redis as a cache database to
store results of https://openweathermap.org api.

Configuration resides in .env

### Project dependencies
- Redis -> Will not run without redis-server installed
- Koa

# How to run
Assuming you have Redis setup on your machine, clone this
repository and the run:
```npm i```

Afterwards create a file named ```.env``` in the projects 
root directory and copy the contents of ```.env.example```
into the newly created file.

Enter the configuration based on your environment and then
run the api using ```npm run start```


