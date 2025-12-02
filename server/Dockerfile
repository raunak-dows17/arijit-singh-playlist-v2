# Dockerfile - FINAL WORKING VERSION
FROM node:20-alpine

# Install Python and FFmpeg
RUN apk add --no-cache python3 ffmpeg

# Create virtual environment
RUN python3 -m venv /opt/venv

# Install yt-dlp
RUN /opt/venv/bin/pip install yt-dlp

WORKDIR /server

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .
RUN npm run build

RUN mkdir -p /tmp/youtube-converter

EXPOSE 6969
CMD ["node", "dist/server.js"]
