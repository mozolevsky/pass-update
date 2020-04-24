# mvn-pass-update
Script for maven and .npmrc passwords update 
Encodes maven password in accordance with https://maven.apache.org/guides/mini/guide-encryption.html
and updates in settings.xml and settings-security.xml
Encoder npm _auth string as base64 user:password
And put in .npmrc
Draft version, tested for windows. 
