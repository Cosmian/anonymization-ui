FROM node:19

RUN mkdir -p /app

WORKDIR /app
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
COPY . /app

RUN npm install
RUN npm run build

CMD ["npm", "run", "preview", "--", "--host"]
