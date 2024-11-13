#!/bin/bash

# Variables
BUILD_DIR="frontend/build"  # The build folder path in your React project
ENV_FILE=".env"
DROP_TABLES_SQL="scripts/sql/DropTables.sql"
INIT_SQL="scripts/sql/Init.sql"
REMOTE_USER="<CWL>"  # SSH username
REMOTE_HOST="remote.students.cs.ubc.ca"  # SSH server address
REMOTE_PATH="/home/<FIRST_LETTER_OF_YOUR_CWL>/<CWL>/<REPLACE_WITH_PROJECT_DIRECTORY>"  # Target path on the SSH server

# Check if build directory exists
if [ ! -d "$BUILD_DIR" ]; then
  echo "Build directory does not exist. Run 'npm run build' first."
  exit 1
fi

# Check if .env file exists
if [ ! -f "$ENV_FILE" ]; then
  echo ".env file does not exist. Please ensure it is in the project directory."
  exit 1
fi

# Check if DropTables.sql file exists
if [ ! -f "$DROP_TABLES_SQL" ]; then
  echo "DropTables.sql file does not exist. Please ensure it is in the project directory."
  exit 1
fi

# Check if DropTables.sql file exists
if [ ! -f "$INIT_SQL" ]; then
  echo "Init.sql file does not exist. Please ensure it is in the project directory."
  exit 1
fi


# Upload .env file to the root of the project folder
echo "Uploading $ENV_FILE to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH..."
rsync -avz "$ENV_FILE" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH"

# Upload DropTables.sql file to the scripts/sql folder
echo "Uploading $DROP_TABLES_SQL to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/scripts/sql..."
rsync -avz "$DROP_TABLES_SQL" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/scripts/sql"

# Upload Init.sql file to the scripts/sql folder
echo "Uploading $INIT_SQL to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/scripts/sql..."
rsync -avz "$INIT_SQL" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/scripts/sql"

# Create /frontend/build directory on the remote server if it doesn't exist
echo "Creating /frontend/build directory on the remote server..."
ssh "$REMOTE_USER@$REMOTE_HOST" "mkdir -p $REMOTE_PATH/frontend/build"

# Upload the entire build folder to the /frontend folder on the server
echo "Uploading $BUILD_DIR to $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/frontend..."
rsync -avz "$BUILD_DIR" "$REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH/frontend"

echo "Upload complete!"
