# Docker

### Descargar una imagen

```
docker pull <nombre imagen>:<tag>
```

### Para listar imágenes

```
docker images
```

### Para filtrar imágenes

```
docker images | grep <cadena a filtrar>
```

### Crear un contenedor

```
docker run -d --name <nombre contenedor> <nombre imagen>:<tag>
```

### Listar contenedores

```
docker ps
docker ps -a
```

### Eliminar un contenedor

```
docker rm <nombre contenedor>
```

### Eliminar un contenedor que se está ejecutando

```
docker rm -f <nombre contenedor>
```

### Ver los logs de un contenedor

```
docker logs <nombre contenedor>
```

### Crear variable de entorno

```
docker run -d --name <nombre contenedor> -e MYSQL_ROOT_PASSWORD=12345 <nombre imagen>:<tag>
```

### Para mapear puertos

```
docker run -d --name <nombre contenedor> -p 4500:3306 -e MYSQL_ROOT_PASSWORD=12345 <nombre imagen>:<tag>
```

### Para crear un contenedor de mysql

```
docker run -d --name service-mysql -p 4500:3306 -e MYSQL_USER=sergio -e MYSQL_PASSWORD=12345 -e MYSQL_ROOT_PASSWORD="12345" -e MYSQL_DATABASE="cursodb"  mysql:8
```
