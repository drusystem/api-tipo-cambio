## Descripción

API para calcular el tipo de cambio utilizando las tecnologías: NestJS, Typescript, JWT, Redis, MySQL y Docker.

## Ejecutar aplicación en local

```bash
$ docker-compose up -d
```
![Ejecutando docker en local](./images/docker_run.png)
<br/>

## Acceder a la documentación en local

```bash
# Escuchar en http://localhost:3000
```
![Documentación de la api](./images/documentacion.png)
<br/>

## Testing de pruebas unitarias

```bash
# unit tests
$ npm run test
```

![Captura de testing](./images/test_unitario.png)
<br/>

## Endpoints

### Cambio de moneda

```bash
GET
localhost:3000/api/exchange/calculate?moneda_origen=PEN&moneda_destino=USD&monto=10
```

![Endpoint Calcular tipo de cambio](./images/calcular_endpoint.png)

### Crear tipo de cambio

```bash
POST
localhost:3000/api/exchange
Valores en el cuerpo de la solicitud:
{
	"moneda_origen":"PEN",
	"moneda_destino":"USD",
	"tipo_cambio":0.27
}
```

![Endpoint Crear tipo de cambio](./images/crear_endpoint.png)

### Actualizar tipo de cambio

```bash
PATCH
localhost:3000/api/exchange
Valores en el cuerpo de la solicitud:
{
    "moneda_origen":"PEN",
    "moneda_destino":"USD",
    "tipo_cambio":0.31
}
```

![Endpoint Actualizar tipo de cambio](./images/actualizar_endpoint.png)


<br/>

## Autor
Andrés Quispe.