if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    echo "$1"
    [ -n "$2" ] && echo "$2"
    [ -n "$3" ] && echo "$3"
fi