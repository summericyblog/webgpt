FROM nginx:1.23.4-alpine
COPY ./nginx.conf /etc/nginx/nginx.conf
COPY ./summericy.pem /etc/ssl/summericy.pem
COPY ./summericy.key /etc/ssl/summericy.key
COPY ./build /home/nginx/www