# npm | maven passwords update scripts
Script for maven and .npmrc passwords update <br>
Encodes maven password in accordance with https://maven.apache.org/guides/mini/guide-encryption.html <br>
and updates in settings.xml and settings-security.xml <br>
Encoder npm _auth string as base64 user:password <br>
And put in .npmrc <br>
Draft version, tested for windows. <br>

Usage: <br>
yarn <br>
node maven-pass [password] <br>
node npm-pass [user] [password] <br>
