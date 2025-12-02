# Dockerfile - ADJUSTED FOR server/ folder
FROM node:20-alpine

# Install Python and FFmpeg
RUN apk add --no-cache python3 ffmpeg

# Create virtual environment
RUN python3 -m venv /opt/venv

# Install yt-dlp
RUN /opt/venv/bin/pip install yt-dlp

WORKDIR /server

# Copy package files FROM server/ folder
COPY server/package*.json ./

# Install Node.js dependencies
RUN npm install --legacy-peer-deps

# Copy source code FROM server/ folder
COPY server/. .

# Build TypeScript
RUN npm run build

RUN mkdir -p /tmp/youtube-converter

EXPOSE 6969

CMD ["node", "dist/server.js"]
