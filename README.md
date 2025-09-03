# Calculadora de Huella de Carbono
![22222222](https://github.com/user-attachments/assets/62a61ee7-5d9b-48eb-be3b-3d6b02d63d3e)

# Introducción
La huella de carbono es el total de las emisiones de los Gases de Efecto Invernadero (GEI) causados indirectamente por una persona, una organizacion, evento o un producto en especifico.

# DESCRIPCION DEL PROYECTO
Este proyecto se trata de una Calculadora de Huella de Carbono, que mide la huella de uno a traves de 30 preguntas y dara un resultado final dependiendo de los numeros, los pasos de la hulla esta divido en 5 secciones y las preguntas algunas se responden marcando un numero y en otras haciendo clic en un casillero de si/no y al final, saldra el resultado con un mensaje.

# Codigo HTML,CSS Y JAVASCRIPT

HTML y Tailwind CSS: Enfocado en la estructura y en el diseño visual.

Javascript Vainilla: Enfocado en la logica de interraccion, validacion y el calculo.

CSS Puro y Tailwind CSS: El soporte de modo claro/oscuro, diseño de sliders y botones interactivos.

# La Estructura del proyecto y su funcionamiento

HTML: Contiene 5 secciones divididas tecnicamente: Alimentacion, Residuos, Transporte, Energia Renovable y Preguntas Adicionales,
cada seccion contiene preguntas interactivas, la mayoria son numericas o con botones Si/No (tipo multiplechoice), la navegacion es entre secciones dinamicas mediante botones data-next y data-prev.

# Javascript y sus funcionalidades clave son: 

1- Modo oscuro alterna clases al documentElement y al slider (input[type="range"]) para aplicar un tema oscuro.

2- Slider de energía renovable muestra dinámicamente el valor en pantalla a medida que el usuario lo mueve.

3- Validación del Formulario verifica campos requeridos, rangos numéricos válidos y coherencia (por ejemplo: suma del 100% en dietas y residuos).

4- Cálculo de Puntajes las secciones suman puntos positivos (mayor huella) o negativos (menor huella).hay reglas específicas de puntaje para: dieta, transporte (auto y vuelos), energía renovable, gestión de residuos, preguntas adicionales (clasificadas en positivas/negativas).

5- Interfaz Interactiva: Botones de respuestas sí/no crean inputs ocultos para almacenar los valores seleccionados. al enviar el formulario, se calcula el puntaje total y se muestra un mensaje con: un diagnóstico (huella BAJA / MEDIA / ALTA) Desglose por categoría.


# CSS: Estilos Personalizados

1- Usa modo claro/oscuro: usa .dark como clase en el <html> para alternar temas.
cambia el fondo, colores de texto y de sliders con transición suave.

2- Estilos de Sliders: personalización de los <input type="range">:
Color, Altura, Radio y Color de Acento, diferentes en modo claro vs. oscuro (verde principal o verde claro)

3- Botones de Si/No: stilo verde con borde + hover dinámico, clase .active aplicada al botón seleccionado:
se bloquea la interacción (pointer-events: none) y estilos adaptados también para modo oscuro.

# Desarrollo: 

Lo primero que estuvimos haciendo es mirar algunas huellas de carbono de otras paginas y de ahi tuvimos una idea de como hacer esta, primero buscamos las 30 preguntas mas usadas y tras anotarlas empezamos con los codigos, el codigo HTML fue el primero en hacerse metiendo las 30 preguntas divididas en 5 secciones como alimentos, residuos originalmente habian otras preguntas que fueron reemplazadas por otras ademas de definir como serian los botones de volver atras, siguiente y calcular ademas de vincular a "https://cdn.tailwindcss.com" tras terminar el html y longear a JS y CSS.

Se siguio con Javascript donde se hicieron las formas de calcular las sumas de las preguntas de la huella ademas de agregar un modo oscuro que se 
cambia a traves de un boton y ahi se encuentran los distintos resultados que saldran segun los resultados y por ultimo el CSS se hizo para definir el
color del fondo los botones y como se veria el modo oscuro, este proyecto tuvo cambios debido a errores como por ejemplo que las preguntas que tienen si/no
antes estaban para poner un numero cosa que era un claro error que se logro corregir ademas de que el codigo esta hecho para que no salgan numeros negativos
en los resultados finales.
