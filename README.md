# 🏠 Sistema de Gestión de Visitantes para Residencias

_Aplicación backend Secure Pass._

## 🚀 Tecnologías A Utilizar
- **Backend**: Node.js + Express
- **Base de datos**: MongoDB Atlas
- **Autenticación**: JWT (JSON Web Token)
- **Almacenamiento**: Cloudinary / File System
- **Notificaciones**: Nodemailer (Emails)
- **Generación de QR**: `qr-image` o `node-qrcode`

## 📌 Funcionalidades Principales
| Módulo               | Endpoints/Features                              |
|----------------------|------------------------------------------------|
| **Autenticación**    | Registro, login, roles (residente/guardia/admin) |
| **Visitas**          | Autorizaciones, entradas/salidas, validación QR |
| **Imágenes**         | Subida de fotos de vehículos/visitantes         |
| **Reportes**         | Historial de visitas y generación de PDFs       |

## 🤝 Cómo Contribuir

• Haz un Fork del proyecto en github

• Clonar el repositorio forkeado: 
   
    $git clone https://github.com/tu-usuario/repositorio-forkeado.git

• Ubicate en el directorio del repositorio forkeado:
    
    $cd directorio-repositorio

• Instala las dependencias dentro de la carpeta 'backend':

    $cd backend
    $npm install express mongoose dotenv cors bcryptjs jsonwebtoken qrcode jest ts-jest
    $npm install --save-dev @types/express @types/mongoose @types/cors @types/bcryptjs @types/jsonwebtoken @types/qrcode @types/jest nodemon
    $cd ..  # vuelve al directorio anterior

• Configura el repositorio original como 'upstream':

    $git remote add upstream https://github.com/usuario-original/repositorio.git
    $git remote -v  # verifica los git remotos

• Crea una rama en tu repositorio local:

    # En nuestro caso, por ejemplo:
    
    $git checkout -b feature/<tu rama>

    # Recuerda utilizar los nombres sugeridos en nuestro grupo

• Verifica las ramas del repositorio local y remoto

    $git branch -a # verifica todas las ramas (locales y remotas)
    $git status # verifica el estado de los archivos en el repo

• Sincroniza tu rama con la del repositorio original:

    $git checkout master
    $git fetch upstream # Para sincronizar con el repositorio remoto original
    $git rebase upstream/master

    # Si quieres que tu rama feature tambien obtenga los cambios haz:

    $git checkout feature
    $git rebase master  # Si ya actualizaste master (local)

• Sube tus cambios al repositorio remoto desde tu rama:

    $git checkout feature/<mi-rama>
    $git add .
    $git commit -m "mi cambio en feature"
    $git push origin feature/<tu rama>

    # O puedes hacer

    $git push -u origin feature/<tu rama>

    # Para setear el upstream y simplemente realizar un `$git push` para los siguientes push

## 🔄️ Mantener sincronizado el repositorio y trabajar

### Traer cambios desde el repositorio original

• Desde tu rama local master:

    $git checkout master
    $git fetch upstream   # para obtener los ultimos cambios
    $git rebase upstream/master

• Actualiza tu fork en github

    $git push origin master

### Actualizar mi rama feature desde mi rama master

• Primero *Trae los cambios desde el repositorio original*.
   
    Realiza los pasos del acápite anterior

• Ubicate en tu rama feature y actualiza

    $git checkout feature/<mi-rama>
    $git rebase master

### Subir cambios y Pull Requests

• Una vez hayas trabajado en tu rama feature y desees subir los cambios de tu rama:

    $git status # comprueba los cambios
    $git add .
    $git commit -m "mis cambios"
    $git push origin feature/<mi-rama>  # para subir los cambios al repositorio fork

• Al haber hecho esto podras realizar un Pull Request (PR):

    # Desde github, ve a tu repositorio forkeado, ve a tu rama con cambios y realiza un PR (Pull Request).
    Este debería aparecer como un botón verde.

    # Primero te recomiendo que realices un PR a la rama master de tu propio repositorio forkeado.
    De esta forma puedes evitar cualquier conflicto.

    # Una vez este todo libre de conflictos, desde tu rama master. Realiza un PR a la rama master
    del repositorio original. Tus cambios serán revisados y probablemente aceptados.

