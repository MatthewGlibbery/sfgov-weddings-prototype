FROM node:20-bullseye AS base

ARG GIT_COMMIT_HASH=unspecified
LABEL revision=$GIT_COMMIT_HASH

RUN npm install -g npm@11.8.0

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

WORKDIR /app/packages/sfgov

RUN npm run build

EXPOSE 3000

ENV PORT=3000
ENV NEXT_PUBLIC_GIT_HASH=$GIT_COMMIT_HASH

HEALTHCHECK --interval=3s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1

CMD ["npm", "run", "start"]
