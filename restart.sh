#!/usr/bin/env bash

echo "🔄 Reiniciando o ambiente..."
./stop.sh
sleep 2
./start.sh
echo "🚀 Reinicialização concluída!"
