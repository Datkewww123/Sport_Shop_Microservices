# Frontend/Dockerfile
FROM node:20-alpine

WORKDIR /app
COPY package.json .
RUN npm install
COPY . .

# Nhận VITE_API_URL tại build-time (Vite cần biến này lúc build, không phải runtime)
ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
