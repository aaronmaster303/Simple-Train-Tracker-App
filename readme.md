MBTA Train Tracker App!

## To debug on Windows PC:

nvm use node
npx expo start --tunnel

## To update and submit app:

eas update

if this does not work:
eas build --platform ios --profile production --local
eas submit

## Local Build

eas build --profile development --platform ios --local
eas build --profile ios-simulator --platform ios --local
(change profile to production to make a prod build)
