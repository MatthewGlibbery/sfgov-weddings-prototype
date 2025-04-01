FROM node:20.11.0

WORKDIR /next
COPY . .

# RUN apk add python3 
# This is probably not the exact version of python we need
RUN sed -i=.bak 's/localhost/web/g' packages/sfgov/next.config.js
RUN sed -i=.bak 's/127.0.0.1/web/g' packages/sfgov/next.config.js
RUN sed 's/127.0.0.1/web/g' packages/sfgov/.env.development.example > packages/sfgov/.env.development
# RUN sed -i=.bak 's/8000/80/g' packages/sfgov/.env.development
RUN npm config set registry http://registry.npmjs.org/
RUN npm install
RUN npm run build

CMD ["next", "start"]