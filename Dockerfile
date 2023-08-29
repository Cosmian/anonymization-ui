FROM node:19

RUN mkdir -p /app

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]
