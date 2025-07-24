MBTA Train Tracker App!

To debug on Windows PC:
nvm use node
npx expo start --tunnel

To update and submit app:

eas update

if this does not work:

increment build number (package.json)
eas build --platform ios --profile production --auto-submit
