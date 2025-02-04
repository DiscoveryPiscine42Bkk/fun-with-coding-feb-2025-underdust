file_count=$(find . -maxdepth 1 -type f | wc -l)

echo "Number of files: $file_count"