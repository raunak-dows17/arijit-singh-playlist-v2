#!/bin/bash
# scripts/setup-local.sh

echo "🛠️  Setting up local development environment..."

# Check for Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python3 not found. Please install Python 3.8 or higher."
    exit 1
fi

# Check for FFmpeg
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg not found. Installing..."
    
    # Ubuntu/Debian
    if command -v apt-get &> /dev/null; then
        sudo apt-get update && sudo apt-get install -y ffmpeg
    
    # MacOS
    elif command -v brew &> /dev/null; then
        brew install ffmpeg
    
    else
        echo "⚠️  Please install FFmpeg manually from: https://ffmpeg.org/download.html"
    fi
fi

# Create virtual environment
echo "🐍 Creating Python virtual environment..."
python3 -m venv venv

# Activate and install yt-dlp
echo "📦 Installing yt-dlp in virtual environment..."
source venv/bin/activate
pip install yt-dlp

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

# Build TypeScript
echo "⚙️  Building TypeScript..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "To start the server:"
echo "1. Activate virtual environment: source venv/bin/activate"
echo "2. Start server: npm start"
echo "3. Server will run at: http://localhost:6969"
