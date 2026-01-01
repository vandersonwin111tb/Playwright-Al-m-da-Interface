#!/usr/bin/env bash

echo "🛑 Encerrando containers..."

if [ -f podman-compose.yml ]; then
  podman-compose down
else
  podman stop $(podman ps -q)
fi

echo "✨ Todos os serviços foram desligados com elegância."
