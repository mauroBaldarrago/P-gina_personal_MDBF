# Agenda+ - Proyecto de Gestión de Notas y Recordatorios

**URL del proyecto hospedado:** https://maurobaldarrago.github.io/P-gina_personal_MDBF/pages/inicio.html

## Descripción
Agenda+ es una aplicación web que permite a los usuarios registrar notas, tareas y recordatorios con distintos niveles de personalización. La plataforma distingue entre usuarios con cuenta normal y premium, ofreciendo funcionalidades adicionales para los premium, como colores personalizados y recordatorios ilimitados.

## Lenguajes utilizados
- **HTML:** Estructura de todas las páginas y formularios del proyecto.  
- **CSS:** Diseño visual y estilos de la interfaz, incluyendo colores en los botones y en los enlaces.
- **JavaScript:** Lógica de interacción del usuario, manipulación del DOM, validaciones de formularios y gestión de notas y recordatorios en el navegador. 

## Estructura del proyecto (Front-end)
- **index.html**: Página de inicio o redirección.  
- **pag_IniciarSesion.html / pag_CrearCuenta.html**: Formularios para login y registro.  
- **notas.html**: Interfaz principal de gestión de notas.  
- **planes.html**: Página de selección y activación del plan premium.  
- **AcercaDe.html**: Información sobre el proyecto. 
- **assets/css/styles.css**: Reglas de diseño y estilos generales.  
- **assets/js/app.js**: Lógica de la aplicación, eventos, validaciones y manipulación del DOM.  
- **assets/images/**: Recursos gráficos como logos e íconos.

## Backend y Base de Datos
Agenda+ utiliza PHP para manejar la comunicación entre el front-end y la base de datos MySQL. Todo el backend se encuentra en el archivo:

- **backend/api.php**: Intermediario que recibe solicitudes desde JavaScript (`fetch`) y procesa acciones como:
  - Registrar un nuevo usuario
  - Iniciar sesión
  - Guardar, actualizar y eliminar notas
  - Activar el plan premium de un usuario
    
### Base de Datos
Se usa MySQL para almacenar los datos de usuarios y notas. La base de datos local (o remota) contiene al menos dos tablas principales:

1. **usuarios**
   - id (INT, auto incremental)
   - usuario (VARCHAR)
   - correo (VARCHAR)
   - clave (VARCHAR)
   - plan (ENUM: 'normal', 'premium')

2. **notas**
   - id (INT, auto incremental)
   - correo_usuario (VARCHAR) ------- Relaciona la nota con un usuario
   - texto (TEXT)
   - tipo (ENUM: 'nota', 'tarea', 'recordatorio')
   - fecha (DATE)
   - fechaRecordatorio (DATE, opcional)
   - completada (BOOLEAN)
   - color (VARCHAR) --------- Color de la nota (funcionalidad extra premium)
  
## Documentación
**URL de la documentación:** https://docs.google.com/document/d/10SgY1Az8c1RicAxPgUstr6CQLBVmXuhQrH-xv9LMvsg/edit?usp=sharing
