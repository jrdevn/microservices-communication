Comandos Docker:

Container Auth-DB:
docker run --name auth-db -p 5432:5432 -e POSTGRES_DB=auth-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11

Container Product-DB:
docker run --name product-db -p 5433:5432 -e POSTGRES DB=product-db -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=123456 postgres:11

Container Sales-DB:
docker run --name sales-db -p 27017:27017 -p 28017:28017 -e MONGODB_USER="admin" -e MONGODB DATABASE="sales" -e MONGODB_PASS="123456"
tutum/mongodb

Conexão no Mongoshell:
mongo "mongodb://admin:123456@localhost:27017/sales"

Container RabbitMQ:
docker run --name sales_rabbit -p 5672:5672 -p 25676:25676 -p 15672:15672 rabbitmq:3-management

