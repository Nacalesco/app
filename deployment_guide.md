# Guía de Despliegue en Vercel

Tu portafolio está listo para ser publicado. Como es un proyecto de Vite + React, Vercel es la mejor opción. Aquí tienes los pasos detallados:

## Opción 1: Conectar a GitHub (Recomendado)

Esta es la forma más profesional porque el sitio se actualizará automáticamente cada vez que subas cambios.

1.  **Crea un Repositorio en GitHub**: Ve a [github.com](https://github.com) y crea un nuevo repositorio llamado `mi-portafolio`.
2.  **Sube tu Código**:
    *   Abre una terminal en la carpeta de tu proyecto.
    *   Ejecuta estos comandos (asegúrate de tener Git instalado):
        ```bash
        git init
        git add .
        git commit -m "Initial commit - Portfolio ready"
        git branch -M main
        git remote add origin https://github.com/TU_USUARIO/mi-portafolio.git
        git push -u origin main
        ```
3.  **Conéctalo a Vercel**:
    *   Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
    *   Haz clic en **"Add New"** > **"Project"**.
    *   Importa el repositorio `mi-portafolio` que acabas de crear.
    *   Vercel detectará automáticamente que es un proyecto de Vite. **No toques nada** en la configuración de "Build and Output Settings".
    *   Haz clic en **"Deploy"**.

---

## Opción 2: Usar Vercel CLI (Sin GitHub)

Si quieres subirlo rápido sin usar GitHub:

1.  Abre la terminal en la carpeta de tu proyecto.
2.  Instala el comando de Vercel (si no lo tienes):
    ```bash
    npm install -g vercel
    ```
3.  Ejecuta el comando para desplegar:
    ```bash
    vercel
    ```
4.  Sigue las instrucciones en la pantalla (puedes darle a "Yes" a todo).

---

## Notas Importantes

*   **Configuración Detectada**: Vercel usará automáticamente `npm run build` para construir tu sitio y servirá la carpeta `dist`.
*   **Dominio Personal**: Una vez desplegado, Vercel te dará una URL (ej. `mi-portafolio.vercel.app`). Puedes cambiarla por un dominio propio en la pestaña "Settings" > "Domains".
*   **Archivos Ignorados**: Te acabo de crear un archivo `.gitignore` para que no se suban carpetas innecesarias como `node_modules` que harían lenta la subida.

---

¡Disfruta de tu portafolio hosteado! 🚀
