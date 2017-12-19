set -eo pipefail

mkdir -p /tmp/xcode

xcodebuild \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY= \
  PROVISIONING_PROFILE= \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,OS=11.0,name=iPhone 7' \
  -workspace ios/conf.xcworkspace \
  -scheme "conf" \
  clean build test | \
  tee /tmp/xcode_raw.log | \
  xcpretty --color --report junit --output /tmp/xcode/results.xml
