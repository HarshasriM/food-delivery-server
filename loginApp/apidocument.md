## register
http://localhost:8000/auth/register
input:
{
    "name" :"John",
    "email" :"john@gmail.com",
    "password" : "1234567",
    "phone" : 234567880,
    "role" : "User"
}

## login

http://localhost:8000/auth/login
input:
{
    
    "email" :"jack@gmail.com",
    "password" : "12345"
}

## allusersinfo

http://localhost:8000/auth/users

## getparticularuser

input:headers
x-access-token:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZjZjZWMzN2NjYzc2MmQwYmNmNGE2NyIsImlhdCI6MTcxMDY4OTU5MywiZXhwIjoxNzEwNzc1OTkzfQ.WqKQVq-ZAgRAtWVx5KYfzxYD0UP-7TBIsZ-A_pdlpZM

http://localhost:8000/auth/userInfo

