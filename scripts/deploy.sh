#!/bin/bash
# 🚀 Jasswiki Deployment Script - Clean & Simple

set -e

echo "🔨 Building jasswiki.ch..."
npm run build

echo "🚀 Deploying to Firebase Hosting (jasswiki site)..."
firebase deploy --only hosting:jasswiki

echo "✅ jasswiki.ch is live!"
echo "🌐 Visit: https://jasswiki.ch"

