# TODO: use Yarn instead of NPM
FROM node:16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY ./ .
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
RUN npx vite build --mode ${NODE_ENV}

FROM nginx:1.23.1 as production-stage
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build-stage /app/dist /usr/share/nginx/html

CMD /bin/bash -c "envsubst '\$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf" && nginx -g 'daemon off;'
