# Dependencias:

>@adiwajshing/baileys<br>

>fs<br>

>mysql

# Funciones

## connect()
> Función encargada de establecer la conexión a la sesión de WhatsApp.
## sendMessage(params, res)
> Función encargada de enviar los mensajes a los usuarios de la base de datos. Recibe como parámetros el objeto params y la respuesta res. En esta función se hace uso de la función getUsers() para obtener los usuarios de la base de datos. Se itera por cada usuario, se espera 10 segundos antes de enviar el mensaje y se verifica si el usuario tiene una imagen o un archivo PDF asociado. Si se logra enviar el mensaje correctamente, se almacena la información en la base de datos.
## get_enviarmensaje(req, res, next)
> Función que recibe una petición GET para enviar un mensaje.
## post_enviarmensaje(req, res, next)
> Función que recibe una petición POST para enviar un mensaje.
## close(req, res, next)
> Función encargada de cerrar la sesión de WhatsApp y eliminar la información de autenticación del archivo "auth_info_multi.json".


> Ahora si puede continuar con la guia oficial de GitHub

## Entorno de Desarrollo
Para poder hacer un despliegue local de desarrollo solo es necesario contar con NodeJs.
Como primer paso se debe crear un archivo de entorno `.env` basandonos en el archivo `.example.env`.
Posterior a esto se deben instalar las dependencias necesarias
- Npm
    > `npm install`

Posteriormente para levantar el servidor local solo hace falta correr el siguiente comando
```sh
npm run start
```

