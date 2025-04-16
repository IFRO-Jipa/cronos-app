#!/usr/bin/env bash

set -xe;

HELM_REPO=https://stakater.github.io/stakater-charts
HELM_CHART=application
HELM_CHART_VERSION=6.0.2

DEPLOY_NAME=cronos-app-front-end
DEPLOY_NAMESPACE=cronos-app

helm upgrade --timeout 10m0s -i ${DEPLOY_NAME} --create-namespace -n ${DEPLOY_NAMESPACE} --repo ${HELM_REPO} ${HELM_CHART} --version ${HELM_CHART_VERSION} --values=./values.yml;

kubectl rollout restart \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
;
