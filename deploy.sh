#!/bin/bash

##################################################################
# NeuroCleanse - One-Click Deployment Script
#
# This script handles the complete deployment process including:
# - Environment setup
# - Dependency installation
# - Build process
# - Production deployment
##################################################################

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
LOG_FILE="${SCRIPT_DIR}/deployment.log"
BUILD_DIR="${SCRIPT_DIR}/.next"

# Logging function
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')]${NC} $1" | tee -a "$LOG_FILE"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1" | tee -a "$LOG_FILE"
    exit 1
}

warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1" | tee -a "$LOG_FILE"
}

info() {
    echo -e "${BLUE}[INFO]${NC} $1" | tee -a "$LOG_FILE"
}

# Clear previous log
> "$LOG_FILE"

log "Starting deployment process for NeuroCleanse..."

# Step 1: Environment Check
log "Step 1: Checking environment..."
if ! command -v node &> /dev/null; then
    error "Node.js is not installed. Please install Node.js 18 or higher."
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    error "Node.js version 18 or higher is required. Current version: $(node -v)"
fi

log "Node.js version: $(node -v)"
log "npm version: $(npm -v)"

# Step 2: Check for .env file
log "Step 2: Checking environment configuration..."
if [ ! -f "${SCRIPT_DIR}/.env" ]; then
    warning ".env file not found. Creating from .env.example..."
    if [ -f "${SCRIPT_DIR}/.env.example" ]; then
        cp "${SCRIPT_DIR}/.env.example" "${SCRIPT_DIR}/.env"
        info "Please configure your .env file with appropriate values before deploying."
    else
        info "No .env.example found. Environment variables may need to be set manually."
    fi
fi

# Step 3: Clean previous builds
log "Step 3: Cleaning previous builds..."
if [ -d "$BUILD_DIR" ]; then
    rm -rf "$BUILD_DIR"
    log "Removed previous build directory"
fi

if [ -d "${SCRIPT_DIR}/node_modules" ]; then
    info "Cleaning node_modules for fresh install..."
    rm -rf "${SCRIPT_DIR}/node_modules"
fi

# Step 4: Install dependencies
log "Step 4: Installing dependencies..."
cd "$SCRIPT_DIR"

if [ -f "package-lock.json" ]; then
    npm ci --force 2>&1 | tee -a "$LOG_FILE" || npm install --force 2>&1 | tee -a "$LOG_FILE"
else
    npm install --force 2>&1 | tee -a "$LOG_FILE"
fi

if [ $? -ne 0 ]; then
    error "Failed to install dependencies. Check the log file: $LOG_FILE"
fi

log "Dependencies installed successfully"

# Step 5: Run linting
log "Step 5: Running code quality checks..."
npm run lint 2>&1 | tee -a "$LOG_FILE" || warning "Linting found issues (non-blocking)"

# Step 6: Build the application
log "Step 6: Building production bundle..."
npm run build 2>&1 | tee -a "$LOG_FILE"

if [ $? -ne 0 ]; then
    error "Build failed. Check the log file: $LOG_FILE"
fi

log "Build completed successfully"

# Step 7: Generate deployment report
log "Step 7: Generating deployment report..."
cat > "${SCRIPT_DIR}/deployment-report.txt" << EOF
================================================================================
NeuroCleanse Deployment Report
================================================================================
Deployment Date: $(date)
Node Version: $(node -v)
npm Version: $(npm -v)

Build Output:
-------------
Build Directory: ${BUILD_DIR}
Build Size: $(du -sh ${BUILD_DIR} 2>/dev/null | cut -f1 || echo "N/A")

Environment:
------------
$(cat .env 2>/dev/null | grep -v "^#" | grep -v "^$" | sed 's/=.*/=***HIDDEN***/' || echo "No .env file found")

Next Steps:
-----------
1. Review the build output in: ${BUILD_DIR}
2. Test the application locally: npm run start
3. Deploy to your hosting platform
4. Monitor application performance

Deployment Log:
---------------
Full logs available in: ${LOG_FILE}

================================================================================
EOF

log "Deployment report generated: ${SCRIPT_DIR}/deployment-report.txt"

# Step 8: Success message
log "================================================================"
log "Deployment preparation completed successfully!"
log "================================================================"
info ""
info "To start the production server locally, run:"
info "  npm run start"
info ""
info "To deploy to a hosting platform:"
info "  - Vercel: vercel deploy"
info "  - Netlify: netlify deploy --prod"
info "  - AWS/Docker: Use the provided Dockerfile"
info ""
info "For detailed deployment instructions, see: DEPLOYMENT.md"
log "================================================================"

exit 0
