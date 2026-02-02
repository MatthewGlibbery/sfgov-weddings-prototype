# syntax=docker.io/docker/dockerfile:1

FROM node:20-bullseye AS base

RUN npm install -g npm@11.8.0

WORKDIR /app

COPY . .

RUN npm ci --omit=dev

WORKDIR /app/packages/sfgov

RUN npm install html-parse-stringify hoist-non-react-statics
RUN npm install --save-dev typescript @types/react @types/node
RUN npm install i18next-fs-backend

RUN npm run build

WORKDIR /app

# ENV NODE_ENV=production
# # Uncomment the following line in case you want to disable telemetry during runtime.
# # ENV NEXT_TELEMETRY_DISABLED=1

# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nextjs
# RUN chown -R nextjs:nodejs .
# COPY --from=builder /app/public ./public

# # Automatically leverage output traces to reduce image size
# # https://nextjs.org/docs/advanced-features/output-file-tracing
# COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER root

EXPOSE 3000

ENV PORT=3000

HEALTHCHECK --interval=3s --timeout=10s --retries=3 CMD curl -f http://localhost:3000/services || exit 1

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