# EdIT-ejercicio-13

Ejercicio N° 13 del Bootcamp FullStack Engineer - EducacionIT

Es un proyecto en el que se tocaron temas como diseño responsive, armado de formularios, expresiones regulares y validación de datos. Para cada campo se creo una expresión regular que validará cada campo, y caso contrario mediante cierta animación muestra los errores contenidos en los campos, en conjunto con un historial que se mostrará en la parte inferior de la página, informando de cada error que se tuvo. El formulario solo cuenta con un botón  de resetear que vuelve a la normalidad todos los campos y reinicia el historial de errores.

#### [🔗Link a GitHub Page del proyecto](https://cmoros.github.io/EdIT-ejercicio-13/)

## Tecnologías:

### Principales:

- HTML5 <img src="https://user-images.githubusercontent.com/93099135/188763469-32f71d09-213e-4fa1-89b4-4a8c07e611d5.png" alt="HTML5" height="16" width="16">
- CSS3 <img src="https://user-images.githubusercontent.com/93099135/188764077-e7311d7f-8a95-44a4-b914-8834e46e54f8.png" alt="CSS3" height="16" width="16">
- JavaScript <img src="https://user-images.githubusercontent.com/93099135/188764300-26ad3782-654f-46d6-ac53-cb5f7ee72b9c.png" alt="JS" height="16" width="16">
- Sass <img src="https://user-images.githubusercontent.com/93099135/188764687-d8cadfaf-b3d7-4dfb-a4b9-001f089f3364.png" alt="JS" height="16" width="16">

### Extra:

- Responsive: Mobile First

## Sobre el Ejercicio:

### Instrucciones: 

1. Crear index.html con formulario con los siguientes datos (utilizar nomenclatura BEM):
  - Primer nombre
  - Primer apellido
  - Tipo de documento
  - Número de documento
  - Dirección 
  

2. Estilizar el documento con CSS, utilizando solo un nombre de clase en cada selector para que tenga un diseño responsive y los label con sus respectivos inputs se acomoden según la resolución, utilizando mobile first.

3. Estilizar el formulario para que todos los campos pueden informar correcta y prolijamente cuando tengan un error de validación.

4. Realizar las siguientes validaciones en los campos, informando los errores en tiempo real y al intentar enviar el formulario.

Primer nombre
- optativo
- de 3 a 10 caracteres en total
- la primera letra en mayúsculas o minúsculas
- las siguientes letras solo en minúsculas
- soporta caracteres del español
- no soporta espacios ni ningún otro caracteres más que los mencionados 

Primer apellido
- obligatorio
- de 2 a 20 caracteres en total
- todas o algunas letras en mayúsculas y/o minúsculas en cualquier parte del texto
- soporta caracteres del español y apóstrofes o comillas simples (')
- no soporta espacios ni ningún otro caracter más que los mencionados 

Tipo de documento:
- el usuario debe seleccionar una de las dos opciones disponibles
- elementos del tipo radio que permitan elegir DNI o CUIL

Número de documento
Debe habilitarse solo si se seleccionó un tipo de documento en el campo anterior.
Si en el campo anterior se seleccionó DNI, debe permitirse ingresar un número de DNI de 7 u 8 dígitos, pudiendo adicionarse 2 caracteres más para ingresar separadores de miles.
Si, en cambio, se seleccionó la opción CUIL, debe permitir ingresar un CUIL de 11 dígitos, más dos guiones medios optativos.

Dirección:
- optativo
- de 10 a 200 caracteres
- soporta caracteres en mayúsculas y minúsculas del español y portugués
- adicionalmente debe soportar espacios, números, comas, guiones medios, puntos, paréntesis, comillas simples y dobles, símbolo de grado "°" y barra "/".

5 - Completar el archivo "tests.txt" con 10 ejemplos de textos que pasen las validaciones y 10 más que no las pasen para cada uno de los campos a validar. Colocar todos los ejemplos dentro de comillas dobles.

### Extras:
- Utilizar transiciones al momento de mostrar y ocultar los mensajes de error y para darle feedback al usuario en hover y focus.

- Adaptar las validaciones existentes en los campos de nombre y apellido, con el fin de habilitar el ingreso de dos o más nombres y/o apellidos.

- Adicionar un resumen de errores de validación al inicio del formulario, que muestre, en todo momento, el detalle acumulado de errores de validaciones informados.

- Adicionar un botón de reseteo del formulario que, sin recargar la página, restablezca el formulario y quite los errores existentes.

- Agregar al menos 4 campos adicionales con validaciones de distinta índole. Definir criteriosamente las validaciones que correspondan.

---

## [🔗Link a GitHub Page del proyecto](https://cmoros.github.io/EdIT-ejercicio-13/)
