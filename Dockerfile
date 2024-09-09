# Stage 1: Build the application
FROM node:20.11.0-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist

# Using --production instead of --omit=dev for a smaller install
RUN npm install --production --force

EXPOSE 3000
ENV STAGE=dev
CMD ["node", "dist/main"]