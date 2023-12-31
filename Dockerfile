# Build Stage
FROM node:18-alpine AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

# prod stage
FROM node:18-alpine

WORKDIR /app

ARG NODE_ENV=production

ENV NODE_ENV=${NODE_ENV}

COPY --from=build /app/dist ./dist

COPY package*.json .

RUN npm install --only=production

RUN rm package*.json

EXPOSE 3000

CMD ["node", "dist/src/main.js"]


# FROM node:16 As builder 
# # Create app directory 
# WORKDIR /app 
# # A wildcard is used to ensure both package.json AND package-lock.json are copied 
# COPY package*.json ./ 
# # Install app dependencies 
# COPY . . 
# RUN npm install 
# RUN npm run build 

# FROM node:16.13.1-alpine3.13 
# WORKDIR /app 
# COPY - from=builder /app ./dist
# COPY . . 
# EXPOSE 3000 
# CMD [ "npm", "run", "start:prod" ]


# FROM node:18-alpine AS base

# # Install dependencies only when needed
# FROM base AS deps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
# RUN apk add --no-cache libc6-compat
# WORKDIR /app

# # Install dependencies based on the preferred package manager
# COPY package.json ./
# RUN npm install

# # Rebuild the source code only when needed
# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules
# COPY . .

# # Environment variables must be present at build time
# ENV NODE_ENV production

# RUN npm run build

# RUN rm -rf node_modules && npm install --production

# # Production image, copy all the files and run next
# FROM base AS runner
# WORKDIR /app

# # Don't run production as root
# RUN addgroup --system --gid 1001 nodejs
# RUN adduser --system --uid 1001 nestjs
# USER nestjs

# # Environment variables must be redefined at run time
# ENV NODE_ENV production

# # Copy code output and node_modules prod from builder
# COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/node_modules ./node_modules

# EXPOSE 3000
# CMD ["node", "dist/main.js"]



# FROM node:14-slim

# # Create and change to the app directory.
# WORKDIR /usr/src/app

# # Copy application dependency manifests to the container image.
# # A wildcard is used to ensure both package.json AND package-lock.json are copied.
# # Copying this separately prevents re-running npm install on every code change.
# COPY package*.json ./

# # Install dependencies.
# # If you add a package-lock.json speed your build by switching to 'npm ci'.
# RUN npm ci --only=production

# # Copy local code to the container image.
# COPY . .

# # Display directory structure
# RUN ls -l

# # Expose API port
# EXPOSE 3000

# # Run the web service on container startup.
# CMD [ "npm", "start" ]

# FROM node:15.4 as build
# WORKDIR /app
# COPY package*.json .
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:15.4
# WORKDIR /app
# COPY package*.json .
# RUN npm install --only=production
# COPY --from=build /app/dist ./dist
# EXPOSE 3000
# CMD npm run start:prod