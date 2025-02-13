import { ICostume, IScene } from '@/shared/types';

import { apiInstance } from './apiInstance';

export async function fetchCostumes() {
  try {
    const response = await apiInstance.get<ICostume[]>('/costumes');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch costumes: ${error}`);
  }
}

export async function fetchScenes() {
  try {
    const response = await apiInstance.get<IScene[]>('/scenes');
    return response.data;
  } catch (error) {
    throw new Error(`Failed to fetch costumes: ${error}`);
  }
}
