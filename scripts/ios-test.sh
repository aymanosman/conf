set -exo pipefail

mkdir -p /tmp/xcode

xcodebuild \
  CODE_SIGNING_REQUIRED=NO \
  CODE_SIGN_IDENTITY= \
  PROVISIONING_PROFILE= \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,OS=11.0,name=iPhone 7' \
  -project ios/conf.xcodeproj \
  -scheme "conf" \
  build test | \
  tee /tmp/xcode_raw.log | \
  xcpretty --color --report junit --output /tmp/xcode/results.xml

find ios > /tmp/find-ios
