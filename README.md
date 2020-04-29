## Packages Added:
'npm i bcryptjs body-parser concurrently express is-empty jsonwebtoken mongoose passport passport-jwt validator'

## Notes:
For our authentication a config variable must be added as secretOrKey in the server/config file. 
This key can be generated using:
'node -e "console.log(require('crypto').randomBytes(32).toString('hex'));'# Doctors_Coder
