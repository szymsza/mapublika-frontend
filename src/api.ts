import axios, { AxiosResponse } from 'axios';
import { API_URL } from './config';
import { DatasetData, DatasetUnitData } from './store/types';
import { mojeIDStorageKey } from './store/atoms';

const api = axios.create({
  baseURL: API_URL,
});

// Credits: https://stackoverflow.com/a/1349426
const random = (length: number): string => {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return result;
}

export const arbitraryIDStorageKey = 'customID';
export const getUserToken = (): string => {
  const parsed = JSON.parse(localStorage.getItem(mojeIDStorageKey)!);

  if (parsed) {
    return parsed.sub;
  }

  const arbitraryID = localStorage.getItem(arbitraryIDStorageKey);

  if (arbitraryID) {
    return arbitraryID;
  }

  const newId = random(45);
  localStorage.setItem(arbitraryIDStorageKey, newId);
  return newId;
};

type DatasetValue = Record<string, Record<string, number>>;

type DatasetResponse = {
  kraje: DatasetValue;
  okresy: DatasetValue;
  obce: {};
};

const getColours = (dataset: DatasetValue): Record<string, DatasetUnitData> => {
  const arrayDataset = Object.values(dataset);

  let minValues = Object.assign({}, arrayDataset[0]);
  let maxValues = Object.assign({}, arrayDataset[0]);

  for (let row of arrayDataset) {
    for (let index of Object.keys(minValues)) {
      // @ts-ignore
      if (parseFloat(row[index]) < parseFloat(minValues[index])) {
        // @ts-ignore
        minValues[index] = parseFloat(row[index]);
      }

      // @ts-ignore
      if (parseFloat(row[index]) > parseFloat(maxValues[index])) {
        // @ts-ignore
        maxValues[index] = parseFloat(row[index]);
      }
    }
  }

  let difference = {};

  for (let key in minValues) {
    // @ts-ignore
    difference[key] = maxValues[key] - minValues[key];
  }

  const withPercentage = Object.fromEntries(Object.entries(dataset).map(([key, value]) => ([
    key,
    Object.fromEntries(Object.entries(value).map(([key2, value2]) =>
      // @ts-ignore
      [key2, (value2 - minValues[key2]) / difference[key2]],
    )),
  ])));

  let result = {};

  for (let key in dataset) {
    // @ts-ignore
    result[key] = {
      value: dataset[key],
      percentage: withPercentage[key],
    };
  }

  return result;
};

export const loadDataset = async (id: string): Promise<DatasetData> => {
  let response: DatasetResponse;

  // TODO - remove
  id = 'porodnost';

  await api.get(`/${id}/`).then(({ data }: AxiosResponse<DatasetResponse>) => {
    response = data;
  });

  // @ts-ignore
  if (!response) {
    return {
      regions: {},
      counties: {},
    };
  }

  return {
    regions: getColours(response.kraje),
    counties: getColours(response.okresy),
  }
}

export interface UploadDatasetFormData {
  file: File | null;
  value_occurrences: string;
  value_code: string;
  location_text: string;
  localization_type: string;
  average: boolean;
}

export const sendDataset = async (data: UploadDatasetFormData): Promise<boolean> => {
  if (!data.file) {
    return new Promise(() => {
    });
  }

  let formData = new FormData();

  for (let [key, value] of Object.entries(data)) {
    formData.append(key, value);
  }

  let result = false;

  await api.post(`/files/${data.file.name}/`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      'Authorization': 'Bearer ' + getUserToken(),
    },
  }).then(() => {
    result = true;
  })
    .catch(() => {
      result = false;
    });

  return result;
};

export default api;