
rm -rf ./ledger

if [ -z $1 ];
then
    echo 'Deleted the ledger data only.'
    echo 'To delete all artifacts use:  ./clean.sh  all'
    exit 0;
fi

# Remove the network artifacts
if [ $1 = 'all' ] 
then
    rm *.block 2> /dev/null
    rm *.tx 2> /dev/null
    rm -rf ./hospital1
    rm -rf ./hospital2
    
    echo 'Deleted all artifacts.'
else
    echo 'Deleted the ledger data only.'
    echo 'To delete all artifacts use:  ./clean.sh  all'
fi