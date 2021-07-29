# Azure Uploader

Server developed to allow uploading a file to a blob container located on Microsoft Azure

## installation

```
yarn install
```

## Setup

Create a .env file. It should contain the following variables

```env
AZURE_STORAGE_CONNECTION_STRING=
AZURE_CONTAINER=
AZURE_URL=
```

The connection string can be found by following these steps

- Go to you Azure portal
- Click on Storage Accounts
- Select your account
- Scroll down to Access Keys
- You will find your connection string under key1

The container can be found by following these steps

- Go to you Azure portal
- Click on Storage Accounts
- Select your account
- Scroll down to Containers
- Either create or select the name of your container

The Url can be found by following these steps

- Click on the container you chose for your application
- Select Properties

## Use

To start the server
```
yarn start
```
It will listen on port 8888

From your client app, make a POST request to `/image-upload`. The request body should be a multipart/form-data. A `file` and an `extension` should be joined.

The response body will be an object with a `imageUrl`. You can now use this url to access your image.