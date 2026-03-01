#!/bin/bash
# Start the Next.js standalone server as a background process
# This runs outside Passenger, with full process/thread capabilities

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

# Load environment
export NODE_ENV=production
export PORT=3456
export HOSTNAME=127.0.0.1

# Load .env.production
if [ -f "$SCRIPT_DIR/.env.production" ]; then
  set -a
  source <(grep -v '^#' "$SCRIPT_DIR/.env.production" | grep -v '^$' | sed 's/^\([^=]*\)="\(.*\)"/\1=\2/')
  set +a
fi

# Override PORT since .env.production doesn't set it
export PORT=3456
export HOSTNAME=127.0.0.1

# Use the cPanel Node.js environment
NODE_BIN="$HOME/nodevenv/horizonvfx/20/bin/node"
if [ ! -f "$NODE_BIN" ]; then
  NODE_BIN=$(which node)
fi

PIDFILE="$SCRIPT_DIR/backend.pid"
LOGFILE="$SCRIPT_DIR/backend.log"

# Check if already running
if [ -f "$PIDFILE" ]; then
  PID=$(cat "$PIDFILE")
  if kill -0 "$PID" 2>/dev/null; then
    echo "Backend already running (PID: $PID)"
    exit 0
  fi
  rm -f "$PIDFILE"
fi

# Start the Next.js standalone server
echo "Starting Next.js backend on port $PORT..." >> "$LOGFILE"
nohup "$NODE_BIN" .next/standalone/server.js >> "$LOGFILE" 2>&1 &
echo $! > "$PIDFILE"
echo "Backend started (PID: $!)"
