# syntax=docker.io/docker/dockerfile:1

FROM node:20-alpine AS base

RUN npm install -g npm@11.8.0

# Install dependencies only when needed
# FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
# RUN \
#   if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
#   elif [ -f package-lock.json ]; then npm ci; \
#   elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
#   else echo "Lockfile not found." && exit 1; \
#   fi


# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED=1
RUN npm ci --omit=dev

WORKDIR /app/packages/sfgov

RUN npm install html-parse-stringify hoist-non-react-statics
RUN npm install --save-dev typescript @types/react @types/node
RUN npm run build
# # Production image, copy all the files and run next
# FROM base AS runner
WORKDIR /app

# ENV NODE_ENV=production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
RUN chown -R nextjs:nodejs .
# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT=3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/config/next-config-js/output
ENV HOSTNAME="0.0.0.0"
HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1

# /home/ubuntu/srv/sfgov/node_modules/.bin/next start
CMD ["/app/node_modules/.bin/next", "start"]









# # Use the official Node.js image as the base  
# FROM node:20.11.0  

# # Set the working directory inside the container  
# WORKDIR /app  

# # Copy the app source code to the container  
# COPY . .  

# # Install dependencies  
# RUN npm install

# # Build the Next.js app  
# RUN npm run -w @sfgov/next build 

# # Expose the port the app will run on  
# EXPOSE 3000  
# HEALTHCHECK --interval=30s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1
# # Start the app  
# CMD ["npm", "run", "-w", "@sfgov/next", "start"]