#!/bin/bash
# SE-Team Deployment Script
# Run this script on the server as root or with sudo

set -e

echo "=== SE-Team Deployment Script ==="

# Create deployment directory
echo "Creating deployment directory..."
mkdir -p /var/www/se-team

# Extract the deployment package
echo "Extracting deployment files..."
tar -xzvf /tmp/se-team-deploy.tar.gz -C /var/www/se-team --strip-components=1

# Set ownership
echo "Setting ownership..."
chown -R seadmin:seadmin /var/www/se-team

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js not found. Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
    apt-get install -y nodejs
fi

# Check if PM2 is installed
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing PM2..."
    npm install -g pm2
fi

# Start/restart the application with PM2
echo "Starting application with PM2..."
cd /var/www/se-team
pm2 delete se-team 2>/dev/null || true
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd -u seadmin --hp /home/seadmin

# Configure NGINX
echo "Configuring NGINX..."
cat > /etc/nginx/sites-available/se-team << 'NGINX_CONFIG'
server {
    listen 80;
    server_name se-team.securityengineersinc.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
NGINX_CONFIG

# Enable the site
ln -sf /etc/nginx/sites-available/se-team /etc/nginx/sites-enabled/

# Test NGINX configuration
echo "Testing NGINX configuration..."
nginx -t

# Reload NGINX
echo "Reloading NGINX..."
systemctl reload nginx

echo ""
echo "=== Deployment Complete ==="
echo "The application should now be available at http://se-team.securityengineersinc.com"
echo ""
echo "Useful commands:"
echo "  pm2 status          - Check application status"
echo "  pm2 logs se-team    - View application logs"
echo "  pm2 restart se-team - Restart the application"
