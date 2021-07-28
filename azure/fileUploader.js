const { BlobServiceClient } = require('@azure/storage-blob')

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;

async function uploadToAzure(fileName, filePath) {
		const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING)
		const containerClient = blobServiceClient.getContainerClient('inqli-container')

		const blockBlobClient = containerClient.getBlockBlobClient(fileName)
		
		console.log('\nUploading to Azure storage as blob:\n\t', fileName);
		const uploadBlobResponse = await blockBlobClient.uploadFile(filePath)
		console.log("Blob was uploaded successfully. requestId: ", uploadBlobResponse.requestId);

		return {imageUrl: process.env.AZURE_URL + fileName}
}

module.exports = {uploadToAzure}
