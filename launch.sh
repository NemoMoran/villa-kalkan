#!/bin/bash
export PATH="/Users/muradayvaz/.nvm/versions/node/v24.18.0/bin:/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "/Users/muradayvaz/Desktop/villa-kalkan" || exit 1

if ! lsof -i :3000 -sTCP:LISTEN >/dev/null 2>&1; then
  nohup npm run dev > /tmp/villa-kalkan-dev.log 2>&1 &
  disown
  sleep 3
fi

open "http://localhost:3000"
