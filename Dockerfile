# Stage 1 - the build process
FROM node:16 as build-deps
WORKDIR /usr/src/app
COPY package.json ./
COPY npm-shrinkwrap.json ./
RUN apt-get update
RUN apt-get install -y libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
# Chrome dependencies
RUN apt-get install -y fonts-liberation libappindicator3-1 xdg-utils lsb-release

# install Chrome browser
ENV CHROME_VERSION 67.0.3396.62
RUN wget -O /usr/src/google-chrome-stable_current_amd64.deb "https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb" && \
    dpkg -i /usr/src/google-chrome-stable_current_amd64.deb ; \
    apt-get install -f -y && \
    rm -f /usr/src/google-chrome-stable_current_amd64.deb

RUN npm install -g npm@8.2.0 && \
    npm --version
RUN npm ci
COPY . ./
ENV NODE_ENV production
RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.19-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD nginx -g "daemon off;"
