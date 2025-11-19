#!/bin/bash

user=""
remote_host=""
remote_path=""
local_path=""

read -p "Please enter path to local directory: " local_path

[ -z "$user" ] && read -p "Please enter remote username: " user
[ -z "$remote_host" ] && read -p "Please enter remote host (IP or domain): " remote_host
[ -z "$remote_path" ] && read -p "Please enter remote destination path: " remote_path

echo "Running Dry Run (No files will be moved)..."
rsync -avz --delete --dry-run "${local_path}" "${user}@${remote_host}:${remote_path}"

read -p "Does the dry run look correct? Proceed with actual sync? (y/n): " confirm

if [[ "$confirm" == "y" || "$confirm" == "Y" ]]; then
    echo "Syncing now..."
    rsync -avz --delete "${local_path}" "${user}@${remote_host}:${remote_path}"
    echo "Sync complete."
else
    echo "Operation cancelled."
fi