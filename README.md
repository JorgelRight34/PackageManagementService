# Package Management Service

## Descripción

sistema de gestión de paquetería que permita administrar paquetes, envíos y seguimiento de entregas. 
El backend se implementará en .NET para crear una API que gestione los datos, mientras que el frontend 
se desarrollará en React para consumir esta API y proporcionar una interfaz interactiva a los usuarios.

## Cómo correr
Instalar paquetes necesarios para el backend:

**Paquetes:**
- `NewtonsoftJson`
- `SpaProxy`
- `EntityFrameworkCore`
- `EntityFrameworkCore.SqlServer`
- `EntityFrameworkCore.Tools`
- `Newtonsoft.Json`
- `Swashbuckle.AspNetCore`

Instalar paquetes necesarios para el backend:

**Example:**
```Terminal:
npm install
```

**Librerias extras utilizadas**
- `react-toastify`
- `react-router-dom`
- `bootstrap`
- `reactstrap`

Ajustar el default connection string en appsetings.json, cambiar donde dice {Servidor} con el servidor deseado
```
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server={Servidor}\\SQLEXPRESS;Database=PackageManagementService;Trusted_Connection=True;TrustServerCertificate=True"
  }
}

```

## Vistas

### Home
![Home.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra el nombre de la aplicación "Servicio de Gestión de Paquetes" 
y se muestra un menú con 3 botones, las cuales llevan a la vista de Paquetes,
Envíos, y Seguimientos respectivamente. arriba se ve ese mismo menú pero
en una barra de navegación, incluyendo el home el cual muestra esta misma vista.

### Paquetes
![Paquetes.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra una tabla la cual tiene columnas que representan cada atributo de los paquetes.
Arriba de la tabla hay un botón para crear nuevos paquetes. En la última columna de la tabla 
están los botones para borrar y editar la fila en cuestión.

#### Añadir nuevo paquete
![Añadir nuevo paquete.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos exceptuando
el id del paquete, para crear un paquete.

#### Editar paquete
![Añadir nuevo paquete.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos a editar
exceptuando el id del paquete, para actualizar el paquete.

### Envíos
![Envíos.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra una tabla la cual tiene columnas que representan cada atributo de los envíos.
Arriba de la tabla hay un botón para crear nuevos envíos. En la última columna de la tabla 
están los botones para borrar y editar la fila en cuestión.

#### Añadir nuevo envío
![Añadir nuevo envío.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos exceptuando
el id del envío, para crear un envío.

#### Editar envío
![Añadir nuevo envío.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos a editar
exceptuando el id del envío, para actualizar el envío.

### Estados
![Estados.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra una tabla la cual tiene columnas que representan cada atributo de los estados.
Arriba de la tabla hay un botón para crear nuevos estados. En la última columna de la tabla 
están los botones para borrar y editar la fila en cuestión.

#### Añadir nuevo estado
![Añadir nuevo estado.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos exceptuando
el id del estado, para crear un estado.

#### Editar estado
![Añadir nuevo estado.](https://myoctocat.com/assets/images/base-octocat.svg)

Se muestra un formulario en el cual se le pide al usuario todos los atributos a editar
exceptuando el id del estado, para actualizar el estado.
