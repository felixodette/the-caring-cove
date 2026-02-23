#!/bin/bash
# cPanel Post-Deploy Script
# Run after Git pull: npm install + build
# Use this script path in cPanel Git "Deploy" settings for both deployments

set -e
cd "$(dirname "$0")/.."

echo "📦 Installing dependencies..."
npm ci

echo "🔨 Building Next.js..."
npm run build

echo "✅ Deploy complete!"
echo "   Restart your Node.js application in cPanel if using Application Manager."
