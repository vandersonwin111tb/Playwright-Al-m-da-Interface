#!/usr/bin/env bash

echo "🚀 Iniciando ambiente ShortBeyond..."

# 1. Sobe o socket do Podman (garante que está ativo)
systemctl --user start podman.socket

# 2. Sobe os containers usando podman-compose
if [ -f podman-compose.yml ]; then
  echo "📦 Subindo containers com podman-compose..."
  podman-compose up -d
else
  echo "📦 Nenhum podman-compose encontrado, iniciando todos os containers existentes..."
  podman start $(podman ps -a -q)
fi

echo "✨ Tudo pronto!"
echo "🔍 Containers ativos:"
podman ps --format "{{.Names}} - {{.Status}}"
