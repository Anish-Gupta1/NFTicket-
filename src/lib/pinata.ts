import axios from 'axios';
import FormData from 'form-data';

const PINATA_JWT = process.env.NEXT_PUBLIC_PINATA_JWT;
const BASE_IPFS_FOLDER_CID = process.env.NEXT_PUBLIC_BASE_IPFS_FOLDER_CID;
const POST_CONCERT_FOLDER_CID = process.env.NEXT_PUBLIC_POST_CONCERT_FOLDER_CID;

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

interface EventMetadata {
  name: string;
  description: string;
  image: string;
  attributes: {
    trait_type: string;
    value: string | number;
  }[];
}

export const uploadToPinata = async (file: File): Promise<string> => {
  if (!PINATA_JWT) throw new Error('Pinata JWT not configured');

  const formData = new FormData();
  formData.append('file', file);

  const res = await axios.post<PinataResponse>('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
    headers: {
      'Authorization': `Bearer ${PINATA_JWT}`,
      ...formData.getHeaders()
    }
  });

  return `ipfs://${res.data.IpfsHash}`;
};

export const uploadBatchMetadata = async (
  metadata: EventMetadata,
  batchNumber: number
): Promise<{ preUri: string; postUri: string }> => {
  if (!PINATA_JWT) throw new Error('Pinata JWT not configured');
  if (!BASE_IPFS_FOLDER_CID) throw new Error('Base IPFS folder CID not configured');
  if (!POST_CONCERT_FOLDER_CID) throw new Error('Post-concert folder CID not configured');

  // Create pre-concert metadata
  const preMetadata = {
    ...metadata,
    attributes: [
      ...metadata.attributes,
      { trait_type: 'Status', value: 'Active' }
    ]
  };

  // Create post-concert metadata
  const postMetadata = {
    ...metadata,
    description: `${metadata.description} (Expired)`,
    attributes: [
      ...metadata.attributes.filter(attr => attr.trait_type !== 'Date'), // Remove date attribute
      { trait_type: 'Status', value: 'Expired' }
    ]
  };

  // Upload pre-concert metadata
  const preBlob = new Blob([JSON.stringify(preMetadata)], { type: 'application/json' });
  const preFile = new File([preBlob], `${batchNumber}.json`, { type: 'application/json' });
  
  const preFormData = new FormData();
  preFormData.append('file', preFile);
  preFormData.append('pinataOptions', JSON.stringify({
    cidVersion: 1,
    wrapWithDirectory: true
  }));
  preFormData.append('pinataMetadata', JSON.stringify({
    name: `Batch ${batchNumber} Pre-Concert Metadata`,
    keyvalues: {
      batchNumber: batchNumber.toString(),
      type: 'pre-concert-metadata'
    }
  }));

  // Upload post-concert metadata
  const postBlob = new Blob([JSON.stringify(postMetadata)], { type: 'application/json' });
  const postFile = new File([postBlob], `${batchNumber}.json`, { type: 'application/json' });
  
  const postFormData = new FormData();
  postFormData.append('file', postFile);
  postFormData.append('pinataOptions', JSON.stringify({
    cidVersion: 1,
    wrapWithDirectory: true
  }));
  postFormData.append('pinataMetadata', JSON.stringify({
    name: `Batch ${batchNumber} Post-Concert Metadata`,
    keyvalues: {
      batchNumber: batchNumber.toString(),
      type: 'post-concert-metadata'
    }
  }));

  // Upload both files to Pinata
  await Promise.all([
    axios.post<PinataResponse>(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      preFormData,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          ...preFormData.getHeaders()
        }
      }
    ),
    axios.post<PinataResponse>(
      'https://api.pinata.cloud/pinning/pinFileToIPFS',
      postFormData,
      {
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
          ...postFormData.getHeaders()
        }
      }
    )
  ]);

  return {
    preUri: `ipfs://${BASE_IPFS_FOLDER_CID}/${batchNumber}.json`,
    postUri: `ipfs://${POST_CONCERT_FOLDER_CID}/${batchNumber}.json`
  };
};

export const createEventMetadata = (
  name: string,
  description: string,
  imageUrl: string,
  attributes: { trait_type: string; value: string | number }[]
): EventMetadata => {
  return {
    name,
    description,
    image: imageUrl,
    attributes
  };
}; 