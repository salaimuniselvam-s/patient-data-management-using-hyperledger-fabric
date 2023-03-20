# CONTAINER_IDS=$(docker ps -a | awk '($2 ~ /dev-peer.*/) {print $1}')
# docker ps -a -> list all running or exited containers
# awk is a formatting/filter tool on bash ->  ( ~ means matches operator)
# eg -> "sms" | awk '($1 ~ /sms/ ) {print "success"}'
# echo $CONTAINER_IDS


# /dev/null 2>&1 
# 2 -> standard error stderr
# 1 -> standard output
# $? is a variable holding the return value of the last command you ran.

#  if [[ $? -ne 0 || ! -d "../config" ]]; --> if last command leads to error or config directory does not exist
# -ne means not equal to , -d directory exists

#sed is a command-line tool for parsing and transforming text.
# LOCAL_VERSION=$(peer version | sed -ne 's/ Version: //p')

# echo "$LOCAL_VERSION" | grep -q $UNSUPPORTED_VERSION
# -q is an option passed to grep to suppress output and only set the exit status.

# rm -Rf && rm -rf -> same action but do in different order

# which cryptogen
# if [ "$?" -ne 0 ]; then  -> which command returns the location 

#  curl -s -L will download the file or resource specified in the URL without showing progress bars or error messages, and will follow any HTTP redirects that are returned by the server.

# -n -> non empty
# -ne -> not equal
# -eq -> equal

# if [ $x -eq 1 -o $y -eq 2 ] -> with condition you have to use -o for or operation 
# ($1) too many arguments  -> to resolve "$1"
# -a -> and
# ! -> not 
# if [ "$1" -eq 1 -a "$2" -eq 2 ]; then
#   echo "sms"
# fi


# tar xz -> xz extracts gzip compression
# xzvf -> v is verbose & f is to use the same file name as the tar file


# OS_ARCH=$(echo "$(uname -s | tr '[:upper:]' '[:lower:]' | sed 's/mingw64_nt.*/windows/')-$(uname -m | sed 's/x86_64/amd64/g')" | awk '{print tolower($0)}')
# return the os version

#sed 's/mingw64_nt.*/windows/') -> search with sed tool and replace
#eg -> echo "s7" | sed 's/s/salai/' -> returns salai7


#  the positional parameters are shifted left using shift, so that $2 becomes $1, $3 becomes $2, and so on.
# $# -> returns the number of arguments passed to the script
# echo $#
# if [[ $# -lt 1 ]] ; then
#   printHelp
#   exit 0
# else
#   MODE=$1
#   echo  $1 $2 $3
#   shift # shift the positional parameters to the left
#   echo  $1 $2 $3
# fi

# pushd ../chaincode/fabcar/go -> pushes to the directory
# 	GO111MODULE=on go mod vendor
# 	popd   -> pop to the current directory

# $@ -> it pass all the arguments to the function or another command

# example() {
#   echo "$@ -> It will have all the arguments"
# }
# 1. example 1 2 3 sdf sdaf sadf
  # or 
# 2. ./networkHelp.sh 1 2 3 sdf sdaf sadf  && example $@






