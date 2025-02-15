import { API_URL } from '@/shared/consts';
import { ICostume, IScene } from '@/shared/types';

import { apiInstance } from './apiInstance';

export async function fetchCostumes() {
  try {
    const response = await apiInstance.get<ICostume[]>('/costumes');
    return response.data.map((costume) => ({
      ...costume,
      image: API_URL + costume.image,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch costumes: ${error}`);
  }
}

export async function fetchScenes() {
  try {
    const response = await apiInstance.get<IScene[]>('/backgrounds');
    return response.data.map((scene) => ({
      ...scene,
      image: API_URL + scene.image,
    }));
  } catch (error) {
    throw new Error(`Failed to fetch costumes: ${error}`);
  }
}

export async function sendImageResult(body: {
  userImage: File;
  costumeId: number;
  backgroundId: number;
}) {
  try {
    const formData = new FormData();
    formData.append('userImage', body.userImage);
    formData.append('costumeId', body.costumeId.toString());
    formData.append('backgroundId', body.backgroundId.toString());

    const response = await apiInstance.post<{ id: number }>(
      '/image_results',
      formData,
    );

    if (response.status !== 200) {
      throw new Error('Failed to send image result');
    }

    return response.data;
  } catch (error) {
    throw new Error(`Failed to send image result: ${error}`);
  }
}

export async function fetchImageResult(id: number) {
  try {
    const response = await apiInstance.get<{ id: number; image: string }>(
      `/image_results/${id}`,
    );
    return { ...response.data, image: API_URL + response.data.image };
  } catch (error) {
    throw new Error(`Failed to fetch image result: ${error}`);
  }
}

export async function fetchQr(id: number) {
  try {
    const response = await apiInstance.post<string>(
      '/image_results/telegram_qr',
      { imageResults: [id] },
    );
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch qr: ${error}`);
  }
}
