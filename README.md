# Sokoban Static Site Deployment

This project was made as a challenge from roadmap.sh(https://roadmap.sh/projects/static-site-server). It hosts a browser-based Sokoban game on a remote Linux server using Nginx. It acts as a demonstration of setting up a web server, configuring Nginx for static content, and using rsync to deploy file updates.

## Prerequisites

*   A remote Linux server (Ubuntu/Debian required for the provided scripts).
*   SSH access to the server.
*   A domain name or the server's public IP address.
*   Source code for the Sokoban game (HTML, CSS, JS, and Assets).

## Project Structure

*   **sokoban/**: This directory contains the game source code (`index.html`, `style.css`, `script.js`, and an `assets` folder).
*   **deploy.sh**: A server-side provisioning script. It installs Nginx, configures the firewall, creates directory structures, and moves the game files to `/var/www/`.
*   **deploy_changes.sh**: A local-side deployment script. It uses `rsync` to synchronize local changes to the remote server.

## Usage Guide

### 1. Initial Server Setup

This step is performed once to provision the server.

1.  Connect to your remote server via SSH.
2.  Copy the `deploy.sh` script and the `sokoban` directory to the server (e.g., using `scp`).
3.  Make the script executable:
    ```bash
    chmod +x deploy.sh
    ```
4.  Run the script:
    ```bash
    ./deploy.sh
    ```
5.  The script will ask for the **IP address or Domain name** you wish to use. Enter it when prompted.

**What this script does:**
*   Updates system packages.
*   Installs Nginx and UFW (firewall).
*   Creates the web root at `/var/www/sokoban/`.
*   Configures Nginx specifically for the Sokoban game (including caching headers for assets).
*   Enables the firewall for HTTP traffic.

### 2. Deploying Updates

Use this script from your **local machine** whenever you make changes to the game code.

1.  Make sure the script is executable:
    ```bash
    chmod +x deploy_changes.sh
    ```
2.  Run the script:
    ```bash
    ./deploy_changes.sh
    ```
3.  Enter the requested details:
    *   **Local path:** The path to your local game files (e.g., `./sokoban/`).
    *   **Remote username:** Your SSH username (e.g., `root` or `admin`).
    *   **Remote host:** The IP address or domain of your server.
    *   **Remote destination path:** The web root on the server (default setup is `/var/www/sokoban/`).

4.  **Dry Run:** The script effectively runs a "test" first. It will show you exactly what files will be changed without actually modifying anything.
5.  **Confirm:** Type `y` to proceed with the actual upload.

## Nginx Configuration Details

The Nginx configuration created by `deploy.sh` includes specific optimizations:

*   **Root Directory:** `/var/www/sokoban/`
*   **Caching:**
    *   CSS and JS files are cached for 15 minutes.
    *   Images (png, jpg, svg, etc.) are cached for 1 minute.
    *   `Cache-Control` headers are set to `public, immutable`.
*   **Security:** Hidden files (starting with `.`) are denied access.