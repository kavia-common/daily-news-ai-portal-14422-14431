#!/bin/bash
cd /home/kavia/workspace/code-generation/daily-news-ai-portal-14422-14431/frontend_portal
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

