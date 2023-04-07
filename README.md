
# lab-lineoa-express-api

### Required

- Node js



### build

```
 docker build -t lab-lineoa-express .
 docker build -t lab-lineoa-web .
```


### run

```
 docker run --name lab-lineoa-express -d -p 3000:3000 lab-lineoa-express
 docker run --name lab-lineoa-express -d -p 3000:3000 lab-lineoa-web
```



docker run --name mongodb -d - 27017:27017 registry.gitlab.com/madee.tech/registry/lab-lineoa-express:db mongodb

docker run -d -p 27017:27017 --name mongodb -- mongo mongod --bind_ip_all 

