FROM node:21-alpine3.17

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ADD https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/latest/download/opentelemetry-javaagent.jar .
ENV JAVA_TOOL_OPTIONS "-javaagent:./opentelemetry-javaagent.jar"

RUN npm run build:production

CMD ["npm", "run", "start:production"]