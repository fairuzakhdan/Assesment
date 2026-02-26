#!/bin/bash
# Script to create submission zip without unnecessary files

echo "Creating submission package..."

# Create zip excluding node_modules, .git, and other unnecessary files
zip -r submission.zip . \
  -x "node_modules/*" \
  -x ".git/*" \
  -x "build/*" \
  -x "dist/*" \
  -x ".cache/*" \
  -x "*.log" \
  -x ".DS_Store" \
  -x "create-submission.sh"

echo "✅ Submission package created: submission.zip"
echo ""
echo "📦 Package contents (excluding node_modules, .git, build folders)"
echo ""
echo "To extract and test:"
echo "  1. unzip submission.zip -d test-folder"
echo "  2. cd test-folder"
echo "  3. npm install"
echo "  4. node directTest.js"
