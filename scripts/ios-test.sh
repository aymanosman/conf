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

tree -L 3 ios > /tmp/tree

cat /tmp/tree

diff -Naur .commands/tree-`git rev-parse --short HEAD` /tmp/tree
