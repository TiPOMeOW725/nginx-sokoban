sudo apt update && sudo apt upgrade -y && sudo apt install nginx -y

sudo systemctl enable --now nginx  
read -p "Please enter the IP or domain you want to use: " domain_name
sudo mkdir -p /var/www/sokoban/{html,css,js,assets}

sudo cp ./sokoban/index.html /var/www/sokoban/html/
sudo cp ./sokoban/style.css /var/www/sokoban/css/
sudo cp ./sokoban/script.js /var/www/sokoban/js/
sudo cp -r ./sokoban/assets/* /var/www/sokoban/assets/ 

sudo chown -R www-data:www-data /var/www/sokoban/{html,css,js,assets}
sudo chmod -R 755 /var/www/sokoban/{html,css,js,assets}

sudo touch /etc/nginx/sites-available/sokoban
sudo tee /etc/nginx/sites-available/sokoban > /dev/null <<EOF
server {
    listen 80;
    listen [::]:80;

    server_name ${domain_name};
    root /var/www/sokoban/html;
    index index.html index.htm;

    location / {
        try_files \$uri \$uri/ =404;
    }

    location ~* \.css$ {
        gzip on;
        expires 15m;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(js|map)$ {
        gzip on;
        expires 15m;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(png|jpg|jpeg|gif|ico|svg|webp)$ {
        expires 1m;
        add_header Cache-Control "public, immutable";
        access_log off;
    }

    location ~ /\. {
        deny all;
    }
}
EOF

sudo ln -s /etc/nginx/sites-available/sokoban /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default

sudo systemctl reload nginx

sudo ufw allow 'Nginx HTTP'

sudo ufw reload