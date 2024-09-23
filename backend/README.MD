
# Steps to deploy the containerized Reddit Sentiment Analysis to Google Cloud Run:

## Set environment variables

export GCLOUD_PROJECT="newsletterapp-435603" 

export REPO="newsletterapp"

export REGION="northamerica-northeast2"

export IMAGE="newsletterapp-image"

export IMAGE_TAG=${REGION}-docker.pkg.dev/${GCLOUD_PROJECT}/${REPO}/${IMAGE}

## Build the image

docker build -t $IMAGE_TAG -f ./Dockerfile --platform linux/x86_64 .

## Push it to Artifact Registry:

docker push $IMAGE_TAG
