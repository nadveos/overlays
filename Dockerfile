FROM nginx:alpine

# Copiar todos los archivos HTML y CSS al directorio raíz de nginx
COPY *.html /usr/share/nginx/html/
COPY *.css /usr/share/nginx/html/
COPY *.json /usr/share/nginx/html/
COPY invited-artists/ /usr/share/nginx/html/invited-artists/

EXPOSE 80
