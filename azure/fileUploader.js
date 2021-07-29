const { BlobServiceClient } = require('@azure/storage-blob')

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const AZURE_CONTAINER = process.env.AZURE_CONTAINER
const AZURE_URL = process.env.AZURE_URL

async function uploadToAzure(fileName, filePath) {
		const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
		const containerClient = blobServiceClient.getContainerClient(AZURE_CONTAINER)

		const blockBlobClient = containerClient.getBlockBlobClient(fileName)
		
		console.log('\nUploading to Azure storage as blob:\n\t', fileName);
		const uploadBlobResponse = await blockBlobClient.uploadFile(filePath)
		console.log("\nBlob was uploaded successfully.\n\t", uploadBlobResponse.requestId);

		return {imageUrl: AZURE_URL + fileName}
}

module.exports = {uploadToAzure}
