#!groovy

try {
  node('docker') {
    notifyBuild('STARTED')

    env.WORKSPACE = pwd()
    env.BUILD_TAG = "v.${env.BUILD_NUMBER}"
    env.REPO = 'iotsploit-landing'
    env.SERVICE = 'iotsploit_landing_demo'
    env.SERVICE_PARAMS = "--restart=always --log-driver=syslog --log-opt tag=docker/${env.REPO} -e VIRTUAL_HOST=iotsploit-landing.maddevs.co -e VIRTUAL_PORT=80 -e LETSENCRYPT_HOST=iotsploit-landing.maddevs.co -e LETSENCRYPT_EMAIL=admin@maddevs.co"

    stage 'Checkout'
    deleteDir()
    checkout scm
    // Prepare test environment
    stage 'Build image'
      docker.withRegistry("${env.PRIVATE_REGISTRY}") {
        docker.build("${env.REPO}").push("${env.BUILD_TAG}")
        docker.build("${env.REPO}").push("latest")

        // Deploy image to staging
        docker.withServer("${env.DEPLOY_SERVER_URL}") {
          stage 'Staging deploy'
          myImage = docker.image("${env.REPO}:${env.BUILD_TAG}")
          myImage.pull()
          sh "docker rm -f ${env.SERVICE} || true"
          docker.image(myImage.imageName()).run("--name=${env.SERVICE} ${env.SERVICE_PARAMS}")

          stage 'Check Service'
          sh "docker  inspect --format '{{ (.NetworkSettings.Ports) }}' ${env.SERVICE} | grep map | grep '80/tcp:' | wc -l | tr -d '\n' > result"
          def check_result = readFile('result').trim()
          if (check_result != "1") {
            currentBuild.result = 'UNSTABLE'
          }
        } //docker.withServer
      } // docker.withRegistry
  } // node
} catch (e) {
    // If there was an exception thrown, the build failed
  currentBuild.result = 'FAILURE'
  throw e
} finally {
  notifyBuild(currentBuild.result)
}

def tagGitRepo () {
  env.BUILD_TAG = "v.${env.BUILD_NUMBER}"
  sshagent(['c1ab7eac-20e8-4bc3-b5f1-3430f28badfb']) {
    sh "git config user.email taxijenkins@gmail.com"
    sh "git config --global user.name TaxiJenkins"
    sh "git tag -l ${env.BUILD_TAG}"
    sh "git tag -a -f -m ${env.BUILD_URL} ${env.BUILD_TAG}"
    sh ("git -c core.askpass=true push git@gitlab.com:iotsploit/${env.REPO}.git ${env.BUILD_TAG}")
  }
}

def notifyBuild(String buildStatus = 'STARTED') {
  buildStatus =  buildStatus ?: 'SUCCESS'

  // Default values
  def color = 'danger'
  def smile = ':wat: '
  def subject = "${buildStatus}: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'"
  def summary = "${subject} (${env.BUILD_URL})"

  // Override default values based on build status
  if (buildStatus == 'STARTED') {
    color = '#c0c0c0'
    smile = ':ermygerd: '
  } else if (buildStatus == 'SUCCESS') {
    color = 'good'
    smile = ':gandalf: '
  } else if (buildStatus == 'UNSTABLE') {
    color = 'warning'
    smile = ':facepalm: '
  } else {
    color = 'danger'
    smile = ':wat: '
  }

  slackSend (color: color, message: smile + summary)
}
