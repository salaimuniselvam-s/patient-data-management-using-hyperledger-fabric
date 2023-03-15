SLEEP_TIME=3

source set-env.sh hospital1 admin

./sign-channel-tx.sh hospital1

./submit-create-channel.sh hospital1

./register-enroll-peer.sh hospital1 hosp1-peer1

sleep $SLEEP_TIME

source set-env.sh hospital1 hosp1-peer1

./launch-peer.sh hospital1 hosp1-peer1

sleep $SLEEP_TIME

./join-hospital-channel.sh hospital1 hosp1-peer1

